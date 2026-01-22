import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Head from "next/head";
import { weatherTemplate, getWeatherIndex } from "./weatherTemplate";
import { OverlayPanel } from "primereact/overlaypanel";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [rows, setRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [requiredFilter, setRequiredFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let data = {};

      if (process.env.NODE_ENV === "development") {
        data = (await import("../localData/job_stats.json")).default;
      } else {
        const response = await fetch(
          "https://raw.githubusercontent.com/gitsofaryan/urunc-ci-dashboard" +
            "/refs/heads/latest-dashboard-data/data/job_stats.json",
        );
        data = await response.json();
      }

      try {
        let jobData = Object.keys(data).map((key) => {
          const job = data[key];
          return { name: key, ...job };
        });

        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);

    // Filter based on required tag.
    let filteredJobs = jobs;
    if (requiredFilter) {
      filteredJobs = filteredJobs.filter((job) => job.required);
    }

    // Set the rows for the table.
    setRows(
      filteredJobs.map((job) => ({
        name: job.name,
        runs: job.runs,
        fails: job.fails,
        skips: job.skips,
        required: job.required,
        weather: getWeatherIndex(job),
      })),
    );
    setLoading(false);
  }, [jobs, requiredFilter]);

  const toggleRow = (rowData) => {
    const isRowExpanded = expandedRows.includes(rowData);

    let updatedExpandedRows;
    if (isRowExpanded) {
      updatedExpandedRows = expandedRows.filter((r) => r !== rowData);
    } else {
      updatedExpandedRows = [...expandedRows, rowData];
    }

    setExpandedRows(updatedExpandedRows);
  };

  const buttonClass = (active) => `tab md:px-4 px-2 py-2 border-2 
    ${
      active
        ? "border-blue-500 bg-blue-500 text-white"
        : "border-gray-300 bg-white hover:bg-gray-100"
    }`;

  // Template for rendering the Name column as a clickable item
  const nameTemplate = (rowData) => {
    return (
      <span onClick={() => toggleRow(rowData)} style={{ cursor: "pointer" }}>
        {rowData.name}
      </span>
    );
  };

  const rowExpansionTemplate = (data) => {
    const job = jobs.find((job) => job.name === data.name);

    // Prepare run data
    const runs = [];
    for (let i = 0; i < job.runs; i++) {
      runs.push({
        run_num: job.run_nums ? job.run_nums[i] : i + 1,
        result: job.results ? job.results[i] : "Unknown",
        url: job.urls ? job.urls[i] : "#",
      });
    }

    return (
      <div key={`${job.name}-runs`} className="p-3 bg-gray-100">
        {/* Display last 10 runs */}
        <div className="flex flex-wrap gap-4">
          {runs.length > 0 ? (
            runs.map((run) => {
              const emoji =
                run.result === "Pass"
                  ? "✅"
                  : run.result === "Fail"
                    ? "❌"
                    : "⚠️";
              return (
                <span key={`${job.name}-runs-${run.run_num}`}>
                  <a href={run.url} target="_blank" rel="noopener noreferrer">
                    {emoji} {run.run_num}
                  </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              );
            })
          ) : (
            <div>No CI Runs associated with this job</div>
          )}
        </div>
      </div>
    );
  };

  const renderTable = () => (
    <DataTable
      value={rows}
      expandedRows={expandedRows}
      stripedRows
      rowExpansionTemplate={rowExpansionTemplate}
      onRowToggle={(e) => setExpandedRows(e.data)}
      loading={loading}
      emptyMessage="No results found."
      sortField="fails"
      sortOrder={-1}
    >
      <Column expander style={{ width: "5rem" }} />
      <Column
        field="name"
        header="Name"
        body={nameTemplate}
        filter
        sortable
        maxConstraints={4}
        filterHeader="Filter by Name"
        filterPlaceholder="Search..."
      />
      <Column field="required" header="Required" sortable />
      <Column field="runs" header="Runs" sortable />
      <Column field="fails" header="Fails" sortable />
      <Column field="skips" header="Skips" sortable />
      <Column
        field="weather"
        header="Weather"
        body={weatherTemplate}
        sortable
      />
    </DataTable>
  );

  return (
    <div className="text-center">
      <Head>
        <title>urunc CI Dashboard</title>
      </Head>

      <h1
        className={
          "text-4xl mt-4 mb-0 underline text-inherit hover:text-blue-500"
        }
      >
        <a
          href={"https://github.com/urunc-dev/urunc/actions"}
          target="_blank"
          rel="noopener noreferrer"
        >
          urunc CI Dashboard
        </a>
      </h1>

      <main
        className={
          "m-0 h-full p-4 overflow-x-hidden overflow-y-auto bg-surface-ground font-normal text-text-color antialiased select-text"
        }
      >
        <button
          className={buttonClass(requiredFilter)}
          onClick={() => setRequiredFilter(!requiredFilter)}
        >
          Required Jobs Only
        </button>
        <div className="mt-4 text-lg">Total Rows: {rows.length}</div>
        <div>{renderTable()}</div>
      </main>
    </div>
  );
}
