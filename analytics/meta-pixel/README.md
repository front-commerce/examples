# Meta Pixel example plugin 

Example Meta Pixel analytics plugin.

## Usage

1. clone the [Front-Commerce skeleton](https://gitlab.com/front-commerce/front-commerce-skeleton), or use an existing Front-Commerce project
2. add this module as a submodule: `git submodule add git@github.com:front-commerce/examples.git examples`
3. install `react-facebook-pixel` package: `npm install react-facebook-pixel`
4. update your `src/config/analytics.js` file as follows:

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
