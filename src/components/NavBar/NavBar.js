import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import RightDrawer from './RightDrawer';

const theme = createMuiTheme({
  shadows: ['none'],
  typography: {
    useNextVariants: true
  }
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { avatar, fullName, wrapperDiv } = this.props;
    return (
      <div className="navbar">
        <AppBar
          theme={theme}
          className={!wrapperDiv ? 'appbar-background-img' : 'appbar'}
          position="fixed"
        >
          <Toolbar>
            <div className="navbar-content">
              <div className="navbar-content-left">
                {!avatar ? (
                  <Avatar
                    alt="Lalit Kumar"
                    src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
                    className="navbar-avatar"
                  />
                ) : (
                  ''
                )}
                {!fullName ? (
                  <div
                    className={avatar ? 'navbar-brand' : 'navbar-brand-animate'}
                  >
                    Lalit Kumar
                  </div>
                ) : (
                  <div className="navbar-brand">Lalit</div>
                )}
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

NavBar.propTypes = {
  avatar: PropTypes.bool.isRequired,
  fullName: PropTypes.bool.isRequired,
  wrapperDiv: PropTypes.bool.isRequired
};

export default NavBar;
