import React, { useRef } from "react";
import classnames from "classnames";
import { compose, lifecycle } from "recompose";
import { Helmet } from "react-helmet-async";
import { injectIntl, FormattedMessage } from "react-intl";
import { withCookies } from "react-cookie";
import { initAnalytics } from "web/core/analytics";
import config from "config/website";
import useFullUrl from "web/core/shop/useFullUrl";
import ErrorBoundary from "theme/components/helpers/ErrorBoundary";
import PageError from "theme/modules/PageError";
import Spacer from "theme/components/atoms/Layout/Spacer";
import withRefreshing from "./withRefreshing";
import MagicButton from "theme/modules/MagicButton";
import AutoRedirectOnLogout from "theme/components/AutoRedirectOnLogout";

/**
 * Component overridden from theme-chocolatine.
 * It only inserts the <AutoRedirectOnLogout /> component in all pages.
 */

const GenericLayout = ({
  header,
  footer,
  children,
  intl,
  refreshing = false,
}) => {
  const url = useFullUrl("/");

  const contentRef = useRef();

  return (
    <>
      <button
        className="sr-only sr-focusable"
        onClick={() => {
          contentRef.current && contentRef.current.focus();
        }}
      >
        <FormattedMessage
          id="layouts.GenericLayout.goToMainContent"
          defaultMessage="Go to main content"
        />
      </button>
      <div
        className={classnames("wrapper", { "wrapper--refreshing": refreshing })}
        itemScope
        itemType="http://schema.org/WebSite"
      >
        {/* this meta is outside Helmet because it describes the itemType="WebSite" */}
        <meta itemProp="url" content={url} />

        <Helmet defaultTitle={config.defaultTitle}>
          <html lang={intl.locale} />
          <meta name="language" content={intl.locale} />
          <meta name="robots" content="Index,Follow" />
          <meta name="description" content={config.defaultDescription} />
          {config.themeColor ? (
            <meta name="theme-color" content={config.themeColor} />
          ) : null}
        </Helmet>
        {header}
        <div className="main-content" tabIndex="-1" ref={contentRef}>
          <ErrorBoundary>
            {({ hasError }) => (hasError ? <PageError /> : children)}
          </ErrorBoundary>
        </div>
        {footer ? <Spacer /> : null}
        {footer}
        <MagicButton />

        {/* This is the only change on this component */}
        <AutoRedirectOnLogout />
      </div>
    </>
  );
};

export default compose(
  injectIntl,
  withRefreshing(),
  withCookies,
  lifecycle({
    componentDidMount() {
      initAnalytics(this.props.cookies.get("authorizations"));
    },
  })
)(GenericLayout);
