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

class Example extends React.Component {
    static displayName = 'Example';
    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.imageGallery = null;
        this._onKeyUp = this._onKeyUp.bind(this);
    }

    _onKeyUp(event) {
        if(event.key === 'ArrowLeft') {
            this.imageGallery.previous();
        } else if(event.key === 'ArrowRight') {
            this.imageGallery.next();
        }
    }

    componentDidMount() {
        window.addEventListener('keyup', this._onKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this._onKeyUp);
    }

    render() {
        return (
            <ImageGallery
                ref={(imageGallery) => { this.imageGallery = imageGallery; }}
                items={images}
                interval={5000}
                duration={1000}
                onRestart={() => console.log('Restarting...')}
            />
        );
    }
}

render(<Example />, document.querySelector('div.image-gallery'));
