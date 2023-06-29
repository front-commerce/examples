import { INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import ContentType from "front-commerce-contentful/server/core/domain/ContentType";

const formatContentfulData = (fieldName, WysiwygLoader) => (contentfulData) => {
  const richContent = contentfulData?.[fieldName]?.json || contentfulData?.json;
  if (!richContent) {
    return null;
  }

  /**
   * @type {import("@contentful/rich-text-html-renderer").Options}
   */
  const richTextOptions = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        const text = node.content[0]?.value ?? "Link";
        try {
          const url = node.data.target.sys.id;
          return `<contentful-link href="${url}">${text}</contentful-link>`;
        } catch (e) {
          return `<a href="#TODO">${text}</a>`;
        }
      },
    },
    renderMark: {
      [MARKS.CODE]: (value) => {
        // we use pre tags as it's already styled in the fc app
        return `<pre>${value}</pre>`;
      },
    },
  };

  return WysiwygLoader.parse(
    documentToHtmlString(richContent, richTextOptions)
  );
};

class RichTextField extends ContentType {
  constructor(WysiwygLoader, fieldName = "", alias = fieldName) {
    WysiwygLoader.registerNodeType(
      "contentful-link",
      "WysiwygContentfulLinkData"
    );

    const dataFormatter = fieldName
      ? formatContentfulData(fieldName, WysiwygLoader)
      : () => {
          throw new Error(
            "You should first create a field using the `createField` method"
          );
        };

    super(fieldName, "Wysiwyg", dataFormatter);

    /**
     * @private
     */
    this.WysiwygLoader = WysiwygLoader;

    /**
     * @private
     */
    this.fieldName = fieldName;

    /**
     * @private
     */
    this.alias = alias;
  }

  /**
   * @param {string} fieldName
   * @param {string} [alias]
   * @returns {ContentType}
   */
  createField = (fieldName, alias = fieldName) => {
    this.dataFormatter = formatContentfulData(fieldName, this.WysiwygLoader);
    this.fieldName = fieldName;
    this.alias = alias;
    return this;
  };

  /**
   * @return {import("graphql/language/ast").DocumentNode} contentfulFragment
   */
  get contentfulFragment() {
    // we don't use a fragment here. The field name is sufficient.
    // @see get contentfulFragmentName() below
    return "";
  }

  /**
   * @return {string}
   */
  get contentfulFragmentName() {
    return `${this.alias}: ${this.fieldName} { json }`;
  }
}

export default RichTextField;
