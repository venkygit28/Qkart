import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Button } from "@mui/material";
import { debounce } from "@mui/material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Cart, {generateCartItemsFrom}  from "./Cart";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";


/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */

  const username=localStorage.getItem("username");
  const token=localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();

   const [cartItems,setcartItems] =useState([]);
   const [cartData,setcartData]=useState([]);
   const [loading,setLoad] =useState(false);
   const [debounceTimeout, setDebounceTimeout] = useState(0);
    const [data,setData] =useState([])

   useEffect(()=>{
      performAPICall()
   },[])

  const performAPICall = () => {
    setLoad(true);
      axios.get(`${config.endpoint}/products`)
      .then(async(res)=>{
        // console.log("Products Received")
        //console.log(res.data);
        setData(res.data);
        let fc = await fetchCart(token);
        // console.log("generate",generateCartItemsFrom(fc,res.data))
        setcartData(generateCartItemsFrom(fc,res.data));
        setLoad(false)
      })
      .catch(err=>{
        console.log(err)
          setLoad(false)
      })
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = (text) => {
    
    axios.get(`${config.endpoint}/products/search?value=${text}`)
    .then(res=>{
      // console.log(res.data)
      setData(res.data)
    })
    .catch(err=>{
      setData([])
      console.log("Error");
    })

  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event,debounceTimeout) => {
    clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(() => performSearch(event.target.value), 500);
    setDebounceTimeout(newTimeout);
  };


/** * Perform the API call to fetch the user's cart and return the response 
 * * * @param {string} token - Authentication token returned on login *
 *  * @returns { Array.<{ productId: string, qty: number }> | null } 
 * * The response JSON object * * Example for successful response from backend: 
 * * HTTP 200 * [ 
 * * { 
     * "productId": "KCRwjF7lN97HnEaY", * "qty": 3 * }, 
 * * { * "productId": "BW0jAAeDJmlZCF8i", * "qty": 1 * } 
 * * ] 
 * *
 *  * Example for failed response from backend: 
 * * HTTP 401 * { * "success": false, * "message": "Protected route, Oauth2 Bearer token not found" * } 
 * */

  const fetchCart = async(token) => { 

    // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      try{
        const res=await axios.get(`${config.endpoint}/cart`, { headers: { 'Authorization': `Bearer ${token}` } })
          // console.log("success",res)
          //console.log(token)
          setcartItems(res.data);
          return res.data
      }
      catch(err){
        console.log("error")
      }


      }; 



    // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart 
    /** * Return if a product already is present in the cart * *
     *  @param { Array.<{ productId: String, quantity: Number }> } items 
     * * Array of objects with productId and quantity of products in cart 
     * * @param { String } productId * Id of a product to be checked * *
     *  @returns { Boolean } * Whether a product of given "productId" exists in the "items" array
     *  * */ 
    const isItemInCart = (items, productId) => {
      let flag=false;
      items.forEach(e=>{
        if(e.productId===productId)
         flag=true;
      })
      console.log(flag);
      return flag

     }; 
    
    /** * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart *
     *  * @param {string} token * Authentication token returned on login
     *  * @param { Array.<{ productId: String, quantity: Number }> } items 
     * * Array of objects with productId and quantity of products in cart 
     * * @param { Array.<Product> } products * Array of objects with complete data on all available products
     *  * @param {string} productId * ID of the product that is to be added or updated in cart 
     * * @param {number} qty * How many of the product should be in the cart 
     * * @param {boolean} options * If this function was triggered from the product card's "Add to Cart" button * * Example for successful response from backend: * HTTP 200 - Updated list of cart items * [ * { * "productId": "KCRwjF7lN97HnEaY", * "qty": 3 * }, * { * "productId": "BW0jAAeDJmlZCF8i", * "qty": 1 * } * ] * * Example for failed response from backend: * HTTP 404 - On invalid productId * { * "success": false, * "message": "Product doesn't exist" * } */
    
    const addToCart = async ( token, items, products, productId, qty, options = { preventDuplicate: false } ) => { 

      if(username)
      {
        if (options.preventDuplicate){
          if( isItemInCart(items,productId)){
            enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.",{variant:'warning'})
            return;
        }
      }
        try{
          const res=await axios.post(`${config.endpoint}/cart`,{"productId":productId,"qty":qty}, { headers: { 'Authorization': `Bearer ${token}` } })
          setcartData(generateCartItemsFrom(res.data,products))
        }
          catch(err){
            console.log("error")
          }
        }
       
      else
      {
        enqueueSnackbar("Login to add an item to the Cart",{variant:'warning'})

      }
      

    };




  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        
        <TextField
        className="search-desktop"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e)=>
          debounceSearch(e,debounceTimeout)
        }
      />
      
      </Header>
      
      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e)=>
          debounceSearch(e,debounceTimeout)
        }
      />

      <div className="cart-flex">
      
      <Grid>
        <Grid container spacing={3}>
          <Grid item  className="product-grid" >
            <Box className="hero">
              <p className="hero-heading">
                India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                to your door step
              </p>
            </Box>
            
          </Grid>
          
          
        </Grid>

        <Grid container spacing={2}>
        { loading ? (
                <Box className="loading">
                <CircularProgress/>
                <p>Loading Products</p>
                </Box>
              ) : ( 
                data.length!==0 ?
                (data.map((element)=>
                  <Grid item xs={6} md={3}>
                  <ProductCard element={element} handleAddToCart={addToCart} cartItems={cartItems} data={data}/>
                  </Grid>)) 
                :
                (
                  <Box className="loading">
                  <SentimentDissatisfied />
                  <p>No products found</p>
                  </Box>
                )
                )
        }

        
        </Grid>
       </Grid>
       

      {username ? (
        <Grid container>
            <Grid >
              {/* {console.log(cartData)} */}
              <Cart products={data} items={cartData} handleQuantity={addToCart} />
            </Grid>
        </Grid>
       ) : (
        <></>
       )}
       
   </div>
       
      
       
      <Footer />
    </div>
  );
};

export default Products;