import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';
import 'react-typist/dist/Typist.css';

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
                href="https://www.facebook.com/iamlalitmee"
                className="social-square"
              >
                <img src="./../../assets/images/facebook-circle.png" alt="" />
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/lalitmee/"
                className="social-square"
              >
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lalitmee/"
                className="social-square"
              >
                <i className="fa fa-linkedin" />
              </a>
            </li>
            <li>
              <a
                href="https://www.github.com/lalitmee/"
                className="social-square"
              >
                <i className="fa fa-github" />
              </a>
            </li>
            <li>
              <a
                href="https://stackoverflow.com/users/4515657/lalit-kumar?tab=profile"
                className="social-square"
              >
                <i className="fa fa-stack-overflow" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/lalitmee/"
                className="social-square"
              >
                <i className="fa fa-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(HomePage);
