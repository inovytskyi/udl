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
        user_id: z.string(),
        time: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.record.upsert({
        where: {
          userId_trackId: {
            userId: input.user_id,
            trackId: input.track_id,
          },
        },
        update: {
          time: input.time,
          track: { connect: { id: input.track_id } },
          user: { connect: { id: input.user_id } },
        },
        create: {
          track: { connect: { id: input.track_id } },
          user: { connect: { id: input.user_id } },
          time: input.time,
        },
      });
    }),
});
