import fontawesome from '@fortawesome/fontawesome';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faStackOverflow,
  faTwitter
} from '@fortawesome/fontawesome-free-brands';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';
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
    const { avatar, fullName, wrapperDiv, typed } = this.props;
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
              <div className="typed">
                {!typed ? (
                  <TypistLoop interval={500}>
                    {[
                      'Software Developer',
                      'Front End Developer',
                      'Open Source Enthusiast',
                      'Footballer',
                      'Music Lover'
                    ].map(text => (
                      <Typist key={text} startDelay={100}>
                        {text}
                        <Typist.Delay ms={500} />
                        <Typist.Backspace count={text.length} />
                      </Typist>
                    ))}
                  </TypistLoop>
                ) : (
                  ''
                )}
              </div>
              <div className="navbar-content-right">
                {/* <div className="social-icons">
                  <ul className="social-icons">
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'stack-overflow']} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'instagram']} />
                      </a>
                    </li>
                  </ul>
                </div> */}
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
