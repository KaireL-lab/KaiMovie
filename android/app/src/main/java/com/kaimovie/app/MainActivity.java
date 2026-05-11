package com.kaimovie.app;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;

public class MainActivity extends Activity {

    private WebView webView;
    private ProgressBar progressBar;
    private FrameLayout fullscreenContainer;
    private View customView;
    private WebChromeClient.CustomViewCallback customViewCallback;

    private static final String HOME_URL = "https://kai-movie.vercel.app/browse";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );
        getWindow().setStatusBarColor(Color.parseColor("#0a1128"));
        getWindow().setNavigationBarColor(Color.parseColor("#0a1128"));

        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        progressBar = findViewById(R.id.progressBar);
        fullscreenContainer = findViewById(R.id.fullscreenContainer);

        setupWebView();
        webView.loadUrl(HOME_URL);

        // Mark current version as installed on first run
        android.content.SharedPreferences prefs = getSharedPreferences("kaimovie", MODE_PRIVATE);
        if (!prefs.contains("installed_tag")) {
            prefs.edit().putString("installed_tag", "first_install").apply();
        }

        // Check for updates
        new UpdateChecker(this).checkForUpdate();
    }

    private void setupWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportMultipleWindows(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAllowFileAccess(false);
        settings.setUserAgentString(settings.getUserAgentString() + " KaiMovie/1.0");

        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

        webView.setBackgroundColor(Color.parseColor("#0a1128"));

        // WebViewClient with ad blocker
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString().toLowerCase();
                if (AdBlocker.isAd(url)) {
                    return AdBlocker.createEmptyResponse();
                }
                return super.shouldInterceptRequest(view, request);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString().toLowerCase();
                // Block ad redirects
                if (AdBlocker.isAd(url)) {
                    return true; // block
                }
                // Allow everything else (video players need many domains)
                return false;
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                progressBar.setVisibility(View.VISIBLE);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                progressBar.setVisibility(View.GONE);
                // Inject CSS for Disney+ native app look
                view.evaluateJavascript(
                    "(() => {" +
                    "  if(document.getElementById('kaimovie-app-css')) return;" +
                    "  const s = document.createElement('style');" +
                    "  s.id = 'kaimovie-app-css';" +
                    "  s.textContent = `" +
                    "    nav.glass-strong { display: none !important; }" +
                    "    footer { display: none !important; }" +
                    "    body { padding-top: 0 !important; background: #040714 !important; }" +
                    "    main { padding-top: 0 !important; }" +
                    "    [class*='pt-[72px]'] { padding-top: 0 !important; }" +
                    "    .movie-card { border-radius: 12px !important; overflow: hidden !important; }" +
                    "    .movie-card:hover { transform: scale(1.08) !important; }" +
                    "    section h2 { font-size: 1.1rem !important; letter-spacing: 0.03em !important; }" +
                    "    .grid { gap: 10px !important; }" +
                    "    ::-webkit-scrollbar { display: none !important; }" +
                    "    * { scrollbar-width: none !important; }" +
                    "  `;" +
                    "  document.head.appendChild(s);" +
                    "})()", null
                );
            }
        });

        // WebChromeClient for fullscreen video
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
            }

            @Override
            public void onShowCustomView(View view, CustomViewCallback callback) {
                customView = view;
                customViewCallback = callback;
                fullscreenContainer.addView(view);
                fullscreenContainer.setVisibility(View.VISIBLE);
                webView.setVisibility(View.GONE);
                progressBar.setVisibility(View.GONE);
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            }

            @Override
            public void onHideCustomView() {
                if (customView != null) {
                    fullscreenContainer.removeView(customView);
                    customView = null;
                }
                if (customViewCallback != null) {
                    customViewCallback.onCustomViewHidden();
                    customViewCallback = null;
                }
                fullscreenContainer.setVisibility(View.GONE);
                webView.setVisibility(View.VISIBLE);
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
            }

            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, android.os.Message resultMsg) {
                // Block popup windows (ads)
                return false;
            }
        });
    }

    private boolean isAllowedUrl(String url) {
        String[] allowed = {
            "kai-movie.vercel.app",
            "vidlink.pro",
            "api.codespecters.com",
            "vidsrc.icu",
            "vidsrc.pro",
            "vidsrc.to",
            "multiembed.mov",
            "image.tmdb.org",
            "themoviedb.org",
            "rabbitstream",
            "dokicloud",
            "megacloud",
            "upstream",
            "mixdrop",
            "filemoon",
            "streamtape",
            "dood",
            "mp4upload",
            "embedsu",
            "vid2faf",
            "cloudflare",
        };
        for (String domain : allowed) {
            if (url.contains(domain)) return true;
        }
        return false;
    }

    @Override
    public void onBackPressed() {
        if (customView != null) {
            webView.getWebChromeClient().onHideCustomView();
        } else if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
