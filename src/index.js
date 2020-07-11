
import '../node_modules/papercss/dist/paper.css'
import './app/css/index.scss'

import 'regenerator-runtime/runtime'

import rock_image from './app/images/rock.png';
import paper_image from './app/images/paper.png';
import scissor_image from './app/images/scissors.png';

import * as app from './app/javascript/app' 


document.addEventListener('DOMContentLoaded',()=>{
    const scissors = document.getElementsByClassName('rps-image-scissor')
    const rocks = document.getElementsByClassName('rps-image-rock')
    const papers = document.getElementsByClassName('rps-image-paper')

    for(let image of scissors){
        image.src = scissor_image;
    }

    for(let image of rocks){
        image.src = rock_image;
    }

    for(let image of papers){
        image.src = paper_image;
    }

    

})

document.addEventListener('DOMContentLoaded', app)
