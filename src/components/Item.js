import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function isVideo(url) {
    return url.toLowerCase().indexOf('.mov') > -1 || url.toLowerCase().indexOf('.mp4') > -1;
}

export default class Item extends Component {
    static displayName = 'Item';
    static propTypes = {
        duration: PropTypes.number.isRequired,
        in: PropTypes.bool,
        reset: PropTypes.bool,
        out: PropTypes.bool,
        play: PropTypes.func.isRequired,
        stop: PropTypes.func.isRequired,
        url: PropTypes.string.isRequired
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.video = null;
        this._resume = this._resume.bind(this);
    }

    componentWillMount() {
        this._videoState();
    }

    componentDidUpdate() {
        this._videoState();
    }

    _videoState() {
        if(isVideo(this.props.url)) {
            if(this.props.in) {
                this.props.stop();
                if(this.video) {
                    this.video.play();
                }
            } else if(this.props.out || this.props.reset) {
                this.video.pause();
            }
        }
    }

    _resume() {
        this.props.play();
    }

    render() {
        const styleObjectVideo = {
            transitionDuration: `${this.props.duration}ms`,
            transitionProperty: this.props.reset ? 'none' : 'all'
        };

        const styleObjectImage = {
            backgroundImage: `url(${this.props.url})`,
            transitionDuration: `${this.props.duration}ms`,
            transitionProperty: this.props.reset ? 'none' : 'all'
        };

        return isVideo(this.props.url) ? (
            <video
                ref={(video) => { this.video = video; }}
                autoPlay={this.props.in}
                src={this.props.url}
                onEnded={this._resume}
                className={classNames('video', { 'in': this.props.in, 'out': this.props.out, 'reset': this.props.reset })}
                style={styleObjectVideo}
            />
        ) : (
            <div
                className={classNames('image', { 'in': this.props.in, 'out': this.props.out, 'reset': this.props.reset })}
                style={styleObjectImage}
            />
        );
    }
}
