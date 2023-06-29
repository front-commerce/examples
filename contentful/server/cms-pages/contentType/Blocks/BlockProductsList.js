import gql from "graphql-tag";
import StorefrontContentType from "front-commerce-contentful/server/core/domain/StorefrontContentType";

const formatContentfulData = (contentfulData) => {
  return {
    id: contentfulData?.sys?.id,
    title: contentfulData?.title,
  };
};

export default class BlockProductsList extends StorefrontContentType {
  constructor() {
    super(
      "blockProductsList",
      "BlockProductsList",
      formatContentfulData,
      (data) => data.id
    );
  }

  /**
   * @return {import("graphql/language/ast").DocumentNode} contentfulFragment
   */
  get contentfulFragment() {
    return gql`
      fragment BlockProductsListFragment on BlockProductsList {
        ${this.sys}
        title
      }
    `;
  }
}
