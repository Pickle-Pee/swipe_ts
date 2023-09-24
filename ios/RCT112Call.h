#import <React/RCTBridgeModule.h>

@interface RCT112Call : NSObject
- (void)makeCallTo112;
@end

@implementation RCT112Call

- (void)makeCallTo112 {
  NSString *phoneNumber = @"112";
  NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"tel:%@", phoneNumber]];
  UIApplication *application = [UIApplication sharedApplication];

  if ([application canOpenURL:url]) {
    [application openURL:url options:@{} completionHandler:nil];
  }
}

@end





