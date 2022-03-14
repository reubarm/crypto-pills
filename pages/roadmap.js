import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../hooks/web3-react";
import Head from "next/head";
import { useRouter } from "next/router";

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Link,
  Typography,
  Container,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import useStyles from "../themes/useStyles";

export default function Home() {
  const { active } = useWeb3React();
  const router = useRouter();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const theme = useTheme();
  const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const title = [
    "How do I purchase Crypto-Pills?",
    "How do I know which Crypto-Pill I get?",
    "How many Crypto-Pills can I buy per single transaction?",
    "What will be the price of Crypto-Pills?",
  ];

  const description = [
    "The easiest way to purchase Crypto-Pills is to install a MetaMask extension in your browser and link your crypto wallet to it. Ensure you have enough ETH in your wallet to cover the cost of purchasing Crypto-Pills, in addition to any associated gas fees. Approve the desired transaction on MetaMask and you are ready to go. For more information, please refer to this link: https://nftyfarm.com/metamask/",
    "Crypto-Pills will remain hidden until the big reveal on August 27, 2021. Upon reveal, the artwork from the pre-defined collection will be assigned to the NFT placeholder that you purchased. “Blind sales” are chosen to ensure the Crypto-Pills value is protected so no one can determine its rarity, including the project owners.",
    "There is a limit of twenty (20) Crypto-Pills that can be purchased in one (1) transaction.",
    "The pricing model is a flat-rate throughout the entire sale. The cost of each Crypto-Pill is set at 0.07 Eth, and 100 Crypto-Pills will be reserved for giveaways.",
  ];

  const mockData = {
    id: (index) => `${index + 1}`,
    text: {
      title: (index) => title[index],
      description: (index) => description[index],
    },
  };

  const MOCK_FAQS = [...Array(4)].map((_, index) => ({
    id: mockData.id(index),
    value: `panel${index + 1}`,
    heading: mockData.text.title(index),
    detail: mockData.text.description(index),
  }));

  return (
    <>
      <Head>
        <title>Roadmap | Crypto Pills</title>
        <meta
          name="description"
          content="Micha Klein’s digital art has been around for over 30 years, and is not going away."
        />
      </Head>
      <Container
        id="top-anchor"
        maxWidth={false}
        component="main"
        className={classes.root}
      >
        <Header />

        <Container
          maxWidth={false}
          component="div"
          className={classes.bannerSection}
        >
          <Typography variant="h3" component="p" className={classes.title}>
            Crypto Pills Roadmap
          </Typography>
          <br />
          <Typography
            variant="body2"
            component="p"
            className={classes.subtitle}
          >
            <strong>
              Micha Klein will donate 5% of sales to Save The Children Charity
              for children in need worldwide.
            </strong>
            <br />
            <br />
            Written in the Smart Contract for full transparancy!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.cta}
            href="https://discord.gg/UV4FnNGYdp"
          >
            Join Discord
          </Button>
        </Container>

        <Container
          id="roadmap-section"
          maxWidth="xl"
          component="div"
          className={classes.detailSection}
        >
          <Grid container>
            <Grid item sm></Grid>
            <Grid
              item
              xs={12}
              md={10}
              lg={8}
              style={{
                background: `linear-gradient(135deg,
                #351148 0%,
                #692a97 100%)`,
                borderRadius: "30px",
                margin: "3rem auto",
              }}
            >
              <br />
              <Typography
                variant="h4"
                component="p"
                align="center"
                style={{ margin: "30px auto 0", color: "white" }}
              >
                Crypto Pills ✅
              </Typography>
              <Typography
                variant="h6"
                component="p"
                align="center"
                style={{ margin: "10px auto 30px", color: "white" }}
              >
                August 27th 2021
              </Typography>
              <Grid container justify="center" alignItems="center">
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  align="center"
                >
                  <Box
                    className={classes.roadmapGridCell}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography
                      variant="h2"
                      component="p"
                      align="center"
                      style={{
                        marginBlockEnd: "1rem",
                        color: "#72209c",
                        color: "#72209c",
                      }}
                    >
                      10%
                    </Typography>
                    <Typography variant="body2" align="center">
                      Airdrop of 10 Crypto-Pills to random Pill owners, and
                      owners with three (3) pills will receive an upgraded role
                      in Discord: Pill Popper
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  align="center"
                >
                  <Box
                    className={classes.roadmapGridCell}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography
                      variant="h2"
                      component="p"
                      align="center"
                      style={{ marginBlockEnd: "1rem", color: "#72209c" }}
                    >
                      20%
                    </Typography>
                    <Typography variant="body2" align="center">
                      Airdrop of 10 Crypto-Pills to random Pill owners and the
                      20 most active Pill owner members in the Discord server
                      will receive a physical OG Pillman Giclee print of their
                      Crypto-Pill Edition 1/1, signed by Micha.
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  align="center"
                >
                  <Box
                    className={classes.roadmapGridCell}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography
                      variant="h2"
                      component="p"
                      align="center"
                      style={{ marginBlockEnd: "1rem", color: "#72209c" }}
                    >
                      30%
                    </Typography>
                    <Typography variant="body2" align="center">
                      A selection of 3D and AR files that owner's can download
                      will be provided. Plus free limited edition merch for the
                      most active and loyal members on our Discord server.
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  align="center"
                >
                  <Box
                    className={classes.roadmapGridCell}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography
                      variant="h2"
                      component="p"
                      align="center"
                      style={{ marginBlockEnd: "1rem", color: "#72209c" }}
                    >
                      50%
                    </Typography>

                    <Typography variant="body2" align="center">
                      Sandbox and CryptoVoxels land will be purchased for Pill
                      Parties. Plus 10 Pill owners will be chosen to have their
                      custom Pill designed and minted.
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  align="center"
                >
                  <Box
                    className={classes.roadmapGridCell}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography
                      variant="h2"
                      component="p"
                      align="center"
                      style={{ marginBlockEnd: "1rem", color: "#72209c" }}
                    >
                      60%
                    </Typography>
                    <Typography variant="body2" component="p" align="center">
                      Start of the DTP Pharmacy exclusive merch shop.
                      <br />
                      <br />
                      <a
                        href="https://dropthepill.com/"
                        style={{ fontWeight: "700", textDecoration: "none" }}
                      >
                        You can visit the store here.
                      </a>
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  align="center"
                >
                  <Box
                    className={classes.roadmapGridCell}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography
                      variant="h2"
                      component="p"
                      align="center"
                      style={{ marginBlockEnd: "1rem", color: "#72209c" }}
                    >
                      100%
                    </Typography>
                    <Typography variant="body2" component="p" align="center">
                      Launch of the Crypto Pill Laboratory Studio. The mind of
                      Micha Klein comes to the metaverses with state-of-the-art
                      3D digital animation, animated shorts &amp; interactive
                      NFTs.
                    </Typography>
                  </Box>
                </Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.cta}
                  href="https://discord.gg/UV4FnNGYdp"
                  style={{ margin: "20px 0 30px" }}
                >
                  Purchase on OpenSea
                </Button>
              </Grid>
            </Grid>
            <Grid item sm></Grid>
          </Grid>{" "}
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>{" "}
          <br /><br />
          <Grid container>
            <Grid item sm></Grid>
            <Grid
              item
              xs={12}
              md={10}
              lg={8}
              style={{
                background: `linear-gradient(135deg,
                  #351148 0%,
                  #692a97 100%)`,
                borderRadius: "30px",
                padding: "30px",
                color: "white",
              }}
              align="center"
            >
              <br />
              <Typography variant="h4" component="p" align="center">
                Game Development (BETA) ✅
              </Typography>
              <br />
              <br />
              
              <img
                src="/gamescreens.png"
                alt="game screens"
                style={{ width: "100%" }}
              />
              <br />
              <Button
                variant="contained"
                color="secondary"
                className={classes.cta}
                href="https://discord.gg/UV4FnNGYdp"
                style={{ margin: "40px auto 0" }}
              >
                Play Game
              </Button>
            </Grid>
            <Grid item sm></Grid>
          </Grid>
          <br /><br />
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>
          <Grid item xs={12} md={10} lg={8} className={classes.contentStyle} style={{
                background: `linear-gradient(135deg,
                  #351148 0%,
                  #692a97 100%)`,
                borderRadius: "30px",
                padding: "30px",
                color: "white",
              }}
              align="center">
            {/* <Hidden smDown>
              <Box sx={{ marginRight: "40px" }}>
                <img
                  src="https://media4.giphy.com/media/jPMqASVsBxhZP0ldYS/giphy.gif"
                  width="330"
                />
              </Box>
            </Hidden> */}
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
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>{" "}
          <br /><br />
          <Grid container>
            <Grid item sm></Grid>
            <Grid
              item
              xs={12}
              md={10}
              lg={8}
              style={{
                background: `linear-gradient(135deg,
                  #351148 0%,
                  #692a97 100%)`,
                borderRadius: "30px",
                padding: "30px",
                color: "white",
              }}
            ><br /><br /><br />
              <Typography variant="h4" component="p" align="center">
                Pill Coin Token Launch
              </Typography>
              <br />
              <br />
              <br />
            </Grid>
            <Grid item sm></Grid>
          </Grid>
