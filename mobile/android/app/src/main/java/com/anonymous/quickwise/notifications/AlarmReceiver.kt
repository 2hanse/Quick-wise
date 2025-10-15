package com.anonymous.quickwise.notifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.anonymous.quickwise.MainActivity
import com.anonymous.quickwise.R

class AlarmReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val eventId = intent.getStringExtra("eventId") ?: return
        val title = intent.getStringExtra("title") ?: "일정 알림"
        val body = intent.getStringExtra("body") ?: "일정이 곧 시작됩니다"

        val notificationManager =
            context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel =
                NotificationChannel(
                        "schedule-reminders",
                        "일정 알림",
                        NotificationManager.IMPORTANCE_HIGH
                    )
                    .apply {
                        description = "일정 10분 전 알림"
                        enableVibration(true)
                        vibrationPattern = longArrayOf(0, 250, 250, 250)
                    }
            notificationManager.createNotificationChannel(channel)
        }

        val notificationIntent =
            Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                putExtra("eventId", eventId)
            }

        val pendingIntent =
            PendingIntent.getActivity(
                context,
                eventId.hashCode(),
                notificationIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )

        val notification =
            NotificationCompat.Builder(context, "schedule-reminders")
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setContentTitle(title)
                .setContentText(body)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent)
                .build()

        notificationManager.notify(eventId.hashCode(), notification)
    }
}
