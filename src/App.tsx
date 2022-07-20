import CharacterDisplay from "./components/CharacterDisplay";
import { iCharacter } from "./entities/Character";

function App() {
  const drizzt = {
    str: 12,
    dex: 20,
    con: 11,
    int: 12,
    wis: 17,
    cha: 8,
  };
  return (
    <div>
      <CharacterDisplay data={drizzt} />
    </div>
  );
}

export default App;
