import React, { Component } from "react";
import { Menu, Grid, Container } from "semantic-ui-react";
import MainContainer from "./mainContainer";

export default class SideBar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Grid className="compact">
        <Grid.Column width={3}>
          <Menu pointing secondary vertical className="no-margin max-width">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="messages"
              active={activeItem === "messages"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="friends"
              active={activeItem === "friends"}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column width={13}>
          <Container centered className="container-top-padding">
            <MainContainer />
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}
