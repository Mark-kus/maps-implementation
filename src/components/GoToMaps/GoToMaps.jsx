import "./GoToMaps.css"
import leave from "../../assets/leave.svg"

export default function GoToMaps() {

    const href = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
        "geo:37.786971,-122.399677;u=35" :
        "https://www.google.com/maps/dir/?api=1"

    return (
        <button className="go-to-maps">
            <a href={href} target="_blank">
                <img src={leave} alt="go to maps button image" />
            </a>
        </button>
    )
}