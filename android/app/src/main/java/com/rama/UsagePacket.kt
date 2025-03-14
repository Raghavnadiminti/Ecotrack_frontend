package com.rama

import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.util.*

class UsagePacket(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "UsagePacket"
    }

    @ReactMethod
    fun getUsageStats(promise: Promise) {
        val usageStatsManager = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
            reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        } else {
            promise.reject("UNSUPPORTED", "Unsupported Android version")
            return
        }

        val endTime = System.currentTimeMillis()
        val startTime = endTime - (1000 * 60 * 60 * 24) // 24 hours ago

        val usageStatsList: List<UsageStats> = usageStatsManager.queryUsageStats(
            UsageStatsManager.INTERVAL_DAILY,
            startTime,
            endTime
        )

        if (usageStatsList.isNullOrEmpty()) {
            promise.reject("NO_DATA", "No usage data available")
        } else {
            val usageMap = usageStatsList.map {
                mapOf(
                    "packageName" to it.packageName,
                    "totalTimeInForeground" to it.totalTimeInForeground
                )
            }
            promise.resolve(usageMap)
        }
    }
}
