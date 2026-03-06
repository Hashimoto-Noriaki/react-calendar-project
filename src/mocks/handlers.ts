import { http, HttpResponse } from "msw";
import { addDays, format } from "date-fns";
import type { Schedule } from "../types/calendar";

const today = new Date();

export const scheduleStore: Schedule[] = [
  {
    id: 1,
    title: "予定1",
    description: "説明1",
    date: format(today, "yyyy-MM-dd"),
  },
  {
    id: 2,
    title: "予定2",
    description: "説明2",
    date: format(today, "yyyy-MM-dd"),
  },
  {
    id: 3,
    title: "予定3",
    description: "説明3",
    date: format(addDays(today, 1), "yyyy-MM-dd"),
  },
  {
    id: 4,
    title: "予定4",
    description: "説明4",
    date: format(addDays(today, 7), "yyyy-MM-dd"),
  },
  {
    id: 5,
    title: "予定5",
    description: "説明5",
    date: format(addDays(today, -3), "yyyy-MM-dd"),
  },
];

export const handlers = [
  http.get("/api/schedules", () => {
    return HttpResponse.json(scheduleStore);
  }),
];
