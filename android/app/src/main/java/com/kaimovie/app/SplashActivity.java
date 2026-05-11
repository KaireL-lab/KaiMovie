package com.kaimovie.app;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.OvershootInterpolator;
import android.view.animation.ScaleAnimation;
import android.view.animation.TranslateAnimation;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class SplashActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );
        getWindow().setStatusBarColor(Color.parseColor("#040714"));
        getWindow().setNavigationBarColor(Color.parseColor("#040714"));

        setContentView(R.layout.activity_splash);

        ImageView logo = findViewById(R.id.splashLogo);
        TextView titleKai = findViewById(R.id.splashTitleKai);
        TextView titleMovie = findViewById(R.id.splashTitleMovie);
        TextView subtitle = findViewById(R.id.splashSubtitle);
        View glowRing = findViewById(R.id.glowRing);

        // Phase 1: Logo scales up with overshoot bounce (0-800ms)
        AnimationSet logoAnim = new AnimationSet(false);

        ScaleAnimation logoScale = new ScaleAnimation(
            0f, 1f, 0f, 1f,
            Animation.RELATIVE_TO_SELF, 0.5f,
            Animation.RELATIVE_TO_SELF, 0.5f
        );
        logoScale.setDuration(800);
        logoScale.setInterpolator(new OvershootInterpolator(1.5f));

        AlphaAnimation logoFade = new AlphaAnimation(0f, 1f);
        logoFade.setDuration(400);

        logoAnim.addAnimation(logoScale);
        logoAnim.addAnimation(logoFade);
        logo.startAnimation(logoAnim);

        // Phase 1b: Glow ring pulse
        AnimationSet glowAnim = new AnimationSet(false);
        ScaleAnimation glowScale = new ScaleAnimation(
            0.5f, 2.5f, 0.5f, 2.5f,
            Animation.RELATIVE_TO_SELF, 0.5f,
            Animation.RELATIVE_TO_SELF, 0.5f
        );
        glowScale.setDuration(1200);
        AlphaAnimation glowFade = new AlphaAnimation(0.8f, 0f);
        glowFade.setDuration(1200);
        glowAnim.addAnimation(glowScale);
        glowAnim.addAnimation(glowFade);
        glowAnim.setStartOffset(300);
        glowRing.startAnimation(glowAnim);

        // Phase 2: "Kai" slides in from left (600ms offset)
        titleKai.setAlpha(0f);
        AnimationSet kaiAnim = new AnimationSet(true);
        kaiAnim.setInterpolator(new AccelerateDecelerateInterpolator());
        TranslateAnimation kaiSlide = new TranslateAnimation(
            Animation.RELATIVE_TO_SELF, -1.5f, Animation.RELATIVE_TO_SELF, 0f,
            Animation.RELATIVE_TO_SELF, 0f, Animation.RELATIVE_TO_SELF, 0f
        );
        kaiSlide.setDuration(500);
        AlphaAnimation kaiFade = new AlphaAnimation(0f, 1f);
        kaiFade.setDuration(500);
        kaiAnim.addAnimation(kaiSlide);
        kaiAnim.addAnimation(kaiFade);
        kaiAnim.setStartOffset(600);
        kaiAnim.setFillAfter(true);
        titleKai.startAnimation(kaiAnim);

        // Phase 2b: "Movie" slides in from right (750ms offset)
        titleMovie.setAlpha(0f);
        AnimationSet movieAnim = new AnimationSet(true);
        movieAnim.setInterpolator(new AccelerateDecelerateInterpolator());
        TranslateAnimation movieSlide = new TranslateAnimation(
            Animation.RELATIVE_TO_SELF, 1.5f, Animation.RELATIVE_TO_SELF, 0f,
            Animation.RELATIVE_TO_SELF, 0f, Animation.RELATIVE_TO_SELF, 0f
        );
        movieSlide.setDuration(500);
        AlphaAnimation movieFade = new AlphaAnimation(0f, 1f);
        movieFade.setDuration(500);
        movieAnim.addAnimation(movieSlide);
        movieAnim.addAnimation(movieFade);
        movieAnim.setStartOffset(750);
        movieAnim.setFillAfter(true);
        titleMovie.startAnimation(movieAnim);

        // Phase 3: Subtitle fades in (1200ms offset)
        subtitle.setAlpha(0f);
        AlphaAnimation subFade = new AlphaAnimation(0f, 1f);
        subFade.setDuration(600);
        subFade.setStartOffset(1300);
        subFade.setFillAfter(true);
        subtitle.startAnimation(subFade);

        // Go to main after 3 seconds
        new Handler().postDelayed(() -> {
            startActivity(new Intent(SplashActivity.this, MainActivity.class));
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
            finish();
        }, 3000);
    }
}
