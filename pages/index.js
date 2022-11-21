import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import ReactPlayer from "react-player";
import { Link, Typography, Container, Grid } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import { TwitterIcon, DiscordIcon, InstagramIcon } from "../components/Icons";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AOS from "aos";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

export default function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [datastats, setDatastats] = useState([]);
  const [eth, setEth] = useState([]);
  const options = { method: "GET", headers: { Accept: "application/json" } };
  const limit = 16;

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

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/ethereum?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true"
      )
      .then((res) => {
        setEth(res.data.market_data.current_price.usd);
        console.log(res.data.market_data.current_price.usd);
      })
      .catch((error) => console.log(error));
  }, []);
  const test = JSON.stringify(eth);

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

  const sales = [
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/5037",
      photo:
        "https://lh3.googleusercontent.com/_s9b8kwrwjb03LjT5uxPv6IaLA9YkkQ67sp70HUTWDH-76rVDpawMpRLy9D5U0BJAxaIXP4anTZaa1CgQtvKiMPdggnHluAQEO5yEg=w600",
      price: 18.0,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/7379",
      photo:
        "https://lh3.googleusercontent.com/IFLMXqDoa6LTpH6pBExHackLUbeTg2epmv8PKfm9eO8HUIKHhvRa_XhD_MiTEaYDDohGBE74oiCnBfEjhUYymgp7C-zJADMdVYFd=w600",
      price: 16.0,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/6564",
      photo:
        "https://lh3.googleusercontent.com/qn34aLMham2euwotgBOBXqDaQ2mrRyASVVfHQ2h93SjSqc_gEBrfLDYHTdBoh5Jm-1UNZuaVGU6mYJwSUagnacBb6eg2KRNfjPW-8Q=w600",
      price: 12.9,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/5273",
      photo:
        "https://lh3.googleusercontent.com/sjuasaqWlG1xdJFCupFLWqvIk-6qXVy7F8LnvNxqIphj9EH1SOj4tOHoy1-jk1t5UvICQ-FUFacInoZ91ih1TBQdUClc3bnP6idWSA=w600",
      price: 11.99,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/9830",
      photo:
        "https://lh3.googleusercontent.com/bFwT0nV8a1OvPUH8DK9UwhZAseUEJlP6oBLk1jAqk4kIwe_aiD5NiNHU-Qw7FkpfMhos3dwFHB_HfbIb4BlAO0ZpMa8Iu6gqhYrT=w600",
      price: 10,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/6018",
      photo:
        "https://lh3.googleusercontent.com/TVALARV_eA5XIIe3KnTPHUqb4I4P7Dm9sc86x9xvBLAFiHxhIKwjXwfcrAcJjoC59BYfljCUvXmMnqk3xQX420yWc2vY6IjtrYKlXg=w600",
      price: 10,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/6429",
      photo:
        "https://lh3.googleusercontent.com/zE7njHeqVFuOAspkNpNREG4HIuZ0b_R5VOfASK-ROukRyIz0tQeRqKGibZGgT8ZIIXFJvPp3F_FgcKxsiIa5CYO0daMZIpXqt__BDqQ=w600",
      price: 8,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/9044",
      photo:
        "https://lh3.googleusercontent.com/XB5zO41nlQFYtDfIRJaqTsDLfSfMfiR7scSDw-Es-XmThkJFGDtO6uICoAUVLv6Zyxd2N6YOuCII0HC833c_uYpSDOmAyiFyE5PMBg=w600",
      price: 7.75,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/6312",
      photo:
        "https://lh3.googleusercontent.com/cFdVa3f6xe2GQ5x5tmkMCZMFCiCgAyvhhzSrmwDJ4LpW8j-FAdJcaAaaiz4pLJd1kv2Na3t_drZxVZKeLAMd_dcMoL4ey3p5eWJy=w600",
      price: 7.4,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/7042",
      photo:
        "https://lh3.googleusercontent.com/wXm7xHh7aNnz0SjJcpL1sBKAyTeYYTA0qtXFSRgsZIGl6a0FqArQyYpIZie8uKpTrC2NN8M24906LaEUwFo8DpaoPZqQpEUWfUAxZg=w600",
      price: 7,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/386",
      photo:
        "https://lh3.googleusercontent.com/NDdPHbvxqTd-no1e5iJleHIEMqHIn3iTQsiJ3EA_43CHBMp7zgnqZIuVKQn9IMX9OfR57fhdiVfb330IDU8rtJS4sHiUT82_Trd6vA=w600",
      price: 7,
    },
    {
      url: "https://opensea.io/assets/0x7dd04448c6cd405345d03529bff9749fd89f8f4f/4951",
      photo:
        "https://lh3.googleusercontent.com/ELcUSVwKen0YHZjrLtdno_72iQl-38v67BRyTwUEE8TI-VJK59C_Rknl4DiV6xwm6bPl-8EmUFIemUFTgE9JrU-RDVz9Wy7S-sE8u3U=w600",
      price: 5.5,
    },
  ];

  // const calc = sales[0].price * eth;

  const title = [
    "How do I purchase Crypto Pills?",
    "How do I know which Crypto-Pill I get?",
    "How many Crypto Pills can I buy per single transaction?",
    "What will be the price of Crypto Pills?",
  ];

  const description = [
    "The easiest way to purchase Crypto Pills is to install a MetaMask extension in your browser and link your crypto wallet to it. Ensure you have enough ETH in your wallet to cover the cost of purchasing Crypto Pills, in addition to any associated gas fees. Approve the desired transaction on MetaMask and you are ready to go. For more information, please refer to this link: https://nftyfarm.com/metamask/",
    "Crypto Pills will remain hidden until the big reveal on August 27, 2021. Upon reveal, the artwork from the pre-defined collection will be assigned to the NFT placeholder that you purchased. “Blind sales” are chosen to ensure the Crypto Pills value is protected so no one can determine its rarity, including the project owners.",
    "There is a limit of twenty (20) Crypto Pills that can be purchased in one (1) transaction.",
    "The pricing model is a flat-rate throughout the entire sale. The cost of each Crypto-Pill is set at 0.07 Eth, and 100 Crypto Pills will be reserved for giveaways.",
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

  SwiperCore.use([Autoplay]);

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
              <div className="col-12 show-sm">
                {/* <img
                  src="123.gif"
                  alt="Pillman 3D"
                  style={{ width: "100%", borderRadius: "30px" }}
                /> */}
              </div>
              <div className="col-xl-6 col-md-6 col-12">
                <div className="block-text pt-24 mt-27">
                  <h6 className="sub-title mb-6" data-aos={"fade-up"}>
                    Welcome to Crypto Pills
                  </h6>
                  <h2 className="title mb-26" data-aos="fade-up">
                    Virtual Medicine for a Sick Society
                  </h2>
                  <p className="mb-20 fs-18" data-aos="fade-up">
                    Crypto Pills are a limited NFT collection… Some escaped from
                    a lab; a few were dropped from a van; others were prescribed
                    by a doctor; or simply bought over the counter.
                    <br />
                    <br />
                    All 10,000 Crypto Pills are algorithmically generated from
                    37 categories and 504 traits, allowing some to be rarer than
                    others.
                    <br />
                    <br />
                    <strong>
                      All Crypto-Pill’s features were created by the winner of
                      the NYC Digital NFT Artist Of The Year 2021 Award; Micha
                      Klein. They are multi-gender, multi-color and based on
                      Micha’s infamous Pillman character Eminem brought on his
                      first tour in 2000.
                      <br />
                      <br />
                      The Crypto Pills Collection dropped on August 27, 2021 and
                      sold out in 11 minutes. They are available on secondary
                      market at OpenSea, Coinbase and LooksRare.
                    </strong>
                  </p>
                  <a
                    href="#roadmap"
                    className="btn-action style-4"
                    data-aos="fade-up"
                    data-aos-duration={1200}
                  >
                    Crypto Pill Roadmap
                  </a>
                  <a
                    href="/play"
                    className="btn-action style-3"
                    data-aos="fade-up"
                    data-aos-duration={1200}
                  >
                    Play Pillman Origins
                  </a>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-12 hide-sm">
                <div className="content-right d-flex mt-107">
                  <div style={{ borderRadius: "30px", overflow: "hidden" }}>
                    {/* <ReactPlayer
                      url="/123.mp4"
                      playing={true}
                      loop={true}
                      controls={false}
                      muted={true}
                      width="560"
                      height="640"
                      style={{ borderRadius: "30px" }}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Hero Slider */}
        {/* About Us */}
        <section className="tf-section section-about">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-md-12" style={{ display: "flex" }}>
                <div className="swiper-container swiper mySwiper1 swiper-h">
                  <Swiper
                    direction={"vertical"}
                    // spaceBetween={1}
                    slidesPerView={3}
                    autoHeight={true}
                    autoplay={{
                      delay: 3000,
                    }}
                    modules={[Autoplay]}
                    className="swiper-wrapper"
                    style={{ height: "650px" }}
                  >
                    <SwiperSlide style={{ height: "200px" }}>
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
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-2"
                        style={{
                          background: "#99eadd",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-09.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-1"
                        style={{
                          background: "#426795",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-11.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ height: "200px" }}>
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
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="swiper-container swiper mySwiper1 swiper-h">
                  <Swiper
                    direction={"vertical"}
                    // spaceBetween={1}
                    slidesPerView={3}
                    autoHeight={true}
                    autoplay={{
                      delay: 9000,
                    }}
                    modules={[Autoplay]}
                    className="swiper-wrapper"
                    style={{ height: "650px" }}
                  >
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-1"
                        style={{
                          background: "#b69b85",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-01.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-2"
                        style={{
                          background: "#c4e3a3",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-02.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-1"
                        style={{
                          background: "#ff7abe",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-03.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-3"
                        style={{
                          background: "#f07c4a",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-04.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="swiper-container swiper mySwiper1 swiper-h">
                  <Swiper
                    direction={"vertical"}
                    // spaceBetween={1}
                    slidesPerView={3}
                    autoHeight={true}
                    autoplay={{
                      delay: 6000,
                    }}
                    modules={[Autoplay]}
                    className="swiper-wrapper"
                    style={{ height: "650px" }}
                  >
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-1"
                        style={{
                          background: "#00cfc0",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-06.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-2"
                        style={{
                          background:
                            "url(/images/Background_Diamond-Age.png), top center",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-04.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-1"
                        style={{
                          background: "#a4a5a5",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-07.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ height: "200px" }}>
                      <div
                        className="item bg-3"
                        style={{
                          background: "#efefda",
                          backgroundSize: "cover",
                        }}
                      >
                        <img
                          src="images/item-08.png"
                          width="175"
                          height="200"
                          alt="Monteno"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-xl-6 col-md-12">
                <div className="block-text pl-30">
                  <h5
                    className="sub-title mb-10"
                    data-aos={"fade-up"}
                    data-aos-duration={1000}
                  >
                    High Quality NFT Collection
                  </h5>
                  <h3
                    className="title"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    Crypto Pills Artwork
                  </h3>
                  <p
                    className="fs-18 mb-33"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                  >
                    <br />
                    All Crypto Pills vector artwork is rendered in glorious
                    3,000 pixels resolution. This allows collectors to create
                    crisp prints and avatars without loss of detail.
                    <br />
                    <br />
                    Crypto Pills are Fine Art Collectibles, offering you a
                    unique chance to obtain an original Micha Klein artwork. His
                    work has firm roots in digital art history, can be seen in
                    several international museums, and has been auctioned by
                    Sotheby's, Christie and Phillips.
                    <br />
                    <br /> Your Crypto-Pill serves as your digital identity,
                    allowing you access to the Crypto Pills Origins P2E
                    videogame, as well as other perks like discount on merch,
                    airdrops of $PILL coins and NFTs , white list on future NFT
                    drops by Micha Klein, and entry to raffles.
                  </p>
                  <a
                    href="https://opensea.io/collection/crypto-pills-by-micha-klein"
                    className="btn-action style-3"
                    data-aos="fade-up"
                    data-aos-duration={1200}
                  >
                    Buy on OpenSea
                  </a>
                  <a
                    href="https://looksrare.org/collections/0x7DD04448c6CD405345D03529Bff9749fd89F8F4F"
                    className="btn-action style-2"
                    data-aos="fade-up"
                    data-aos-duration={1200}
                  >
                    View on LooksRare
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
                    <img
                      src="/images/banner.jpeg"
                      style={{
                        width: "100%",
                        height: "150px",
                        margin: "-30px 0 20px",
                        borderRadius: "20px",
                      }}
                    />
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
                    <img
                      src="/gamescreens.png"
                      style={{
                        width: "100%",
                        height: "150px",
                        margin: "-30px 0 20px",
                        borderRadius: "20px",
                      }}
                    />
                    <a className="h3">Pillman Origins</a>
                    <p className="fs-18">
                      Our skill based NFT collectors game, where you can earn
                      Pillcoins and Merchandise on the next release on web, iOS
                      &amp; Android.
                    </p>
                    <a
                      href="/play"
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
                    <img
                      src="/images/film.png"
                      style={{
                        width: "100%",
                        height: "150px",
                        margin: "-30px 0 20px",
                        borderRadius: "20px",
                      }}
                    />
                    <a className="h3">Animated Movies</a>
                    <p className="fs-18">
                      Hollywood director Frank Coraci (Waterboy, Zoo, Around the
                      World in 80 Days) is working on scripts for movie /
                      animated series.
                    </p>
                    <a
                      href="/music.mp4"
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
                    <img
                      src="/images/dtp.png"
                      style={{
                        width: "100%",
                        height: "150px",
                        margin: "-30px 0 20px",
                        borderRadius: "20px",
                      }}
                    />
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

        {/* Team */}
        <section className="tf-section team">
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
                      depth. depth.
                      <br />
                      <br />
                      Micha is dedicated to adding value to this project, every
                      step of the way, for his fans and collectors. Immediately,
                      Micha has donated 5% of the total proceeds to Save The
                      Children, a charity that helps less fortunate children
                      receive the medicine that they need. This donation was
                      written directly into the smart contract.
                      <br />
                      <br />
                      Micha Klein's digital art has been around for over 30
                      years and has stood the test of time. He has delivered
                      huge projects for the likes of Disney and Coca-Cola and is
                      dedicated to the digital art and NFT community.
                    </p>
                    <br />
                    <a
                      href="https://michaklein.com/"
                      className="btn-action style-3"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Micha Klein Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end Team */}
        <section className="tf-section mb-58">
          <div className="container">
            <div className="row" style={{ textAlign: "center" }}>
              <h3
                className="title mb-28"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                Highest Last Sale
              </h3>
              <div style={{ flexDirection: "row" }}>
                {sales.map((sale, index) => {
                  return (
                    index < 12 && (
                      <>
                        <a href={sale.url} target="_blank" rel="noopener">
                          <img src={sale.photo} className="os-photo" />
                          <br />
                          {sale.price} ETH <br />
                          (${(sale.price * eth).toLocaleString()})
                        </a>
                      </>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* Speciality */}
        <section className="tf-section section-speciality mt-107">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-xl-5  col-md-12">
                <div className="block-text mt-61 pd-10">
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
                    Pills has created a total volume of{" "}
                    <strong>
                      {volume} ETH (${(volume * eth).toLocaleString()})
                    </strong>
                    , whilst the current OpenSea floor price is{" "}
                    <strong>{datastats.floor_price} ETH</strong>.
                  </p>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-12">
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
                      Total Volume
                      <br />
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
                    <div className="rm-box">
                      <div className="rm-tite full-width">
                        <p className="fs-16 color-main mb-2">
                          August 24th, 2021
                        </p>
                        <h5 className="title mb-10">Crypto Pills NFT Launch</h5>
                      </div>
                      <div className="rm-photo">
                        <img src="/Avatar-Large.19.png" alt="" width="80" />
                      </div>
                    </div>

                    <p className="fs-18">
                      All 10,000 Crypto Pills were algorithmically generated
                      from 37 categories and 504 traits, allowing some to be
                      rarer than others;{" "}
                      <strong>all created by artist Micha Klein.</strong>
                    </p>
                    <a
                      href="https://looksrare.org/collections/0x7DD04448c6CD405345D03529Bff9749fd89F8F4F"
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
                    <div className="rm-box">
                      <div className="rm-tite full-width">
                        <p className="fs-16 color-main mb-0">
                          September 2nd, 2021
                        </p>
                        <h5 className="title mb-20">Merchandise Launch</h5>
                      </div>
                      <div className="rm-photo">
                        <img src="/Avatar-Large.18.png" alt="" width="80" />
                      </div>
                    </div>

                    <p className="fs-18">
                      A full range of contemporary artwork, with MetaMask
                      integration allowing owners of Crypto Pills to claim free
                      merch or merch with discounts.
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
                      <i className="fa fa-check" />
                    </span>
                    <div className="rm-box">
                      <div className="rm-tite full-width">
                        <p className="fs-16 color-main mb-0">
                          February 19th, 2022
                        </p>
                        <h5 className="title mb-20">NFT Game Release</h5>{" "}
                      </div>
                      <div className="rm-photo">
                        <img src="/Avatar-Large.17.png" alt="" width="80" />
                      </div>
                    </div>
                    <p className="fs-18">
                      An exciting skill based NFT collectors game launched as a
                      BETA. Soon users can earn Pillcoins and Merchandise on the
                      next release on iOS & Android.
                    </p>
                    <a
                      href="/play"
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
                    <span
                      className="incomplete"
                      data-aos="zoom-in"
                      data-aos-offset={300}
                    >
                      <i className="fa fa-circle color2" />
                    </span>
                    <div className="rm-box">
                      <div className="rm-tite full-width">
                        <p className="fs-16 color-main mb-0">Coming Soon</p>
                        <h5 className="title mb-20">
                          3D Pillman NFT Drop
                        </h5>{" "}
                      </div>
                      <div className="rm-photo">
                        <img src="/Avatar-Large.16.png" alt="" width="80" />
                      </div>
                    </div>
                    <p className="fs-18">
                      This collection will add value to the original collection,
                      bring in new collectors and expand Crypto Pills IP into
                      the Metaverse.
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
                    <span
                      className="incomplete"
                      data-aos="zoom-in"
                      data-aos-offset={300}
                    >
                      <i className="fa fa-circle" />
                    </span>
                    <div className="rm-box">
                      <div className="rm-tite full-width">
                        <p className="fs-16 color-main mb-0">Coming Soon</p>
                        <h5 className="title mb-20">
                          Pillcoin Token Launch
                        </h5>{" "}
                      </div>
                      <div className="rm-photo">
                        <img src="/Avatar-Large.15.png" alt="" width="80" />
                      </div>
                    </div>
                    <p className="fs-18">
                      The community gains voting rights on the Play-to-Earn
                      games, NFTs, mini-movies, merchandise and events within
                      the community launchpad.
                    </p>
                  </div>
                  <div
                    className="box-time right mt-200"
                    data-aos="fade-up"
                    data-aos-offset={300}
                  >
                    <span
                      className="incomplete"
                      data-aos="zoom-in"
                      data-aos-offset={300}
                    >
                      <i className="fa fa-circle color2" />
                    </span>
                    <div className="rm-box">
                      <div className="rm-tite full-width">
                        <p className="fs-16 color-main mb-0">Coming Soon</p>
                        <h5 className="title mb-20">Play to Earn Game</h5>{" "}
                      </div>
                      <div className="rm-photo">
                        <img src="/Avatar-Large.14.png" alt="" width="80" />
                      </div>
                    </div>
                    <p className="fs-18">
                      The game will be available for free on iOS, Android and
                      web platforms for Crypto Pill holders as a play-to-earn
                      model with Pill Coins.
                    </p>
                  </div>
                  <div
                    className="box-time left mt--23"
                    data-aos="fade-right"
                    data-aos-offset={300}
                  >
                    <span
                      className="incomplete"
                      data-aos="zoom-in"
                      data-aos-offset={300}
                    >
                      <i className="fa fa-circle" />
                    </span>
                    <div className="rm-box">
                      <div className="rm-tite full-width">
                        <p className="fs-16 color-main mb-0">Coming Soon</p>
                        <h5 className="title mb-20">
                          Live Crypto Pill Exhibition
                        </h5>{" "}
                      </div>
                      <div className="rm-photo">
                        <img src="/Avatar-Large.19.png" alt="" width="80" />
                      </div>
                    </div>
                    <p className="fs-18">
                      From large prints and paintings, to video installations
                      and large sculptures, in various materials. Some really
                      elaborate, like the Crypto Pills sculptures, some even
                      incorporating robotics.
                    </p>
                  </div>
                  <div
                    className="box-time right mt-200"
                    data-aos="fade-up"
                    data-aos-offset={300}
                  >
                    <span
                      className="incomplete"
                      data-aos="zoom-in"
                      data-aos-offset={300}
                    >
                      <i className="fa fa-circle color2" />
                    </span>
                    <div className="rm-box">
                      <div className="rm-tite full-width">
                        <p className="fs-16 color-main mb-0">Coming Soon</p>
                        <h5 className="title mb-20">
                          Animated Mini-Movie Series
                        </h5>{" "}
                      </div>
                      <div className="rm-photo">
                        <img src="/Avatar-Large.13.png" alt="" width="80" />
                      </div>
                    </div>
                    <p className="fs-18">
                      We have already produced teasers for an animated movie /
                      TV series, and there will be a complete launch of 5
                      episodes written by Hollywood director Frank Coraci.
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
                  <div className="col-md-6 border-right">
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

        {/* Partners */}
        <section className="tf-section partners mt-200">
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
              <div className="col-12">
                <div className="icon-box bg-2" data-aos="fade-up">
                  <div className="content">
                    <a className="h4">Slim Shady Feat. Pillman Tour</a>
                    <br />
                    <br />
                    <p className="fs-21">
                      Eminem commissioned Pillman animations for his first{" "}
                      <br />
                      US &amp; European Tour for his incredible 2000 Anger
                      Management Tour
                    </p>
                    <a
                      href="https://www.techtimes.com/articles/264990/20210904/crypto-pills-nfts-offered-artist-who-created-pillman-character-used.htm"
                      className="btn-action style-2"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Read Article
                    </a>
                  </div>
                  <div
                    className="content"
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "281px",
                      alignItems: "flex-start!important",
                    }}
                  >
                    <iframe
                      width="500"
                      height="281"
                      src={`https://player.vimeo.com/video/575656466?title=0&byline=0&portrait=0`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                      style={{
                        width: "100%",
                        alignItems: "flex-start!important",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icon-box bg-2" data-aos="fade-up">
                  <div className="content center">
                    <img
                      src="/images/micha-portrait.webp"
                      alt=""
                      style={{
                        width: "100%",
                        maxWidth: "350px",
                        margin: "-30px 0 20px 0",
                      }}
                    />
                    <a className="h4">
                      In conversation with the pioneer of digital art
                    </a>
                    <p className="fs-18">
                      Micha Klein is considered the pioneer in digital art and
                      computer graphics since creating Pillman in 1992.
                    </p>
                    <a
                      href="https://ashadedviewonfashion.com/2021/04/20/in-conversation-with-the-digital-artist-micha-klein/"
                      className="btn-action style-2"
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
                    <img
                      src="/press.jpeg"
                      alt=""
                      style={{
                        width: "100%",
                        maxWidth: "350px",
                        margin: "-30px 0 20px 0",
                      }}
                    />
                    <a className="h4">International Space Station Launch</a>
                    <p className="fs-18">
                      There's a Pillman sent to the International Space Station
                      for 1 year, before moving to it's new home (to the moon
                      🚀).
                    </p>
                    <a
                      href="https://twitter.com/timman_d/status/1476634196735049733"
                      className="btn-action style-2"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Read Tweets
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icon-box bg-2" data-aos="fade-up">
                  <div className="content center">
                    <img
                      src="/nftnyc.jpeg"
                      alt=""
                      style={{
                        width: "100%",
                        maxWidth: "350px",
                        margin: "-30px 0 20px 0",
                      }}
                    />
                    <a className="h4">Digital Artist of the Year (2021)</a>
                    <p className="fs-18">
                      Micha Klein was chosen by the NFT community and cemented
                      his name down history as the first-ever winner for the
                      category.
                    </p>
                    <a
                      href="https://lawire.com/blockchain-creative-powerhouse-micha-klein-bags-first-ever-best-digital-nft-artist-award/"
                      className="btn-action style-2"
                      data-aos="fade-up"
                      data-aos-duration={1200}
                    >
                      Read Article
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <a
                href="/press"
                className="btn-action style-3"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                View All Press Articles
              </a>
              <br />
              <br />
              <br />
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
                    <h3
                      className="mb-13"
                      style={{ color: "white", marginTop: "20px" }}
                    >
                      Let's be Friends
                    </h3>
                    <p
                      className="fs-21 mb-7"
                      style={{ color: "white", marginBottom: "20px" }}
                    >
                      Join us on our journey to the moon.
                    </p>
                  </div>
                  <div
                    style={{
                      width: "300px",
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "20px 0",
                    }}
                  >
                    <Link
                      href="https://twitter.com/TheCryptoPills"
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

        <section
          style={{
            width: "70%",
            margin: "100px auto",
            color: "#999!important",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" component="p" align="center">
              Terms &amp; Conditions
            </Typography>
            <br />
            <br />
            <Typography variant="body2" component="p" align="center">
              Crypto Pills is a collection of Fine Art Digital Collectibles
              (NFTs) running on the Ethereum network. This website is only an
              interface allowing participants to purchase these digital
              collectibles. Users are entirely responsible for the safety and
              management of their own private Ethereum wallets and validating
              all transactions and contracts generated by this website before
              approval. Furthermore, as the Crypto Pills smart contract runs on
              the Ethereum network, there is no ability to undo, reverse, or
              restore any transactions. This website and its connected services
              are provided “as is” and “as available” without warranty of any
              kind. By using this website you are accepting sole responsibility
              for any an all transactions involving Crypto Pills digital
              collectibles. You, the owner, agree that you purchase our
              non-fungible token as a Fine Art Digital Collectible. Non-fungible
              tokens should not be seen as an investment. The Crypto-Pill is a
              Fine Art Digital Collectible to be used as an avatar, displayed on
              screens, or to be printed in any format on any medium for your
              personal use. The associated Digital Art is high resolution and
              suitable for large format prints. It's a non-fungible token for
              you to collect. You, the owner, understand that the monetary value
              of this Digital Art Asset is in the eye of the beholder, and
              determined by the market, and that it should be treated as a Fine
              Art Digital Collectible, purchased for it’s artistic and cultural
              values. You, the owner are entirely responsible for any tax
              liability which may arise from minting or reselling the
              Crypto-Pill non-fungible token. You, the owner, agree to waive any
              class action status, and any legal dispute around the project
              which you may choose to bring can only be done on an individual
              basis. The project is not targeted towards children. You agree
              that you are over the age of 18 when you purchase a Crypto-Pill,
              or above the legal age of your jurisdiction, whichever is greater.
            </Typography>
            <br />
            <br />
            <Typography variant="h4" component="p" align="center">
              Ownership
            </Typography>
            <br />
            <Typography variant="body2" component="p" align="center">
              <strong>
                1. You Own the NFT. Each Crypto-Pill is an NFT on the Ethereum
                blockchain.
              </strong>
              <br />
              When you purchase an NFT, you own the underlying Crypto-Pill; the
              High Resolution Digital Art, completely. Ownership of the NFT is
              mediated entirely by the Smart Contract and the Ethereum Network:
              at no point may we seize, freeze, or otherwise modify the
              ownership of any Crypto-Pill.
              <br />
              <strong>2. Personal Use.</strong> <br />
              Subject to your continued compliance with these Terms, Crypto
              Pills grants you a worldwide, royalty-free license to use, copy,
              display, and print out the purchased Art in any medium, solely for
              the following purposes: (<b>A</b>) for your own personal,
              non-commercial use; (<b>B</b>) as part of a marketplace that
              permits the purchase and sale of your Crypto-Pill / NFT, provided
              that the marketplace cryptographically verifies each Crypto Pills
              owner’s rights to display the Art for their Crypto-Pill to ensure
              that only the actual owner can display the Art; or (<b>C</b>) as
              part of a third party website or application that permits the
              inclusion, involvement, or participation of your Crypto-Pill,
              provided that the website/application cryptographically verifies
              each Crypto Pills owner’s rights to display the Art for their
              Crypto Pills, to ensure that only the actual owner can display the
              Art, and provided that the Art is no longer visible once the owner
              of the Crypto-Pill leaves the website/application.
              <br />
              <strong>3. Disclaimer</strong>
              <br />
              Crypto Pills have been designed by established pop artist Micha
              Klein, and represent a legit part of digital art history, and a
              recognized cultural value. After all, artwork featuring the
              Pillman character is featured in important international museum
              collections. Therefore we have explicitly chosen not to allow
              commercial use and derivatives, as to not undermine the value of
              the Digital Art Asset as a unique cultural artifact, created and
              authorized by the artist.
            </Typography>
          </Grid>
        </section>
      </>

      <Footer />
    </>
  );
}
