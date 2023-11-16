#import "RCTRecorder.h"
#import <AVFoundation/AVFoundation.h>

@implementation CustomAudioModule
{
  AVAudioRecorder *audioRecorder;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"audioLevel"];
}

RCT_EXPORT_METHOD(startRecording)
{
  // Начать запись аудио, и затем в цикле отправлять уровни громкости
  // Обратите внимание, что этот код представляет собой простой пример и требует доработки
  // audioRecorder = ... // Инициализируйте AVAudioRecorder с настройками записи

  [audioRecorder record];

  NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:0.1
                                                    target:self
                                                  selector:@selector(sendAudioLevel:)
                                                  userInfo:nil
                                                   repeats:YES];
}

- (void)sendAudioLevel:(NSTimer *)timer
{
  if (audioRecorder.isRecording) {
    // Получите уровень громкости и отправьте его в JavaScript
    float audioLevel = [audioRecorder averagePowerForChannel:0];
    [self sendEventWithName:@"audioLevel" body:@{@"level": @(audioLevel)}];
  }
}

RCT_EXPORT_METHOD(stopRecording)
{
  [audioRecorder stop];
}

@end
