import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { CryptoPillsContractProvider } from "../contexts/contractProvider";
import { SnackbarProvider } from "notistack";
import { ethers } from "ethers";

import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../themes/theme";
import getLibrary from "../utils/getLibrary";
import "../themes/test.css";
import AOS from "aos";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>Crypto-Pills by Micha Klein</title>
        <meta property="twitter:title" content="Crypto-Pills by Micha Klein" />
        <meta
          property="og:title"
          content="Crypto-Pills | NFTs, Games, Movies, Exhibitions and Merchandise by Micha Klein"
        />
        <meta property="og:site_name" content="Crypto-Pills by Micha Klein" />
        <meta property="og:url" content="https://pillman.co" />
        <meta
          property="og:description"
          content="All Crypto-Pill’s features were created by the winner of the NYC Digital NFT Artist Of The Year 2021 Award; Micha Klein. They are multi-gender, multi-color and based on Micha’s infamous Pillman."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://www.pillman.co/roadmap.jpeg"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://www.dafontfree.net/embed/dmFnLXJvdW5kZWQtcmVndWxhciZkYXRhLzUwL3YvMjgxMzAvVkFHUm91bmRlZEJULVJlZ3VsYXIub3Rm"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700,800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="/font/font-awesome.css" />
        <link href="/dist/aos.css" rel="stylesheet" />

        {/* <link rel="stylesheet" href="/dist/swiper-bundle.min.css" /> */}
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <CryptoPillsContractProvider>
              <Component {...pageProps} />
            </CryptoPillsContractProvider>
          </Web3ReactProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
