import React from "react";
import StorefrontContent from "theme/modules/StorefrontContent";
import MegaHeading from "theme/components/atoms/Typography/Heading/Mega";
import Carousel from "theme/components/organisms/Carousel";

const BlockCarousel = ({ data }) => {
  const slides = data.slides.map((item) => ({
    key: item.title,
    title: <MegaHeading as="h1">{item.title}</MegaHeading>,
    to: item.link,
    linkTitle: item.text,
    imageSrc: item.image,
  }));

  return (
    <StorefrontContent type={data.__typename} id={data.id}>
      <Carousel slides={slides} />
    </StorefrontContent>
  );
};

export default BlockCarousel;
