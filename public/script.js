/* eslint-disable no-unused-vars */

async function delAccount(username) {
  await fetch("/account/" + username, {
    method: 'DELETE'
  })
  location.reload()
}

async function delClient(username) {
  await fetch("/client/" + username, {
    method: 'DELETE'
  })
  location.reload()
}