import React, {useState} from 'react';

const RouteInput = () => {
    const [ state, setState ] = useState({ origin:"", destination:"" })

    const handleSubmit = () => {

    }

    return <div className="routeFormWrapper">
                <h2>Route Plan</h2>

                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="origin">
                            <label htmlFor="origin">Origin</label>
                            <input type="text" id="origin"
                                   required
                                   value={state.origin}
                                   onChange={(e => setState({...state, origin: e.target.value}))}
                            />
                        </div>
                        <div className="destination">
                            <label htmlFor="password">Destination</label>

                            <input type="text" id="destination"
                                   required
                                   value={state.destination}
                                   onChange={(e => setState({...state, destination: e.target.value}))}
                            />
                        </div>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Search Route</button>
                </form>
            </div>
};

export default RouteInput;
