import "./Loader.css"
import loader from "../../assets/loader.svg"

export default function Loader() {
    return (
        <>
            <div className="loading-ring">
                <img src={loader} alt="" />
            </div>
        </>
    )
}