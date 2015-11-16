!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


    if (!loaded)
      doc.addEventListener(domContentLoaded, listener = function () {
        doc.removeEventListener(domContentLoaded, listener)
          loaded = 1
          while (listener = fns.shift()) listener()
      })

      return function (fn) {
        loaded ? setTimeout(fn, 0) : fns.push(fn)
      }

});
domready(function () {
  document.documentElement.className += ' domready';
});

domready(function () {

  var accs = document.querySelectorAll('.js-accordion'), j;
  for (j = 0; j < accs.length; ++j) {

    var h3El = accs[j].querySelectorAll('h3');
    var size = h3El.length, i, h3Node;

    for (i = 0; i < size; i++) {
      h3Node = h3El[i];

      h3Node.setAttribute("class", "toggle");
      h3Node.nextElementSibling.classList.add("closed");

      h3Node.onclick = function () {
        var h3 = this;

        if (h3.getAttribute("class") == "toggle") {
          h3.setAttribute("class", "toggle-active");
          h3.nextElementSibling.classList.remove("closed");
          h3.nextElementSibling.classList.add("opened");
        }
        else {
          h3.setAttribute("class", "toggle");
          h3.nextElementSibling.classList.add("closed");
          h3.nextElementSibling.classList.remove("opened");
        }
      }
    }
  }

});

$("#slideshow > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(3000)
    .next()
    .fadeIn(4000)
    .end()
    .appendTo('#slideshow');
},  5000);
