const messenger = require('./model')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

exports.send = async function (id, to, nickname, message) {

  const isValidated = await messenger.validateId(id)
  if(isValidated){
    const data = await messenger.send(id, to_phone = to, nickname, message)
    console.log(data)
    if (data.user_id === id){
      return await twilio.messages
        .create({
          body: data.message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+${data.to_phone}`
        })
        .then(message => message);
    } else {
      return false
    }
  } else {
    return false
}
}