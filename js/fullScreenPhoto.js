const bigPicture = document.querySelector('.big-picture ');
const body = document.body;
const commentsContainer = bigPicture.querySelector('.social__comments');
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  commentsContainer.innerHTML = '';
  comments.forEach((comment)=>{
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.innerHTML = `
     <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35"
        height="35">
    <p class="social__text">${comment.message}</p>
  `;
    fragment.append(li);
  });
  return fragment;
};
const closeBigPicture = (evt) => {
  if(evt.code==='Escape' || evt.target.classList.contains('big-picture__cancel')) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};
document.addEventListener('keydown', (evt)=>closeBigPicture(evt));

export const showBigPicture = (post) =>{
  bigPicture.classList.remove('hidden');
  bigPicture
    .querySelector('.big-picture__img')
    .querySelector('img')
    .src = post.url;
  bigPicture
    .querySelector('.likes-count').textContent = post.likes;
  bigPicture
    .querySelector('.comments-count').textContent = post.comments.length;
  commentsContainer.append(renderComments(post.comments));
  bigPicture.querySelector('.social__caption').textContent = post.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
  body.classList.add('modal-open');
};
