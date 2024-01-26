import {IsEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture ');
const body = document.body;
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');

const COMMENTS_PER_PORTION = 5;
let commentsShown = 0;
let comments = [];

const createComment = ({avatar,name,message}) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = `
     <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35"
        height="35">
    <p class="social__text">${message}</p>
  `;
  return comment;
};
const renderComments = () => {
  commentsShown +=COMMENTS_PER_PORTION;

  if(commentsShown >= comments.length){
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for(let i =0;i<commentsShown;i++){
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const closeBigPicture = (evt) => {
  if(IsEscapeKey(evt) || evt.target.classList.contains('big-picture__cancel')) {
    bigPicture.classList.add('hidden');
    commentsContainer.innerHTML='';
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeBigPicture);
    commentsShown = 0;
  }
};

const onCommentsLoaderClick = () => renderComments();

export const showBigPicture = (post) =>{
  bigPicture.classList.remove('hidden');
  bigPicture
    .querySelector('.big-picture__img img')
    .src = post.url;
  bigPicture
    .querySelector('.big-picture__img img')
    .alt = post.description;
  bigPicture
    .querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.social__caption').textContent = post.description;
  comments = post.comments;
  if (comments.length > 0) {
    renderComments();
  }
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', closeBigPicture);
  body.classList.add('modal-open');
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);
