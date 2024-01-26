import {getPosts} from './create-post.js';
import {renderPosts} from './create-post-element.js';
import './form.js';

renderPosts(getPosts());

