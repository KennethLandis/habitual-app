import React, { Component } from 'react';
import SignIn from './Sign-in';

class Home extends Component {
    render() {
        return (
            <main className="main">
          <p className="content">Forming proper habits is of paramount importance to reaching your goals.  Setting habits, whether positive or negative, ultimately set the tone for your everyday life!
          However making an activity a reflex action you don't think about is hard work, and that's where habitually successful comes in handy!<br></br><br></br>  We help you track progress toward building new positive habits
          with the goal of helping you achieve the ideal lifestyle.  Making good habits is a great way to supplement motivation because a reflex to work on something important to you will keep you on track toward 
          your goals.  Sign in and get started tracking those days completed for your gateway toward a positive change today!</p>
          <SignIn className="content" history = {this.props.history}></SignIn>

          <p>Demo account information if you want to see the app... <br></br>user name: petch<br></br> password: test2</p>
        </main>
        )
    }
};

export default Home;