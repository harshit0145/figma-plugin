import { PLUGIN } from "@common/networkSides";
import { UI_CHANNEL } from "@ui/app.network";
import { Networker, NetworkError } from "monorepo-networker";
import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import Stage from "./screens/Stage";
import KpiCategory from "./screens/KpiCategory";
import Goal from "./screens/Goal";
import Money from "./screens/Money";
import BusinessType from "./screens/BusinessType";
import AI from "./screens/AI";
import BrowseKPIs from "./screens/BrowseKPIs";
import LoadingScreen from "./screens/LoadingScreen"; // Ensure this file exists
import RecommendedKpisScreen from "./screens/RecommendedKpisScreen"; // Ensure this file exists

import "@ui/styles/main.scss";

// Update View type to include "loading"
type View = "home" | "kpi" | "stage" | "goal" | "money" | "business" | "ai" | "browse" | "recommendedKpis" | "loading";

function App() {
  const [view, setView] = useState<View>("home");

  // Handle Figma messages for navigation
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data.pluginMessage;
      if (msg && msg.type === "navigate") {
        setView(msg.view as View);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    UI_CHANNEL.subscribe("ping", () => {
      // No action needed if not used
    });
  }, []);

  return (
    <div>
      {/* Conditional rendering */}
      {view === "home" && <HomeScreen goTo={(v: View) => setView(v)} />}
      {view === "kpi" && <KpiCategory goTo={(v: View) => setView(v)} />}
      {view === "stage" && <Stage goTo={(v: View) => setView(v)} />}
      {view === "goal" && <Goal goTo={(v: View) => setView(v)} />}
      {view === "money" && <Money goTo={(v: View) => setView(v)} />}
      {view === "business" && <BusinessType goTo={(v: View) => setView(v)} />}
      {view === "ai" && <AI goTo={(v: View) => setView(v)} />}
      {view === "browse" && <BrowseKPIs goTo={(v: View) => setView(v)} />}
      {view === "loading" && <LoadingScreen onComplete={() => setView("recommendedKpis")} />} {/* LoadingScreen with callback */}
      {view === "recommendedKpis" && <RecommendedKpisScreen goTo={(v: View) => setView(v)} />} {/* RecommendedKpisScreen */}
    </div>
  );
}

export default App;