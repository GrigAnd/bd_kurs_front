import * as React from "react";
import { render } from "react-dom";
import "@vkontakte/vkui/dist/vkui.css";
import { AdaptivityProvider, AppRoot, ConfigProvider, Platform, usePlatform } from "@vkontakte/vkui";
import { App } from "./App";

let scheme = 'vkcom';

render(
  <ConfigProvider
    scheme={scheme}>
    <AdaptivityProvider>
      <AppRoot>
        <App />
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById("root")
);

