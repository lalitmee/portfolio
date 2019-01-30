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
          <Typography className="resume-head" variant="h3" component="div">
            Resume
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default ResumePage;
