import 'babel-polyfill';
import express from 'express';
import api from './api';
import render from './render';
import sitemap from './sitemap';
import path from 'path';

const app = express();
app.use(express.static(__dirname));
// Render Page
render(app);

// Sitemap generation
sitemap();

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
