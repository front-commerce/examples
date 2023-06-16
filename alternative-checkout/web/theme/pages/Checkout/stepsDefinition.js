import React from "react";
import { defineMessages } from "react-intl";
import { Redirect } from "react-router";

import ChoosePayment from "theme/modules/Checkout/Payment";
import PlaceOrder from "theme/modules/Checkout/PlaceOrder";
import { ACCOUNT_TYPE } from "./ChooseAccount/ChooseAccount";
import ProgressIcon from "theme/modules/Checkout/ProgressIcon";
import checkoutFlowOf from "./checkoutFlowOf";
import AddressAndShippingMethod from "theme/modules/Checkout/AddressAndShippingMethod";

const messages = defineMessages({
  addressAndShipping: {
    id: "pages.Checkout.addressAndShippingProgressLabel",
    defaultMessage: "Address and shipping",
  },
  payment: {
    id: "pages.Checkout.paymentProgressLabel",
    defaultMessage: "Payment",
  },
  validation: {
    id: "pages.Checkout.paymentValidation",
    defaultMessage: "Validation",
  },
});

const steps = [
  {
    renderProgressItem: (state, checkoutState, status) => {
      return (
        <ProgressIcon
          key="address-shipping-method"
          status={status}
          icon="user"
          label={messages.addressAndShipping}
        />
      );
    },
    renderStep: (props) => {
      return (
        <AddressAndShippingMethod
          checkoutType={props.checkoutState.checkoutType}
          isEditingBillingAddress={props.checkoutState.isEditingBillingAddress}
          isEditingShippingAddress={
            props.checkoutState.isEditingShippingAddress
          }
          initialAddress={{
            billing: props.checkoutState.billingAddress,
            shipping: props.checkoutState.shippingAddress,
          }}
          onChooseAddress={(billing, shipping, email) => {
            props.checkoutTransaction(() => {
              props.setEmail(email);
              props.setBillingAddress(billing);
              props.setShippingAddress(shipping);
            });
          }}
          shouldAskShipping={props.checkoutState.isShippable ?? true}
          shippingAddress={props.checkoutState.shippingAddress}
          billingAddress={props.checkoutState.billingAddress}
          setShippingAddress={props.setShippingAddress}
          setBillingAddress={props.setBillingAddress}
          initialShipping={{
            shippingMethod: props.checkoutState.shippingMethod,
            shippingAdditionalInfo: props.checkoutState.shippingAdditionalInfo,
          }}
          onChooseShippingMethod={(method) => {
            const { additionalData, ...rest } = method;
            props.checkoutTransaction(() => {
              props.setShippingMethod(rest);
              props.setShippingAdditionalInfo(additionalData || {});
            });
          }}
          onChangeShippingAddress={() => props.gotoStepNumber(0)}
        />
      );
    },
    isValid: (checkoutState) => {
      const isValidAddress = (address) =>
        checkoutState.checkoutType === ACCOUNT_TYPE.GUEST
          ? address
          : address?.id;

      const hasGuestInfo =
        checkoutState.checkoutType !== ACCOUNT_TYPE.GUEST ||
        checkoutState.email;
      return (
        isValidAddress(checkoutState.billingAddress) &&
        (!checkoutState.isShippable ||
          isValidAddress(checkoutState.shippingAddress)) &&
        hasGuestInfo &&
        checkoutState.shippingMethod &&
        checkoutState.shippingMethod.carrier_code &&
        checkoutState.shippingMethod.method_code &&
        checkoutState.shippingAdditionalInfo
      );
    },
    isRelevant: () => true,
    isDisplayable: () => true,
  },
  {
    renderProgressItem: (state, checkoutState, status) => (
      <ProgressIcon
        key="payment"
        status={status}
        icon="lock"
        label={messages.payment}
      />
    ),
    renderStep: (props) => (
      <ChoosePayment
        initialPayment={{
          paymentMethod: props.checkoutState.paymentMethod,
          paymentAdditionalInfo: props.checkoutState.paymentAdditionalInfo,
          gscAccepted: props.checkoutState.gscAccepted,
        }}
        onChoosePayment={(payment) => {
          props.checkoutTransaction(() => {
            props.setPaymentMethod(payment.code);
            props.setPaymentAdditionalInfo(payment.additionalData);
            props.setGscAcceptance(payment.gsc);
          });
        }}
      />
    ),
    isValid: (checkoutState) =>
      checkoutState.paymentMethod &&
      checkoutState.paymentAdditionalInfo &&
      checkoutState.gscAccepted,
    isRelevant: () => true,
    isDisplayable: () => true,
  },
  {
    renderProgressItem: (state, checkoutState, status) => (
      <ProgressIcon
        key="validation"
        status={status}
        icon="checkmark-circle"
        label={messages.validation}
      />
    ),
    renderStep: (props) => (
      <PlaceOrder
        email={props.checkoutState.email}
        billingAddress={props.checkoutState.billingAddress}
        paymentMethod={props.checkoutState.paymentMethod}
        paymentFlowType={checkoutFlowOf(props.checkoutState.paymentMethod)}
        paymentAdditionalData={props.checkoutState.paymentAdditionalInfo}
        onOrderPlaced={(orderId, paymentMessage) =>
          props.markAsPlaced({
            orderId,
            paymentMessage,
          })
        }
        location={props.location}
      />
    ),
    isValid: (checkoutState) => checkoutState.isPlaced,
    isRelevant: () => true,
    isDisplayable: (checkoutState) => !!checkoutState.paymentMethod,
  },
  {
    renderStep: (props) => (
      <Redirect
        to={{
          pathname: "/checkout/success",
          state: {
            ...props.checkoutState.placedOrderData,
            checkoutState: props.checkoutState,
          },
        }}
      />
    ),
    isValid: (checkoutState) => false,
    isRelevant: () => true,
    isDisplayable: (checkoutState) => checkoutState.isPlaced,
  },
];

export default steps;
