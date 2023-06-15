import typeDefs from "./schema.gql";
import resolvers from "./resolvers.js";
import MarketingCmsLoader from "./MarketingCmsLoader";
import Page from "./contentType/Page";

export default {
  namespace: "Example/Contentful/CmsPages",
  dependencies: ["Front-Commerce/Contentful/Core"],
  typeDefs,
  resolvers,
  contextEnhancer: ({ loaders }) => {
    // Note: this should be either a slug or an app configuration in a real project
    const contactPageId = "dntmgP2QV6uRuRChrdLFj";

    const AppContentTypes = { page: new Page() };
    const MarketingCms = new MarketingCmsLoader(
      loaders.Contentful,
      AppContentTypes,
      {
        contactPageId,
      }
    );

    loaders.Contentful.routes.registerUrlMatcher(
      "Page",
      async (id, metadata) => {
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
      }
    );

    return {
      MarketingCms,
    };
  },
};
