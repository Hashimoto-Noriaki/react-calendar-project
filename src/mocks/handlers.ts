import { http, HttpResponse } from "msw";
import type { Schedule } from "../types/calendar";

// インメモリで予定を管理
// モジュールレベルの変数にすることで、ページをリロードするまで予定が保持される
export const scheduleStore: Schedule[] = [];

export const handlers = [
  // 予定一覧取得
  http.get("/api/schedules", () => {
    return HttpResponse.json(scheduleStore);
  }),
];
