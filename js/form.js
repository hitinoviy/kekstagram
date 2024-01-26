import {IsEscapeKey} from './utils.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const hasValidLength = (tag)=>tag.slice(1).length>=MIN_HASHTAG_LENGTH && tag.slice(1).length<= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (tag)=>!UNVALID_SYMBOLS.test(tag.slice(1));

const startsWithHash = (tag) => tag[0]==='#';

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const isValidtag = (tag) => startsWithHash(tag) && hasValidSymbols(tag) && hasValidLength(tag);

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ');
  return hasUniqueTags(tags) && tags.every(isValidtag) && hasValidCount(tags);
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const closeModal = () => {
  form.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

const onEscKeyDown = (evt) => {
  if(IsEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', showModal);
cancelButton.addEventListener('click', closeModal);
form.addEventListener('submit', onFormSubmit);
