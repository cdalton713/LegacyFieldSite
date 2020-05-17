import React, { useState } from "react";
import { Dropdown, Menu, Button, Segment } from "semantic-ui-react";
import { ActiveJobsSidebar } from "./sidebars.js";
import { MainSideBar } from "./sidebars";
import { Link, useLocation, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const JobNavBarMenus = (props) => {
  return (
    <Menu className="no-margin">
      <Menu.Item onClick={props.handleSideBarVisible}>
        <i className="sidebar icon" />
      </Menu.Item>
      <Menu.Item name={"Home"} onClick={props.handleItemClick}>
        <Link to={"/"}> Home</Link>
      </Menu.Item>
      <Menu.Item
        name="File Upload"
        // active={activeItem === "fileUpload"}
        onClick={props.handleItemClick}
      >
        <Link to={"/upload"}> File Upload </Link>
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
  );
};

export const NavBar = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [sideBarVisible, setSideBarVisible] = useState(true);

  const handleItemClick = (e, { value }) => setActiveItem(value);

  const handleSideBarVisibleChange = (e, { value }) => {
    setSideBarVisible(!sideBarVisible);
  };
  return (
    <div>
      <JobNavBarMenus
        handleItemClick={handleItemClick}
        handleSideBarVisible={handleSideBarVisibleChange}
      />
      <MainSideBar sideBarVisible={sideBarVisible}/>
    </div>
  );
};
