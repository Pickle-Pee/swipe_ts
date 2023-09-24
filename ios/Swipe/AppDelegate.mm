#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
#import "RNFBMessagingModule.h"
#import "RNNotifications.h"
#import "Swipe-Bridging-Header.h"
#import "RCT112Call.h"

@implementation AppDelegate 
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RNNotifications didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
  
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNNotifications didReceiveBackgroundNotification:userInfo withCompletionHandler:completionHandler];
 
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RNNotifications didFailToRegisterForRemoteNotificationsWithError:error];
  
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Swipe";

  [RNNotifications startMonitorNotifications]; 
  [FIRApp configure];
  [RNFBMessagingModule load];
  
 
 
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  UNNotificationAction *callAction = [UNNotificationAction
    actionWithIdentifier:@"CALL_112_ACTION"
    title:@"Call 112"
    options:UNNotificationActionOptionAuthenticationRequired
  ];

  UNNotificationCategory *emergencyCategory = [UNNotificationCategory
    categoryWithIdentifier:@"EMERGENCY_CATEGORY"
    actions:@[callAction]
    intentIdentifiers:@[]
    options:UNNotificationCategoryOptionNone
  ];
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center setNotificationCategories:[NSSet setWithObject:emergencyCategory]];
  center.delegate = self;
  self.initialProps = @{};
 

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  if ([notification isKindOfClass:[UNTextInputNotificationResponse class]]) {
          UNTextInputNotificationResponse *textResponse = (UNTextInputNotificationResponse *)notification;
          NSString *actionIdentifier = textResponse.actionIdentifier;
          
          if ([actionIdentifier isEqualToString:@"CALL_112_ACTION"]) {
            NSLog(@"PUUUSH/////");
            RCT112Call *callModule = [RCT112Call new];
            [callModule makeCallTo112];
          }
      } else {
          // Обрабатываем другие типы ответов, если это необходимо
      }
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
