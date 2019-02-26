import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React from 'react';
import Project from './Project';
import './Projects.css';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get('projects.json').then(data => {
      this.setState({
        projects: data.data.projects
      });
    });
  }

  render() {
    const { projects } = this.state;

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
              {projects &&
                projects.map(project => (
                  <Project key={project.id} project={project} />
                ))}
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Projects;
