import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Palette from './Palette';
import PaletteList from './PaletteList';
import Page from './Page';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';

import { generatePalette } from './ColorHelpers';
import seedColors from "./seedColors";


class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = {palettes: savedPalettes || seedColors};
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.resetPalettes = this.resetPalettes.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]},
    this.syncLocalStorage
    );
  }
  deletePalette(id){
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    );
  }
  syncLocalStorage(){
    window.localStorage.setItem(
      'palettes', 
      JSON.stringify(this.state.palettes)
    );
  }
  resetPalettes() {
    window.localStorage.clear();
    this.setState({palettes: seedColors})     
  }
  goToPalette(id){
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    return (
      <Route 
        render={({location}) => (
          <TransitionGroup>
          <CSSTransition key={location.key} classNames='fade' timeout={500}>
          <Switch location={location} className='App'>
          <Route
            exact
            path='/palette/new'
            render={(routeProps) => (
            <Page>
              <NewPaletteForm 
              savePalette={this.savePalette} 
              palettes={this.state.palettes}
              {...routeProps} />
            </Page>
            )}
          />
          <Route 
          exact 
          path="/" 
          render={(routeProps) => (
            <Page>
              <PaletteList
              palettes={this.state.palettes} 
              resetPalettes={this.resetPalettes}
              deletePalette={this.deletePalette}
              {...routeProps}/>
            </Page>
          )}
          />
          <Route
            exact
            path='/palette/:id'
            render={routeProps => (
              <Page>
                <Palette
                  palette={generatePalette(
                    this.findPalette(routeProps.match.params.id)
                  )}
                />
              </Page> 
            )}
            />
          <Route
            exact
            path='/palette/:paletteId/:colorId'
            render={routeProps => (
              <Page>
                <SingleColorPalette
                  colorId={routeProps.match.params.colorId}
                  palette={generatePalette(
                    this.findPalette(routeProps.match.params.paletteId)
                  )}
                />
              </Page>
              
            )}
            />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
        )} />    
        ) 
  }
}

export default App;
