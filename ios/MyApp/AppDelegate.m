/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "AliyunPushManager.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"ios" withExtension:@"jsbundle"];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"MyApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  // 下面是添加的代码
  [[AliyunPushManager sharedInstance] setParams:@"24761182"
                                      appSecret:@"5042f550e27fc6721e2d96741b65968a"
                                   lauchOptions:launchOptions
              createNotificationCategoryHandler:^{
                //create customize notification category here
              }];
  // 添加结束
  return YES;
}
// 下面是添加的代码

// APNs注册成功回调，将返回的deviceToken上传到CloudPush服务器
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [[AliyunPushManager sharedInstance] application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}


// APNs注册失败回调
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [[AliyunPushManager sharedInstance] application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

// 打开／删除通知回调
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler
{
  [[AliyunPushManager sharedInstance] application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}


// 请求注册设定后，回调
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [[AliyunPushManager sharedInstance] application:application didRegisterUserNotificationSettings:notificationSettings];
}
// 添加结束
@end

