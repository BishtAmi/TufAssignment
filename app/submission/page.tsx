"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Code } from "@chakra-ui/react";

interface DataItem {
  time: string;
  username: string;
  Language: string;
  Code: string;
  Input: string;
}

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const columns = [
    { field: "time", header: "time" },
    { field: "username", header: "username" },
    { field: "Language", header: "Language" },
    { field: "Code", header: "Code" },
    { field: "Input", header: "Input" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/postCode");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const renderTime = (rowData: DataItem) => {
    // Display only the first 12 characters of the timestamp
    return <>{rowData.time.slice(0, 12)}</>;
  };

  const renderCode = (rowData: DataItem) => {
    // Display only the first 100 characters of the code
    return (
      <Code>
        {rowData.Code.slice(0, 100)}
        {rowData.Code.length > 100 && "..."} {/* Show ellipsis if code exceeds 100 characters */}
      </Code>
    );
  };

  return (
    <div>
      <div className="mt-4 mb-2 font-semibold text-xl text-center">
        Submissions
      </div>
      <div className="bg-gray-200  flex justify-center items-center">
        <div className="card text-sm">
          <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
            {columns.map((col, i) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                body={
                  col.field === "time"
                    ? renderTime
                    : col.field === "Code"
                    ? renderCode
                    : undefined
                }
              />
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
}
