import blocksLibrary from "./contentType/Blocks";
import HomePage from "./contentType/HomePage";
import Page from "./contentType/Page";
import RichTextField from "./contentType/RichTextField";
import SeoMetadata from "./contentType/SeoMetadata";
import MarketingCmsLoader from "./MarketingCmsLoader";
import resolvers from "./resolvers.js";
import typeDefs from "./schema.gql";

export default {
  namespace: "Example/Contentful/CmsPages",
  dependencies: ["Front-Commerce/Contentful/Core"],
  typeDefs,
  resolvers,
  contextEnhancer: ({ loaders }) => {
    // Note: this should be either a slug or an app configuration in a real project
    const contactPageId = "dntmgP2QV6uRuRChrdLFj";

    /**
     * @type {InstanceType<import("front-commerce-contentful/server/core/ContentfulLoader")["default"]>}
     */
    const ContentfulLoader = loaders.Contentful;

    const seoMetadata = new SeoMetadata();
    const richTextField = new RichTextField(loaders.Wysiwyg);

    const AppContentTypes = {
      page: new Page(blocksLibrary, seoMetadata, richTextField),
      home: new HomePage(blocksLibrary, seoMetadata),
    };

    const MarketingCms = new MarketingCmsLoader(
      ContentfulLoader,
      AppContentTypes,
      {
        contactPageId,
      }
    );

    for (const contentType of Object.values(AppContentTypes)) {
      ContentfulLoader.registerStorefrontContentType(contentType);
    }

    for (const contentType of Object.values(blocksLibrary)) {
      ContentfulLoader.registerStorefrontContentType(contentType);
    }

    ContentfulLoader.routes.registerUrlMatcher("Page", async (id, metadata) => {
      // Example of special case handling, to enforce a URL
      // for a page as a static value.
      if (MarketingCms.isContactPage(id)) {
        return `/contact`;
      }

      const page = await MarketingCms.loadPageById(id);
      if (page) {
        return `/content/${page.slug}`;
      }
      return null;
    });

    return {
      MarketingCms,
    };
  },
};
