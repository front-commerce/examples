let fb;
let fbLoaded = false;

/**
 * @param {object} userConfig
 * @param {string} userConfig.pixelId
 * @param {boolean} userConfig.disabled
 * @param {boolean} [userConfig.debug]
 */
export default function metaPixel(userConfig) {
  return {
    name: "meta-pixel",
    config: {
      ...userConfig,
    },
    initialize: async ({ config }) => {
      const { pixelId, disabled = false, debug } = config;
      if (typeof window !== "undefined" && !disabled) {
        await import("react-facebook-pixel")
          .then((module) => (fb = module.default))
          .then(() => {
            if (!fbLoaded) {
              fb.init(pixelId, {
                autoConfig: true,
                debug:
                  debug !== undefined
                    ? userConfig.debug
                    : process.env.FRONT_COMMERCE_ENV !== "production",
              });
              fbLoaded = true;
            }
          });
      }
    },
    page: () => {
      if (fb?.pageView) {
        fb.pageView();
      }
    },
    track: ({ payload }) => {
      if (fb?.track) {
        fb.track(payload.event, payload.properties);
      }
    },
    loaded: () => {
      return fbLoaded;
    },
  };
}
