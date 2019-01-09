import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import RightDrawer from './RightDrawer';

const theme = createMuiTheme({
  shadows: ['none'],
  typography: {
    useNextVariants: true
  }
});

function NavBar() {
  return (
    <div className="navbar">
      <AppBar theme={theme} className="appbar" position="fixed" color="default">
        <Toolbar>
          <div className="navbar-content">
            <div className="navbar-content-left">
              {/* <Avatar
                alt="Lalit Kumar"
                src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
                className="navbar-avatar"
              /> */}
              <div className="navbar-brand">Lalit</div>
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

export default NavBar;
