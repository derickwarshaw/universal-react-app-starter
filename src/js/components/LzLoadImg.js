import React from "react";

export default class LzLoadImg extends React.Component {
  constructor() {
    super();
    this.state = {
      imageStatus: 'loading',
      loadingSrc: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillMount() {
    this.reload();
  }

  reload() {
    let originSrc = this.props.src;
    if (window.isRetina && this.props.retina) {
      originSrc = this.props.src + '@2x';
    }

    let originExtension = this.props.extension;
    if (window.supportWebp && this.props.webp) {
      originExtension = 'webp';
    }

    const imgSrc = this.props.fullSrc ?
      this.props.fullSrc :
      (this.props.remote ?
        `${originSrc}.${originExtension}` :
        `assets/images/${originSrc}.${originExtension}`);

    this.setState({
      imageStatus: 'loading',
      loadingSrc: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      src: imgSrc
    }, this._loadImage);
  }

  _handleImageLoaded() {
    clearTimeout(this.loadTimeout);
    if (this._mounted) {
      this.setState({
        imageStatus: 'loaded',
      }, () => {
        if (this.props.onLoad) {
          this.props.onLoad();
        }
      });
    }
  }

  _handleImageErrored() {
    clearTimeout(this.loadTimeout);
    if (this._mounted) {
      this.setState({
        imageStatus: 'failed'
      }, () => {
        if (this.props.onLoad) {
          this.props.onLoad(true);
        }
      });
    }
  }

  _loadImage() {
    const imgElem = new Image();
    imgElem.onload = this._handleImageLoaded.bind(this);
    imgElem.onerror = this._handleImageErrored.bind(this);
    imgElem.src = this.state.src;

    if (this.props.timeout) {
      this.loadTimeout = setTimeout(this._handleImageErrored.bind(this), this.props.timeout);
    }
  }

  render() {
    let style = {
      ...this.props.styleIn,
      opacity: this.state.imageStatus === 'loaded' ? 1 : 0
    };
    if (this.props.backgroundColor) {
      style.backgroundColor = this.props.backgroundColor;
    }
    if (this.props.asBackground) {
      const divStyle = {...style,
        backgroundImage: this.state.imageStatus === 'loaded' ? `url(${this.state.src})` : 'none'
      };
      return (
        <div
          id={this.props.elId}
          className={`lz-load lz-load-bg ${this.state.imageStatus} ${this.props.classString || ''}`}
          style={divStyle}>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <img
          id={this.props.elId}
          className={`lz-load ${this.state.imageStatus} ${this.props.classString || ''}`}
          src={this.state.imageStatus === 'loaded' ? this.state.src : this.state.loadingSrc}
          style={style}/>
      );
    }
  }
}
