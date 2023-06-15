export default {
  Query: {
    contactPage: async (_, _args, { loaders }) => {
      return loaders.MarketingCms.loadContactPage();
    },
    marketingPage: async (_, { slug }, { loaders }) => {
      return loaders.MarketingCms.loadPageBySlug(slug);
    },
  },
};
