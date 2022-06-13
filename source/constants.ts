export const ROUTE = {
  ABOUT: "ABOUT",
  READ: "READ",
  WRITE: "WRITE",
};

export default function isFriday(): boolean {
  return new Date().getDay() === 5;
}
