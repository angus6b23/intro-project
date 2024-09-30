const { openDB } = require( "./db" )

/**
 * @typedef { Object } person
 * @property { number } id
 * @property { string } name - The name of the person.
 * @property { string } email - The email address of the person.
 * @property { string } [ notes ] - Additional notes about the person (optional).
 */

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
  const db = await openDB()
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
    const db = await openDB()
    if( person.id !== undefined ) {
      const res = await db.get( "SELECT * FROM people WHERE id = ?", person.id )
      if( res ) {
        await db.run(
          "UPDATE people SET name = ?, email = ?, notes = ? WHERE id = ?",
          person.name,
          person.email,
          person.notes,
          person.id,
        )
      }
    } else {
      await db.run(
        "INSERT INTO people (name, email, notes) VALUES (?, ?, ?)",
        person.name,
        person.email,
        person.notes,
      )
    }
    return person
  }
  catch ( err ) {
    return err
  }
}

async function remove ( parsedurl, method,  { id } ) {
  try {
    const db = await openDB()
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
