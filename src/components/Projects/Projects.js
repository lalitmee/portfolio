import fontawesome from '@fortawesome/fontawesome';
import {
  faAngular,
  faCss3,
  faHtml5,
  faJsSquare,
  faReact
} from '@fortawesome/fontawesome-free-brands';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import 'react-typist/dist/Typist.css';
import webDesign from '../../assets/images/skills/web-design.svg';
import teamWork from '../../assets/images/skills/team-work.svg';
import problemSolving from '../../assets/images/skills/problem-solving.svg';
import analytics from '../../assets/images/skills/research.svg';
import document from '../../assets/images/skills/document.svg';
import communication from '../../assets/images/skills/meeting.svg';

fontawesome.library.add(faAngular, faHtml5, faCss3, faJsSquare, faReact);
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      angular: 0,
      react: 0,
      html: 0,
      css: 0,
      jquery: 0,
      javascript: 0
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="skills-wrapper" id="projects">
        <Paper className="skills-wrapper-paper" elevation={1}>
          <Typography className="skills-head" variant="h3" component="div">
            Projects
          </Typography>
          <Grid
            className="skills-grid"
            container
            justify="center"
            alignItems="center"
            spacing={24}
          >
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={webDesign} alt="web-design" />
                <CardContent className="card-content">
                  <Typography
                    className="card-content-text"
                    component="div"
                    variant="h3"
                  >
                    Web Designing
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={analytics} alt="web-design" />
                <CardContent className="card-content">
                  <Typography
                    className="card-content-text"
                    component="div"
                    variant="h3"
                  >
                    Research & Analysis
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img
                  className="card-image"
                  src={problemSolving}
                  alt="web-design"
                />
                <CardContent className="card-content">
                  <Typography
                    className="card-content-text"
                    component="div"
                    variant="h3"
                  >
                    Problem Solving
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={document} alt="web-design" />
                <CardContent className="card-content">
                  <Typography
                    className="card-content-text"
                    component="div"
                    variant="h3"
                  >
                    Documentation
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={teamWork} alt="web-design" />
                <CardContent className="card-content">
                  <Typography
                    className="card-content-text"
                    component="div"
                    variant="h3"
                  >
                    Team Work
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img
                  className="card-image"
                  src={communication}
                  alt="web-design"
                />
                <CardContent className="card-content">
                  <Typography
                    className="card-content-text"
                    component="div"
                    variant="h3"
                  >
                    Communication
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Projects;
