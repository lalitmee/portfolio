import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Link } from 'react-router-dom';

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="resume-wrapper" id="resume">
        <Paper className="resume-wrapper-paper" elevation={1}>
          <Typography className="resume-head" variant="h3" component="div">
            Resume
          </Typography>

          <div className="resume-image">
            <div className="resume-button-div">
              <Link to="/resume" className="resume-button">
                <button type="submit" className="btn btn-arrow">
                  <span>
                    Resume
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 36.1 25.8"
                      enableBackground="new 0 0 36.1 25.8"
                      xmlSpace="preserve"
                    >
                      <g>
                        <line
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="3"
                          strokeMiterlimit="10"
                          x1="0"
                          y1="12.9"
                          x2="34"
                          y2="12.9"
                        />
                        <polyline
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="3"
                          strokeMiterlimit="10"
                          points="22.2,1.1 34,12.9 22.2,24.7"
                        />
                      </g>
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Resume;
