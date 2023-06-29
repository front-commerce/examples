import makeContentBlockLibrary from "theme/modules/Contentful/ContentBlocks/makeContentBlockLibrary";

import { BlockCarousel, BlockCarouselFragment } from "./BlockCarousel";
import {
  BlockCategoryProductsList,
  BlockCategoryProductsListFragment,
} from "./BlockCategoryProductsList";

const blockLibrary = makeContentBlockLibrary("HomePageBlocks", [
  {
    component: BlockCarousel, // Full Image
    fragment: BlockCarouselFragment,
  },
  {
    component: BlockCategoryProductsList, // Products Cards
    fragment: BlockCategoryProductsListFragment,
  },
]);

const definitions = blockLibrary.fragmentDefinitions;

export { definitions };

export default blockLibrary.ContentBlock;
