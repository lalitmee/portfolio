import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';

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
      </Paper>
    </div>
  );
}

export default withStyles(styles)(HomePage);
