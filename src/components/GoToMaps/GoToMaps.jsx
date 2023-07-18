import "./GoToMaps.css"

export default function GoToMaps() {

    const href = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
        "geo:37.786971,-122.399677;u=35" :
        "https://www.google.com/maps/dir/?api=1"

        console.log(href);

    return (
        <button className="go-to-maps"><a href={href} target="_blank">Open Maps</a></button>
    )
}