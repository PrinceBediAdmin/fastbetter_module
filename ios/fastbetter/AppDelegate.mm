#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <BackgroundTasks/BackgroundTasks.h>
#import <React/RCTBridgeModule.h>



@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Set up the React Native bridge and root view
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"fastbetter"
                                            initialProperties:nil];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  // Register background task
  [[BGTaskScheduler sharedScheduler] registerForTaskWithIdentifier:@"com.yourapp.backgroundtask" usingQueue:nil launchHandler:^(__kindof BGTask * _Nonnull task) {
      [self handleAppRefreshTask:(BGAppRefreshTask *)task];
  }];

  return YES;
}

// This method is required for React Native to provide the bundle URL
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// For handling background fetch (iOS 13+)
- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  // Perform background fetch operations
  completionHandler(UIBackgroundFetchResultNewData);
}

// Required for deep linking
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:app openURL:url options:options];
}

// Handle background refresh task
- (void)handleAppRefreshTask:(BGAppRefreshTask *)task
{
    // Perform the background task
    // Example: You can schedule a background fetch here
    [self scheduleAppRefresh];
    
    // Ensure that you call the endBackgroundTask: when the task is finished
    [task setTaskCompletedWithSuccess:YES];
}

- (void)scheduleAppRefresh
{
    // Schedule a new background task to keep it running
    BGAppRefreshTaskRequest *request = [[BGAppRefreshTaskRequest alloc] initWithIdentifier:@"com.yourapp.backgroundtask"];
    request.earliestBeginDate = [NSDate dateWithTimeIntervalSinceNow:15 * 60]; // 15 minutes from now

    NSError *error = nil;
    BOOL success = [[BGTaskScheduler sharedScheduler] submitTaskRequest:request error:&error];
    if (!success) {
        NSLog(@"Could not schedule app refresh: %@", error);
    }
}

@end
