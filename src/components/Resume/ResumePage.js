import fontawesome from '@fortawesome/fontawesome';
import {
  faFacebook,
  faGithubSquare,
  faLinkedin,
  faTwitter
} from '@fortawesome/fontawesome-free-brands';
import {
  faEnvelope,
  faHome,
  faMobileAlt
} from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';

fontawesome.library.add(
  faFacebook,
  faLinkedin,
  faTwitter,
  faGithubSquare,
  faEnvelope,
  faHome,
  faMobileAlt
);

class ResumePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="resume-page-wrapper" id="resume-page">
        <Paper className="resume-page-wrapper-paper" elevation={1}>
          <div className="resume-page-head">
            <Typography className="first-head" variant="h1" component="div">
              Lalit
            </Typography>
            <Typography className="second-head" variant="h1" component="div">
              Kumar
            </Typography>
          </div>
          <div className="resume-sub-head">
            <Typography className="first-sub-head" variant="h4" component="div">
              <div>Software</div>
              <div>Developer</div>
            </Typography>
            <div className="point">.</div>
            <Typography
              className="second-sub-head"
              variant="h4"
              component="div"
            >
              <div>Web</div>
              <div>Developer</div>
            </Typography>
          </div>
          <div className="resume-contact">
            <div className="resume-phone">
              <FontAwesomeIcon
                className="resume-contact-icon"
                icon={['fas', 'mobile-alt']}
              />
              <span className="resume-phone-text">(+91)9712618438</span>
            </div>
            <div className="resume-email">
              <FontAwesomeIcon
                className="resume-contact-icon"
                icon={['fas', 'envelope']}
              />
              <span className="resume-email-text">
                <a target="_blank" href="mailto:lalitkumar.meena.lk@gmail.com">
                  lalitkumar.meena.lk@gmail.com
                </a>
              </span>
            </div>
            <div className="resume-home">
              <FontAwesomeIcon
                className="resume-contact-icon"
                icon={['fas', 'home']}
              />
              <span className="resume-email-text">
                <a target="_blank" href="https://lalitmee.github.io">
                  https://lalitmee.github.io
                </a>
              </span>
            </div>
            <div className="resume-github">
              <FontAwesomeIcon
                className="resume-contact-icon"
                icon={['fab', 'github-square']}
              />
              <span className="resume-email-text">
                <a target="_blank" href="https://github.com/lalitmee">
                  lalitmee
                </a>
              </span>
            </div>
            <div className="resume-linkedin">
              <FontAwesomeIcon
                className="resume-contact-icon"
                icon={['fab', 'linkedin']}
              />
              <span className="resume-email-text">
                <a target="_blank" href="https://www.linkedin.com/in/lalitmee/">
                  lalitmee
                </a>
              </span>
            </div>
          </div>
          <div className="resume-quote">
            <div className="resume-quote-text">
              “Be the change that you want to see in the world.”
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default ResumePage;
