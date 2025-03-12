import { z } from "zod";

export const tripSchema = (translations: { [key: string]: string }) =>
  z.object({
    destination: z.string().min(1, { message: translations.destinationError }),
    days: z.coerce.number().min(1, { message: translations.daysError }),
    activities: z.string().min(1, { message: translations.activitiesError }),
  });

export type TripFormData = z.infer<ReturnType<typeof tripSchema>>;
