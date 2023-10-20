"use client";
import { type Simulator } from "@prisma/client";
import { NavBar } from "./_components/NavBar";
import { TreePath } from "./_components/TreePath";
import { api } from "~/trpc/react";
import Link from "next/link";
import { CardImage } from "./_components/CardImage";
import { Spinner } from "./_components/Spinner";

export default function Simulators() {
  const simulators = api.tracks.get_simulators.useQuery();
  if (simulators.isError) return <div>Error: {simulators.error.message}</div>;
  if (simulators.isLoading) return <Spinner />;
  if (simulators.isSuccess)
    return (
      <>
        <div className="m-4 flex grow flex-wrap gap-4">
          {simulators.data.map((sim) => {
            return (
              <Link key={sim.id} href={"/maps/" + sim.name}>
                <CardImage image={sim.image} name={sim.name} />
              </Link>
            );
          })}
        </div>
      </>
    );
  else return null;
}
