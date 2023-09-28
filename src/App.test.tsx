import { render } from "@testing-library/react";
import App from "./App";
import store from "./redux/store";
import { addTask, deleteTask } from "./redux/slices/tasksSlice";
import { Home, SignUp } from "./pages";
import taskMock from "./__mocks__/taskMock.json";
import userMock from "./__mocks__/userMock.json";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { addUser } from "./redux/slices/userSlice";

test("App init", () => {
  let persistor = persistStore(store);

  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
});
test("addTaskSlice", () => {
  let persistor = persistStore(store);

  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
  let state = store.getState().tasks;
  const initialBookCount = state.tasks.length;
  store.dispatch(addTask(taskMock));

  expect(state.tasks.length).toBe(initialBookCount);
});
test("deleteSlice", () => {
  let persistor = persistStore(store);

  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
  let state = store.getState().tasks;
  const initialBookCount = state.tasks.length;
  store.dispatch(addTask(taskMock));
  store.dispatch(deleteTask(taskMock.id));

  expect(state.tasks.length).toBe(initialBookCount);
});
test("deleteSlice", () => {
  let persistor = persistStore(store);

  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SignUp />
      </PersistGate>
    </Provider>
  );
  let state = store.getState().users;
  const initialBookCount = state.users.length;
  store.dispatch(addUser(userMock));
  

  expect(state.users.length).toBe(initialBookCount);
});
