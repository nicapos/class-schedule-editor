/* 
  helper functions from react-schedule-view
  repo: https://github.com/despaintroy/react-schedule-view
*/
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const numToHHMM = (num: number) => {
  let hours = Math.floor(num) % 12;
  if (hours === 0) {
    hours = 12;
  }

  const minutes = Math.round((num % 1) * 60);

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${
    num >= 12 && num < 24 ? "PM" : "AM"
  }`;
};

export const numToHH = (num: number) => {
  let hours = Math.floor(num) % 12;
  if (hours === 0) {
    hours = 12;
  }

  return `${hours} ${num >= 12 && num < 24 ? "PM" : "AM"}`;
};

export const timeRangeFormatter = (startTime: number, endTime: number) =>
  `${numToHHMM(startTime)} - ${numToHHMM(endTime)}`;

export const formatTime = (timeNum: number) =>
  timeNum % 1 ? numToHHMM(timeNum) : numToHH(timeNum);
