!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p=".",n(n.s=8)}({8:function(e,t){function n(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t,n,r){var o=new XMLHttpRequest,i={Accept:"application/json, text/plain, */*","Content-Type":"application/json"};o.addEventListener("loadend",(function(){var e=o.response;r({data:e,success:!0})})),o.open(e,"".concat("https://192.168.1.11:8090").concat(n)),o.responseType="json",o.withCredentials=!1,Object.keys(i).forEach((function(e){return o.setRequestHeader(e,i[e])})),o.send(t)}chrome.runtime.onMessageExternal.addListener((function(e,t,r){console.log(e.type),"HELLO"==e.type?r({success:!0}):"SUBMIT"==e.type?function(e,t){var r=0,i=n(e.urls),a=[];i.length>0?function n(u){var c=u,s=function(){if(a.push(c),i.length>0)n(i.pop());else{console.log("Total found: ".concat(r));try{o("POST",JSON.stringify({items:a,email:e.email,id:e.id,consented:e.consented,lottery:e.lottery,other:e.other}),"/api/result",(function(e){return t(e)}))}catch(e){console.log(e)}}};chrome.history.search({text:c.search,maxResults:1e4,startTime:0,endTime:Date.now()-36e5},(function(e){var t=e.length;c.historyItems=e,r+=t,t>0?e.forEach((function(t,n){chrome.history.getVisits({url:t.url},(function(r){t.visitItems=r,n===e.length-1&&s()}))})):s()}))}(i.pop()):t({success:!0})}(e.data,r):"INSTALLSTATUS"==e.type&&function(e,t){o("POST",JSON.stringify(e),"/api/installed",(function(n){"uninstalled"==e.mode&&chrome.management.uninstallSelf(),t(n)}))}(e.data,r)}))}});