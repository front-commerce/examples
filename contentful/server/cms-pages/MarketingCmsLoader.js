/**
 * @typedef {import('front-commerce-contentful/server/core/ContentfulLoader').default} ContentfulLoader
 * @typedef {import('front-commerce-contentful/server/core/domain/ContentType').default} ContentType
 */

/**
 * Loader responsible for fetching all marketing content from Contentful
 */
class MarketingCmsLoader {
  /**
   * @param {ContentfulLoader} ContentfulLoader
   * @param {{ page: ContentType }} AppContentTypes
   * @param {{ contactPageId: string }} config
   */
  constructor(ContentfulLoader, AppContentTypes, config) {
    /** @private */
    this.ContentfulLoader = ContentfulLoader;
    /** @private */
    this.AppContentTypes = AppContentTypes;
    /** @private */
    this.config = config;
  }

  /**
   * @param {String} id
   * @returns {Boolean}
   */
  isContactPage = (id) => {
    return id === this.config.contactPageId;
  };

  /**
   * @returns {Promise<Object>}
   */
  loadHomePage = async () => {
    const contentType = this.AppContentTypes.home;
    const page = await this.ContentfulLoader.loadFirstContentMatching(
      contentType
    );

    return contentType.dataFormatter(page);
  };

  /**
   * @returns {Promise<Object>}
   */
  loadContactPage = async () => {
    return this.loadPageById(this.config.contactPageId);
  };

  /**
   * @param {String} id
   * @returns {Promise<Object>}
   */
  loadPageById = async (id) => {
    const contentType = this.AppContentTypes.page;
    const page = await this.ContentfulLoader.loadFirstContentMatching(
      contentType,
      { sys: { id } }
    );
    return contentType.dataFormatter(page);
  };

  /**
   * @returns {Promise<Object>}
   */
  loadPageBySlug = async (slug) => {
    const contentType = this.AppContentTypes.page;
    const page = await this.ContentfulLoader.loadFirstContentMatching(
      contentType,
      { slug }
    );

    // Contact page must only be loaded using loadContactPage and
    // must not exist here!
    // … this is for the sake of showcasing how to handle "special" cases
    // not necessarily handled by Contentful.
    const pageId = page?.sys?.id;
    if (this.isContactPage(pageId)) {
      return null;
    }

    return contentType.dataFormatter(page);
  };
}

export default MarketingCmsLoader;
