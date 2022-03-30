import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
  },
  headerLink: {
    margin: theme.spacing(1, 2),
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    color: "#555",
    letterSpacing: "-0.5px",
    "&:hover": {
      textDecoration: "none",
      color: "#000",
    },
  },
  bannerSection: {
    marginTop: "50px",
    position: "relative",
    backgroundImage: "url(/background.png)",
    // backgroundImage:  "linear-gradient(rgba(114, 32, 156, 0.9), rgba(76, 19, 102, 0.7)), url(/background.png)",
    backgroundSize: "cover",
    height: 600,
    padding: "8rem 20rem",
    textAlign: "center",
    "@media (max-width: 1420px)": {
      padding: "7rem 12rem",
    },
    "@media (max-width: 1100px)": {
      padding: "7rem",
    },
    "@media (max-width: 875px)": {
      padding: "3rem 1rem",
    },
  },
  titleContainer: {
    background: "#eef9fa",
    maxWidth: "900px",
    padding: "2rem",
    margin: "0 auto",
    borderRadius: "20px",
  },
  title: {
    color: "#1D3557",
    fontSize: "3.5rem",
    "@media (max-width: 875px)": {
      fontSize: "2.5rem",
      margin: "15px",
    },
  },
  subtitle: {
    color: "#1D3557",
    fontSize: "1.2rem",
    maxWidth: "700px",
    margin: "0 auto",
    "@media (max-width: 875px)": {
      fontSize: "1rem",
    },
  },
  introTitle: {
    color: "#1D3557",
    letterSpacing: "-1px",
  },
  introSubtitle: {
    color: "#1D3557",
  },
  nftTitle: {
    color: "#FFF",
    fontWeight: "700!important",
    letterSpacing: "-1px",
  },
  openSea: {
    fontSize: "1rem",
    fontWeight: "700",
    letterSpacing: "0",
    textTransform: "none",
    borderRadius: "10",
    margin: "3rem 1rem 0 0",
    minWidth: "250px",
    minHeight: "50px",
    backgroundColor: "#1D3557",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#1D3557",
    },
    "@media (max-width: 520px)": {
      margin: "2rem 0 0",
    },
  },
  cta: {
    fontSize: "1rem",
    fontWeight: "700",
    letterSpacing: "0",
    textTransform: "none",
    borderRadius: "10",
    margin: "3rem 1rem 0 0",
    minWidth: "250px",
    minHeight: "50px",
    backgroundColor: "#1D3557",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#1D3557",
    },
    "@media (max-width: 520px)": {
      margin: "2rem 0 0",
    },
  },
  playGame: {
    fontSize: "1rem",
    fontWeight: "700",
    letterSpacing: "0",
    textTransform: "none",
    borderRadius: "10",
    margin: "3rem 1rem 0 0",
    minWidth: "250px",
    minHeight: "50px",
    backgroundColor: "#457B9D",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#457B9D",
    },
    "@media (max-width: 520px)": {
      margin: "1.5rem 0",
    },
  },
  artworkSection: {
    background: "#eef9fa",
    borderRadius: "20px",
    padding: "2rem 10rem",
    // margin: "2rem auto 3rem",
    "@media (max-width: 900px)": {
      padding: "2.5rem",
    },
  },
  aboutMicha: {
    margin: "0 auto",
    background: "#eef9fa",
    width: "100%",
    borderRadius: "20px",
    color: "#333!important",
    padding: "3rem",
    textAlign: "left",
    "@media (max-width: 900px)": {
      textAlign: "center!important",
    },
  },
  detailSection: {
    padding: "2rem 0",
  },
  detailSectionImage: {
    width: "90%",
    objectFit: "contain",
  },
  introSectionGridCell: {
    padding: "3rem 0!important",
    textAlign: "center",
    "@media (max-width: 1350px)": {
      padding: "3rem!important",
    },
    "@media (max-width: 960px)": {
      textAlign: "center",
    },
  },
  nftsGridCell: {
    background: `linear-gradient(135deg,
          #8b488c 0%,
          #457B9D 100%)`,
    margin: "3rem auto",
    textAlign: "center",
    borderRadius: "20px",
    padding: "2rem 0 1rem!important",
  },
  detailSectionGridCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "4rem 0",
  },
  detailSectionImageCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "4rem 0",
  },
  roadmap: {
    margin: "3rem auto 2rem",
  },
  roadmapGridCell: {
    background: "#d3e6e8",
    margin: "0",
    padding: "1rem 2rem",
    borderRadius: "20px",
    width: "100%",
    height: "250px",
    color: "#1D3557!important",
  },

  youtube: {
    overflow: "hidden",
    paddingBottom: "56.25%",
    position: "relative",
    height: "0",
    width: "100%",
  },
  youtubeIFrame: {
    left: "0",
    top: "0",
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: "20px",
  },
  bulletList: {
    marginBlockStart: "0",
    marginBlockEnd: "0",
    paddingInlineStart: "1rem",
  },
  contentStyle: {
    minHeight: "500px",
    margin: "3rem auto",
    overflow: "hidden",
    padding: "50px",
    borderRadius: "20px",
    background: `linear-gradient(135deg,
          #000 30%,
          #457B9D 100%)`,
    display: "flex",
    paddingBottom: 0,
    alignItems: "center",
    "@media (max-width: 960px)": {
      textAlign: "center",
    },
  },

  wrapper: {
    marginTop: "60px",
    position: "relative",
    height: "800px",
    width: "1400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // overflow: "hidden",
  },
  frame: {
    height: "800px",
    width: "100%",
    overflow: "hidden",
    borderRadius: "30px",
  },
  boxcontainer: { display: "flex" },
  box: {
    background: "#457B9D",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "800px",
  },
  button2container: {
    display: "flex",
    marginTop: "0",
  },
  button2: {
    width: "15px",
    height: "15px",
    borderRadius: "15px",
    background: "#E0E0E0",
    margin: "6px",
    cursor: "pointer",
  },
  active: { background: "#999" },
}));

export default useStyles;
