import ContentType from "front-commerce-contentful/server/core/domain/ContentType";
import gql from "graphql-tag";

// Our formatter function which will transform the data received from Contentful
const formatContentfulData = (contentfulData) => {
  // This should matched the data expected by your GraphQL schema
  return {
    title: contentfulData.title,
    slug: contentfulData.slug,
  };
};

class Page extends ContentType {
  constructor() {
    super("page", "ContentfulPage", formatContentfulData);
  }

  get contentfulFragment() {
    return gql`
      fragment PageFragment on Page {
        title
        slug
      }
    `;
  }
}

export default Page;
