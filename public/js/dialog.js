import { findancestorbytype } from "./dom.js"
import { removeperson } from "./people.js"

/**
 * Opens the dialog for deleting a person.
 *
 * @param ev - Click event
 *
 * @returns void
 *
 */
export function showDialog( ev ) {
  const dialog = document.querySelector( "dialog" )
  const container = document.querySelector( ".dialog-container" )
  clearDialog()

  const personrow = findancestorbytype( ev.target, "tr" )
  const id = personrow.person.id

  const name = personrow.person.name
  const message = document.createElement( "p" )
  message.innerText = `Are you sure to remove ${name}?`

  const buttonsContainer = document.createElement( "div" )
  buttonsContainer.classList.add( "actions" )

  const cancelButton = document.createElement( "button" )
  cancelButton.innerText = "Cancel"
  cancelButton.addEventListener( "click", () => {
    dialog.close()
  } )

  const confirmButton = document.createElement( "button" )
  confirmButton.innerText = "Delete"
  confirmButton.classList.add( "danger" )
  confirmButton.addEventListener( "click", async () => {
    removeperson( id )
    dialog.close()
  } )

  buttonsContainer.appendChild( confirmButton )
  buttonsContainer.appendChild( cancelButton )

  container.appendChild( message )
  container.appendChild( buttonsContainer )
  dialog.showModal()
}

/**
 * Clear all elements inside the dialog.
 *
 * @returns { void }
 *
 */
function clearDialog() {
  const container = document.querySelector( ".dialog-container" )
  container.innerHTML = ""
}
