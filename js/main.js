import {createPost} from './create-post.js';

const getPhotos = () => Array.from(
  {length: 25},
  (_, postIndex)=> createPost(postIndex+1));

getPhotos();


