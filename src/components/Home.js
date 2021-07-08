import React, { Component } from 'react';
import SignIn from './Sign-in';

class Home extends Component {
    render() {
        return (
            <main className="main">
          <p className="content">This will be split into two flexbox spots with information on habits</p>
          <SignIn className="content"></SignIn>
        </main>
        )
    }
};

export default Home;