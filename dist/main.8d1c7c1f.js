// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
//图片切换
var $touchlogo = $('.touchlogo');
var $baidu_big = $('.baidu_big');
var $searchlogo = $('.searchlogo'); //其他功能

var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x); //把字符串变成对象

var hashMap = xObject || [{
  logo: 'D',
  logoSrc: 'images/douyu.png',
  logoType: 'image',
  url: 'http://www.douyu.com'
}, {
  logo: 'B',
  logoSrc: 'images/bilibili.png',
  logoType: 'image',
  url: 'https://www.bilibili.com'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //清除/开头的内容
};

var isimage = function isimage(logoType, node) {
  if (logoType === 'image') {
    return '<img src="' + "".concat(node.logoSrc) + '"alt="">';
  } else {
    return "".concat(node.logo[0]);
  }
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n        <li>\n          <div class=\"site\">\n            <div class=\"logo\">".concat(isimage(node.logoType, node), "</div>\n            <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n            <div class=\"close\">\n                <svg class=\"icon\">\n                    <use xlink:href=\"#icon-close\"></use>\n                </svg>\n            </div>\n          </div>\n        </li>\n        ")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation(); //阻止冒泡

      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请输入添加网址：');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: 'text',
    url: url
  });
  render();
}); // $(window).on('beforeunload',()=>{
//     const string =JSON.stringify(hashMap) //把对象变成字符串
//     localStorage.setItem('x',string)
// })

$(document).on('keypress', function (e) {
  var key = e.key;
  hashMap.forEach(function (node) {
    if (node.logo.toLowerCase() === key) {
      window.open(node.url);
    }
  });
});
$touchlogo.on('click', function () {
  $touchlogo.find('.baidu').fadeToggle(0).siblings('.google').fadeToggle(0);
  $searchlogo.find('.baidu_big').fadeToggle(0).siblings('.google_big').fadeToggle(0);

  if ($('.baidu').css('display') !== 'none') {
    $('.searchForm').prop('action', 'https://www.baidu.com/s');
  } else {
    $('.searchForm').prop('action', 'https://www.google.com/search?');
  }

  console.log($('.searchForm').prop('action'));
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.8d1c7c1f.js.map