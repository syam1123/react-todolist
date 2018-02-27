/**
 * @Author: Syam Pillai <apple>
 * @Date:   2018-02-27T12:23:35+05:30
 * @Email:  syam@wealthy.in
 * @Last modified by:   apple
 * @Last modified time: 2018-02-27T12:23:37+05:30
 */

 const ncp = require('ncp').ncp;
 var mkdirp = require('mkdirp');

 mkdirp('build', function (err) {
   if (err) console.log("error creating build folder")
 });

 if (process.env.BUILD_ENV === "development") {
   ncp('dist/', 'build/dev', function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('done!');
   });
 }
 else {
   ncp('dist/', 'build/prod', function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('done!');
   });
 }
