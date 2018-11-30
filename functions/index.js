const functions = require('firebase-functions');
const request = require('request');
const gcs = require('@google-cloud/storage');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log('helloo');
  response.send('Hello from Shaun"s Firebase!');
});

// const { deepAiKey } = require('../secrets');
exports.compareImages = functions.storage.object().onFinalize(object => {
  console.log('12345', object);

  // const bucket = object.bucket;
  // console.log('bucket', bucket);
  // // const destBucket = gcs.Bucket(bucket);
  // console.log('destBucket', destBucket);
  // const name = object.name;
  // console.log('name', name);
  // const isThisFile = destBucket.file(name);

  request.post(
    {
      url: 'https://api.deepai.org/api/image-similarity',
      headers: {
        'Api-Key': 'dee9c22b-8f05-443e-8cfb-f8c4d48f53a7',
      },
      formData: {
        image1: object.mediaLink,
        image2: object.mediaLink,
      },
    },
    function callback(err, httpResponse, body) {
      if (err) {
        console.error('request failed:', err);
        return;
      }
      var response = JSON.parse(body);
      console.log(response);
    }
  );
});
