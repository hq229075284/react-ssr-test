import { hydrate } from "react-dom";
import { createApp, createStore } from "./generate";
const store = createStore(window.__ssr__)
hydrate(createApp(store), document.getElementById("root"));
