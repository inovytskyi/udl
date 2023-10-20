import SimView from "./_components/SimView";
import { loadSimulators } from "./_service/loadHelper";

export default function Simulators() {
  const simulators = loadSimulators();
  if (simulators) return <SimView simulators={simulators} />;
  else return null;
}
