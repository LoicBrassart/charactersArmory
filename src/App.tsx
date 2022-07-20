import Dd5SheetDisplay from "./components/Dd5SheetDisplay";
import { iDd5Sheet } from "./entities/Dd5Sheet";

function App() {
  const drizzt: iDd5Sheet = {
    str: 12,
    dex: 20,
    con: 11,
    int: 12,
    wis: 17,
    cha: 8,
  };
  return (
    <div>
      <Dd5SheetDisplay data={drizzt} />
    </div>
  );
}

export default App;
