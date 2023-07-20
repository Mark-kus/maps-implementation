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
                src="https://maps.google.com/mapfiles/kml/paddle/red-circle.png"
                width={40}
                height={40}
                alt="Marker at the center of the map" />
        </div>
    )
}