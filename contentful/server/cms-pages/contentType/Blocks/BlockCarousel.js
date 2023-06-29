import gql from "graphql-tag";
import StorefrontContentType from "front-commerce-contentful/server/core/domain/StorefrontContentType";
import BlockCarouselSlide from "./BlockCarouselSlide";

/**
 * @param {BlockCarouselSlide} blockCarouselSlide
 */
const formatContentfulData = (blockCarouselSlide) => (contentfulData) => {
  return {
    id: contentfulData?.sys?.id,
    slides: (contentfulData?.slidesCollection?.items ?? []).map(
      blockCarouselSlide.dataFormatter
    ),
  };
};

export default class BlockCarousel extends StorefrontContentType {
  constructor() {
    const blockCarouselSlide = new BlockCarouselSlide();
    super(
      "blockCarousel",
      "BlockCarousel",
      formatContentfulData(blockCarouselSlide),
      (data) => data.id
    );
    this.blockCarouselSlide = blockCarouselSlide;
  }

  /**
   * @return {import("graphql/language/ast").DocumentNode} contentfulFragment
   */
  get contentfulFragment() {
    return gql`
      fragment BlockCarouselFragment on BlockCarousel {
        ${this.sys}
        slidesCollection(limit:10){
          items {
            __typename
            ${this.blockCarouselSlide.contentfulFragmentName}
          }
        }
      }
      ${this.blockCarouselSlide.contentfulFragment}
    `;
  }
}
