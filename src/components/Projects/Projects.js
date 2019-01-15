import fontawesome from '@fortawesome/fontawesome';
import {
  faComments,
  faDesktop,
  faFileAlt,
  faSearch,
  faTasks,
  faUsersCog
} from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
                <Card className="card">
                  <div className="card-icon">
                    <FontAwesomeIcon
                      className="card-image"
                      icon={['fas', 'desktop']}
                    />
                  </div>
                  <CardContent className="card-content">
                    <Typography
                      className="card-content-text"
                      component="div"
                      variant="h3"
                    >
                      Web Development
                    </Typography>
                    <Typography
                      className="card-content-sub-text"
                      component="div"
                      variant="h5"
                    >
                      I love to build attractive and platform independent Web
                      Applications
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <Card className="card">
                  <div className="card-icon">
                    <FontAwesomeIcon
                      className="card-image"
                      icon={['fas', 'search']}
                    />
                  </div>
                  <CardContent className="card-content">
                    <Typography
                      className="card-content-text"
                      component="div"
                      variant="h3"
                    >
                      Research & Analysis
                    </Typography>
                    <Typography
                      className="card-content-sub-text"
                      component="div"
                      variant="h5"
                    >
                      Before starting anything, I like to do my homework and
                      complete analysis of the process
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <Card className="card">
                  <div className="card-icon">
                    <FontAwesomeIcon
                      className="card-image"
                      icon={['fas', 'tasks']}
                    />
                  </div>
                  <CardContent className="card-content">
                    <Typography
                      className="card-content-text"
                      component="div"
                      variant="h3"
                    >
                      Problem Solving
                    </Typography>
                    <Typography
                      className="card-content-sub-text"
                      component="div"
                      variant="h5"
                    >
                      Give me a problem and I will give you a better and
                      efficient solution
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <Card className="card">
                  <div className="card-icon">
                    <FontAwesomeIcon
                      className="card-image"
                      icon={['fas', 'file-alt']}
                    />
                  </div>
                  <CardContent className="card-content">
                    <Typography
                      className="card-content-text"
                      component="div"
                      variant="h3"
                    >
                      Documentation
                    </Typography>
                    <Typography
                      className="card-content-sub-text"
                      component="div"
                      variant="h5"
                    >
                      I like to maintain a good documentation, whether it is
                      code comments or code documents
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <Card className="card">
                  <div className="card-icon">
                    <FontAwesomeIcon
                      className="card-image"
                      icon={['fas', 'users-cog']}
                    />
                  </div>
                  <CardContent className="card-content">
                    <Typography
                      className="card-content-text"
                      component="div"
                      variant="h3"
                    >
                      Team Work
                    </Typography>
                    <Typography
                      className="card-content-sub-text"
                      component="div"
                      variant="h5"
                    >
                      I believe that a team can do miracles, if all the players
                      of that team are motivated and dedicated
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid className="grid-item" item xs={4}>
                <Card className="card">
                  <div className="card-icon">
                    <FontAwesomeIcon
                      className="card-image"
                      icon={['fas', 'comments']}
                    />
                  </div>
                  <CardContent className="card-content">
                    <Typography
                      className="card-content-text"
                      component="div"
                      variant="h3"
                    >
                      Communication
                    </Typography>
                    <Typography
                      className="card-content-sub-text"
                      component="div"
                      variant="h5"
                    >
                      I also love to discuss and share my views with other
                      people so that we can come up with something better
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Projects;
