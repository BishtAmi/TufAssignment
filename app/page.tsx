"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
export default function Home() {
  const [name, setName] = useState("");
  const [lang, setLang] = useState("");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [outputDetails, setOutputDetails] = useState("");
  const [processing, setProcessing] = useState<any | null>(null);
  const handelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value);
  };
  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(name, lang, code, input);
      const response = await fetch("http://localhost:3000/api/postCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          Language: lang,
          Code: code,
          Input: input,
        }),
      });

      if (response.ok) {
        console.log("Data inserted successfully");
      } else {
        console.error("Failed to insert data");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };
  // const handleCompile = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log("started");
  //   const options = {
  //     method: "POST",
  //     url: "https://judge0-ce.p.rapidapi.com/submissions",
  //     params: {
  //       base64_encoded: "true",
  //       fields: "*",
  //     },
  //     headers: {
  //       "content-type": "application/json",
  //       "Content-Type": "application/json",
  //       "X-RapidAPI-Key": "fa9df5156fmshc19b2747d96cccbp151633jsn824f2cdd345f",
  //       "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  //     },
  //     data: {
  //       language_id: 92,
  //       source_code: code,
  //       stdin: input,
  //     },
  //   };
  //   console.log("check", options.data.source_code);
  //   // const response = await axios.request(options);
  //   // console.log(response.data);
  //   try {
  //     const response = await axios.request(options);
  //     console.log("try", response.data.status?.id);
  //     const op = response.data.token;
  //     const options1 = {
  //       method: "GET",
  //       //url: "https://judge0-ce.p.rapidapi.com/languages",
  //       url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + op,
  //       params: {
  //         base64_encoded: "true",
  //         fields: "*",
  //       },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "fa9df5156fmshc19b2747d96cccbp151633jsn824f2cdd345f",
  //         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  //       },
  //     };
  //     try {
  //       const response = await axios.request(options1);
  //       console.log("msg:", response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } catch (error) {
  //     console.log("err");
  //     console.error(error);
  //   }
  // };
  return (
    <div>
      <div className="flex justify-between">
        <Link href="/">
          <div className="mt-2 font-bold text-3xl text-blue-500">
            TUF Editor
          </div>
        </Link>

        <Link href="/submission">
          <div className="mt-4 mb-2 font-semibold	text-xl text-right">
            Submissions
          </div>
        </Link>
      </div>
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <form
          onSubmit={handelSubmit}
          style={{ maxWidth: "400px", margin: "0 auto" }} // Example styling
        >
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              style={{ width: "50%" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="language">Preferred Language:</label>
            <select onChange={handelSelect}>
              <option value="cpp">Select a option</option>
              <option value="1">cpp</option>
              <option value="Java">Java</option>
              <option value="python">python</option>
              <option value="Rust">Rust</option>
            </select>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="code">Code</label>
            <textarea
              onChange={(e) => setCode(e.target.value)}
              style={{ width: "140%", minHeight: "200px" }}
            ></textarea>
          </div>
          <label htmlFor="input">Input</label>
          <div style={{ marginBottom: "1rem" }}>
            <textarea
              onChange={(e) => setInput(e.target.value)}
              style={{ width: "60%", minHeight: "50px" }}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-auto bg-gray-800 text-white rounded-md px-4 py-2"
            style={{ width: "50%" }}
          >
            Submit
          </button>
          {/* <button
            onClick={handleCompile}
            className="w-auto bg-gray-800 text-white rounded-md px-4 py-2"
            style={{ width: "50%" }}
          >
            compile and run
          </button> */}
        </form>
        {outputDetails}
      </div>
    </div>
  );
}
