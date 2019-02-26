import fontawesome from '@fortawesome/fontawesome';
import {
  faAngular,
  faCss3,
  faGithub,
  faHtml5,
  faJsSquare,
  faReact
} from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Img from 'react-image';
import github from '../../assets/images/github-circle.png';
import placeholder from '../../assets/images/image-loader.gif';

fontawesome.library.add(
  faAngular,
  faCss3,
  faReact,
  faJsSquare,
  faHtml5,
  faGithub
);

const Project = props => (
  <Grid className="grid-item" key={props.project.id} item xs={4}>
    <div className="wrapper">
      <div className="container">
        <div className="top">
          <Img
            src={[props.project.project_image]}
            alt={props.project.name}
            loader={
              <div className="image-loader">
                <img
                  src={placeholder}
                  alt="placeholder"
                  className="placeholder-image"
                />
              </div>
            }
          />
        </div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <div className="project-name">{props.project.name}</div>
              <div className="project-description">{props.project.tagline}</div>
            </div>
            <a
              href={props.project.github_link}
              tabIndex={0}
              role="button"
              className="github-link"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="material-icons">open_in_new</i>
              <img className="github-link-image" src={github} alt="github" />
            </a>
          </div>
        </div>
      </div>
      <div className="inside">
        <div className="icon">
          <i className="material-icons">info_outline</i>
        </div>
        <div className="contents">
          <div className="tech-head">Build With</div>
          <div className="technologies">
            {props.project.languages.map(
              (tech, i) =>
                tech === 'react' ? (
                  <div key={i}>
                    <FontAwesomeIcon
                      className="icons"
                      style={{
                        color: '#5ed3f3'
                      }}
                      icon={['fab', 'react']}
                    />
                    <div className="icon-name">React</div>
                  </div>
                ) : tech === 'javascript' ? (
                  <div key={i}>
                    <FontAwesomeIcon
                      className="icons"
                      style={{
                        color: '#f0db4f'
                      }}
                      icon={['fab', 'js-square']}
                    />
                    <div className="icon-name">Javscript</div>
                  </div>
                ) : tech === 'html' ? (
                  <div key={i}>
                    <FontAwesomeIcon
                      className="icons"
                      style={{
                        color: '#ff6d00'
                      }}
                      icon={['fab', 'html5']}
                    />
                    <div className="icon-name">HTML5</div>
                  </div>
                ) : tech === 'css' ? (
                  <div key={i}>
                    <FontAwesomeIcon
                      className="icons"
                      style={{
                        color: '#0374b7'
                      }}
                      icon={['fab', 'css3']}
                    />
                    <div className="icon-name">CSS3</div>
                  </div>
                ) : (
                  ''
                )
            )}
          </div>
          <div className="category-head">Category</div>
          <div className="categories">
            {props.project.classification.map((category, i) => (
              <div className="category-name" key={i}>
                {category}
              </div>
            ))}
          </div>

          <div>
            <div className="info-head">More Info</div>
            <div className="info-text">
              <Fab
                target="_blank"
                href={props.project.github_link}
                style={{
                  backgroundColor: '#24292e'
                }}
                aria-label="Add"
                className="info-icon"
              >
                <FontAwesomeIcon
                  className="info-icons github"
                  icon={['fab', 'github']}
                />
              </Fab>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Grid>
);

export default Project;
