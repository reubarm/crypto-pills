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
        backgroundImage:  "linear-gradient(rgba(114, 32, 156, 0.9), rgba(76, 19, 102, 0.7)), url(/background.png)",
        backgroundSize: "cover",
        height: 600,
        padding: "10rem",
        textAlign: "center",
        '@media (max-width: 875px)': {
          padding: '7rem 1rem',
        },
      },
      title: {
        color: "#fff",
        fontSize: "3.5rem",
        '@media (max-width: 875px)': {
          fontSize: "2.5rem",
          margin: '15px'
        },
      },
      subtitle: {
        color: "#fff",
        fontSize: "1.2rem",
        maxWidth: "700px",
        margin: "0 auto",
        '@media (max-width: 875px)': {
          fontSize: "1rem",
        },
      },
      introTitle: {
        color: "#4e3b5d",
        letterSpacing: "-1px",
      },
      introSubtitle: {
        color: "#333",
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
        backgroundColor: "#8e4bbf",
        color: "#FFF",
        "&:hover": {
          backgroundColor: "#873fbd",
        },
        '@media (max-width: 520px)': {
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
        backgroundColor: "#9a47c1",
        color: "#FFF",
        "&:hover": {
          backgroundColor: "#883eab",
        },
        '@media (max-width: 520px)': {
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
        backgroundColor: "#b568de",
        color: "#FFF",
        "&:hover": {
          backgroundColor: "#a760cc",
        },
        '@media (max-width: 520px)': {
          margin: "1.5rem 0",
        },
      },
      artworkSection: {
        background: "rgb(244, 246, 248)",
        borderRadius: "30px",
        padding: "2rem 10rem",
        // margin: "2rem auto 3rem",
        '@media (max-width: 900px)': {
          padding: "2.5rem",
        },
      },
      aboutMicha: {
        margin: "0 auto",
        background: `linear-gradient(135deg,
          #000 30%,
          #333 100%)`,
        width: "100%",
        borderRadius: "30px",
        color: "#fff!important",
        padding: "3rem",
        textAlign: "left",
        '@media (max-width: 900px)': {
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
        padding: "5rem 0!important",
        textAlign: "left",
        '@media (max-width: 1350px)': {
          padding: '3rem!important',
        },
        '@media (max-width: 960px)': {
          textAlign: 'center'
        },
      },
      nftsGridCell: {
        background: `linear-gradient(135deg,
          #8b488c 0%,
          #692a97 100%)`,
        margin: "3rem auto",
        textAlign: "center",
        borderRadius: "30px",
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
        background: "rgb(244, 246, 248)",
        margin: "0 0 2rem",
        padding: "1rem 2rem",
        borderRadius: "30px",
        width: "90%",
        height: "250px",
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
        borderRadius: "30px",
        background: `linear-gradient(135deg,
          #000 30%,
          #692a97 100%)`,
        display: "flex",
        paddingBottom: 0,
        alignItems: "center",
        '@media (max-width: 960px)': {
          textAlign: 'center'
        },
      },
  }));
  

  export default useStyles;