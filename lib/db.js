const sqlite3 = require( "sqlite3" )
const { open } = require( "sqlite" )

/**
 * Opens database at the data directory
 *
 * @returns { Promise } <Database<Database, Statement>>
 */
async function openDB() {
  return open( {
    filename: "./data/data.db",
    driver: sqlite3.Database,
  } )
}

module.exports = {
  openDB,
}
