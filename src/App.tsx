import { useState } from "react";

import "./App.css";

function App() {
  const [color, setColor] = useState<string>("");

  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true });

    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
    });
  };

  return (
    <div className="cont">
      <h1>Change Background Color</h1>
      <div className="card">
        <input type="color" onChange={(e) => setColor(e.target.value)} />
        <button onClick={() => handleClick()}>Click me!</button>
      </div>
    </div>
  );
}

export default App;
