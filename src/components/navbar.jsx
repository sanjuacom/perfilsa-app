import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username')
    };
  }

  componentWillReceiveProps() {
    this.setState({
      'username': localStorage.getItem('username')
    });
  }

  renderUserLinks() {
    var loggedIn = localStorage.getItem('auth');
    if (loggedIn) {
      return (
        <span>
          <NavLink className="dropdown-item" activeClassName="active" to="/user/profile">
            <i className="fa fa-user-circle"></i> Profile
          </NavLink>
          <NavLink className="dropdown-item" activeClassName="active" to="/user/logout">
            <i className="fa fa-sign-out"></i> Logout
          </NavLink>
        </span>
      );
    }
    else {
      return (
        <span>
          <NavLink className="dropdown-item" activeClassName="active" to="/user/register">
            <i className="fa fa-id-card"></i> Register
          </NavLink>
          <NavLink className="dropdown-item" activeClassName="active" to="/user/login">
            <i className="fa fa-sign-in"></i> Login
          </NavLink>
        </span>
      );
    }
  }

  render() {

    var userLinkTitle = this.state.username ? this.state.username : 'User';

    return (
      <div className="row top-buffer">
        <div id="logo"><img src="/assets/img/logo_app.jpg" alt="Perfil SRL."/></div>
        <div className="col">
          <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary-blue">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink exact className="nav-link" activeClassName="active" to="/">
                    <i className="fa fa-home"></i> Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/remit/add">
                    <i className="fa fa-envelope"></i> Nuevo Remito
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/remits">
                    <i className="fa fa-envelope"></i> Remitos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/tool/add">
                    <i className="fa fa-envelope"></i> Agregar Herramienta
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact className="nav-link" activeClassName="active" to="/tools">
                    <i className="fa fa-newspaper-o"></i> Herramientas
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
                    <i className="fa fa-user"></i> {userLinkTitle}
                  </a>
                  <div className="dropdown-menu">
                    {this.renderUserLinks()}
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/contact">
                    <i className="fa fa-envelope"></i> Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar
