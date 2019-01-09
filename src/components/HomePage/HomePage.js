import fontawesome from '@fortawesome/fontawesome';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faStackOverflow,
  faTwitter
} from '@fortawesome/fontawesome-free-brands';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import OnScroll from 'react-on-scroll';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';
import 'react-typist/dist/Typist.css';
import NavBar from '../NavBar/NavBar';
import facebook from './../../assets/images/facebook-circle.png';
import github from './../../assets/images/github.png';
import instagram from './../../assets/images/instagram-circle.png';
import linkedIn from './../../assets/images/linkedin-circle.png';
import stackoverflow from './../../assets/images/stackoverflow-circle.png';
import twitter from './../../assets/images/twitter-circle.png';

fontawesome.library.add(
  faFacebook,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
  faGithub,
  faInstagram
);

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarDiv: false,
      nameDiv: false,
      mainWrapperDiv: false,
      typedTextDiv: false
    };
  }

  avatarHandle = avatarDiv => {
    this.setState({ avatarDiv });
  };

  nameHandle = nameDiv => {
    this.setState({ nameDiv });
  };

  mainWrapperHandle = mainWrapperDiv => {
    this.setState({ mainWrapperDiv });
  };

  typedTextHandle = typedTextDiv => {
    this.setState({ typedTextDiv });
  };

  render() {
    const { nameDiv, avatarDiv, mainWrapperDiv, typedTextDiv } = this.state;
    return (
      <div className="main-wrapper">
        <OnScroll
          className="main-wrapper-paper"
          triggers={[
            {
              top: -780,
              callback: visible => this.mainWrapperHandle(visible)
            }
          ]}
        >
          <Paper className="main-wrapper-paper" elevation={1}>
            <NavBar
              fullName={nameDiv}
              avatar={avatarDiv}
              wrapperDiv={mainWrapperDiv}
              typed={typedTextDiv}
            />
            <div className="avatar-image">
              <OnScroll
                className="main-avatar"
                triggers={[
                  {
                    top: -140,
                    callback: visible => this.avatarHandle(visible)
                  }
                ]}
              >
                <Avatar
                  alt="Lalit Kumar"
                  src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
                  className="main-avatar"
                />
              </OnScroll>
            </div>

            <OnScroll
              className="name-head"
              triggers={[
                {
                  top: 0,
                  callback: visible => this.nameHandle(visible)
                }
              ]}
            >
              <div className="name-head">
                <Typography
                  className="main-wrapper-first-head"
                  variant="h1"
                  component="div"
                >
                  Lalit
                </Typography>
                <Typography
                  variant="h1"
                  component="div"
                  className="main-wrapper-second-head"
                >
                  Kumar
                </Typography>
              </div>
            </OnScroll>

            <OnScroll
              triggers={[
                {
                  top: -780,
                  callback: visible => this.typedTextHandle(visible)
                }
              ]}
            >
              <div className="typed-text">
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
              </div>
            </OnScroll>
            <div className="social-icons-wrapper">
              <ul className="social-icons">
                <li>
                  <a
                    href="https://www.linkedin.com/in/lalitmee/"
                    target="_blank"
                    className="social-square"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={linkedIn}
                      alt="linkedin-icon"
                      className="social-icon"
                    />
                    {/* <FontAwesomeIcon icon={['fab', 'facebook']} /> */}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.github.com/lalitmee/"
                    target="_blank"
                    className="social-square"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={github}
                      alt="facebook-icon"
                      className="social-icon"
                    />
                    {/* <FontAwesomeIcon icon={['fab', 'facebook']} /> */}
                  </a>
                </li>
                <li>
                  <a
                    href="https://stackoverflow.com/users/4515657/lalit-kumar?tab=profile"
                    target="_blank"
                    className="social-square"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={stackoverflow}
                      alt="stackeoverflow-icon"
                      className="social-icon"
                    />
                    {/* <FontAwesomeIcon icon={['fab', 'facebook']} /> */}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/iamlalitmee"
                    target="_blank"
                    className="social-square"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={facebook}
                      alt="facebook-icon"
                      className="social-icon"
                    />
                    {/* <FontAwesomeIcon icon={['fab', 'facebook']} /> */}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/lalitmee/"
                    target="_blank"
                    className="social-square"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={twitter}
                      alt="twitter-icon"
                      className="social-icon"
                    />
                    {/* <FontAwesomeIcon icon={['fab', 'facebook']} /> */}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/lalitmee/"
                    target="_blank"
                    className="social-square"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={instagram}
                      alt="instagram-icon"
                      className="social-icon"
                    />
                    {/* <FontAwesomeIcon icon={['fab', 'facebook']} /> */}
                  </a>
                </li>
              </ul>
            </div>
            <div className="quote-wrapper">
              <Typography className="quote-text" variant="h5" component="div">
                Don't comment bad code - rewrite it.
              </Typography>
              <Typography className="quote-writer" variant="h5" component="div">
                - Brian Kernighan
              </Typography>
            </div>
          </Paper>
        </OnScroll>
      </div>
    );
  }
}
export default withStyles(styles)(HomePage);
