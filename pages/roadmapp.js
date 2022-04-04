import { useState, useEffect } from "react";
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

  const [datastats, setDatastats] = useState([]);
  const limit = 16;
  const options = { method: "GET", headers: { Accept: "application/json" } };
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

        {/* <Container
          maxWidth={false}
          component="div"
          className={classes.bannerSection}
        >
          <div className={classes.titleContainer}>
            <Typography variant="h3" component="p" className={classes.title}>
              Roadmap and Achievements
            </Typography>
            <br />
            <Typography
              variant="body2"
              component="p"
              className={classes.subtitle}
            >
              We have already rolled out a large portion of our roadmap and have
              some cool perks to come!
              <br />
              <br />
              <strong>
                Micha Klein will donate 5% of sales to Save The Children Charity
                for children in need worldwide.
              </strong>
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.cta}
              href="https://discord.gg/UV4FnNGYdp"
            >
              Join Discord Community
            </Button>
          </div>
        </Container> */}

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
                background: "#eef9fa",
                borderRadius: "20px",
                margin: "3rem auto",
              }}
            >
              <br />
              <Typography
                variant="h3"
                component="p"
                align="center"
                style={{ margin: "30px auto 0", color: "#1D3557" }}
              >
                Crypto Pills NFT Launch
              </Typography>
              <Typography
                variant="p"
                component="p"
                align="center"
                style={{ margin: "10px auto 30px", color: "#1D3557" }}
              >
                August 27th 2021
              </Typography>
              <Typography
                variant="h6"
                component="p"
                align="center"
                style={{
                  margin: "10px auto 30px",
                  color: "#1D3557",
                  fontWeight: "500",
                }}
              >
                Start of sale Crypto Pills -{" "}
                <strong>Project sold out in 11 minutes</strong>
              </Typography>
              <Typography
                variant="p"
                component="p"
                align="center"
                style={{
                  margin: "10px auto 30px",
                  color: "#1D3557",
                  width: "80%",
                }}
              >
                <strong>
                  Artist donates over $150.000 of sales to Save The Children
                  Charity for children in need worldwide
                </strong>
                , which is written in the Smart Contract for full transparency
                24/7{" "}
              </Typography>
              <Typography
                variant="p"
                component="p"
                align="center"
                style={{ margin: "10px auto 30px", color: "#1D3557" }}
              >
                Crypto Pills Fanclub Room started on Clubhouse
              </Typography>
              <Container>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={4}
                  style={{ marginTop: "3rem" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{
                          marginBlockEnd: "1rem",
                          color: "#1D3557",
                        }}
                      >
                        Week 1
                      </Typography>
                      <Typography variant="body2" align="center">
                        Airdrop of 10 Crypto-Pills to random Pill owners
                        <br />
                        <br />
                        Upgraded role in Discord for holders by number of pills
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{ marginBlockEnd: "1rem", color: "#1D3557" }}
                      >
                        Week 2
                      </Typography>
                      <Typography variant="body2" align="center">
                        Airdrop of 10 Crypto-Pills to random Pill owners
                        <br />
                        <br />2 POAPS with future utility released for white
                        list and official launch minters
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{ marginBlockEnd: "1rem", color: "#1D3557" }}
                      >
                        Week 3
                      </Typography>
                      <Typography variant="body2" align="center">
                        The 20 most active Pill owner members in the Discord
                        server received a physical OG Pillman Giclee print of
                        their Crypto-Pill Edition 1/1, and signed by artist
                        <br />
                        <br />
                        Crypto Pills Billboard on Times Square with release POAP
                        for all holders
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{ marginBlockEnd: "1rem", color: "#1D3557" }}
                      >
                        Week 4
                      </Typography>

                      <Typography variant="body2" align="center">
                        30 limited edition official Crypto Pills T-Shirts for
                        the most active and loyal members on our Discord and
                        Clubhouse
                        <br />
                        <br />
                        Production of a pair of handmade custom Crypto Pills
                        sneakers started for winner raffle
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{ marginBlockEnd: "1rem", color: "#1D3557" }}
                      >
                        Week 5
                      </Typography>
                      <Typography variant="body2" component="p" align="center">
                        Airdrops of Crypto Pills wearables by Eddy Gangland for
                        Cryptovoxels with big party in Cryptovoxels The project
                        enters the Metaverse
                        <br />
                        NFTX Liquidity Pool implemented
                        <br />
                        Start of the DTP Pharmacy exclusive merch shop.
                        {/* <a
                        href="https://dropthepill.com/"
                        style={{
                          fontWeight: "700",
                          textDecoration: "none",
                          color: "#1D3557",
                        }}
                      >
                        You can visit the store here.
                      </a> */}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{ marginBlockEnd: "1rem", color: "#1D3557" }}
                      >
                        Week 6
                      </Typography>
                      <Typography variant="body2" component="p" align="center">
                        CryptoVoxels land purchased on Vibes Island for Pill
                        Parties, and Crypto Pills Club / Gallery build
                        <br />
                        <br />
                        3D Pillman AR Snapchat Filter released
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{ marginBlockEnd: "1rem", color: "#1D3557" }}
                      >
                        Week 7
                      </Typography>
                      <Typography variant="body2" component="p" align="center">
                        Presentation of test for animated shorts with 3D and 2D
                        animations & Collaboration with Hollywood director
                        announced
                        <br />
                        Announcement $PILLCOIN token for community economics
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{ marginBlockEnd: "1rem", color: "#1D3557" }}
                      >
                        Week 8
                      </Typography>
                      <Typography variant="body2" component="p" align="center">
                        Free Halloween airdrop for top holders and giveaway of
                        60 Spooky Pills limited edition and 1/1 NFTs Halloween
                        POAP in 3K resolution for all holders with future
                        utility released
                        <br />
                        <br />
                        Start Collaboration with Liquid NFTs
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{ marginBlockEnd: "1rem", color: "#1D3557" }}
                      >
                        Week 9
                      </Typography>
                      <Typography variant="body2" component="p" align="center">
                        Artist &amp; founder of Crypto Pills awarded Best
                        Digital NFT Artist 2021 at NFT.NYC Convention New York
                        <br />
                        Crypto Pills sponsors NFT Hypebeast party, New York
                        <br />
                        Crypto Pills sponsors NFTme launch party, New York
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    align="center"
                  >
                    <Box
                      className={classes.roadmapGridCell}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography
                        variant="h3"
                        component="p"
                        align="center"
                        style={{ marginBlockEnd: "1rem", color: "#1D3557" }}
                      >
                        Week 10
                      </Typography>
                      <Typography variant="body2" component="p" align="center">
                        Crypto Pills featured in Plotagraph, top creative app on
                        iOS with 3.8 million users, future collaboration and NFT
                        drop announced
                        <br />
                        Release Crypto Pill Rap Anthem by Artz
                        <br />
                        Announcement Thanksgiving and Christmas airdrops and
                        first exclusive Crypto Pills Video game for pill holders
                      </Typography>
                    </Box>
                  </Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.playGame}
                    href="https://discord.gg/UV4FnNGYdp"
                    style={{ margin: "20px 0 30px" }}
                  >
                    Purchase on OpenSea
                  </Button>
                </Grid>
                <br />
                <br />
              </Container>
            </Grid>
            <Grid item sm></Grid>
        
            <Container maxWidth="lg" style={{ margin: "0 auto 5rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box
                style={{
                  background: "#457B9D",
                  color: "white",
                  padding: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
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
                  background: "#457B9D",
                  color: "white",
                  padding: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
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
                  background: "#457B9D",
                  color: "white",
                  padding: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
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
                  background: "#457B9D",
                  color: "white",
                  padding: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
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
          </Grid>{" "}
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>{" "}
          <br />
          <br />
          <Grid container>
            <Grid item sm></Grid>
            <Grid
              item
              xs={12}
              md={10}
              lg={8}
              style={{
                background: "#eef9fa",
                borderRadius: "20px",
                padding: "30px",
                color: "#1D3557",
              }}
              align="center"
            >
              <br />
              <Typography variant="h4">
                <span style={{ fontWeight: "400!important", color: "#a679bd" }}>
                  BETA Launch
                </span>
              </Typography>
              <Typography variant="h3" component="p" align="center">
                Game Development
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
                className={classes.playGame}
                href="https://discord.gg/UV4FnNGYdp"
                style={{ margin: "40px auto 0" }}
              >
                Play Game
              </Button>
            </Grid>
            <Grid item sm></Grid>
          </Grid>
          <br />
          <br />
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            className={classes.contentStyle}
            style={{
              background: "#eef9fa",
              borderRadius: "20px",
              padding: "30px",
              color: "#1D3557",
            }}
            align="center"
          >
            <Box>
              <Typography variant="h4">
                <br/>
                <span style={{ fontWeight: "400!important", color: "#a679bd" }}>
                  Launch of Online Store
                </span>
              </Typography>
              <Typography variant="h3" className={classes.title}>
                DTP Pharmacy Merchandise Store
              </Typography>
              <br />
              <Typography variant="p" className={classes.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Typography>
              <div style={{display: 'block'}}>
              <img src="1.png" width="250" height="250" style={{display: 'inline', margin: '2rem 1rem 0'}}/>
              <img src="2.png" width="250" height="250" style={{display: 'inline', margin: '2rem 1rem 0'}}/>
              <img src="3.png" width="250" height="250" style={{display: 'inline', margin: '2rem 1rem 0'}}/>
              <img src="4.png" width="250" height="250" style={{display: 'inline', margin: '2rem 1rem 0'}}/>
              </div><br />
              <Button
                size="large"
                variant="contained"
                target="_blank"
                href="https://discord.gg/UV4FnNGYdp"
                className={classes.playGame}
              >
                Shop the Latest Merchandise
              </Button>
            </Box>
          </Grid>
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            className={classes.contentStyle}
            style={{
              background: "#eef9fa",
              borderRadius: "20px",
              padding: "30px",
              color: "#1D3557",
            }}
            align="center"
          >
            <Box>
              <Typography variant="h4">
                <span style={{ fontWeight: "400!important", color: "#a679bd" }}>
                  March 31st 2022
                </span>
              </Typography>
              <Typography variant="h3" className={classes.title}>
                3D Crypto Pills Teaser
              </Typography>
              <br />
              <Typography variant="p" className={classes.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Typography>
              <br />
              <Button
                size="large"
                variant="contained"
                target="_blank"
                href="https://discord.gg/UV4FnNGYdp"
                className={classes.playGame}
              >
                Join the Discord Whitelist
              </Button>
            </Box>
          </Grid>
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            className={classes.contentStyle}
            style={{
              background: "#eef9fa",
              borderRadius: "20px",
              padding: "30px",
              color: "#1D3557",
            }}
            align="center"
          >
            <Box>
              <Typography variant="h4">
                <span style={{ fontWeight: "400!important", color: "#a679bd" }}>
                  June 1st 2022
                </span>
              </Typography>
              <Typography variant="h3" className={classes.title}>
              Pill Coin Token Launch
              </Typography>
              <br />
              <Typography variant="p" className={classes.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Typography>
              <br />
              <Button
                size="large"
                variant="contained"
                target="_blank"
                href="https://discord.gg/UV4FnNGYdp"
                className={classes.playGame}
              >
                View the Whitepaper
              </Button>
            </Box>
          </Grid>
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            className={classes.contentStyle}
            style={{
              background: "#eef9fa",
              borderRadius: "20px",
              padding: "30px",
              color: "#1D3557",
            }}
            align="center"
          >
            <Box>
              <Typography variant="h4">
                <span style={{ fontWeight: "400!important", color: "#a679bd" }}>
                  July 1st 2022
                </span>
              </Typography>
              <Typography variant="h3" className={classes.title}>
              Play to Earn Game (iOS & Android)
              </Typography>
              <br />
              <Typography variant="p" className={classes.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Typography>
              <br />
              <Button
                size="large"
                variant="contained"
                target="_blank"
                href="https://discord.gg/UV4FnNGYdp"
                className={classes.playGame}
              >
                Play the Game
              </Button>
            </Box>
          </Grid> <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            className={classes.contentStyle}
            style={{
              background: "#eef9fa",
              borderRadius: "20px",
              padding: "30px",
              color: "#1D3557",
            }}
            align="center"
          >
            <Box>
              <Typography variant="h4">
                <span style={{ fontWeight: "400!important", color: "#a679bd" }}>
                  July 1st 2022
                </span>
              </Typography>
              <Typography variant="h3" className={classes.title}>
                3D Crypto Pills Launch
              </Typography>
              <br />
              <Typography variant="p" className={classes.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Typography>
              <br />
              <Button
                size="large"
                variant="contained"
                target="_blank"
                href="https://discord.gg/UV4FnNGYdp"
                className={classes.playGame}
              >
                Join the Discord Whitelist
              </Button>
            </Box>
          </Grid>
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            className={classes.contentStyle}
            style={{
              background: "#eef9fa",
              borderRadius: "20px",
              padding: "30px",
              color: "#1D3557",
            }}
            align="center"
          >
            <Box>
              <Typography variant="h4">
                <span style={{ fontWeight: "400!important", color: "#a679bd" }}>
                  October 1st 2022
                </span>
              </Typography>
              <Typography variant="h3" className={classes.title}>
              Live 3D Pillman Exhibitions
              </Typography>
              <br />
              <Typography variant="p" className={classes.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Typography>
              <br />
              <Button
                size="large"
                variant="contained"
                target="_blank"
                href="https://discord.gg/UV4FnNGYdp"
                className={classes.playGame}
              >
                Join the Discord Whitelist
              </Button>
            </Box>
          </Grid>
          <Typography variant="h1" component="p" align="center">
            &#8595;
          </Typography>{" "}
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            className={classes.contentStyle}
            style={{
              background: "#eef9fa",
              borderRadius: "20px",
              padding: "30px",
              color: "#1D3557",
            }}
            align="center"
          >
            <Box>
              <Typography variant="h4">
                <span style={{ fontWeight: "400!important", color: "#a679bd" }}>
                  First Episode
                </span>
              </Typography>
              <Typography variant="h3" className={classes.title}>
              Animated TV Series &amp; Movie Release
              </Typography>
              <br />
              <Typography variant="p" className={classes.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </Typography>
            </Box>
          </Grid>
    
        
    
        </Container>
      </Container>
      <Footer />
    </>
  );
}