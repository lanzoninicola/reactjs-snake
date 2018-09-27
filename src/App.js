import React, { Component } from 'react';
import './App.css';
import GameArea from './containers/GameArea/GameArea';

class App extends Component {

   render() {
    return (
      <div className="App">
        <GameArea />        
      </div>
    );
  }
}

export default App;
