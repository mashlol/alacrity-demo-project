import { useEffect, useState } from "react";
import { InGameUI } from "./InGameUI";
import { Settings } from "./Settings";
import { MainMenu } from "./MainMenu";

export default function App() {
  const [inSettings, setInSettings] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const listener = (event) => {
      if (event.detail instanceof ArrayBuffer) {
        const view = new DataView(event.detail);
        setScore(view.getInt32(0));
      }
    };

    window.addEventListener("unitydata", listener);

    return () => window.removeEventListener("unitydata", listener);
  }, []);

  if (inGame) {
    return (
      <InGameUI
        score={score}
        onExit={() => {
          setInGame(false);
          sendToUnity("stop");
        }}
      />
    );
  }

  if (inSettings) {
    return <Settings onBack={() => setInSettings(false)} />;
  }

  return (
    <MainMenu
      onSettings={() => setInSettings(true)}
      onStart={() => setInGame(true)}
    />
  );
}
