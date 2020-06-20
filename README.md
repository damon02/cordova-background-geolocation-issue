This repository is to demonstrate an issue currently with cordova-background-geolocation-lt.

## How to reproduce

1. Clone this repository
2. `npm install`
3. `npm run build`
4. `cordova platform add android`
5. Open up this project in Android Studio, let it create its own gradle config by pressing cancel twice and run it on an emulator. (or use `cordova run android --emulator` if that works for you)
6. Enable permissions for the plugin
7. Let the app go to the background by pressing the home button
8. Go back into the app via the icon or multitasking screen