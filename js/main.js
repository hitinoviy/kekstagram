function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}


getRandomInteger(1, 5);
checkStringLength('123qwe', 5);

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = [
  'Аретем','Иван','Джон','Лера','Саша','Вова'
];
function getRandomArrayElement(arr) {
  return arr[getRandomInteger(0,arr.length-1)];
}
function createComment(_, index) {
  return {
    id: (index+1) * getRandomInteger(1,10),
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    message: getRandomArrayElement(comments),
    name: getRandomArrayElement(names)
  };
}
function createPost(_, index) {
  return {
    id: index+1,
    url: `photos/${index+1}.jpg`,
    description: 'вау это же описание',
    likes: getRandomInteger(15,200),
    comments: Array.from({length: getRandomInteger(1,6)},createComment)
  };
}

const photos = Array.from({length: 25}, createPost);

console.log(photos);
