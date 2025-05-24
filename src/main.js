"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("@/app/styles/index.css");
var routing_1 = require("@/app/routing/routing");
(0, client_1.createRoot)(document.getElementById("root")).render(<react_1.StrictMode>
    <routing_1.default />
  </react_1.StrictMode>);
