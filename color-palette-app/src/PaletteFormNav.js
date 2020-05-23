import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            newColorName: "",
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    render() {
        const { classes, open } = this.props;
        const { newPaletteName } = this.state;
        return (
            <div>
                <CssBaseline />
                <AppBar
                position='fixed'
                color='default'
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color='inherit'
                    aria-label='Open drawer'
                    onClick={this.props.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit' noWrap>
                    Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
                    <TextValidator 
                        label='Palette name' 
                        name='newPaletteName'
                        onChange={this.handleChange} 
                        value={this.state.newPaletteName}
                        validators={['required', 'isPaletteNameUnique']}
                        errorMessages={['Enter a palette name', 'Name already taken']}
                    />
                    <Button 
                    variant='contained' 
                    type='submit'
                    color='primary' 
                    >Save palette
                    </Button>
                    <Link to='/'>
                        <Button variant='contained' color='secondary'>
                        Go back
                        </Button>
                    </Link>
                    </ValidatorForm>
                </Toolbar>
                </AppBar>
  
            </div>
        )
    }
}
export default  PaletteFormNav;