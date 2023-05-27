import configService from "server/core/config/configService";
import exampleConfigProvider from "./config/exampleConfigProvider";
import d from "debug";

const debug = d("example:config-providers");

debug(
  "GraphQL module: registering the example config provider in the application (after the shop config provider because we need the current shop)"
);
configService.insertAfter("shop", exampleConfigProvider);
// without a required dependency on shop, you could `.append()` the config provider like this:
// configService.append(exampleConfigProvider);

export default {
  namespace: "Example/ConfigProviders",
  contextEnhancer: ({ req }) => {
    /**
     * @type {import("./config/exampleConfigProvider").ExampleConfig}
     */
    const exampleConfig = req.config.example;
    debug("req.config.example", exampleConfig);

    // use with typing from JSDoc!
    // exampleConfig.mandatoryStaticValue
    return {};
  },
};
