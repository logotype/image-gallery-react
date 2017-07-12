import 'whatwg-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Item from './components/Item';

export default class ImageGallery extends Component {
    static displayName = 'ImageGallery';
    static propTypes = {
        duration: PropTypes.number,
        interval: PropTypes.number,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired
            })
        ),
        onRestart: PropTypes.func
    };
    static defaultProps = {
        items: [],
        interval: 5000,
        duration: 1000
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this._shouldSetState = false;
        this._interval = 0;

        this._stop = this._stop.bind(this);
        this._play = this._play.bind(this);
    }

    componentWillMount() {
        this._shouldSetState = true;
        this._restart();
        this._preload(this.props.items);
    }

    componentWillUnmount() {
        this._shouldSetState = false;
        this._stop();
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(this.props.items, nextProps.items)) {
            this._preload(nextProps.items)
                .then(() => {
                    if(this._shouldSetState) {
                        this.setState({ index: 0 });
                    }
                });
        }
    }

    _preload(items) {
        const promises = [];
        items.forEach((image) => {
            promises.push(fetch(image.url)
                .then((response) => response)
                .catch((error) => {
                    console.warn('Preloading failed', error);
                    return [];
                }));
        });
        return Promise.all(promises);
    }

    _play() {
        this._nextItem();
        this._restart();
    }

    _stop() {
        clearInterval(this._interval);
    }

    next() {
        this._stop();
        this._nextItem();
        this._restart();
    }

    previous() {
        this._stop();
        this._previousItem();
        this._restart();
    }

    set index(newIndex) {
        this._stop();
        this.setState({ index: newIndex });
        this._restart();
    }

    _previousItem() {
        let newIndex = this.state.index;
        if(this.state.index === 0) {
            newIndex = this.props.items.length - 1;
        } else {
            newIndex = this.state.index - 1;
        }
        if(this._shouldSetState) {
            this.setState({ index: newIndex });
        }
    }

    _nextItem() {
        let newIndex = this.state.index;
        if(this.state.index === this.props.items.length - 1) {
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
    }

    _restart() {
        clearInterval(this._interval);
        this._interval = setInterval(() => {
            this._nextItem();
        }, this.props.interval);
    }

    _itemStateOut () {
        return this.state.index === 0 ? this.props.items.length - 1 : this.state.index - 1;
    }

    _itemStateReset() {
        const resetIndex = (this.state.index % this.props.items.length) - 2;
        return resetIndex >= 0 ? resetIndex : this.props.items.length + resetIndex;
    }

    _renderItems() {
        return this.props.items.map((image, i) => {
            return (
                <Item
                    key={`item_${i}`}
                    url={image.url}
                    duration={this.props.duration}
                    in={i === this.state.index}
                    out={i === this._itemStateOut()}
                    reset={i === this._itemStateReset()}
                    stop={this._stop}
                    play={this._play}
                />
            );
        });
    }

    render() {
        return (
            <div className="image-gallery">
                {this._renderItems()}
            </div>
        );
    }
}
