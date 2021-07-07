import React, { Component } from 'react';
import { Route, Link } from 'react-router';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Habitually Successful
        </h1>
      </header>
      <main className="main">
        <p className="content">This will be split into two flexbox spots with information on habits</p>
        <p className="content">This spot will be a form for signing in</p>
      </main>
      <footer className="footer">
        Kenneth Landis copyright thing
      </footer>
    </div>
  );
}

export default App;
