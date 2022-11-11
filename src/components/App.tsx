import React, {useEffect, useState} from 'react';
// import {Wrapper, WrapperProps, Status} from "@googlemaps/react-wrapper";
import '../style/App.scss'
import Home from "./Home";
import Nav from "./Nav";


function App() {
    return (
        <div className="App">
            {/*<Wrapper apiKey={"AIzaSyAqFQHTKPaDl4zftjwNBz_Jfant1f0K_RI"} render={render}>*/}
            <Nav/>
            <Home/>
            {/*</Wrapper>*/}
        </div>
    );
}

export default App;
