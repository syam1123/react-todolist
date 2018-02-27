/**
 * @Author: Syam Pillai <apple>
 * @Date:   2018-02-27T12:07:43+05:30
 * @Email:  syam@wealthy.in
 * @Last modified by:   apple
 * @Last modified time: 2018-02-27T12:07:47+05:30
 */

 const express = require('express');
 const path = require('path');

 const app = express();


 app.use(express.static(path.resolve(__dirname, 'dist')));
 app.use(express.static(path.resolve(__dirname)));

 app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'dist/index.html'));
 });


 const PORT = process.env.PORT || 8080;

 app.listen(PORT, () => {
   console.log(`App listening on port ${PORT}!`);
 });
