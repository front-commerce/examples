import ContentType from "front-commerce-contentful/server/core/domain/ContentType";
import gql from "graphql-tag";

const dataFormatter = (contentfulData) => {
  if (!contentfulData) {
    return null;
  }

  return {
    title: contentfulData.pageTitle,
    description: contentfulData.pageDescription,
    index: contentfulData.seoIndex,
    follow: contentfulData.seoFollow,
  };
};

class SeoMetadata extends ContentType {
  constructor() {
    super("seoMetadata", "SeoMetadata", dataFormatter);
  }

  get contentfulFragment() {
    return gql`
      fragment SeoMetadataFragment on SeoMetadata {
        pageTitle
        pageDescription
        seoIndex
        seoFollow
      }
    `;
  }
}

export default SeoMetadata;
