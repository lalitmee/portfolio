import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';

class ResumePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="resume-page-wrapper" id="resume-page">
        <Paper className="resume-page-wrapper-paper" elevation={1}>
          <div className="resume-page-head">
            <Typography className="first-head" variant="h1" component="div">
              Lalit
            </Typography>
            <Typography variant="h1" component="div" className="second-head">
              Kumar
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }
}

export default ResumePage;
