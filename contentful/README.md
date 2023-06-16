# Contentful integration in Front-Commerce

This example module illustrates how to use the Contentful Front-Commerce module to expose custom content types in an existing Front-Commerce application.

## Why?

Contentful provides a powerful content management system that allows for easy creation and management of content across multiple channels. Leverage the power of Contentful to create and manage any content for your storefront in hours without having to build and maintain a custom content management system nor sacrificing the user experience and design of your application.

Mixing Contentful content with existing commerce data can provide additional context and information to customers, leading to a more personalized and engaging shopping experience. For example, use Contentful to manage product descriptions, images, and other related content, and then mix this content with product data from their commerce platform to create a more complete and informative product page.

## What?

This example module showcases how to use the Contentful Front-Commerce module to expose custom content types in an existing Front-Commerce application.

It contains the following features:
- expose custom pages under the `/content/:slug` path
- use a special "Contact" page content to enhance the default `/contact` page

## Usage

1. [install and configure](https://gitlab.blackswift.cloud/front-commerce/front-commerce-contentful/-/blob/main/docs/getting-started.md) the Contentful Front-Commerce module (**in private beta**) in your application
1. add the `examples` module to your project (see [../README.md](../README.md))
1. register the `examples/contentful` module in your project (using the `.front-commerce.js::modules` key):
```diff
--- a/.front-commerce.js
+++ b/.front-commerce.js
@@ -2,21 +2,27 @@ module.exports = {
   name: "Front-Commerce Skeleton",
   url: "http://localhost:4000",
   modules: [
     "./node_modules/front-commerce/theme-chocolatine",
     "./node_modules/front-commerce-contentful",
+    "./examples/contentful",
     "./src",
   ],
   serverModules: [
     { name: "FrontCommerce", path: "server/modules/front-commerce" },
     { name: "Magento2", path: "server/modules/magento2" },
     {
       name: "Contentful",
       path: "front-commerce-contentful/server",
     },
+    {
+      name: "ContentfulCmsPagesExample",
+      path: "./examples/contentful/server/cms-pages",
+    },
   ],
   webModules: [
     { name: "FrontCommerce", path: "front-commerce/src/web" },
     { name: "ThemeChocolatine", path: "front-commerce/theme-chocolatine/web" },
+    { name: "ContentfulExample", path: "./examples/contentful/web" },
     { name: "Skeleton", path: "./src/web" },
   ],
 };
```
1. import sample data in your Contentful space (replace `<SPACE_ID>` with your Contentful space ID):
```shell
npx contentful-cli space import --space-id <SPACE_ID> --content-file ./contentful-sample-data.json
```

## Test

Here are some actions you could take:
- Visit a test page at http://localhost:4000/content/test-page
- Update the `/contact` page title
- Preview a CMS page from Contentful and analyze how you're redirected to the correct URL

This example handles the Contact page differently than others, to showcase different patterns you may use in your own application.
Run the following GraphQL query from [your local Playground](http://localhost:4000/playground) and try to understand why you get this response:
```graphql
{
  contactPage {
    ...PageFragment
  }
  test: marketingPage(slug: "test-page"){
    ...PageFragment
  }
  contact: marketingPage(slug: "contact-us"){
    ...PageFragment
  }
}

fragment PageFragment on ContentfulPage {
  title
  slug
}
```

Expected response:
```json
{
  "data": {
    "contactPage": {
      "title": "Contact us v2",
      "slug": "contact-us"
    },
    "test": {
      "title": "Test page",
      "slug": "test-page"
    },
    "contact": null
  }
}
```

## Contribute

Feel free to help us out by contributing new Contentful examples to this repository.

### Update Contentful's sample data

To update the [`./contentful-sample-data.json`](./contentful-sample-data.json) file, run:
```shell
npx contentful-cli space export --space-id <SPACE_ID> --skip-roles --content-file contentful-sample-data.json
```