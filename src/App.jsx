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
  if (!isLoaded) return <div className="map-replacement"><Loader /></div>
  
  return <Map />
}

export default App
