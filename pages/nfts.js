import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../hooks/web3-react";
import Head from "next/head";
import { useRouter } from "next/router";

import React from "react";
import { styled, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Link,
  Typography,
  Container,
  Button,
  Grid,
  Box,
  TextField,
  Stack,
} from "@material-ui/core";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import useStyles from "../themes/useStyles";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#883eab",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(Button)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    background: "white",
  },
  "& .imageTitle": {
    position: "relative",
    padding: "0 30px",
    background: "#ffdeeb",
    marginTop: "200px",
  },
}));

const images = [
  {
    url: "https://lh3.googleusercontent.com/_s9b8kwrwjb03LjT5uxPv6IaLA9YkkQ67sp70HUTWDH-76rVDpawMpRLy9D5U0BJAxaIXP4anTZaa1CgQtvKiMPdggnHluAQEO5yEg=w334",
    width: "25%",
    number: "#5317",
  },
  {
    url: "https://lh3.googleusercontent.com/IFLMXqDoa6LTpH6pBExHackLUbeTg2epmv8PKfm9eO8HUIKHhvRa_XhD_MiTEaYDDohGBE74oiCnBfEjhUYymgp7C-zJADMdVYFd=w334",
    width: "25%",
    number: "#7819",
  },
  {
    url: "https://lh3.googleusercontent.com/rh8DP83Hee06MdHNtMSvSNywJolo8nfc0-iRG94ZWj8gTJWWwMJekLFnl5QDlUYmcn3yrdQOSezWA6-6NY8By6a3fiokY3o8feA6Gw=w334",
    width: "25%",
    number: "#4198",
  },
  {
    url: "https://lh3.googleusercontent.com/zE7njHeqVFuOAspkNpNREG4HIuZ0b_R5VOfASK-ROukRyIz0tQeRqKGibZGgT8ZIIXFJvPp3F_FgcKxsiIa5CYO0daMZIpXqt__BDqQ=w334",
    width: "25%",
    number: "#4178",
  },
  {
    url: "https://lh3.googleusercontent.com/n39n9vBvg_l3ZbIMr-BfsRMjQ5GCKXyEfTHUJEKBBQmVCI0nI0SRBuJcqCraYEaebUnEirxqinnGLLN6ENbczEjDsBIfr-sX7zWWhjo=w334",
    width: "25%",
    number: "#3155",
  },
  {
    url: "https://lh3.googleusercontent.com/o-8DMgdtKgotrhVzA-a-LnDnQ_-GMjkX_7hsam2xrXwNzw0gZEHNU8Zqd0D3SlXoc1cswEdwxY2s9_77AH_2ILRrA5HU7szR1rnCHQ=w334",
    width: "25%",
    number: "#9018",
  },
  {
    url: "https://lh3.googleusercontent.com/EkDrepfIeCWKoVnAdcR5k2yOmSJvnybnC8Ug71rp-YmgpREntc_Mby9UMzlynLWWNOj4TRnD0ZJ14yUOApvvE6Vel6Na1bE0p_Ucow=w334",
    width: "25%",
    number: "#7819",
  },
  {
    url: "https://lh3.googleusercontent.com/gzWNiCOdr8SN2BWbFgFusaP2a2KS6RhCCQXGi9gqjX1ImFuImXGLCoeBywmzDqPqOzh7XhLpnyJyDwR-R-koecNx52E0duxczTAiHw=w334",
    width: "25%",
    number: "#3178",
  },
  {
    url: "https://lh3.googleusercontent.com/dUdCD5l4F42S8-NAANPzfPjxYBtpQHoROtKpBKZLUjMkv27OlxEu7mgECvBABYb7ibor13uTAaxvXf05sX6qWCgfK58ZkN0CJPLjuw=w334",
    width: "25%",
    number: "#",
  },
  {
    url: "https://lh3.googleusercontent.com/o7poD0VDjH6I6BxHhq32ty58zmXXo_xIx8Ds44aY9h5yMK5pHU4juF6rt500-9dX3rgwrLLoamSwT8756O1nm88IweauOtsBqbfMpQ=w334",
    width: "25%",
    number: "#5823",
  },
  {
    url: "https://lh3.googleusercontent.com/PsBhlm9qb3BWLRqTMzeqdGW5Bl9tZ4pZIGZvzjnJGWX7fjAVxJCnuQuH390GLwZ5jr8tAH84GRLwT1nuI_yE-sONatYfWDqNae5nTA=w334",
    width: "25%",
    number: "#3168",
  },
  {
    url: "https://lh3.googleusercontent.com/pcMJ0Ibq72sNqd12eLVizExUr4wPw-5sOcFSeP0ExmodsccAXrFV_e7MYMaueLomkOFIwyx66wYEl4Di-VXCGnbXDR0BRseahiOg=w334",
    width: "25%",
    number: "#2398",
  },
  {
    url: "https://lh3.googleusercontent.com/h9ZhG4Fp_sk5w6UB2BKaWyxc7pZHwFHV6hNMgSJDn9Ak0D5zTHNvTIlgAhHjXGotm_qeMxWmj4_5NA_WMzp0I_-Zhx4xJsA4xRrY2A=w334",
    width: "25%",
    number: "#1109",
  },
  {
    url: "https://lh3.googleusercontent.com/Nuopl6yvHTWKU-gVhv5QluqL11zGJd2xaMe_D6HfXbckaPpmUKguFTmDtjX2vVFY4VMmxuoA9_gEGofzvkftZtqBBiH-EE0jo7Gc=w334",
    width: "25%",
    number: "#2301",
  },
  {
    url: "https://lh3.googleusercontent.com/OF2zNcFZGOW_1K8vCpL3SOOMfUpWSa7NkbrJfxoRbVqY5ZyBX0HLkPgVH9uB_NrEo_nSAFGWqho-szFSEUutyaSpMGN2VHhTiTprLg=w334",
    width: "25%",
    number: "#1119",
  },
  {
    url: "https://lh3.googleusercontent.com/yeNJGtSgOBjUM0hm6rXpAhEb-LKRAFUXR-NwSXnUM_ia2DCFnX5vxptgyF9cauKxxyggYflsJaMUkP8f-HwE_lFaTbjsTKI77Ko2Og=w334",
    width: "25%",
    number: "#9951",
  },
  {
    url: "https://lh3.googleusercontent.com/gzWNiCOdr8SN2BWbFgFusaP2a2KS6RhCCQXGi9gqjX1ImFuImXGLCoeBywmzDqPqOzh7XhLpnyJyDwR-R-koecNx52E0duxczTAiHw=w334",
    width: "25%",
    number: "#2312",
  },
  {
    url: "https://lh3.googleusercontent.com/H5gKb85EzotebTLwY2tJC3TgPs-0C1dilFUIHgAkpNV6zTqq_ibrMaDWZtlvjEnzuiolEt5wUzuqVJ1d-w0it3gmEHGytZsAFLA7pCw=w334",
    width: "25%",
    number: "#1227",
  },
  {
    url: "https://lh3.googleusercontent.com/EkDrepfIeCWKoVnAdcR5k2yOmSJvnybnC8Ug71rp-YmgpREntc_Mby9UMzlynLWWNOj4TRnD0ZJ14yUOApvvE6Vel6Na1bE0p_Ucow=w334",
    width: "25%",
    number: "#8954",
  },
  {
    url: "https://lh3.googleusercontent.com/xW34mcDzjfU0T_iICZ5tFpDWdC1jOdnkjtQpiEinw9SWc2bKgSBs-EqnQbJ8VHyM8vD_EJwtg02IMTCJ9Y2o5P_6Z15ejZz0TTCwXtE=w334",
    width: "25%",
    number: "#7234",
  },
];

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
        <title>Highest Last Sale | Crypto Pills</title>
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
            Highest Last Sale Price
          </Typography>
          <br />
          <Typography
            variant="body2"
            component="p"
            className={classes.subtitle}
          >
            Crypto-Pills is a collection of Fine Art Digital Collectibles (NFTs)
            running on the Ethereum network. This website is only an interface
            allowing participants to purchase these digital collectibles.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.cta}
            href="https://opensea.io/collection/crypto-pills-by-micha-klein?search[sortAscending]=false&search[sortBy]=LAST_SALE_PRICE"
          >
            View on OpenSea
          </Button>
        </Container>

        <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
          <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
            {images.map((image) => (
              <ImageIconButton
                href={image.url}
                style={{
                  width: image.width,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center 40%",
                    backgroundImage: `url(${image.url})`,
                  }}
                />
                <ImageBackdrop className="imageBackdrop" />
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "common.white",
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className="imageTitle"
                  >
                    {image.number}
                  </Typography>
                </Box>
              </ImageIconButton>
            ))}
          </Box>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
