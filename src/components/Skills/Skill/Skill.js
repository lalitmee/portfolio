import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';

const Skill = props => (
  <Grid className="grid-item" item xs={4}>
    <Card className="card">
      <div className="card-icon">
        <FontAwesomeIcon className="card-image" icon={props.icon} />
      </div>
      <CardContent className="card-content">
        <Typography className="card-content-text" component="div" variant="h3">
          {props.title}
        </Typography>
        <Typography
          className="card-content-sub-text"
          component="div"
          variant="h5"
        >
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default Skill;
