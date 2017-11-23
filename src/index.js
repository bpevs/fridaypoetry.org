import React from "react";
import { render } from "react-dom";
import "./vendor/wing.css";
import "./main.css";
import { Main } from "./Main";
import registerServiceWorker from "./registerServiceWorker";

render(<Main />, document.getElementById("root"));
registerServiceWorker();
