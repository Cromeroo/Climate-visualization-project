import React from "react";
import Tiempo from "../Mapa/tiempo2";
import Tiempo2 from "../Mapa/tiempo";

import Drawer from "../components/drawer";
import Drawert from "../components/drawert";

function HomePage() {
  return (
    <div>
      <div className="p-1 border rounded cont1">
        <Tiempo style={{ width: "500px" }} />
      </div>
      <div style={{ padding: "20px" }}>
        <Drawert />
      </div>
    </div>
  );
}

export default HomePage;
