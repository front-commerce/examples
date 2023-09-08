import React from "react";
import graphqlWithPreload from "web/core/apollo/graphqlWithPreload";
import gql from "graphql-tag";

const EnhanceForceLogout = graphqlWithPreload(
  gql`
    query ForceLogoutQuery {
      simulateUnattendedLogout
    }
  `,
  {
    props: ({ data }) => ({
      loading: data.loading,
      theDataWeWantToDisplay: data.simulateUnattendedLogout,
    }),
  }
);

const ForceLogout = (props) => {
  return (
    <div className="container">
      <h1>Force Logout</h1>
      <p>
        When fetching data for this page, you were <em>unexpectedly</em> logged
        out (if logged in)!
      </p>
      <p>{props.loading ? "Loading…" : props.theDataWeWantToDisplay}</p>
    </div>
  );
};

export default EnhanceForceLogout(ForceLogout);
