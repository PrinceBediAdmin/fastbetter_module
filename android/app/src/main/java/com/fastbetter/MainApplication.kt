package com.fastbetter

import android.annotation.SuppressLint
import android.app.Application
import android.content.Intent
import androidx.appcompat.app.AppCompatDelegate
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader
import com.reactnative.googlefit.GoogleFitPackage

import com.appsflyer.AppsFlyerLib;

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> {
        // Get the default packages
        val packages: MutableList<ReactPackage> = PackageList(this).packages.toMutableList()
        // Add GoogleFitPackage manually
        GoogleFitPackage(BuildConfig.APPLICATION_ID)
        return packages
      }

      override fun getJSMainModuleName(): String = "index"

      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

  @SuppressLint("BatteryLife")
  override fun onCreate() {
    super.onCreate()
    // Initialize SoLoader
    SoLoader.init(this, false)
    // Disable night mode
    AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
    // Load the native entry point if the New Architecture is enabled
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
    
    // Initialize React Native Flipper
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
    AppsFlyerLib.getInstance().init("EdUywoA7KQSqeLcJqKJn8F", null, this)
    AppsFlyerLib.getInstance().waitForCustomerUserId(true)
    AppsFlyerLib.getInstance().performOnDeepLinking(Intent(), this)
    AppsFlyerLib.getInstance().start(this)
  }
}
