import React, { useState } from "react";
import PropTypes from "prop-types";
import { defineMessages, injectIntl } from "react-intl";
import EnhanceExistingAddress from "./EnhanceExistingAddress";
import AddressSelector from "./AddressSelector";
import { PrimaryButton } from "theme/components/atoms/Button";
import { ErrorAlert } from "theme/components/molecules/Alert";
import FormTitle from "theme/components/molecules/Form/FormTitle";
import FormActions from "theme/components/molecules/Form/FormActions";
import Checkbox from "theme/components/atoms/Form/Input/Checkbox";
import { H1 } from "theme/components/atoms/Typography/Heading";
import { BodyStrong } from "theme/components/atoms/Typography/Body";
import Fieldset from "theme/components/atoms/Form/Fieldset";
import Stack from "theme/components/atoms/Layout/Stack";
import StepActions from "theme/components/templates/MultiStep/StepActions";

const messages = defineMessages({
  useForShippingLabel: {
    id: "modules.Checkout.Address.ExistingAddress.useForShipping",
    defaultMessage: "Ship to this address",
  },
  submitLabel: {
    id: "modules.Checkout.Address.ExistingAddress.submit",
    defaultMessage: "Continue my order",
  },
  selectAShipping: {
    id: "modules.Checkout.Address.ExistingAddress.selectAShipping",
    defaultMessage: "Please select a shipping address",
  },
  shippingAddress: {
    id: "modules.Checkout.Address.ExistingAddress.shippingAddress",
    defaultMessage: "Your shipping address",
  },
});

const ExistingAddress = (props) => {
  const [billing, setBilling] = useState(null);
  const [shipping, setShipping] = useState(null);
  const [useBillingForShipping, setUseBillingForShipping] = useState(
    props.defaultShipping === props.defaultBilling || !props.defaultShipping
  );
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit({
      billing: billing,
      shipping: shipping,
    });
  };

  const onToggleShipping = () => {
    setUseBillingForShipping(!useBillingForShipping);
    setShipping(useBillingForShipping ? null : billing);
    setError(useBillingForShipping ? error : null);
  };

  const onChange = (type, data) => {
    if (useBillingForShipping) {
      setBilling(data);
      setShipping(data);
      setError(null);
    } else if (type === "billing") {
      setBilling(data);
    } else if (type === "shipping") {
      setShipping(data);
    } else {
      setError(error);
    }
    props.onAddressChange();
  };

  const displayInvalidShippingError = () => {
    setError(props.intl.formatMessage(messages.selectAShipping));
  };

  return (
    <Stack desktopSize="2" mobileSize="4">
      <AddressSelector
        key="billing"
        name="billing"
        isEditingInitially={props.isEditingBillingAddress}
        addresses={props.addresses}
        value={billing}
        onChange={(data) => onChange("billing", data)}
      />

      {props.shouldAskShipping && (
        <Stack key="shipping" desktopSize="2" mobileSize="4">
          <Fieldset key="useForShipping">
            <Checkbox
              id="use_for_shipping"
              name="use_for_shipping"
              onChange={onToggleShipping}
              checked={useBillingForShipping}
              label={
                <BodyStrong>
                  {props.intl.formatMessage(messages.useForShippingLabel)}
                </BodyStrong>
              }
              appearance="center"
            />
          </Fieldset>

          {!useBillingForShipping && (
            <Stack key="shippingSelector" mobileSize="4" desktopSize="2">
              <FormTitle>
                <H1 as="h2">
                  {props.intl.formatMessage(messages.shippingAddress)}
                </H1>
              </FormTitle>
              <AddressSelector
                name="shipping"
                isEditingInitially={props.isEditingShippingAddress}
                addresses={props.addresses}
                value={shipping}
                onChange={(data) => onChange("shipping", data)}
              />
            </Stack>
          )}
        </Stack>
      )}

      {error && <ErrorAlert key="error">{error}</ErrorAlert>}

      <StepActions key="actions">
        <FormActions>
          <PrimaryButton
            state={
              props.pending
                ? "pending"
                : props.shouldAskShipping && !useBillingForShipping && !shipping
                ? "disabled"
                : undefined
            }
            onClick={handleSubmit}
            onDisableClick={displayInvalidShippingError}
          >
            {props.intl.formatMessage(messages.submitLabel)}
          </PrimaryButton>
        </FormActions>
      </StepActions>
    </Stack>
  );
};

ExistingAddress.propTypes = {
  addresses: PropTypes.array.isRequired,
};

ExistingAddress.defaultProps = {
  shouldAskShipping: true,
};

export default EnhanceExistingAddress(injectIntl(ExistingAddress));
