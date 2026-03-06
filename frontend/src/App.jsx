import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import EventForm from "./components/EventForm";
import GeneratedAssets from "./components/GeneratedAssets";

function App() {
  const [assets, setAssets] = useState(null);
  const resultsRef = useRef(null);

  // Auto-scroll to results when assets are generated
  useEffect(() => {
    if (assets && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [assets]);

  return (
    <div className="container">
      <Navbar />
      <EventForm onGenerate={setAssets} />

      <div ref={resultsRef}>
        {assets && <GeneratedAssets assets={assets} />}
      </div>
    </div>
  );
}

export default App;