import AtomLink from "theme/components/atoms/Typography/Link";

export default {
  "contentful-link": (props) => {
    return <AtomLink to={props.data.url}>{props.children}</AtomLink>;
  },
};
