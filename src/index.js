import './app/css/bootstrap-grid.css';
import './app/css/animations.css';
import './app/css/base.scss'
import './app/css/index.scss'

import * as app from './app/javascript/app' 

import profile_image from './app/images/profile_image.jpg';

document.getElementById('profile_image').setAttribute('src', profile_image);

app()