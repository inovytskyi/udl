import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const recordRouter = createTRPCRouter({
  get_records: publicProcedure
    .input(z.object({ trackname: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.record.findMany({
        include: { user: true },
        where: { track: { name: input.trackname } },
        orderBy: { time: "asc" },
      });
    }),
  post_record: protectedProcedure
    .input(
      z.object({
        track_id: z.number(),
        time: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.record.upsert({
        where: {
          userId_trackId: {
            userId: ctx.session.user.id,
            trackId: input.track_id,
          },
        },
        update: {
          time: input.time,
        },
        create: {
          track: { connect: { id: input.track_id } },
          user: { connect: { id: ctx.session.user.id } },
          time: input.time,
        },
      });
    }),
});
