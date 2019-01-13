import fontawesome from '@fortawesome/fontawesome';
import { faCopyright, faHeart } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

fontawesome.library.add(faCopyright, faHeart);
function Footer() {
  return (
    <div className="footer-wrapper" id="footer">
      <Paper className="footer-wrapper-paper" elevation={1}>
        <Typography className="footer-text" variant="h4" component="div">
          <FontAwesomeIcon className="copyright" icon={['fas', 'copyright']} />
          <span> Copyright 2019.</span>
        </Typography>
        <Typography className="footer-text" variant="h4" component="div">
          All rights reserved. Site by Lalit Kumar.
        </Typography>
        <Typography className="footer-text" variant="h4" component="div">
          <span>Made with </span>
          <FontAwesomeIcon className="heart" icon={['fas', 'heart']} />
        </Typography>
      </Paper>
    </div>
  );
}
export default Footer;
