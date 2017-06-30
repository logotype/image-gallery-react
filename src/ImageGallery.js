import 'whatwg-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Image from './components/Image';

export default class ImageGallery extends Component {
    static displayName = 'ImageGallery';
    static propTypes = {
        duration: PropTypes.number,
        interval: PropTypes.number,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired
            })
        ),
        onRestart: PropTypes.func
    };
    static defaultProps = {
        images: [],
        interval: 5000,
        duration: 1000
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this._shouldSetState = false;
        this._interval = null;
    }

    componentDidMount() {
        this._shouldSetState = true;
        this._restart();
        this._cacheImages(this.props.images);
    }

    componentWillUnmount() {
        this._shouldSetState = false;
        clearInterval(this._interval);
    }

    _cacheImages(images) {
        const promises = [];
        images.forEach((image) => {
            const promise = new Promise((resolve, reject) => {
                const imageData = document.createElement('img');
                imageData.onload = (result) => {
                    resolve(result);
                };
                imageData.onerror = (error) => {
                    reject(error);
                };
                imageData.src = image.url;
            });
            promises.push(promise);
        });
        return Promise.all(promises);
    }

    componentWillReceiveProps(nextProps) {
        this._cacheImages(nextProps.images)
            .then(() => {
                if(this._shouldSetState) {
                    this.setState({ index: 0 });
                }
            });
    }

    _restart() {
        let newIndex = this.state.index;

        clearInterval(this._interval);
        this._interval = setInterval(() => {
            if(this.state.index === this.props.images.length - 1) {
                if(this.props.onRestart) {
                    this.props.onRestart();
                }
                newIndex = 0;
            } else {
                newIndex = this.state.index + 1;
            }
            if(this._shouldSetState) {
                this.setState({ index: newIndex });
            }
        }, this.props.interval);
    }

    _imageStateOut () {
        return this.state.index === 0 ? this.props.images.length - 1 : this.state.index - 1;
    }

    _imageStateReset() {
        const resetIndex = (this.state.index % this.props.images.length) - 2;
        return resetIndex >= 0 ? resetIndex : this.props.images.length + resetIndex;
    }

    _renderImages() {
        return this.props.images.map((image, i) => {
            return (
                <Image
                    key={`image_${i}`}
                    url={image.url}
                    duration={this.props.duration}
                    in={i === this.state.index}
                    out={i === this._imageStateOut()}
                    reset={i === this._imageStateReset()}
                />
            );
        });
    }

    render() {
        return (
            <div className="image-gallery">
                {this._renderImages()}
            </div>
        );
    }
}
