import { DropdownSelection, NumberInput } from "../../../components/inputs";
import FileUploader from "../../../components/fileUploader";
import { MyDataTable } from "../../../components/datatable";
import React, { useState } from "react";
import {
  Header,
  Icon,
  Image,
  Menu,
  Container,
  Sidebar,
  Dimmer,
  Button,
  Grid,
  Card,
  Divider,
  Segment,
} from "semantic-ui-react";

import FineUploaderAzure from "fine-uploader-wrappers/azure";
import {useSelector} from "react-redux";
const uploader = new FineUploaderAzure({
  options: {
    request: {
      endpoint: "my/upload/endpoint",
    },
  },
});

const ddOrMwd = [
  { key: 1, text: "DD", value: "DD" },
  { key: 2, text: "MWD", value: "MWD" },
];

export const Uploader = (props) => {
  const [ddMwd, setDdMWd] = useState("");
  const [mwdRun, setMwdRun] = useState("");
  const [ddRun, setDdRun] = useState("");
  const [itemGroup, setItemGroup] = useState([]);
  const darkMode = useSelector((state) => state.localSettings.darkMode);

  // const handleStkChange = (e, { value }) => setStk(value);
  const handleDdMwdChange = (e, { value }) => setDdMWd(value);
  const handleMwdRunChange = (e, { value }) => setMwdRun(value);
  const handleDdRunChange = (e, { value }) => setDdRun(value);

  return (
    <Grid stackable={true} columns={3} centered={true} textAlign={'center'} inverted={darkMode}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <DropdownSelection
            label={"DD/MWD"}
            options={ddOrMwd}
            handleChange={handleDdMwdChange}
          />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <NumberInput
            label={"MWD Run"}
            min={0}
            handleChange={handleMwdRunChange}
          />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <NumberInput
            label={"DD Run"}
            min={0}
            handleChange={handleDdRunChange}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
          <br />
          <FileUploader
            uploader={uploader}
            ddMwd={ddMwd || ""}
            mwdRun={mwdRun || ""}
            ddRun={ddRun || ""}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Divider horizontal inverted={darkMode}>Uploaded Files</Divider>
          <MyDataTable
            columns={columns}
            data={data}
            title=""
            selectableRows
            selectableRowsHighlight
            dense={true}
            noHeader
            subHeader={false}
            subHeaderAlign={"right"}
            deleteButton={true}
            downloadButton={true}
          />
        </Grid.Column>
      </Grid.Row>
</Grid>
  );
};

const columns = [
  {
    name: "Job ID",
    selector: "job_id",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "File Size",
    selector: "file_size",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Last Modified",
    selector: "last_modified",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Group 1",
    selector: "group_1",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Group 2",
    selector: "group_2",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Group 3",
    selector: "group_3",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "URL",
    selector: "url",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "DURL",
    selector: "url",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Uploaded By",
    selector: "uploaded_by",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "File Name",
    selector: "file_name",
    sortable: true,
    compact: true,
    searchable: true,
  },
];


const data = [
  {
    id: 0,
    job_id: "HU200082",
    name: "Motor Test 10475 (12603439 - 05 May 2020).pdf",
    file_size: "159.48 KB",
    last_modified: "2020-05-06 16:00 (CST)",
    group_1: "DD",
    group_2: "RUN 2 BHawdawdA 2",
    group_3: " ",
    url: "https://lddstorage.blob.core.windows.net/",
    durl:
      "/_delete_blob/https://ldwadwadawddstorage.blob.core.windows.net/fieldfileuploads/",
    uploaded_by: "Brian Douglas",
    file_name: "Motor Test 10475 (12603439 - 05 May 2020).pdf",
  },
  {
    id: 1,
    job_id: "HU200083",
    name: "Motor Test sdfsdfsf10475 (12603439 - 05 May 2020).pdf",
    file_size: "159.48 KB",
    last_modified: "2020-05-06 16:00 (CST)",
    group_1: "DD",
    group_2: "RUN 2 BHA 2",
    group_3: " ",
    url: "https://lddstorage.blob.core.windows.net/",
    durl:
      "/_delete_blob/https://lddstorage.blob.core.windows.net/fieldfileuploads/",
    uploaded_by: "Brian Douglas",
    file_name: "Motor Test 10475 (12603439 - 05 May 2020).pdf",
  },
  {
    id: 2,
    job_id: "HU200081",
    name: "Motor Test 10475 (12603439 - 05 May 2020).pdf",
    file_size: "159.48 KB",
    last_modified: "2020-05-06 16:00 (CST)",
    group_1: "DD",
    group_2: "RUN 2 BHA 2",
    group_3: " ",
    url: "https://lddstorage.blob.core.windows.net/",
    durl:
      "/_delete_blob/https://lddstorage.blob.core.windows.net/fieldfileuploads/",
    uploaded_by: "Brian Douglas",
    file_name: "Motor Test 10475 (12603439 - 05 May 2020).pdf",
  },
];