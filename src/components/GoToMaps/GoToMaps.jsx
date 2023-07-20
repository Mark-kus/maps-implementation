import "./GoToMaps.css"
import leave from "../../assets/leave.svg"

export default function GoToMaps({ center, zoom }) {

    const href = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
        `geo:${center.lat},${center.lng}?z=${zoom}` :
        `https://www.google.com/maps/@${center.lat},${center.lng},${zoom}z`
        // NOTE: Docs says it MUST have ?api=1 on https response, but with it, it doesn't works as I want

        return (
        <button className="go-to-maps">
            <a href={href} target="_blank">
                <img src={leave} alt="go to maps button image" />
            </a>
        </button>
    )
}