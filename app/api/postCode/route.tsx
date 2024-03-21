import { NextRequest, NextResponse } from "next/server";
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const app = express();
app.use(bodyParser.json());
export async function POST(req: NextRequest) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
  });
  const body = await req.json();
  const data = {
    username: body.username,
    Language: body.Language,
    Code: body.Code,
    Input: body.Input,
  };
  try {
    const sql =
      "INSERT INTO code_info (username, Language, Code, Input) VALUES (?, ?, ?, ?)";
    const values = [data.username, data.Language, data.Code, data.Input];
    const [results] = await db.execute(sql, values);
    db.end();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, error: "Database error" });
  }
}

export async function GET(req: NextRequest) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
  });
  const sql = "SELECT * FROM code_info";
  const [results] = await db.query(sql);
  db.end();
  return NextResponse.json(results);
}
