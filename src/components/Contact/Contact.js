import React from 'react';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';

import Map from '../Map/Map';

import 'react-typist/dist/Typist.css';
import './Contact.css';

function Contact() {
  return (
    <div className="contacts-wrapper" id="contacts">
      <Paper className="contacts-wrapper-paper" elevation={1}>
        <Typography className="contacts-head" variant="h3" component="div">
          Contact
        </Typography>
        <hr className="horizontal-rule" />
        <div className="contacts-grid">
          <Grid
            className="contacts-grid"
            container
            justify="center"
            alignItems="center"
            spacing={24}
          >
            <Grid item xs={6}>
              <div className="contact-row ">
                <Fab
                  target="_blank"
                  href="https://www.linkedin.com/in/lalitmee/"
                  aria-label="Add"
                  className="contact-icon linkedin-icon"
                >
                  <LinkedInIcon className="contact-icons linkedin" />
                </Fab>
                <Fab
                  target="_blank"
                  href="https://www.github.com/lalitmee/"
                  aria-label="Add"
                  className="contact-icon github-icon"
                >
                  <GitHubIcon className="contact-icons github" />
                </Fab>
                <Fab
                  target="_blank"
                  href="https://www.facebook.com/iamlalitmee"
                  aria-label="Add"
                  className="contact-icon facebook-icon"
                >
                  <FacebookIcon className="contact-icons facebook" />
                </Fab>
                <Fab
                  target="_blank"
                  href="https://www.twitter.com/lalitmee/"
                  aria-label="Add"
                  className="contact-icon twitter-icon"
                >
                  <TwitterIcon className="contact-icons twitter" />
                </Fab>
              </div>

              <div className="contact-row ">
                <div className="email-head">
                  <EmailIcon className="email-icon" />
                  <Typography className="email" variant="h3" component="div">
                    Email
                  </Typography>
                </div>
                <li className="email-text">
                  <a href="mailto:lalitkumar.meena.lk@gmail.com">
                    lalitkumar.meena.lk@gmail.com
                  </a>
                </li>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Map
                isMarkerShown
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default Contact;
