#import "RCTCallModule.h"
#import <UIKit/UIKit.h>
#import <CallKit/CallKit.h>

@implementation RCTCallModule

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(makeEmergencyCall)
{
  NSString *phoneNumber = @"112";
    NSURL *telURL = [NSURL URLWithString:[NSString stringWithFormat:@"tel:%@", phoneNumber]];
    UIApplication *application = [UIApplication sharedApplication];

    if ([application canOpenURL:telURL]) {
      [application openURL:telURL options:@{} completionHandler:nil];
    }
}
@end
