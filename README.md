Image Gallery for React
===

[![npm version](https://badge.fury.io/js/image-gallery-react.svg)](https://badge.fury.io/js/image-gallery-react)
[![Download Count](http://img.shields.io/npm/dm/image-gallery-react.svg?style=flat)](http://www.npmjs.com/package/image-gallery-react)

![demo](https://raw.githubusercontent.com/logotype/image-gallery-react/master/images/image-gallery-react.gif)

Image Gallery for React is a component for building simple image/video slideshows.

## Getting started

```
yarn install image-gallery-react
```

### Style import

```
# SCSS
@import "node_modules/image-gallery-react/scss/image-gallery.scss";
```


### Example
```js
import ImageGallery from 'image-gallery-react';

class MyComponent extends Component {

  render() {

    const images = [
      { url: 'http://localhost/img1.jpg' },
      { url: 'http://localhost/img2.jpg' },
      { url: 'http://localhost/img3.jpg' }
    ]

    return (
      <ImageGallery
        items={images}
        interval={5000}
        duration={1000}
      />
    );
  }

}
```

# Props

* `items`: (required) Array of objects. See example above.
  * Available Properties
    * `url` - URL to image or video
* `interval`: Integer, default `5000`
* `duration`: Integer, default `1000`
  * Transition duration during image slide in milliseconds
* `onRestart`: Function, `callback()`
  * Called when slideshow has reached the last item

# Functions

* `previous`: Goes to previous item.
* `next`: Goes to next item.
* `set index`: Integer, Goes to specified item.

# License
MIT License

Copyright (c) 2017 Victor Norgren

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

--------------------------
Built with IntelliJ IDEA Open Source License

<a href="https://www.jetbrains.com/buy/opensource/"><img src="https://s3-ap-southeast-1.amazonaws.com/www.logotype.se/assets/logo-text.svg" width="200"></a>

The people at JetBrains supports the Open Source community by offering free licenses. Check out <a href="https://www.jetbrains.com/buy/opensource/">JetBrains Open Source</a> to apply for your project. Thank you!
