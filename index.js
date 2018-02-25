// AWS SDK and UUID
const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const Fs = require('fs')

// Time
let moment = require('moment');

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'eu-west-1'
})

// https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
const voiceIDs = [
  // Danish
  //    "Mads", "Naja",
  // Dutch
  //    "Lotte", "Ruben",
  // English (Australian)
  "Nicole", "Russell",
  // English (British) (en-GB)
  "Amy", "Brian", "Emma",
  // English (Indian) (en-IN)
  "Aditi", "Raveena",
  // English (US)
  "Ivy", "Joanna", "Joey", "Justin", "Kendra", "Kimberly", "Matthew", "Salli",
  // English (Welsh)
  "Geraint",
  // French
  //    "Celine", "Mathieu",
  // French (Canadian)
  //    "Chantal",
  // German
  //    "Hans", "Marlene", "Vicki",
  // Icelandic
  //    "Dora", "Karl",
  // Italian
  //    "Carla", "Giorgio",
  // Japanese
  //    "Mizuki", "Takumi",
  // Korean
  //    "Seoyeon",
  // Norwegian
  //    "Liv",
  // Polish
  //    "Ewa", "Jacek", "Jan", "Maja",
  // Portuguese (Brazilian)
  //    "Ricardo", "Vitoria",
  // Portuguese (European)
  //    "Cristiano", "Ines",
  // Romanian
  //    "Carmen",
  // Russian
  //    "Maxim", "Tatyana",
  // Spanish (Castilian)
  //    "Conchita", "Enrique",
  // Spanish (Latin American)
  //    "Miguel", "Penelope",
  // Swedish
  //    "Astrid",
  // Turkish
  //    "Filiz",
  // Welsh
  "Gwyneth"
]

currentTime = moment().format('LT');
voiceID = Math.floor(Math.random() * voiceIDs.length);
voice = voiceIDs[voiceID];

textToSay = "Hi there. This is " + voice + " from Amazon Polly. The time is " + currentTime + ".";
params = {
  'Text': textToSay,
  'OutputFormat': 'mp3',
  'VoiceId': voice
}

console.log("Sending data to " + voice + " at AWS Polly");

Polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
    console.log(err.code)
  } else if (data) {
    if (data.AudioStream instanceof Buffer) {
      // Write to a file
      Fs.writeFile("./speech.mp3", data.AudioStream, function(err) {
        if (err) {
          return console.log(err)
        }
        console.log("MP3 file received.")
      })
    }
  }
});
