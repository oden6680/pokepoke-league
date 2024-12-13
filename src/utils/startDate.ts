export const startDate = new Date("2024-12-17");

export const today = new Date();
let isBeforeStartDate = false;

if (today < startDate) {
  isBeforeStartDate = true;
}

export { isBeforeStartDate };