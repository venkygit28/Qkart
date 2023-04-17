import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ element, handleAddToCart, cartItems, data }) => {
  // console.log(element)
      let token=localStorage.getItem("token");
      return (
      <Card className="card"  key={element._id} >
      <CardMedia component={"img"} sx={{ height:200 }} image={element.image}/>
      <CardContent>
        <Typography  variant="text">
          {element.name}
        </Typography>
        <br/>
        <Typography  variant="subtitle2">
          ${element.cost}
        </Typography>
        <Rating name="read-only" value={element.rating} readOnly /><br/>
        <CardActions className="card-actions">
        <Button className="card-button" variant="contained" onClick={()=>handleAddToCart(token,cartItems,data,element._id,1,{preventDuplicate:true})}>add to cart</Button>
        </CardActions>
      </CardContent>
    </Card>)
    
    
  
};

export default ProductCard;
