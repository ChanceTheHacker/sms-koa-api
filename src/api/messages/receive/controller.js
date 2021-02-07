const messenger = require('./model')

exports.receive = async function (To, from, nickname, message) {
  // currently only supports **ONE USER**
  // normally each user will need their own number, so this would use the 'to' property
  // and check the database to find their proper user_id
  // currently authentication is only here to keep people from snooping the database
  // This grabs the first user id in the database, but can easily be extended to 
  // get corresponding user_id using the "to"(to_phone) property
  const { id } = await messenger.provideFirstUserId()

  // remove the plus signs
  // const to = To.replace('+', '')
  from = `+${from}`

  console.log({id, from, nickname, message})

  const { user_id: returned_id } = await messenger.receive(id, from, nickname, message)
  // destructure & renames return property and checks against sent property
  // this is just to confirm that the input was a success
  // probably some better way to do this..
  return returned_id === id ? true : false
}