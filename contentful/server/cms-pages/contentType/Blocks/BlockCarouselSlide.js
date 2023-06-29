import gql from "graphql-tag";
import ContentType from "front-commerce-contentful/server/core/domain/ContentType";

const formatContentfulData = (contentfulData) => {
  return {
    title: contentfulData.title,
    text: contentfulData.ctaText,
    link: contentfulData.ctaUrl,
    image: contentfulData.image?.url,
  };
};

export default class BlockCarouselSlide extends ContentType {
  constructor() {
    super("blockCarouselSlide", "BlockCarouselSlide", formatContentfulData);
  }

  /**
   * @return {import("graphql/language/ast").DocumentNode} contentfulFragment
   */
  get contentfulFragment() {
    return gql`
      fragment BlockCarouselSlideFragment on BlockCarouselSlide {
        title
        image {
          url
        }
        ctaText
        ctaUrl
      }
    `;
  }
}
