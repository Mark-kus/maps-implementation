import "./FindMe.css"
import marker from "../../assets/marker.svg"

export default function FindMe() {

    const findUser = ({ movePlace }) => {
        // Asks permission to get user's location and moves to it
        navigator.geolocation.getCurrentPosition(
            (e) => {
                movePlace({ lat: e.coords.latitude, lng: e.coords.longitude })
            },
            (err) => {
                console.log(err);
            })
    }

    return (
        <button className="find-button" onClick={findUser}>
            <img src={marker} alt="" />
        </button>
    )
}