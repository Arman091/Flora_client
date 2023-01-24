import React from "react";

import "react-multi-carousel/lib/styles.css";
import { Box, Button, styled, Divider, Typography, Grid } from "@mui/material";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";



const Products = styled(Box)`
  margin-top: 10px;
  color:black;
  
`;

const DealOfTheDayAndTimer = styled(Box)`
  padding: 15px 20px;
  display: flex;
  background-color:#FEFFEC;
  height:80px;
  align-items: center;
  font-family: cursive;
`;

const Timer = styled(Box)`
  display: flex;
  align-items: center;
  color: #7f7f7f;
`;

const DealOfTheDay = styled(Typography)`
  font-size: 22px;
  font-weight: 500;
  margin-right: 25px;
  line-height: 34px;
  font-family: cursive;
`;

const ViewAllButton = styled(Button)`
  margin-left: auto;
  background-color: blue;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
`;

const Image = styled("img")`
  height: 250px;
  width: "auto";
`;

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 6px;
`;

const ProductComponent = ({ products, title, timer }) => {
  const countdown_URL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <Box variant="span" style={{color:"#51875f", 'fontSize':"1.2em"}}>
        {hours}:{minutes}:{seconds} OFFER ENDS IN
      </Box>
    );
  };

  return (
    
    <Products >

      <DealOfTheDayAndTimer>
          <DealOfTheDay>{title}</DealOfTheDay>
        {timer && (
          <Timer>
            <img
              src={countdown_URL}
              alt="timer"
              style={{ width: 25, paddingRight: 10 }}
              />
            <Countdown date={Date.now() + 12788734} renderer={renderer} />
          </Timer>
        )}
        <ViewAllButton variant="contained"> View All</ViewAllButton>
      </DealOfTheDayAndTimer>
      <Divider />
        
        
      <Grid container spacing={"2px"} bgcolor="white" m={"auto"} p={2} width={"95%"}>
        {products.map((product) => (
            <Grid item bgcolor='#fbf5e4' md={3.97} xs={12} m={0.2} className="mygrid" key={product.id}>
            <Link to={`product/${product.id}`}>
              <Box textAlign="center" style={{ padding: "25px 15px" }}>
                <Image src={product.url} alt="product" className="productpic" />
                <Text style={{ fontWeight: 600, color: "#33b8a9", 'fontFamily': "cursive" }}>
                  {product.title.shortTitle}
                </Text>
                <Text style={{ color: "black" }}>{product.discount}</Text>
                <Text style={{ color: "#51875f" }}>{product.tagline}</Text>
              </Box>
            </Link>
            </Grid>
          ))}
        </Grid>
      </Products>
    
    
  );
};

export default ProductComponent;
