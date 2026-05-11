package com.kaimovie.app;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;

import androidx.core.content.FileProvider;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;
import java.util.concurrent.Executors;

public class UpdateChecker {

    private static final String GITHUB_API = "https://api.github.com/repos/KaireL-lab/KaiMovie/releases/tags/latest";
    private static final String PREFS = "kaimovie_update";
    private final Activity activity;

    public UpdateChecker(Activity activity) {
        this.activity = activity;
    }

    public void checkForUpdate() {
        Executors.newSingleThreadExecutor().execute(() -> {
            try {
                URL url = new URL(GITHUB_API);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept", "application/vnd.github.v3+json");
                conn.setConnectTimeout(5000);
                conn.setReadTimeout(5000);

                if (conn.getResponseCode() != 200) return;

                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                JSONObject release = new JSONObject(response.toString());
                String publishedAt = release.getString("published_at");

                // Get APK download URL
                JSONArray assets = release.getJSONArray("assets");
                String apkUrl = null;
                for (int i = 0; i < assets.length(); i++) {
                    JSONObject asset = assets.getJSONObject(i);
                    if (asset.getString("name").endsWith(".apk")) {
                        apkUrl = asset.getString("browser_download_url");
                        break;
                    }
                }

                if (apkUrl == null) return;

                // Compare release date with app install/update date
                SharedPreferences prefs = activity.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
                long lastCheckedTime = prefs.getLong("last_release_time", 0);
                boolean dismissed = prefs.getBoolean("dismissed", false);

                // Parse release date
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US);
                sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
                Date releaseDate = sdf.parse(publishedAt);
                long releaseTime = releaseDate.getTime();

                // Get app install time
                long appInstallTime = activity.getPackageManager()
                    .getPackageInfo(activity.getPackageName(), 0).lastUpdateTime;

                // Only show if release is NEWER than when this APK was installed
                // AND user hasn't dismissed this specific release
                if (releaseTime > appInstallTime && releaseTime != lastCheckedTime) {
                    String finalApkUrl = apkUrl;
                    long finalReleaseTime = releaseTime;
                    new Handler(Looper.getMainLooper()).post(() -> {
                        showUpdateDialog(finalApkUrl, finalReleaseTime);
                    });
                }

            } catch (Exception e) {
                // Silent fail
            }
        });
    }

    private void showUpdateDialog(String apkUrl, long releaseTime) {
        SharedPreferences prefs = activity.getSharedPreferences(PREFS, Context.MODE_PRIVATE);

        new AlertDialog.Builder(activity, android.R.style.Theme_DeviceDefault_Dialog)
            .setTitle("Update Tersedia!")
            .setMessage("Versi terbaru KaiMovie sudah tersedia.\n\nUpdate sekarang untuk fitur dan perbaikan terbaru.")
            .setPositiveButton("Update", (dialog, which) -> {
                prefs.edit().putLong("last_release_time", releaseTime).apply();
                downloadAndInstall(apkUrl);
            })
            .setNegativeButton("Nanti", (dialog, which) -> {
                // Save release time so we don't ask again for this release
                prefs.edit().putLong("last_release_time", releaseTime).apply();
            })
            .setCancelable(false)
            .show();
    }

    private void downloadAndInstall(String apkUrl) {
        Toast.makeText(activity, "Downloading update...", Toast.LENGTH_SHORT).show();

        // Delete old file first
        File oldFile = new File(Environment.getExternalStoragePublicDirectory(
            Environment.DIRECTORY_DOWNLOADS), "KaiMovie-update.apk");
        if (oldFile.exists()) oldFile.delete();

        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(apkUrl));
        request.setTitle("KaiMovie Update");
        request.setDescription("Downloading update...");
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "KaiMovie-update.apk");
        request.setMimeType("application/vnd.android.package-archive");

        DownloadManager dm = (DownloadManager) activity.getSystemService(Context.DOWNLOAD_SERVICE);
        long downloadId = dm.enqueue(request);

        activity.registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                if (id == downloadId) {
                    activity.unregisterReceiver(this);
                    installApk();
                }
            }
        }, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE), Context.RECEIVER_NOT_EXPORTED);
    }

    private void installApk() {
        File file = new File(Environment.getExternalStoragePublicDirectory(
            Environment.DIRECTORY_DOWNLOADS), "KaiMovie-update.apk");

        Intent intent = new Intent(Intent.ACTION_VIEW);
        Uri apkUri = FileProvider.getUriForFile(activity,
            activity.getPackageName() + ".provider", file);
        intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        activity.startActivity(intent);
    }
}
