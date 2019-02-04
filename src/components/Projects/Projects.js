import fontawesome from '@fortawesome/fontawesome';
import {
  faAngular,
  faCss3,
  faHtml5,
  faJsSquare,
  faReact
} from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React from 'react';
import Img from 'react-image';
import Spinner from 'react-spinkit';
import 'react-typist/dist/Typist.css';
import github from '../../assets/images/github-circle.png';

fontawesome.library.add(faAngular, faCss3, faReact, faJsSquare, faHtml5);
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      isImageLoading: true,
      imageLoadError: true
    };
  }

  componentDidMount() {
    axios.get('projects.json').then(data => {
      this.setState({
        projects: data.data.projects
      });
    });
  }

  render() {
    const { projects } = this.state;

    return (
      <div className="projects-wrapper" id="projects">
        <Paper className="projects-wrapper-paper" elevation={1}>
          <Typography className="projects-head" variant="h3" component="div">
            Projects
          </Typography>
          <div className="projects-grid">
            <hr className="horizontal-rule" />
            <Grid
              className="skills-grid"
              container
              justify="center"
              alignItems="center"
              spacing={24}
            >
              {projects &&
                projects.map((project, i) => (
                  <Grid className="grid-item" key={i} item xs={4}>
                    <div className="wrapper">
                      <div className="container">
                        <div className="top">
                          <Img
                            src={[project.project_image]}
                            alt={project.name}
                            loader={
                              <div className="image-loader">
                                <Spinner
                                  name="ball-scale-multiple"
                                  style={{
                                    color: '#30c3a6'
                                  }}
                                />
                              </div>
                            }
                          />
                        </div>
                        <div className="bottom">
                          <div className="left">
                            <div className="details">
                              <div className="project-name">{project.name}</div>
                              <div className="project-description">
                                {project.tagline}
                              </div>
                            </div>
                            <a
                              href={project.github_link}
                              tabIndex={0}
                              role="button"
                              className="github-link"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <i className="material-icons">open_in_new</i>
                              <img
                                className="github-link-image"
                                src={github}
                                alt="github"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="inside">
                        <div className="icon">
                          <i className="material-icons">info_outline</i>
                        </div>
                        <div className="contents">
                          <div className="tech-head">Build With</div>
                          <div className="technologies">
                            {project.languages.map(
                              (tech, i) =>
                                tech === 'react' ? (
                                  <div key={i}>
                                    <FontAwesomeIcon
                                      className="icons"
                                      style={{
                                        color: '#5ed3f3'
                                      }}
                                      icon={['fab', 'react']}
                                    />
                                    <div className="icon-name">React</div>
                                  </div>
                                ) : tech === 'javascript' ? (
                                  <div key={i}>
                                    <FontAwesomeIcon
                                      className="icons"
                                      style={{
                                        color: '#f0db4f'
                                      }}
                                      icon={['fab', 'js-square']}
                                    />
                                    <div className="icon-name">Javscript</div>
                                  </div>
                                ) : tech === 'html' ? (
                                  <div key={i}>
                                    <FontAwesomeIcon
                                      className="icons"
                                      style={{
                                        color: '#ff6d00'
                                      }}
                                      icon={['fab', 'html5']}
                                    />
                                    <div className="icon-name">HTML5</div>
                                  </div>
                                ) : tech === 'css' ? (
                                  <div key={i}>
                                    <FontAwesomeIcon
                                      className="icons"
                                      style={{
                                        color: '#0374b7'
                                      }}
                                      icon={['fab', 'css3']}
                                    />
                                    <div className="icon-name">CSS3</div>
                                  </div>
                                ) : (
                                  ''
                                )
                            )}
                          </div>
                          <div className="category-head">Category</div>
                          <div className="categories">
                            {project.classification.map((category, i) => (
                              <div className="category-name" key={i}>
                                {category}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Projects;
