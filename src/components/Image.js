import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Image extends Component {
    static displayName = 'Image';
    static propTypes = {
        duration: PropTypes.number.isRequired,
        in: PropTypes.bool,
        out: PropTypes.bool,
        url: PropTypes.string.isRequired
    };
    static defaultProps = {};

    render() {
        const styleObject = {
            backgroundImage: `url(${this.props.url})`,
            transitionDuration: `${this.props.duration}ms`
        };
        return <div className={classNames('image', { 'in': this.props.in, 'out': this.props.out })} style={styleObject} />;
    }
}
