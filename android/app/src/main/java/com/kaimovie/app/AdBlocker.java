package com.kaimovie.app;

import android.webkit.WebResourceResponse;
import java.io.ByteArrayInputStream;
import java.util.HashSet;
import java.util.Set;

public class AdBlocker {

    private static final Set<String> AD_DOMAINS = new HashSet<>();

    static {
        // Ad networks
        AD_DOMAINS.add("doubleclick.net");
        AD_DOMAINS.add("googlesyndication.com");
        AD_DOMAINS.add("googleadservices.com");
        AD_DOMAINS.add("google-analytics.com");
        AD_DOMAINS.add("adservice.google.com");
        AD_DOMAINS.add("pagead2.googlesyndication.com");
        AD_DOMAINS.add("adnxs.com");
        AD_DOMAINS.add("adsrvr.org");
        AD_DOMAINS.add("adcolony.com");
        AD_DOMAINS.add("admob.com");
        AD_DOMAINS.add("advertising.com");
        AD_DOMAINS.add("adform.net");
        AD_DOMAINS.add("adinplay.com");
        AD_DOMAINS.add("adtidy.org");

        // Popup / redirect networks
        AD_DOMAINS.add("profitablecpmratenetwork.com");
        AD_DOMAINS.add("profitablegatetocontent.com");
        AD_DOMAINS.add("adzilla.org");
        AD_DOMAINS.add("axes88.org");
        AD_DOMAINS.add("popads.net");
        AD_DOMAINS.add("popcash.net");
        AD_DOMAINS.add("popunder.net");
        AD_DOMAINS.add("propellerads.com");
        AD_DOMAINS.add("pushame.com");
        AD_DOMAINS.add("pushnami.com");
        AD_DOMAINS.add("richpush.co");
        AD_DOMAINS.add("trafficjunky.com");
        AD_DOMAINS.add("exoclick.com");
        AD_DOMAINS.add("juicyads.com");
        AD_DOMAINS.add("clickadu.com");
        AD_DOMAINS.add("hilltopads.net");
        AD_DOMAINS.add("evadav.com");
        AD_DOMAINS.add("monetag.com");
        AD_DOMAINS.add("a-ads.com");
        AD_DOMAINS.add("adsterra.com");
        AD_DOMAINS.add("bidvertiser.com");
        AD_DOMAINS.add("revcontent.com");
        AD_DOMAINS.add("mgid.com");
        AD_DOMAINS.add("taboola.com");
        AD_DOMAINS.add("outbrain.com");

        // Tracking
        AD_DOMAINS.add("facebook.net");
        AD_DOMAINS.add("facebook.com/tr");
        AD_DOMAINS.add("hotjar.com");
        AD_DOMAINS.add("mixpanel.com");
        AD_DOMAINS.add("segment.io");
        AD_DOMAINS.add("amplitude.com");

        // Malware / scam
        AD_DOMAINS.add("clksite.com");
        AD_DOMAINS.add("adf.ly");
        AD_DOMAINS.add("sh.st");
        AD_DOMAINS.add("linkvertise.com");
        AD_DOMAINS.add("ouo.io");
        AD_DOMAINS.add("shorte.st");
        AD_DOMAINS.add("bc.vc");
        AD_DOMAINS.add("tpi.li");

        // Crypto miners
        AD_DOMAINS.add("coinhive.com");
        AD_DOMAINS.add("coin-hive.com");
        AD_DOMAINS.add("cryptoloot.pro");
        AD_DOMAINS.add("minero.cc");
    }

    public static boolean isAd(String url) {
        if (url == null || url.isEmpty()) return false;
        for (String domain : AD_DOMAINS) {
            if (url.contains(domain)) {
                return true;
            }
        }
        return false;
    }

    public static WebResourceResponse createEmptyResponse() {
        return new WebResourceResponse(
            "text/plain",
            "utf-8",
            new ByteArrayInputStream("".getBytes())
        );
    }
}
