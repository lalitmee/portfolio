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

  componentDidMount() {
    const nodes = [].slice.call(document.getElementsByClassName('card'), 0);
    const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
    const classNames = ['in', 'out']
      .map(p => Object.values(directions).map(d => `${p}-${d}`))
      .reduce((a, b) => a.concat(b));

    const getDirectionKey = (ev, node) => {
      const { width, height, top, left } = node.getBoundingClientRect();
      const l = ev.pageX - (left + window.pageXOffset);
      const t = ev.pageY - (top + window.pageYOffset);
      const x = l - (width / 2) * (width > height ? height / width : 1);
      const y = t - (height / 2) * (height > width ? width / height : 1);
      return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    };

    class Item {
      constructor(element) {
        this.element = element;
        this.element.addEventListener('mouseover', ev => this.update(ev, 'in'));
        this.element.addEventListener('mouseout', ev => this.update(ev, 'out'));
      }

      update(ev, prefix) {
        this.element.classList.remove(...classNames);
        this.element.classList.add(
          `${prefix}-${directions[getDirectionKey(ev, this.element)]}`
        );
      }
    }

    nodes.forEach(node => new Item(node));
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
                <div className="info">
                  <h3>Single-origin coffee whatever</h3>
                  <p>
                    Williamsburg tofu polaroid, 90s Bushwick irony locavore
                    ethnic meh messenger bag Truffaut jean shorts.
                  </p>
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
                <div className="info">
                  <h3>Single-origin coffee whatever</h3>
                  <p>
                    Williamsburg tofu polaroid, 90s Bushwick irony locavore
                    ethnic meh messenger bag Truffaut jean shorts.
                  </p>
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
                <div className="info">
                  <h3>Single-origin coffee whatever</h3>
                  <p>
                    Williamsburg tofu polaroid, 90s Bushwick irony locavore
                    ethnic meh messenger bag Truffaut jean shorts.
                  </p>
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
                <div className="info">
                  <h3>Single-origin coffee whatever</h3>
                  <p>
                    Williamsburg tofu polaroid, 90s Bushwick irony locavore
                    ethnic meh messenger bag Truffaut jean shorts.
                  </p>
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
