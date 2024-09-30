const people = require( "../lib/people" )
const assert = require( "assert" )

describe( "Backend tests", () => {
  let newId, size
  describe( "People api", () => {
    it( "should get list of people", ( done ) => {
      people.get().then( ( res ) => {
        size = res.length
        assert( 0 < size )
        done()
      } )
    } )
    it( "should able to create people", ( done ) => {
      people
        .add( "http://localhost:3000/people", "PUT", {
          name: "test data",
          email: "test@mail.com",
        } )
        .then( ( res ) => {
          newId = res.id
          assert( newId )
          return people.get()
        } )
        .then( res => {
          assert( res.length > size )
          done()
        } )
    } )
    it ( "should able to delete people", function( done ) {
      people.remove( "http://localhost:3000/people", "DELETE", { id: newId } ).then( () => {
        return people.get()
      } )
        .then( res => {
          assert( res.length === size )
          done()
        } )
    } )
  } )
} )
