import React from "react";
import { compose } from "recompose";
import { FormattedMessage } from "react-intl";
import makeCommandDispatcher from "web/core/apollo/makeCommandDispatcher";
import CartQuery from "theme/pages/Cart/CartQuery.gql";
import { formatCheckoutAddressInput } from "theme/modules/Checkout/Address/formatCheckoutAddress";

export const FORM_TYPE_EXISTING_ADDRESS = "existing";
export const FORM_TYPE_NEW_ADDRESS = "new";

export default ({
  SetBillingAddressMutation,
  SetShippingInformationMutation,
}) =>
  compose(
    makeCommandDispatcher({
      setBillingAddress:
        (props) =>
        ({ address, email, onSuccess }) => {
          return {
            options: {
              mutation: SetBillingAddressMutation,
              variables: {
                email,
                billingAddress: formatCheckoutAddressInput(address),
              },
              update: (store, { data }) => {
                const response = data.setCheckoutBillingAddress;
                if (response.success) {
                  const cart = response.cart;

                  store.writeQuery({
                    query: CartQuery,
                    data: { cart: cart },
                  });
                }
              },
            },
            callback: (result) => {
              if (result.status === "success") {
                onSuccess();
              }
            },
            messages: {
              error: (
                <FormattedMessage
                  id="modules.Checkout.Address.error"
                  defaultMessage="An error occured while recording your billing address. Please try again and if the problem persists contact us."
                />
              ),
            },
          };
        },
      onChooseShippingMethod: (props) => (method) => {
        const { method_code, carrier_code, additionalData } = method;
        return {
          options: {
            mutation: SetShippingInformationMutation,
            variables: {
              cartId: props.cartId,
              shippingAddress: formatCheckoutAddressInput(
                props.shippingAddress
                  ? props.shippingAddress
                  : { id: props.shippingAddressId }
              ),
              shippingMethod: {
                method_code,
                carrier_code,
                additionalData,
              },
            },
            update: (store, { data }) => {
              const response = data.setCheckoutShippingInformation;
              if (response.success) {
                const cart = response.cart;

                store.writeQuery({
                  query: CartQuery,
                  data: { cart: cart },
                });
              }
            },
          },
          callback: (result) => {
            if (result.status === "success") {
              props.onChooseShippingMethod(method);
            }
          },
          messages: {
            error: (
              <FormattedMessage
                id="modules.Checkout.ShippingMethod.ChooseShippingMethod.error"
                defaultMessage="An error occured while recording your shipping information. Please try again and if the problem persists contact us."
              />
            ),
          },
        };
      },
    })
  );
