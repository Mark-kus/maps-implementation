import "./CenterMarker.css"

export default function CenterMarker() {

    return (
        <div className="center-marker">
            <img
                src="https://maps.google.com/mapfiles/kml/paddle/red-circle.png"
                width={40}
                height={40}
                alt="Market at the center of the map" />
        </div>
    )
}