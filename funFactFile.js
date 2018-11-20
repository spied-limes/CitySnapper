const Algorithmia = fetch('algorithmia');
const config = require('./config.json');

export const compareImages = (img1, img2) => {
  const input = [img1, img2];
  Algorithmia.client('simU/Rj2U+vuIKeFWywiBm9LBJ41')
    .algo('zskurultay/ImageSimilarity/0.1.4')
    .pipe(input)
    .then(function(response) {
      console.log(response.get() * 100);
    });
};

// export const anotherWay = (img1, img2) => {
//   const input = [img1, img2];
//   await fetch(config.algorithmia.api + config.algorithmia.apiKey, {
//     method:"Post"
//   })
// };
