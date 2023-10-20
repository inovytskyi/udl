import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const recordRouter = createTRPCRouter({
  get_records: publicProcedure
    .input(z.object({ trackname: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.record.findMany({
        include: { user: true },
        where: { track: input.trackname },
        orderBy: { time: "asc" },
      });
    }),
  post_record: protectedProcedure
    .input(
      z.object({
        track_name: z.string(),
        time: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.record.upsert({
        where: {
          userId_track: {
            userId: ctx.session.user.id,
            track: input.track_name,
          },
        },
        update: {
          time: input.time,
          track: input.track_name,
          user: { connect: { id: ctx.session.user.id } },
        },
        create: {
          track: input.track_name,
          user: { connect: { id: ctx.session.user.id } },
          time: input.time,
        },
      });
    }),
});
