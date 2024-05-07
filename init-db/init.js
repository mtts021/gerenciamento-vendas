import { connection } from "../src/database/connection.js";
import fs from 'fs/promises'
import path from "path";

const FILE_PATH = path.join(process.cwd() + '/init-db/init.sql')
console.log(FILE_PATH)
const sql = await fs.readFile(FILE_PATH)
const result = await connection.query(sql.toString())
console.log(result)
await connection.end()