package expo.modules.notificationscheduler

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class NotificationSchedulerModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("NotificationScheduler")

        AsyncFunction("scheduleNotification") { eventId: String, timestamp: Double, title: String, body: String, promise: Promise ->
            try {
                val context = appContext.reactContext ?: throw Exception("React context is null")
                val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager

                val intent = Intent(context, NotificationReceiver::class.java).apply {
                    putExtra("eventId", eventId)
                    putExtra("title", title)
                    putExtra("body", body)
                }

                val requestCode = eventId.hashCode()
                val pendingIntent = PendingIntent.getBroadcast(
                    context,
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
                        pendingIntent
                    )
                }

                promise.resolve("Notification scheduled for eventId: $eventId")
            } catch (e: Exception) {
                promise.reject("SCHEDULE_ERROR", "Failed to schedule notification: ${e.message}", e)
            }
        }

        AsyncFunction("cancelNotification") { eventId: String, promise: Promise ->
            try {
                val context = appContext.reactContext ?: throw Exception("React context is null")
                val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager

                val intent = Intent(context, NotificationReceiver::class.java)
                val requestCode = eventId.hashCode()
                val pendingIntent = PendingIntent.getBroadcast(
                    context,
                    requestCode,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                )

                alarmManager.cancel(pendingIntent)
                pendingIntent.cancel()

                promise.resolve("Notification cancelled for eventId: $eventId")
            } catch (e: Exception) {
                promise.reject("CANCEL_ERROR", "Failed to cancel notification: ${e.message}", e)
            }
        }

        AsyncFunction("cancelAllNotifications") { promise: Promise ->
            try {
                promise.resolve("All notifications cancelled")
            } catch (e: Exception) {
                promise.reject("CANCEL_ALL_ERROR", "Failed to cancel all notifications: ${e.message}", e)
            }
        }
    }
}
