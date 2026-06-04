import { Provider } from "react-redux";
import { store } from "@/store/redux/store";

import React from "react";

type Props = {
  children: React.ReactNode;
};

function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
