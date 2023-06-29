import BlocksContentType from "front-commerce-contentful/server/core/domain/BlocksContentType";
import StorefrontContentType from "front-commerce-contentful/server/core/domain/StorefrontContentType";
import gql from "graphql-tag";

/**
 * @param {BlocksContentType} homePageBlocks
 */
const formatContentfulData =
  (homePageBlocks, seoMetadata) => (contentfulData) => {
    return {
      title: contentfulData.title,
      seo: seoMetadata.dataFormatter(contentfulData.seo),
      blocks: homePageBlocks.dataFormatter(
        contentfulData.contentBlocksCollection?.items ?? []
      ),
    };
  };

class HomePage extends StorefrontContentType {
  /**
   * @param {import("./Blocks")["default"]} blocksLibrary
   * @param {import("./SeoMetadata")["default"]} seoMetadata
   */
  constructor(blocksLibrary, seoMetadata) {
    const homePageBlocks = new BlocksContentType(
      "home",
      "HomeContentBlocksItem",
      [blocksLibrary.Carousel, blocksLibrary.CategoryProductsList],
      "HomePageBlocks"
    );

    super(
      "home",
      "HomePage",
      formatContentfulData(homePageBlocks, seoMetadata),
      "homePage"
    );
    this.homePageBlocks = homePageBlocks;
    this.seoMetadata = seoMetadata;
  }

  get contentfulFragment() {
    return gql`
      fragment HomeFragment on Home {
        ${this.sys}
        title
        seo {
          ${this.seoMetadata.contentfulFragmentName}
        }
        contentBlocksCollection {
          items {
            __typename
            ${this.homePageBlocks.contentfulFragmentName}
          }
        }
      }
      ${this.seoMetadata.contentfulFragment}
      ${this.homePageBlocks.contentfulFragment}
    `;
  }
}

export default HomePage;
