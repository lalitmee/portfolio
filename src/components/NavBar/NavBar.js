import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import RightDrawer from './RightDrawer';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar">
        <AppBar position="static" color="default">
          <Toolbar>
            <div className="navbar-content">
              <div className="navbar-content-left">
                <Avatar
                  alt="Lalit Kumar"
                  src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
                  className="navbar-avatar"
                />
                <div className="navbar-brand">Lalit Kumar</div>
              </div>
              <div className="navbar-content-right">
                <RightDrawer />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
