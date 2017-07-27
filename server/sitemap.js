import sitemap from 'express-sitemap';
import { routes } from '../src/js/routes';

module.exports = () => {
  const date = new Date();
  let month = (date.getMonth() + 1);
  if (month < 10) month = '0' + month;
  const formattedDated = date.getFullYear() + '-' + month + '-' + date.getDate();

  // Get routes
  const sitemapMap = {};
  const sitemapRoutes = {};
  routes.map((route) => {
    if (route.path) {
      const routeEl = {};
      sitemapMap[route.path] = ['get'];
      sitemapRoutes[route.path] = {
        lastmod: formattedDated,
        changefreq: route.changefreq ? route.changefreq : 'always',
        priority: route.priority ? route.priority : 1.0,
      };
    }
  });

  // Generates a sitemap for the page
  sitemap({
    map: sitemapMap,
    route: sitemapRoutes,
    sitemap: 'src/sitemap.xml',
    sitemapSubmission: 'src/sitemap.xml',
  }).XMLtoFile();
};
