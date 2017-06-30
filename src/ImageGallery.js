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
    }

    componentWillUnmount() {
        this._shouldSetState = false;
        clearInterval(this._interval);
    }

    componentWillReceiveProps() {
        this.setState({ index: 0 });
    }

    _restart() {
        let newIndex = this.state.index;

        clearInterval(this._interval);
        this._interval = setInterval(() => {
            if(this.state.index >= this.props.images.length - 1) {
                if(this.props.onRestart) {
                    this.props.onRestart();
                }
                newIndex = -1;
            } else {
                newIndex = this.state.index + 1;
            }
            if(this._shouldSetState) {
                this.setState({ index: newIndex });
            }
        }, this.props.interval);
    }

    _renderImages() {
        return this.state.index === -1 ? null : this.props.images.map((image, key) => {
            return (
                <Image
                    key={`image_${key}`}
                    url={image.url}
                    duration={this.props.duration}
                    in={key === this.state.index}
                    out={this.state.index > key}
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
