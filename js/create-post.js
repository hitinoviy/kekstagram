import {data} from './data.js';
import {getRandomArrayElement, getRandomInteger} from './utils.js';
const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(data.comments)
  ).join(' ');

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(data.names)
});

export const createPost = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(data.descriptions),
  likes: getRandomInteger(15,200),
  comments: Array.from(
    {length: getRandomInteger(1,6)},
    (_, commentIndex) => createComment(commentIndex+1))
});
