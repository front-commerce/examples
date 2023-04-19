import mem from "mem";
import configService from "server/core/config/configService";

const memoizedMagentoExtraHeaders = mem(
  (quantaHeader) => {
    if (!quantaHeader) {
      return {};
    }
    return {
      magento: {
        api: {
          extraHeaders: {
            "x-quanta": quantaHeader,
          },
        },
      },
    };
  },
  { maxAge: 5000 } // prevent memory leaks in case lots of different values pile up
);

const quantaConfigProvider = {
  name: "quanta",
  /**
   * @param {import("express").Request} req
   */
  slowValuesOnEachRequest: (req) => {
    const quantaHeader = req.header("x-quanta");
    return memoizedMagentoExtraHeaders(quantaHeader);
  },
};

configService.append(quantaConfigProvider);

export default {};
