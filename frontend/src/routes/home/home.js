import React, { useState, useCallback, useEffect } from "react";
import {
  Header,
  Icon,
  Image,
  Menu,
  Container,
  Sidebar,
  Button,
  Grid,
  Dimmer,
  Loader,
  Card,
  Divider,
  Segment,
} from "semantic-ui-react";
import { MyDataTable } from "../../components/datatable.js";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

export const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const allJobs = useSelector(state => state.allJobsReducer.data || [])
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("/api/v1/jobs/details/active");
  //       const json = await response.json();
  //       setIsLoaded(true);
  //       setAllJobs(json.data);
  //     } catch (err) {
  //       setIsLoaded(true);
  //       setError(err);
  //     }
  //   }
  //   fetchData();
  // }, []);
  return (
    <div className="container-all-padding">
      <Grid stackable columns={1} centered textAlign="center">
        <Grid.Row>
          <Grid.Column>
            <Divider horizontal>All Jobs</Divider>
            <Segment padded={isLoaded ? false : 'very'}>
            {allJobs.length > 0 ? (
              <MyDataTable
                data={allJobs}
                noHeader={true}
                dense={true}
                columns={columns}
                title=""
                selectableRows = {false}
                selectableRowsHighlight = {false}
                subHeader = {false}
                subHeaderAlign={"right"}
                keyField={"job_num"}
                striped={true}
                pagination={false}
              />
            ) : (
                <Grid textAlign={'center'}><Loader inline active={true}>Loading</Loader></Grid>
            )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const columns = [
  {
    name: "Job Number",
    selector: "job_num",
    sortable: true,
    compact: true,
    searchable: true,
    omit: true,

  },
  {
    name: "Job ID",
    selector: "job_id",
    sortable: true,
    compact: true,
    searchable: true,
    cell: row => <Link to="/upload">{row.job_id}</Link>
  },
  {
    name: "Well Name",
    selector: "well.well_name",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Operator",
    selector: "operator",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Rig",
    selector: "rig",
    sortable: true,
    compact: true,
    searchable: true,
  },
];
