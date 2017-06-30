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
        interval: 5000,
        duration: 1000
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="image-gallery">Gallery</div>
        );
    }
}
