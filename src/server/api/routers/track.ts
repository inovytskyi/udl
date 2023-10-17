import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
export const trackRouter = createTRPCRouter({
  get_simulators: publicProcedure.query(({ ctx }) => {
    return ctx.db.simulator.findMany({ orderBy: { id: "desc" } });
  }),
  get_maps: publicProcedure
    .input(z.object({ sim_name: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.map.findMany({
        orderBy: { id: "asc" },
        where: { Simulator: { name: input.sim_name } },
      });
    }),
  get_tracks: publicProcedure
    .input(z.object({ map_name: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.track.findMany({
        where: { Map: { name: input.map_name } },
      });
    }),
});
