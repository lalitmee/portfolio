import fontawesome from '@fortawesome/fontawesome';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faStackOverflow,
  faTwitter
} from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import RightDrawer from './RightDrawer';

fontawesome.library.add(
  faFacebook,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
  faGithub,
  faInstagram
);

const theme = createMuiTheme({
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
    const { avatar, fullName, wrapperDiv, social, count } = this.props;
    return (
      <div className="navbar">
        <AppBar
          theme={theme}
          className={!wrapperDiv ? 'appbar-background-img' : 'appbar'}
          position="fixed"
        >
          <Toolbar>
            {count < 4 ? (
              ''
            ) : (
              <div className="navbar-content">
                <div className="navbar-content-left">
                  {!avatar ? (
                    <Avatar
                      alt="Lalit Kumar"
                      src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
                      className="navbar-avatar-in"
                    />
                  ) : (
                    <Avatar
                      alt="Lalit Kumar"
                      src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
                      className="navbar-avatar-out"
                    />
                  )}
                  <div className="navbar-brand">
                    Lalit
                    <span
                      className={
                        !fullName ? 'navbar-brand-in' : 'navbar-brand-out'
                      }
                    >
                      Kumar
                    </span>
                  </div>
                </div>
                <div className="navbar-content-right">
                  <div
                    className={
                      !social ? 'social-icons-nav-in' : 'social-icons-nav-out'
                    }
                  >
                    <ul className="social-icons">
                      <li>
                        <a
                          href="https://www.linkedin.com/in/lalitmee/"
                          target="_blank"
                          className="social-square"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            className="social-nav-icon"
                            style={{
                              color: '#0077B5'
                            }}
                            icon={['fab', 'linkedin-in']}
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.github.com/lalitmee/"
                          target="_blank"
                          className="social-square"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            className="social-nav-icon"
                            style={{
                              color: '#24292e'
                            }}
                            icon={['fab', 'github']}
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://stackoverflow.com/users/4515657/lalit-kumar?tab=profile"
                          target="_blank"
                          className="social-square"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            className="social-nav-icon"
                            style={{
                              color: '#F48024'
                            }}
                            icon={['fab', 'stack-overflow']}
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/iamlalitmee"
                          target="_blank"
                          className="social-square"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            className="social-nav-icon"
                            style={{
                              color: '#4267b2'
                            }}
                            icon={['fab', 'facebook']}
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.twitter.com/lalitmee/"
                          target="_blank"
                          className="social-square"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            className="social-nav-icon"
                            style={{
                              color: '#1da1f2'
                            }}
                            icon={['fab', 'twitter']}
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/lalitmee/"
                          target="_blank"
                          className="social-square"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon
                            className="social-nav-icon"
                            style={{
                              color: '#cb2c8a'
                            }}
                            icon={['fab', 'instagram']}
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <RightDrawer />
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  avatar: PropTypes.bool.isRequired,
  fullName: PropTypes.bool.isRequired,
  wrapperDiv: PropTypes.bool.isRequired,
  social: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired
};

export default NavBar;
