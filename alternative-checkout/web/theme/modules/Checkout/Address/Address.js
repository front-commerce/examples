import React from "react";
import { injectIntl, defineMessages } from "react-intl";
import AddressQuery from "./AddressQuery.gql";
import EnhanceAddress, { FORM_TYPE_EXISTING_ADDRESS } from "./EnhanceAddress";
import TitledCard from "theme/components/molecules/Card/TitledCard";
import { BodyParagraph } from "theme/components/atoms/Typography/Body";
import ExistingAddress from "./ExistingAddress";
import NewAddress from "./NewAddress";
import { ErrorAlert } from "theme/components/molecules/Alert";
import { ACCOUNT_TYPE } from "theme/pages/Checkout/ChooseAccount/ChooseAccount";

const messages = defineMessages({
  yourAddress: {
    id: "modules.Checkout.Address.billingAddress",
    defaultMessage: "Your billing address",
  },
  selectAnAddress: {
    id: "modules.Checkout.Address.selectAnAddress",
    defaultMessage:
      "Please fill your address in order to proceed with your checkout",
  },
});

const Address = ({
  defaultBilling,
  defaultShipping,
  addresses,
  onChooseAddress,
  isEditingBillingAddress,
  isEditingShippingAddress,
  formType,
  shouldAskShipping = true,
  intl,
  commandPending,
  hasMessage,
  message,
  checkoutType,
  onAddressChange,
}) => {
  return (
    <TitledCard
      title={intl.formatMessage(messages.yourAddress)}
      description={
        <BodyParagraph>
          {intl.formatMessage(messages.selectAnAddress)}
        </BodyParagraph>
      }
    >
      {!commandPending && hasMessage && <ErrorAlert>{message}</ErrorAlert>}
      {formType === FORM_TYPE_EXISTING_ADDRESS ? (
        <ExistingAddress
          onAddressChange={onAddressChange}
          addresses={addresses}
          pending={commandPending}
          defaultShipping={defaultShipping && defaultShipping.id}
          defaultBilling={defaultBilling && defaultBilling.id}
          onChooseAddress={onChooseAddress}
          isEditingBillingAddress={isEditingBillingAddress}
          isEditingShippingAddress={isEditingShippingAddress}
          shouldAskShipping={shouldAskShipping}
        />
      ) : (
        <NewAddress
          onChooseAddress={onChooseAddress}
          shouldAskShipping={shouldAskShipping}
          pending={commandPending}
          shouldSaveAddress={checkoutType !== ACCOUNT_TYPE.GUEST}
          withEmail={checkoutType === ACCOUNT_TYPE.GUEST}
        />
      )}
    </TitledCard>
  );
};

export default EnhanceAddress({
  AddressQuery: AddressQuery,
})(injectIntl(Address));
