import React from "react";
import compose from "recompose/compose";
import graphqlWithPreload from "web/core/apollo/graphqlWithPreload";
import withEntityNotFound from "theme/modules/PageError/NotFound/withEntityNotFound";
import withTrackPage from "theme/modules/Analytics/withTrackPage";
import StorefrontContent from "theme/modules/StorefrontContent";
import { H1 } from "theme/components/atoms/Typography/Heading";
import ContentQuery from "./ContentQuery.gql";
import SeoMetadata from "theme/modules/SeoMetadata";
import WysiwygV2 from "theme/modules/WysiwygV2";

const Content = ({ page }) => {
  return (
    <StorefrontContent type={page.__typename} id={page.slug} scope="page">
      <SeoMetadata seo={page.seo} />
      <div className="page-content page-content--simple">
        <div className="container">
          <H1>{page.title}</H1>
          {page.content && <WysiwygV2 content={page.content} />}
        </div>
      </div>
    </StorefrontContent>
  );
};

const makeVariables = (params) => {
  return {
    variables: {
      slug: params.match.params.slug,
    },
  };
};

export default compose(
  graphqlWithPreload(ContentQuery, {
    options: (props) => makeVariables(props),
    preloadOptions: (params) => makeVariables(params),
    props: ({ data }) => {
      return {
        loading: data.loading,
        page: !data.loading && data.marketingPage,
      };
    },
  }),
  withEntityNotFound({
    isFound: (props) => props.loading || props.page,
  }),
  withTrackPage((props) => "Content " + props.page.title)
)(Content);
