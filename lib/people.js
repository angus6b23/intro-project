
/**
 * @typedef { Object } person
 * @property { number } id
 * @property { string } name - The name of the person.
 * @property { string } email - The email address of the person.
 * @property { string } [ notes ] - Additional notes about the person (optional).
 */

const { openDB } = require( "./db" )

/**
 * Initialise database
 */
let db
openDB().then( database => {
  db = database
} )
/**
 * @type { Array< person > }
 */
//const people = [
//  { id: 1, name: "Kermit Frog", email: "", notes: "" },
//  { id: 2, name: "Miss Piggy", email: "", notes: "" },
//];

/**
 * Demo function to return an array of people objects
 * @param { URL } _parsedurl
 * @returns { Promise< Array< person > > }
 */

// eslint-disable-next-line no-unused-vars
async function get( _parsedurl ) {
  const res = await db.all( "SELECT * FROM people" )
  return res
}

/**
 * Demo function adding a person
 * @param { string } parsedurl
 * @param { string } method
 * @param { person } person
 * @return { Promise < object > }
 */
async function add( parsedurl, method, person ) {
  try {
    if( person.id !== undefined ) {
      const res = await db.get( "SELECT * FROM people WHERE id = ?", person.id )
      if( res ) {
        const newRow = await db.get(
          "UPDATE people SET name = ?, email = ?, notes = ? WHERE id = ? RETURNING *;",
          person.name,
          person.email,
          person.notes,
          person.id,
        )
        return newRow
      }
    } else {
      const newRow = await db.get(
        "INSERT INTO people (name, email, notes) VALUES (?, ?, ?) RETURNING *;",
        person.name,
        person.email,
        person.notes,
      )
      return newRow
    }
  }
  catch ( err ) {
    return err
  }
}

async function remove ( parsedurl, method,  { id } ) {
  try {
    await db.run( "DELETE FROM people WHERE id = ?", id )
    return id
  }
  catch ( err ) {
    return err
  }
}

module.exports = {
  get,
  add,
  remove
}
