const { accountSid, authToken } = require(process.env.CREDENTIALS);
const options = require(process.env.OPTIONS);
const client = require('twilio')(accountSid, authToken);
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const service = client.notify.services(options.service);

rl.setPrompt('[SEND] >> ');
rl.prompt();
rl.on('line', input => {
  rl.pause();
  service.notifications.create({
    tag: 'recipient',
    body: input
  }).then(notification => {
    console.log('Sent! ' + notification.sid);
    rl.prompt();
  })
    .catch(error => {
      console.log('Error: ' + error);
      rl.prompt();
    });
});