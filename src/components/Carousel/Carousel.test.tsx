import { render } from "@testing-library/react";

import Carousel from "./Carousel";

it("renders correctly", () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const el = render(
    <Carousel>
      <div></div>
    </Carousel>,
  );
  expect(el).toMatchSnapshot();
});
