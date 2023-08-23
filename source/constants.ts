import "$std/dotenv/load.ts";

export const ROUTE = {
  ABOUT: "ABOUT",
  READ: "READ",
  WRITE: "WRITE",
};

const EARLIEST_FRIDAY_UTC_OFFSET = 14;
const LATEST_FRIDAY_UTC_OFFSET = -12;

export function isFridaySomewhere(): boolean {
  return Boolean(
    Deno?.args?.includes("--force-friday") ||
      Deno.env.get("ALWAYS_FRIDAY") === "true" ||
      isFriday(EARLIEST_FRIDAY_UTC_OFFSET) ||
      isFriday(LATEST_FRIDAY_UTC_OFFSET),
  );
}

function isFriday(offset: number) {
  const date = new Date(new Date().getTime() + offset * 3600 * 1000);
  return date.getDay() === 5;
}
