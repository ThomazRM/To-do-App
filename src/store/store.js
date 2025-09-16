"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import todosReducer from "@/features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}