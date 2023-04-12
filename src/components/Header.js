import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { createBrowserHistory } from "history";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
const Header = ({ children, hasHiddenAuthButtons }) => {
  
  const username=localStorage.getItem("username");
  const history=useHistory();
  return (
    <Box className="header">
      <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>

      {/* {console.log(hasHiddenAuthButtons)} */}
      {children}

      { username ? (
        
        <Box display="flex" alignItems="center">
            <img src="avatar.png" alt={username}/>
            {username}
          <Button
            className="explore-button"
            variant="text"
            onClick={()=>{
              localStorage.clear();
              history.push("/")
              }}>
             Logout
          </Button>
        </Box>
      ): (
        hasHiddenAuthButtons ? (
        <Box >
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={()=>{history.push("/")}}>
             Back to explore
          </Button>
          
        </Box>
      )
      :
      (
        <Box>
          <Button className="explore-button" onClick={()=>{history.push("/login")}}> 
              Login 
          </Button>
          <Button variant="contained" 
                onClick={()=>{history.push("/register")}}>
            Register
          </Button>
        </Box>
      ) )
}
      
    </Box>
  );
};

export default Header;
// const Header = ({ children, hasHiddenAuthButtons }) => {

//   const username = localStorage.getItem("username")
//   const history = useHistory();
//     return (

//       <Box className="header">
//         <Box className="header-title">
//             <img src="logo_light.svg" alt="QKart-icon"></img>
//         </Box>
        
//       {children}
//       username?  (<Box display="flex" alignItems="center">
//               <img src="avatar.png" alt={username}/>
           
//               {username}
//             <Button
//               className="explore-button"
//               variant="text"
//               onClick={()=>{
//                 localStorage.clear();
//                 history.push("/")
//                 }}>
//                Logout
//             </Button>
//           </Box>
//         ): (
//         hasHiddenAuthButtons ? (
//             <Button
//             className="explore-button"
//             startIcon={<ArrowBackIcon />}
//             variant="text"
//             onClick={()=>{history.push("/")}}
//           >
//             Back to explore
//           </Button>
//         ):(
//           <Box>
//           <Button  onClick={()=>{
//             history.push("/login")
//           }}>Login
//           </Button>
//           <Button  variant="contained" onClick={()=>{
//             history.push("/register")
//           }}>Register
//           </Button>
//         </Box>
//         ))
       
//       </Box>
//     );
// };

// export default Header;
