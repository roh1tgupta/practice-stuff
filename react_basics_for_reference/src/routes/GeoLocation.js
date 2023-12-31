import React from 'react';

const geoLocation = navigator.geolocation;
export default function Geolocation() {
    const [pos, setPos] = React.useState();
    const [track, setTrack] = React.useState();
    const ref = React.useRef();
    const getCurentPos = () => {
        console.log("clicked get current pos")
        geoLocation.getCurrentPosition((position) => {
            console.log("clicked get current pos 11", position)
            setPos({ lat: position.coords.latitude, long: position.coords.longitude});
          });   
    };

    const trackLocation = () => {
        const watchID = geoLocation.watchPosition((position) => {
            console.log(position, "...wathc postions..")
            setTrack({ lat: position.coords.latitude, long: position.coords.longitude });
          });
        ref.current = watchID;
    };

    const stopTracking = () => {
        geoLocation.clearWatch(ref.current);
        setTrack();
    }
    return geoLocation ? (<div>
        <button onClick={getCurentPos}>Get currrent Position</button>
        hello from geo
        { pos && <div> current position is : {pos.lat} and {pos.long} </div>}

        <button onClick={trackLocation}>track location</button>
        {track && <div>track location is : {track.lat} and {track.long} <div> <button onClick={stopTracking}>stop tracking</button></div></div>}

    </div>) : <div>geo location not supported.</div>;
}