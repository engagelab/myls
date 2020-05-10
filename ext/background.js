!(function (e) {
  var t = {}
  function n (r) {
    if (t[r]) return t[r].exports
    var o = (t[r] = { i: r, l: !1, exports: {} })
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
    }),
    (n.r = function (e) {
      typeof Symbol !== 'undefined' &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && typeof e === 'object' && e && e.__esModule) return e
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && typeof e !== 'string')
      ) {
        for (var o in e) {
          n.d(
            r,
            o,
            function (t) {
              return e[t]
            }.bind(null, o)
          )
        }
      }
      return r
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
            return e.default
          }
          : function () {
            return e
          }
      return n.d(t, 'a', t), t
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = '.'),
    n((n.s = 8))
})({
  8: function (e, t) {
    function n (e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return r(e)
        })(e) ||
        (function (e) {
          if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(e)) {
            return Array.from(e)
          }
        })(e) ||
        (function (e, t) {
          if (!e) return
          if (typeof e === 'string') return r(e, t)
          var n = Object.prototype.toString.call(e).slice(8, -1)
          n === 'Object' && e.constructor && (n = e.constructor.name)
          if (n === 'Map' || n === 'Set') return Array.from(n)
          if (
            n === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ) {
            return r(e, t)
          }
        })(e) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        })()
      )
    }
    function r (e, t) {
      (t == null || t > e.length) && (t = e.length)
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
      return r
    }
    function o (e, t, n, r) {
      var o = new XMLHttpRequest(),
        i = {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      o.addEventListener('loadend', function () {
        var e = o.response
        r({ data: e, success: !0 })
      }),
        o.open(e, ''.concat('https://engagelab.uio.no/myls').concat(n)),
        (o.responseType = 'json'),
        (o.withCredentials = !1),
        Object.keys(i).forEach(function (e) {
          return o.setRequestHeader(e, i[e])
        }),
        o.send(t)
    }
    chrome.runtime.onMessageExternal.addListener(function (e, t, r) {
      console.log(e.type),
        e.type == 'HELLO'
          ? r({ success: !0 })
          : e.type == 'SUBMIT'
          ? (function (e, t) {
            var r = 0,
              i = n(e.urls),
              a = []
            i.length > 0
                ? (function n (u) {
                  var c = u,
                    s = function () {
                      if ((a.push(c), i.length > 0)) n(i.pop())
                      else {
                        console.log('Total found: '.concat(r))
                        try {
                          o(
                              'POST',
                              JSON.stringify({
                                items: a,
                                email: e.email,
                                id: e.id,
                                consented: e.consented,
                                lottery: e.lottery
                              }),
                              '/api/result',
                              function (e) {
                                return t(e)
                              }
                            )
                        } catch (e) {
                          console.log(e)
                        }
                      }
                    }
                  chrome.history.search(
                    {
                      text: c.search,
                      maxResults: 1e4,
                      startTime: 0,
                      endTime: Date.now() - 36e5
                    },
                      function (e) {
                        var t = e.length;
                        (c.historyItems = e),
                          (r += t),
                          t > 0
                            ? e.forEach(function (t, n) {
                              chrome.history.getVisits(
                                  { url: t.url },
                                  function (r) {
                                    (t.visitItems = r),
                                      n === e.length - 1 && s()
                                  }
                                )
                            })
                            : s()
                      }
                    )
                })(i.pop())
                : t({ success: !0 })
          })(e.data, r)
          : e.type == 'INSTALLSTATUS' &&
            (function (e, t) {
              o('POST', JSON.stringify(e), '/api/installed', function (n) {
                e.mode == 'uninstalled' && chrome.management.uninstallSelf(),
                  t(n)
              })
            })(e.data, r)
    })
  }
})
