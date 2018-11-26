const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log('helloo');
  response.send('Hello from Shaun"s Firebase!');
});

// exports.makeUppercase = functions.database
//   .ref('/messages/{pushId}/original')
//   .onCreate((snapshot, context) => {
//     // Grab the current value of what was written to the Realtime Database.
//     const original = snapshot.val();
//     console.log('Uppercasing', context.params.pushId, original);
//     const uppercase = original.toUpperCase();
//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to the Firebase Realtime Database.
//     // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//     return snapshot.ref.parent.child('uppercase').set(uppercase);
//   });

exports.compareImages = functions.storage.object().onFinalize(object => {
  console.log('12345', object);
  return object.metadata;
});

// => {
//   request.post(
//     {
//       url: 'https://api.deepai.org/api/image-similarity',
//       headers: {
//         'Api-Key': deepAiKey,
//       },
//       formData: {
//         image1: image.uri,
//         image2: image.uri,
//       },
//     },
//     (callback = (err, httpResponse, body) => {
//       console.log('got in here');
//       if (err) {
//         console.error('request failed:', err);
//         return;
//       }
//       var response = JSON.parse(body);
//       console.log(response);
//     })
//   );
// }

// gsutil -m acl ch -p owners-<city-crawler-db>:O gs://<city-crawler-db.appspot.com/user1>
// gsutil -m acl ch -p editors-<city-crawler-db:O gs://<city-crawler-db.appspot.com/user1>
// gsutil -m acl ch -p viewers-<city-crawler-db>:R gs://<city-crawler-db.appspot.com/user1>
// city-crawler-db.appspot.com/user1
