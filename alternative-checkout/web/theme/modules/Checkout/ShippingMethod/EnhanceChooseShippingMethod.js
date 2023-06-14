import compose from "recompose/compose";
import { graphql } from "react-apollo";
import { formatAddressInput } from "theme/modules/User/Address/AddressForm/formatAddressInput";

const getAddressInput = ({ shippingAddress, shippingAddressId }) => {
  if (shippingAddress) {
    return shippingAddress.id
      ? { id: shippingAddress.id }
      : formatAddressInput(shippingAddress);
  } else {
    return { id: shippingAddressId };
  }
};

const EnhanceChooseShippingMethod = ({ AvailableShippingMethodQuery }) =>
  compose(
    graphql(AvailableShippingMethodQuery, {
      options: (props) => {
        return {
          fetchPolicy: "network-only",
          variables: {
            address: getAddressInput(props),
          },
        };
      },
      props: ({ data }) => ({
        loading: data.loading,
        availableShippingMethodList:
          !data.loading &&
          data.checkout &&
          data.checkout.availableShippingMethodList.data,
      }),
    })
  );

export default EnhanceChooseShippingMethod;
