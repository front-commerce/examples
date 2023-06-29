import React from "react";
import { Helmet } from "react-helmet-async";
import useFullUrl from "web/core/shop/useFullUrl";
import { useLocation } from "react-router";

const SeoMetadata = ({ seo }) => {
  const location = useLocation();
  const canonicalUrl = useFullUrl(location.pathname);

  if (!seo) {
    return null;
  }

  return (
    <Helmet encodeSpecialCharacters={false}>
      {seo.title && <title>{seo.title}</title>}
      {seo.description && <meta name="description" content={seo.description} />}

      {/* Open Graph tags */}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary" />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={getRobotsValue(seo.index, seo.follow)} />
    </Helmet>
  );
};

const getRobotsValue = (index, follow) => {
  if (!index && !follow) {
    return "none";
  } else if (!index) {
    return "noindex";
  } else if (!follow) {
    return "nofollow";
  } else {
    return "all";
  }
};

export default SeoMetadata;
