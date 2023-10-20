import CardList from "./_components/CardLIst";
import { loadSimulators } from "./_service/loadHelper";

export default function Simulators() {
  const simulators = loadSimulators();
  if (simulators) return <CardList data={simulators} path={"/maps/"} />;
  else return null;
}
