import { compose, branch } from "recompose";
import { graphql } from "react-apollo";
import CheckAuthQuery from "theme/modules/Router/CheckAuthQuery.gql";
import RedirectOnLogoutQuery from "./RedirectOnLogoutQuery.gql";

// How long after the user has been logged out can we afford to redirect them?
// Try to avoid too much polling to preserve the server's load!
const LOGOUT_POLLING_INTERVAL_IN_MS = 500;

const withRedirectOnLogout = (redirectTo) =>
  compose(
    graphql(RedirectOnLogoutQuery, {
      options: {
        pollInterval: LOGOUT_POLLING_INTERVAL_IN_MS,
      },
      props: ({ data }) => {
        return {
          pollingEnabled: true,
          mustRedirect: !data.loading && !data.isLoggedIn,
        };
      },
    }),
    branch(
      ({ mustRedirect }) => mustRedirect,
      () => () => {
        console.debug("You've been logged out… we're redirecting you."); // eslint-disable-line no-console
        // Full page reload to prevent any client-side state to kick-in
        window.location.href = redirectTo;
        return null;
      }
    )
  );

const EnhanceAutoRedirectOnLogout = compose(
  // Initial login state, to start polling only when the user is logged in
  graphql(CheckAuthQuery, {
    props: ({ data }) => ({
      isLoggedIn: !data.loading && data.me.id,
    }),
  }),
  branch(({ isLoggedIn }) => isLoggedIn, withRedirectOnLogout("/login"))
);

export default EnhanceAutoRedirectOnLogout;
