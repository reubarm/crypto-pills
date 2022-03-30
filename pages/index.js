import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../hooks/web3-react";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Link,
  Typography,
  Container,
  Button,
  Grid,
  TextField,
  Stack,
} from "@material-ui/core";

import { TwitterIcon, DiscordIcon, InstagramIcon } from "../components/Icons";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AOS from "aos";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

export default function Home() {
  const { active } = useWeb3React();
  const router = useRouter();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const theme = useTheme();
  // const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [datastats, setDatastats] = useState([]);
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
  let volume = 0;
  if (datastats.market_cap) {
    marketcap = datastats.market_cap.toFixed(1);
  }
  if (datastats.average_price) {
    avgprice = datastats.average_price.toFixed(3);
  }

  if (datastats.total_volume) {
    volume = datastats.total_volume.toFixed(1);
  }

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
        <title>
          Crypto Pills | NFTs, Games, Movies and Merchandise by Micha Klein
        </title>
        <meta
          name="description"
          content="Micha Klein’s digital art has been around for over 30 years, and is not going away."
        />
      </Head>

      <Container
        id="top-anchor"
        maxWidth={false}
        component="main"
        // className={classes.root}
      >
        <Header />
      </Container>

      <>
        <section className="tf-section hero-slider">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-md-6 col-12">
                <div className="block-text pt-24 mt-27">
                  <h6 className="sub-title mb-6" data-aos={"fade-up"}>
                    Welcome to Crypto Pills
                  </h6>
                  <h2 className="title mb-26" data-aos="fade-up">
                    Virtual Medicine for a Sick Society
                  </h2>
                  <p className="desc mb-20" data-aos="fade-up">
                    Some escaped from a lab; a few were dropped from a van;
                    others were prescribed by a doctor; or simply bought over
                    the counter.
                  </p>
                  <p
                    className="desc mb-43"
                    data-aos="fade-up"
                    style={{ fontWeight: "900" }}
                  >
                    Crypto-Pills are here to make you happy!
                  </p>
                  <a
                    href="#roadmap"
                    className="btn-action style-3"
                    data-aos="fade-up"
                    data-aos-duration={1200}
                  >
                    Crypto Pill Roadmap
                  </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <a
                    href="https://opensea.io/collection/crypto-pills-by-micha-klein"
                    className="btn-action style-2"
                    data-aos="fade-up"
                    data-aos-duration={1200}
                  >
                    Buy on OpenSea
                  </a>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-12">
                <div className="content-right d-flex">
                  <div style={{ borderRadius: "30px", overflow: "hidden" }}>
                    <ReactPlayer
                      url="/123.mp4"
                      playing={true}
                      loop={true}
                      controls={false}
                      muted={true}
                      width="560"
                      height="640"
                      style={{ borderRadius: "30px" }}
                    />
                  </div>
                  {/* <iframe
                    src="/animation/pillman.html"
                    width="600"
                    height="540"
                    scrolling="no"
                    style={{ borderRadius: "30px" }}
                  ></iframe> */}

                  {/* <div className="swiper-container swiper mySwiper1 swiper-h">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div
                          className="item bg-2"
                          style={{ background: "red" }}
                        >
                          <img
                            src="images/item-01.png"
                            width="175"
                            height="200"
                            alt="Monteno"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="item bg-1">
                          <img
                            src="images/item-02.png"
                            width="175"
                            height="200"
                            alt="Monteno"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="item bg-2">
                          <img
                            src="images/item-03.png"
                            width="175"
                            height="200"
                            alt="Monteno"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-container swiper mySwiper2 swiper-h ">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="item bg-1">
                          <img
                            src="images/item-04.png"
                            width="175"
                            height="200"
                            alt="Monteno"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="item bg-2">
                          <img
                            src="images/item-05.png"
                            width="175"
                            height="200"
                            alt="Monteno"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="item bg-1">
                          <img
                            src="images/item-06.png"
                            width="175"
                            height="200"
                            alt="Monteno"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-container swiper mySwiper3 swiper-h d-m-none">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="item bg-2">
                          <img
                            src="images/item-07.png"
                            width="175"
                            height="200"
                            alt="Monteno"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="item bg-1">
                          <img
                            src="images/item-08.png"
                            width="175"
                            height="200"
                            alt="Monteno"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="item bg-2">
                          <img
                            src="images/item-09.png"
                            width="175"
                            height="200"
                            alt="Monteno"
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Hero Slider */}
        {/* About Us */}
        <section className="tf-section section-about">
          <div className="container">
            <div className="row reverse">
              <div className="col-xl-7 col-md-12">
                <div className="group-image">
                  <div className="left">
                    <div
                      className="item bg-1"
                      style={{
                        background:
                          "url(/images/Background_GoldShine.png), top center",
                        backgroundSize: "cover",
                      }}
                    >
                      <img
                        src="images/item-10.png"
                        width="315"
                        height="360"
                        alt="Monteno"
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div
                      className="item bg-2"
                      style={{
                        background:
                          "url(/images/Background_Diamond-Age.png), top center",
                        backgroundSize: "cover",
                      }}
                    >
                      <img
                        src="images/item-11.png"
                        width="315"
                        height="360"
                        alt="Monteno"
                      />
                    </div>
                    <div
                      className="item bg-3"
                      style={{
                        background:
                          "url(/images/Background_AstralPink.png), top center",
                        backgroundSize: "cover",
                      }}
                    >
                      <img
                        src="images/item-12.png"
                        width="315"
                        height="360"
                        alt="Monteno"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-md-12">
                <div className="block-text pt-12">
                  <h5
                    className="sub-title mb-10"
                    data-aos={"fade-up"}
                    data-aos-duration={1000}
                  >
                    Crypto-Pills Artwork
                  </h5>
                  <h3
                    className="title mb-58"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    High Quality NFT Collection
                  </h3>
                  <p
                    className="fs-21 mb-33"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    All Crypto-Pills vector artwork is rendered in glorious
                    3,000 pixels resolution. This allows collectors to create
                    crisp prints and avatars without loss of detail.
                  </p>
                  <p
                    className="fs-18 line-h17 mb-41"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Crypto-Pills are Fine Art Collectibles, offering you a
                    unique chance to obtain an original Micha Klein artwork. His
                    work has firm roots in digital art history.
                  </p>
                  <a
                    href="https://opensea.io/collection/crypto-pills-by-micha-klein"
                    className="btn-action style-2"
                    data-aos="fade-up"
                    data-aos-duration={1200}
                  >
                    Buy on OpenSea
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end About Us */}
        {/* Portfolio */}
        <section className="tf-section porfolio">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="block-text center">
                  <h1
                    className="heading-bg"
                    data-aos="fade-in"
                    data-aos-duration={1000}
                  >
                    <span>Join</span>
                  </h1>
                  <h5
                    className="sub-title mb-10"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Community Overview
                  </h5>
                  <h3
                    className="title mb-28"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Become a Pillman Collector
                    <br /> &amp; Enjoy the Benefits
                  </h3>
                </div>
              </div>
            </div>
            <div className="row mt-61">
              <div className="col-md-6">
                <div className="icon-box bg-2" data-aos="fade-up">
                  <div className="content center">
                    <a className="h3">NFT Collection</a>
                    <p className="fs-18">
                      Artist donates over $150.000 of sales to Save The Children
                      Charity for children in need worldwide; written in the
                      Smart Contract for full transparency.
                    </p>
                    <a
                      href="https://opensea.io/collection/crypto-pills-by-micha-klein"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Buy on OpenSea
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="icon-box bg-2"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                >
                  <div className="content center">
                    <a className="h3">Pillman Origins</a>
                    <p className="fs-18">
                      Our skill based NFT collectors game, where you can earn
                      Pillcoins and Merchandise on the next release on web, iOS
                      &amp; Android.
                    </p>
                    <a
                      href="https://pillman-proto.netlify.app/"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Play our Game
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="icon-box bg-2" data-aos="fade-up">
                  <div className="content center">
                    <a className="h3">Animated Movies</a>
                    <p className="fs-18">
                      Hollywood director Frank Coraci (Waterboy, Zoo, Around the
                      World in 80 Days) is working on scripts for movie /
                      animated series.
                    </p>
                    <a
                      href="#"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Watch Trailer
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="icon-box bg-2"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                >
                  <div className="content center">
                    <a className="h3">Merchandise</a>
                    <p className="fs-18">
                      MetaMask Shopify integration allowing owners of Crypto
                      Pills to claim free merch or merch with discounts
                      depending on NFTs stored in their wallet.
                    </p>
                    <a
                      href="https://dropthepill.com/"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Drop the Pill Store
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Portfolio */}
        {/* Speciality */}
        <section className="tf-section section-speciality">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-md-12">
                <div className="block-text mt-61 pd-0">
                  <h5
                    className="sub-title mb-10"
                    data-aos={"fade-up"}
                    data-aos-duration={1000}
                  >
                    Our Community
                  </h5>
                  <h3
                    className="title mb-28"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Latest OpenSea Statistics
                  </h3>
                  <p
                    className="fs-21"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Since launch on <strong>August 27th 2021</strong>, Cryto
                    Pills floor price has always been higher than mint (0.07
                    ETH) 😊.
                  </p>
                </div>
              </div>
              <div className="col-xl-7 col-md-12">
                <div className="section-speciality__box">
                  <div
                    className="box-item bg-2 mr-28 center"
                    data-aos="flip-left"
                  >
                  <h2>{avgprice}</h2>
                  <span className="h5">Average Price (ETH)</span>
                   
                  </div>
                  <div
                    className="box-item bg-2 mt-45 center"
                    data-aos="flip-right"
                    data-aos-duration={1000}
                  >
                    <h2>{marketcap}</h2>
                    <span className="h5">Market Cap (ETH)</span>
                  </div>
                  <div
                    className="box-item bg-2 mr-28 mt--16 center"
                    data-aos="flip-left"
                  >
                    <h2>{volume}</h2>
                    <span className="h5">
                      Total Volume<br />
                      (ETH)
                    </span>
                  </div>
                  <div
                    className="box-item bg-2 mt-29 center"
                    data-aos="flip-right"
                    data-aos-duration={1000}
                  >
                    <h2>{datastats.thirty_day_sales}</h2>
                    <span className="h5">Monthly Sales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Speciality */}

        {/* Road Map */}
        <section className="tf-section road-map mt-107" id="roadmap">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="block-text center">
                  <h1
                    className="heading-bg"
                    data-aos="fade-in"
                    data-aos-duration={1000}
                  >
                    <span>Road Map</span>
                  </h1>
                  <h5
                    className="sub-title mb-10"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Road Map
                  </h5>
                  <h3
                    className="title mb-28"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    The Journey of <br /> Crypto Pills
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="road-map__content s1">
                  <div
                    className="box-time left"
                    data-aos="fade-right"
                    data-aos-offset={300}
                  >
                    <span data-aos="zoom-in" data-aos-offset={300}>
                      <i className="fa fa-check" />
                    </span>
                    <p className="fs-16 color-main mb-2">August 24th, 2021</p>
                    <h5 className="title mb-10">Crypto Pills NFT Launch</h5>
                    <p className="fs-18">
                      All 10,000 Crypto-Pills were algorithmically generated
                      from 37 categories and 504 traits, allowing some to be
                      rarer than others;{" "}
                      <strong>all created by artist Micha Klein.</strong>
                    </p>
                    <a
                      href="/nfts"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      View Full Collection
                    </a>
                  </div>
                  <div
                    className="box-time right mt-223"
                    data-aos="fade-up"
                    data-aos-offset={300}
                  >
                    <span data-aos="zoom-in" data-aos-offset={300}>
                      <i className="fa fa-check" />
                    </span>
                    <p className="fs-16 color-main mb-0">September 2nd, 2021</p>
                    <h5 className="title mb-20">Merchandise Store Launch</h5>
                    <p className="fs-18">
                    A full range of contemporary artwork, with MetaMask integration allowing owners of Crypto Pills to claim free merch or merch with discounts.
                    </p>
                    <a
                      href="https://dropthepill.com/"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Visit DTP Store
                    </a>
                  </div>

                  <div
                    className="box-time left mt--23"
                    data-aos="fade-right"
                    data-aos-offset={300}
                  >
                    <span data-aos="zoom-in" data-aos-offset={300}>
                      <i className="fa fa-circle" />
                    </span>
                    <p className="fs-16 color-main mb-0">February 19th, 2022</p>
                    <h5 className="title mb-20">NFT Game Release</h5>
                    <p className="fs-18">
                    An exciting skill based NFT collectors game launched as a BETA. Soon users can earn Pillcoins and Merchandise on the next release on iOS & Android.
                    </p>
                    <a
                      href="https://pillman-proto.netlify.app/"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Play Game
                    </a>
                  </div>
                  <div
                    className="box-time right mt-200"
                    data-aos="fade-up"
                    data-aos-offset={300}
                  >
                    <span data-aos="zoom-in" data-aos-offset={300}>
                      <i className="fa fa-angle-down color2" />
                    </span>
                    <p className="fs-16 color-main mb-0">March 31st, 2022</p>
                    <h5 className="title mb-20">3D Pillman NFT Drop</h5>
                    <p className="fs-18">
                    This collection will add value to the original collection, bring in new collectors and expand Crypto Pills IP into the Metaverse.
                    </p>
                    <a
                      href="https://discord.gg/UV4FnNGYdp"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Join Whitelist
                    </a>
                  </div>
                  <div
                    className="box-time left mt--23"
                    data-aos="fade-right"
                    data-aos-offset={300}
                  >
                    <span data-aos="zoom-in" data-aos-offset={300}>
                      <i className="fa fa-circle" />
                    </span>
                    <p className="fs-16 color-main mb-0">Date: TBC</p>
                    <h5 className="title mb-20">Pillcoin Token Launch</h5>
                    <p className="fs-18">
                    The community gains voting rights on the Play-to-Earn games, NFTs, mini-movies, merchandise and events within the community launchpad.
                    </p>
                  </div>
                  <div
                    className="box-time right mt-200"
                    data-aos="fade-up"
                    data-aos-offset={300}
                  >
                    <span data-aos="zoom-in" data-aos-offset={300}>
                      <i className="fa fa-angle-down color2" />
                    </span>
                    <p className="fs-16 color-main mb-0">Date: TBC</p>
                    <h5 className="title mb-20">Play to Earn Game</h5>
                    <p className="fs-18">
                    The game will be available for free on iOS, Android and web platforms for Crypto Pill holders as a play-to-earn model with Pill Coins.
                    </p>
                  </div>
                  <div
                    className="box-time left mt--23"
                    data-aos="fade-right"
                    data-aos-offset={300}
                  >
                    <span data-aos="zoom-in" data-aos-offset={300}>
                      <i className="fa fa-circle" />
                    </span>
                    <p className="fs-16 color-main mb-0">Date: TBC</p>
                    <h5 className="title mb-20">Live Crypto Pill Exhibition</h5>
                    <p className="fs-18">
                    From large prints and paintings, to video installations and large sculptures, in various materials. Some really elaborate, like the Crypto-Pills sculptures, some even incorporating robotics.
                    </p>
                  </div>
                  <div
                    className="box-time right mt-200"
                    data-aos="fade-up"
                    data-aos-offset={300}
                  >
                    <span data-aos="zoom-in" data-aos-offset={300}>
                      <i className="fa fa-angle-down color2" />
                    </span>
                    <p className="fs-16 color-main mb-0">Date: TBC</p>
                    <h5 className="title mb-20">Animated Mini-Movie Series</h5>
                    <p className="fs-18">
                    We have already produced teasers for an animated movie / TV series, and there will be a complete launch of 5 episodes written by Hollywood director Frank Coraci.
                    </p>
                  </div>
                </div>
                <div className="view-all center" data-aos="fade-up">
                  <a href="/roadmap" className="btn-action style-2">
                    View Full Roadmap
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Road Map */}
        {/* Newsletter */}
        <section className="tf-section newsletter">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="newsletter__body" data-aos="fade-up">
                  <div
                    className="col-md-6"
                    style={{ borderRight: "1px solid white" }}
                  >
                    <div className="block-text center">
                      <h3 className="mb-13" style={{ color: "white" }}>
                        Subscribe
                      </h3>
                      <p className="fs-21" style={{ color: "white" }}>
                        Get udpated with Crypto Pills news
                      </p>
                      <form
                        className="body__form"
                        style={{
                          width: "80%%",
                          padding: "0",
                          margin: "0 auto",
                          textAlign: "center",
                        }}
                      >
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Your email here"
                            required=""
                            style={{ borderRadius: "5px" }}
                          />
                          {/* <button type="submit" className="btn btn-primary">
                        Subscribe
                      </button> */}
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="block-text center">
                      <h3 className="mb-13" style={{ color: "white" }}>
                        Join our Discord
                      </h3>
                      <p className="fs-21" style={{ color: "white" }}>
                        Become part of the community
                      </p>
                      <a
                        href="https://discord.gg/UV4FnNGYdp"
                        className="btn-action style-2"
                        data-aos="fade-up"
                        data-aos-duration={1200}
                      >
                        Crypto Pills Discord Group
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Newsletter */}
        {/* Team */}
        <section className="tf-section team mt-61">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="block-text center">
                  <h1
                    className="heading-bg"
                    data-aos="fade-in"
                    data-aos-duration={1000}
                  >
                    <span>Artist</span>
                  </h1>
                  <h5
                    className="sub-title mb-10"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    The Artist
                  </h5>
                  <h2
                    className="title mb-28"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Micha Klein
                  </h2>
                  <img
                    src="/images/micha-portrait.webp"
                    width="200"
                    height="200"
                    style={{ borderRadius: "30px" }}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-53">
              <div className="col-md-12">
                <div className="team-box">
                  <div className="team-info">
                    <p className="fs-21">
                      <a href="https://michaklein.com">Micha Klein</a> has been
                      a pioneer in digital 3D animation since before Steve Jobs
                      invested in Pixar. Blockchain technology has allowed Micha
                      to fulfill a dream of his, bringing his legendary
                      (Eminem’s Anger Management Tour) OG Pillman to the masses
                      and to the metaverse. He has created 10,000 wildly
                      intricate and unique, computer-generated avatars. Every
                      pill is represented by a token that has a 3000x3000 pixel
                      depth.
                      <br />
                      <br />
                      Micha is dedicated to adding value to this project, every
                      step of the way, for his fans and collectors. Immediately,
                      Micha is donating 5% of the total proceeds to a special
                      charity that helps less fortunate children receive the
                      medicine that they need. This donation will be written
                      directly into the contract.
                      <br />
                      <br />
                      Micha Klein’s digital art has been around for over 30
                      years and has stood the test of time. He has delivered
                      huge projects for the likes of Disney and Coca-Cola and is
                      dedicated to the digital art and NFT community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Team */}
        {/* Partners */}
        <section className="tf-section partners">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="block-text center">
                  <h1
                    className="heading-bg"
                    data-aos="fade-in"
                    data-aos-duration={1000}
                  >
                    <span>NEWS</span>
                  </h1>
                  <h5
                    className="sub-title mb-10"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Community News
                  </h5>
                  <h3
                    className="title mb-28"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Our Latest News
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="icon-box bg-2" data-aos="fade-up">
                  <div className="content center">
                    <a className="h4">Slim Shady Feat. Pillman Tour</a>
                    <p className="fs-18">
                      Eminem commissioned Pillman animations for his first US &
                      European Tour for his incredible 2000 Anger Management
                      Tour
                    </p>
                    <a
                      href="#"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icon-box bg-2" data-aos="fade-up">
                  <div className="content center">
                    <a className="h4">International Space Station Launch</a>
                    <p className="fs-18">
                      There's been a Pillman sent to the International Space
                      Station for 1 year in February, before moving to it's new
                      home… the #MOON!
                    </p>
                    <a
                      href="#"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Read Article
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icon-box bg-2" data-aos="fade-up">
                  <div className="content center">
                    <a className="h4">Digital Artist of the Year (2021)</a>
                    <p className="fs-18">
                      Micha Klein was chosen by the NFT community and cemented
                      his name down history as the first-ever winner for the
                      category.
                    </p>
                    <a
                      href="#"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Read Article
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Partners */}

        {/* Newsletter */}
        <section className="tf-section newsletter">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="newsletter__body" data-aos="fade-up">
                  <div className="block-text">
                    <h3 className="mb-13" style={{ color: "white" }}>
                      Let's be Friends
                    </h3>
                    <p className="fs-21 mb-7" style={{ color: "white" }}>
                      Join us on our journey to the moon.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "300px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link
                      href="https://twitter.com/pills_crypto"
                      target="_blank"
                      rel="noopener"
                      style={{ color: "#a8c6dc" }}
                    >
                      <TwitterIcon style={{ fontSize: 70 }} />
                    </Link>
                    <Link
                      href="https://discord.gg/UV4FnNGYdp"
                      target="_blank"
                      rel="noopener"
                      style={{ color: "#a8c6dc" }}
                    >
                      <DiscordIcon style={{ fontSize: 70 }} />
                    </Link>
                    <Link
                      href="https://www.instagram.com/cryptopills_official"
                      target="_blank"
                      rel="noopener"
                      style={{ color: "#a8c6dc" }}
                    >
                      <InstagramIcon style={{ fontSize: 70 }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Newsletter */}
        {/* FAQ */}
        <section className="tf-section faq mt-200" id="faq">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="block-text center">
                  <h1
                    className="heading-bg"
                    data-aos="fade-in"
                    data-aos-duration={1000}
                  >
                    <span>FAQ</span>
                  </h1>
                  <h5
                    className="sub-title mb-10"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    FAQ
                  </h5>
                  <h3
                    className="title mb-28"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Frequently Aksed <br /> Questions
                  </h3>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 mx-auto">
                <div className="flat-accordion" data-aos="fade-up">
                  {MOCK_FAQS.map((accordion) => (
                    <Accordion key={accordion.value}>
                      <AccordionSummary
                        style={{ height: "80px" }}
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography variant="h6">
                          <strong>{accordion.heading}</strong>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails style={{ height: "160px" }}>
                        <Typography variant="subtitle1">
                          {accordion.detail}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end FAQ */}
        <br />
        <br />
        <br />
        <br />
        <br />
      </>

      <Footer />
    </>
  );
}
