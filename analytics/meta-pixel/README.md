# Meta Pixel example plugin

Example Meta Pixel analytics plugin.

## Usage

1. add the `examples` module to your project (see [../../README.md](../../README.md))
1. install `react-facebook-pixel` package: `npm install react-facebook-pixel`
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
+        name: "meta-pixel",
+        needConsent: false,
+        enabledByDefault: true,
+        settings: (authorization) => {
+          return {
+            pixelId: "pixelId",
+            debug: process.env.FRONT_COMMERCE_ENV !== "production"
+          };
+        },
+        script: () => {
+          return import("../../examples/analytics/meta-pixel");
+        },
+      },
     ],
   },
 }; ```
