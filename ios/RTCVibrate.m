
#import "RTCVibrate.h"
#import <UIKit/UIKit.h>
#import <CoreHaptics/CoreHaptics.h>

@implementation RTCVibrate

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(vibrateShort) {
  
  UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleMedium];
         [generator impactOccurred];
}

@end
