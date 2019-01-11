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

fontawesome.library.add(faAngular, faHtml5, faCss3, faJsSquare, faReact);
class Skills extends React.Component {
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

  componentWillMount() {
    this.setState({
      angular: 70,
      react: 60,
      html: 100,
      css: 100,
      javascript: 90,
      jquery: 90
    });
  }

  render() {
    return (
      <div className="skills-wrapper">
        <Paper className="skills-wrapper-paper" elevation={1}>
          <Typography className="skills-head" variant="h3" component="div">
            I am good at
          </Typography>
          <Grid container spacing={24}>
            <Grid className="grid-item" item xs={6}>
              <Card className="card">
                <img className="card-image" src={webDesign} alt="web-design" />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      Web Designing
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={6}>
              <Card className="card">
                <img className="card-image" src={analytics} alt="web-design" />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      Research & Analytics
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={6}>
              <Card className="card">
                <img
                  className="card-image"
                  src={problemSolving}
                  alt="web-design"
                />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      Problem Solving
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={6}>
              <Card className="card">
                <img className="card-image" src={teamWork} alt="web-design" />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      Team Work
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Skills;
