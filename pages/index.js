import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../hooks/web3-react";
import Head from "next/head";
import { useRouter } from "next/router";

import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Button,
  Box,
  Grid,
  Hidden,
  Link,
  Typography,
  Container,
} from "@material-ui/core";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
// import WalletButton from "../components/Header/WalletButton";
// import MintControl from "../components/MintControl";
import useStyles from "../themes/useStyles";

export default function Home() {
  const [moedas, setMoedas] = useState([]);
  const [datastats, setDatastats] = useState([]);
  const limit = 16;
  const options = { method: "GET", headers: { Accept: "application/json" } };

  useEffect(() => {
    fetch(
      `https://api.opensea.io/api/v1/bundles?asset_contract_address=0x7dd04448c6cd405345d03529bff9749fd89f8f4f&limit=${limit}&offset=0`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMoedas(response.bundles);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredMoedas = moedas.filter((moeda) => moeda);

  useEffect(() => {
    fetch(
      "https://api.opensea.io/api/v1/collection/crypto-pills-by-micha-klein/stats",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setDatastats(response.stats);
        console.log(response.stats);
      })
      .catch((err) => console.error(err));
  }, []);

  let marketcap = 0;
  let avgprice = 0;
  if (datastats.market_cap) {
    marketcap = datastats.market_cap.toFixed(2);
  }
  if (datastats.average_price) {
    avgprice = datastats.average_price.toFixed(2);
  }

  const { active } = useWeb3React();
  const router = useRouter();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const theme = useTheme();
  const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Head>
        <title>Crypto Pills</title>
        <meta
          name="description"
          content="Micha Klein’s digital art has been around for over 30 years, and is not going away."
        />
      </Head>
      <Header />
      <Container
        maxWidth={false}
        component="div"
        className={classes.bannerSection}
      >
        <div className={classes.titleContainer}>
          <Typography variant="h3" component="p" className={classes.title}>
            Virtual Medicine for
            <br />a Sick Society
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.subtitle}
          >
            Crypto-Pills are a limited NFT collection… Some escaped from a lab;
            a few were dropped from a van; others were prescribed by a doctor;
            or simply bought over the counter.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.cta}
            href="https://opensea.io/collection/crypto-pills-by-micha-klein"
          >
            Buy on OpenSea
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.playGame}
            href="/play"
          >
            Play Game
          </Button>
        </div>
      </Container>

      <Container
        id="top-anchor"
        maxWidth="xl"
        component="main"
        className={classes.root}
      >
        <Container
          maxWidth="lg"
          component="div"
          className={classes.detailSection}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} className={classes.introSectionGridCell}>
              <Typography
                variant="h3"
                component="p"
                className={classes.introTitle}
              >
                Welcome to Crypto-Pills
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className={classes.introSubTitle}
                style={{ marginTop: "23px" }}
              >
                All 10,000 Crypto-Pills were algorithmically generated from 37
                categories and 504 traits, allowing some to be rarer than
                others. All Crypto-Pill’s features were created by artist Micha
                Klein. They are multi-gender, multi-color and based on Micha’s
                infamous Pillman character Eminem brought on his first tour in
                2000.
              </Typography>
              <Typography variant="body1" component="p">
                <strong>
                  Crypto-Pills are stored as ERC-721 tokens on the Ethereum
                  blockchain and hosted on IPFS.
                </strong>
              </Typography>
              <Typography variant="body1" component="p">
                Minting a Crypto-Pill cost 0.07 ETH, with no bonding curves and
                fair distribution.
              </Typography>
              <Button
                size="large"
                variant="contained"
                href="/roadmap"
                className={classes.openSea}
              >
                View the Roadmap
              </Button>
              <Button
                size="large"
                variant="contained"
                href="/nfts"
                className={classes.playGame}
              >
                View NFT Bundles
              </Button>
            </Grid>
            <Grid item xs={12} md={5} className={classes.nftsGridCell}>
              <Typography
                variant="h5"
                component="p"
                className={classes.nftTitle}
              >
                Latest Crypto Pills on OpenSea
              </Typography>
              <br />
              <div>
                {filteredMoedas.map((moeda, index) => {
                  return (
                    index < 4 && (
                      <>
                        <a
                          href={moeda.assets[0].permalink}
                          target="_blank"
                          rel="noopener"
                        >
                          <img
                            src={moeda.assets[0].image_url}
                            width="190"
                            style={{
                              display: "inline-block",
                              margin: "0.4rem",
                              borderRadius: "15px",
                            }}
                          />
                        </a>
                      </>
                    )
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg"  style={{ margin: "0 auto 5rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box
                style={{
                  background: "#322751",
                  color: "white",
                  padding: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h2" component="p" align="center">
                  {datastats.floor_price}
                </Typography>
                <Typography variant="h5" component="p" align="center">
                  Floor Price
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box
                style={{
                  background: "#322751",
                  color: "white",
                  padding: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h2" component="p" align="center">
                  {marketcap}
                </Typography>
                <Typography variant="h5" component="p" align="center">
                  Market Cap
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box
                style={{
                  background: "#322751",
                  color: "white",
                  padding: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h2" component="p" align="center">
                  {avgprice}
                </Typography>
                <Typography variant="h5" component="p" align="center">
                  Average Price
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box
                style={{
                  background: "#322751",
                  color: "white",
                  padding: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h2" component="p" align="center">
                  {datastats.thirty_day_sales}
                </Typography>
                <Typography variant="h5" component="p" align="center">
                  Monthly Sales
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container spacing={2} className={classes.artworkSection} maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.detailSectionGridCell}>
              <Typography
                variant="h4"
                component="p"
                align="center"
                style={{ fontWeight: "400", color: "#555" }}
              >
                Crypto-Pills Artwork
              </Typography>
              <Typography variant="body1" component="p" align="center">
                All Crypto-Pills vector artwork is rendered in glorious 3,000
                pixels resolution. This allows collectors to create crisp prints
                and avatars without loss of detail.
              </Typography>
              <Typography variant="body1" component="p" align="center">
                Crypto-Pills are Fine Art Collectibles, offering you a unique
                chance to obtain an original Micha Klein artwork. His work has
                firm roots in digital art history.
                <br />
                <br />
                <strong>
                  Your Crypto-Pill can serve as your digital identity.
                </strong>
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg">
          <Grid container>
            <Grid
              item
              xs={12}
              className={classes.detailSectionGridCell}
              style={{ display: "inline!important" }}
            >
              {filteredMoedas.map((moeda, index) => {
                return (
                  index < 12 && (
                    <>
                      <a
                        href={moeda.assets[0].permalink}
                        target="_blank"
                        rel="noopener"
                      >
                        <img
                          src={moeda.assets[0].image_url}
                          width="190"
                          style={{
                            display: "inline",
                            margin: "0.3rem",
                            borderRadius: "15px",
                          }}
                        />
                      </a>
                    </>
                  )
                );
              })}
            </Grid>
          </Grid>
        </Container>

        <Container
          id="about-section"
          maxWidth="lg"
          component="div"
          className={classes.detailSection}
        >
          <div className={classes.aboutMicha}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                className={classes.detailSectionImageCell}
              >
                <img
                  src="/images/micha-portrait.webp"
                  className={classes.detailSectionImage}
                ></img>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={9}
                className={classes.detailSectionGridCell}
              >
                <Typography
                  variant="h4"
                  component="p"
                  align="left"
                  style={{ color: "#bb7fc0", fontWeight: "700" }}
                >
                  About the Artist
                  <br />
                </Typography>
                ---
                <Typography variant="body1" component="p">
                  <Link
                    href="https://www.michaklein.com/"
                    target="_blank"
                    rel="noopener"
                    style={{ color: "#bb7fc0", fontWeight: "700" }}
                  >
                    Micha Klein
                  </Link>{" "}
                  has been a pioneer in digital 3D animation since before Steve
                  Jobs invested in Pixar. Blockchain technology has allowed
                  Micha to fulfill a dream of his, bringing his legendary
                  (Eminem’s Anger Management Tour) OG Pillman to the masses and
                  to the metaverse. He has created 10,000 wildly intricate and
                  unique, computer-generated avatars. Every pill is represented
                  by a token that has a 3000x3000 pixel depth.
                </Typography>
                <Typography variant="body1" component="p">
                  Micha is dedicated to adding value to this project, every step
                  of the way, for his fans and collectors. Immediately, Micha is
                  donating 5% of the total proceeds to a special charity that
                  helps less fortunate children receive the medicine that they
                  need. This donation will be written directly into the
                  contract.
                </Typography>
                <Typography variant="body1" component="p">
                  Micha Klein’s digital art has been around for over 30 years
                  and has stood the test of time. He has delivered huge projects
                  for the likes of Disney and Coca-Cola and is dedicated to the
                  digital art and NFT community.
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Container>

        <Container
          maxWidth="lg"
          component="div"
          className={classes.detailSection}
        >
          <Grid
            container
            spacing={2}
            style={{
              background: "#a289ab",
              borderRadius: "30px",
              opacity: "1",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              className={classes.detailSectionGridCell}
              style={{
                padding: "0 80px!important",
                color: "white",
                margin: "0!important",
              }}
            >
              <Typography variant="h4" component="p" align="center">
                Slim Shady Feat. Pillman
              </Typography>
              <Typography variant="body1" component="p" align="center">
                <b>Eminem</b> commissioned <b>Pillman</b> animations for his
                first US & European Tour:
              </Typography>
              <Typography variant="body1" component="p" align="center">
                <b>The Anger Management Tour 2000</b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              className={classes.detailSectionImageCell}
              style={{ padding: "0 2rem", margin: "4rem 0" }}
            >
              <div className={classes.youtube}>
                <iframe
                  width="640"
                  height="390"
                  src={`https://player.vimeo.com/video/575656466?title=0&byline=0&portrait=0`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                  className={classes.youtubeIFrame}
                />
              </div>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.contentStyle}
            style={{
              background: `linear-gradient(135deg,
                  #000 33%,
                  #692a97 100%)`,
              borderRadius: "30px",
              padding: "30px",
              color: "white",
            }}
            align="center"
          >
            <Hidden smDown>
              <Box sx={{ marginRight: "40px" }}>
                <img src="/3dpill.png" width="330" />
              </Box>
            </Hidden>
            <Box>
              <Typography variant="h4">
                <span style={{ fontWeight: "400!important", color: "#a679bd" }}>
                  March 31st 2022
                </span>
              </Typography>
              <Typography variant="h2" className={classes.title}>
                3D Crypto Pills
              </Typography>
              <br />
              <Typography variant="p" className={classes.subtitle}>
                Crypto-Pills are stored as ERC-721 tokens on the Ethereum
                blockchain and hosted on IPFS. Purchasing a Crypto-Pill costs
                0.07 ETH, with no bonding curves, and fair distribution.
                Crypto-Pills will be revealed when they are minted.
              </Typography>
              <br />
              <Button
                size="large"
                variant="contained"
                target="_blank"
                href="https://discord.gg/UV4FnNGYdp"
                className={classes.cta}
              >
                Join the Discord Whitelist
              </Button>
            </Box>
          </Grid>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
