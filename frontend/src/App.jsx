import { useState } from "react";
import Navbar from "./components/Navbar";
import EventForm from "./components/EventForm";

function App() {
  const [assets, setAssets] = useState(null);

  return (
    <div>
      <Navbar />
      <EventForm onGenerate={setAssets} />
    </div>
  );
}

export default App;