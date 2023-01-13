import './App.css';

// react class base components type - rcc 

import React, { Component } from 'react'
import navbar from './components/navbar';

export default class App extends Component {
  c='vishal';
  render() {
    return (
      <div>
        <navbar/>
      </div>
    )
  }
}
