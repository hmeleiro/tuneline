import React from "react";
import { Navigate } from "react-router-dom";

export default function Nav(){

  return(
        <div className="flex w-screen min-h-[10vh] justify-around align-middle">
          <div>Shopio</div>
           <ul>
              <Navigate to="/">Home</Navigate>
              <Navigate to="/about">About</Navigate>
              <Navigate to="/shop">Shop</Navigate>
           </ul>
        </div>
  );

}