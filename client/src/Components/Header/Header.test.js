import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import store from "../../store";
import Header from "./Header";

test("Typing text in search box should update it", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const searchBox = getByRole("textbox");
  const input = "Text";

  expect(searchBox.value).toBe("");

  userEvent.type(searchBox, input);
  expect(searchBox.value).toBe(input);
});
