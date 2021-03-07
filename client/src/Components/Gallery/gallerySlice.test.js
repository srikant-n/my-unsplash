import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as slice from "./gallerySlice";
import fetchMock from "fetch-mock-jest";
import reducer from "./gallerySlice";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Actions and Reducer", () => {
  test("Should return empty value as initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      value: [],
    });
  });

  test("Replace the gallery state to given array", () => {
    const images = [
      { _id: 0, url: "http://1.com/", owner: "One" },
      { _id: 1, url: "http://2.com/", owner: "Two" },
    ];
    // Test action first
    const store = mockStore({ value: [] });
    const expectedAction = { type: "gallery/replace", payload: images };
    store.dispatch(slice.replace(images));
    expect(store.getActions()).toEqual([expectedAction]);

    expect(reducer(undefined, expectedAction)).toEqual({ value: images });
  });

  test("New image should be at the beginning", () => {
    const images = [
      { _id: 0, url: "http://1.com/", owner: "One" },
      { _id: 1, url: "http://2.com/", owner: "Two" },
    ];
    const newImage = { _id: 3, url: "http://3.com/", owner: "Three" };
    // Test action first
    const store = mockStore({ value: [] });
    const expectedAction = { type: "gallery/shiftNewImage", payload: newImage };
    store.dispatch(slice.shiftNewImage(newImage));
    expect(store.getActions()).toEqual([expectedAction]);

    expect(reducer({ value: images }, expectedAction)).toEqual({
      value: [newImage, ...images],
    });
  });

  test("Deleted image should be removed", () => {
    const images = [
      { _id: 3, url: "http://3.com/", owner: "Three" },
      { _id: 0, url: "http://1.com/", owner: "One" },
      { _id: 1, url: "http://2.com/", owner: "Two" },
    ];

    const resultImages = [
      { _id: 3, url: "http://3.com/", owner: "Three" },
      { _id: 0, url: "http://1.com/", owner: "One" },
    ];
    const id = 1;
    // Test action first
    const store = mockStore({ value: [] });
    const expectedAction = { type: "gallery/removeImage", payload: id };
    store.dispatch(slice.removeImage(id));
    expect(store.getActions()).toEqual([expectedAction]);

    expect(reducer({ value: images }, expectedAction)).toEqual({
      value: resultImages,
    });
  });
});

describe("Async Actions and API", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test("Fetch images and replace", () => {
    const images = [
      { _id: 0, url: "http://1.com/", owner: "One" },
      { _id: 1, url: "http://2.com/", owner: "Two" },
    ];
    fetchMock.getOnce("/images", images);
    const store = mockStore({});
    const expectedActions = [{ type: "gallery/replace", payload: images }];
    return store.dispatch(slice.getImagesData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("Fetch images with query and replace", () => {
    const search = "1";
    const images = [{ _id: 0, url: "http://1.com/", owner: "One" }];
    fetchMock.getOnce("/images/" + search, images);
    const store = mockStore({});
    const expectedActions = [{ type: "gallery/replace", payload: images }];
    return store.dispatch(slice.getImagesData(search)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("Add Image", () => {
    const url = "test.com";
    const owner = "testOwner";
    const imageOutput = { _id: 0, url: url, owner: owner };
    fetchMock.postOnce("/images", imageOutput);
    const store = mockStore({});
    const expectedActions = [
      { type: "gallery/shiftNewImage", payload: imageOutput },
    ];
    return store.dispatch(slice.addNewImage(url, owner)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("Should get image id for Delete Image", () => {
    const payload = "a0";
    fetchMock.delete("/images/a0", (url, options) =>
      options.body ? { pass: "ok" } : 401
    );
    const store = mockStore({});
    let expectedActions = [{ type: "gallery/removeImage", payload: payload }];
    store.dispatch(slice.deleteImage("a0", "pass", () => {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expectedActions = [];
      store.dispatch(slice.deleteImage("a0", null, (x) => {})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
