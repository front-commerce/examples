export default {
  Query: {
    homePage: async (_, _args, { loaders }) => {
      return loaders.MarketingCms.loadHomePage();
    },
    contactPage: async (_, _args, { loaders }) => {
      return loaders.MarketingCms.loadContactPage();
    },
    marketingPage: async (_, { slug }, { loaders }) => {
      return loaders.MarketingCms.loadPageBySlug(slug);
    },
  },
  WysiwygContentfulLinkData: {
    url: async (data, _, { loaders }) => {
      try {
        const entryId = data.node.attrs.find(
          ({ name }) => name === "href"
        )?.value;

        const url = await loaders.Contentful.loadLocalRoute("Entry", entryId);

        return url;
      } catch (e) {
        return "#TODO";
      }
    },
  },
};
