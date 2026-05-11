package com.kaimovie.app;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
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
import java.util.concurrent.Executors;

public class UpdateChecker {

    private static final String GITHUB_API = "https://api.github.com/repos/KaireL-lab/KaiMovie/releases/latest";
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
                String tagName = release.getString("tag_name");
                String releaseName = release.getString("name");
                String body = release.optString("body", "");

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

                // Compare versions
                String currentVersion = getCurrentVersion();
                if (!tagName.contains(currentVersion)) {
                    String finalApkUrl = apkUrl;
                    new Handler(Looper.getMainLooper()).post(() -> {
                        showUpdateDialog(releaseName, tagName, finalApkUrl);
                    });
                }

            } catch (Exception e) {
                // Silent fail - don't bother user if check fails
            }
        });
    }

    private String getCurrentVersion() {
        try {
            PackageInfo pInfo = activity.getPackageManager().getPackageInfo(activity.getPackageName(), 0);
            return pInfo.versionName;
        } catch (Exception e) {
            return "1.0.0";
        }
    }

    private void showUpdateDialog(String name, String tag, String apkUrl) {
        new AlertDialog.Builder(activity, android.R.style.Theme_DeviceDefault_Dialog)
            .setTitle("Update Tersedia!")
            .setMessage("Versi baru " + name + " (" + tag + ") sudah tersedia.\n\nUpdate sekarang untuk fitur terbaru dan perbaikan bug.")
            .setPositiveButton("Update", (dialog, which) -> {
                downloadAndInstall(apkUrl);
            })
            .setNegativeButton("Nanti", null)
            .setCancelable(true)
            .show();
    }

    private void downloadAndInstall(String apkUrl) {
        Toast.makeText(activity, "Downloading update...", Toast.LENGTH_SHORT).show();

        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(apkUrl));
        request.setTitle("KaiMovie Update");
        request.setDescription("Downloading update...");
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "KaiMovie-update.apk");
        request.setMimeType("application/vnd.android.package-archive");

        DownloadManager dm = (DownloadManager) activity.getSystemService(Context.DOWNLOAD_SERVICE);
        long downloadId = dm.enqueue(request);

        // Listen for download complete
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
