import fontawesome from '@fortawesome/fontawesome';
import {
  faComments,
  faDesktop,
  faFileAlt,
  faSearch,
  faTasks,
  faUsersCog
} from '@fortawesome/fontawesome-free-solid';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 * import Card from '@material-ui/core/Card';
 * import CardContent from '@material-ui/core/CardContent'; */
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import 'react-typist/dist/Typist.css';
import arcade from '../../assets/images/projects/arcade_game.png';
import feed_reader from '../../assets/images/projects/feed_reader.png';
import memory_game from '../../assets/images/projects/memory_game.png';
import my_reads from '../../assets/images/projects/my_reads.png';
import neighborhood from '../../assets/images/projects/neighborhood.png';
import pixel_art from '../../assets/images/projects/pixel_art.png';
import portfolio from '../../assets/images/projects/portfolio.png';
import reviews from '../../assets/images/projects/reviews.jpeg';

fontawesome.library.add(
  faComments,
  faDesktop,
  faSearch,
  faTasks,
  faFileAlt,
  faUsersCog
);
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = e => {
    const bottom = e.currentTarget.parentElement.parentElement;
    if (e.currentTarget.className === 'github-link') {
      bottom.classList.add('clicked');
    } else if (e.currentTarget.className === 'remove') {
      bottom.classList.remove('clicked');
    }
  };

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
                      <img src={my_reads} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">ud-myreads</div>
                          <div className="project-description">
                            Books Tracking Application
                          </div>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">open_in_new</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <div className="contents">
                      <h1>Hello</h1>
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
                        <div
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">open_in_new</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <div className="contents">
                      <h1>Hello</h1>
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
                        <div
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">open_in_new</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <div className="contents">
                      <h1>Hello</h1>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={feed_reader} alt="my-reads" />
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
                        <div
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">open_in_new</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <div className="contents">
                      <h1>Hello</h1>
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
                        <div
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">open_in_new</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <div className="contents">
                      <h1>Hello</h1>
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
                        <div
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">open_in_new</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <div className="contents">
                      <h1>Hello</h1>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={memory_game} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">ud-memory-game</div>
                          <div className="project-description">
                            A memory Game for your mind
                          </div>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">open_in_new</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <div className="contents">
                      <h1>Hello</h1>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={pixel_art} alt="my-reads" />
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <div className="project-name">ud-pixel-art-maker</div>
                          <div className="project-description">
                            Pixel Art Maker Application
                          </div>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">open_in_new</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <div className="contents">
                      <h1>Hello</h1>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top">
                      <img src={feed_reader} alt="my-reads" />
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
                        <div
                          tabIndex={0}
                          role="button"
                          className="github-link"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">open_in_new</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inside">
                    <div className="icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <div className="contents">
                      <h1>Hello</h1>
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
