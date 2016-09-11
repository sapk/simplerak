
export function debounce (fnct,time) {
  var r = null;
  return function() {
      var n = this, i = arguments;
      clearTimeout(r), r = setTimeout(function() {
          fnct.apply(n, i);
      }, time);
  };
}

export function remove (text, strs) {
  for (i = 0; i < strs.length; i++) {
    var str = strs[i];
    while(text.indexOf(str)>-1) {
      text=text.replace(str,"");
    }
  }
  return text;
}
export function parseData (textDate) {
  var tmp = textDate.split('/');
  return new Date(tmp[1]+"/"+tmp[0]+"/"+tmp[2]);
}
export function parseMeal (textMeal) {
  //<A HREF=http://services.telecom-bretagne.eu/rak/plat.php?id_plat=400 >Spaghettis bolognaise
  let tmp = (/^<A HREF=http:\/\/services\.telecom-bretagne\.eu\/rak\/plat\.php\?id_plat=(.*) >(.*)$/g).exec(textMeal);
  return {
    id : tmp[1],
    name : tmp[2]
  };
}
export function App () {
  return window.router.app.$children[0];
}
export function isLogged (d) {
    return $(d).find("h1.home").length;
}
export function getForm (d, selector) {
    if (!selector)
        selector = ".tx-newloginbox-pi1 form";

    data = $(d).find(selector).serializeArray();
    var form = {};
    $.map(data, function (n, i) {
        form[n['name']] = n['value'];
    });
    return form;
}
