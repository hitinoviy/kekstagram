import {showBigPicture} from './fullScreenPhoto.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const createPostElement = ({ comments, description, likes, url }) => {
  const post = pictureTemplate.cloneNode(true);

  post.querySelector('.picture__img').src = url;
  post.querySelector('.picture__img').alt = description;
  post.querySelector('.picture__comments').textContent = comments.length;
  post.querySelector('.picture__likes').textContent = likes;

  return post;
};

export const renderPosts = (posts) =>
{
  const fragment = document.createDocumentFragment();
  posts.forEach((post)=>{
    const postElement = createPostElement(post);
    postElement.addEventListener('click', () => {
      showBigPicture(post);
    });
    fragment.append(postElement);
  });

  pictures.append(fragment);
};

