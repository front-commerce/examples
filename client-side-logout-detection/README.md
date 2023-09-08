# Client side logout detection example

This example demonstrates how to detect when a user has logged out of your application during a client-side navigation.

## Why?

It can be helpful if you have strong authentication constraints on your application and short session lifespan.

When users navigate client-side, they can be unexpectedly logged out (without an action from their side). Monitoring this state change allows you to act upon it, for instance to redirect the user on the login page.

## What?

It adds a sample [GraphQL module](https://developers.front-commerce.com/docs/2.x/essentials/extend-the-graphql-schema) containing:

- a lightweight way to know whether the user is logged in or not
- a fake field to use for simulating an unexpected logout

It also contains some theme files allowing to trigger an unexpected logout and visually displays (in the footer) the state of the monitoring component: `<AutoRedirectOnLogout />`

## Usage

1. add the `examples` module to your project (see [../README.md](../README.md))
2. register the `examples/client-side-logout-detection` module, GraphQL module and theme in your project:

```diff
--- a/.front-commerce.js
+++ b/.front-commerce.js
@@ -2,21 +2,25 @@ module.exports = {
   name: "Front-Commerce Skeleton",
   url: "http://localhost:4000",
   modules: [
     "./node_modules/front-commerce/theme-chocolatine",
+    "./examples/client-side-logout-detection",
     "./src",
   ],
   serverModules: [
     { name: "FrontCommerce", path: "server/modules/front-commerce" },
     { name: "Magento2", path: "server/modules/magento2" },
+    {
+      name: "ForceLogout",
+      path: "./examples/client-side-logout-detection/server/forceLogout",
+    },
   ],
   webModules: [
     { name: "FrontCommerce", path: "front-commerce/src/web" },
     { name: "ThemeChocolatine", path: "front-commerce/theme-chocolatine/web" },
+    {
+      name: "ClientSideLogoutDetectionExample",
+      path: "./examples/client-side-logout-detection/web",
+    },
     { name: "Skeleton", path: "./src/web" },
   ],
 };

```

**Note: if you've customized the `<Home />` and `<GenericLayout />` components, you should update them similarly to what is implemented in this module in order to test the example.**

Restart your application!

## Test

You can simulate an unexpected logout by navigating (client-side or directly) to http://localhost:4000/forceLogout

We recommend to monitor the `<AutoRedirectOnLogout />` output in your theme along with your DevTools Network and Console tabs to understand what's going on.
