const functions = require('firebase-functions');
const request = require('request');
var Algorithmia = require('algorithmia');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   console.log('helloo');
//   response.send('Hello from Shaun"s Firebase!');
// });

// // const { deepAiKey } = require('../secrets');
// exports.compareImages = functions.storage.object().onFinalize(object => {
//   console.log('hit compare images');
//   console.log('12345', object);

//   request.post(
//     {
//       url: 'https://api.deepai.org/api/image-similarity',
//       headers: {
//         'Api-Key': 'dee9c22b-8f05-443e-8cfb-f8c4d48f53a7',
//       },
//       formData: {
//         image1: object.mediaLink,
//         image2: object.mediaLink,
//       },
//     },
//     function callback(err, httpResponse, body) {
//       if (err) {
//         console.error('request failed:', err);
//         return;
//       }
//       var response = JSON.parse(body);
//       console.log(response);
//     }
//   );
// });

exports.compareImages2 = functions.database
  .ref('/users/12345/images')
  .onCreate((snapshot, context) => {
    console.log('this is snapshot', snapshot);
    console.log('this is the base64', snapshot._data.image);
    const algoInput = snapshot._data.image;
    var input = [algoInput, algoInput];
    // const client = Algorithmia.client('simU/Rj2U+vuIKeFWywiBm9LBJ41');
    // const theAlgo = client.algo('zskurultay/ImageSimilarity/0.1.4');
    // console.log('algooo', theAlgo);
    let hello;
    Algorithmia.client('simU/Rj2U+vuIKeFWywiBm9LBJ41')
      .algo('zskurultay/ImageSimilarity/0.1.4')
      .pipe(input)
      .then(response => {
        hello = response.get();
        return hello;
      })
      .catch(error => {
        console.log('hello2', error);
        return error;
      });
  });
