import MatomoTracker from "@jonkoops/matomo-tracker";

/** @type {MatomoTracker} */
let tracker;

/**
 * @param {object} userConfig
 * @param {string} userConfig.matomoUrl
 * @param {number} userConfig.matomoSiteId
 * @param {boolean} userConfig.disabled
 * @param {boolean} [userConfig.debug]
 */
export default function matomo(userConfig) {
  return {
    name: "matomo",
    config: {
      ...userConfig,
    },
    initialize: async ({ config }) => {
      tracker = new MatomoTracker({
        disabled: config.disabled,
        urlBase: userConfig.matomoUrl,
        siteId: userConfig.matomoSiteId,
        linkTracking: true,
        configurations: {
          disableCookies: true,
          setSecureCookie: process.env.NODE_ENV !== "production",
          setRequestMethod: "POST",
        },
      });
    },
    page: ({ payload }) => {
      tracker.trackPageView({
        documentTitle: payload.properties.title,
        href: payload.properties.url,
      });
    },
    track: ({ payload }) => {
      const properties = payload.properties;
      switch (payload.event) {
        case "Product Added":
          return tracker.addEcommerceItem({
            sku: properties.sku,
            productName: properties.name,
            productPrice: properties.price,
            productQuantity: properties.qty,
          });
        case "Product Removed":
          return tracker.removeEcommerceItem({ sku: properties.sku });
        case "Product Viewed":
          return tracker.setEcommerceView({
            sku: properties.sku,
            productName: properties.name,
            productPrice: properties.price,
          });
        case "Product List Viewed":
          return tracker.setEcommerceCategoryView(properties.category);
        case "Product List Filtered":
          return tracker.trackEvent({
            category: "Product List",
            action: "Filtered",
            name: properties.list_id,
            value: properties.category,
          });
        case "Product Clicked":
          return tracker.trackEvent({
            category: "Product",
            action: "Clicked",
            name: properties.name,
            value: properties.sku,
          });
        case "Product Searched":
          return tracker.trackSiteSearch({
            keyword: properties.query,
            count: properties.productsCount,
          });
        case "Cart Viewed":
          return tracker.trackEvent({
            category: "Cart",
            action: "Viewed",
            name: properties.cart_id,
            value: properties.value,
          });
        case "Checkout Started":
          return tracker.trackEvent({
            category: "Checkout",
            action: "Started",
            name: properties.order_id,
            value: properties.value,
          });
        case "Checkout Step Viewed":
          return tracker.trackEvent({
            category: "Checkout",
            action: "Step Viewed",
            name: properties.checkout_id,
            value: properties.step,
          });
        case "Checkout Step Completed":
          return tracker.trackEvent({
            category: "Checkout",
            action: "Step Complete",
            name: properties.checkout_id,
            value: properties.step,
          });
        case "Payment Info Entered":
          return tracker.trackEvent({
            category: "Payment",
            action: "Info Entered",
            name: properties.checkout_id,
            value: properties.payment_method,
          });
        case "Order Completed":
          return tracker.trackEcommerceOrder({
            orderId: properties.order_id,
            orderRevenue: properties.total,
            shippingAmount: properties.shipping,
            taxAmount: properties.tax,
            discountOffered: Boolean(properties.discount),
          });
        case "Coupon Entered":
          return tracker.trackEvent({
            category: "Coupon",
            action: "Entered",
            name: properties.cart_id,
            value: properties.coupon_id,
          });
        case "Coupon Applied":
          return tracker.trackEvent({
            category: "Coupon",
            action: "Applied",
            name: properties.cart_id,
            value: properties.coupon_id,
          });
        case "Coupon Denied":
          return tracker.trackEvent({
            category: "Coupon",
            action: "Denied",
            name: properties.cart_id,
            value: properties.coupon_id,
          });
        case "Coupon Removed":
          return tracker.trackEvent({
            category: "Coupon",
            action: "Removed",
            name: properties.cart_id,
            value: properties.coupon_id,
          });
        default:
          return;
      }
    },
    loaded: () => {
      return !!tracker;
    },
  };
}
