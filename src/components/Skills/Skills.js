import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-typist/dist/Typist.css';
import angular from '../../assets/images/skills/angular.png';
import css from '../../assets/images/skills/css.png';
import html from '../../assets/images/skills/html.png';
import javascript from '../../assets/images/skills/javascript.png';
import jquery from '../../assets/images/skills/jquery.png';
import react from '../../assets/images/skills/react.png';

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
          <Grid container spacing={24}>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={angular} alt="Angular" />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      Angular
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      <CircularProgressbar
                        percentage={this.state.angular}
                        text={`${this.state.angular}%`}
                        background
                        backgroundPadding={6}
                        styles={{
                          background: {
                            fill: '#323330'
                          },
                          text: {
                            fill: '#b52e31'
                          },
                          path: {
                            stroke: '#b52e31'
                          },
                          trail: { stroke: 'transparent' }
                        }}
                      />
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={javascript} alt="JavaScript" />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      JavaScript
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      <CircularProgressbar
                        percentage={this.state.javascript}
                        text={`${this.state.javascript}%`}
                        background
                        backgroundPadding={6}
                        styles={{
                          background: {
                            fill: '#323330'
                          },
                          text: {
                            fill: '#f0db4f'
                          },
                          path: {
                            stroke: '#f0db4f'
                          },
                          trail: { stroke: 'transparent' }
                        }}
                      />
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={react} alt="React" />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      React
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      <CircularProgressbar
                        percentage={this.state.react}
                        text={`${this.state.react}%`}
                        background
                        backgroundPadding={6}
                        styles={{
                          background: {
                            fill: '#323330'
                          },
                          text: {
                            fill: '#00d8ff'
                          },
                          path: {
                            stroke: '#00d8ff'
                          },
                          trail: { stroke: 'transparent' }
                        }}
                      />
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={html} alt="HTML" />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      HTML
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      <CircularProgressbar
                        percentage={this.state.html}
                        text={`${this.state.html}%`}
                        background
                        backgroundPadding={6}
                        styles={{
                          background: {
                            fill: '#323330'
                          },
                          text: {
                            fill: '#e44d26'
                          },
                          path: {
                            stroke: '#e44d26'
                          },
                          trail: { stroke: 'transparent' }
                        }}
                      />
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={css} alt="CSS" />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      CSS
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      <CircularProgressbar
                        percentage={this.state.css}
                        text={`${this.state.css}%`}
                        background
                        backgroundPadding={6}
                        styles={{
                          background: {
                            fill: '#323330'
                          },
                          text: {
                            fill: '#379ad6'
                          },
                          path: {
                            stroke: '#379ad6'
                          },
                          trail: { stroke: 'transparent' }
                        }}
                      />
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid className="grid-item" item xs={4}>
              <Card className="card">
                <img className="card-image" src={jquery} alt="jQuery" />
                <div className="card-details">
                  <CardContent className="card-content">
                    <Typography component="div" variant="h3">
                      jQuery
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      <CircularProgressbar
                        percentage={this.state.jquery}
                        text={`${this.state.jquery}%`}
                        background
                        backgroundPadding={6}
                        styles={{
                          background: {
                            fill: '#323330'
                          },
                          text: {
                            fill: '#58c0a7'
                          },
                          path: {
                            stroke: '#58c0a7'
                          },
                          trail: { stroke: 'transparent' }
                        }}
                      />
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
