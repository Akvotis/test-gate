"use strict"

import request, { filtering } from './modules/posts.js';
import changeThemePost from './modules/changeThemePost.js';

document.addEventListener("DOMContentLoaded", () => {
    request();
    filtering();
    changeThemePost();
});