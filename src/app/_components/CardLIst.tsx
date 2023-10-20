import Link from "next/link";
import { CardImage } from "./CardImage";

type Data = {
  name: string;
  image: string;
};
export default function CardList(props: { data: Data[]; path: string }) {
  return (
    <div className="m-4 flex grow flex-wrap gap-4">
      {props.data.map((item) => {
        return (
          <Link key={item.name} href={props.path + item.name}>
            <CardImage image={item.image} name={item.name} />
          </Link>
        );
      })}
    </div>
  );
}
