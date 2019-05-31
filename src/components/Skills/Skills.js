import fontawesome from '@fortawesome/fontawesome';
import {
  faComments,
  faDesktop,
  faFileAlt,
  faSearch,
  faTasks,
  faUsersCog
} from '@fortawesome/fontawesome-free-solid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React from 'react';
import 'react-typist/dist/Typist.css';
import Skill from './Skill/Skill';
import './Skills.css';

fontawesome.library.add(
  faComments,
  faDesktop,
  faSearch,
  faTasks,
  faFileAlt,
  faUsersCog
);
class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: []
    };
  }

  componentDidMount() {
    axios.get('skills.json').then(data => {
      this.setState({
        skills: data.data.skills
      });
    });
  }

  render() {
    const { skills } = this.state;
    return (
      <div className="skills-wrapper" id="skills">
        <Paper className="skills-wrapper-paper" elevation={1}>
          <Typography className="skills-head" variant="h3" component="div">
            Skills
          </Typography>
          <hr className="horizontal-rule" />
          <Grid
            className="skills-grid"
            container
            justify="center"
            alignItems="center"
            spacing={24}
          >
            {skills &&
              skills.map((skill, i) => (
                <Skill
                  key={i}
                  title={skill.title}
                  description={skill.description}
                  icon={skill.icon}
                />
              ))}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Skills;
