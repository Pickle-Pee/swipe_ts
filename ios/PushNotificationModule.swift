//
//  PushNotificationModule.swift
//  Swipe
//
//  Created by Gost on 22.09.2023.
//

import Foundation
import UserNotifications
import React

@objc(PushNotificationModule)
class PushNotificationModule: NSObject, RCTBridgeModule {
  static func moduleName() -> String {
    return "PushNotificationModule"
  }
  
  @objc func requestPermission(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
      if let error = error {
        reject("ERR_PERMISSION", "Permission error", error)
      } else {
        resolve(granted)
      }
    }
  }
  
  @objc func sendInteractivePush(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let center = UNUserNotificationCenter.current()
    
    let action = UNNotificationAction(identifier: "CALL_112", title: "Call 112", options: [])
    let category = UNNotificationCategory(identifier: "CALL_CATEGORY", actions: [action], intentIdentifiers: [], options: [])
    center.setNotificationCategories([category])
    
    let content = UNMutableNotificationContent()
    content.title = "Emergency Call"
    content.body = "Tap to call 112"
    content.categoryIdentifier = "CALL_CATEGORY"
    
    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 1, repeats: false)
    let request = UNNotificationRequest(identifier: "CALL_REQUEST", content: content, trigger: trigger)
    
    center.add(request) { error in
      if let error = error {
        reject("ERR_NOTIFICATION", "Notification error", error)
      } else {
        resolve(nil)
      }
    }
  }
}
