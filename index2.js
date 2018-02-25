// warning this may trigger multiple times for one press
// ...usually triggers twice based on testing for each press
const DASH_BUTTON_MAC_ADDRESS = ""  // TODO: Add your Dash Button mac address here.
const dash_button = require('node-dash-button');
const dash = dash_button(DASH_BUTTON_MAC_ADDRESS, null, null, 'all');

// AWS SDK and UUID
const AWS = require('aws-sdk');

// Speaker
const Stream = require('stream')
const Speaker = require('speaker')

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
    "Gwyneth" ]


// Create the Speaker instance
const Player = new Speaker({
    channels: 1,
    bitDepth: 16,
    sampleRate: 16000
  })

// Listen for the Dash button
dash.on("detected", function (dash_id){

    console.log("found dash button: " + dash_id);

    currentTime = moment().format('LT');
    voiceID = Math.floor(Math.random() * voiceIDs.length);
    voice = voiceIDs[voiceID];

    textToSay = "Hi there. This is " + voice + " from Amazon Polly. The time is " + currentTime + ".";
    params = {
        'Text': textToSay,
        'OutputFormat': 'pcm',
        'VoiceId': voice
    }

    console.log("Sending data to " + voice + " at AWS Polly");

    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
            // Initiate the source
            var bufferStream = new Stream.PassThrough()
            // convert AudioStream into a readable stream
            bufferStream.end(data.AudioStream)
            // Pipe into Player
            bufferStream.pipe(Player)

            }
        }
    })

});

console.log("Listening for Dash Button...");
