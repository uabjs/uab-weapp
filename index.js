function getOpenGraphData(url) {
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const metaTags = doc.querySelectorAll('head meta[property^="og:"]');
      const data = {};
      metaTags.forEach(tag => {
        const property = tag.getAttribute('property').replace(/^og:/, '');
        const value = tag.getAttribute('content');
        data[property] = value;
      });
      return data;
    });
}
getOpenGraphData('http://www.baidu.com').then(data => console.log(data));