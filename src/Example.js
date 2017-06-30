import React from 'react';
import { render } from 'react-dom';

import ImageGallery from './ImageGallery';

require('./../scss/example.scss');

const images = [
    { url: 'http://localhost/img1.jpg' },
    { url: 'http://localhost/img2.jpg' },
    { url: 'http://localhost/img3.jpg' },
    { url: 'http://localhost/img4.jpg' }
];

render(<ImageGallery images={images} onRestart={() => console.log('onRestart called!')} />, document.querySelector('div.image-gallery'));
