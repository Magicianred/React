import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import styles from './styles/ColorBoxStyles'
import { withStyles } from '@material-ui/styles';

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1400);
        });
    }
    render() {
        const {name, background, paletteId, id, showingFullPalette, classes} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div style={{ background }} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} />
                    <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                        <h1 className={classes.contrastClass}>Copied!</h1>
                        <p className={classes.contrastClass}>{this.props.background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                        <span className={classes.contrastClass}>{name}</span>
                        </div>
                    <button className={`${classes.copyButton} ${classes.contrastClass}`}>Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={`${classes.seeMore} ${classes.contrastClass}`}>More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);
