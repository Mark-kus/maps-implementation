import { useLoadScript } from "@react-google-maps/api"
import Map from "./components/Map/Map"
import Loader from "./components/Loader/Loader"

const { VITE_API_KEY } = import.meta.env

const libraries = ["places"]

function App() {
  // Loads the script for the google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_API_KEY,
    libraries: libraries
  })

  // While loading, shows a Loader
  // if (!isLoaded) return <div className="map-replacement"><Loader /></div>
  if (!isLoaded) return null;

  return (
    <div className="container">

      <div className="group-container">
        {/* Map with size 190x190 */}
        <Map size="small" />

        {/* Map with size 390x190 */}
        <Map size="horizontal" />
      </div>

      <div className="group-container">
        {/* Map with size 190x390 */}
        <Map size="vertical" />

        {/* Map with size 390x390 */}
        <Map size="large" />
      </div>

    </div>
  )
}

export default App
