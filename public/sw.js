importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  const filesToCache = [
    '/styles/inline.css?v=1',
    '/scripts/app.js?v=1',
  ];
  workbox.precaching.precacheAndRoute([
    ...filesToCache,
    { url: '/index.html', revision: null },
  ], {
    directoryIndex: null,
  });

  workbox.routing.registerRoute(
    ({ url }) => ['/', '/index.html'].some(url.endsWith),
    // 參考 這邊怎麼寫
    // https://developers.google.com/web/tools/workbox/modules/workbox-routing
    new StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

function getUrlParameter(url, name) {
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(url);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
