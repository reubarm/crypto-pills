import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../hooks/web3-react";
import Head from "next/head";
import { useRouter } from "next/router";

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Container } from "@material-ui/core";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import useStyles from "../themes/useStyles";

export default function Home() {
  const { active } = useWeb3React();
  const router = useRouter();
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Play Pillman Origins Game | Crypto Pills NFTs, Games, Movies and Merchandise by Micha Klein</title>
        <meta
          name="description"
          content="Micha Klein's digital art has been around for over 30 years, and is not going away."
        />
      </Head>
      <Container
        id="top-anchor"
        maxWidth={false}
        component="main"
        className={classes.root}
      >
        <Header />

        <iframe
          src="https://pillman-beta.netlify.app/"
          style={{
            width: "100vw",
            height: "100vh",
            border: "none",
            marginTop: "-100px",
          }}
        />
      </Container>
      <Footer />
    </>
  );
}
