import 'whatwg-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
    static displayName = 'ImageGallery';
    static propTypes = {
        duration: PropTypes.number,
        interval: PropTypes.number,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired
            })
        )
    };
    static defaultProps = {
        images: [],
        interval: 5000,
        duration: 1000
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderImages() {
        return this.props.images.map((image, key) => {
            const styleObject = {
                backgroundImage: `url(${image.url})`
            };
            return (
                <div key={`image_${key}`} className="image" style={styleObject}>

                </div>
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
