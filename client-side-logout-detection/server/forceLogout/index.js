import gql from "graphql-tag";
import { makeAuthServiceFromRequest } from "server/modules/magento2/core/factories";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  namespace: "Examples/ForceLogout",
  dependencies: ["Magento2/Customer"],
  typeDefs: gql`
    extend type Query {
      isLoggedIn: Boolean
      simulateUnattendedLogout: String
    }
  `,
  resolvers: {
    Query: {
      /**
       * A lightweight way to check if the user is logged in,
       * for projects not using the CustomerCache.
       *
       * Otherwise, use `me.id` (Customer type)
       *
       * @see https://developers.front-commerce.com/docs/2.x/magento2/advanced#caching-current-customers-information
       */
      isLoggedIn: (_parent, _args, { req }) => {
        const authService = makeAuthServiceFromRequest(req);
        return authService.isAuthenticated();
      },
      simulateUnattendedLogout: async (_parent, _args, { loaders }) => {
        // simulate latency
        await sleep(Math.random() * 3000);
        // simulate unattended logout
        loaders.Customer.logout();

        return "Hello World!";
      },
    },
  },
};
