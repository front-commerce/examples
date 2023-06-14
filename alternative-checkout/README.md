# Alternative checkout

This example shows a way to alter the checkout flow by "merging" the address and shipping method steps from the checkout, while reusing most of Front-Commerce components.

## Why ?

You might want to customize the checkout flow, and due to its core behavior, it might not be straighforward.

## What ?

This example module only adds and modifies front end components. It adds a new component `AddressAndShipingMethod`, which replaces both the first and the second step of the original `stepDefinitions.js`.

In order to do so, the first step now uses both the validation checks from the Address and the Shipping method steps. `Address` and `ChooseShippingMethod` components have been modified to fit the new wanted behavior, and mutation definitions have been moved to `AddressAndShippingMethod` parent component in order to keep the loading and disabling mechanism at the same place.

## Usage

1. add the `examples` module to your project (see [../README.md](../README.md))
1. register the `examples/alternative-checkout` module in your project (using the `.front-commerce.js::modules` key):
```diff
--- a/.front-commerce.js
+++ b/.front-commerce.js
@@ -2,16 +2,12 @@ module.exports = {
   name: "Front-Commerce Skeleton",
   url: "http://localhost:4000",
   modules: [
     "./node_modules/front-commerce/theme-chocolatine",
     "./src",
+    "./examples/alternative-checkout",
   ],
   serverModules: [
     { name: "FrontCommerce", path: "server/modules/front-commerce" },
```
```diff
--- a/.front-commerce.js
+++ b/.front-commerce.js
@@ -18,5 +19,6 @@ module.exports = {
     { name: "FrontCommerce", path: "front-commerce/src/web" },
     { name: "ThemeChocolatine", path: "front-commerce/theme-chocolatine/web" },
     { name: "Skeleton", path: "./src/web" },
+    { name: "AlternativeCheckout", path: "./examples/alternative-checkout/web" },
   ],
};
```

By doing this, the checkout flow of your application should now contain one less step !