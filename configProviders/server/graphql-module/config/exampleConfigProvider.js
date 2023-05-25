import { getCurrentShopConfig } from "server/core/config/getShopConfig";
import mem from "mem";
import d from "debug";

const debug = d("example:config-providers");

/**
 * In order to prevent expensive calculations that would
 * be executed on each request, FC will warn if it detects that
 * 2 consecutive calls with the same value returns different objects.
 *
 * For this reason, it's a good practice to memoize the configuration
 * based on a single criteria (here the shop id).
 *
 * /!\ Warning: you must ensure that the cache key has a known cardinality.
 *     if the cache key is dynamic, it could cause memory leaks.
 */
const memoizedConfigurationPerShop = mem(
  (shopConfig) => {
    // should only be executed once per store and per node process
    debug("Current shop config (from stores.js)", shopConfig);

    return {
      example: {
        runtimeValuePerShop: `Uppercased URL: ${shopConfig.url.toUpperCase()}`,
      },
    };
  },
  {
    // We use the shop id as the cache key. This isn't needed if the 1st parameter is a scalar.
    // See mem's documentation for details https://www.npmjs.com/package/mem
    cacheKey: (args) => {
      const shopConfig = args[0];
      return shopConfig.id;
    },
  }
);

/**
 * @typedef {object} ExampleConfig Example configuration
 *
 * @property {string} mandatoryStaticValue
 * @property {string} staticValueWithDefault
 * @property {string} runtimeValuePerShop
 */
const exampleConfigProvider = {
  name: "example",
  /**
   * Returns a schema object containing the example configuration properties.
   * This is what defines the constraints you want for your configuration.
   */
  schema: () => ({
    example: {
      mandatoryStaticValue: {
        doc: "A mandatory value which doesn't change in the runtime",
        format: String,
        env: "FRONT_COMMERCE_EXAMPLE_MANDATORY_STATIC_VALUE",
        default: null, // null isn't a String, so if no value is provided it will fail
      },
      staticValueWithDefault: {
        doc: "A configuration that has a default value if no env var is defined",
        format: String,
        env: "FRONT_COMMERCE_EXAMPLE_STATIC_VALUE_WITH_DEFAULT",
        default: "default value",
      },
      runtimeValuePerShop: {
        doc: "A configuration whose value is determined at runtime based on the current shop",
        format: String,
        default: "",
      },
    },
  }),

  /**
   * slowValuesOnEachRequest allows you to derive a value from each request.
   * It can access already resolved configurations from previous providers.
   *
   * In this example, we derive a value from the current shop scope. That's why
   * the provider is inserted after the shop config provider (in `../index.js`).
   *
   * @see https://developers.front-commerce.com/docs/2.x/advanced/server/configurations#values-depending-on-the-request-key-slowvaluesoneachrequest-optional
   * @param {import("express").Request} req The raw HTTP request
   * @param {Object} config The configuration containing static values and dynamic values from previous providers (here shop)
   */
  slowValuesOnEachRequest: (_req, config) => {
    const currentShopConfig = getCurrentShopConfig(config);
    return memoizedConfigurationPerShop(currentShopConfig);
  },
};

export default exampleConfigProvider;
