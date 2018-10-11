import React from 'react';
import {
  Button,
  Container,
  Header,
  Image,
  Menu,
  Segment
} from 'semantic-ui-react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Container>
          <Segment inverted textAlign="center" vertical>
            <Menu size="large" inverted>
              <Menu.Item as="a">
                <Image
                  size="mini"
                  src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
                  circular
                />
                {/* Lalit Kumar */}
              </Menu.Item>
              <Menu.Item as="a">Home</Menu.Item>
              <Menu.Item as="a">Work</Menu.Item>
              <Menu.Item as="a">Company</Menu.Item>
              <Menu.Item as="a">Careers</Menu.Item>
              <Menu.Item position="right">
                <Button as="a">Log in</Button>
                <Button as="a" style={{ marginLeft: '0.5em' }}>
                  Sign Up
                </Button>
              </Menu.Item>
            </Menu>
          </Segment>
          <Segment
            className="heading"
            style={{
              minHeight: '300px',
              textAlign: 'center',
              margin: 0,
              padding: 0
            }}
          >
            <Header as="h1" style={{ marginTop: '3em', fontSize: '3em' }}>
              Lalit Kumar
            </Header>
            <Header as="h4" style={{ marginTop: '-15px' }}>
              Software Developer
            </Header>
          </Segment>
        </Container>
      </div>
    );
  }
}
