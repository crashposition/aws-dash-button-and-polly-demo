# AWS Dash Button and AWS Polly demo

The source code here is for two demos I presented at [Worthing Digital](http://worthingdigital.com/2018/worthing-digital-talks-february-2018/) on Tuesday 20th Feb 2018 as part of my 'Introduction to AWS' session. The slides for the talk can be found here:
https://www.slideshare.net/crashposition/an-introduction-to-aws-88722963

The source code contains two simple NdoeJS apps.

### index.js
This is a demo of AWS Polly. It creates a unique time-stampped string and selects a random voice then sends it to Polly to be turned into audio. The returned MP3 files is saved locally.

### index2.js
This is similar to the AWS Polly demo, but is triggered by an Amazon Dash button. The returned audio is played back.


### Installation
Before you run the demos you'll need to install a few  NodeJS dependencies. From the root folder run:

```npm init```

To run the Dash Button demo you'll need to have already configured your Dash Button according to the [instructions here](https://github.com/hortinstein/node-dash-button), and entered the Dash Button mac address into the first line of index2.js.
