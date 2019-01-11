import fontawesome from '@fortawesome/fontawesome';
import {
  faAngular,
  faCss3,
  faHtml5,
  faJsSquare,
  faReact
} from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import 'react-typist/dist/Typist.css';
import jquery from '../../assets/images/skills/jquery.png';

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
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <FontAwesomeIcon
                  className="card-image"
                  style={{
                    color: '#c3002f'
                  }}
                  icon={['fab', 'angular']}
                />
                {/* <img className="card-image" src={angular} alt="Angular" /> */}
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      Angular
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <FontAwesomeIcon
                  className="card-image"
                  style={{
                    color: '#f0db4f'
                  }}
                  icon={['fab', 'js-square']}
                />
                {/* <img className="card-image" src={javascript} alt="JavaScript" /> */}
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      JavaScript
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <FontAwesomeIcon
                  className="card-image"
                  style={{
                    color: '#61dafb'
                  }}
                  icon={['fab', 'react']}
                />
                {/* <img className="card-image" src={react} alt="React" /> */}
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      React
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <FontAwesomeIcon
                  className="card-image"
                  style={{
                    color: '#e44d26'
                  }}
                  icon={['fab', 'html5']}
                />
                {/* <img className="card-image" src={html} alt="HTML" /> */}
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      HTML
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <FontAwesomeIcon
                  className="card-image"
                  style={{
                    color: '#379ad6'
                  }}
                  icon={['fab', 'css3']}
                />
                {/* <img className="card-image" src={css} alt="CSS" /> */}
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      CSS
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                {/* <FontAwesomeIcon
                  className="card-image"
                  style={{
                    color: '#0077B5'
                  }}
                  icon={['fab', 'angular']}
                /> */}
                <img
                  className="card-image jquery-img"
                  src={jquery}
                  alt="jQuery"
                />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      jQuery
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
