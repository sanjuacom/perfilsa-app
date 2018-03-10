import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from 'react-router-dom';

import Navbar from './components/navbar.jsx';
import Slider from './components/slider.jsx';
import Footer from './components/footer.jsx';
import Home from './components/home.jsx';
import About from './components/about.jsx';
import Contact from './components/contact.jsx';
import RemitAdd from './components//Remit/remit_add.jsx';
import Register from './components/register.jsx';
import Login from './components/login.jsx';
import Profile from './components/profile.jsx';
import Logout from './components/logout.jsx';

// My custom components.
import Tools from './components/Tools/tools.jsx';
import ToolAdd from './components/Tools/tool_add.jsx';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div className="container">
          <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/tools" component={Tools} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/tool/add" component={ToolAdd} />
            <Route path="/remit/add" component={RemitAdd} />
            <Route path="/user/register" component={Register} />
            <Route path="/user/login" component={Login} />
            <Route path="/user/profile" component={Profile} />
            <Route path="/user/logout" component={Logout} />
          <Footer />
        </div>
      </Router>
    );
}}

export default App
