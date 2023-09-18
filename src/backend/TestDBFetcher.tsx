export default function fetchFromDB() {const {Client} = require("pg")

const client = new Client({
    user: "postgres",
    host: "localhost',
    database: 'sylvanArchiveDB',
    password: '9973',
    port: 5432
})

client.connect()
.then(() => {
    console.log("connected to database")

    const query = "SELECT * FROM satesttable";
    return client.query(query)
})
.then((result) => {
    console.log("fetched data:", result.rows)
    clent.end
})
.catch((error) => {
    console.error("error connecting the database", error)
})}