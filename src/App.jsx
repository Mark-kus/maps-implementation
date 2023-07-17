import { useLoadScript } from "@react-google-maps/api"
import Map from "./components/Map/Map"

const { VITE_API_KEY } = import.meta.env

function App() {
  // Loads the script for the google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_API_KEY,
    libraries: ["places"]
  })

  // While loading, shows something else
  if (!isLoaded) return <div>Loading</div>
  
  return <Map />
}

export default App
