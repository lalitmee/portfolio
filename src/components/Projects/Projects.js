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
import React from 'react';
import 'react-typist/dist/Typist.css';
import github from '../../assets/images/github-circle.png';
import arcade from '../../assets/images/projects/arcade_game.png';
import feedReader from '../../assets/images/projects/feed_reader.png';
import memoryGame from '../../assets/images/projects/memory_game.png';
import myReads from '../../assets/images/projects/my_reads.png';
import neighborhood from '../../assets/images/projects/neighborhood.png';
import pixelArt from '../../assets/images/projects/pixel_art.png';
import portfolio from '../../assets/images/projects/portfolio.png';
import reviews from '../../assets/images/projects/reviews.jpeg';

fontawesome.library.add(faAngular, faCss3, faReact, faJsSquare, faHtml5);
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={myReads} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">ud-myreads</div>
                          <div className="project-description">
                            Books Tracking Application
                          </div>
                        </div>
                        <a
                          href="https://github.com/lalitmee/ud-myreads"
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
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#5ed3f3'
                            }}
                            icon={['fab', 'react']}
                          />
                          <div className="icon-name">React</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#ff6d00'
                            }}
                            icon={['fab', 'html5']}
                          />
                          <div className="icon-name">HTML5</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#0374b7'
                            }}
                            icon={['fab', 'css3']}
                          />
                          <div className="icon-name">CSS3</div>
                        </div>
                      </div>
                      <div className="category-head">Category</div>
                      <div className="categories">
                        <div className="category-name">Udacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={neighborhood} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">
                            ud-neighborhood-map
                          </div>
                          <div className="project-description">
                            Web Tour of India
                          </div>
                        </div>
                        <a
                          href="https://github.com/lalitmee/ud-neighborhood-map"
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
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#5ed3f3'
                            }}
                            icon={['fab', 'react']}
                          />
                          <div className="icon-name">React</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#ff6d00'
                            }}
                            icon={['fab', 'html5']}
                          />
                          <div className="icon-name">HTML5</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#0374b7'
                            }}
                            icon={['fab', 'css3']}
                          />
                          <div className="icon-name">CSS3</div>
                        </div>
                      </div>
                      <div className="category-head">Category</div>
                      <div className="categories">
                        <div className="category-name">Udacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={reviews} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">
                            ud-restaurant-review
                          </div>
                          <div className="project-description">
                            Application for Restaurant Reviews{' '}
                          </div>
                        </div>
                        <a
                          href="https://github.com/lalitmee/ud-restaurant-rewiews-stage1"
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
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#f0db4f'
                            }}
                            icon={['fab', 'js-square']}
                          />
                          <div className="icon-name">Javscript</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#ff6d00'
                            }}
                            icon={['fab', 'html5']}
                          />
                          <div className="icon-name">HTML5</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#0374b7'
                            }}
                            icon={['fab', 'css3']}
                          />
                          <div className="icon-name">CSS3</div>
                        </div>
                      </div>
                      <div className="category-head">Category</div>
                      <div className="categories">
                        <div className="category-name">Udacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={feedReader} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">
                            ud-feedreader-testing
                          </div>
                          <div className="project-description">
                            Testing Using Jasmine
                          </div>
                        </div>
                        <a
                          href="https://github.com/lalitmee/ud-feedreader-testing"
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
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#f0db4f'
                            }}
                            icon={['fab', 'js-square']}
                          />
                          <div className="icon-name">Javscript</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#ff6d00'
                            }}
                            icon={['fab', 'html5']}
                          />
                          <div className="icon-name">HTML5</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#0374b7'
                            }}
                            icon={['fab', 'css3']}
                          />
                          <div className="icon-name">CSS3</div>
                        </div>
                      </div>
                      <div className="category-head">Category</div>
                      <div className="categories">
                        <div className="category-name">Udacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={portfolio} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">ud-portfolio</div>
                          <div className="project-description">
                            Simple and Clean Portfolio
                          </div>
                        </div>
                        <a
                          href="https://github.com/lalitmee/ud-portfolio"
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
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#ff6d00'
                            }}
                            icon={['fab', 'html5']}
                          />
                          <div className="icon-name">HTML5</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#0374b7'
                            }}
                            icon={['fab', 'css3']}
                          />
                          <div className="icon-name">CSS3</div>
                        </div>
                      </div>
                      <div className="category-head">Category</div>
                      <div className="categories">
                        <div className="category-name">Udacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={arcade} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">
                            ud-classic-arcade-game
                          </div>
                          <div className="project-description">
                            Classic Game for Fun
                          </div>
                        </div>
                        <a
                          href="https://github.com/lalitmee/ud-classic-arcade-game"
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
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#f0db4f'
                            }}
                            icon={['fab', 'js-square']}
                          />
                          <div className="icon-name">Javscript</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#ff6d00'
                            }}
                            icon={['fab', 'html5']}
                          />
                          <div className="icon-name">HTML5</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#0374b7'
                            }}
                            icon={['fab', 'css3']}
                          />
                          <div className="icon-name">CSS3</div>
                        </div>
                      </div>
                      <div className="category-head">Category</div>
                      <div className="categories">
                        <div className="category-name">Udacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={memoryGame} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">ud-memory-game</div>
                          <div className="project-description">
                            A memory Game for your mind
                          </div>
                        </div>
                        <a
                          href="https://github.com/lalitmee/ud-memory-game"
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
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#f0db4f'
                            }}
                            icon={['fab', 'js-square']}
                          />
                          <div className="icon-name">Javscript</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#ff6d00'
                            }}
                            icon={['fab', 'html5']}
                          />
                          <div className="icon-name">HTML5</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#0374b7'
                            }}
                            icon={['fab', 'css3']}
                          />
                          <div className="icon-name">CSS3</div>
                        </div>
                      </div>
                      <div className="category-head">Category</div>
                      <div className="categories">
                        <div className="category-name">Udacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={pixelArt} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">ud-pixel-art-maker</div>
                          <div className="project-description">
                            Pixel Art Maker Application
                          </div>
                        </div>
                        <a
                          href="https://github.com/lalitmee/Ud-Pixel-Art-Maker"
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          target="_blank"
                          rel="noopener noreferrer"
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
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#f0db4f'
                            }}
                            icon={['fab', 'js-square']}
                          />
                          <div className="icon-name">Javscript</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#ff6d00'
                            }}
                            icon={['fab', 'html5']}
                          />
                          <div className="icon-name">HTML5</div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#0374b7'
                            }}
                            icon={['fab', 'css3']}
                          />
                          <div className="icon-name">CSS3</div>
                        </div>
                      </div>
                      <div className="category-head">Category</div>
                      <div className="categories">
                        <div className="category-name">Udacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={feedReader} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">
                            ud-feedreader-testing
                          </div>
                          <div className="project_description">
                            Testing Using Jasmine
                          </div>
                        </div>
                        <a
                          href="https://github.com/lalitmee/ud-feedreader-testing"
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
                        <div>
                          <FontAwesomeIcon
                            className="icons"
                            style={{
                              color: '#5ed3f3'
                            }}
                            icon={['fab', 'react']}
                          />
                          <div className="icon-name">React</div>
                        </div>
                      </div>
                      <div className="category-head">Category</div>
                      <div className="categories">
                        <div className="category-name">Udacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Projects;
