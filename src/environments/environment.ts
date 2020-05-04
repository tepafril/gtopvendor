// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const ENV = {
  production: true,
  FIREBASE    : {
    apiKey: "AIzaSyChzU1UM-QJzahJ-TFxWiUiRq2nrnKBwyI",
    authDomain: "gtop-cambodia.firebaseapp.com",
    databaseURL: "https://gtop-cambodia.firebaseio.com",
    projectId: "gtop-cambodia",
    storageBucket: "gtop-cambodia.appspot.com",
    messagingSenderId: "43903908373",
    appId: "1:43903908373:web:6804b4526137ae73ffec1c",
    measurementId: "G-T8ZHDE80N2"
  },
  ONESIGNAL         : {
    appId: "b2b625be-f138-43b7-be48-d11570b30bf2",
    googleProjectNumber: "1:43903908373:android:89cdae3ea6c16566ffec1c"
  }
};


export const ENDPOINT = {
  API_URL           : 'https://admin.gtopcambodia.com/api/',
  IMAGE:{
    ORIGINAL        : "https://admin.gtopcambodia.com/uploads/images/original/",
    W400            : "https://admin.gtopcambodia.com/uploads/images/w400/",
    THUMBNAIL       : "https://admin.gtopcambodia.com/uploads/images/thumbnail/",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
