#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CustomAudioModule : RCTEventEmitter <RCTBridgeModule>

- (void)startRecording;
- (void)stopRecording;

@end
 
