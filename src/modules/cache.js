if (typeof window.cache === 'undefined') {
    window.cache = {
      data: {}
    };
    if (typeof localStorage.cache !== 'undefined') {
      console.log("Restoring cache from localstorage");
      cache.data = JSON.parse(localStorage.cache);
    }
}
var cache = window.cache;

cache.reset = function () {
  console.log("Reseting cache ...");
  cache.data = {};
  localStorage.cache = JSON.stringify(cache.data);
};

cache.get = function (url, duration, format) {
  if (typeof cache.data[url] !== 'undefined' && cache.data[url].at + duration * 1000 > (new Date().getTime())) {
    //We get from cache
    console.log("Getting " + url + " from cache",format);
    return Promise.resolve({ data : cache.data[url].data, from : "cache"});
  } else {
    //We get from web
    console.log("Getting " + url + " from web",format);
    return $.get(url,{"u" : new Date().getTime()}, format).then(function (data,state,res) {
      cache.data[url] = {data: res.responseText, at: (new Date().getTime())};
      localStorage.cache = JSON.stringify(cache.data);
      return { data : cache.data[url].data, from : "live"};
    });
  }
};


export default cache
