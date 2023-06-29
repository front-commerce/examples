import compose from "recompose/compose";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";

const EnhanceHome = ({ HomePageQuery }) =>
  compose(
    withRouter,
    graphql(HomePageQuery, {
      name: "homepage",
      props: ({ homepage }) => {
        return {
          homePage: !homepage.loading && homepage.homePage,
        };
      },
    })
  );

export default EnhanceHome;
