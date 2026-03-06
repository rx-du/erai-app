#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(YahooAuthModule, NSObject)

RCT_EXTERN_METHOD(
  authorize:(NSString *)clientId
  redirectUri:(NSString *)redirectUri
  resolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

@end