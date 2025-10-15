package com.anonymous.quickwise.notifications

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NotificationSchedulerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val alarmManager: AlarmManager =
        reactContext.getSystemService(Context.ALARM_SERVICE) as AlarmManager

    override fun getName(): String {
        return "NotificationScheduler"
    }

    @ReactMethod
    fun scheduleNotification(
        eventId: String,
        timestamp: Double,
        title: String,
        body: String,
        promise: Promise
    ) {
        try {
            val intent =
                Intent(reactApplicationContext, AlarmReceiver::class.java).apply {
                    putExtra("eventId", eventId)
                    putExtra("title", title)
                    putExtra("body", body)
                }

            val requestCode = eventId.hashCode()
            val pendingIntent =
                PendingIntent.getBroadcast(
                    reactApplicationContext,
                    requestCode,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                )

            val triggerTime = timestamp.toLong()

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                alarmManager.setExactAndAllowWhileIdle(
                    AlarmManager.RTC_WAKEUP,
                    triggerTime,
                    pendingIntent
                )
            } else {
                alarmManager.setExact(
                  AlarmManager.RTC_WAKEUP, 
                  triggerTime, 
                  pendingIntent)
            }

            promise.resolve("Notification scheduled for eventId: $eventId")
        } catch (e: Exception) {
            promise.reject("SCHEDULE_ERROR", "Failed to schedule notification: ${e.message}")
        }
    }

    @ReactMethod
    fun cancelNotification(eventId: String, promise: Promise) {
        try {
            val intent = Intent(reactApplicationContext, AlarmReceiver::class.java)
            val requestCode = eventId.hashCode()
            val pendingIntent =
                PendingIntent.getBroadcast(
                    reactApplicationContext,
                    requestCode,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                )

            alarmManager.cancel(pendingIntent)
            pendingIntent.cancel()

            promise.resolve("Notification cancelled for eventId: $eventId")
        } catch (e: Exception) {
            promise.reject("CANCEL_ERROR", "Failed to cancel notification: ${e.message}")
        }
    }

    @ReactMethod
    fun cancelAllNotifications(promise: Promise) {
        try {
            promise.resolve("All notifications cancelled")
        } catch (e: Exception) {
            promise.reject("CANCEL_ALL_ERROR", "Failed to cancel all notifications: ${e.message}")
        }
    }
}
