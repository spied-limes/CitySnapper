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
  .ref('/users/12345/images') //needs to be tweaked
  .onCreate((snapshot, context) => {
    const algoInput = snapshot._data.image;
    console.log(algoInput);

    var input = [
      'data:image/jpeg;base64,' + algoInput,
      'data:image/jpeg;base64,' + algoInput,
    ];
    let hello;

    const newClient = Algorithmia.client('simU/Rj2U+vuIKeFWywiBm9LBJ41');

    // console.log('this is in algo client', newClient);
    // console.log('hello', newClient.algo);
    // console.log(
    //   'this is in another thing ',
    //   newClient.algo('zskurultay/ImageSimilarity/0.1.4').__proto__
    // );
    // console.log(
    //   '!!@#!@#!@#!23 ',
    //   newClient.algo('zskurultay/ImageSimilarity/0.1.4').pipe
    // );
    // console.log(
    //   'hello world ',
    //   newClient.algo('zskurultay/ImageSimilarity/0.1.4').pipe(input)
    // );
    const answer = newClient
      .algo('zskurultay/ImageSimilarity/0.1.4')
      .pipe(input)
      .then(response => {
        hello = response.get();
        return response.get(); //you need to change this return statement so that it records the answer and sends it to the client
      });

    return -hello;
    //create ref for database
    //put hello into database
    //when the database updates --> client needs to hear it
  });
