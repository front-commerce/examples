import React from "react";
import { compose } from "recompose";
import Address from "theme/modules/Checkout/Address";
import Stack from "theme/components/atoms/Layout/Stack";
import ChooseShippingMethod from "theme/modules/Checkout/ShippingMethod";
import EnhanceAddressAndShippingMethod from "./EnhanceAddressAndShippingMethod";
import SetBillingAddressMutation from "theme/modules/Checkout/Address/SetBillingAddressMutation.gql";
import SetShippingInformationMutation from "theme/modules/Checkout/ShippingMethod/SetShippingInformationMutation.gql";
import CartIdQuery from "theme/modules/Checkout/withCartId/CartIdQuery.gql";
import withCartId from "theme/modules/Checkout/withCartId";

const AddressAndShippingMethod = (props) => {
  // Invalidate shipping method selection
  // in case the customer changed its address
  const onAddressChange = () => {
    props.onChooseAddress(null, null);
  };

  return (
    <Stack desktopSize="2" mobileSize="4">
      <Address
        onAddressChange={onAddressChange}
        checkoutType={props.checkoutType}
        isEditingBillingAddress={props.isEditingBillingAddress}
        isEditingShippingAddress={props.isEditingShippingAddress}
        initialAddress={{
          billing: props.billingAddress,
          shipping: props.shippingAddress,
        }}
        onChooseAddress={props.onChooseAddress}
        shouldAskShipping={props.isShippable ?? true}
        setBillingAddress={props.setBillingAddress}
        commandPending={props.commandPending}
        hasMessage={props.hasMessage}
        message={props.message}
      />
      <ChooseShippingMethod
        shippingAddress={props.shippingAddress}
        billingAddress={props.billingAddress}
        setShippingAddress={props.setShippingAddress}
        setBillingAddress={props.setBillingAddress}
        initialShipping={props.initialShipping}
        onChooseShippingMethod={props.onChooseShippingMethod}
        onChangeShippingAddress={() => props.gotoStepNumber(0)}
        commandPending={props.commandPending}
        hasMessage={props.hasMessage}
        message={props.message}
        cartId={props.cartId}
      />
    </Stack>
  );
};

export default compose(
  withCartId({ CartIdQuery }),
  EnhanceAddressAndShippingMethod({
    SetBillingAddressMutation,
    SetShippingInformationMutation,
  })
)(AddressAndShippingMethod);
