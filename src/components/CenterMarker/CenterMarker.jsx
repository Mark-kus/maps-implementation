import "./CenterMarker.css"

export default function CenterMarker({ size }) {

    let top, left;

    switch (size) {
        case "small":
            top = 55
            left = 75
            break;

        case "horizontal":
            top = 55
            left = 175
            break;

        case "vertical":
            top = 155
            left = 75
            break;

        case "large":
        default:
            top = 155
            left = 175
            break;
    }

    return (
        <div className="center-marker" style={{ top: `${top}px`, left: `${left}px` }}>
            <img
                src="https://developers.google.com/static/maps/documentation/javascript/images/default-marker.png?hl=es"
                width={26}
                height={38}
                alt="Marker at the center of the map" />
        </div>
    )
}