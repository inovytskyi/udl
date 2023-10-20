import Link from "next/link";
import { CardImage } from "./CardImage";

type Simulator = {
  name: string;
  image: string;
};
export default function SimView(props: { simulators: Simulator[] }) {
  return (
    <div className="m-4 flex grow flex-wrap gap-4">
      {props.simulators.map((item) => {
        return (
          <Link key={item.name} href={"/maps/" + item.name} scroll={false}>
            <CardImage image={item.image} name={item.name} />
          </Link>
        );
      })}
    </div>
  );
}
