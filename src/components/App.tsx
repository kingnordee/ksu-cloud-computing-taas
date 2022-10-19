import React, {useEffect, useState} from 'react';
import {Wrapper, WrapperProps, Status} from "@googlemaps/react-wrapper";
import '../style/App.scss'
import Home from "./Home";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

function App() {
    return (
        <div className="App">
            {/*<Wrapper apiKey={"AIzaSyAqFQHTKPaDl4zftjwNBz_Jfant1f0K_RI"} render={render}>*/}
                <Home/>
            {/*</Wrapper>*/}
        </div>
    );
}

export default App;
