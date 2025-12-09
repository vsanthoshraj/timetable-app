# How to Build APK

Since you have Android Studio installed (as you are a Flutter developer), you can build the APK easily.

1. **Open Android Studio**.
2. Click **File > Open**.
3. Navigate to: `D:\my_app\timetable_web\android`.
4. Click **OK** to open the project.
5. Wait for Gradle to sync (it might take a few minutes).
6. Once synced, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
7. Android Studio will notify you when the build is complete. Click **locate** to find your `app-debug.apk`.
8. Transfer this file to your phone and install it!

## Troubleshooting
If you see a "Java Home" error in the terminal, don't worry. Android Studio handles the Java environment automatically when you open the project inside it.