<br/><br />
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>{" "}
          <br /><br />
          <Grid container>
            <Grid item sm></Grid>
            <Grid
              item
              xs={12}
              md={10}
              lg={8}
              style={{
                background: `linear-gradient(135deg,
                  #351148 0%,
                  #692a97 100%)`,
                borderRadius: "30px",
                padding: "30px",
                color: "white",
              }}
              align="center"
            >
              <br /><br /><br />
              <Typography variant="h4" component="p" align="center">
                Play to Earn Game (iOS &amp; Android)
              </Typography>
              <br />
              <br />
              <br />
            </Grid>
            <Grid item sm></Grid>
          </Grid>
          <br/><br />
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>{" "}
          <br /><br />
          <Grid container>
            <Grid item sm></Grid>
            <Grid
              item
              xs={12}
              md={10}
              lg={8}
              style={{
                background: `linear-gradient(135deg,
                  #351148 0%,
                  #692a97 100%)`,
                borderRadius: "30px",
                padding: "30px",
                color: "white",
              }}
              align="center"
            >
              <br /><br /><br />
              <Typography variant="h4" component="p" align="center">
                Live Pillman Exhibitions
              </Typography>
              <br />
              <br />
              <br />
            </Grid>
            <Grid item sm></Grid>
          </Grid>
          <br/><br />
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>{" "}
          <br /><br />
          <Grid container>
            <Grid item sm></Grid>
            <Grid
              item
              xs={12}
              md={10}
              lg={8}
              style={{
                background: `linear-gradient(135deg,
                  #351148 0%,
                  #692a97 100%)`,
                borderRadius: "30px",
                padding: "30px",
                color: "white",
              }}
              align="center"
            >
              <br /><br /><br />
              <Typography variant="h4" component="p" align="center">
                Animated TV Series &amp; Movie Release
              </Typography>
              <br />
              <br />
              <br />
            </Grid>
            <Grid item sm></Grid>
          </Grid>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
