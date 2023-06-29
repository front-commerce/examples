import React from "react";
import withTrackPage from "theme/modules/Analytics/withTrackPage";
import { H1 } from "theme/components/atoms/Typography/Heading";
import { FormattedMessage } from "react-intl";
import ContactForm from "theme/modules/Contact/ContactForm/ContactForm";
import ExplainedCallToAction from "theme/components/organisms/ExplainedCallToAction";
import Stack from "theme/components/atoms/Layout/Stack";
import StorefrontContent from "theme/modules/StorefrontContent";

import compose from "recompose/compose";
import graphqlWithPreload from "web/core/apollo/graphqlWithPreload";
import ContactQuery from "./ContactQuery.gql";
import WysiwygV2 from "theme/modules/WysiwygV2";

const Contact = ({ page }) => {
  return (
    <div className="page-content page-content--simple">
      <div className="container">
        <ExplainedCallToAction
          title={
            <StorefrontContent type={page.__typename} id={page.slug}>
              <H1>{page.title}</H1>
              {page.content && <WysiwygV2 content={page.content} />}
            </StorefrontContent>
          }
        >
          <Stack desktopSize="2" mobileSize="4">
            <div className="center">
              <FormattedMessage
                id="pages.Contact.description"
                defaultMessage="Do not hesitate to contact us, we will answer you as soon as possible."
              />
            </div>
            <ContactForm />
          </Stack>
        </ExplainedCallToAction>
      </div>
    </div>
  );
};

export default compose(
  graphqlWithPreload(ContactQuery, {
    props: ({ data }) => {
      return {
        loading: data.loading,
        page: !data.loading && data.contactPage,
      };
    },
  }),
  withTrackPage("Contact")
)(Contact);
