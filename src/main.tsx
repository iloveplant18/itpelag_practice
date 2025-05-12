import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/ui/index.css";
import Router from "@/app/routing/routing";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
