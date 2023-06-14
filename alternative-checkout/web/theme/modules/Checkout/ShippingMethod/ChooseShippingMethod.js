import React from "react";
import PropTypes from "prop-types";
import { compose, branch } from "recompose";
import { defineMessages, injectIntl, FormattedMessage } from "react-intl";
import TitledCard from "theme/components/molecules/Card/TitledCard";
import ShippingMethodForm from "./ShippingMethodForm";
import EnhanceChooseShippingMethod from "./EnhanceChooseShippingMethod";
import { BodyParagraph } from "theme/components/atoms/Typography/Body";
import LoadingArea from "theme/components/molecules/LoadingArea";
import { ErrorAlert, InfoAlert } from "theme/components/molecules/Alert";
import Button from "theme/components/atoms/Button";
import Link from "theme/components/atoms/Typography/Link";
import AvailableShippingMethodQuery from "./AvailableShippingMethodQuery.gql";
import addressShape from "theme/pages/Account/AddressBook/addressShape";

const messages = defineMessages({
  yourShippingOptions: {
    id: "modules.Checkout.ShippingMethod.ChooseShippingMethod.yourShippingOptions",
    defaultMessage: "Shipping methods",
  },
  chooseShippingOption: {
    id: "modules.Checkout.ShippingMethod.ChooseShippingMethod.chooseShippingOption",
    defaultMessage: "Choose the option that fits the most your need",
  },
  onlyOneShippingOption: {
    id: "modules.Checkout.ShippingMethod.ChooseShippingMethod.onlyOneShippingOption",
    defaultMessage: "Your order will be shipped using this method",
  },
});

const Description = injectIntl(({ intl, numberOfOptions }) => (
  <BodyParagraph>
    {intl.formatMessage(
      numberOfOptions > 1
        ? messages.chooseShippingOption
        : messages.onlyOneShippingOption
    )}
  </BodyParagraph>
));

const NoShippingAddress = ({ intl }) => {
  return (
    <TitledCard title={intl.formatMessage(messages.yourShippingOptions)}>
      <InfoAlert>
        <span>
          <FormattedMessage
            id="modules.Checkout.ShippingMethod.ChooseShippingMethod.noShippingAddress"
            defaultMessage="Please select a shipping address before choosing a shipping method."
          />
        </span>
      </InfoAlert>
    </TitledCard>
  );
};

const NoShippingMethod = ({ intl, onChangeShippingAddress }) => {
  return (
    <TitledCard title={intl.formatMessage(messages.yourShippingOptions)}>
      <ErrorAlert>
        <span>
          <FormattedMessage
            id="modules.Checkout.ShippingMethod.ChooseShippingMethod.noMethods"
            defaultMessage="We cannot ship to the selected address. Please {change_address} or {contact_us} if you need further information."
            values={{
              change_address: (
                <Button appearance="link" onClick={onChangeShippingAddress}>
                  <FormattedMessage
                    id="modules.Checkout.ShippingMethod.ChooseShippingMethod.changeAddress"
                    defaultMessage="change your shipping address"
                  />
                </Button>
              ),
              contact_us: (
                <Link to="/contact">
                  <FormattedMessage
                    id="modules.Checkout.ShippingMethod.ChooseShippingMethod.contactUs"
                    defaultMessage="contact us"
                  />
                </Link>
              ),
            }}
          />
        </span>
      </ErrorAlert>
    </TitledCard>
  );
};

const ChooseShippingMethod = ({
  intl,
  onChooseShippingMethod,
  loading,
  commandPending,
  commandResponse,
  availableShippingMethodList,
  initialShipping,
  shippingAddressId,
  shippingAddress,
}) => {
  return (
    <TitledCard
      title={intl.formatMessage(messages.yourShippingOptions)}
      description={
        loading ? null : (
          <Description numberOfOptions={availableShippingMethodList.length} />
        )
      }
    >
      {commandResponse && !commandResponse.success && (
        <ErrorAlert>
          <span>{commandResponse.errorMessage}</span>
        </ErrorAlert>
      )}

      {loading ? (
        <LoadingArea>
          <FormattedMessage
            id="modules.Checkout.ShippingMethod.ChooseShippingMethod.loading"
            defaultMessage="Retrieving shipping methods available for your address…"
          />
        </LoadingArea>
      ) : (
        <ShippingMethodForm
          onSelect={onChooseShippingMethod}
          methods={availableShippingMethodList}
          initialShipping={initialShipping}
          pending={commandPending}
          shippingAddress={shippingAddress}
          shippingAddressId={shippingAddressId}
        />
      )}
    </TitledCard>
  );
};

ChooseShippingMethod.propTypes = {
  shippingAddressId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shippingAddress: addressShape.isRequired,
  onChooseShippingMethod: PropTypes.func.isRequired,
  onChangeShippingAddress: PropTypes.func.isRequired,
};

export default compose(
  injectIntl,
  branch(
    (props) => !props.loading && !props.shippingAddress,
    () => NoShippingAddress,
    (BaseComponent) => BaseComponent
  ),
  EnhanceChooseShippingMethod({
    AvailableShippingMethodQuery,
  }),
  branch(
    (props) =>
      !props.loading &&
      (!props.availableShippingMethodList ||
        props.availableShippingMethodList.length === 0),
    () => NoShippingMethod,
    (BaseComponent) => BaseComponent
  )
)(ChooseShippingMethod);
