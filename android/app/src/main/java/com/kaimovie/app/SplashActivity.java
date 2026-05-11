package com.kaimovie.app;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.ScaleAnimation;
import android.widget.ImageView;
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
        TextView title = findViewById(R.id.splashTitle);
        TextView subtitle = findViewById(R.id.splashSubtitle);

        // Logo animation - scale up + fade in
        AnimationSet logoAnim = new AnimationSet(true);
        logoAnim.setInterpolator(new AccelerateDecelerateInterpolator());

        ScaleAnimation scale = new ScaleAnimation(
            0.3f, 1.0f, 0.3f, 1.0f,
            Animation.RELATIVE_TO_SELF, 0.5f,
            Animation.RELATIVE_TO_SELF, 0.5f
        );
        scale.setDuration(800);

        AlphaAnimation fadeIn = new AlphaAnimation(0f, 1f);
        fadeIn.setDuration(800);

        logoAnim.addAnimation(scale);
        logoAnim.addAnimation(fadeIn);
        logo.startAnimation(logoAnim);

        // Title fade in with delay
        AlphaAnimation titleFade = new AlphaAnimation(0f, 1f);
        titleFade.setDuration(600);
        titleFade.setStartOffset(500);
        titleFade.setFillAfter(true);
        title.setAlpha(0f);
        title.startAnimation(titleFade);

        // Subtitle fade in with more delay
        AlphaAnimation subFade = new AlphaAnimation(0f, 1f);
        subFade.setDuration(600);
        subFade.setStartOffset(800);
        subFade.setFillAfter(true);
        subtitle.setAlpha(0f);
        subtitle.startAnimation(subFade);

        // Go to main after 2.5 seconds
        new Handler().postDelayed(() -> {
            startActivity(new Intent(SplashActivity.this, MainActivity.class));
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
            finish();
        }, 2500);
    }
}
