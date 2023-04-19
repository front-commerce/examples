# Matomo example plugin

Example Matomo analytics plugin.

## Usage

1. add the `examples` module to your project (see [../../README.md](../../README.md))
1. install `@jonkoops/matomo-tracker` package: `npm install @jonkoops/matomo-tracker`
1. update your `src/config/analytics.js` file as follows:

```diff
diff --git a/src/config/analytics.js b/src/config/analytics.js
index 780a9c1..8133bbb 100644
--- a/src/config/analytics.js
+++ b/src/config/analytics.js
@@ -17,6 +17,17 @@ module.exports = {
           };
         },
       },
+      {
+        name: "matomo",
+        needConsent: false,
+        enabledByDefault: true,
+        settings: (authorization) => {
+          return {
+            matomoUrl: "your_matomo_url",
+            matomoSiteId: your_site_id,
+          };
+        },
+        script: () => {
+          return import("../../examples/analytics/matomo");
+        },
+      },
     ],
   },
 }; ```
