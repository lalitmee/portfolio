import React from 'react';
import OnScroll from 'react-on-scroll';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import NavBar from '../NavBar/NavBar';

import 'react-typist/dist/Typist.css';
import './HomePage.css';

// const styles = theme => ({
//   root: {
//     ...theme.mixins.gutters(),
//     paddingTop: theme.spacing.unit * 2,
//     paddingBottom: theme.spacing.unit * 2,
//   },
// });

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      avatarDiv: false,
      nameDiv: false,
      mainWrapperDiv: false,
      typedTextDiv: false,
      socialIconsDiv: false,
    };
  }

  // method for handling the Avatar image animation
  avatarHandle = avatarDiv => {
    const { count } = this.state;
    this.setState({ avatarDiv, count: count + 1 });
  };

  // method for handling the Avatar image animation
  nameHandle = nameDiv => {
    const { count } = this.state;
    this.setState({ nameDiv, count: count + 1 });
  };

  // method for handling the Wrapper animation
  mainWrapperHandle = mainWrapperDiv => {
    const { count } = this.state;
    this.setState({ mainWrapperDiv, count: count + 1 });
  };

  // method for handling the Typed Text animation
  typedTextHandle = typedTextDiv => {
    const { count } = this.state;
    this.setState({ typedTextDiv, count: count + 1 });
  };

  // method for handling the Social Icons animation
  socialIconsHandle = socialIconsDiv => {
    const { count } = this.state;
    this.setState({ socialIconsDiv, count: count + 1 });
  };

  render() {
    const {
      nameDiv,
      avatarDiv,
      mainWrapperDiv,
      typedTextDiv,
      socialIconsDiv,
      count,
    } = this.state;
    return (
      <div className="main-wrapper" id="home">
        <OnScroll
          className="main-wrapper-paper"
          triggers={[
            {
              top: -780,
              callback: visible => this.mainWrapperHandle(visible),
            },
          ]}
        >
          <Paper className="main-wrapper-paper" elevation={1}>
            <NavBar
              fullName={nameDiv}
              avatar={avatarDiv}
              wrapperDiv={mainWrapperDiv}
              typed={typedTextDiv}
              social={socialIconsDiv}
              count={count}
            />
            <div className="avatar-image">
              <OnScroll
                className="main-avatar"
                triggers={[
                  {
                    top: -140,
                    callback: visible => this.avatarHandle(visible),
                  },
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
                  callback: visible => this.nameHandle(visible),
                },
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
                  callback: visible => this.typedTextHandle(visible),
                },
              ]}
            >
              <div className="typed-text">
                <TypistLoop interval={500}>
                  {[
                    'Software Developer',
                    'Front End Developer',
                    'Open Source Enthusiast',
                    'Footballer',
                    'Music Lover',
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

            <OnScroll
              triggers={[
                {
                  top: -620,
                  callback: visible => this.socialIconsHandle(visible),
                },
              ]}
            >
              <div className="social-icons-wrapper">
                <ul className="social-icons">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/lalitmee/"
                      target="_blank"
                      className="social-square"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon
                        className="social-nav-icon"
                        style={{
                          color: '#0077B5',
                        }}
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
                      <GitHubIcon
                        className="social-nav-icon"
                        style={{
                          color: '#24292e',
                        }}
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
                      <FacebookIcon
                        className="social-nav-icon"
                        style={{
                          color: '#4267b2',
                        }}
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
                      <TwitterIcon
                        className="social-nav-icon"
                        style={{
                          color: '#1da1f2',
                        }}
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
                      <InstagramIcon
                        className="social-nav-icon"
                        style={{
                          color: '#cb2c8a',
                        }}
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </OnScroll>
            <div className="quote-wrapper">
              <Typography className="quote-text" variant="h5" component="div">
                Don&#39;t comment bad code - rewrite it.
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
export default HomePage;
