import React from "react";
import { Grid, Header, Icon, Menu } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentJobCard } from "../../components/common";
import { Uploader } from "./upload/upload";
import { types } from "../../reducers/types";
import {Incident} from "./incident/incident";

const menuItems = [
  { id: "info", name: "Info", component: <>Job Info</> },
  { id: "upload", name: "File Upload", component: <Uploader /> },
  { id: "incident", name: "Incident", component: <Incident/> },
  { id: "remoteOps", name: "Remote Ops", component: <>R</> },
];

const JobSubNavBar = () => {
  const activeItem = useSelector(
    (state) => state.selectedJob.subPage || "upload"
  );
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.localSettings.darkMode);

  const handleItemClick = (e, data) => {
    dispatch({
      type: types.SELECT_JOB_SUBPAGE,
      data: data.id,
    });
  };

  return (
    <Menu
      pointing
      secondary
      fluid={true}
      defaultActiveIndex={0}
      inverted={darkMode}
    >
      {menuItems.map((item) => (
        <Menu.Item
          id={item.id}
          key={item.id}
          name={item.name}
          active={activeItem === item.id}
          onClick={handleItemClick}
        >
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};


export const Job = (props) => {
  const selectedJob = useSelector((state) => state.selectedJob.data);
  const selectedJobSelected = useSelector(
    (state) => state.selectedJob.selected
  );
  const subPage = useSelector((state) => state.selectedJob.subPage);
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  const LoadedSubPage = () => {
    const obj = menuItems.find((item) => item.id === subPage);
    return obj.component;
  };

  if (!selectedJobSelected) {
    return (
      <div className="container-all-padding">
        <Header as={"h2"} icon textAlign={"center"} inverted={darkMode}>
          <Icon name={"briefcase"} circular={true} inverted={darkMode} />
          <Header.Content>Select a job to continue.</Header.Content>
        </Header>
      </div>
    );
  } else {
    return (
      <div className="container-all-padding">
        <Grid
          stackable
          columns={1}
          centered
          textAlign="center"
          inverted={darkMode}
        >
          <Grid.Row>
            <Grid.Column>{<CurrentJobCard />}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <JobSubNavBar />
          </Grid.Row>
          {<LoadedSubPage />}
        </Grid>
      </div>
    );
  }
};
