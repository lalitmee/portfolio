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
    if (e.currentTarget.className === 'buy') {
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
                    <div className="top" />
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <h1>ud-myreads</h1>
                          <p>Books Tracking Application</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="buy"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </div>
                      </div>
                      <div className="right">
                        <div className="done">
                          <i className="material-icons">done</i>
                        </div>
                        <div className="details">
                          <h1>ud-myreads</h1>
                          <p>Added to your cart</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="remove"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">clear</i>
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
                </div>{' '}
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top" />
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <h1>ud-neighborhodd-map</h1>
                          <p>Web Tour of India</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="buy"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </div>
                      </div>
                      <div className="right">
                        <div className="done">
                          <i className="material-icons">done</i>
                        </div>
                        <div className="details">
                          <h1>ud-neighborhood-map</h1>
                          <p>Added to your cart</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="remove"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">clear</i>
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
                </div>{' '}
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top" />
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <h1>ud-restaurant-review</h1>
                          <p>Application for Restaurant Reviews </p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="buy"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </div>
                      </div>
                      <div className="right">
                        <div className="done">
                          <i className="material-icons">done</i>
                        </div>
                        <div className="details">
                          <h1>ud-restaurant-review</h1>
                          <p>Added to your cart</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="remove"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">clear</i>
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
                </div>{' '}
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top" />
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <h1>ud-feedreader-testing</h1>
                          <p>Testing Using Jasmine</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="buy"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </div>
                      </div>
                      <div className="right">
                        <div className="done">
                          <i className="material-icons">done</i>
                        </div>
                        <div className="details">
                          <h1>ud-feedreader-testing</h1>
                          <p>Added to your cart</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="remove"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">clear</i>
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
                </div>{' '}
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top" />
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <h1>ud-portfolio</h1>
                          <p>Simple and Clean Portfolio</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="buy"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </div>
                      </div>
                      <div className="right">
                        <div className="done">
                          <i className="material-icons">done</i>
                        </div>
                        <div className="details">
                          <h1>ud-portfolio</h1>
                          <p>Added to your cart</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="remove"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">clear</i>
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
                </div>{' '}
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top" />
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <h1>ud-classic-arcade-game</h1>
                          <p>Classic Game for Fun</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="buy"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </div>
                      </div>
                      <div className="right">
                        <div className="done">
                          <i className="material-icons">done</i>
                        </div>
                        <div className="details">
                          <h1>ud-classic-arcade-game</h1>
                          <p>Added to your cart</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="remove"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">clear</i>
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
                </div>{' '}
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top" />
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <h1>ud-memory-game</h1>
                          <p>A memory Game for your mind</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="buy"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </div>
                      </div>
                      <div className="right">
                        <div className="done">
                          <i className="material-icons">done</i>
                        </div>
                        <div className="details">
                          <h1>ud-feedreader-testing</h1>
                          <p>Added to your cart</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="remove"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">clear</i>
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
                </div>{' '}
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top" />
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <h1>ud-pixel-art-maker</h1>
                          <p>Pixel Art Maker Application</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="buy"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </div>
                      </div>
                      <div className="right">
                        <div className="done">
                          <i className="material-icons">done</i>
                        </div>
                        <div className="details">
                          <h1>ud-feedreader-testing</h1>
                          <p>Added to your cart</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="remove"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">clear</i>
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
                </div>{' '}
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <div className="wrapper">
                  <div className="container">
                    <div className="top" />
                    <div className="bottom">
                      <div className="left">
                        <div className="details">
                          <h1>ud-feedreader-testing</h1>
                          <p>Testing Using Jasmine</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="buy"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">add_shopping_cart</i>
                        </div>
                      </div>
                      <div className="right">
                        <div className="done">
                          <i className="material-icons">done</i>
                        </div>
                        <div className="details">
                          <h1>ud-feedreader-testing</h1>
                          <p>Added to your cart</p>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          className="remove"
                          onClick={e => {
                            this.handleClick(e);
                          }}
                          onKeyUp={e => {
                            this.handleClick(e);
                          }}
                        >
                          <i className="material-icons">clear</i>
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
                </div>{' '}
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Projects;
