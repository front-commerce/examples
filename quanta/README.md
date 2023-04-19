# Quanta integration in Front-Commerce

This example module illustrates how to forward HTTP headers from [Quanta](https://www.quanta.io/) attackers to Magento.

## Why?

When load testing an application using Quanta, attackers attach a `x-quanta` HTTP header to each request. This header is then used in Magento servers as a correlation id, to provide detailed metrics on the impact the load has on Magento.

## What?

It adds a [Configuration Provider](https://developers.front-commerce.com/docs/2.x/advanced/server/configurations#what-is-a-configuration-provider) to the application.

This provider customizes the `magento.api.extraHeaders` configuration to include the `x-quanta` headers from the current request. This configuration works for both [Magento 1](https://developers.front-commerce.com/docs/2.x/magento1/advanced#additional-headers-in-magento-api-calls) and [Magento 2](https://developers.front-commerce.com/docs/2.x/magento2/advanced#additional-headers-in-magento-api-calls).

## Usage

1. add the `examples` module to your project (see [../README.md](../README.md))
1. register the `examples/quanta` module in your project (using the `.front-commerce.js::modules` key):
```diff
--- a/.front-commerce.js
+++ b/.front-commerce.js
@@ -2,16 +2,12 @@ module.exports = {
   name: "Front-Commerce Skeleton",
   url: "http://localhost:4000",
   modules: [
+    "./examples/quanta",
     "./node_modules/front-commerce/theme-chocolatine",
     "./src",
   ],
   serverModules: [
     { name: "FrontCommerce", path: "server/modules/front-commerce" },
```

## Test

You can simulate an HTTP request from Quanta attackers with the following `curl` command:
```
curl -I http://localhost:4000/ -H "x-quanta: 2801 1680261120 magento"
```

## Additional information

Here's the specification of the `x-quanta` header:

- format: `x-quanta: [0-9]+ [0-9]+ magento`
- example: `x-quanta: 2801 1680261120 magento`
