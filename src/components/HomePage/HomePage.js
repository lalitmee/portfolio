import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
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

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function HomePage() {
  return (
    <div className="main-wrapper">
      <Paper className="main-wrapper-paper" elevation={1}>
        <NavBar />
        <div className="avatar-image">
          <Avatar
            alt="Lalit Kumar"
            src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
            className="main-avatar"
          />
        </div>
        <div className="name-head ">
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
              </a>
            </li>
            <li>
              <a
                href="https://www.github.com/lalitmee/"
                target="_blank"
                className="social-square"
                rel="noopener noreferrer"
              >
                <img src={github} alt="facebook-icon" className="social-icon" />
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
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/lalitmee/"
                target="_blank"
                className="social-square"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="twitter-icon" className="social-icon" />
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
    </div>
  );
}

export default withStyles(styles)(HomePage);
