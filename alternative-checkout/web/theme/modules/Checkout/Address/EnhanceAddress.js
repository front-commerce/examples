import React, { useEffect, useState } from "react";
import { compose, branch, withHandlers, withProps } from "recompose";
import { graphql } from "react-apollo";
import { ACCOUNT_TYPE } from "theme/pages/Checkout/ChooseAccount/ChooseAccount";
import AddressLoading from "./AddressLoading";

export const FORM_TYPE_EXISTING_ADDRESS = "existing";
export const FORM_TYPE_NEW_ADDRESS = "new";

export default ({ AddressQuery }) =>
  compose(
    branch(
      (props) => props.checkoutType === ACCOUNT_TYPE.GUEST,
      withProps({
        loading: false,
        defaultBilling: null,
        defaultShipping: null,
        addresses: [],
      }),
      graphql(AddressQuery, {
        props: ({ data, ownProps }) => ({
          loading: data.loading,
          defaultBilling:
            ownProps.initialAddress?.billing ||
            (!data.loading && data.me.default_billing),
          defaultShipping:
            ownProps.initialAddress?.shipping ||
            (!data.loading && data.me.default_shipping),
          addresses: !data.loading && data.me.addresses,
        }),
      })
    ),
    branch(
      (props) => props.loading,
      () => AddressLoading,
      (BaseComponent) => BaseComponent
    ),
    (BaseComponent) => {
      // Once we're displaying a specific form type to the user
      // we won't change afterward to avoid any unexpected behavior
      // if some data changes
      const ComponentWithAddressFormType = (props) => {
        const [formType, setFormType] = useState(null);

        const { loading, addresses } = props;
        useEffect(() => {
          if (!formType && !loading && addresses) {
            if (addresses.length === 0) {
              setFormType(FORM_TYPE_NEW_ADDRESS);
            } else {
              setFormType(FORM_TYPE_EXISTING_ADDRESS);
            }
          }
        }, [formType, loading, addresses]);

        return <BaseComponent {...props} formType={formType} />;
      };
      return ComponentWithAddressFormType;
    },
    withHandlers({
      onChooseAddress: (props) => (billing, shipping, email) => {
        if (
          !billing ||
          (props.initialAddress &&
            props.initialAddress.billing &&
            props.initialAddress.billing.id &&
            props.initialAddress.billing.id === billing.id)
        ) {
          props.onChooseAddress(billing, shipping);
        } else {
          props.setBillingAddress({
            address: billing,
            email: email,
            onSuccess: () => {
              props.onChooseAddress(billing, shipping, email);
            },
          });
        }
      },
    })
  );
