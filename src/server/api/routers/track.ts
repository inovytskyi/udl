import { createTRPCRouter, publicProcedure } from "../trpc";

export const trackRouter = createTRPCRouter({
  get_simulators: publicProcedure.query(({ ctx }) => {
    return ctx.db.simulator.findMany();
  }),
});
