import 'babel-polyfill';
import express from 'express';
import api from './api';
import render from './render';
import path from 'path';

const app = express();
app.use(express.static(__dirname));
// Router
render(app);
// Api
api(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
