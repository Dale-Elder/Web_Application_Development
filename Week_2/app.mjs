import express from "express";
import Database from "better-sqlite3";

const app = express();
const db = new Database("C:\\Users\\felix\\wadsongs.db");
