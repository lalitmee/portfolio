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

  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:lalitkumar.meena.lk@gmail.com"
                >
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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lalitmee.github.io"
                >
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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/lalitmee"
                >
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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/lalitmee/"
                >
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
          <div className="resume-content-wrapper">
            <div className="resume-education content-item">
              <div className="head-wrapper">
                <div className="resume-section-head resume-education-head">
                  Education
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">
                    IIITV(Indian Institute of Information Technology, Vadodara)
                  </div>
                  <div className="cplace text-italic">Gandhinagar, Gujarat</div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>B.TECH.</div>
                    <div>IN</div>
                    <div>INFORMATION</div>
                    <div>TECHNOLOGY</div>
                  </div>
                  <div className="years text-italic">Jul. 2014 - May. 2018</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      <strong>CPI :</strong> 6.99/10
                    </li>
                  </ul>
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">
                    M.S. Senior Secondary Public School
                  </div>
                  <div className="cplace text-italic">
                    Dhanaura, Uttar Pradesh
                  </div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>HIGHER</div>
                    <div>SECONDARY</div>
                    <div>SCHOOL</div>
                  </div>
                  <div className="years text-italic">Jul. 2011 - May. 2013</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      <strong>Marks :</strong> 81.8%
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="resume-skills content-item">
              <div className="head-wrapper">
                <div className="resume-section-head resume-skills-head">
                  Skills
                </div>
              </div>
              <div className="skills-item">
                <div className="skills-content">
                  <strong>Programming:</strong> Python, C/C++, Java, Shell,
                  LaTeX
                </div>
                <div className="skills-content">
                  <strong>Web Programming:</strong> HTML5, CSS3, JavaScript,
                  jQuery
                </div>
                <div className="skills-content">
                  <strong>Frameworks:</strong> React.js, Angular
                </div>
              </div>
            </div>
            <div className="resume-experience content-item">
              <div className="head-wrapper">
                <div className="resume-section-head resume-experience-head">
                  Experience
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">CognitiveClouds</div>
                  <div className="cplace text-italic">Bangalore</div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>SOFTWARE</div>
                    <div>ENGINEER</div>
                  </div>
                  <div className="years text-italic">Jun. 2018 - Present</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      Working on real time projects using technologies like
                      Angular and React.js
                    </li>
                    <li>
                      Learning how to collaborate efficiently in a team of
                      motivated and dedicated developers/engineers.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">The Sense Infinity</div>
                  <div className="cplace text-italic">JP Nagar, Bangalore</div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>FRONT</div>
                    <div>END</div>
                    <div>DEVELOPER</div>
                  </div>
                  <div className="years text-italic">Jan. 2018 - May. 2018</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      Implemented email templates for the products Ballyhoo and
                      Staple of the Project Sense Infinity.
                    </li>
                    <li>
                      Implemented a simple desktop application using Electron
                      platform using React.js and Semantic-UI-React.
                    </li>
                    <li>
                      Implemented a e-food commerce website using
                      React.js(Javascript) and Laravel(PHP).
                    </li>
                    <li>
                      Implemented Search Engine Optimization(SEO) for the
                      Ballyhoo Web application.
                    </li>
                    <li>
                      API integration by handling the data with the help of
                      React and Redux.
                    </li>
                    <li>
                      Improved functionality and performance of the website and
                      worked on Electron Desktop Application Platform.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">The Inforwarehouse</div>
                  <div className="cplace text-italic">Ahmedabad, Gujarat</div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>WEB</div>
                    <div>DEVELOPER</div>
                  </div>
                  <div className="years text-italic">May. 2017 - Jul. 2017</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      During this internship, I contributed to their live
                      projects like SkillGames, Ahtaj, etc. These projects were
                      mostly about E-learning Web applications. It was a great
                      experience and I learned a lot from this internship.
                    </li>
                    <li>
                      <strong>SkillGames: </strong>
                      This project is based on the concept of Learning by
                      playing games. In this project, you can create your
                      profile and after that, you will be assigned to the daily
                      tasks which you have to complete daily to improve your
                      learning on the particular topic. Mainly this project is
                      designed for the students to improve their learning
                      criteria. My contribution in this was designing the front
                      end of the dashboard of the user.
                    </li>
                    <li>
                      <strong>Ahtaj: </strong> This project was to reduce the
                      effort in consulting with Advocates and Doctors. In this
                      project, you can get the appointment, advice, etc from an
                      Advocate or a Doctor. I was promoted to this project
                      because of my good work in SkillGames. I contributed
                      mainly to the feed
                    </li>
                  </ul>
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">
                    Rural Internship at Atma Vani Welfare Society
                  </div>
                  <div className="cplace text-italic">
                    Kanpur, Uttar Pradesh
                  </div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>VOLUNTEER</div>
                    <div>FOR</div>
                    <div>THE</div>
                    <div>SOCIETY</div>
                  </div>
                  <div className="years text-italic">Dec. 2016</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      This Internship gave me an opportunity to know the rural
                      and slum areas from a different perspective.
                    </li>
                    <li>
                      During this internship, we visited different schools, an
                      old-age home and an organization which is working for the
                      deprived section of the society.
                    </li>
                    <li>
                      We also observed the requirement of IT sector for these
                      welfare organization for spreading their visions and
                      seeking help for the same.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default ResumePage;
