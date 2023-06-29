import gql from "graphql-tag";
import StorefrontContentType from "front-commerce-contentful/server/core/domain/StorefrontContentType";

const formatContentfulData = (contentfulData) => {
  return {
    title: contentfulData.title,
  };
};

export default class BlockPushItem extends StorefrontContentType {
  constructor() {
    super("blockPushItem", "BlockPushItem", formatContentfulData);
  }

  /**
   * @return {import("graphql/language/ast").DocumentNode} contentfulFragment
   */
  get contentfulFragment() {
    return gql`
      fragment BlockPushItemFragment on BlockPushItem {
        ${this.sys}
        title
      }
    `;
  }
}
