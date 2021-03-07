import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { Provider } from "react-redux";
import store from "../../store";
import Gallery from "./Gallery";
import reducer from "./gallerySlice";

describe("", () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

    beforeEach(() => {
      useSelectorMock.mockClear();
      // useDispatchMock.mockClear();
    });

  test("Images are being rendered on load", async () => {
    useSelectorMock.mockReturnValue([
        {
          _id: 0,
          url:
            "https://images.pexels.com/photos/1152237/pexels-photo-1152237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          owner: "Lisa Fotios",
        },
        {
          _id: 1,
          url:
            "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          owner: "Jill Wellington",
        }
      ]);
    const { queryByRole } = render(
      //<Provider store={store}>
        <Gallery />
      //</Provider>
    );

    await setTimeout(()=>{}, 10000);
    screen.debug();
    expect(await queryByRole("Image")).toBeInTheDocument();
  });
});
