import React from "react";
import App, { Container } from "next/app";

import OfflineSupport from "../components/OfflineSupport";

const CustomApp = props => {
  const { Component, pageProps } = props;

  return (
    <Container>
      <OfflineSupport />
      <Component {...pageProps} />
    </Container>
  );
};

export default CustomApp;
