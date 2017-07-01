import React from 'react';
import { render } from 'react-dom';

import ImageGallery from './ImageGallery';

require('./../scss/example.scss');

const images = [
    { url: 'images/img1.png' },
    { url: 'images/img2.png' },
    { url: 'images/img3.png' },
    { url: 'images/img4.png' },
    { url: 'images/img5.png' }
];

render(
    <ImageGallery
        items={images}
        interval={5000}
        duration={1000}
        onRestart={() => console.log('Restarting...')}
    />, document.querySelector('div.image-gallery'));
