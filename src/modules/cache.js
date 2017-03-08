import $ from 'jquery'

import {debounce} from './tools'

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

if (typeof(Worker) !== "undefined") {
  cache.promise = {};
  cache.worker = new Worker("worker.js");
  cache.worker.addEventListener('message', function(m) {
    //console.log("Getting message from WebWorker",m.data);
    let d = m.data;
    if(d.cmd === "fetch"){
      cache.store(d.url,d.data);
      cache.promise[d.url].resolve( { data : d.data, from : "live"});
    }
  }, false);

}

cache.reset = function () {
  //console.log("Reseting cache ...");
  cache.data = {};
  localStorage.cache = JSON.stringify(cache.data);
};

cache.backup = debounce(function () {
  //console.log("Saving cache ...");
  localStorage.cache = JSON.stringify(cache.data);
},500);

cache.store = function (id,data) {
  //console.log("Storing obj cache ...",id);
  cache.data[id] = {data: data, at: (new Date().getTime())};
  cache.backup();
};

cache.get = function (url, duration, format, useWebWorker) {
  if(useWebWorker == null){
    useWebWorker = true;
  }
  if (typeof cache.data[url] !== 'undefined' && cache.data[url].at + duration * 1000 > (new Date().getTime())) {
    //We get from cache
    console.log("Getting " + url + " from cache",format);
    return Promise.resolve({ data : cache.data[url].data, from : "cache"});
  } else {
    //We get from web
    if(cache.worker == null || useWebWorker === false){
      //No WebWorker
      console.log("Getting " + url + " from web old way",format);
      return $.get(url,{"u" : new Date().getTime()}, format).then(function (data,state,res) {
        cache.store(url,res.responseText);
        return { data : res.responseText, from : "live"};
      });
    }else{
      //console.log("Getting " + url + " from WebWorker");
      //WebWorker
      var rs,rj;
      console.log("Getting " + url + " from web WebWorker way",format);
      if(cache.promise[url] == null){ //Multiple request same url
        cache.promise[url] = new Promise(function(resolve, reject) {
          rs = resolve;
          rj = reject;
          cache.worker.postMessage({
            cmd : "fetch",
            url : url
          });
        });
        cache.promise[url].resolve = rs;
        cache.promise[url].reject = rj;
      }
      return cache.promise[url];
    }
    /*
    */
  }
};

export default cache
