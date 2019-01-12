import React from 'react';
import { Events, Link } from 'react-scroll';

class RightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Events.scrollEvent.register('begin', () => {
      /* console.log('begin', arguments); */
    });

    Events.scrollEvent.register('end', () => {
      /* console.log('end', arguments); */
    });
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  toggleNavClass = () => () => {
    const button = document.getElementById('toggle');
    const overlay = document.getElementById('overlay');
    button.classList.toggle('active');
    overlay.classList.toggle('open');
  };

  navClick = () => {
    const button = document.getElementById('toggle');
    const overlay = document.getElementById('overlay');
    button.classList.toggle('active');
    overlay.classList.toggle('open');
  };

  render() {
    return (
      <div className="nav">
        <div
          role="button"
          tabIndex={0}
          className="button_container"
          onClick={this.toggleNavClass()}
          id="toggle"
        >
          <span className="top" />
          <span className="middle" />
          <span className="bottom" />
        </div>
        <div className="overlay" id="overlay">
          <nav className="overlay-menu">
            <ul>
              <li>
                <Link
                  onClick={() => {
                    this.navClick();
                  }}
                  to="home"
                  smooth
                  duration={800}
                  style={{ cursor: 'pointer' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    this.navClick();
                  }}
                  to="skills"
                  smooth
                  duration={800}
                  style={{ cursor: 'pointer' }}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    this.navClick();
                  }}
                  to="projects"
                  smooth
                  duration={800}
                  style={{ cursor: 'pointer' }}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    this.navClick();
                  }}
                  to="contact"
                  smooth
                  duration={800}
                  style={{ cursor: 'pointer' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default RightDrawer;
