import React from 'react'
import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme"

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
      <React.StrictMode> 
        <ThemeProvider theme={theme}>
        <Switch>
         <Route exact path="/" component={Products} />
         <Route path="/login" component={Login} />
         <Route path="/register" component={Register} />
       </Switch>
      
          {/* <Register /> */}
          {/* <Login/> */}
          </ThemeProvider>
          </React.StrictMode>
    </div>
  );
}

export default App;
