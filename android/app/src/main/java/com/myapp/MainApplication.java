package com.myapp;

import android.app.Application;
import android.content.Context;
import android.util.Log;
// 下面是被添加的代码
import com.alibaba.sdk.android.push.CloudPushService;
import com.alibaba.sdk.android.push.CommonCallback;
import com.alibaba.sdk.android.push.noonesdk.PushServiceFactory;
import com.alibaba.sdk.android.push.register.HuaWeiRegister;
import com.alibaba.sdk.android.push.register.MiPushRegister;
// 添加结束
import com.facebook.react.ReactApplication;
import org.wonday.aliyun.push.AliyunPushPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
private static final String TAG = "Init";
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AliyunPushPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    //下面是添加的代码
    this.initCloudChannel();
    //添加结束
  }

  // 下面是添加的代码
    /**
     * 初始化阿里云推送通道
     * @param applicationContext
     */
    private void initCloudChannel() {
      PushServiceFactory.init(this.getApplicationContext());
      CloudPushService pushService = PushServiceFactory.getCloudPushService();
      pushService.setNotificationSmallIcon(R.mipmap.ic_launcher);//设置通知栏小图标， 需要自行添加
      pushService.register(this.getApplicationContext(), "24761270", "b3ca4c35f47dc88d9a2d037b7f40a868", new CommonCallback() {
        @Override
        public void onSuccess(String responnse) {
          // success
        }
        @Override
        public void onFailed(String code, String message) {
          // failed
        }
      });

      // 注册方法会自动判断是否支持小米系统推送，如不支持会跳过注册。
      MiPushRegister.register(this.getApplicationContext(), "小米AppID", "小米AppKey");
      // 注册方法会自动判断是否支持华为系统推送，如不支持会跳过注册。
      HuaWeiRegister.register(this.getApplicationContext());
    }
    // 添加结束
}
