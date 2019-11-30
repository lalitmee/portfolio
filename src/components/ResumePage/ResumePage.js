import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

import './ResumePage.css';

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
          <Link to="/" className="back-button">
            <div className="backBtn">
              <span className="line tLine" />
              <span className="line mLine" />
              <span className="label">Portfolio</span>
              <span className="line bLine" />
            </div>
          </Link>
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
              <PhoneAndroidIcon className="resume-contact-icon" />
              <span className="resume-phone-text">(+91)9712618438</span>
            </div>
            <div className="resume-email">
              <EmailIcon className="resume-contact-icon" />
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
              <WebAssetIcon className="resume-contact-icon" />
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
              <GitHubIcon className="resume-contact-icon" />
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
              <LinkedInIcon className="resume-contact-icon" />
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
                  <div className="cname text-bold">koinearth</div>
                  <div className="cplace text-italic">Bangalore</div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>SOFTWARE</div>
                    <div>ENGINEER</div>
                  </div>
                  <div className="years text-italic">
                    August. 2019 - Present
                  </div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>Working on Blockchain Product Marketsn.com</li>
                    <li>
                      Learning new and advanced practices in React Environment
                    </li>
                  </ul>
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
                  <div className="years text-italic">
                    Jun. 2018 - August 2019
                  </div>
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
            <div className="resume-projects content-item">
              <div className="head-wrapper">
                <div className="resume-section-head resume-projects-head">
                  Projects
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">
                    Projectile - Student Project Listing Platform
                  </div>
                  <div className="cplace text-italic">
                    Django, JavaScript, HTML and CSS
                  </div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>DEVELOPER</div>
                    <div>AND</div>
                    <div>DOCUMENTATION</div>
                    <div>HEAD</div>
                  </div>
                  <div className="years text-italic">Aug. 2016 - Nov. 2016</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        href="http://projectile.pythonanywhere.com/login/?next=/"
                      >
                        Link to the Project
                      </a>
                    </li>
                    <li>
                      It is a platform in which we will provide the user with
                      the listing of the suitable projects according to their
                      skills which they currently have. We are trying to reduce
                      the effort and difficulty of the student, interested in
                      doing any project.
                    </li>
                    <li>
                      Anyone who is interested in doing some projects, can go to
                      this website and select according to his skills.
                      Currently, we are working on this website to improve
                      further.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">Notes-Webapp</div>
                  <div className="cplace text-italic">
                    React.js, HTML5 and CSS3
                  </div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>DEVELOPER</div>
                  </div>
                  <div className="years text-italic">Jul. 2017</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        href="https://lalitmee.github.io/Notes-App/"
                      >
                        Link to the Project
                      </a>
                    </li>
                    <li>
                      This is a small project which is developed for taking
                      notes. Mainly it is a web application in which we can take
                      notes as many as we want to.
                    </li>
                    <li>
                      This project was developed mainly to learn basics of
                      React.js and understanding the flow of the mechanism of
                      React.js. It is a very handy web application in which you
                      can edit, add and delete any notes.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">
                    Client Management System
                  </div>
                  <div className="cplace text-italic">
                    Angular.js, HTML5 and CSS3
                  </div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>DEVELOPER</div>
                  </div>
                  <div className="years text-italic">Apr. 2017</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        href="https://github.com/lalitmee/Client-Management"
                      >
                        Link to the Project
                      </a>
                    </li>
                    <li>
                      This is a small project which is developed for management
                      of clients or users in a company or an organization.
                    </li>
                    <li>
                      Management can be done by updating the existing client,
                      deleting the non-existing client and adding the new
                      client.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="resume-extra-cu content-item">
              <div className="head-wrapper">
                <div className="resume-section-head resume-extra-cu-head">
                  Extracurricular Activity
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">
                    Front-End Web Developer Nanodegree
                  </div>
                  <div className="cplace text-italic">Online @Udacity</div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>STUDENT</div>
                  </div>
                  <div className="years text-italic">May. 2018 - Dec. 2018</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>Learned advance concepts of Front End Development.</li>
                    <li>
                      Implemented 7 projects during the course which are
                      available on my GitHub profile.
                    </li>
                    <li>
                      Learned about Frontend Frameworkds like React.js and
                      importance of service workers in PWAs
                    </li>
                  </ul>
                </div>
              </div>
              <div className="resume-section-item">
                <div className="college-name-place resume-section-sub-item">
                  <div className="cname text-bold">Google Code-In</div>
                  <div className="cplace text-italic">Online @Sugar Labs</div>
                </div>
                <div className="major-years resume-section-sub-item">
                  <div className="major">
                    <div>MENTOR</div>
                  </div>
                  <div className="years text-italic">Nov. 2017 - Jan. 2018</div>
                </div>
                <div className="resume-section-sub-item">
                  <ul className="description-list">
                    <li>
                      {' '}
                      Mentored the students in the projects of Sugar Labs
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="thank-you">
            <div className="thank-you-text fancy">
              <span>Thank You</span>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default ResumePage;
