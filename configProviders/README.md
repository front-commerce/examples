# Configuration providers

This example shows different practical use of [Configuration Providers](https://developers.front-commerce.com/docs/2.x/advanced/server/configurations#what-is-a-configuration-provider) in Front-Commerce.

## Why?

You might want to customize a configuration in Front-Commerce based on different criteria.

## Usage

1. add the `examples` module to your project (see [../README.md](../README.md))
1. register the `examples/configProviders` GraphQL module in your project (using the `.front-commerce.js::modules` and `.front-commerce.js::serverModules` keys):
```diff
--- a/.front-commerce.js
+++ b/.front-commerce.js
@@ -2,16 +2,12 @@ module.exports = {
   name: "Front-Commerce Skeleton",
   url: "http://localhost:4000",
   modules: [
+    "./examples/configProviders",
     "./node_modules/front-commerce/theme-chocolatine",
     "./src",
   ],
   serverModules: [
     { name: "FrontCommerce", path: "server/modules/front-commerce" },
+    {
+      name: "ConfigProviders",
+      path: "./examples/configProviders/server/graphql-module",
+    },
```
1. add a `FRONT_COMMERCE_EXAMPLE_MANDATORY_STATIC_VALUE=my-value` environment variable to `.env` to prevent a *"Error: example.mandatoryStaticValue: must be of type String"* from the configuration system due to a missing mandatory configuration.

## Test

Add the `DEBUG=example:config-providers` flag to your `.env` to view debug logs that could be useful to understand what happens.

Then start the application, and run queries. You will see the configuration in the console.

You can update your `store.js` by duplicating your existing shop configuration and create a new one with a different URL. You'll see that dynamic values will change depending on the request.

Example:

```diff
// ./src/config/stores.js
module.exports = {
  default: {
    url: process.env.FRONT_COMMERCE_URL,
    locale: "en-US",
    currency: "EUR",
    default_country_id: "GB",
    countries: (IsoCountries) =>
      IsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json")),
  },
+  v2: {
+    url: process.env.FRONT_COMMERCE_URL + "/v2",
+    locale: "en-US",
+    currency: "EUR",
+    default_country_id: "GB",
+    magentoStoreCode: "default",
+    countries: (IsoCountries) =>
+      IsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json")),
+  },
};
```