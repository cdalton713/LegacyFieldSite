import React, { Component } from "react";
import { Dropdown, Menu, Button, Segment } from "semantic-ui-react";
import MainSideBar from "./sidebar.js";



export default class MainNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { visibile: true };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSideBarVisibleChange = () =>
    this.setState({ visible: !this.state.visible });

  render() {
    const { activeItem } = this.state;
      return (
        <div>
          <Menu className="no-margin">
            <Menu.Item onClick={this.handleSideBarVisibleChange}>
              <i className="sidebar icon"></i>
            </Menu.Item>
            <Menu.Item
              name="File Upload"
              active={activeItem === "fileUpload"}
              onClick={this.handleItemClick}
            >
              File Upload
            </Menu.Item>

            <Dropdown text="Report Incident" pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item>Create New</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown text="Remote Ops" pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item>Quick DD Form</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
          <MainSideBar visible={this.state.visible}></MainSideBar>
        </div>
      );
    }
    }
