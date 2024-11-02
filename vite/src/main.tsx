// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { StoreProvider } from "./helpers/store-provider.ts";
import "./index.css";
import MainStore from "./stores/mainStore.ts";

const stores = new MainStore();

createRoot(document.getElementById("root")!).render(
    <StoreProvider value={stores}>
        {/* <StrictMode> */}
            <App />
        {/* </StrictMode> */}
    </StoreProvider>
);
