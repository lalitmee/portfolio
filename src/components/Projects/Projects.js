import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import 'react-typist/dist/Typist.css';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardActive: false
    };
  }

  handleCardActiveEvent = e => {
    const card = e.target.parentElement;
    const icon = card.querySelectorAll('i');
    if (icon) {
      icon.forEach((item, i) => {
        if (
          item.classList.contains('fa-bars') ||
          item.classList.contains('fa-arrow-left')
        ) {
          icon[i].classList.add('fa-spin-fast');
        }
      });
    }
    if (card.classList.contains('mc-active')) {
      card.classList.remove('mc-active');
      window.setTimeout(() => {
        if (icon) {
          icon.forEach((item, i) => {
            if (item.classList.contains('fa-arrow-left')) {
              icon[i].classList.remove('fa-arrow-left');
              icon[i].classList.remove('fa-spin-fast');
              icon[i].classList.add('fa-bars');
            }
          });
        }
      }, 400);
    } else {
      card.classList.add('mc-active');
      window.setTimeout(() => {
        if (icon) {
          icon.forEach((item, i) => {
            if (item.classList.contains('fa-bars')) {
              icon[i].classList.add('fa-arrow-left');
              icon[i].classList.remove('fa-spin-fast');
              icon[i].classList.remove('fa-bars');
            }
          });
        }
      }, 400);
    }
  };

  render() {
    return (
      <div className="skills-wrapper" id="projects">
        <Paper className="skills-wrapper-paper" elevation={1}>
          <Typography className="skills-head" variant="h3" component="div">
            Projects
          </Typography>
          <div className="skills-grid">
            <Grid
              className="skills-grid"
              container
              justify="center"
              alignItems="center"
              spacing={24}
            >
              <Grid item xs={4}>
                <div className="material-card Red">
                  <h2>
                    <span>Christopher Walken</span>
                    <strong>
                      <i className="fa fa-fw fa-star" />
                      The Deer Hunter
                    </strong>
                  </h2>
                  <div className="mc-content">
                    <div className="img-container">
                      <img
                        alt="card-img"
                        className="img-responsive"
                        src="http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg"
                      />
                    </div>
                    <div className="mc-description">
                      He has appeared in more than 100 films and television
                      shows, including The Deer Hunter, Annie Hall, The Prophecy
                      trilogy, The Dogs of War ...
                    </div>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={e => {
                      this.handleCardActiveEvent(e);
                    }}
                    className="mc-btn-action"
                  >
                    <i className="fa fa-bars" />
                  </div>
                  <div className="mc-footer">
                    <h4>Social</h4>
                    <a className="fa fa-fw fa-facebook" />
                    <a className="fa fa-fw fa-twitter" />
                    <a className="fa fa-fw fa-linkedin" />
                    <a className="fa fa-fw fa-google-plus" />
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="material-card Red">
                  <h2>
                    <span>Christopher Walken</span>
                    <strong>
                      <i className="fa fa-fw fa-star" />
                      The Deer Hunter
                    </strong>
                  </h2>
                  <div className="mc-content">
                    <div className="img-container">
                      <img
                        alt="card-img"
                        className="img-responsive"
                        src="http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg"
                      />
                    </div>
                    <div className="mc-description">
                      He has appeared in more than 100 films and television
                      shows, including The Deer Hunter, Annie Hall, The Prophecy
                      trilogy, The Dogs of War ...
                    </div>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={e => {
                      this.handleCardActiveEvent(e);
                    }}
                    className="mc-btn-action"
                  >
                    <i className="fa fa-bars" />
                  </div>
                  <div className="mc-footer">
                    <h4>Social</h4>
                    <a className="fa fa-fw fa-facebook" />
                    <a className="fa fa-fw fa-twitter" />
                    <a className="fa fa-fw fa-linkedin" />
                    <a className="fa fa-fw fa-google-plus" />
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="material-card Red">
                  <h2>
                    <span>Christopher Walken</span>
                    <strong>
                      <i className="fa fa-fw fa-star" />
                      The Deer Hunter
                    </strong>
                  </h2>
                  <div className="mc-content">
                    <div className="img-container">
                      <img
                        alt="card-img"
                        className="img-responsive"
                        src="http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg"
                      />
                    </div>
                    <div className="mc-description">
                      He has appeared in more than 100 films and television
                      shows, including The Deer Hunter, Annie Hall, The Prophecy
                      trilogy, The Dogs of War ...
                    </div>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={e => {
                      this.handleCardActiveEvent(e);
                    }}
                    className="mc-btn-action"
                  >
                    <i className="fa fa-bars" />
                  </div>
                  <div className="mc-footer">
                    <h4>Social</h4>
                    <a className="fa fa-fw fa-facebook" />
                    <a className="fa fa-fw fa-twitter" />
                    <a className="fa fa-fw fa-linkedin" />
                    <a className="fa fa-fw fa-google-plus" />
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="material-card Red">
                  <h2>
                    <span>Christopher Walken</span>
                    <strong>
                      <i className="fa fa-fw fa-star" />
                      The Deer Hunter
                    </strong>
                  </h2>
                  <div className="mc-content">
                    <div className="img-container">
                      <img
                        alt="card-img"
                        className="img-responsive"
                        src="http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg"
                      />
                    </div>
                    <div className="mc-description">
                      He has appeared in more than 100 films and television
                      shows, including The Deer Hunter, Annie Hall, The Prophecy
                      trilogy, The Dogs of War ...
                    </div>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={e => {
                      this.handleCardActiveEvent(e);
                    }}
                    className="mc-btn-action"
                  >
                    <i className="fa fa-bars" />
                  </div>
                  <div className="mc-footer">
                    <h4>Social</h4>
                    <a className="fa fa-fw fa-facebook" />
                    <a className="fa fa-fw fa-twitter" />
                    <a className="fa fa-fw fa-linkedin" />
                    <a className="fa fa-fw fa-google-plus" />
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="material-card Red">
                  <h2>
                    <span>Christopher Walken</span>
                    <strong>
                      <i className="fa fa-fw fa-star" />
                      The Deer Hunter
                    </strong>
                  </h2>
                  <div className="mc-content">
                    <div className="img-container">
                      <img
                        alt="card-img"
                        className="img-responsive"
                        src="http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg"
                      />
                    </div>
                    <div className="mc-description">
                      He has appeared in more than 100 films and television
                      shows, including The Deer Hunter, Annie Hall, The Prophecy
                      trilogy, The Dogs of War ...
                    </div>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={e => {
                      this.handleCardActiveEvent(e);
                    }}
                    className="mc-btn-action"
                  >
                    <i className="fa fa-bars" />
                  </div>
                  <div className="mc-footer">
                    <h4>Social</h4>
                    <a className="fa fa-fw fa-facebook" />
                    <a className="fa fa-fw fa-twitter" />
                    <a className="fa fa-fw fa-linkedin" />
                    <a className="fa fa-fw fa-google-plus" />
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="material-card Red">
                  <h2>
                    <span>Christopher Walken</span>
                    <strong>
                      <i className="fa fa-fw fa-star" />
                      The Deer Hunter
                    </strong>
                  </h2>
                  <div className="mc-content">
                    <div className="img-container">
                      <img
                        alt="card-img"
                        className="img-responsive"
                        src="http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg"
                      />
                    </div>
                    <div className="mc-description">
                      He has appeared in more than 100 films and television
                      shows, including The Deer Hunter, Annie Hall, The Prophecy
                      trilogy, The Dogs of War ...
                    </div>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={e => {
                      this.handleCardActiveEvent(e);
                    }}
                    className="mc-btn-action"
                  >
                    <i className="fa fa-bars" />
                  </div>
                  <div className="mc-footer">
                    <h4>Social</h4>
                    <a className="fa fa-fw fa-facebook" />
                    <a className="fa fa-fw fa-twitter" />
                    <a className="fa fa-fw fa-linkedin" />
                    <a className="fa fa-fw fa-google-plus" />
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
