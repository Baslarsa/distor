import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorProvider } from "./ErrorContext";
import { AudioPlayerProvider } from "./AudioPlayerContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ContentContextProvider } from "./ContentContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorProvider>
      <ToastContainer />
      <AudioPlayerProvider>
        <ContentContextProvider>
          <RouterProvider router={router} />
        </ContentContextProvider>
      </AudioPlayerProvider>
    </ErrorProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
