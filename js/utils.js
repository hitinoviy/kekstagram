export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const checkStringLength = (str, maxLength) => str.length <= maxLength;

export const getRandomArrayElement = (arr) => arr[getRandomInteger(0,arr.length-1)];
