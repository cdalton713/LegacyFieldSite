import React, { Component } from "react";
import { ReactDataGrid } from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import { Toolbar } from "react-data-grid-addons";

export class MyDataGrid extends Component {
  constructor(props, context) {
    super(props, context);

    let originalRows = this.props.dataSource;
    let rows = originalRows.slice(0);
    this.state = { originalRows, rows, filters: {} };
  }
  static defaultProps = {
    columns: [],
    rows: [],
    dataSource: "",
    rowsCount: 50,
    minHeight: 150,
  };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === "DESC") {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };

    const rows =
      sortDirection === "NONE"
        ? this.state.originalRows.slice(0)
        : this.state.rows.sort(comparer);
  };

  handleFilterChange = (filter) => (filters) => {
    const newFilters = { ...filters };
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    return newFilters;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.props.columns}
          rows={this.state.rows}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={this.props.minHeight}
          //   onGridRowsUpdated={this.onGridRowsUpdated}
          //   enableCellSelect={true}
          onGridSort={this.handleGridSort}
          toolbar={<Toolbar enableFilter={true} />}
          onAddFilter={(filter) => setFilters(handleFilterChange(filter))}
          onClearFilters={() => setFilters({})}
        />
      </div>
    );
  }
}
