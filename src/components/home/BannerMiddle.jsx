import { Grid, styled } from "@mui/material";
import React from "react";
import { BannerMiddle_imgUrl } from "../../constants/data";

const Wraper = styled(Grid)`
  margin-top: 10px;
  justify-content: space-between;
`;

const Image = styled("img")(({ theme }) => ({
  marginTop: 10,
  marginBottom:"2em",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    objectFit: "cover",
    height: 100,
  },
}));

const BannerMiddle = () => {
  const url = 
    "https://miamigardensflorist.com/pub/media/revslider/valentine.jpg";
  return (
    <>
      <Wraper lg={12} sm={12} md={12} container>
        {BannerMiddle_imgUrl.map((image) => (
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <img src={image} alt="" style={{ width: "100%" }} />
          </Grid>
        ))}
      </Wraper>
      <Image src={url} alt="img" />
    </>
  );
};

export default BannerMiddle;
