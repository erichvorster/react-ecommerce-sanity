import React from "react";

//This head component in NodeJS is the same as the head tag in HTML
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Titleist Golf Clone Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {/* //props. children are destructured out from the _app.js component */}
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
