import React from 'react';
import { render } from 'react-dom';

import ImageGallery from './ImageGallery';

require('./../scss/image-gallery.scss');

const images = [
    { url: 'http://localhost/img1.jpg' },
    { url: 'http://localhost/img2.jpg' },
    { url: 'http://localhost/img3.jpg' },
    { url: 'http://localhost/img4.jpg' }
];

render(<ImageGallery images={images} />, document.querySelector('div.image-gallery'));
