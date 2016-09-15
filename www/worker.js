
self.addEventListener('message', function(m) {
  /*
  self.postMessage({
    cmd : "info",
    data : "message receive : "+JSON.stringify(m.data)
  });
  */
  let d = m.data;
  switch (d.cmd) {
    case "fetch":
        fetch(d.url, function(xhr) {
          self.postMessage({
            cmd : d.cmd,
            url : d.url,
            data : xhr.responseText
          });
        });
      break;
    default:
  }
}, false);

//simple XHR request in pure raw JavaScript
function fetch(url, callback) {
  /*
  self.postMessage({
    cmd : "info",
    data : "fetch start"
  });
  */
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = ensureReadiness;

  function ensureReadiness() {
    if(xhr.readyState < 4) {
      return;
    }
    if(xhr.status !== 200) {
      return;
    }
    // all is well
    if(xhr.readyState === 4) {
      callback(xhr);
    }
  }
  xhr.open('GET', url, true);
  xhr.send('');
}
