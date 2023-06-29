import React from "react";
import StorefrontContent from "theme/modules/StorefrontContent";
import Section from "theme/components/organisms/Section";
import { H2 } from "theme/components/atoms/Typography/Heading";
import Link from "theme/components/atoms/Typography/Link";
import FeaturedProducts from "theme/modules/ProductList/FeaturedProducts";

const BlockCategoryProductsList = (props) => {
  const hasAction = props.data.actionText && props.data.actionUrl;

  return (
    <StorefrontContent type={props.data.__typename} id={props.data.id}>
      <Section
        title={<H2>{props.data.title}</H2>}
        actions={
          hasAction && (
            <Link to={props.data.actionUrl} buttonAppearance="default">
              {props.data.actionText}
            </Link>
          )
        }
      >
        <FeaturedProducts categoryId={props.data.categoryId} />
      </Section>
    </StorefrontContent>
  );
};

export default BlockCategoryProductsList;
