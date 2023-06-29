import React from "react";
import compose from "recompose/compose";
import Icon from "theme/components/atoms/Icon";
import Stack from "theme/components/atoms/Layout/Stack";
import { H2 } from "theme/components/atoms/Typography/Heading";
import Link from "theme/components/atoms/Typography/Link";
import { SuccessAlert } from "theme/components/molecules/Alert";
import FeatureList, { Feature } from "theme/components/organisms/FeatureList";
import PushBlock from "theme/components/organisms/PushBlock/PushBlock";
import Section from "theme/components/organisms/Section";
import Cell from "theme/components/templates/Grid/Cell";
import Grid from "theme/components/templates/Grid/Grid";
import withTrackPage from "theme/modules/Analytics/withTrackPage";
import HomePageContentBlocks from "theme/modules/Blocks/HomePageBlocks";
import Newsletter from "theme/modules/Newsletter";
import FeaturedProducts from "theme/modules/ProductList/FeaturedProducts";
import StorefrontContent from "theme/modules/StorefrontContent";
import SeoMetadata from "theme/modules/SeoMetadata";
import EnhanceHome from "./EnhanceHome";
import HomePageQuery from "./HomePageQuery.gql";

const Home = (props) => {
  return (
    <StorefrontContent
      type={props.homePage.__typename}
      id="homePage"
      scope="page"
    >
      <SeoMetadata seo={props.homePage.seo} />

      <div className="container">
        {props.location.state && props.location.state.successMessage && (
          <SuccessAlert>{props.location.state.successMessage}</SuccessAlert>
        )}
      </div>

      <Stack size="8">
        <Stack size="4" mobileSize="8">
          <HomePageContentBlocks
            content={props.homePage.blocks}
            renderBlock={(blocks) => {
              return (
                <Stack size="4" mobileSize="8">
                  {blocks}
                </Stack>
              );
            }}
          />

          <div className="container">
            <Grid>
              <Cell size="desktop-2">
                <PushBlock
                  imageSrc="/images/resized/hoodie.png"
                  format="pushBlockWide"
                >
                  <H2>New arrivals are in!</H2>
                  <Link buttonAppearance="default" to="/what-is-new.html">
                    Show collection
                  </Link>
                </PushBlock>
              </Cell>
              <Cell size="1">
                <PushBlock
                  imageSrc="/media/catalog/product/m/s/ms04-orange_main_1.jpg"
                  format="pushBlock"
                >
                  <H2>Gobi HeatTec® Tee $29,99</H2>
                  <Link
                    buttonAppearance="default"
                    to="/gobi-heattec-reg-tee.html"
                  >
                    More details
                  </Link>
                </PushBlock>
              </Cell>
              <Cell size="1">
                <PushBlock
                  imageSrc="/images/resized/sale-push.png"
                  format="pushBlock"
                >
                  <H2>Sale this summer</H2>
                  <Link
                    buttonAppearance="default"
                    to="/promotions/women-sale.html"
                  >
                    View all
                  </Link>
                </PushBlock>
              </Cell>
            </Grid>
          </div>
        </Stack>

        <Section title={<H2>Why should you choose us?</H2>}>
          <div className="container">
            <FeatureList>
              <Feature
                appearance="big"
                icon={
                  <Icon size="big" appearance="block" icon="cube" title="" />
                }
                title={"Free Shipping"}
                description="All purchases over $199 are eligible for free shipping via USPS First Class Mail."
              />
              <Feature
                appearance="big-primary"
                icon={
                  <Icon size="big" appearance="block" icon="cash" title="" />
                }
                title={"Easy Payments"}
                description="All payments are processed instantly over a secure payment protocol."
              />
              <Feature
                appearance="big"
                icon={
                  <Icon size="big" appearance="block" icon="lock" title="" />
                }
                title={"Money-Back Guarantee"}
                description="If an item arrived damaged or you've changed your mind, you can send it back for a full refund."
              />
              <Feature
                appearance="big"
                icon={
                  <Icon size="big" appearance="block" icon="star" title="" />
                }
                title={"Finest Quality"}
                description="Designed to last, each of our products has been crafted with the finest materials."
              />
            </FeatureList>
          </div>
        </Section>
        <Section title={<H2>Products in today</H2>}>
          <FeaturedProducts categoryId="38" />
        </Section>
        <div className="container">
          <Newsletter />
        </div>
      </Stack>
    </StorefrontContent>
  );
};

export default compose(
  EnhanceHome({ HomePageQuery }),
  withTrackPage("Home")
)(Home);
