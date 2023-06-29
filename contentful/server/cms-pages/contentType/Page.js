import StorefrontContentType from "front-commerce-contentful/server/core/domain/StorefrontContentType";
import gql from "graphql-tag";

/**
 * @param {InstanceType<import("./SeoMetadata")["default"]>} seoMetadata
 * @param {InstanceType<import("./RichTextField")["default"]>} contentField
 */
const formatContentfulData =
  (seoMetadata, contentField) => (contentfulData) => {
    return {
      title: contentfulData.title,
      slug: contentfulData.slug,
      seo: seoMetadata.dataFormatter(contentfulData.seo),
      content: contentField.dataFormatter(contentfulData.content),
    };
  };

class Page extends StorefrontContentType {
  /**
   * @param {import("./Blocks")["default"]} blocksLibrary
   * @param {InstanceType<import("./SeoMetadata")["default"]>} seoMetadata
   * @param {InstanceType<import("./RichTextField")["default"]>} richTextField
   */
  constructor(blocksLibrary, seoMetadata, richTextField) {
    const contentField = richTextField.createField("content");
    super(
      "page",
      "ContentfulPage",
      formatContentfulData(seoMetadata, contentField),
      (data) => data.slug
    );
    this.seoMetadata = seoMetadata;
    this.contentField = contentField;
  }

  get contentfulFragment() {
    return gql`
      fragment PageFragment on Page {
        ${this.sys}
        title
        slug
        seo{
          ${this.seoMetadata.contentfulFragmentName}
        }
        ${this.contentField.contentfulFragmentName}
      }
      ${this.seoMetadata.contentfulFragment}
    `;
  }
}

export default Page;
