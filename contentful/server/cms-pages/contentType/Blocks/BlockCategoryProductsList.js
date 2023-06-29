import gql from "graphql-tag";
import StorefrontContentType from "front-commerce-contentful/server/core/domain/StorefrontContentType";

const formatContentfulData = (contentfulData) => {
  return {
    id: contentfulData.sys?.id,
    title: contentfulData.title,
    categoryId: contentfulData.categoryId,
    numberOfProducts: contentfulData.numberOfProducts,
    actionText: contentfulData.actionText,
    actionUrl: contentfulData.actionUrl,
  };
};

export default class BlockCategoryProductsList extends StorefrontContentType {
  constructor() {
    super(
      "blockCategoryProductsList",
      "BlockCategoryProductsList",
      formatContentfulData,
      (data) => data.id
    );
  }

  /**
   * @return {import("graphql/language/ast").DocumentNode} contentfulFragment
   */
  get contentfulFragment() {
    return gql`
      fragment BlockCategoryProductsListFragment on BlockCategoryProductsList {
        ${this.sys}
        title
        categoryId
        numberOfProducts
        actionText
        actionUrl
      }
    `;
  }
}
