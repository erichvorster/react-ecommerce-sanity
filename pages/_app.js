import "../styles/globals.css";
import React from "react";
import { Layout } from "../components";
import { Toaster } from "react-hot-toast";

//We import our state from stateContext
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        {/* //This component is the current page you are on. //We can use Component
      inside Layout as props.children */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
