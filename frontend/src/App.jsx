import { useState } from "react";
import Navbar from "./components/Navbar";
import EventForm from "./components/EventForm";
import GeneratedAssets from "./components/GeneratedAssets";

function App() {
  const [assets, setAssets] = useState(null);

  console.log("ASSETS:", assets);   // add this

  return (
    <div>
      <Navbar />
      <EventForm onGenerate={setAssets} />
      {assets && <GeneratedAssets assets={assets} />}
    </div>
  );
}

export default App;