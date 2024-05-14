import pkg from 'pg'
const {Pool} = pkg
import dotenv from 'dotenv'

dotenv.config()

const connection = new Pool({connectionString: process.env.CONNECTION_STRING})
// eslint-disable-next-line no-unused-vars
connection.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }

})

export { connection }