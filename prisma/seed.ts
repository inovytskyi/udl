import { PrismaClient } from "@prisma/client";
import simulators from "./maps.json";

const prisma = new PrismaClient();

function main() {
  simulators.map(async (item) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await prisma.simulator.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        image: item.image,
        maps: {
          create: item.maps.map((map) => {
            return {
              name: map.name,
              image: map.image,
              tracks: {
                create: map.tracks.map((track) => {
                  return {
                    name: track.name,
                    image: track.image,
                  };
                }),
              },
            };
          }),
        },
      },
    });
  });
}
main();
