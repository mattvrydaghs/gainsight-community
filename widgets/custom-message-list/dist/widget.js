var Wo = Object.defineProperty;
var $o = (_, d, M) => d in _ ? Wo(_, d, { enumerable: !0, configurable: !0, writable: !0, value: M }) : _[d] = M;
var xu = (_, d, M) => $o(_, typeof d != "symbol" ? d + "" : d, M);
var ci = { exports: {} }, ze = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hv;
function ko() {
  if (hv) return ze;
  hv = 1;
  var _ = Symbol.for("react.transitional.element"), d = Symbol.for("react.fragment");
  function M(m, $, al) {
    var I = null;
    if (al !== void 0 && (I = "" + al), $.key !== void 0 && (I = "" + $.key), "key" in $) {
      al = {};
      for (var yl in $)
        yl !== "key" && (al[yl] = $[yl]);
    } else al = $;
    return $ = al.ref, {
      $$typeof: _,
      type: m,
      key: I,
      ref: $ !== void 0 ? $ : null,
      props: al
    };
  }
  return ze.Fragment = d, ze.jsx = M, ze.jsxs = M, ze;
}
var mv;
function Fo() {
  return mv || (mv = 1, ci.exports = ko()), ci.exports;
}
var j = Fo(), fi = { exports: {} }, Te = {}, ii = { exports: {} }, si = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gv;
function Io() {
  return gv || (gv = 1, (function(_) {
    function d(r, O) {
      var B = r.length;
      r.push(O);
      l: for (; 0 < B; ) {
        var el = B - 1 >>> 1, il = r[el];
        if (0 < $(il, O))
          r[el] = O, r[B] = il, B = el;
        else break l;
      }
    }
    function M(r) {
      return r.length === 0 ? null : r[0];
    }
    function m(r) {
      if (r.length === 0) return null;
      var O = r[0], B = r.pop();
      if (B !== O) {
        r[0] = B;
        l: for (var el = 0, il = r.length, y = il >>> 1; el < y; ) {
          var E = 2 * (el + 1) - 1, D = r[E], H = E + 1, G = r[H];
          if (0 > $(D, B))
            H < il && 0 > $(G, D) ? (r[el] = G, r[H] = B, el = H) : (r[el] = D, r[E] = B, el = E);
          else if (H < il && 0 > $(G, B))
            r[el] = G, r[H] = B, el = H;
          else break l;
        }
      }
      return O;
    }
    function $(r, O) {
      var B = r.sortIndex - O.sortIndex;
      return B !== 0 ? B : r.id - O.id;
    }
    if (_.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var al = performance;
      _.unstable_now = function() {
        return al.now();
      };
    } else {
      var I = Date, yl = I.now();
      _.unstable_now = function() {
        return I.now() - yl;
      };
    }
    var N = [], A = [], W = 1, p = null, vl = 3, Gl = !1, Hl = !1, Rl = !1, Zl = !1, Ql = typeof setTimeout == "function" ? setTimeout : null, _t = typeof clearTimeout == "function" ? clearTimeout : null, Dl = typeof setImmediate < "u" ? setImmediate : null;
    function Tl(r) {
      for (var O = M(A); O !== null; ) {
        if (O.callback === null) m(A);
        else if (O.startTime <= r)
          m(A), O.sortIndex = O.expirationTime, d(N, O);
        else break;
        O = M(A);
      }
    }
    function Vl(r) {
      if (Rl = !1, Tl(r), !Hl)
        if (M(N) !== null)
          Hl = !0, ml || (ml = !0, Kl());
        else {
          var O = M(A);
          O !== null && zt(Vl, O.startTime - r);
        }
    }
    var ml = !1, x = -1, Ll = 5, Mt = -1;
    function Zu() {
      return Zl ? !0 : !(_.unstable_now() - Mt < Ll);
    }
    function Ot() {
      if (Zl = !1, ml) {
        var r = _.unstable_now();
        Mt = r;
        var O = !0;
        try {
          l: {
            Hl = !1, Rl && (Rl = !1, _t(x), x = -1), Gl = !0;
            var B = vl;
            try {
              t: {
                for (Tl(r), p = M(N); p !== null && !(p.expirationTime > r && Zu()); ) {
                  var el = p.callback;
                  if (typeof el == "function") {
                    p.callback = null, vl = p.priorityLevel;
                    var il = el(
                      p.expirationTime <= r
                    );
                    if (r = _.unstable_now(), typeof il == "function") {
                      p.callback = il, Tl(r), O = !0;
                      break t;
                    }
                    p === M(N) && m(N), Tl(r);
                  } else m(N);
                  p = M(N);
                }
                if (p !== null) O = !0;
                else {
                  var y = M(A);
                  y !== null && zt(
                    Vl,
                    y.startTime - r
                  ), O = !1;
                }
              }
              break l;
            } finally {
              p = null, vl = B, Gl = !1;
            }
            O = void 0;
          }
        } finally {
          O ? Kl() : ml = !1;
        }
      }
    }
    var Kl;
    if (typeof Dl == "function")
      Kl = function() {
        Dl(Ot);
      };
    else if (typeof MessageChannel < "u") {
      var Tu = new MessageChannel(), Rt = Tu.port2;
      Tu.port1.onmessage = Ot, Kl = function() {
        Rt.postMessage(null);
      };
    } else
      Kl = function() {
        Ql(Ot, 0);
      };
    function zt(r, O) {
      x = Ql(function() {
        r(_.unstable_now());
      }, O);
    }
    _.unstable_IdlePriority = 5, _.unstable_ImmediatePriority = 1, _.unstable_LowPriority = 4, _.unstable_NormalPriority = 3, _.unstable_Profiling = null, _.unstable_UserBlockingPriority = 2, _.unstable_cancelCallback = function(r) {
      r.callback = null;
    }, _.unstable_forceFrameRate = function(r) {
      0 > r || 125 < r ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Ll = 0 < r ? Math.floor(1e3 / r) : 5;
    }, _.unstable_getCurrentPriorityLevel = function() {
      return vl;
    }, _.unstable_next = function(r) {
      switch (vl) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = vl;
      }
      var B = vl;
      vl = O;
      try {
        return r();
      } finally {
        vl = B;
      }
    }, _.unstable_requestPaint = function() {
      Zl = !0;
    }, _.unstable_runWithPriority = function(r, O) {
      switch (r) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          r = 3;
      }
      var B = vl;
      vl = r;
      try {
        return O();
      } finally {
        vl = B;
      }
    }, _.unstable_scheduleCallback = function(r, O, B) {
      var el = _.unstable_now();
      switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? el + B : el) : B = el, r) {
        case 1:
          var il = -1;
          break;
        case 2:
          il = 250;
          break;
        case 5:
          il = 1073741823;
          break;
        case 4:
          il = 1e4;
          break;
        default:
          il = 5e3;
      }
      return il = B + il, r = {
        id: W++,
        callback: O,
        priorityLevel: r,
        startTime: B,
        expirationTime: il,
        sortIndex: -1
      }, B > el ? (r.sortIndex = B, d(A, r), M(N) === null && r === M(A) && (Rl ? (_t(x), x = -1) : Rl = !0, zt(Vl, B - el))) : (r.sortIndex = il, d(N, r), Hl || Gl || (Hl = !0, ml || (ml = !0, Kl()))), r;
    }, _.unstable_shouldYield = Zu, _.unstable_wrapCallback = function(r) {
      var O = vl;
      return function() {
        var B = vl;
        vl = O;
        try {
          return r.apply(this, arguments);
        } finally {
          vl = B;
        }
      };
    };
  })(si)), si;
}
var Sv;
function Po() {
  return Sv || (Sv = 1, ii.exports = Io()), ii.exports;
}
var yi = { exports: {} }, Y = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bv;
function lh() {
  if (bv) return Y;
  bv = 1;
  var _ = Symbol.for("react.transitional.element"), d = Symbol.for("react.portal"), M = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), $ = Symbol.for("react.profiler"), al = Symbol.for("react.consumer"), I = Symbol.for("react.context"), yl = Symbol.for("react.forward_ref"), N = Symbol.for("react.suspense"), A = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), vl = Symbol.iterator;
  function Gl(y) {
    return y === null || typeof y != "object" ? null : (y = vl && y[vl] || y["@@iterator"], typeof y == "function" ? y : null);
  }
  var Hl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Rl = Object.assign, Zl = {};
  function Ql(y, E, D) {
    this.props = y, this.context = E, this.refs = Zl, this.updater = D || Hl;
  }
  Ql.prototype.isReactComponent = {}, Ql.prototype.setState = function(y, E) {
    if (typeof y != "object" && typeof y != "function" && y != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, y, E, "setState");
  }, Ql.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function _t() {
  }
  _t.prototype = Ql.prototype;
  function Dl(y, E, D) {
    this.props = y, this.context = E, this.refs = Zl, this.updater = D || Hl;
  }
  var Tl = Dl.prototype = new _t();
  Tl.constructor = Dl, Rl(Tl, Ql.prototype), Tl.isPureReactComponent = !0;
  var Vl = Array.isArray;
  function ml() {
  }
  var x = { H: null, A: null, T: null, S: null }, Ll = Object.prototype.hasOwnProperty;
  function Mt(y, E, D) {
    var H = D.ref;
    return {
      $$typeof: _,
      type: y,
      key: E,
      ref: H !== void 0 ? H : null,
      props: D
    };
  }
  function Zu(y, E) {
    return Mt(y.type, E, y.props);
  }
  function Ot(y) {
    return typeof y == "object" && y !== null && y.$$typeof === _;
  }
  function Kl(y) {
    var E = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(D) {
      return E[D];
    });
  }
  var Tu = /\/+/g;
  function Rt(y, E) {
    return typeof y == "object" && y !== null && y.key != null ? Kl("" + y.key) : E.toString(36);
  }
  function zt(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (typeof y.status == "string" ? y.then(ml, ml) : (y.status = "pending", y.then(
          function(E) {
            y.status === "pending" && (y.status = "fulfilled", y.value = E);
          },
          function(E) {
            y.status === "pending" && (y.status = "rejected", y.reason = E);
          }
        )), y.status) {
          case "fulfilled":
            return y.value;
          case "rejected":
            throw y.reason;
        }
    }
    throw y;
  }
  function r(y, E, D, H, G) {
    var Z = typeof y;
    (Z === "undefined" || Z === "boolean") && (y = null);
    var ll = !1;
    if (y === null) ll = !0;
    else
      switch (Z) {
        case "bigint":
        case "string":
        case "number":
          ll = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case _:
            case d:
              ll = !0;
              break;
            case W:
              return ll = y._init, r(
                ll(y._payload),
                E,
                D,
                H,
                G
              );
          }
      }
    if (ll)
      return G = G(y), ll = H === "" ? "." + Rt(y, 0) : H, Vl(G) ? (D = "", ll != null && (D = ll.replace(Tu, "$&/") + "/"), r(G, E, D, "", function(Da) {
        return Da;
      })) : G != null && (Ot(G) && (G = Zu(
        G,
        D + (G.key == null || y && y.key === G.key ? "" : ("" + G.key).replace(
          Tu,
          "$&/"
        ) + "/") + ll
      )), E.push(G)), 1;
    ll = 0;
    var Xl = H === "" ? "." : H + ":";
    if (Vl(y))
      for (var bl = 0; bl < y.length; bl++)
        H = y[bl], Z = Xl + Rt(H, bl), ll += r(
          H,
          E,
          D,
          Z,
          G
        );
    else if (bl = Gl(y), typeof bl == "function")
      for (y = bl.call(y), bl = 0; !(H = y.next()).done; )
        H = H.value, Z = Xl + Rt(H, bl++), ll += r(
          H,
          E,
          D,
          Z,
          G
        );
    else if (Z === "object") {
      if (typeof y.then == "function")
        return r(
          zt(y),
          E,
          D,
          H,
          G
        );
      throw E = String(y), Error(
        "Objects are not valid as a React child (found: " + (E === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : E) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ll;
  }
  function O(y, E, D) {
    if (y == null) return y;
    var H = [], G = 0;
    return r(y, H, "", "", function(Z) {
      return E.call(D, Z, G++);
    }), H;
  }
  function B(y) {
    if (y._status === -1) {
      var E = y._result;
      E = E(), E.then(
        function(D) {
          (y._status === 0 || y._status === -1) && (y._status = 1, y._result = D);
        },
        function(D) {
          (y._status === 0 || y._status === -1) && (y._status = 2, y._result = D);
        }
      ), y._status === -1 && (y._status = 0, y._result = E);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var el = typeof reportError == "function" ? reportError : function(y) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var E = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y),
        error: y
      });
      if (!window.dispatchEvent(E)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", y);
      return;
    }
    console.error(y);
  }, il = {
    map: O,
    forEach: function(y, E, D) {
      O(
        y,
        function() {
          E.apply(this, arguments);
        },
        D
      );
    },
    count: function(y) {
      var E = 0;
      return O(y, function() {
        E++;
      }), E;
    },
    toArray: function(y) {
      return O(y, function(E) {
        return E;
      }) || [];
    },
    only: function(y) {
      if (!Ot(y))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return y;
    }
  };
  return Y.Activity = p, Y.Children = il, Y.Component = Ql, Y.Fragment = M, Y.Profiler = $, Y.PureComponent = Dl, Y.StrictMode = m, Y.Suspense = N, Y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = x, Y.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(y) {
      return x.H.useMemoCache(y);
    }
  }, Y.cache = function(y) {
    return function() {
      return y.apply(null, arguments);
    };
  }, Y.cacheSignal = function() {
    return null;
  }, Y.cloneElement = function(y, E, D) {
    if (y == null)
      throw Error(
        "The argument must be a React element, but you passed " + y + "."
      );
    var H = Rl({}, y.props), G = y.key;
    if (E != null)
      for (Z in E.key !== void 0 && (G = "" + E.key), E)
        !Ll.call(E, Z) || Z === "key" || Z === "__self" || Z === "__source" || Z === "ref" && E.ref === void 0 || (H[Z] = E[Z]);
    var Z = arguments.length - 2;
    if (Z === 1) H.children = D;
    else if (1 < Z) {
      for (var ll = Array(Z), Xl = 0; Xl < Z; Xl++)
        ll[Xl] = arguments[Xl + 2];
      H.children = ll;
    }
    return Mt(y.type, G, H);
  }, Y.createContext = function(y) {
    return y = {
      $$typeof: I,
      _currentValue: y,
      _currentValue2: y,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, y.Provider = y, y.Consumer = {
      $$typeof: al,
      _context: y
    }, y;
  }, Y.createElement = function(y, E, D) {
    var H, G = {}, Z = null;
    if (E != null)
      for (H in E.key !== void 0 && (Z = "" + E.key), E)
        Ll.call(E, H) && H !== "key" && H !== "__self" && H !== "__source" && (G[H] = E[H]);
    var ll = arguments.length - 2;
    if (ll === 1) G.children = D;
    else if (1 < ll) {
      for (var Xl = Array(ll), bl = 0; bl < ll; bl++)
        Xl[bl] = arguments[bl + 2];
      G.children = Xl;
    }
    if (y && y.defaultProps)
      for (H in ll = y.defaultProps, ll)
        G[H] === void 0 && (G[H] = ll[H]);
    return Mt(y, Z, G);
  }, Y.createRef = function() {
    return { current: null };
  }, Y.forwardRef = function(y) {
    return { $$typeof: yl, render: y };
  }, Y.isValidElement = Ot, Y.lazy = function(y) {
    return {
      $$typeof: W,
      _payload: { _status: -1, _result: y },
      _init: B
    };
  }, Y.memo = function(y, E) {
    return {
      $$typeof: A,
      type: y,
      compare: E === void 0 ? null : E
    };
  }, Y.startTransition = function(y) {
    var E = x.T, D = {};
    x.T = D;
    try {
      var H = y(), G = x.S;
      G !== null && G(D, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(ml, el);
    } catch (Z) {
      el(Z);
    } finally {
      E !== null && D.types !== null && (E.types = D.types), x.T = E;
    }
  }, Y.unstable_useCacheRefresh = function() {
    return x.H.useCacheRefresh();
  }, Y.use = function(y) {
    return x.H.use(y);
  }, Y.useActionState = function(y, E, D) {
    return x.H.useActionState(y, E, D);
  }, Y.useCallback = function(y, E) {
    return x.H.useCallback(y, E);
  }, Y.useContext = function(y) {
    return x.H.useContext(y);
  }, Y.useDebugValue = function() {
  }, Y.useDeferredValue = function(y, E) {
    return x.H.useDeferredValue(y, E);
  }, Y.useEffect = function(y, E) {
    return x.H.useEffect(y, E);
  }, Y.useEffectEvent = function(y) {
    return x.H.useEffectEvent(y);
  }, Y.useId = function() {
    return x.H.useId();
  }, Y.useImperativeHandle = function(y, E, D) {
    return x.H.useImperativeHandle(y, E, D);
  }, Y.useInsertionEffect = function(y, E) {
    return x.H.useInsertionEffect(y, E);
  }, Y.useLayoutEffect = function(y, E) {
    return x.H.useLayoutEffect(y, E);
  }, Y.useMemo = function(y, E) {
    return x.H.useMemo(y, E);
  }, Y.useOptimistic = function(y, E) {
    return x.H.useOptimistic(y, E);
  }, Y.useReducer = function(y, E, D) {
    return x.H.useReducer(y, E, D);
  }, Y.useRef = function(y) {
    return x.H.useRef(y);
  }, Y.useState = function(y) {
    return x.H.useState(y);
  }, Y.useSyncExternalStore = function(y, E, D) {
    return x.H.useSyncExternalStore(
      y,
      E,
      D
    );
  }, Y.useTransition = function() {
    return x.H.useTransition();
  }, Y.version = "19.2.4", Y;
}
var rv;
function di() {
  return rv || (rv = 1, yi.exports = lh()), yi.exports;
}
var vi = { exports: {} }, Yl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zv;
function th() {
  if (zv) return Yl;
  zv = 1;
  var _ = di();
  function d(N) {
    var A = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      A += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var W = 2; W < arguments.length; W++)
        A += "&args[]=" + encodeURIComponent(arguments[W]);
    }
    return "Minified React error #" + N + "; visit " + A + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function M() {
  }
  var m = {
    d: {
      f: M,
      r: function() {
        throw Error(d(522));
      },
      D: M,
      C: M,
      L: M,
      m: M,
      X: M,
      S: M,
      M
    },
    p: 0,
    findDOMNode: null
  }, $ = Symbol.for("react.portal");
  function al(N, A, W) {
    var p = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: $,
      key: p == null ? null : "" + p,
      children: N,
      containerInfo: A,
      implementation: W
    };
  }
  var I = _.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function yl(N, A) {
    if (N === "font") return "";
    if (typeof A == "string")
      return A === "use-credentials" ? A : "";
  }
  return Yl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = m, Yl.createPortal = function(N, A) {
    var W = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!A || A.nodeType !== 1 && A.nodeType !== 9 && A.nodeType !== 11)
      throw Error(d(299));
    return al(N, A, null, W);
  }, Yl.flushSync = function(N) {
    var A = I.T, W = m.p;
    try {
      if (I.T = null, m.p = 2, N) return N();
    } finally {
      I.T = A, m.p = W, m.d.f();
    }
  }, Yl.preconnect = function(N, A) {
    typeof N == "string" && (A ? (A = A.crossOrigin, A = typeof A == "string" ? A === "use-credentials" ? A : "" : void 0) : A = null, m.d.C(N, A));
  }, Yl.prefetchDNS = function(N) {
    typeof N == "string" && m.d.D(N);
  }, Yl.preinit = function(N, A) {
    if (typeof N == "string" && A && typeof A.as == "string") {
      var W = A.as, p = yl(W, A.crossOrigin), vl = typeof A.integrity == "string" ? A.integrity : void 0, Gl = typeof A.fetchPriority == "string" ? A.fetchPriority : void 0;
      W === "style" ? m.d.S(
        N,
        typeof A.precedence == "string" ? A.precedence : void 0,
        {
          crossOrigin: p,
          integrity: vl,
          fetchPriority: Gl
        }
      ) : W === "script" && m.d.X(N, {
        crossOrigin: p,
        integrity: vl,
        fetchPriority: Gl,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0
      });
    }
  }, Yl.preinitModule = function(N, A) {
    if (typeof N == "string")
      if (typeof A == "object" && A !== null) {
        if (A.as == null || A.as === "script") {
          var W = yl(
            A.as,
            A.crossOrigin
          );
          m.d.M(N, {
            crossOrigin: W,
            integrity: typeof A.integrity == "string" ? A.integrity : void 0,
            nonce: typeof A.nonce == "string" ? A.nonce : void 0
          });
        }
      } else A == null && m.d.M(N);
  }, Yl.preload = function(N, A) {
    if (typeof N == "string" && typeof A == "object" && A !== null && typeof A.as == "string") {
      var W = A.as, p = yl(W, A.crossOrigin);
      m.d.L(N, W, {
        crossOrigin: p,
        integrity: typeof A.integrity == "string" ? A.integrity : void 0,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0,
        type: typeof A.type == "string" ? A.type : void 0,
        fetchPriority: typeof A.fetchPriority == "string" ? A.fetchPriority : void 0,
        referrerPolicy: typeof A.referrerPolicy == "string" ? A.referrerPolicy : void 0,
        imageSrcSet: typeof A.imageSrcSet == "string" ? A.imageSrcSet : void 0,
        imageSizes: typeof A.imageSizes == "string" ? A.imageSizes : void 0,
        media: typeof A.media == "string" ? A.media : void 0
      });
    }
  }, Yl.preloadModule = function(N, A) {
    if (typeof N == "string")
      if (A) {
        var W = yl(A.as, A.crossOrigin);
        m.d.m(N, {
          as: typeof A.as == "string" && A.as !== "script" ? A.as : void 0,
          crossOrigin: W,
          integrity: typeof A.integrity == "string" ? A.integrity : void 0
        });
      } else m.d.m(N);
  }, Yl.requestFormReset = function(N) {
    m.d.r(N);
  }, Yl.unstable_batchedUpdates = function(N, A) {
    return N(A);
  }, Yl.useFormState = function(N, A, W) {
    return I.H.useFormState(N, A, W);
  }, Yl.useFormStatus = function() {
    return I.H.useHostTransitionStatus();
  }, Yl.version = "19.2.4", Yl;
}
var Tv;
function uh() {
  if (Tv) return vi.exports;
  Tv = 1;
  function _() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_);
      } catch (d) {
        console.error(d);
      }
  }
  return _(), vi.exports = th(), vi.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ev;
function ah() {
  if (Ev) return Te;
  Ev = 1;
  var _ = Po(), d = di(), M = uh();
  function m(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        t += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function $(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function al(l) {
    var t = l, u = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (u = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? u : null;
  }
  function I(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function yl(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function N(l) {
    if (al(l) !== l)
      throw Error(m(188));
  }
  function A(l) {
    var t = l.alternate;
    if (!t) {
      if (t = al(l), t === null) throw Error(m(188));
      return t !== l ? null : l;
    }
    for (var u = l, a = t; ; ) {
      var e = u.return;
      if (e === null) break;
      var n = e.alternate;
      if (n === null) {
        if (a = e.return, a !== null) {
          u = a;
          continue;
        }
        break;
      }
      if (e.child === n.child) {
        for (n = e.child; n; ) {
          if (n === u) return N(e), l;
          if (n === a) return N(e), t;
          n = n.sibling;
        }
        throw Error(m(188));
      }
      if (u.return !== a.return) u = e, a = n;
      else {
        for (var c = !1, f = e.child; f; ) {
          if (f === u) {
            c = !0, u = e, a = n;
            break;
          }
          if (f === a) {
            c = !0, a = e, u = n;
            break;
          }
          f = f.sibling;
        }
        if (!c) {
          for (f = n.child; f; ) {
            if (f === u) {
              c = !0, u = n, a = e;
              break;
            }
            if (f === a) {
              c = !0, a = n, u = e;
              break;
            }
            f = f.sibling;
          }
          if (!c) throw Error(m(189));
        }
      }
      if (u.alternate !== a) throw Error(m(190));
    }
    if (u.tag !== 3) throw Error(m(188));
    return u.stateNode.current === u ? l : t;
  }
  function W(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = W(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var p = Object.assign, vl = Symbol.for("react.element"), Gl = Symbol.for("react.transitional.element"), Hl = Symbol.for("react.portal"), Rl = Symbol.for("react.fragment"), Zl = Symbol.for("react.strict_mode"), Ql = Symbol.for("react.profiler"), _t = Symbol.for("react.consumer"), Dl = Symbol.for("react.context"), Tl = Symbol.for("react.forward_ref"), Vl = Symbol.for("react.suspense"), ml = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), Ll = Symbol.for("react.lazy"), Mt = Symbol.for("react.activity"), Zu = Symbol.for("react.memo_cache_sentinel"), Ot = Symbol.iterator;
  function Kl(l) {
    return l === null || typeof l != "object" ? null : (l = Ot && l[Ot] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Tu = Symbol.for("react.client.reference");
  function Rt(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Tu ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Rl:
        return "Fragment";
      case Ql:
        return "Profiler";
      case Zl:
        return "StrictMode";
      case Vl:
        return "Suspense";
      case ml:
        return "SuspenseList";
      case Mt:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Hl:
          return "Portal";
        case Dl:
          return l.displayName || "Context";
        case _t:
          return (l._context.displayName || "Context") + ".Consumer";
        case Tl:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case x:
          return t = l.displayName || null, t !== null ? t : Rt(l.type) || "Memo";
        case Ll:
          t = l._payload, l = l._init;
          try {
            return Rt(l(t));
          } catch {
          }
      }
    return null;
  }
  var zt = Array.isArray, r = d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = M.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, el = [], il = -1;
  function y(l) {
    return { current: l };
  }
  function E(l) {
    0 > il || (l.current = el[il], el[il] = null, il--);
  }
  function D(l, t) {
    il++, el[il] = l.current, l.current = t;
  }
  var H = y(null), G = y(null), Z = y(null), ll = y(null);
  function Xl(l, t) {
    switch (D(Z, t), D(G, l), D(H, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Yy(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Yy(t), l = Gy(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    E(H), D(H, l);
  }
  function bl() {
    E(H), E(G), E(Z);
  }
  function Da(l) {
    l.memoizedState !== null && D(ll, l);
    var t = H.current, u = Gy(t, l.type);
    t !== u && (D(G, l), D(H, u));
  }
  function Ee(l) {
    G.current === l && (E(H), E(G)), ll.current === l && (E(ll), ge._currentValue = B);
  }
  var xn, oi;
  function Eu(l) {
    if (xn === void 0)
      try {
        throw Error();
      } catch (u) {
        var t = u.stack.trim().match(/\n( *(at )?)/);
        xn = t && t[1] || "", oi = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + xn + l + oi;
  }
  var Zn = !1;
  function Vn(l, t) {
    if (!l || Zn) return "";
    Zn = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var T = function() {
                throw Error();
              };
              if (Object.defineProperty(T.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(T, []);
                } catch (S) {
                  var g = S;
                }
                Reflect.construct(l, [], T);
              } else {
                try {
                  T.call();
                } catch (S) {
                  g = S;
                }
                l.call(T.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (S) {
                g = S;
              }
              (T = l()) && typeof T.catch == "function" && T.catch(function() {
              });
            }
          } catch (S) {
            if (S && g && typeof S.stack == "string")
              return [S.stack, g.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var e = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      e && e.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), c = n[0], f = n[1];
      if (c && f) {
        var i = c.split(`
`), h = f.split(`
`);
        for (e = a = 0; a < i.length && !i[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; e < h.length && !h[e].includes(
          "DetermineComponentFrameRoot"
        ); )
          e++;
        if (a === i.length || e === h.length)
          for (a = i.length - 1, e = h.length - 1; 1 <= a && 0 <= e && i[a] !== h[e]; )
            e--;
        for (; 1 <= a && 0 <= e; a--, e--)
          if (i[a] !== h[e]) {
            if (a !== 1 || e !== 1)
              do
                if (a--, e--, 0 > e || i[a] !== h[e]) {
                  var b = `
` + i[a].replace(" at new ", " at ");
                  return l.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", l.displayName)), b;
                }
              while (1 <= a && 0 <= e);
            break;
          }
      }
    } finally {
      Zn = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? Eu(u) : "";
  }
  function _v(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Eu(l.type);
      case 16:
        return Eu("Lazy");
      case 13:
        return l.child !== t && t !== null ? Eu("Suspense Fallback") : Eu("Suspense");
      case 19:
        return Eu("SuspenseList");
      case 0:
      case 15:
        return Vn(l.type, !1);
      case 11:
        return Vn(l.type.render, !1);
      case 1:
        return Vn(l.type, !0);
      case 31:
        return Eu("Activity");
      default:
        return "";
    }
  }
  function hi(l) {
    try {
      var t = "", u = null;
      do
        t += _v(l, u), u = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ln = Object.prototype.hasOwnProperty, Kn = _.unstable_scheduleCallback, Jn = _.unstable_cancelCallback, Mv = _.unstable_shouldYield, Ov = _.unstable_requestPaint, lt = _.unstable_now, Dv = _.unstable_getCurrentPriorityLevel, mi = _.unstable_ImmediatePriority, gi = _.unstable_UserBlockingPriority, Ae = _.unstable_NormalPriority, Uv = _.unstable_LowPriority, Si = _.unstable_IdlePriority, Nv = _.log, Hv = _.unstable_setDisableYieldValue, Ua = null, tt = null;
  function kt(l) {
    if (typeof Nv == "function" && Hv(l), tt && typeof tt.setStrictMode == "function")
      try {
        tt.setStrictMode(Ua, l);
      } catch {
      }
  }
  var ut = Math.clz32 ? Math.clz32 : qv, Rv = Math.log, Cv = Math.LN2;
  function qv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Rv(l) / Cv | 0) | 0;
  }
  var _e = 256, Me = 262144, Oe = 4194304;
  function Au(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function De(l, t, u) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var e = 0, n = l.suspendedLanes, c = l.pingedLanes;
    l = l.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~n, a !== 0 ? e = Au(a) : (c &= f, c !== 0 ? e = Au(c) : u || (u = f & ~l, u !== 0 && (e = Au(u))))) : (f = a & ~n, f !== 0 ? e = Au(f) : c !== 0 ? e = Au(c) : u || (u = a & ~l, u !== 0 && (e = Au(u)))), e === 0 ? 0 : t !== 0 && t !== e && (t & n) === 0 && (n = e & -e, u = t & -t, n >= u || n === 32 && (u & 4194048) !== 0) ? t : e;
  }
  function Na(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function pv(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function bi() {
    var l = Oe;
    return Oe <<= 1, (Oe & 62914560) === 0 && (Oe = 4194304), l;
  }
  function wn(l) {
    for (var t = [], u = 0; 31 > u; u++) t.push(l);
    return t;
  }
  function Ha(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function jv(l, t, u, a, e, n) {
    var c = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var f = l.entanglements, i = l.expirationTimes, h = l.hiddenUpdates;
    for (u = c & ~u; 0 < u; ) {
      var b = 31 - ut(u), T = 1 << b;
      f[b] = 0, i[b] = -1;
      var g = h[b];
      if (g !== null)
        for (h[b] = null, b = 0; b < g.length; b++) {
          var S = g[b];
          S !== null && (S.lane &= -536870913);
        }
      u &= ~T;
    }
    a !== 0 && ri(l, a, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t));
  }
  function ri(l, t, u) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - ut(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | u & 261930;
  }
  function zi(l, t) {
    var u = l.entangledLanes |= t;
    for (l = l.entanglements; u; ) {
      var a = 31 - ut(u), e = 1 << a;
      e & t | l[a] & t && (l[a] |= t), u &= ~e;
    }
  }
  function Ti(l, t) {
    var u = t & -t;
    return u = (u & 42) !== 0 ? 1 : Wn(u), (u & (l.suspendedLanes | t)) !== 0 ? 0 : u;
  }
  function Wn(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function $n(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ei() {
    var l = O.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : fv(l.type));
  }
  function Ai(l, t) {
    var u = O.p;
    try {
      return O.p = l, t();
    } finally {
      O.p = u;
    }
  }
  var Ft = Math.random().toString(36).slice(2), Cl = "__reactFiber$" + Ft, Jl = "__reactProps$" + Ft, Vu = "__reactContainer$" + Ft, kn = "__reactEvents$" + Ft, Bv = "__reactListeners$" + Ft, Yv = "__reactHandles$" + Ft, _i = "__reactResources$" + Ft, Ra = "__reactMarker$" + Ft;
  function Fn(l) {
    delete l[Cl], delete l[Jl], delete l[kn], delete l[Bv], delete l[Yv];
  }
  function Lu(l) {
    var t = l[Cl];
    if (t) return t;
    for (var u = l.parentNode; u; ) {
      if (t = u[Vu] || u[Cl]) {
        if (u = t.alternate, t.child !== null || u !== null && u.child !== null)
          for (l = Ky(l); l !== null; ) {
            if (u = l[Cl]) return u;
            l = Ky(l);
          }
        return t;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function Ku(l) {
    if (l = l[Cl] || l[Vu]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function Ca(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(m(33));
  }
  function Ju(l) {
    var t = l[_i];
    return t || (t = l[_i] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ul(l) {
    l[Ra] = !0;
  }
  var Mi = /* @__PURE__ */ new Set(), Oi = {};
  function _u(l, t) {
    wu(l, t), wu(l + "Capture", t);
  }
  function wu(l, t) {
    for (Oi[l] = t, l = 0; l < t.length; l++)
      Mi.add(t[l]);
  }
  var Gv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Di = {}, Ui = {};
  function Qv(l) {
    return Ln.call(Ui, l) ? !0 : Ln.call(Di, l) ? !1 : Gv.test(l) ? Ui[l] = !0 : (Di[l] = !0, !1);
  }
  function Ue(l, t, u) {
    if (Qv(t))
      if (u === null) l.removeAttribute(t);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + u);
      }
  }
  function Ne(l, t, u) {
    if (u === null) l.removeAttribute(t);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + u);
    }
  }
  function Ct(l, t, u, a) {
    if (a === null) l.removeAttribute(u);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(t, u, "" + a);
    }
  }
  function yt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Ni(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Xv(l, t, u) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var e = a.get, n = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return e.call(this);
        },
        set: function(c) {
          u = "" + c, n.call(this, c);
        }
      }), Object.defineProperty(l, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return u;
        },
        setValue: function(c) {
          u = "" + c;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function In(l) {
    if (!l._valueTracker) {
      var t = Ni(l) ? "checked" : "value";
      l._valueTracker = Xv(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Hi(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var u = t.getValue(), a = "";
    return l && (a = Ni(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
  }
  function He(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var xv = /[\n"\\]/g;
  function vt(l) {
    return l.replace(
      xv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Pn(l, t, u, a, e, n, c, f) {
    l.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.type = c : l.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + yt(t)) : l.value !== "" + yt(t) && (l.value = "" + yt(t)) : c !== "submit" && c !== "reset" || l.removeAttribute("value"), t != null ? lc(l, c, yt(t)) : u != null ? lc(l, c, yt(u)) : a != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.name = "" + yt(f) : l.removeAttribute("name");
  }
  function Ri(l, t, u, a, e, n, c, f) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || u != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        In(l);
        return;
      }
      u = u != null ? "" + yt(u) : "", t = t != null ? "" + yt(t) : u, f || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? e, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = f ? l.checked : !!a, l.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (l.name = c), In(l);
  }
  function lc(l, t, u) {
    t === "number" && He(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function Wu(l, t, u, a) {
    if (l = l.options, t) {
      t = {};
      for (var e = 0; e < u.length; e++)
        t["$" + u[e]] = !0;
      for (u = 0; u < l.length; u++)
        e = t.hasOwnProperty("$" + l[u].value), l[u].selected !== e && (l[u].selected = e), e && a && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + yt(u), t = null, e = 0; e < l.length; e++) {
        if (l[e].value === u) {
          l[e].selected = !0, a && (l[e].defaultSelected = !0);
          return;
        }
        t !== null || l[e].disabled || (t = l[e]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ci(l, t, u) {
    if (t != null && (t = "" + yt(t), t !== l.value && (l.value = t), u == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = u != null ? "" + yt(u) : "";
  }
  function qi(l, t, u, a) {
    if (t == null) {
      if (a != null) {
        if (u != null) throw Error(m(92));
        if (zt(a)) {
          if (1 < a.length) throw Error(m(93));
          a = a[0];
        }
        u = a;
      }
      u == null && (u = ""), t = u;
    }
    u = yt(t), l.defaultValue = u, a = l.textContent, a === u && a !== "" && a !== null && (l.value = a), In(l);
  }
  function $u(l, t) {
    if (t) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var Zv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function pi(l, t, u) {
    var a = t.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || Zv.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
  }
  function ji(l, t, u) {
    if (t != null && typeof t != "object")
      throw Error(m(62));
    if (l = l.style, u != null) {
      for (var a in u)
        !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var e in t)
        a = t[e], t.hasOwnProperty(e) && u[e] !== a && pi(l, e, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && pi(l, n, t[n]);
  }
  function tc(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Vv = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Lv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Re(l) {
    return Lv.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function qt() {
  }
  var uc = null;
  function ac(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var ku = null, Fu = null;
  function Bi(l) {
    var t = Ku(l);
    if (t && (l = t.stateNode)) {
      var u = l[Jl] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Pn(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), t = u.name, u.type === "radio" && t != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + vt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < u.length; t++) {
              var a = u[t];
              if (a !== l && a.form === l.form) {
                var e = a[Jl] || null;
                if (!e) throw Error(m(90));
                Pn(
                  a,
                  e.value,
                  e.defaultValue,
                  e.defaultValue,
                  e.checked,
                  e.defaultChecked,
                  e.type,
                  e.name
                );
              }
            }
            for (t = 0; t < u.length; t++)
              a = u[t], a.form === l.form && Hi(a);
          }
          break l;
        case "textarea":
          Ci(l, u.value, u.defaultValue);
          break l;
        case "select":
          t = u.value, t != null && Wu(l, !!u.multiple, t, !1);
      }
    }
  }
  var ec = !1;
  function Yi(l, t, u) {
    if (ec) return l(t, u);
    ec = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (ec = !1, (ku !== null || Fu !== null) && (rn(), ku && (t = ku, l = Fu, Fu = ku = null, Bi(t), l)))
        for (t = 0; t < l.length; t++) Bi(l[t]);
    }
  }
  function qa(l, t) {
    var u = l.stateNode;
    if (u === null) return null;
    var a = u[Jl] || null;
    if (a === null) return null;
    u = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function")
      throw Error(
        m(231, t, typeof u)
      );
    return u;
  }
  var pt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nc = !1;
  if (pt)
    try {
      var pa = {};
      Object.defineProperty(pa, "passive", {
        get: function() {
          nc = !0;
        }
      }), window.addEventListener("test", pa, pa), window.removeEventListener("test", pa, pa);
    } catch {
      nc = !1;
    }
  var It = null, cc = null, Ce = null;
  function Gi() {
    if (Ce) return Ce;
    var l, t = cc, u = t.length, a, e = "value" in It ? It.value : It.textContent, n = e.length;
    for (l = 0; l < u && t[l] === e[l]; l++) ;
    var c = u - l;
    for (a = 1; a <= c && t[u - a] === e[n - a]; a++) ;
    return Ce = e.slice(l, 1 < a ? 1 - a : void 0);
  }
  function qe(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function pe() {
    return !0;
  }
  function Qi() {
    return !1;
  }
  function wl(l) {
    function t(u, a, e, n, c) {
      this._reactName = u, this._targetInst = e, this.type = a, this.nativeEvent = n, this.target = c, this.currentTarget = null;
      for (var f in l)
        l.hasOwnProperty(f) && (u = l[f], this[f] = u ? u(n) : n[f]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? pe : Qi, this.isPropagationStopped = Qi, this;
    }
    return p(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = pe);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = pe);
      },
      persist: function() {
      },
      isPersistent: pe
    }), t;
  }
  var Mu = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, je = wl(Mu), ja = p({}, Mu, { view: 0, detail: 0 }), Kv = wl(ja), fc, ic, Ba, Be = p({}, ja, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: yc,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== Ba && (Ba && l.type === "mousemove" ? (fc = l.screenX - Ba.screenX, ic = l.screenY - Ba.screenY) : ic = fc = 0, Ba = l), fc);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : ic;
    }
  }), Xi = wl(Be), Jv = p({}, Be, { dataTransfer: 0 }), wv = wl(Jv), Wv = p({}, ja, { relatedTarget: 0 }), sc = wl(Wv), $v = p({}, Mu, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), kv = wl($v), Fv = p({}, Mu, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Iv = wl(Fv), Pv = p({}, Mu, { data: 0 }), xi = wl(Pv), ld = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, td = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, ud = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ad(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = ud[l]) ? !!t[l] : !1;
  }
  function yc() {
    return ad;
  }
  var ed = p({}, ja, {
    key: function(l) {
      if (l.key) {
        var t = ld[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = qe(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? td[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: yc,
    charCode: function(l) {
      return l.type === "keypress" ? qe(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? qe(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), nd = wl(ed), cd = p({}, Be, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Zi = wl(cd), fd = p({}, ja, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: yc
  }), id = wl(fd), sd = p({}, Mu, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yd = wl(sd), vd = p({}, Be, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), dd = wl(vd), od = p({}, Mu, {
    newState: 0,
    oldState: 0
  }), hd = wl(od), md = [9, 13, 27, 32], vc = pt && "CompositionEvent" in window, Ya = null;
  pt && "documentMode" in document && (Ya = document.documentMode);
  var gd = pt && "TextEvent" in window && !Ya, Vi = pt && (!vc || Ya && 8 < Ya && 11 >= Ya), Li = " ", Ki = !1;
  function Ji(l, t) {
    switch (l) {
      case "keyup":
        return md.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function wi(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Iu = !1;
  function Sd(l, t) {
    switch (l) {
      case "compositionend":
        return wi(t);
      case "keypress":
        return t.which !== 32 ? null : (Ki = !0, Li);
      case "textInput":
        return l = t.data, l === Li && Ki ? null : l;
      default:
        return null;
    }
  }
  function bd(l, t) {
    if (Iu)
      return l === "compositionend" || !vc && Ji(l, t) ? (l = Gi(), Ce = cc = It = null, Iu = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Vi && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var rd = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Wi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!rd[l.type] : t === "textarea";
  }
  function $i(l, t, u, a) {
    ku ? Fu ? Fu.push(a) : Fu = [a] : ku = a, t = On(t, "onChange"), 0 < t.length && (u = new je(
      "onChange",
      "change",
      null,
      u,
      a
    ), l.push({ event: u, listeners: t }));
  }
  var Ga = null, Qa = null;
  function zd(l) {
    Ry(l, 0);
  }
  function Ye(l) {
    var t = Ca(l);
    if (Hi(t)) return l;
  }
  function ki(l, t) {
    if (l === "change") return t;
  }
  var Fi = !1;
  if (pt) {
    var dc;
    if (pt) {
      var oc = "oninput" in document;
      if (!oc) {
        var Ii = document.createElement("div");
        Ii.setAttribute("oninput", "return;"), oc = typeof Ii.oninput == "function";
      }
      dc = oc;
    } else dc = !1;
    Fi = dc && (!document.documentMode || 9 < document.documentMode);
  }
  function Pi() {
    Ga && (Ga.detachEvent("onpropertychange", ls), Qa = Ga = null);
  }
  function ls(l) {
    if (l.propertyName === "value" && Ye(Qa)) {
      var t = [];
      $i(
        t,
        Qa,
        l,
        ac(l)
      ), Yi(zd, t);
    }
  }
  function Td(l, t, u) {
    l === "focusin" ? (Pi(), Ga = t, Qa = u, Ga.attachEvent("onpropertychange", ls)) : l === "focusout" && Pi();
  }
  function Ed(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Ye(Qa);
  }
  function Ad(l, t) {
    if (l === "click") return Ye(t);
  }
  function _d(l, t) {
    if (l === "input" || l === "change")
      return Ye(t);
  }
  function Md(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var at = typeof Object.is == "function" ? Object.is : Md;
  function Xa(l, t) {
    if (at(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var u = Object.keys(l), a = Object.keys(t);
    if (u.length !== a.length) return !1;
    for (a = 0; a < u.length; a++) {
      var e = u[a];
      if (!Ln.call(t, e) || !at(l[e], t[e]))
        return !1;
    }
    return !0;
  }
  function ts(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function us(l, t) {
    var u = ts(l);
    l = 0;
    for (var a; u; ) {
      if (u.nodeType === 3) {
        if (a = l + u.textContent.length, l <= t && a >= t)
          return { node: u, offset: t - l };
        l = a;
      }
      l: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break l;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = ts(u);
    }
  }
  function as(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? as(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function es(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = He(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof t.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = t.contentWindow;
      else break;
      t = He(l.document);
    }
    return t;
  }
  function hc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Od = pt && "documentMode" in document && 11 >= document.documentMode, Pu = null, mc = null, xa = null, gc = !1;
  function ns(l, t, u) {
    var a = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    gc || Pu == null || Pu !== He(a) || (a = Pu, "selectionStart" in a && hc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), xa && Xa(xa, a) || (xa = a, a = On(mc, "onSelect"), 0 < a.length && (t = new je(
      "onSelect",
      "select",
      null,
      t,
      u
    ), l.push({ event: t, listeners: a }), t.target = Pu)));
  }
  function Ou(l, t) {
    var u = {};
    return u[l.toLowerCase()] = t.toLowerCase(), u["Webkit" + l] = "webkit" + t, u["Moz" + l] = "moz" + t, u;
  }
  var la = {
    animationend: Ou("Animation", "AnimationEnd"),
    animationiteration: Ou("Animation", "AnimationIteration"),
    animationstart: Ou("Animation", "AnimationStart"),
    transitionrun: Ou("Transition", "TransitionRun"),
    transitionstart: Ou("Transition", "TransitionStart"),
    transitioncancel: Ou("Transition", "TransitionCancel"),
    transitionend: Ou("Transition", "TransitionEnd")
  }, Sc = {}, cs = {};
  pt && (cs = document.createElement("div").style, "AnimationEvent" in window || (delete la.animationend.animation, delete la.animationiteration.animation, delete la.animationstart.animation), "TransitionEvent" in window || delete la.transitionend.transition);
  function Du(l) {
    if (Sc[l]) return Sc[l];
    if (!la[l]) return l;
    var t = la[l], u;
    for (u in t)
      if (t.hasOwnProperty(u) && u in cs)
        return Sc[l] = t[u];
    return l;
  }
  var fs = Du("animationend"), is = Du("animationiteration"), ss = Du("animationstart"), Dd = Du("transitionrun"), Ud = Du("transitionstart"), Nd = Du("transitioncancel"), ys = Du("transitionend"), vs = /* @__PURE__ */ new Map(), bc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  bc.push("scrollEnd");
  function Tt(l, t) {
    vs.set(l, t), _u(t, [l]);
  }
  var Ge = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, dt = [], ta = 0, rc = 0;
  function Qe() {
    for (var l = ta, t = rc = ta = 0; t < l; ) {
      var u = dt[t];
      dt[t++] = null;
      var a = dt[t];
      dt[t++] = null;
      var e = dt[t];
      dt[t++] = null;
      var n = dt[t];
      if (dt[t++] = null, a !== null && e !== null) {
        var c = a.pending;
        c === null ? e.next = e : (e.next = c.next, c.next = e), a.pending = e;
      }
      n !== 0 && ds(u, e, n);
    }
  }
  function Xe(l, t, u, a) {
    dt[ta++] = l, dt[ta++] = t, dt[ta++] = u, dt[ta++] = a, rc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function zc(l, t, u, a) {
    return Xe(l, t, u, a), xe(l);
  }
  function Uu(l, t) {
    return Xe(l, null, null, t), xe(l);
  }
  function ds(l, t, u) {
    l.lanes |= u;
    var a = l.alternate;
    a !== null && (a.lanes |= u);
    for (var e = !1, n = l.return; n !== null; )
      n.childLanes |= u, a = n.alternate, a !== null && (a.childLanes |= u), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - ut(u), l = n.hiddenUpdates, a = l[e], a === null ? l[e] = [t] : a.push(t), t.lane = u | 536870912), n) : null;
  }
  function xe(l) {
    if (50 < se)
      throw se = 0, Hf = null, Error(m(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ua = {};
  function Hd(l, t, u, a) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function et(l, t, u, a) {
    return new Hd(l, t, u, a);
  }
  function Tc(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function jt(l, t) {
    var u = l.alternate;
    return u === null ? (u = et(
      l.tag,
      t,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = t, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, t = l.dependencies, u.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function os(l, t) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, t = u.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Ze(l, t, u, a, e, n) {
    var c = 0;
    if (a = l, typeof l == "function") Tc(l) && (c = 1);
    else if (typeof l == "string")
      c = Bo(
        l,
        u,
        H.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case Mt:
          return l = et(31, u, t, e), l.elementType = Mt, l.lanes = n, l;
        case Rl:
          return Nu(u.children, e, n, t);
        case Zl:
          c = 8, e |= 24;
          break;
        case Ql:
          return l = et(12, u, t, e | 2), l.elementType = Ql, l.lanes = n, l;
        case Vl:
          return l = et(13, u, t, e), l.elementType = Vl, l.lanes = n, l;
        case ml:
          return l = et(19, u, t, e), l.elementType = ml, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Dl:
                c = 10;
                break l;
              case _t:
                c = 9;
                break l;
              case Tl:
                c = 11;
                break l;
              case x:
                c = 14;
                break l;
              case Ll:
                c = 16, a = null;
                break l;
            }
          c = 29, u = Error(
            m(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = et(c, u, t, e), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function Nu(l, t, u, a) {
    return l = et(7, l, a, t), l.lanes = u, l;
  }
  function Ec(l, t, u) {
    return l = et(6, l, null, t), l.lanes = u, l;
  }
  function hs(l) {
    var t = et(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Ac(l, t, u) {
    return t = et(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = u, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var ms = /* @__PURE__ */ new WeakMap();
  function ot(l, t) {
    if (typeof l == "object" && l !== null) {
      var u = ms.get(l);
      return u !== void 0 ? u : (t = {
        value: l,
        source: t,
        stack: hi(t)
      }, ms.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: hi(t)
    };
  }
  var aa = [], ea = 0, Ve = null, Za = 0, ht = [], mt = 0, Pt = null, Dt = 1, Ut = "";
  function Bt(l, t) {
    aa[ea++] = Za, aa[ea++] = Ve, Ve = l, Za = t;
  }
  function gs(l, t, u) {
    ht[mt++] = Dt, ht[mt++] = Ut, ht[mt++] = Pt, Pt = l;
    var a = Dt;
    l = Ut;
    var e = 32 - ut(a) - 1;
    a &= ~(1 << e), u += 1;
    var n = 32 - ut(t) + e;
    if (30 < n) {
      var c = e - e % 5;
      n = (a & (1 << c) - 1).toString(32), a >>= c, e -= c, Dt = 1 << 32 - ut(t) + e | u << e | a, Ut = n + l;
    } else
      Dt = 1 << n | u << e | a, Ut = l;
  }
  function _c(l) {
    l.return !== null && (Bt(l, 1), gs(l, 1, 0));
  }
  function Mc(l) {
    for (; l === Ve; )
      Ve = aa[--ea], aa[ea] = null, Za = aa[--ea], aa[ea] = null;
    for (; l === Pt; )
      Pt = ht[--mt], ht[mt] = null, Ut = ht[--mt], ht[mt] = null, Dt = ht[--mt], ht[mt] = null;
  }
  function Ss(l, t) {
    ht[mt++] = Dt, ht[mt++] = Ut, ht[mt++] = Pt, Dt = t.id, Ut = t.overflow, Pt = l;
  }
  var ql = null, dl = null, w = !1, lu = null, gt = !1, Oc = Error(m(519));
  function tu(l) {
    var t = Error(
      m(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Va(ot(t, l)), Oc;
  }
  function bs(l) {
    var t = l.stateNode, u = l.type, a = l.memoizedProps;
    switch (t[Cl] = l, t[Jl] = a, u) {
      case "dialog":
        L("cancel", t), L("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        L("load", t);
        break;
      case "video":
      case "audio":
        for (u = 0; u < ve.length; u++)
          L(ve[u], t);
        break;
      case "source":
        L("error", t);
        break;
      case "img":
      case "image":
      case "link":
        L("error", t), L("load", t);
        break;
      case "details":
        L("toggle", t);
        break;
      case "input":
        L("invalid", t), Ri(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        L("invalid", t);
        break;
      case "textarea":
        L("invalid", t), qi(t, a.value, a.defaultValue, a.children);
    }
    u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || jy(t.textContent, u) ? (a.popover != null && (L("beforetoggle", t), L("toggle", t)), a.onScroll != null && L("scroll", t), a.onScrollEnd != null && L("scrollend", t), a.onClick != null && (t.onclick = qt), t = !0) : t = !1, t || tu(l, !0);
  }
  function rs(l) {
    for (ql = l.return; ql; )
      switch (ql.tag) {
        case 5:
        case 31:
        case 13:
          gt = !1;
          return;
        case 27:
        case 3:
          gt = !0;
          return;
        default:
          ql = ql.return;
      }
  }
  function na(l) {
    if (l !== ql) return !1;
    if (!w) return rs(l), w = !0, !1;
    var t = l.tag, u;
    if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Kf(l.type, l.memoizedProps)), u = !u), u && dl && tu(l), rs(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(317));
      dl = Ly(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(317));
      dl = Ly(l);
    } else
      t === 27 ? (t = dl, mu(l.type) ? (l = kf, kf = null, dl = l) : dl = t) : dl = ql ? bt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Hu() {
    dl = ql = null, w = !1;
  }
  function Dc() {
    var l = lu;
    return l !== null && (Fl === null ? Fl = l : Fl.push.apply(
      Fl,
      l
    ), lu = null), l;
  }
  function Va(l) {
    lu === null ? lu = [l] : lu.push(l);
  }
  var Uc = y(null), Ru = null, Yt = null;
  function uu(l, t, u) {
    D(Uc, t._currentValue), t._currentValue = u;
  }
  function Gt(l) {
    l._currentValue = Uc.current, E(Uc);
  }
  function Nc(l, t, u) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === u) break;
      l = l.return;
    }
  }
  function Hc(l, t, u, a) {
    var e = l.child;
    for (e !== null && (e.return = l); e !== null; ) {
      var n = e.dependencies;
      if (n !== null) {
        var c = e.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var f = n;
          n = e;
          for (var i = 0; i < t.length; i++)
            if (f.context === t[i]) {
              n.lanes |= u, f = n.alternate, f !== null && (f.lanes |= u), Nc(
                n.return,
                u,
                l
              ), a || (c = null);
              break l;
            }
          n = f.next;
        }
      } else if (e.tag === 18) {
        if (c = e.return, c === null) throw Error(m(341));
        c.lanes |= u, n = c.alternate, n !== null && (n.lanes |= u), Nc(c, u, l), c = null;
      } else c = e.child;
      if (c !== null) c.return = e;
      else
        for (c = e; c !== null; ) {
          if (c === l) {
            c = null;
            break;
          }
          if (e = c.sibling, e !== null) {
            e.return = c.return, c = e;
            break;
          }
          c = c.return;
        }
      e = c;
    }
  }
  function ca(l, t, u, a) {
    l = null;
    for (var e = t, n = !1; e !== null; ) {
      if (!n) {
        if ((e.flags & 524288) !== 0) n = !0;
        else if ((e.flags & 262144) !== 0) break;
      }
      if (e.tag === 10) {
        var c = e.alternate;
        if (c === null) throw Error(m(387));
        if (c = c.memoizedProps, c !== null) {
          var f = e.type;
          at(e.pendingProps.value, c.value) || (l !== null ? l.push(f) : l = [f]);
        }
      } else if (e === ll.current) {
        if (c = e.alternate, c === null) throw Error(m(387));
        c.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(ge) : l = [ge]);
      }
      e = e.return;
    }
    l !== null && Hc(
      t,
      l,
      u,
      a
    ), t.flags |= 262144;
  }
  function Le(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!at(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Cu(l) {
    Ru = l, Yt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function pl(l) {
    return zs(Ru, l);
  }
  function Ke(l, t) {
    return Ru === null && Cu(l), zs(l, t);
  }
  function zs(l, t) {
    var u = t._currentValue;
    if (t = { context: t, memoizedValue: u, next: null }, Yt === null) {
      if (l === null) throw Error(m(308));
      Yt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Yt = Yt.next = t;
    return u;
  }
  var Rd = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(u, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, Cd = _.unstable_scheduleCallback, qd = _.unstable_NormalPriority, El = {
    $$typeof: Dl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Rc() {
    return {
      controller: new Rd(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function La(l) {
    l.refCount--, l.refCount === 0 && Cd(qd, function() {
      l.controller.abort();
    });
  }
  var Ka = null, Cc = 0, fa = 0, ia = null;
  function pd(l, t) {
    if (Ka === null) {
      var u = Ka = [];
      Cc = 0, fa = Bf(), ia = {
        status: "pending",
        value: void 0,
        then: function(a) {
          u.push(a);
        }
      };
    }
    return Cc++, t.then(Ts, Ts), t;
  }
  function Ts() {
    if (--Cc === 0 && Ka !== null) {
      ia !== null && (ia.status = "fulfilled");
      var l = Ka;
      Ka = null, fa = 0, ia = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function jd(l, t) {
    var u = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(e) {
        u.push(e);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var e = 0; e < u.length; e++) (0, u[e])(t);
      },
      function(e) {
        for (a.status = "rejected", a.reason = e, e = 0; e < u.length; e++)
          (0, u[e])(void 0);
      }
    ), a;
  }
  var Es = r.S;
  r.S = function(l, t) {
    ny = lt(), typeof t == "object" && t !== null && typeof t.then == "function" && pd(l, t), Es !== null && Es(l, t);
  };
  var qu = y(null);
  function qc() {
    var l = qu.current;
    return l !== null ? l : sl.pooledCache;
  }
  function Je(l, t) {
    t === null ? D(qu, qu.current) : D(qu, t.pool);
  }
  function As() {
    var l = qc();
    return l === null ? null : { parent: El._currentValue, pool: l };
  }
  var sa = Error(m(460)), pc = Error(m(474)), we = Error(m(542)), We = { then: function() {
  } };
  function _s(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Ms(l, t, u) {
    switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(qt, qt), t = u), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Ds(l), l;
      default:
        if (typeof t.status == "string") t.then(qt, qt);
        else {
          if (l = sl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(m(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var e = t;
                e.status = "fulfilled", e.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var e = t;
                e.status = "rejected", e.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Ds(l), l;
        }
        throw ju = t, sa;
    }
  }
  function pu(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (u) {
      throw u !== null && typeof u == "object" && typeof u.then == "function" ? (ju = u, sa) : u;
    }
  }
  var ju = null;
  function Os() {
    if (ju === null) throw Error(m(459));
    var l = ju;
    return ju = null, l;
  }
  function Ds(l) {
    if (l === sa || l === we)
      throw Error(m(483));
  }
  var ya = null, Ja = 0;
  function $e(l) {
    var t = Ja;
    return Ja += 1, ya === null && (ya = []), Ms(ya, l, t);
  }
  function wa(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function ke(l, t) {
    throw t.$$typeof === vl ? Error(m(525)) : (l = Object.prototype.toString.call(t), Error(
      m(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Us(l) {
    function t(v, s) {
      if (l) {
        var o = v.deletions;
        o === null ? (v.deletions = [s], v.flags |= 16) : o.push(s);
      }
    }
    function u(v, s) {
      if (!l) return null;
      for (; s !== null; )
        t(v, s), s = s.sibling;
      return null;
    }
    function a(v) {
      for (var s = /* @__PURE__ */ new Map(); v !== null; )
        v.key !== null ? s.set(v.key, v) : s.set(v.index, v), v = v.sibling;
      return s;
    }
    function e(v, s) {
      return v = jt(v, s), v.index = 0, v.sibling = null, v;
    }
    function n(v, s, o) {
      return v.index = o, l ? (o = v.alternate, o !== null ? (o = o.index, o < s ? (v.flags |= 67108866, s) : o) : (v.flags |= 67108866, s)) : (v.flags |= 1048576, s);
    }
    function c(v) {
      return l && v.alternate === null && (v.flags |= 67108866), v;
    }
    function f(v, s, o, z) {
      return s === null || s.tag !== 6 ? (s = Ec(o, v.mode, z), s.return = v, s) : (s = e(s, o), s.return = v, s);
    }
    function i(v, s, o, z) {
      var C = o.type;
      return C === Rl ? b(
        v,
        s,
        o.props.children,
        z,
        o.key
      ) : s !== null && (s.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Ll && pu(C) === s.type) ? (s = e(s, o.props), wa(s, o), s.return = v, s) : (s = Ze(
        o.type,
        o.key,
        o.props,
        null,
        v.mode,
        z
      ), wa(s, o), s.return = v, s);
    }
    function h(v, s, o, z) {
      return s === null || s.tag !== 4 || s.stateNode.containerInfo !== o.containerInfo || s.stateNode.implementation !== o.implementation ? (s = Ac(o, v.mode, z), s.return = v, s) : (s = e(s, o.children || []), s.return = v, s);
    }
    function b(v, s, o, z, C) {
      return s === null || s.tag !== 7 ? (s = Nu(
        o,
        v.mode,
        z,
        C
      ), s.return = v, s) : (s = e(s, o), s.return = v, s);
    }
    function T(v, s, o) {
      if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
        return s = Ec(
          "" + s,
          v.mode,
          o
        ), s.return = v, s;
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case Gl:
            return o = Ze(
              s.type,
              s.key,
              s.props,
              null,
              v.mode,
              o
            ), wa(o, s), o.return = v, o;
          case Hl:
            return s = Ac(
              s,
              v.mode,
              o
            ), s.return = v, s;
          case Ll:
            return s = pu(s), T(v, s, o);
        }
        if (zt(s) || Kl(s))
          return s = Nu(
            s,
            v.mode,
            o,
            null
          ), s.return = v, s;
        if (typeof s.then == "function")
          return T(v, $e(s), o);
        if (s.$$typeof === Dl)
          return T(
            v,
            Ke(v, s),
            o
          );
        ke(v, s);
      }
      return null;
    }
    function g(v, s, o, z) {
      var C = s !== null ? s.key : null;
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return C !== null ? null : f(v, s, "" + o, z);
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case Gl:
            return o.key === C ? i(v, s, o, z) : null;
          case Hl:
            return o.key === C ? h(v, s, o, z) : null;
          case Ll:
            return o = pu(o), g(v, s, o, z);
        }
        if (zt(o) || Kl(o))
          return C !== null ? null : b(v, s, o, z, null);
        if (typeof o.then == "function")
          return g(
            v,
            s,
            $e(o),
            z
          );
        if (o.$$typeof === Dl)
          return g(
            v,
            s,
            Ke(v, o),
            z
          );
        ke(v, o);
      }
      return null;
    }
    function S(v, s, o, z, C) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return v = v.get(o) || null, f(s, v, "" + z, C);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case Gl:
            return v = v.get(
              z.key === null ? o : z.key
            ) || null, i(s, v, z, C);
          case Hl:
            return v = v.get(
              z.key === null ? o : z.key
            ) || null, h(s, v, z, C);
          case Ll:
            return z = pu(z), S(
              v,
              s,
              o,
              z,
              C
            );
        }
        if (zt(z) || Kl(z))
          return v = v.get(o) || null, b(s, v, z, C, null);
        if (typeof z.then == "function")
          return S(
            v,
            s,
            o,
            $e(z),
            C
          );
        if (z.$$typeof === Dl)
          return S(
            v,
            s,
            o,
            Ke(s, z),
            C
          );
        ke(s, z);
      }
      return null;
    }
    function U(v, s, o, z) {
      for (var C = null, k = null, R = s, X = s = 0, J = null; R !== null && X < o.length; X++) {
        R.index > X ? (J = R, R = null) : J = R.sibling;
        var F = g(
          v,
          R,
          o[X],
          z
        );
        if (F === null) {
          R === null && (R = J);
          break;
        }
        l && R && F.alternate === null && t(v, R), s = n(F, s, X), k === null ? C = F : k.sibling = F, k = F, R = J;
      }
      if (X === o.length)
        return u(v, R), w && Bt(v, X), C;
      if (R === null) {
        for (; X < o.length; X++)
          R = T(v, o[X], z), R !== null && (s = n(
            R,
            s,
            X
          ), k === null ? C = R : k.sibling = R, k = R);
        return w && Bt(v, X), C;
      }
      for (R = a(R); X < o.length; X++)
        J = S(
          R,
          v,
          X,
          o[X],
          z
        ), J !== null && (l && J.alternate !== null && R.delete(
          J.key === null ? X : J.key
        ), s = n(
          J,
          s,
          X
        ), k === null ? C = J : k.sibling = J, k = J);
      return l && R.forEach(function(zu) {
        return t(v, zu);
      }), w && Bt(v, X), C;
    }
    function q(v, s, o, z) {
      if (o == null) throw Error(m(151));
      for (var C = null, k = null, R = s, X = s = 0, J = null, F = o.next(); R !== null && !F.done; X++, F = o.next()) {
        R.index > X ? (J = R, R = null) : J = R.sibling;
        var zu = g(v, R, F.value, z);
        if (zu === null) {
          R === null && (R = J);
          break;
        }
        l && R && zu.alternate === null && t(v, R), s = n(zu, s, X), k === null ? C = zu : k.sibling = zu, k = zu, R = J;
      }
      if (F.done)
        return u(v, R), w && Bt(v, X), C;
      if (R === null) {
        for (; !F.done; X++, F = o.next())
          F = T(v, F.value, z), F !== null && (s = n(F, s, X), k === null ? C = F : k.sibling = F, k = F);
        return w && Bt(v, X), C;
      }
      for (R = a(R); !F.done; X++, F = o.next())
        F = S(R, v, X, F.value, z), F !== null && (l && F.alternate !== null && R.delete(F.key === null ? X : F.key), s = n(F, s, X), k === null ? C = F : k.sibling = F, k = F);
      return l && R.forEach(function(wo) {
        return t(v, wo);
      }), w && Bt(v, X), C;
    }
    function fl(v, s, o, z) {
      if (typeof o == "object" && o !== null && o.type === Rl && o.key === null && (o = o.props.children), typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case Gl:
            l: {
              for (var C = o.key; s !== null; ) {
                if (s.key === C) {
                  if (C = o.type, C === Rl) {
                    if (s.tag === 7) {
                      u(
                        v,
                        s.sibling
                      ), z = e(
                        s,
                        o.props.children
                      ), z.return = v, v = z;
                      break l;
                    }
                  } else if (s.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Ll && pu(C) === s.type) {
                    u(
                      v,
                      s.sibling
                    ), z = e(s, o.props), wa(z, o), z.return = v, v = z;
                    break l;
                  }
                  u(v, s);
                  break;
                } else t(v, s);
                s = s.sibling;
              }
              o.type === Rl ? (z = Nu(
                o.props.children,
                v.mode,
                z,
                o.key
              ), z.return = v, v = z) : (z = Ze(
                o.type,
                o.key,
                o.props,
                null,
                v.mode,
                z
              ), wa(z, o), z.return = v, v = z);
            }
            return c(v);
          case Hl:
            l: {
              for (C = o.key; s !== null; ) {
                if (s.key === C)
                  if (s.tag === 4 && s.stateNode.containerInfo === o.containerInfo && s.stateNode.implementation === o.implementation) {
                    u(
                      v,
                      s.sibling
                    ), z = e(s, o.children || []), z.return = v, v = z;
                    break l;
                  } else {
                    u(v, s);
                    break;
                  }
                else t(v, s);
                s = s.sibling;
              }
              z = Ac(o, v.mode, z), z.return = v, v = z;
            }
            return c(v);
          case Ll:
            return o = pu(o), fl(
              v,
              s,
              o,
              z
            );
        }
        if (zt(o))
          return U(
            v,
            s,
            o,
            z
          );
        if (Kl(o)) {
          if (C = Kl(o), typeof C != "function") throw Error(m(150));
          return o = C.call(o), q(
            v,
            s,
            o,
            z
          );
        }
        if (typeof o.then == "function")
          return fl(
            v,
            s,
            $e(o),
            z
          );
        if (o.$$typeof === Dl)
          return fl(
            v,
            s,
            Ke(v, o),
            z
          );
        ke(v, o);
      }
      return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, s !== null && s.tag === 6 ? (u(v, s.sibling), z = e(s, o), z.return = v, v = z) : (u(v, s), z = Ec(o, v.mode, z), z.return = v, v = z), c(v)) : u(v, s);
    }
    return function(v, s, o, z) {
      try {
        Ja = 0;
        var C = fl(
          v,
          s,
          o,
          z
        );
        return ya = null, C;
      } catch (R) {
        if (R === sa || R === we) throw R;
        var k = et(29, R, null, v.mode);
        return k.lanes = z, k.return = v, k;
      } finally {
      }
    };
  }
  var Bu = Us(!0), Ns = Us(!1), au = !1;
  function jc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Bc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function eu(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function nu(l, t, u) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (P & 2) !== 0) {
      var e = a.pending;
      return e === null ? t.next = t : (t.next = e.next, e.next = t), a.pending = t, t = xe(l), ds(l, null, u), t;
    }
    return Xe(l, a, t, u), xe(l);
  }
  function Wa(l, t, u) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (u & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, zi(l, u);
    }
  }
  function Yc(l, t) {
    var u = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, u === a)) {
      var e = null, n = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var c = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          n === null ? e = n = c : n = n.next = c, u = u.next;
        } while (u !== null);
        n === null ? e = n = t : n = n.next = t;
      } else e = n = t;
      u = {
        baseState: a.baseState,
        firstBaseUpdate: e,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = t : l.next = t, u.lastBaseUpdate = t;
  }
  var Gc = !1;
  function $a() {
    if (Gc) {
      var l = ia;
      if (l !== null) throw l;
    }
  }
  function ka(l, t, u, a) {
    Gc = !1;
    var e = l.updateQueue;
    au = !1;
    var n = e.firstBaseUpdate, c = e.lastBaseUpdate, f = e.shared.pending;
    if (f !== null) {
      e.shared.pending = null;
      var i = f, h = i.next;
      i.next = null, c === null ? n = h : c.next = h, c = i;
      var b = l.alternate;
      b !== null && (b = b.updateQueue, f = b.lastBaseUpdate, f !== c && (f === null ? b.firstBaseUpdate = h : f.next = h, b.lastBaseUpdate = i));
    }
    if (n !== null) {
      var T = e.baseState;
      c = 0, b = h = i = null, f = n;
      do {
        var g = f.lane & -536870913, S = g !== f.lane;
        if (S ? (K & g) === g : (a & g) === g) {
          g !== 0 && g === fa && (Gc = !0), b !== null && (b = b.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          l: {
            var U = l, q = f;
            g = t;
            var fl = u;
            switch (q.tag) {
              case 1:
                if (U = q.payload, typeof U == "function") {
                  T = U.call(fl, T, g);
                  break l;
                }
                T = U;
                break l;
              case 3:
                U.flags = U.flags & -65537 | 128;
              case 0:
                if (U = q.payload, g = typeof U == "function" ? U.call(fl, T, g) : U, g == null) break l;
                T = p({}, T, g);
                break l;
              case 2:
                au = !0;
            }
          }
          g = f.callback, g !== null && (l.flags |= 64, S && (l.flags |= 8192), S = e.callbacks, S === null ? e.callbacks = [g] : S.push(g));
        } else
          S = {
            lane: g,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, b === null ? (h = b = S, i = T) : b = b.next = S, c |= g;
        if (f = f.next, f === null) {
          if (f = e.shared.pending, f === null)
            break;
          S = f, f = S.next, S.next = null, e.lastBaseUpdate = S, e.shared.pending = null;
        }
      } while (!0);
      b === null && (i = T), e.baseState = i, e.firstBaseUpdate = h, e.lastBaseUpdate = b, n === null && (e.shared.lanes = 0), yu |= c, l.lanes = c, l.memoizedState = T;
    }
  }
  function Hs(l, t) {
    if (typeof l != "function")
      throw Error(m(191, l));
    l.call(t);
  }
  function Rs(l, t) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        Hs(u[l], t);
  }
  var va = y(null), Fe = y(0);
  function Cs(l, t) {
    l = wt, D(Fe, l), D(va, t), wt = l | t.baseLanes;
  }
  function Qc() {
    D(Fe, wt), D(va, va.current);
  }
  function Xc() {
    wt = Fe.current, E(va), E(Fe);
  }
  var nt = y(null), St = null;
  function cu(l) {
    var t = l.alternate;
    D(rl, rl.current & 1), D(nt, l), St === null && (t === null || va.current !== null || t.memoizedState !== null) && (St = l);
  }
  function xc(l) {
    D(rl, rl.current), D(nt, l), St === null && (St = l);
  }
  function qs(l) {
    l.tag === 22 ? (D(rl, rl.current), D(nt, l), St === null && (St = l)) : fu();
  }
  function fu() {
    D(rl, rl.current), D(nt, nt.current);
  }
  function ct(l) {
    E(nt), St === l && (St = null), E(rl);
  }
  var rl = y(0);
  function Ie(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var u = t.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || Wf(u) || $f(u)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Qt = 0, Q = null, nl = null, Al = null, Pe = !1, da = !1, Yu = !1, ln = 0, Fa = 0, oa = null, Bd = 0;
  function gl() {
    throw Error(m(321));
  }
  function Zc(l, t) {
    if (t === null) return !1;
    for (var u = 0; u < t.length && u < l.length; u++)
      if (!at(l[u], t[u])) return !1;
    return !0;
  }
  function Vc(l, t, u, a, e, n) {
    return Qt = n, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, r.H = l === null || l.memoizedState === null ? g0 : ef, Yu = !1, n = u(a, e), Yu = !1, da && (n = js(
      t,
      u,
      a,
      e
    )), ps(l), n;
  }
  function ps(l) {
    r.H = le;
    var t = nl !== null && nl.next !== null;
    if (Qt = 0, Al = nl = Q = null, Pe = !1, Fa = 0, oa = null, t) throw Error(m(300));
    l === null || _l || (l = l.dependencies, l !== null && Le(l) && (_l = !0));
  }
  function js(l, t, u, a) {
    Q = l;
    var e = 0;
    do {
      if (da && (oa = null), Fa = 0, da = !1, 25 <= e) throw Error(m(301));
      if (e += 1, Al = nl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      r.H = S0, n = t(u, a);
    } while (da);
    return n;
  }
  function Yd() {
    var l = r.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Ia(t) : t, l = l.useState()[0], (nl !== null ? nl.memoizedState : null) !== l && (Q.flags |= 1024), t;
  }
  function Lc() {
    var l = ln !== 0;
    return ln = 0, l;
  }
  function Kc(l, t, u) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~u;
  }
  function Jc(l) {
    if (Pe) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Pe = !1;
    }
    Qt = 0, Al = nl = Q = null, da = !1, Fa = ln = 0, oa = null;
  }
  function xl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Al === null ? Q.memoizedState = Al = l : Al = Al.next = l, Al;
  }
  function zl() {
    if (nl === null) {
      var l = Q.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = nl.next;
    var t = Al === null ? Q.memoizedState : Al.next;
    if (t !== null)
      Al = t, nl = l;
    else {
      if (l === null)
        throw Q.alternate === null ? Error(m(467)) : Error(m(310));
      nl = l, l = {
        memoizedState: nl.memoizedState,
        baseState: nl.baseState,
        baseQueue: nl.baseQueue,
        queue: nl.queue,
        next: null
      }, Al === null ? Q.memoizedState = Al = l : Al = Al.next = l;
    }
    return Al;
  }
  function tn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ia(l) {
    var t = Fa;
    return Fa += 1, oa === null && (oa = []), l = Ms(oa, l, t), t = Q, (Al === null ? t.memoizedState : Al.next) === null && (t = t.alternate, r.H = t === null || t.memoizedState === null ? g0 : ef), l;
  }
  function un(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Ia(l);
      if (l.$$typeof === Dl) return pl(l);
    }
    throw Error(m(438, String(l)));
  }
  function wc(l) {
    var t = null, u = Q.updateQueue;
    if (u !== null && (t = u.memoCache), t == null) {
      var a = Q.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(e) {
          return e.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), u === null && (u = tn(), Q.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0)
      for (u = t.data[t.index] = Array(l), a = 0; a < l; a++)
        u[a] = Zu;
    return t.index++, u;
  }
  function Xt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function an(l) {
    var t = zl();
    return Wc(t, nl, l);
  }
  function Wc(l, t, u) {
    var a = l.queue;
    if (a === null) throw Error(m(311));
    a.lastRenderedReducer = u;
    var e = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (e !== null) {
        var c = e.next;
        e.next = n.next, n.next = c;
      }
      t.baseQueue = e = n, a.pending = null;
    }
    if (n = l.baseState, e === null) l.memoizedState = n;
    else {
      t = e.next;
      var f = c = null, i = null, h = t, b = !1;
      do {
        var T = h.lane & -536870913;
        if (T !== h.lane ? (K & T) === T : (Qt & T) === T) {
          var g = h.revertLane;
          if (g === 0)
            i !== null && (i = i.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }), T === fa && (b = !0);
          else if ((Qt & g) === g) {
            h = h.next, g === fa && (b = !0);
            continue;
          } else
            T = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }, i === null ? (f = i = T, c = n) : i = i.next = T, Q.lanes |= g, yu |= g;
          T = h.action, Yu && u(n, T), n = h.hasEagerState ? h.eagerState : u(n, T);
        } else
          g = {
            lane: T,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, i === null ? (f = i = g, c = n) : i = i.next = g, Q.lanes |= T, yu |= T;
        h = h.next;
      } while (h !== null && h !== t);
      if (i === null ? c = n : i.next = f, !at(n, l.memoizedState) && (_l = !0, b && (u = ia, u !== null)))
        throw u;
      l.memoizedState = n, l.baseState = c, l.baseQueue = i, a.lastRenderedState = n;
    }
    return e === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function $c(l) {
    var t = zl(), u = t.queue;
    if (u === null) throw Error(m(311));
    u.lastRenderedReducer = l;
    var a = u.dispatch, e = u.pending, n = t.memoizedState;
    if (e !== null) {
      u.pending = null;
      var c = e = e.next;
      do
        n = l(n, c.action), c = c.next;
      while (c !== e);
      at(n, t.memoizedState) || (_l = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), u.lastRenderedState = n;
    }
    return [n, a];
  }
  function Bs(l, t, u) {
    var a = Q, e = zl(), n = w;
    if (n) {
      if (u === void 0) throw Error(m(407));
      u = u();
    } else u = t();
    var c = !at(
      (nl || e).memoizedState,
      u
    );
    if (c && (e.memoizedState = u, _l = !0), e = e.queue, Ic(Qs.bind(null, a, e, l), [
      l
    ]), e.getSnapshot !== t || c || Al !== null && Al.memoizedState.tag & 1) {
      if (a.flags |= 2048, ha(
        9,
        { destroy: void 0 },
        Gs.bind(
          null,
          a,
          e,
          u,
          t
        ),
        null
      ), sl === null) throw Error(m(349));
      n || (Qt & 127) !== 0 || Ys(a, t, u);
    }
    return u;
  }
  function Ys(l, t, u) {
    l.flags |= 16384, l = { getSnapshot: t, value: u }, t = Q.updateQueue, t === null ? (t = tn(), Q.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
  }
  function Gs(l, t, u, a) {
    t.value = u, t.getSnapshot = a, Xs(t) && xs(l);
  }
  function Qs(l, t, u) {
    return u(function() {
      Xs(t) && xs(l);
    });
  }
  function Xs(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var u = t();
      return !at(l, u);
    } catch {
      return !0;
    }
  }
  function xs(l) {
    var t = Uu(l, 2);
    t !== null && Il(t, l, 2);
  }
  function kc(l) {
    var t = xl();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), Yu) {
        kt(!0);
        try {
          u();
        } finally {
          kt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xt,
      lastRenderedState: l
    }, t;
  }
  function Zs(l, t, u, a) {
    return l.baseState = u, Wc(
      l,
      nl,
      typeof a == "function" ? a : Xt
    );
  }
  function Gd(l, t, u, a, e) {
    if (cn(l)) throw Error(m(485));
    if (l = t.action, l !== null) {
      var n = {
        payload: e,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          n.listeners.push(c);
        }
      };
      r.T !== null ? u(!0) : n.isTransition = !1, a(n), u = t.pending, u === null ? (n.next = t.pending = n, Vs(t, n)) : (n.next = u.next, t.pending = u.next = n);
    }
  }
  function Vs(l, t) {
    var u = t.action, a = t.payload, e = l.state;
    if (t.isTransition) {
      var n = r.T, c = {};
      r.T = c;
      try {
        var f = u(e, a), i = r.S;
        i !== null && i(c, f), Ls(l, t, f);
      } catch (h) {
        Fc(l, t, h);
      } finally {
        n !== null && c.types !== null && (n.types = c.types), r.T = n;
      }
    } else
      try {
        n = u(e, a), Ls(l, t, n);
      } catch (h) {
        Fc(l, t, h);
      }
  }
  function Ls(l, t, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(a) {
        Ks(l, t, a);
      },
      function(a) {
        return Fc(l, t, a);
      }
    ) : Ks(l, t, u);
  }
  function Ks(l, t, u) {
    t.status = "fulfilled", t.value = u, Js(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, Vs(l, u)));
  }
  function Fc(l, t, u) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = u, Js(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function Js(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function ws(l, t) {
    return t;
  }
  function Ws(l, t) {
    if (w) {
      var u = sl.formState;
      if (u !== null) {
        l: {
          var a = Q;
          if (w) {
            if (dl) {
              t: {
                for (var e = dl, n = gt; e.nodeType !== 8; ) {
                  if (!n) {
                    e = null;
                    break t;
                  }
                  if (e = bt(
                    e.nextSibling
                  ), e === null) {
                    e = null;
                    break t;
                  }
                }
                n = e.data, e = n === "F!" || n === "F" ? e : null;
              }
              if (e) {
                dl = bt(
                  e.nextSibling
                ), a = e.data === "F!";
                break l;
              }
            }
            tu(a);
          }
          a = !1;
        }
        a && (t = u[0]);
      }
    }
    return u = xl(), u.memoizedState = u.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ws,
      lastRenderedState: t
    }, u.queue = a, u = o0.bind(
      null,
      Q,
      a
    ), a.dispatch = u, a = kc(!1), n = af.bind(
      null,
      Q,
      !1,
      a.queue
    ), a = xl(), e = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = e, u = Gd.bind(
      null,
      Q,
      e,
      n,
      u
    ), e.dispatch = u, a.memoizedState = l, [t, u, !1];
  }
  function $s(l) {
    var t = zl();
    return ks(t, nl, l);
  }
  function ks(l, t, u) {
    if (t = Wc(
      l,
      t,
      ws
    )[0], l = an(Xt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Ia(t);
      } catch (c) {
        throw c === sa ? we : c;
      }
    else a = t;
    t = zl();
    var e = t.queue, n = e.dispatch;
    return u !== t.memoizedState && (Q.flags |= 2048, ha(
      9,
      { destroy: void 0 },
      Qd.bind(null, e, u),
      null
    )), [a, n, l];
  }
  function Qd(l, t) {
    l.action = t;
  }
  function Fs(l) {
    var t = zl(), u = nl;
    if (u !== null)
      return ks(t, u, l);
    zl(), t = t.memoizedState, u = zl();
    var a = u.queue.dispatch;
    return u.memoizedState = l, [t, a, !1];
  }
  function ha(l, t, u, a) {
    return l = { tag: l, create: u, deps: a, inst: t, next: null }, t = Q.updateQueue, t === null && (t = tn(), Q.updateQueue = t), u = t.lastEffect, u === null ? t.lastEffect = l.next = l : (a = u.next, u.next = l, l.next = a, t.lastEffect = l), l;
  }
  function Is() {
    return zl().memoizedState;
  }
  function en(l, t, u, a) {
    var e = xl();
    Q.flags |= l, e.memoizedState = ha(
      1 | t,
      { destroy: void 0 },
      u,
      a === void 0 ? null : a
    );
  }
  function nn(l, t, u, a) {
    var e = zl();
    a = a === void 0 ? null : a;
    var n = e.memoizedState.inst;
    nl !== null && a !== null && Zc(a, nl.memoizedState.deps) ? e.memoizedState = ha(t, n, u, a) : (Q.flags |= l, e.memoizedState = ha(
      1 | t,
      n,
      u,
      a
    ));
  }
  function Ps(l, t) {
    en(8390656, 8, l, t);
  }
  function Ic(l, t) {
    nn(2048, 8, l, t);
  }
  function Xd(l) {
    Q.flags |= 4;
    var t = Q.updateQueue;
    if (t === null)
      t = tn(), Q.updateQueue = t, t.events = [l];
    else {
      var u = t.events;
      u === null ? t.events = [l] : u.push(l);
    }
  }
  function l0(l) {
    var t = zl().memoizedState;
    return Xd({ ref: t, nextImpl: l }), function() {
      if ((P & 2) !== 0) throw Error(m(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function t0(l, t) {
    return nn(4, 2, l, t);
  }
  function u0(l, t) {
    return nn(4, 4, l, t);
  }
  function a0(l, t) {
    if (typeof t == "function") {
      l = l();
      var u = t(l);
      return function() {
        typeof u == "function" ? u() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function e0(l, t, u) {
    u = u != null ? u.concat([l]) : null, nn(4, 4, a0.bind(null, t, l), u);
  }
  function Pc() {
  }
  function n0(l, t) {
    var u = zl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    return t !== null && Zc(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
  }
  function c0(l, t) {
    var u = zl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    if (t !== null && Zc(t, a[1]))
      return a[0];
    if (a = l(), Yu) {
      kt(!0);
      try {
        l();
      } finally {
        kt(!1);
      }
    }
    return u.memoizedState = [a, t], a;
  }
  function lf(l, t, u) {
    return u === void 0 || (Qt & 1073741824) !== 0 && (K & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = u, l = fy(), Q.lanes |= l, yu |= l, u);
  }
  function f0(l, t, u, a) {
    return at(u, t) ? u : va.current !== null ? (l = lf(l, u, a), at(l, t) || (_l = !0), l) : (Qt & 42) === 0 || (Qt & 1073741824) !== 0 && (K & 261930) === 0 ? (_l = !0, l.memoizedState = u) : (l = fy(), Q.lanes |= l, yu |= l, t);
  }
  function i0(l, t, u, a, e) {
    var n = O.p;
    O.p = n !== 0 && 8 > n ? n : 8;
    var c = r.T, f = {};
    r.T = f, af(l, !1, t, u);
    try {
      var i = e(), h = r.S;
      if (h !== null && h(f, i), i !== null && typeof i == "object" && typeof i.then == "function") {
        var b = jd(
          i,
          a
        );
        Pa(
          l,
          t,
          b,
          st(l)
        );
      } else
        Pa(
          l,
          t,
          a,
          st(l)
        );
    } catch (T) {
      Pa(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: T },
        st()
      );
    } finally {
      O.p = n, c !== null && f.types !== null && (c.types = f.types), r.T = c;
    }
  }
  function xd() {
  }
  function tf(l, t, u, a) {
    if (l.tag !== 5) throw Error(m(476));
    var e = s0(l).queue;
    i0(
      l,
      e,
      t,
      B,
      u === null ? xd : function() {
        return y0(l), u(a);
      }
    );
  }
  function s0(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: B,
      baseState: B,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xt,
        lastRenderedState: B
      },
      next: null
    };
    var u = {};
    return t.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xt,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function y0(l) {
    var t = s0(l);
    t.next === null && (t = l.alternate.memoizedState), Pa(
      l,
      t.next.queue,
      {},
      st()
    );
  }
  function uf() {
    return pl(ge);
  }
  function v0() {
    return zl().memoizedState;
  }
  function d0() {
    return zl().memoizedState;
  }
  function Zd(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var u = st();
          l = eu(u);
          var a = nu(t, l, u);
          a !== null && (Il(a, t, u), Wa(a, t, u)), t = { cache: Rc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Vd(l, t, u) {
    var a = st();
    u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(l) ? h0(t, u) : (u = zc(l, t, u, a), u !== null && (Il(u, l, a), m0(u, t, a)));
  }
  function o0(l, t, u) {
    var a = st();
    Pa(l, t, u, a);
  }
  function Pa(l, t, u, a) {
    var e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (cn(l)) h0(t, e);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var c = t.lastRenderedState, f = n(c, u);
          if (e.hasEagerState = !0, e.eagerState = f, at(f, c))
            return Xe(l, t, e, 0), sl === null && Qe(), !1;
        } catch {
        } finally {
        }
      if (u = zc(l, t, e, a), u !== null)
        return Il(u, l, a), m0(u, t, a), !0;
    }
    return !1;
  }
  function af(l, t, u, a) {
    if (a = {
      lane: 2,
      revertLane: Bf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(l)) {
      if (t) throw Error(m(479));
    } else
      t = zc(
        l,
        u,
        a,
        2
      ), t !== null && Il(t, l, 2);
  }
  function cn(l) {
    var t = l.alternate;
    return l === Q || t !== null && t === Q;
  }
  function h0(l, t) {
    da = Pe = !0;
    var u = l.pending;
    u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t;
  }
  function m0(l, t, u) {
    if ((u & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, zi(l, u);
    }
  }
  var le = {
    readContext: pl,
    use: un,
    useCallback: gl,
    useContext: gl,
    useEffect: gl,
    useImperativeHandle: gl,
    useLayoutEffect: gl,
    useInsertionEffect: gl,
    useMemo: gl,
    useReducer: gl,
    useRef: gl,
    useState: gl,
    useDebugValue: gl,
    useDeferredValue: gl,
    useTransition: gl,
    useSyncExternalStore: gl,
    useId: gl,
    useHostTransitionStatus: gl,
    useFormState: gl,
    useActionState: gl,
    useOptimistic: gl,
    useMemoCache: gl,
    useCacheRefresh: gl
  };
  le.useEffectEvent = gl;
  var g0 = {
    readContext: pl,
    use: un,
    useCallback: function(l, t) {
      return xl().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: pl,
    useEffect: Ps,
    useImperativeHandle: function(l, t, u) {
      u = u != null ? u.concat([l]) : null, en(
        4194308,
        4,
        a0.bind(null, t, l),
        u
      );
    },
    useLayoutEffect: function(l, t) {
      return en(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      en(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var u = xl();
      t = t === void 0 ? null : t;
      var a = l();
      if (Yu) {
        kt(!0);
        try {
          l();
        } finally {
          kt(!1);
        }
      }
      return u.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, u) {
      var a = xl();
      if (u !== void 0) {
        var e = u(t);
        if (Yu) {
          kt(!0);
          try {
            u(t);
          } finally {
            kt(!1);
          }
        }
      } else e = t;
      return a.memoizedState = a.baseState = e, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: e
      }, a.queue = l, l = l.dispatch = Vd.bind(
        null,
        Q,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = xl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = kc(l);
      var t = l.queue, u = o0.bind(null, Q, t);
      return t.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: Pc,
    useDeferredValue: function(l, t) {
      var u = xl();
      return lf(u, l, t);
    },
    useTransition: function() {
      var l = kc(!1);
      return l = i0.bind(
        null,
        Q,
        l.queue,
        !0,
        !1
      ), xl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, u) {
      var a = Q, e = xl();
      if (w) {
        if (u === void 0)
          throw Error(m(407));
        u = u();
      } else {
        if (u = t(), sl === null)
          throw Error(m(349));
        (K & 127) !== 0 || Ys(a, t, u);
      }
      e.memoizedState = u;
      var n = { value: u, getSnapshot: t };
      return e.queue = n, Ps(Qs.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, ha(
        9,
        { destroy: void 0 },
        Gs.bind(
          null,
          a,
          n,
          u,
          t
        ),
        null
      ), u;
    },
    useId: function() {
      var l = xl(), t = sl.identifierPrefix;
      if (w) {
        var u = Ut, a = Dt;
        u = (a & ~(1 << 32 - ut(a) - 1)).toString(32) + u, t = "_" + t + "R_" + u, u = ln++, 0 < u && (t += "H" + u.toString(32)), t += "_";
      } else
        u = Bd++, t = "_" + t + "r_" + u.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: uf,
    useFormState: Ws,
    useActionState: Ws,
    useOptimistic: function(l) {
      var t = xl();
      t.memoizedState = t.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = u, t = af.bind(
        null,
        Q,
        !0,
        u
      ), u.dispatch = t, [l, t];
    },
    useMemoCache: wc,
    useCacheRefresh: function() {
      return xl().memoizedState = Zd.bind(
        null,
        Q
      );
    },
    useEffectEvent: function(l) {
      var t = xl(), u = { impl: l };
      return t.memoizedState = u, function() {
        if ((P & 2) !== 0)
          throw Error(m(440));
        return u.impl.apply(void 0, arguments);
      };
    }
  }, ef = {
    readContext: pl,
    use: un,
    useCallback: n0,
    useContext: pl,
    useEffect: Ic,
    useImperativeHandle: e0,
    useInsertionEffect: t0,
    useLayoutEffect: u0,
    useMemo: c0,
    useReducer: an,
    useRef: Is,
    useState: function() {
      return an(Xt);
    },
    useDebugValue: Pc,
    useDeferredValue: function(l, t) {
      var u = zl();
      return f0(
        u,
        nl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = an(Xt)[0], t = zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Ia(l),
        t
      ];
    },
    useSyncExternalStore: Bs,
    useId: v0,
    useHostTransitionStatus: uf,
    useFormState: $s,
    useActionState: $s,
    useOptimistic: function(l, t) {
      var u = zl();
      return Zs(u, nl, l, t);
    },
    useMemoCache: wc,
    useCacheRefresh: d0
  };
  ef.useEffectEvent = l0;
  var S0 = {
    readContext: pl,
    use: un,
    useCallback: n0,
    useContext: pl,
    useEffect: Ic,
    useImperativeHandle: e0,
    useInsertionEffect: t0,
    useLayoutEffect: u0,
    useMemo: c0,
    useReducer: $c,
    useRef: Is,
    useState: function() {
      return $c(Xt);
    },
    useDebugValue: Pc,
    useDeferredValue: function(l, t) {
      var u = zl();
      return nl === null ? lf(u, l, t) : f0(
        u,
        nl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = $c(Xt)[0], t = zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Ia(l),
        t
      ];
    },
    useSyncExternalStore: Bs,
    useId: v0,
    useHostTransitionStatus: uf,
    useFormState: Fs,
    useActionState: Fs,
    useOptimistic: function(l, t) {
      var u = zl();
      return nl !== null ? Zs(u, nl, l, t) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: wc,
    useCacheRefresh: d0
  };
  S0.useEffectEvent = l0;
  function nf(l, t, u, a) {
    t = l.memoizedState, u = u(a, t), u = u == null ? t : p({}, t, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var cf = {
    enqueueSetState: function(l, t, u) {
      l = l._reactInternals;
      var a = st(), e = eu(a);
      e.payload = t, u != null && (e.callback = u), t = nu(l, e, a), t !== null && (Il(t, l, a), Wa(t, l, a));
    },
    enqueueReplaceState: function(l, t, u) {
      l = l._reactInternals;
      var a = st(), e = eu(a);
      e.tag = 1, e.payload = t, u != null && (e.callback = u), t = nu(l, e, a), t !== null && (Il(t, l, a), Wa(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var u = st(), a = eu(u);
      a.tag = 2, t != null && (a.callback = t), t = nu(l, a, u), t !== null && (Il(t, l, u), Wa(t, l, u));
    }
  };
  function b0(l, t, u, a, e, n, c) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, c) : t.prototype && t.prototype.isPureReactComponent ? !Xa(u, a) || !Xa(e, n) : !0;
  }
  function r0(l, t, u, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(u, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(u, a), t.state !== l && cf.enqueueReplaceState(t, t.state, null);
  }
  function Gu(l, t) {
    var u = t;
    if ("ref" in t) {
      u = {};
      for (var a in t)
        a !== "ref" && (u[a] = t[a]);
    }
    if (l = l.defaultProps) {
      u === t && (u = p({}, u));
      for (var e in l)
        u[e] === void 0 && (u[e] = l[e]);
    }
    return u;
  }
  function z0(l) {
    Ge(l);
  }
  function T0(l) {
    console.error(l);
  }
  function E0(l) {
    Ge(l);
  }
  function fn(l, t) {
    try {
      var u = l.onUncaughtError;
      u(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function A0(l, t, u) {
    try {
      var a = l.onCaughtError;
      a(u.value, {
        componentStack: u.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (e) {
      setTimeout(function() {
        throw e;
      });
    }
  }
  function ff(l, t, u) {
    return u = eu(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      fn(l, t);
    }, u;
  }
  function _0(l) {
    return l = eu(l), l.tag = 3, l;
  }
  function M0(l, t, u, a) {
    var e = u.type.getDerivedStateFromError;
    if (typeof e == "function") {
      var n = a.value;
      l.payload = function() {
        return e(n);
      }, l.callback = function() {
        A0(t, u, a);
      };
    }
    var c = u.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (l.callback = function() {
      A0(t, u, a), typeof e != "function" && (vu === null ? vu = /* @__PURE__ */ new Set([this]) : vu.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function Ld(l, t, u, a, e) {
    if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = u.alternate, t !== null && ca(
        t,
        u,
        e,
        !0
      ), u = nt.current, u !== null) {
        switch (u.tag) {
          case 31:
          case 13:
            return St === null ? zn() : u.alternate === null && Sl === 0 && (Sl = 3), u.flags &= -257, u.flags |= 65536, u.lanes = e, a === We ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), qf(l, a, e)), !1;
          case 22:
            return u.flags |= 65536, a === We ? u.flags |= 16384 : (t = u.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, u.updateQueue = t) : (u = t.retryQueue, u === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : u.add(a)), qf(l, a, e)), !1;
        }
        throw Error(m(435, u.tag));
      }
      return qf(l, a, e), zn(), !1;
    }
    if (w)
      return t = nt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = e, a !== Oc && (l = Error(m(422), { cause: a }), Va(ot(l, u)))) : (a !== Oc && (t = Error(m(423), {
        cause: a
      }), Va(
        ot(t, u)
      )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, a = ot(a, u), e = ff(
        l.stateNode,
        a,
        e
      ), Yc(l, e), Sl !== 4 && (Sl = 2)), !1;
    var n = Error(m(520), { cause: a });
    if (n = ot(n, u), ie === null ? ie = [n] : ie.push(n), Sl !== 4 && (Sl = 2), t === null) return !0;
    a = ot(a, u), u = t;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = e & -e, u.lanes |= l, l = ff(u.stateNode, a, l), Yc(u, l), !1;
        case 1:
          if (t = u.type, n = u.stateNode, (u.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (vu === null || !vu.has(n))))
            return u.flags |= 65536, e &= -e, u.lanes |= e, e = _0(e), M0(
              e,
              l,
              u,
              a
            ), Yc(u, e), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var sf = Error(m(461)), _l = !1;
  function jl(l, t, u, a) {
    t.child = l === null ? Ns(t, null, u, a) : Bu(
      t,
      l.child,
      u,
      a
    );
  }
  function O0(l, t, u, a, e) {
    u = u.render;
    var n = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var f in a)
        f !== "ref" && (c[f] = a[f]);
    } else c = a;
    return Cu(t), a = Vc(
      l,
      t,
      u,
      c,
      n,
      e
    ), f = Lc(), l !== null && !_l ? (Kc(l, t, e), xt(l, t, e)) : (w && f && _c(t), t.flags |= 1, jl(l, t, a, e), t.child);
  }
  function D0(l, t, u, a, e) {
    if (l === null) {
      var n = u.type;
      return typeof n == "function" && !Tc(n) && n.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = n, U0(
        l,
        t,
        n,
        a,
        e
      )) : (l = Ze(
        u.type,
        null,
        a,
        t,
        t.mode,
        e
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !Sf(l, e)) {
      var c = n.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Xa, u(c, a) && l.ref === t.ref)
        return xt(l, t, e);
    }
    return t.flags |= 1, l = jt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function U0(l, t, u, a, e) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Xa(n, a) && l.ref === t.ref)
        if (_l = !1, t.pendingProps = a = n, Sf(l, e))
          (l.flags & 131072) !== 0 && (_l = !0);
        else
          return t.lanes = l.lanes, xt(l, t, e);
    }
    return yf(
      l,
      t,
      u,
      a,
      e
    );
  }
  function N0(l, t, u, a) {
    var e = a.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | u : u, l !== null) {
          for (a = t.child = l.child, e = 0; a !== null; )
            e = e | a.lanes | a.childLanes, a = a.sibling;
          a = e & ~n;
        } else a = 0, t.child = null;
        return H0(
          l,
          t,
          n,
          u,
          a
        );
      }
      if ((u & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Je(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Cs(t, n) : Qc(), qs(t);
      else
        return a = t.lanes = 536870912, H0(
          l,
          t,
          n !== null ? n.baseLanes | u : u,
          u,
          a
        );
    } else
      n !== null ? (Je(t, n.cachePool), Cs(t, n), fu(), t.memoizedState = null) : (l !== null && Je(t, null), Qc(), fu());
    return jl(l, t, e, u), t.child;
  }
  function te(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function H0(l, t, u, a, e) {
    var n = qc();
    return n = n === null ? null : { parent: El._currentValue, pool: n }, t.memoizedState = {
      baseLanes: u,
      cachePool: n
    }, l !== null && Je(t, null), Qc(), qs(t), l !== null && ca(l, t, a, !0), t.childLanes = e, null;
  }
  function sn(l, t) {
    return t = vn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function R0(l, t, u) {
    return Bu(t, l.child, null, u), l = sn(t, t.pendingProps), l.flags |= 2, ct(t), t.memoizedState = null, l;
  }
  function Kd(l, t, u) {
    var a = t.pendingProps, e = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (w) {
        if (a.mode === "hidden")
          return l = sn(t, a), t.lanes = 536870912, te(null, l);
        if (xc(t), (l = dl) ? (l = Vy(
          l,
          gt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Pt !== null ? { id: Dt, overflow: Ut } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = hs(l), u.return = t, t.child = u, ql = t, dl = null)) : l = null, l === null) throw tu(t);
        return t.lanes = 536870912, null;
      }
      return sn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if (xc(t), e)
        if (t.flags & 256)
          t.flags &= -257, t = R0(
            l,
            t,
            u
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(m(558));
      else if (_l || ca(l, t, u, !1), e = (u & l.childLanes) !== 0, _l || e) {
        if (a = sl, a !== null && (c = Ti(a, u), c !== 0 && c !== n.retryLane))
          throw n.retryLane = c, Uu(l, c), Il(a, l, c), sf;
        zn(), t = R0(
          l,
          t,
          u
        );
      } else
        l = n.treeContext, dl = bt(c.nextSibling), ql = t, w = !0, lu = null, gt = !1, l !== null && Ss(t, l), t = sn(t, a), t.flags |= 4096;
      return t;
    }
    return l = jt(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function yn(l, t) {
    var u = t.ref;
    if (u === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(m(284));
      (l === null || l.ref !== u) && (t.flags |= 4194816);
    }
  }
  function yf(l, t, u, a, e) {
    return Cu(t), u = Vc(
      l,
      t,
      u,
      a,
      void 0,
      e
    ), a = Lc(), l !== null && !_l ? (Kc(l, t, e), xt(l, t, e)) : (w && a && _c(t), t.flags |= 1, jl(l, t, u, e), t.child);
  }
  function C0(l, t, u, a, e, n) {
    return Cu(t), t.updateQueue = null, u = js(
      t,
      a,
      u,
      e
    ), ps(l), a = Lc(), l !== null && !_l ? (Kc(l, t, n), xt(l, t, n)) : (w && a && _c(t), t.flags |= 1, jl(l, t, u, n), t.child);
  }
  function q0(l, t, u, a, e) {
    if (Cu(t), t.stateNode === null) {
      var n = ua, c = u.contextType;
      typeof c == "object" && c !== null && (n = pl(c)), n = new u(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = cf, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, jc(t), c = u.contextType, n.context = typeof c == "object" && c !== null ? pl(c) : ua, n.state = t.memoizedState, c = u.getDerivedStateFromProps, typeof c == "function" && (nf(
        t,
        u,
        c,
        a
      ), n.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (c = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), c !== n.state && cf.enqueueReplaceState(n, n.state, null), ka(t, a, n, e), $a(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var f = t.memoizedProps, i = Gu(u, f);
      n.props = i;
      var h = n.context, b = u.contextType;
      c = ua, typeof b == "object" && b !== null && (c = pl(b));
      var T = u.getDerivedStateFromProps;
      b = typeof T == "function" || typeof n.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, b || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f || h !== c) && r0(
        t,
        n,
        a,
        c
      ), au = !1;
      var g = t.memoizedState;
      n.state = g, ka(t, a, n, e), $a(), h = t.memoizedState, f || g !== h || au ? (typeof T == "function" && (nf(
        t,
        u,
        T,
        a
      ), h = t.memoizedState), (i = au || b0(
        t,
        u,
        i,
        a,
        g,
        h,
        c
      )) ? (b || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = h), n.props = a, n.state = h, n.context = c, a = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, Bc(l, t), c = t.memoizedProps, b = Gu(u, c), n.props = b, T = t.pendingProps, g = n.context, h = u.contextType, i = ua, typeof h == "object" && h !== null && (i = pl(h)), f = u.getDerivedStateFromProps, (h = typeof f == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c !== T || g !== i) && r0(
        t,
        n,
        a,
        i
      ), au = !1, g = t.memoizedState, n.state = g, ka(t, a, n, e), $a();
      var S = t.memoizedState;
      c !== T || g !== S || au || l !== null && l.dependencies !== null && Le(l.dependencies) ? (typeof f == "function" && (nf(
        t,
        u,
        f,
        a
      ), S = t.memoizedState), (b = au || b0(
        t,
        u,
        b,
        a,
        g,
        S,
        i
      ) || l !== null && l.dependencies !== null && Le(l.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, S, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        S,
        i
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && g === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && g === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = S), n.props = a, n.state = S, n.context = i, a = b) : (typeof n.componentDidUpdate != "function" || c === l.memoizedProps && g === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || c === l.memoizedProps && g === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, yn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = Bu(
      t,
      l.child,
      null,
      e
    ), t.child = Bu(
      t,
      null,
      u,
      e
    )) : jl(l, t, u, e), t.memoizedState = n.state, l = t.child) : l = xt(
      l,
      t,
      e
    ), l;
  }
  function p0(l, t, u, a) {
    return Hu(), t.flags |= 256, jl(l, t, u, a), t.child;
  }
  var vf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function df(l) {
    return { baseLanes: l, cachePool: As() };
  }
  function of(l, t, u) {
    return l = l !== null ? l.childLanes & ~u : 0, t && (l |= it), l;
  }
  function j0(l, t, u) {
    var a = t.pendingProps, e = !1, n = (t.flags & 128) !== 0, c;
    if ((c = n) || (c = l !== null && l.memoizedState === null ? !1 : (rl.current & 2) !== 0), c && (e = !0, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (w) {
        if (e ? cu(t) : fu(), (l = dl) ? (l = Vy(
          l,
          gt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Pt !== null ? { id: Dt, overflow: Ut } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = hs(l), u.return = t, t.child = u, ql = t, dl = null)) : l = null, l === null) throw tu(t);
        return $f(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, e ? (fu(), e = t.mode, f = vn(
        { mode: "hidden", children: f },
        e
      ), a = Nu(
        a,
        e,
        u,
        null
      ), f.return = t, a.return = t, f.sibling = a, t.child = f, a = t.child, a.memoizedState = df(u), a.childLanes = of(
        l,
        c,
        u
      ), t.memoizedState = vf, te(null, a)) : (cu(t), hf(t, f));
    }
    var i = l.memoizedState;
    if (i !== null && (f = i.dehydrated, f !== null)) {
      if (n)
        t.flags & 256 ? (cu(t), t.flags &= -257, t = mf(
          l,
          t,
          u
        )) : t.memoizedState !== null ? (fu(), t.child = l.child, t.flags |= 128, t = null) : (fu(), f = a.fallback, e = t.mode, a = vn(
          { mode: "visible", children: a.children },
          e
        ), f = Nu(
          f,
          e,
          u,
          null
        ), f.flags |= 2, a.return = t, f.return = t, a.sibling = f, t.child = a, Bu(
          t,
          l.child,
          null,
          u
        ), a = t.child, a.memoizedState = df(u), a.childLanes = of(
          l,
          c,
          u
        ), t.memoizedState = vf, t = te(null, a));
      else if (cu(t), $f(f)) {
        if (c = f.nextSibling && f.nextSibling.dataset, c) var h = c.dgst;
        c = h, a = Error(m(419)), a.stack = "", a.digest = c, Va({ value: a, source: null, stack: null }), t = mf(
          l,
          t,
          u
        );
      } else if (_l || ca(l, t, u, !1), c = (u & l.childLanes) !== 0, _l || c) {
        if (c = sl, c !== null && (a = Ti(c, u), a !== 0 && a !== i.retryLane))
          throw i.retryLane = a, Uu(l, a), Il(c, l, a), sf;
        Wf(f) || zn(), t = mf(
          l,
          t,
          u
        );
      } else
        Wf(f) ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, dl = bt(
          f.nextSibling
        ), ql = t, w = !0, lu = null, gt = !1, l !== null && Ss(t, l), t = hf(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return e ? (fu(), f = a.fallback, e = t.mode, i = l.child, h = i.sibling, a = jt(i, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = i.subtreeFlags & 65011712, h !== null ? f = jt(
      h,
      f
    ) : (f = Nu(
      f,
      e,
      u,
      null
    ), f.flags |= 2), f.return = t, a.return = t, a.sibling = f, t.child = a, te(null, a), a = t.child, f = l.child.memoizedState, f === null ? f = df(u) : (e = f.cachePool, e !== null ? (i = El._currentValue, e = e.parent !== i ? { parent: i, pool: i } : e) : e = As(), f = {
      baseLanes: f.baseLanes | u,
      cachePool: e
    }), a.memoizedState = f, a.childLanes = of(
      l,
      c,
      u
    ), t.memoizedState = vf, te(l.child, a)) : (cu(t), u = l.child, l = u.sibling, u = jt(u, {
      mode: "visible",
      children: a.children
    }), u.return = t, u.sibling = null, l !== null && (c = t.deletions, c === null ? (t.deletions = [l], t.flags |= 16) : c.push(l)), t.child = u, t.memoizedState = null, u);
  }
  function hf(l, t) {
    return t = vn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function vn(l, t) {
    return l = et(22, l, null, t), l.lanes = 0, l;
  }
  function mf(l, t, u) {
    return Bu(t, l.child, null, u), l = hf(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function B0(l, t, u) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Nc(l.return, t, u);
  }
  function gf(l, t, u, a, e, n) {
    var c = l.memoizedState;
    c === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: u,
      tailMode: e,
      treeForkCount: n
    } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = u, c.tailMode = e, c.treeForkCount = n);
  }
  function Y0(l, t, u) {
    var a = t.pendingProps, e = a.revealOrder, n = a.tail;
    a = a.children;
    var c = rl.current, f = (c & 2) !== 0;
    if (f ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, D(rl, c), jl(l, t, a, u), a = w ? Za : 0, !f && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && B0(l, u, t);
        else if (l.tag === 19)
          B0(l, u, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (e) {
      case "forwards":
        for (u = t.child, e = null; u !== null; )
          l = u.alternate, l !== null && Ie(l) === null && (e = u), u = u.sibling;
        u = e, u === null ? (e = t.child, t.child = null) : (e = u.sibling, u.sibling = null), gf(
          t,
          !1,
          e,
          u,
          n,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (u = null, e = t.child, t.child = null; e !== null; ) {
          if (l = e.alternate, l !== null && Ie(l) === null) {
            t.child = e;
            break;
          }
          l = e.sibling, e.sibling = u, u = e, e = l;
        }
        gf(
          t,
          !0,
          u,
          null,
          n,
          a
        );
        break;
      case "together":
        gf(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function xt(l, t, u) {
    if (l !== null && (t.dependencies = l.dependencies), yu |= t.lanes, (u & t.childLanes) === 0)
      if (l !== null) {
        if (ca(
          l,
          t,
          u,
          !1
        ), (u & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(m(153));
    if (t.child !== null) {
      for (l = t.child, u = jt(l, l.pendingProps), t.child = u, u.return = t; l.sibling !== null; )
        l = l.sibling, u = u.sibling = jt(l, l.pendingProps), u.return = t;
      u.sibling = null;
    }
    return t.child;
  }
  function Sf(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Le(l)));
  }
  function Jd(l, t, u) {
    switch (t.tag) {
      case 3:
        Xl(t, t.stateNode.containerInfo), uu(t, El, l.memoizedState.cache), Hu();
        break;
      case 27:
      case 5:
        Da(t);
        break;
      case 4:
        Xl(t, t.stateNode.containerInfo);
        break;
      case 10:
        uu(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, xc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (cu(t), t.flags |= 128, null) : (u & t.child.childLanes) !== 0 ? j0(l, t, u) : (cu(t), l = xt(
            l,
            t,
            u
          ), l !== null ? l.sibling : null);
        cu(t);
        break;
      case 19:
        var e = (l.flags & 128) !== 0;
        if (a = (u & t.childLanes) !== 0, a || (ca(
          l,
          t,
          u,
          !1
        ), a = (u & t.childLanes) !== 0), e) {
          if (a)
            return Y0(
              l,
              t,
              u
            );
          t.flags |= 128;
        }
        if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), D(rl, rl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, N0(
          l,
          t,
          u,
          t.pendingProps
        );
      case 24:
        uu(t, El, l.memoizedState.cache);
    }
    return xt(l, t, u);
  }
  function G0(l, t, u) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        _l = !0;
      else {
        if (!Sf(l, u) && (t.flags & 128) === 0)
          return _l = !1, Jd(
            l,
            t,
            u
          );
        _l = (l.flags & 131072) !== 0;
      }
    else
      _l = !1, w && (t.flags & 1048576) !== 0 && gs(t, Za, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = pu(t.elementType), t.type = l, typeof l == "function")
            Tc(l) ? (a = Gu(l, a), t.tag = 1, t = q0(
              null,
              t,
              l,
              a,
              u
            )) : (t.tag = 0, t = yf(
              null,
              t,
              l,
              a,
              u
            ));
          else {
            if (l != null) {
              var e = l.$$typeof;
              if (e === Tl) {
                t.tag = 11, t = O0(
                  null,
                  t,
                  l,
                  a,
                  u
                );
                break l;
              } else if (e === x) {
                t.tag = 14, t = D0(
                  null,
                  t,
                  l,
                  a,
                  u
                );
                break l;
              }
            }
            throw t = Rt(l) || l, Error(m(306, t, ""));
          }
        }
        return t;
      case 0:
        return yf(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 1:
        return a = t.type, e = Gu(
          a,
          t.pendingProps
        ), q0(
          l,
          t,
          a,
          e,
          u
        );
      case 3:
        l: {
          if (Xl(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(m(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          e = n.element, Bc(l, t), ka(t, a, null, u);
          var c = t.memoizedState;
          if (a = c.cache, uu(t, El, a), a !== n.cache && Hc(
            t,
            [El],
            u,
            !0
          ), $a(), a = c.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: c.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = p0(
                l,
                t,
                a,
                u
              );
              break l;
            } else if (a !== e) {
              e = ot(
                Error(m(424)),
                t
              ), Va(e), t = p0(
                l,
                t,
                a,
                u
              );
              break l;
            } else {
              switch (l = t.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (dl = bt(l.firstChild), ql = t, w = !0, lu = null, gt = !0, u = Ns(
                t,
                null,
                a,
                u
              ), t.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
            }
          else {
            if (Hu(), a === e) {
              t = xt(
                l,
                t,
                u
              );
              break l;
            }
            jl(l, t, a, u);
          }
          t = t.child;
        }
        return t;
      case 26:
        return yn(l, t), l === null ? (u = $y(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = u : w || (u = t.type, l = t.pendingProps, a = Dn(
          Z.current
        ).createElement(u), a[Cl] = t, a[Jl] = l, Bl(a, u, l), Ul(a), t.stateNode = a) : t.memoizedState = $y(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Da(t), l === null && w && (a = t.stateNode = Jy(
          t.type,
          t.pendingProps,
          Z.current
        ), ql = t, gt = !0, e = dl, mu(t.type) ? (kf = e, dl = bt(a.firstChild)) : dl = e), jl(
          l,
          t,
          t.pendingProps.children,
          u
        ), yn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && w && ((e = a = dl) && (a = Ao(
          a,
          t.type,
          t.pendingProps,
          gt
        ), a !== null ? (t.stateNode = a, ql = t, dl = bt(a.firstChild), gt = !1, e = !0) : e = !1), e || tu(t)), Da(t), e = t.type, n = t.pendingProps, c = l !== null ? l.memoizedProps : null, a = n.children, Kf(e, n) ? a = null : c !== null && Kf(e, c) && (t.flags |= 32), t.memoizedState !== null && (e = Vc(
          l,
          t,
          Yd,
          null,
          null,
          u
        ), ge._currentValue = e), yn(l, t), jl(l, t, a, u), t.child;
      case 6:
        return l === null && w && ((l = u = dl) && (u = _o(
          u,
          t.pendingProps,
          gt
        ), u !== null ? (t.stateNode = u, ql = t, dl = null, l = !0) : l = !1), l || tu(t)), null;
      case 13:
        return j0(l, t, u);
      case 4:
        return Xl(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = Bu(
          t,
          null,
          a,
          u
        ) : jl(l, t, a, u), t.child;
      case 11:
        return O0(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 7:
        return jl(
          l,
          t,
          t.pendingProps,
          u
        ), t.child;
      case 8:
        return jl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 12:
        return jl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 10:
        return a = t.pendingProps, uu(t, t.type, a.value), jl(l, t, a.children, u), t.child;
      case 9:
        return e = t.type._context, a = t.pendingProps.children, Cu(t), e = pl(e), a = a(e), t.flags |= 1, jl(l, t, a, u), t.child;
      case 14:
        return D0(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 15:
        return U0(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 19:
        return Y0(l, t, u);
      case 31:
        return Kd(l, t, u);
      case 22:
        return N0(
          l,
          t,
          u,
          t.pendingProps
        );
      case 24:
        return Cu(t), a = pl(El), l === null ? (e = qc(), e === null && (e = sl, n = Rc(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= u), e = n), t.memoizedState = { parent: a, cache: e }, jc(t), uu(t, El, e)) : ((l.lanes & u) !== 0 && (Bc(l, t), ka(t, null, null, u), $a()), e = l.memoizedState, n = t.memoizedState, e.parent !== a ? (e = { parent: a, cache: a }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), uu(t, El, a)) : (a = n.cache, uu(t, El, a), a !== e.cache && Hc(
          t,
          [El],
          u,
          !0
        ))), jl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(m(156, t.tag));
  }
  function Zt(l) {
    l.flags |= 4;
  }
  function bf(l, t, u, a, e) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (e & 335544128) === e)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (vy()) l.flags |= 8192;
        else
          throw ju = We, pc;
    } else l.flags &= -16777217;
  }
  function Q0(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !lv(t))
      if (vy()) l.flags |= 8192;
      else
        throw ju = We, pc;
  }
  function dn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? bi() : 536870912, l.lanes |= t, ba |= t);
  }
  function ue(l, t) {
    if (!w)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var u = null; t !== null; )
            t.alternate !== null && (u = t), t = t.sibling;
          u === null ? l.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = l.tail;
          for (var a = null; u !== null; )
            u.alternate !== null && (a = u), u = u.sibling;
          a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
      }
  }
  function ol(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, u = 0, a = 0;
    if (t)
      for (var e = l.child; e !== null; )
        u |= e.lanes | e.childLanes, a |= e.subtreeFlags & 65011712, a |= e.flags & 65011712, e.return = l, e = e.sibling;
    else
      for (e = l.child; e !== null; )
        u |= e.lanes | e.childLanes, a |= e.subtreeFlags, a |= e.flags, e.return = l, e = e.sibling;
    return l.subtreeFlags |= a, l.childLanes = u, t;
  }
  function wd(l, t, u) {
    var a = t.pendingProps;
    switch (Mc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ol(t), null;
      case 1:
        return ol(t), null;
      case 3:
        return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Gt(El), bl(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (na(t) ? Zt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Dc())), ol(t), null;
      case 26:
        var e = t.type, n = t.memoizedState;
        return l === null ? (Zt(t), n !== null ? (ol(t), Q0(t, n)) : (ol(t), bf(
          t,
          e,
          null,
          a,
          u
        ))) : n ? n !== l.memoizedState ? (Zt(t), ol(t), Q0(t, n)) : (ol(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Zt(t), ol(t), bf(
          t,
          e,
          l,
          a,
          u
        )), null;
      case 27:
        if (Ee(t), u = Z.current, e = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && Zt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(m(166));
            return ol(t), null;
          }
          l = H.current, na(t) ? bs(t) : (l = Jy(e, a, u), t.stateNode = l, Zt(t));
        }
        return ol(t), null;
      case 5:
        if (Ee(t), e = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && Zt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(m(166));
            return ol(t), null;
          }
          if (n = H.current, na(t))
            bs(t);
          else {
            var c = Dn(
              Z.current
            );
            switch (n) {
              case 1:
                n = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  e
                );
                break;
              case 2:
                n = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  e
                );
                break;
              default:
                switch (e) {
                  case "svg":
                    n = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      e
                    );
                    break;
                  case "math":
                    n = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      e
                    );
                    break;
                  case "script":
                    n = c.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? c.createElement("select", {
                      is: a.is
                    }) : c.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? c.createElement(e, { is: a.is }) : c.createElement(e);
                }
            }
            n[Cl] = t, n[Jl] = a;
            l: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                n.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === t) break l;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t)
                  break l;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            t.stateNode = n;
            l: switch (Bl(n, e, a), e) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && Zt(t);
          }
        }
        return ol(t), bf(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          u
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && Zt(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(m(166));
          if (l = Z.current, na(t)) {
            if (l = t.stateNode, u = t.memoizedProps, a = null, e = ql, e !== null)
              switch (e.tag) {
                case 27:
                case 5:
                  a = e.memoizedProps;
              }
            l[Cl] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || jy(l.nodeValue, u)), l || tu(t, !0);
          } else
            l = Dn(l).createTextNode(
              a
            ), l[Cl] = t, t.stateNode = l;
        }
        return ol(t), null;
      case 31:
        if (u = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = na(t), u !== null) {
            if (l === null) {
              if (!a) throw Error(m(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(557));
              l[Cl] = t;
            } else
              Hu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ol(t), l = !1;
          } else
            u = Dc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), l = !0;
          if (!l)
            return t.flags & 256 ? (ct(t), t) : (ct(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(m(558));
        }
        return ol(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (e = na(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!e) throw Error(m(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(m(317));
              e[Cl] = t;
            } else
              Hu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ol(t), e = !1;
          } else
            e = Dc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
          if (!e)
            return t.flags & 256 ? (ct(t), t) : (ct(t), null);
        }
        return ct(t), (t.flags & 128) !== 0 ? (t.lanes = u, t) : (u = a !== null, l = l !== null && l.memoizedState !== null, u && (a = t.child, e = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (e = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== e && (a.flags |= 2048)), u !== l && u && (t.child.flags |= 8192), dn(t, t.updateQueue), ol(t), null);
      case 4:
        return bl(), l === null && Xf(t.stateNode.containerInfo), ol(t), null;
      case 10:
        return Gt(t.type), ol(t), null;
      case 19:
        if (E(rl), a = t.memoizedState, a === null) return ol(t), null;
        if (e = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (e) ue(a, !1);
          else {
            if (Sl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Ie(l), n !== null) {
                  for (t.flags |= 128, ue(a, !1), l = n.updateQueue, t.updateQueue = l, dn(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; )
                    os(u, l), u = u.sibling;
                  return D(
                    rl,
                    rl.current & 1 | 2
                  ), w && Bt(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && lt() > Sn && (t.flags |= 128, e = !0, ue(a, !1), t.lanes = 4194304);
          }
        else {
          if (!e)
            if (l = Ie(n), l !== null) {
              if (t.flags |= 128, e = !0, l = l.updateQueue, t.updateQueue = l, dn(t, l), ue(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !w)
                return ol(t), null;
            } else
              2 * lt() - a.renderingStartTime > Sn && u !== 536870912 && (t.flags |= 128, e = !0, ue(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = lt(), l.sibling = null, u = rl.current, D(
          rl,
          e ? u & 1 | 2 : u & 1
        ), w && Bt(t, a.treeForkCount), l) : (ol(t), null);
      case 22:
      case 23:
        return ct(t), Xc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (u & 536870912) !== 0 && (t.flags & 128) === 0 && (ol(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ol(t), u = t.updateQueue, u !== null && dn(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && E(qu), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), Gt(El), ol(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(m(156, t.tag));
  }
  function Wd(l, t) {
    switch (Mc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Gt(El), bl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ee(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (ct(t), t.alternate === null)
            throw Error(m(340));
          Hu();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (ct(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(m(340));
          Hu();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return E(rl), null;
      case 4:
        return bl(), null;
      case 10:
        return Gt(t.type), null;
      case 22:
      case 23:
        return ct(t), Xc(), l !== null && E(qu), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Gt(El), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function X0(l, t) {
    switch (Mc(t), t.tag) {
      case 3:
        Gt(El), bl();
        break;
      case 26:
      case 27:
      case 5:
        Ee(t);
        break;
      case 4:
        bl();
        break;
      case 31:
        t.memoizedState !== null && ct(t);
        break;
      case 13:
        ct(t);
        break;
      case 19:
        E(rl);
        break;
      case 10:
        Gt(t.type);
        break;
      case 22:
      case 23:
        ct(t), Xc(), l !== null && E(qu);
        break;
      case 24:
        Gt(El);
    }
  }
  function ae(l, t) {
    try {
      var u = t.updateQueue, a = u !== null ? u.lastEffect : null;
      if (a !== null) {
        var e = a.next;
        u = e;
        do {
          if ((u.tag & l) === l) {
            a = void 0;
            var n = u.create, c = u.inst;
            a = n(), c.destroy = a;
          }
          u = u.next;
        } while (u !== e);
      }
    } catch (f) {
      ul(t, t.return, f);
    }
  }
  function iu(l, t, u) {
    try {
      var a = t.updateQueue, e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var n = e.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var c = a.inst, f = c.destroy;
            if (f !== void 0) {
              c.destroy = void 0, e = t;
              var i = u, h = f;
              try {
                h();
              } catch (b) {
                ul(
                  e,
                  i,
                  b
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (b) {
      ul(t, t.return, b);
    }
  }
  function x0(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var u = l.stateNode;
      try {
        Rs(t, u);
      } catch (a) {
        ul(l, l.return, a);
      }
    }
  }
  function Z0(l, t, u) {
    u.props = Gu(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (a) {
      ul(l, t, a);
    }
  }
  function ee(l, t) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof u == "function" ? l.refCleanup = u(a) : u.current = a;
      }
    } catch (e) {
      ul(l, t, e);
    }
  }
  function Nt(l, t) {
    var u = l.ref, a = l.refCleanup;
    if (u !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (e) {
          ul(l, t, e);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (e) {
          ul(l, t, e);
        }
      else u.current = null;
  }
  function V0(l) {
    var t = l.type, u = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && a.focus();
          break l;
        case "img":
          u.src ? a.src = u.src : u.srcSet && (a.srcset = u.srcSet);
      }
    } catch (e) {
      ul(l, l.return, e);
    }
  }
  function rf(l, t, u) {
    try {
      var a = l.stateNode;
      So(a, l.type, u, t), a[Jl] = t;
    } catch (e) {
      ul(l, l.return, e);
    }
  }
  function L0(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && mu(l.type) || l.tag === 4;
  }
  function zf(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || L0(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && mu(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Tf(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(l), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = qt));
    else if (a !== 4 && (a === 27 && mu(l.type) && (u = l.stateNode, t = null), l = l.child, l !== null))
      for (Tf(l, t, u), l = l.sibling; l !== null; )
        Tf(l, t, u), l = l.sibling;
  }
  function on(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? u.insertBefore(l, t) : u.appendChild(l);
    else if (a !== 4 && (a === 27 && mu(l.type) && (u = l.stateNode), l = l.child, l !== null))
      for (on(l, t, u), l = l.sibling; l !== null; )
        on(l, t, u), l = l.sibling;
  }
  function K0(l) {
    var t = l.stateNode, u = l.memoizedProps;
    try {
      for (var a = l.type, e = t.attributes; e.length; )
        t.removeAttributeNode(e[0]);
      Bl(t, a, u), t[Cl] = l, t[Jl] = u;
    } catch (n) {
      ul(l, l.return, n);
    }
  }
  var Vt = !1, Ml = !1, Ef = !1, J0 = typeof WeakSet == "function" ? WeakSet : Set, Nl = null;
  function $d(l, t) {
    if (l = l.containerInfo, Vf = pn, l = es(l), hc(l)) {
      if ("selectionStart" in l)
        var u = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          u = (u = l.ownerDocument) && u.defaultView || window;
          var a = u.getSelection && u.getSelection();
          if (a && a.rangeCount !== 0) {
            u = a.anchorNode;
            var e = a.anchorOffset, n = a.focusNode;
            a = a.focusOffset;
            try {
              u.nodeType, n.nodeType;
            } catch {
              u = null;
              break l;
            }
            var c = 0, f = -1, i = -1, h = 0, b = 0, T = l, g = null;
            t: for (; ; ) {
              for (var S; T !== u || e !== 0 && T.nodeType !== 3 || (f = c + e), T !== n || a !== 0 && T.nodeType !== 3 || (i = c + a), T.nodeType === 3 && (c += T.nodeValue.length), (S = T.firstChild) !== null; )
                g = T, T = S;
              for (; ; ) {
                if (T === l) break t;
                if (g === u && ++h === e && (f = c), g === n && ++b === a && (i = c), (S = T.nextSibling) !== null) break;
                T = g, g = T.parentNode;
              }
              T = S;
            }
            u = f === -1 || i === -1 ? null : { start: f, end: i };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (Lf = { focusedElem: l, selectionRange: u }, pn = !1, Nl = t; Nl !== null; )
      if (t = Nl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Nl = l;
      else
        for (; Nl !== null; ) {
          switch (t = Nl, n = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (u = 0; u < l.length; u++)
                  e = l[u], e.ref.impl = e.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                l = void 0, u = t, e = n.memoizedProps, n = n.memoizedState, a = u.stateNode;
                try {
                  var U = Gu(
                    u.type,
                    e
                  );
                  l = a.getSnapshotBeforeUpdate(
                    U,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (q) {
                  ul(
                    u,
                    u.return,
                    q
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, u = l.nodeType, u === 9)
                  wf(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wf(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(m(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, Nl = l;
            break;
          }
          Nl = t.return;
        }
  }
  function w0(l, t, u) {
    var a = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Kt(l, u), a & 4 && ae(5, u);
        break;
      case 1:
        if (Kt(l, u), a & 4)
          if (l = u.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (c) {
              ul(u, u.return, c);
            }
          else {
            var e = Gu(
              u.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                e,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              ul(
                u,
                u.return,
                c
              );
            }
          }
        a & 64 && x0(u), a & 512 && ee(u, u.return);
        break;
      case 3:
        if (Kt(l, u), a & 64 && (l = u.updateQueue, l !== null)) {
          if (t = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                t = u.child.stateNode;
                break;
              case 1:
                t = u.child.stateNode;
            }
          try {
            Rs(l, t);
          } catch (c) {
            ul(u, u.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && K0(u);
      case 26:
      case 5:
        Kt(l, u), t === null && a & 4 && V0(u), a & 512 && ee(u, u.return);
        break;
      case 12:
        Kt(l, u);
        break;
      case 31:
        Kt(l, u), a & 4 && k0(l, u);
        break;
      case 13:
        Kt(l, u), a & 4 && F0(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = eo.bind(
          null,
          u
        ), Mo(l, u))));
        break;
      case 22:
        if (a = u.memoizedState !== null || Vt, !a) {
          t = t !== null && t.memoizedState !== null || Ml, e = Vt;
          var n = Ml;
          Vt = a, (Ml = t) && !n ? Jt(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : Kt(l, u), Vt = e, Ml = n;
        }
        break;
      case 30:
        break;
      default:
        Kt(l, u);
    }
  }
  function W0(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, W0(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Fn(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var hl = null, Wl = !1;
  function Lt(l, t, u) {
    for (u = u.child; u !== null; )
      $0(l, t, u), u = u.sibling;
  }
  function $0(l, t, u) {
    if (tt && typeof tt.onCommitFiberUnmount == "function")
      try {
        tt.onCommitFiberUnmount(Ua, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        Ml || Nt(u, t), Lt(
          l,
          t,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        Ml || Nt(u, t);
        var a = hl, e = Wl;
        mu(u.type) && (hl = u.stateNode, Wl = !1), Lt(
          l,
          t,
          u
        ), oe(u.stateNode), hl = a, Wl = e;
        break;
      case 5:
        Ml || Nt(u, t);
      case 6:
        if (a = hl, e = Wl, hl = null, Lt(
          l,
          t,
          u
        ), hl = a, Wl = e, hl !== null)
          if (Wl)
            try {
              (hl.nodeType === 9 ? hl.body : hl.nodeName === "HTML" ? hl.ownerDocument.body : hl).removeChild(u.stateNode);
            } catch (n) {
              ul(
                u,
                t,
                n
              );
            }
          else
            try {
              hl.removeChild(u.stateNode);
            } catch (n) {
              ul(
                u,
                t,
                n
              );
            }
        break;
      case 18:
        hl !== null && (Wl ? (l = hl, xy(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), Oa(l)) : xy(hl, u.stateNode));
        break;
      case 4:
        a = hl, e = Wl, hl = u.stateNode.containerInfo, Wl = !0, Lt(
          l,
          t,
          u
        ), hl = a, Wl = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        iu(2, u, t), Ml || iu(4, u, t), Lt(
          l,
          t,
          u
        );
        break;
      case 1:
        Ml || (Nt(u, t), a = u.stateNode, typeof a.componentWillUnmount == "function" && Z0(
          u,
          t,
          a
        )), Lt(
          l,
          t,
          u
        );
        break;
      case 21:
        Lt(
          l,
          t,
          u
        );
        break;
      case 22:
        Ml = (a = Ml) || u.memoizedState !== null, Lt(
          l,
          t,
          u
        ), Ml = a;
        break;
      default:
        Lt(
          l,
          t,
          u
        );
    }
  }
  function k0(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Oa(l);
      } catch (u) {
        ul(t, t.return, u);
      }
    }
  }
  function F0(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Oa(l);
      } catch (u) {
        ul(t, t.return, u);
      }
  }
  function kd(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new J0()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new J0()), t;
      default:
        throw Error(m(435, l.tag));
    }
  }
  function hn(l, t) {
    var u = kd(l);
    t.forEach(function(a) {
      if (!u.has(a)) {
        u.add(a);
        var e = no.bind(null, l, a);
        a.then(e, e);
      }
    });
  }
  function $l(l, t) {
    var u = t.deletions;
    if (u !== null)
      for (var a = 0; a < u.length; a++) {
        var e = u[a], n = l, c = t, f = c;
        l: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (mu(f.type)) {
                hl = f.stateNode, Wl = !1;
                break l;
              }
              break;
            case 5:
              hl = f.stateNode, Wl = !1;
              break l;
            case 3:
            case 4:
              hl = f.stateNode.containerInfo, Wl = !0;
              break l;
          }
          f = f.return;
        }
        if (hl === null) throw Error(m(160));
        $0(n, c, e), hl = null, Wl = !1, n = e.alternate, n !== null && (n.return = null), e.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        I0(t, l), t = t.sibling;
  }
  var Et = null;
  function I0(l, t) {
    var u = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        $l(t, l), kl(l), a & 4 && (iu(3, l, l.return), ae(3, l), iu(5, l, l.return));
        break;
      case 1:
        $l(t, l), kl(l), a & 512 && (Ml || u === null || Nt(u, u.return)), a & 64 && Vt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? a : u.concat(a))));
        break;
      case 26:
        var e = Et;
        if ($l(t, l), kl(l), a & 512 && (Ml || u === null || Nt(u, u.return)), a & 4) {
          var n = u !== null ? u.memoizedState : null;
          if (a = l.memoizedState, u === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, u = l.memoizedProps, e = e.ownerDocument || e;
                  t: switch (a) {
                    case "title":
                      n = e.getElementsByTagName("title")[0], (!n || n[Ra] || n[Cl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = e.createElement(a), e.head.insertBefore(
                        n,
                        e.querySelector("head > title")
                      )), Bl(n, a, u), n[Cl] = l, Ul(n), a = n;
                      break l;
                    case "link":
                      var c = Iy(
                        "link",
                        "href",
                        e
                      ).get(a + (u.href || ""));
                      if (c) {
                        for (var f = 0; f < c.length; f++)
                          if (n = c[f], n.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && n.getAttribute("rel") === (u.rel == null ? null : u.rel) && n.getAttribute("title") === (u.title == null ? null : u.title) && n.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                            c.splice(f, 1);
                            break t;
                          }
                      }
                      n = e.createElement(a), Bl(n, a, u), e.head.appendChild(n);
                      break;
                    case "meta":
                      if (c = Iy(
                        "meta",
                        "content",
                        e
                      ).get(a + (u.content || ""))) {
                        for (f = 0; f < c.length; f++)
                          if (n = c[f], n.getAttribute("content") === (u.content == null ? null : "" + u.content) && n.getAttribute("name") === (u.name == null ? null : u.name) && n.getAttribute("property") === (u.property == null ? null : u.property) && n.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && n.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                            c.splice(f, 1);
                            break t;
                          }
                      }
                      n = e.createElement(a), Bl(n, a, u), e.head.appendChild(n);
                      break;
                    default:
                      throw Error(m(468, a));
                  }
                  n[Cl] = l, Ul(n), a = n;
                }
                l.stateNode = a;
              } else
                Py(
                  e,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = Fy(
                e,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : n.count--, a === null ? Py(
              e,
              l.type,
              l.stateNode
            ) : Fy(
              e,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && rf(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        $l(t, l), kl(l), a & 512 && (Ml || u === null || Nt(u, u.return)), u !== null && a & 4 && rf(
          l,
          l.memoizedProps,
          u.memoizedProps
        );
        break;
      case 5:
        if ($l(t, l), kl(l), a & 512 && (Ml || u === null || Nt(u, u.return)), l.flags & 32) {
          e = l.stateNode;
          try {
            $u(e, "");
          } catch (U) {
            ul(l, l.return, U);
          }
        }
        a & 4 && l.stateNode != null && (e = l.memoizedProps, rf(
          l,
          e,
          u !== null ? u.memoizedProps : e
        )), a & 1024 && (Ef = !0);
        break;
      case 6:
        if ($l(t, l), kl(l), a & 4) {
          if (l.stateNode === null)
            throw Error(m(162));
          a = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = a;
          } catch (U) {
            ul(l, l.return, U);
          }
        }
        break;
      case 3:
        if (Hn = null, e = Et, Et = Un(t.containerInfo), $l(t, l), Et = e, kl(l), a & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            Oa(t.containerInfo);
          } catch (U) {
            ul(l, l.return, U);
          }
        Ef && (Ef = !1, P0(l));
        break;
      case 4:
        a = Et, Et = Un(
          l.stateNode.containerInfo
        ), $l(t, l), kl(l), Et = a;
        break;
      case 12:
        $l(t, l), kl(l);
        break;
      case 31:
        $l(t, l), kl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, hn(l, a)));
        break;
      case 13:
        $l(t, l), kl(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (gn = lt()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, hn(l, a)));
        break;
      case 22:
        e = l.memoizedState !== null;
        var i = u !== null && u.memoizedState !== null, h = Vt, b = Ml;
        if (Vt = h || e, Ml = b || i, $l(t, l), Ml = b, Vt = h, kl(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = e ? t._visibility & -2 : t._visibility | 1, e && (u === null || i || Vt || Ml || Qu(l)), u = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (u === null) {
                i = u = t;
                try {
                  if (n = i.stateNode, e)
                    c = n.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    f = i.stateNode;
                    var T = i.memoizedProps.style, g = T != null && T.hasOwnProperty("display") ? T.display : null;
                    f.style.display = g == null || typeof g == "boolean" ? "" : ("" + g).trim();
                  }
                } catch (U) {
                  ul(i, i.return, U);
                }
              }
            } else if (t.tag === 6) {
              if (u === null) {
                i = t;
                try {
                  i.stateNode.nodeValue = e ? "" : i.memoizedProps;
                } catch (U) {
                  ul(i, i.return, U);
                }
              }
            } else if (t.tag === 18) {
              if (u === null) {
                i = t;
                try {
                  var S = i.stateNode;
                  e ? Zy(S, !0) : Zy(i.stateNode, !1);
                } catch (U) {
                  ul(i, i.return, U);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              u === t && (u = null), t = t.return;
            }
            u === t && (u = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = l.updateQueue, a !== null && (u = a.retryQueue, u !== null && (a.retryQueue = null, hn(l, u))));
        break;
      case 19:
        $l(t, l), kl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, hn(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        $l(t, l), kl(l);
    }
  }
  function kl(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var u, a = l.return; a !== null; ) {
          if (L0(a)) {
            u = a;
            break;
          }
          a = a.return;
        }
        if (u == null) throw Error(m(160));
        switch (u.tag) {
          case 27:
            var e = u.stateNode, n = zf(l);
            on(l, n, e);
            break;
          case 5:
            var c = u.stateNode;
            u.flags & 32 && ($u(c, ""), u.flags &= -33);
            var f = zf(l);
            on(l, f, c);
            break;
          case 3:
          case 4:
            var i = u.stateNode.containerInfo, h = zf(l);
            Tf(
              l,
              h,
              i
            );
            break;
          default:
            throw Error(m(161));
        }
      } catch (b) {
        ul(l, l.return, b);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function P0(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        P0(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function Kt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        w0(l, t.alternate, t), t = t.sibling;
  }
  function Qu(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          iu(4, t, t.return), Qu(t);
          break;
        case 1:
          Nt(t, t.return);
          var u = t.stateNode;
          typeof u.componentWillUnmount == "function" && Z0(
            t,
            t.return,
            u
          ), Qu(t);
          break;
        case 27:
          oe(t.stateNode);
        case 26:
        case 5:
          Nt(t, t.return), Qu(t);
          break;
        case 22:
          t.memoizedState === null && Qu(t);
          break;
        case 30:
          Qu(t);
          break;
        default:
          Qu(t);
      }
      l = l.sibling;
    }
  }
  function Jt(l, t, u) {
    for (u = u && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, e = l, n = t, c = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Jt(
            e,
            n,
            u
          ), ae(4, n);
          break;
        case 1:
          if (Jt(
            e,
            n,
            u
          ), a = n, e = a.stateNode, typeof e.componentDidMount == "function")
            try {
              e.componentDidMount();
            } catch (h) {
              ul(a, a.return, h);
            }
          if (a = n, e = a.updateQueue, e !== null) {
            var f = a.stateNode;
            try {
              var i = e.shared.hiddenCallbacks;
              if (i !== null)
                for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                  Hs(i[e], f);
            } catch (h) {
              ul(a, a.return, h);
            }
          }
          u && c & 64 && x0(n), ee(n, n.return);
          break;
        case 27:
          K0(n);
        case 26:
        case 5:
          Jt(
            e,
            n,
            u
          ), u && a === null && c & 4 && V0(n), ee(n, n.return);
          break;
        case 12:
          Jt(
            e,
            n,
            u
          );
          break;
        case 31:
          Jt(
            e,
            n,
            u
          ), u && c & 4 && k0(e, n);
          break;
        case 13:
          Jt(
            e,
            n,
            u
          ), u && c & 4 && F0(e, n);
          break;
        case 22:
          n.memoizedState === null && Jt(
            e,
            n,
            u
          ), ee(n, n.return);
          break;
        case 30:
          break;
        default:
          Jt(
            e,
            n,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Af(l, t) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && La(u));
  }
  function _f(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && La(l));
  }
  function At(l, t, u, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ly(
          l,
          t,
          u,
          a
        ), t = t.sibling;
  }
  function ly(l, t, u, a) {
    var e = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        At(
          l,
          t,
          u,
          a
        ), e & 2048 && ae(9, t);
        break;
      case 1:
        At(
          l,
          t,
          u,
          a
        );
        break;
      case 3:
        At(
          l,
          t,
          u,
          a
        ), e & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && La(l)));
        break;
      case 12:
        if (e & 2048) {
          At(
            l,
            t,
            u,
            a
          ), l = t.stateNode;
          try {
            var n = t.memoizedProps, c = n.id, f = n.onPostCommit;
            typeof f == "function" && f(
              c,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (i) {
            ul(t, t.return, i);
          }
        } else
          At(
            l,
            t,
            u,
            a
          );
        break;
      case 31:
        At(
          l,
          t,
          u,
          a
        );
        break;
      case 13:
        At(
          l,
          t,
          u,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, c = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? At(
          l,
          t,
          u,
          a
        ) : ne(l, t) : n._visibility & 2 ? At(
          l,
          t,
          u,
          a
        ) : (n._visibility |= 2, ma(
          l,
          t,
          u,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), e & 2048 && Af(c, t);
        break;
      case 24:
        At(
          l,
          t,
          u,
          a
        ), e & 2048 && _f(t.alternate, t);
        break;
      default:
        At(
          l,
          t,
          u,
          a
        );
    }
  }
  function ma(l, t, u, a, e) {
    for (e = e && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, c = t, f = u, i = a, h = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          ma(
            n,
            c,
            f,
            i,
            e
          ), ae(8, c);
          break;
        case 23:
          break;
        case 22:
          var b = c.stateNode;
          c.memoizedState !== null ? b._visibility & 2 ? ma(
            n,
            c,
            f,
            i,
            e
          ) : ne(
            n,
            c
          ) : (b._visibility |= 2, ma(
            n,
            c,
            f,
            i,
            e
          )), e && h & 2048 && Af(
            c.alternate,
            c
          );
          break;
        case 24:
          ma(
            n,
            c,
            f,
            i,
            e
          ), e && h & 2048 && _f(c.alternate, c);
          break;
        default:
          ma(
            n,
            c,
            f,
            i,
            e
          );
      }
      t = t.sibling;
    }
  }
  function ne(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var u = l, a = t, e = a.flags;
        switch (a.tag) {
          case 22:
            ne(u, a), e & 2048 && Af(
              a.alternate,
              a
            );
            break;
          case 24:
            ne(u, a), e & 2048 && _f(a.alternate, a);
            break;
          default:
            ne(u, a);
        }
        t = t.sibling;
      }
  }
  var ce = 8192;
  function ga(l, t, u) {
    if (l.subtreeFlags & ce)
      for (l = l.child; l !== null; )
        ty(
          l,
          t,
          u
        ), l = l.sibling;
  }
  function ty(l, t, u) {
    switch (l.tag) {
      case 26:
        ga(
          l,
          t,
          u
        ), l.flags & ce && l.memoizedState !== null && Yo(
          u,
          Et,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        ga(
          l,
          t,
          u
        );
        break;
      case 3:
      case 4:
        var a = Et;
        Et = Un(l.stateNode.containerInfo), ga(
          l,
          t,
          u
        ), Et = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = ce, ce = 16777216, ga(
          l,
          t,
          u
        ), ce = a) : ga(
          l,
          t,
          u
        ));
        break;
      default:
        ga(
          l,
          t,
          u
        );
    }
  }
  function uy(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function fe(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          Nl = a, ey(
            a,
            l
          );
        }
      uy(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        ay(l), l = l.sibling;
  }
  function ay(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        fe(l), l.flags & 2048 && iu(9, l, l.return);
        break;
      case 3:
        fe(l);
        break;
      case 12:
        fe(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, mn(l)) : fe(l);
        break;
      default:
        fe(l);
    }
  }
  function mn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          Nl = a, ey(
            a,
            l
          );
        }
      uy(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          iu(8, t, t.return), mn(t);
          break;
        case 22:
          u = t.stateNode, u._visibility & 2 && (u._visibility &= -3, mn(t));
          break;
        default:
          mn(t);
      }
      l = l.sibling;
    }
  }
  function ey(l, t) {
    for (; Nl !== null; ) {
      var u = Nl;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          iu(8, u, t);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var a = u.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          La(u.memoizedState.cache);
      }
      if (a = u.child, a !== null) a.return = u, Nl = a;
      else
        l: for (u = l; Nl !== null; ) {
          a = Nl;
          var e = a.sibling, n = a.return;
          if (W0(a), a === u) {
            Nl = null;
            break l;
          }
          if (e !== null) {
            e.return = n, Nl = e;
            break l;
          }
          Nl = n;
        }
    }
  }
  var Fd = {
    getCacheForType: function(l) {
      var t = pl(El), u = t.data.get(l);
      return u === void 0 && (u = l(), t.data.set(l, u)), u;
    },
    cacheSignal: function() {
      return pl(El).controller.signal;
    }
  }, Id = typeof WeakMap == "function" ? WeakMap : Map, P = 0, sl = null, V = null, K = 0, tl = 0, ft = null, su = !1, Sa = !1, Mf = !1, wt = 0, Sl = 0, yu = 0, Xu = 0, Of = 0, it = 0, ba = 0, ie = null, Fl = null, Df = !1, gn = 0, ny = 0, Sn = 1 / 0, bn = null, vu = null, Ol = 0, du = null, ra = null, Wt = 0, Uf = 0, Nf = null, cy = null, se = 0, Hf = null;
  function st() {
    return (P & 2) !== 0 && K !== 0 ? K & -K : r.T !== null ? Bf() : Ei();
  }
  function fy() {
    if (it === 0)
      if ((K & 536870912) === 0 || w) {
        var l = Me;
        Me <<= 1, (Me & 3932160) === 0 && (Me = 262144), it = l;
      } else it = 536870912;
    return l = nt.current, l !== null && (l.flags |= 32), it;
  }
  function Il(l, t, u) {
    (l === sl && (tl === 2 || tl === 9) || l.cancelPendingCommit !== null) && (za(l, 0), ou(
      l,
      K,
      it,
      !1
    )), Ha(l, u), ((P & 2) === 0 || l !== sl) && (l === sl && ((P & 2) === 0 && (Xu |= u), Sl === 4 && ou(
      l,
      K,
      it,
      !1
    )), Ht(l));
  }
  function iy(l, t, u) {
    if ((P & 6) !== 0) throw Error(m(327));
    var a = !u && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Na(l, t), e = a ? to(l, t) : Cf(l, t, !0), n = a;
    do {
      if (e === 0) {
        Sa && !a && ou(l, t, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, n && !Pd(u)) {
          e = Cf(l, t, !1), n = !1;
          continue;
        }
        if (e === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var c = 0;
          else
            c = l.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            t = c;
            l: {
              var f = l;
              e = ie;
              var i = f.current.memoizedState.isDehydrated;
              if (i && (za(f, c).flags |= 256), c = Cf(
                f,
                c,
                !1
              ), c !== 2) {
                if (Mf && !i) {
                  f.errorRecoveryDisabledLanes |= n, Xu |= n, e = 4;
                  break l;
                }
                n = Fl, Fl = e, n !== null && (Fl === null ? Fl = n : Fl.push.apply(
                  Fl,
                  n
                ));
              }
              e = c;
            }
            if (n = !1, e !== 2) continue;
          }
        }
        if (e === 1) {
          za(l, 0), ou(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, n = e, n) {
            case 0:
            case 1:
              throw Error(m(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ou(
                a,
                t,
                it,
                !su
              );
              break l;
            case 2:
              Fl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(m(329));
          }
          if ((t & 62914560) === t && (e = gn + 300 - lt(), 10 < e)) {
            if (ou(
              a,
              t,
              it,
              !su
            ), De(a, 0, !0) !== 0) break l;
            Wt = t, a.timeoutHandle = Qy(
              sy.bind(
                null,
                a,
                u,
                Fl,
                bn,
                Df,
                t,
                it,
                Xu,
                ba,
                su,
                n,
                "Throttled",
                -0,
                0
              ),
              e
            );
            break l;
          }
          sy(
            a,
            u,
            Fl,
            bn,
            Df,
            t,
            it,
            Xu,
            ba,
            su,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ht(l);
  }
  function sy(l, t, u, a, e, n, c, f, i, h, b, T, g, S) {
    if (l.timeoutHandle = -1, T = t.subtreeFlags, T & 8192 || (T & 16785408) === 16785408) {
      T = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: qt
      }, ty(
        t,
        n,
        T
      );
      var U = (n & 62914560) === n ? gn - lt() : (n & 4194048) === n ? ny - lt() : 0;
      if (U = Go(
        T,
        U
      ), U !== null) {
        Wt = n, l.cancelPendingCommit = U(
          Sy.bind(
            null,
            l,
            t,
            n,
            u,
            a,
            e,
            c,
            f,
            i,
            b,
            T,
            null,
            g,
            S
          )
        ), ou(l, n, c, !h);
        return;
      }
    }
    Sy(
      l,
      t,
      n,
      u,
      a,
      e,
      c,
      f,
      i
    );
  }
  function Pd(l) {
    for (var t = l; ; ) {
      var u = t.tag;
      if ((u === 0 || u === 11 || u === 15) && t.flags & 16384 && (u = t.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var a = 0; a < u.length; a++) {
          var e = u[a], n = e.getSnapshot;
          e = e.value;
          try {
            if (!at(n(), e)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = t.child, t.subtreeFlags & 16384 && u !== null)
        u.return = t, t = u;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function ou(l, t, u, a) {
    t &= ~Of, t &= ~Xu, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var e = t; 0 < e; ) {
      var n = 31 - ut(e), c = 1 << n;
      a[n] = -1, e &= ~c;
    }
    u !== 0 && ri(l, u, t);
  }
  function rn() {
    return (P & 6) === 0 ? (ye(0), !1) : !0;
  }
  function Rf() {
    if (V !== null) {
      if (tl === 0)
        var l = V.return;
      else
        l = V, Yt = Ru = null, Jc(l), ya = null, Ja = 0, l = V;
      for (; l !== null; )
        X0(l.alternate, l), l = l.return;
      V = null;
    }
  }
  function za(l, t) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, zo(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Wt = 0, Rf(), sl = l, V = u = jt(l.current, null), K = t, tl = 0, ft = null, su = !1, Sa = Na(l, t), Mf = !1, ba = it = Of = Xu = yu = Sl = 0, Fl = ie = null, Df = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var e = 31 - ut(a), n = 1 << e;
        t |= l[e], a &= ~n;
      }
    return wt = t, Qe(), u;
  }
  function yy(l, t) {
    Q = null, r.H = le, t === sa || t === we ? (t = Os(), tl = 3) : t === pc ? (t = Os(), tl = 4) : tl = t === sf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ft = t, V === null && (Sl = 1, fn(
      l,
      ot(t, l.current)
    ));
  }
  function vy() {
    var l = nt.current;
    return l === null ? !0 : (K & 4194048) === K ? St === null : (K & 62914560) === K || (K & 536870912) !== 0 ? l === St : !1;
  }
  function dy() {
    var l = r.H;
    return r.H = le, l === null ? le : l;
  }
  function oy() {
    var l = r.A;
    return r.A = Fd, l;
  }
  function zn() {
    Sl = 4, su || (K & 4194048) !== K && nt.current !== null || (Sa = !0), (yu & 134217727) === 0 && (Xu & 134217727) === 0 || sl === null || ou(
      sl,
      K,
      it,
      !1
    );
  }
  function Cf(l, t, u) {
    var a = P;
    P |= 2;
    var e = dy(), n = oy();
    (sl !== l || K !== t) && (bn = null, za(l, t)), t = !1;
    var c = Sl;
    l: do
      try {
        if (tl !== 0 && V !== null) {
          var f = V, i = ft;
          switch (tl) {
            case 8:
              Rf(), c = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              nt.current === null && (t = !0);
              var h = tl;
              if (tl = 0, ft = null, Ta(l, f, i, h), u && Sa) {
                c = 0;
                break l;
              }
              break;
            default:
              h = tl, tl = 0, ft = null, Ta(l, f, i, h);
          }
        }
        lo(), c = Sl;
        break;
      } catch (b) {
        yy(l, b);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Yt = Ru = null, P = a, r.H = e, r.A = n, V === null && (sl = null, K = 0, Qe()), c;
  }
  function lo() {
    for (; V !== null; ) hy(V);
  }
  function to(l, t) {
    var u = P;
    P |= 2;
    var a = dy(), e = oy();
    sl !== l || K !== t ? (bn = null, Sn = lt() + 500, za(l, t)) : Sa = Na(
      l,
      t
    );
    l: do
      try {
        if (tl !== 0 && V !== null) {
          t = V;
          var n = ft;
          t: switch (tl) {
            case 1:
              tl = 0, ft = null, Ta(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (_s(n)) {
                tl = 0, ft = null, my(t);
                break;
              }
              t = function() {
                tl !== 2 && tl !== 9 || sl !== l || (tl = 7), Ht(l);
              }, n.then(t, t);
              break l;
            case 3:
              tl = 7;
              break l;
            case 4:
              tl = 5;
              break l;
            case 7:
              _s(n) ? (tl = 0, ft = null, my(t)) : (tl = 0, ft = null, Ta(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (V.tag) {
                case 26:
                  c = V.memoizedState;
                case 5:
                case 27:
                  var f = V;
                  if (c ? lv(c) : f.stateNode.complete) {
                    tl = 0, ft = null;
                    var i = f.sibling;
                    if (i !== null) V = i;
                    else {
                      var h = f.return;
                      h !== null ? (V = h, Tn(h)) : V = null;
                    }
                    break t;
                  }
              }
              tl = 0, ft = null, Ta(l, t, n, 5);
              break;
            case 6:
              tl = 0, ft = null, Ta(l, t, n, 6);
              break;
            case 8:
              Rf(), Sl = 6;
              break l;
            default:
              throw Error(m(462));
          }
        }
        uo();
        break;
      } catch (b) {
        yy(l, b);
      }
    while (!0);
    return Yt = Ru = null, r.H = a, r.A = e, P = u, V !== null ? 0 : (sl = null, K = 0, Qe(), Sl);
  }
  function uo() {
    for (; V !== null && !Mv(); )
      hy(V);
  }
  function hy(l) {
    var t = G0(l.alternate, l, wt);
    l.memoizedProps = l.pendingProps, t === null ? Tn(l) : V = t;
  }
  function my(l) {
    var t = l, u = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = C0(
          u,
          t,
          t.pendingProps,
          t.type,
          void 0,
          K
        );
        break;
      case 11:
        t = C0(
          u,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          K
        );
        break;
      case 5:
        Jc(t);
      default:
        X0(u, t), t = V = os(t, wt), t = G0(u, t, wt);
    }
    l.memoizedProps = l.pendingProps, t === null ? Tn(l) : V = t;
  }
  function Ta(l, t, u, a) {
    Yt = Ru = null, Jc(t), ya = null, Ja = 0;
    var e = t.return;
    try {
      if (Ld(
        l,
        e,
        t,
        u,
        K
      )) {
        Sl = 1, fn(
          l,
          ot(u, l.current)
        ), V = null;
        return;
      }
    } catch (n) {
      if (e !== null) throw V = e, n;
      Sl = 1, fn(
        l,
        ot(u, l.current)
      ), V = null;
      return;
    }
    t.flags & 32768 ? (w || a === 1 ? l = !0 : Sa || (K & 536870912) !== 0 ? l = !1 : (su = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = nt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), gy(t, l)) : Tn(t);
  }
  function Tn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        gy(
          t,
          su
        );
        return;
      }
      l = t.return;
      var u = wd(
        t.alternate,
        t,
        wt
      );
      if (u !== null) {
        V = u;
        return;
      }
      if (t = t.sibling, t !== null) {
        V = t;
        return;
      }
      V = t = l;
    } while (t !== null);
    Sl === 0 && (Sl = 5);
  }
  function gy(l, t) {
    do {
      var u = Wd(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, V = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !t && (l = l.sibling, l !== null)) {
        V = l;
        return;
      }
      V = l = u;
    } while (l !== null);
    Sl = 6, V = null;
  }
  function Sy(l, t, u, a, e, n, c, f, i) {
    l.cancelPendingCommit = null;
    do
      En();
    while (Ol !== 0);
    if ((P & 6) !== 0) throw Error(m(327));
    if (t !== null) {
      if (t === l.current) throw Error(m(177));
      if (n = t.lanes | t.childLanes, n |= rc, jv(
        l,
        u,
        n,
        c,
        f,
        i
      ), l === sl && (V = sl = null, K = 0), ra = t, du = l, Wt = u, Uf = n, Nf = e, cy = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, co(Ae, function() {
        return Ey(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = r.T, r.T = null, e = O.p, O.p = 2, c = P, P |= 4;
        try {
          $d(l, t, u);
        } finally {
          P = c, O.p = e, r.T = a;
        }
      }
      Ol = 1, by(), ry(), zy();
    }
  }
  function by() {
    if (Ol === 1) {
      Ol = 0;
      var l = du, t = ra, u = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || u) {
        u = r.T, r.T = null;
        var a = O.p;
        O.p = 2;
        var e = P;
        P |= 4;
        try {
          I0(t, l);
          var n = Lf, c = es(l.containerInfo), f = n.focusedElem, i = n.selectionRange;
          if (c !== f && f && f.ownerDocument && as(
            f.ownerDocument.documentElement,
            f
          )) {
            if (i !== null && hc(f)) {
              var h = i.start, b = i.end;
              if (b === void 0 && (b = h), "selectionStart" in f)
                f.selectionStart = h, f.selectionEnd = Math.min(
                  b,
                  f.value.length
                );
              else {
                var T = f.ownerDocument || document, g = T && T.defaultView || window;
                if (g.getSelection) {
                  var S = g.getSelection(), U = f.textContent.length, q = Math.min(i.start, U), fl = i.end === void 0 ? q : Math.min(i.end, U);
                  !S.extend && q > fl && (c = fl, fl = q, q = c);
                  var v = us(
                    f,
                    q
                  ), s = us(
                    f,
                    fl
                  );
                  if (v && s && (S.rangeCount !== 1 || S.anchorNode !== v.node || S.anchorOffset !== v.offset || S.focusNode !== s.node || S.focusOffset !== s.offset)) {
                    var o = T.createRange();
                    o.setStart(v.node, v.offset), S.removeAllRanges(), q > fl ? (S.addRange(o), S.extend(s.node, s.offset)) : (o.setEnd(s.node, s.offset), S.addRange(o));
                  }
                }
              }
            }
            for (T = [], S = f; S = S.parentNode; )
              S.nodeType === 1 && T.push({
                element: S,
                left: S.scrollLeft,
                top: S.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < T.length; f++) {
              var z = T[f];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          pn = !!Vf, Lf = Vf = null;
        } finally {
          P = e, O.p = a, r.T = u;
        }
      }
      l.current = t, Ol = 2;
    }
  }
  function ry() {
    if (Ol === 2) {
      Ol = 0;
      var l = du, t = ra, u = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || u) {
        u = r.T, r.T = null;
        var a = O.p;
        O.p = 2;
        var e = P;
        P |= 4;
        try {
          w0(l, t.alternate, t);
        } finally {
          P = e, O.p = a, r.T = u;
        }
      }
      Ol = 3;
    }
  }
  function zy() {
    if (Ol === 4 || Ol === 3) {
      Ol = 0, Ov();
      var l = du, t = ra, u = Wt, a = cy;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ol = 5 : (Ol = 0, ra = du = null, Ty(l, l.pendingLanes));
      var e = l.pendingLanes;
      if (e === 0 && (vu = null), $n(u), t = t.stateNode, tt && typeof tt.onCommitFiberRoot == "function")
        try {
          tt.onCommitFiberRoot(
            Ua,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = r.T, e = O.p, O.p = 2, r.T = null;
        try {
          for (var n = l.onRecoverableError, c = 0; c < a.length; c++) {
            var f = a[c];
            n(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          r.T = t, O.p = e;
        }
      }
      (Wt & 3) !== 0 && En(), Ht(l), e = l.pendingLanes, (u & 261930) !== 0 && (e & 42) !== 0 ? l === Hf ? se++ : (se = 0, Hf = l) : se = 0, ye(0);
    }
  }
  function Ty(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, La(t)));
  }
  function En() {
    return by(), ry(), zy(), Ey();
  }
  function Ey() {
    if (Ol !== 5) return !1;
    var l = du, t = Uf;
    Uf = 0;
    var u = $n(Wt), a = r.T, e = O.p;
    try {
      O.p = 32 > u ? 32 : u, r.T = null, u = Nf, Nf = null;
      var n = du, c = Wt;
      if (Ol = 0, ra = du = null, Wt = 0, (P & 6) !== 0) throw Error(m(331));
      var f = P;
      if (P |= 4, ay(n.current), ly(
        n,
        n.current,
        c,
        u
      ), P = f, ye(0, !1), tt && typeof tt.onPostCommitFiberRoot == "function")
        try {
          tt.onPostCommitFiberRoot(Ua, n);
        } catch {
        }
      return !0;
    } finally {
      O.p = e, r.T = a, Ty(l, t);
    }
  }
  function Ay(l, t, u) {
    t = ot(u, t), t = ff(l.stateNode, t, 2), l = nu(l, t, 2), l !== null && (Ha(l, 2), Ht(l));
  }
  function ul(l, t, u) {
    if (l.tag === 3)
      Ay(l, l, u);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ay(
            t,
            l,
            u
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (vu === null || !vu.has(a))) {
            l = ot(u, l), u = _0(2), a = nu(t, u, 2), a !== null && (M0(
              u,
              a,
              t,
              l
            ), Ha(a, 2), Ht(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function qf(l, t, u) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Id();
      var e = /* @__PURE__ */ new Set();
      a.set(t, e);
    } else
      e = a.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), a.set(t, e));
    e.has(u) || (Mf = !0, e.add(u), l = ao.bind(null, l, t, u), t.then(l, l));
  }
  function ao(l, t, u) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, sl === l && (K & u) === u && (Sl === 4 || Sl === 3 && (K & 62914560) === K && 300 > lt() - gn ? (P & 2) === 0 && za(l, 0) : Of |= u, ba === K && (ba = 0)), Ht(l);
  }
  function _y(l, t) {
    t === 0 && (t = bi()), l = Uu(l, t), l !== null && (Ha(l, t), Ht(l));
  }
  function eo(l) {
    var t = l.memoizedState, u = 0;
    t !== null && (u = t.retryLane), _y(l, u);
  }
  function no(l, t) {
    var u = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, e = l.memoizedState;
        e !== null && (u = e.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(m(314));
    }
    a !== null && a.delete(t), _y(l, u);
  }
  function co(l, t) {
    return Kn(l, t);
  }
  var An = null, Ea = null, pf = !1, _n = !1, jf = !1, hu = 0;
  function Ht(l) {
    l !== Ea && l.next === null && (Ea === null ? An = Ea = l : Ea = Ea.next = l), _n = !0, pf || (pf = !0, io());
  }
  function ye(l, t) {
    if (!jf && _n) {
      jf = !0;
      do
        for (var u = !1, a = An; a !== null; ) {
          if (l !== 0) {
            var e = a.pendingLanes;
            if (e === 0) var n = 0;
            else {
              var c = a.suspendedLanes, f = a.pingedLanes;
              n = (1 << 31 - ut(42 | l) + 1) - 1, n &= e & ~(c & ~f), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (u = !0, Uy(a, n));
          } else
            n = K, n = De(
              a,
              a === sl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || Na(a, n) || (u = !0, Uy(a, n));
          a = a.next;
        }
      while (u);
      jf = !1;
    }
  }
  function fo() {
    My();
  }
  function My() {
    _n = pf = !1;
    var l = 0;
    hu !== 0 && ro() && (l = hu);
    for (var t = lt(), u = null, a = An; a !== null; ) {
      var e = a.next, n = Oy(a, t);
      n === 0 ? (a.next = null, u === null ? An = e : u.next = e, e === null && (Ea = u)) : (u = a, (l !== 0 || (n & 3) !== 0) && (_n = !0)), a = e;
    }
    Ol !== 0 && Ol !== 5 || ye(l), hu !== 0 && (hu = 0);
  }
  function Oy(l, t) {
    for (var u = l.suspendedLanes, a = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var c = 31 - ut(n), f = 1 << c, i = e[c];
      i === -1 ? ((f & u) === 0 || (f & a) !== 0) && (e[c] = pv(f, t)) : i <= t && (l.expiredLanes |= f), n &= ~f;
    }
    if (t = sl, u = K, u = De(
      l,
      l === t ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, u === 0 || l === t && (tl === 2 || tl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && Jn(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || Na(l, u)) {
      if (t = u & -u, t === l.callbackPriority) return t;
      switch (a !== null && Jn(a), $n(u)) {
        case 2:
        case 8:
          u = gi;
          break;
        case 32:
          u = Ae;
          break;
        case 268435456:
          u = Si;
          break;
        default:
          u = Ae;
      }
      return a = Dy.bind(null, l), u = Kn(u, a), l.callbackPriority = t, l.callbackNode = u, t;
    }
    return a !== null && a !== null && Jn(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Dy(l, t) {
    if (Ol !== 0 && Ol !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (En() && l.callbackNode !== u)
      return null;
    var a = K;
    return a = De(
      l,
      l === sl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (iy(l, a, t), Oy(l, lt()), l.callbackNode != null && l.callbackNode === u ? Dy.bind(null, l) : null);
  }
  function Uy(l, t) {
    if (En()) return null;
    iy(l, t, !0);
  }
  function io() {
    To(function() {
      (P & 6) !== 0 ? Kn(
        mi,
        fo
      ) : My();
    });
  }
  function Bf() {
    if (hu === 0) {
      var l = fa;
      l === 0 && (l = _e, _e <<= 1, (_e & 261888) === 0 && (_e = 256)), hu = l;
    }
    return hu;
  }
  function Ny(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Re("" + l);
  }
  function Hy(l, t) {
    var u = t.ownerDocument.createElement("input");
    return u.name = t.name, u.value = t.value, l.id && u.setAttribute("form", l.id), t.parentNode.insertBefore(u, t), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function so(l, t, u, a, e) {
    if (t === "submit" && u && u.stateNode === e) {
      var n = Ny(
        (e[Jl] || null).action
      ), c = a.submitter;
      c && (t = (t = c[Jl] || null) ? Ny(t.formAction) : c.getAttribute("formAction"), t !== null && (n = t, c = null));
      var f = new je(
        "action",
        "action",
        null,
        a,
        e
      );
      l.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (hu !== 0) {
                  var i = c ? Hy(e, c) : new FormData(e);
                  tf(
                    u,
                    {
                      pending: !0,
                      data: i,
                      method: e.method,
                      action: n
                    },
                    null,
                    i
                  );
                }
              } else
                typeof n == "function" && (f.preventDefault(), i = c ? Hy(e, c) : new FormData(e), tf(
                  u,
                  {
                    pending: !0,
                    data: i,
                    method: e.method,
                    action: n
                  },
                  n,
                  i
                ));
            },
            currentTarget: e
          }
        ]
      });
    }
  }
  for (var Yf = 0; Yf < bc.length; Yf++) {
    var Gf = bc[Yf], yo = Gf.toLowerCase(), vo = Gf[0].toUpperCase() + Gf.slice(1);
    Tt(
      yo,
      "on" + vo
    );
  }
  Tt(fs, "onAnimationEnd"), Tt(is, "onAnimationIteration"), Tt(ss, "onAnimationStart"), Tt("dblclick", "onDoubleClick"), Tt("focusin", "onFocus"), Tt("focusout", "onBlur"), Tt(Dd, "onTransitionRun"), Tt(Ud, "onTransitionStart"), Tt(Nd, "onTransitionCancel"), Tt(ys, "onTransitionEnd"), wu("onMouseEnter", ["mouseout", "mouseover"]), wu("onMouseLeave", ["mouseout", "mouseover"]), wu("onPointerEnter", ["pointerout", "pointerover"]), wu("onPointerLeave", ["pointerout", "pointerover"]), _u(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), _u(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), _u("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), _u(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), _u(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), _u(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ve = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), oo = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ve)
  );
  function Ry(l, t) {
    t = (t & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var a = l[u], e = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var c = a.length - 1; 0 <= c; c--) {
            var f = a[c], i = f.instance, h = f.currentTarget;
            if (f = f.listener, i !== n && e.isPropagationStopped())
              break l;
            n = f, e.currentTarget = h;
            try {
              n(e);
            } catch (b) {
              Ge(b);
            }
            e.currentTarget = null, n = i;
          }
        else
          for (c = 0; c < a.length; c++) {
            if (f = a[c], i = f.instance, h = f.currentTarget, f = f.listener, i !== n && e.isPropagationStopped())
              break l;
            n = f, e.currentTarget = h;
            try {
              n(e);
            } catch (b) {
              Ge(b);
            }
            e.currentTarget = null, n = i;
          }
      }
    }
  }
  function L(l, t) {
    var u = t[kn];
    u === void 0 && (u = t[kn] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    u.has(a) || (Cy(t, l, 2, !1), u.add(a));
  }
  function Qf(l, t, u) {
    var a = 0;
    t && (a |= 4), Cy(
      u,
      l,
      a,
      t
    );
  }
  var Mn = "_reactListening" + Math.random().toString(36).slice(2);
  function Xf(l) {
    if (!l[Mn]) {
      l[Mn] = !0, Mi.forEach(function(u) {
        u !== "selectionchange" && (oo.has(u) || Qf(u, !1, l), Qf(u, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Mn] || (t[Mn] = !0, Qf("selectionchange", !1, t));
    }
  }
  function Cy(l, t, u, a) {
    switch (fv(t)) {
      case 2:
        var e = xo;
        break;
      case 8:
        e = Zo;
        break;
      default:
        e = ti;
    }
    u = e.bind(
      null,
      t,
      u,
      l
    ), e = void 0, !nc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = !0), a ? e !== void 0 ? l.addEventListener(t, u, {
      capture: !0,
      passive: e
    }) : l.addEventListener(t, u, !0) : e !== void 0 ? l.addEventListener(t, u, {
      passive: e
    }) : l.addEventListener(t, u, !1);
  }
  function xf(l, t, u, a, e) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var f = a.stateNode.containerInfo;
          if (f === e) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var i = c.tag;
              if ((i === 3 || i === 4) && c.stateNode.containerInfo === e)
                return;
              c = c.return;
            }
          for (; f !== null; ) {
            if (c = Lu(f), c === null) return;
            if (i = c.tag, i === 5 || i === 6 || i === 26 || i === 27) {
              a = n = c;
              continue l;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Yi(function() {
      var h = n, b = ac(u), T = [];
      l: {
        var g = vs.get(l);
        if (g !== void 0) {
          var S = je, U = l;
          switch (l) {
            case "keypress":
              if (qe(u) === 0) break l;
            case "keydown":
            case "keyup":
              S = nd;
              break;
            case "focusin":
              U = "focus", S = sc;
              break;
            case "focusout":
              U = "blur", S = sc;
              break;
            case "beforeblur":
            case "afterblur":
              S = sc;
              break;
            case "click":
              if (u.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              S = Xi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              S = wv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              S = id;
              break;
            case fs:
            case is:
            case ss:
              S = kv;
              break;
            case ys:
              S = yd;
              break;
            case "scroll":
            case "scrollend":
              S = Kv;
              break;
            case "wheel":
              S = dd;
              break;
            case "copy":
            case "cut":
            case "paste":
              S = Iv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              S = Zi;
              break;
            case "toggle":
            case "beforetoggle":
              S = hd;
          }
          var q = (t & 4) !== 0, fl = !q && (l === "scroll" || l === "scrollend"), v = q ? g !== null ? g + "Capture" : null : g;
          q = [];
          for (var s = h, o; s !== null; ) {
            var z = s;
            if (o = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || o === null || v === null || (z = qa(s, v), z != null && q.push(
              de(s, z, o)
            )), fl) break;
            s = s.return;
          }
          0 < q.length && (g = new S(
            g,
            U,
            null,
            u,
            b
          ), T.push({ event: g, listeners: q }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (g = l === "mouseover" || l === "pointerover", S = l === "mouseout" || l === "pointerout", g && u !== uc && (U = u.relatedTarget || u.fromElement) && (Lu(U) || U[Vu]))
            break l;
          if ((S || g) && (g = b.window === b ? b : (g = b.ownerDocument) ? g.defaultView || g.parentWindow : window, S ? (U = u.relatedTarget || u.toElement, S = h, U = U ? Lu(U) : null, U !== null && (fl = al(U), q = U.tag, U !== fl || q !== 5 && q !== 27 && q !== 6) && (U = null)) : (S = null, U = h), S !== U)) {
            if (q = Xi, z = "onMouseLeave", v = "onMouseEnter", s = "mouse", (l === "pointerout" || l === "pointerover") && (q = Zi, z = "onPointerLeave", v = "onPointerEnter", s = "pointer"), fl = S == null ? g : Ca(S), o = U == null ? g : Ca(U), g = new q(
              z,
              s + "leave",
              S,
              u,
              b
            ), g.target = fl, g.relatedTarget = o, z = null, Lu(b) === h && (q = new q(
              v,
              s + "enter",
              U,
              u,
              b
            ), q.target = o, q.relatedTarget = fl, z = q), fl = z, S && U)
              t: {
                for (q = ho, v = S, s = U, o = 0, z = v; z; z = q(z))
                  o++;
                z = 0;
                for (var C = s; C; C = q(C))
                  z++;
                for (; 0 < o - z; )
                  v = q(v), o--;
                for (; 0 < z - o; )
                  s = q(s), z--;
                for (; o--; ) {
                  if (v === s || s !== null && v === s.alternate) {
                    q = v;
                    break t;
                  }
                  v = q(v), s = q(s);
                }
                q = null;
              }
            else q = null;
            S !== null && qy(
              T,
              g,
              S,
              q,
              !1
            ), U !== null && fl !== null && qy(
              T,
              fl,
              U,
              q,
              !0
            );
          }
        }
        l: {
          if (g = h ? Ca(h) : window, S = g.nodeName && g.nodeName.toLowerCase(), S === "select" || S === "input" && g.type === "file")
            var k = ki;
          else if (Wi(g))
            if (Fi)
              k = _d;
            else {
              k = Ed;
              var R = Td;
            }
          else
            S = g.nodeName, !S || S.toLowerCase() !== "input" || g.type !== "checkbox" && g.type !== "radio" ? h && tc(h.elementType) && (k = ki) : k = Ad;
          if (k && (k = k(l, h))) {
            $i(
              T,
              k,
              u,
              b
            );
            break l;
          }
          R && R(l, g, h), l === "focusout" && h && g.type === "number" && h.memoizedProps.value != null && lc(g, "number", g.value);
        }
        switch (R = h ? Ca(h) : window, l) {
          case "focusin":
            (Wi(R) || R.contentEditable === "true") && (Pu = R, mc = h, xa = null);
            break;
          case "focusout":
            xa = mc = Pu = null;
            break;
          case "mousedown":
            gc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gc = !1, ns(T, u, b);
            break;
          case "selectionchange":
            if (Od) break;
          case "keydown":
          case "keyup":
            ns(T, u, b);
        }
        var X;
        if (vc)
          l: {
            switch (l) {
              case "compositionstart":
                var J = "onCompositionStart";
                break l;
              case "compositionend":
                J = "onCompositionEnd";
                break l;
              case "compositionupdate":
                J = "onCompositionUpdate";
                break l;
            }
            J = void 0;
          }
        else
          Iu ? Ji(l, u) && (J = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (J = "onCompositionStart");
        J && (Vi && u.locale !== "ko" && (Iu || J !== "onCompositionStart" ? J === "onCompositionEnd" && Iu && (X = Gi()) : (It = b, cc = "value" in It ? It.value : It.textContent, Iu = !0)), R = On(h, J), 0 < R.length && (J = new xi(
          J,
          l,
          null,
          u,
          b
        ), T.push({ event: J, listeners: R }), X ? J.data = X : (X = wi(u), X !== null && (J.data = X)))), (X = gd ? Sd(l, u) : bd(l, u)) && (J = On(h, "onBeforeInput"), 0 < J.length && (R = new xi(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          b
        ), T.push({
          event: R,
          listeners: J
        }), R.data = X)), so(
          T,
          l,
          h,
          u,
          b
        );
      }
      Ry(T, t);
    });
  }
  function de(l, t, u) {
    return {
      instance: l,
      listener: t,
      currentTarget: u
    };
  }
  function On(l, t) {
    for (var u = t + "Capture", a = []; l !== null; ) {
      var e = l, n = e.stateNode;
      if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = qa(l, u), e != null && a.unshift(
        de(l, e, n)
      ), e = qa(l, t), e != null && a.push(
        de(l, e, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function ho(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function qy(l, t, u, a, e) {
    for (var n = t._reactName, c = []; u !== null && u !== a; ) {
      var f = u, i = f.alternate, h = f.stateNode;
      if (f = f.tag, i !== null && i === a) break;
      f !== 5 && f !== 26 && f !== 27 || h === null || (i = h, e ? (h = qa(u, n), h != null && c.unshift(
        de(u, h, i)
      )) : e || (h = qa(u, n), h != null && c.push(
        de(u, h, i)
      ))), u = u.return;
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var mo = /\r\n?/g, go = /\u0000|\uFFFD/g;
  function py(l) {
    return (typeof l == "string" ? l : "" + l).replace(mo, `
`).replace(go, "");
  }
  function jy(l, t) {
    return t = py(t), py(l) === t;
  }
  function cl(l, t, u, a, e, n) {
    switch (u) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || $u(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && $u(l, "" + a);
        break;
      case "className":
        Ne(l, "class", a);
        break;
      case "tabIndex":
        Ne(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ne(l, u, a);
        break;
      case "style":
        ji(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Ne(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        a = Re("" + a), l.setAttribute(u, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (u === "formAction" ? (t !== "input" && cl(l, t, "name", e.name, e, null), cl(
            l,
            t,
            "formEncType",
            e.formEncType,
            e,
            null
          ), cl(
            l,
            t,
            "formMethod",
            e.formMethod,
            e,
            null
          ), cl(
            l,
            t,
            "formTarget",
            e.formTarget,
            e,
            null
          )) : (cl(l, t, "encType", e.encType, e, null), cl(l, t, "method", e.method, e, null), cl(l, t, "target", e.target, e, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        a = Re("" + a), l.setAttribute(u, a);
        break;
      case "onClick":
        a != null && (l.onclick = qt);
        break;
      case "onScroll":
        a != null && L("scroll", l);
        break;
      case "onScrollEnd":
        a != null && L("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(m(61));
          if (u = a.__html, u != null) {
            if (e.children != null) throw Error(m(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = Re("" + a), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          u
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, "" + a) : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(u, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, a) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(u, a) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(u) : l.setAttribute(u, a);
        break;
      case "popover":
        L("beforetoggle", l), L("toggle", l), Ue(l, "popover", a);
        break;
      case "xlinkActuate":
        Ct(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Ct(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Ct(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Ct(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Ct(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Ct(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Ct(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Ct(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Ct(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Ue(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = Vv.get(u) || u, Ue(l, u, a));
    }
  }
  function Zf(l, t, u, a, e, n) {
    switch (u) {
      case "style":
        ji(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(m(61));
          if (u = a.__html, u != null) {
            if (e.children != null) throw Error(m(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof a == "string" ? $u(l, a) : (typeof a == "number" || typeof a == "bigint") && $u(l, "" + a);
        break;
      case "onScroll":
        a != null && L("scroll", l);
        break;
      case "onScrollEnd":
        a != null && L("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = qt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Oi.hasOwnProperty(u))
          l: {
            if (u[0] === "o" && u[1] === "n" && (e = u.endsWith("Capture"), t = u.slice(2, e ? u.length - 7 : void 0), n = l[Jl] || null, n = n != null ? n[u] : null, typeof n == "function" && l.removeEventListener(t, n, e), typeof a == "function")) {
              typeof n != "function" && n !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(t, a, e);
              break l;
            }
            u in l ? l[u] = a : a === !0 ? l.setAttribute(u, "") : Ue(l, u, a);
          }
    }
  }
  function Bl(l, t, u) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        L("error", l), L("load", l);
        var a = !1, e = !1, n;
        for (n in u)
          if (u.hasOwnProperty(n)) {
            var c = u[n];
            if (c != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  e = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(m(137, t));
                default:
                  cl(l, t, n, c, u, null);
              }
          }
        e && cl(l, t, "srcSet", u.srcSet, u, null), a && cl(l, t, "src", u.src, u, null);
        return;
      case "input":
        L("invalid", l);
        var f = n = c = e = null, i = null, h = null;
        for (a in u)
          if (u.hasOwnProperty(a)) {
            var b = u[a];
            if (b != null)
              switch (a) {
                case "name":
                  e = b;
                  break;
                case "type":
                  c = b;
                  break;
                case "checked":
                  i = b;
                  break;
                case "defaultChecked":
                  h = b;
                  break;
                case "value":
                  n = b;
                  break;
                case "defaultValue":
                  f = b;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (b != null)
                    throw Error(m(137, t));
                  break;
                default:
                  cl(l, t, a, b, u, null);
              }
          }
        Ri(
          l,
          n,
          f,
          i,
          h,
          c,
          e,
          !1
        );
        return;
      case "select":
        L("invalid", l), a = c = n = null;
        for (e in u)
          if (u.hasOwnProperty(e) && (f = u[e], f != null))
            switch (e) {
              case "value":
                n = f;
                break;
              case "defaultValue":
                c = f;
                break;
              case "multiple":
                a = f;
              default:
                cl(l, t, e, f, u, null);
            }
        t = n, u = c, l.multiple = !!a, t != null ? Wu(l, !!a, t, !1) : u != null && Wu(l, !!a, u, !0);
        return;
      case "textarea":
        L("invalid", l), n = e = a = null;
        for (c in u)
          if (u.hasOwnProperty(c) && (f = u[c], f != null))
            switch (c) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                e = f;
                break;
              case "children":
                n = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(m(91));
                break;
              default:
                cl(l, t, c, f, u, null);
            }
        qi(l, a, e, n);
        return;
      case "option":
        for (i in u)
          if (u.hasOwnProperty(i) && (a = u[i], a != null))
            switch (i) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                cl(l, t, i, a, u, null);
            }
        return;
      case "dialog":
        L("beforetoggle", l), L("toggle", l), L("cancel", l), L("close", l);
        break;
      case "iframe":
      case "object":
        L("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ve.length; a++)
          L(ve[a], l);
        break;
      case "image":
        L("error", l), L("load", l);
        break;
      case "details":
        L("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        L("error", l), L("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (h in u)
          if (u.hasOwnProperty(h) && (a = u[h], a != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(m(137, t));
              default:
                cl(l, t, h, a, u, null);
            }
        return;
      default:
        if (tc(t)) {
          for (b in u)
            u.hasOwnProperty(b) && (a = u[b], a !== void 0 && Zf(
              l,
              t,
              b,
              a,
              u,
              void 0
            ));
          return;
        }
    }
    for (f in u)
      u.hasOwnProperty(f) && (a = u[f], a != null && cl(l, t, f, a, u, null));
  }
  function So(l, t, u, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var e = null, n = null, c = null, f = null, i = null, h = null, b = null;
        for (S in u) {
          var T = u[S];
          if (u.hasOwnProperty(S) && T != null)
            switch (S) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                i = T;
              default:
                a.hasOwnProperty(S) || cl(l, t, S, null, a, T);
            }
        }
        for (var g in a) {
          var S = a[g];
          if (T = u[g], a.hasOwnProperty(g) && (S != null || T != null))
            switch (g) {
              case "type":
                n = S;
                break;
              case "name":
                e = S;
                break;
              case "checked":
                h = S;
                break;
              case "defaultChecked":
                b = S;
                break;
              case "value":
                c = S;
                break;
              case "defaultValue":
                f = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(m(137, t));
                break;
              default:
                S !== T && cl(
                  l,
                  t,
                  g,
                  S,
                  a,
                  T
                );
            }
        }
        Pn(
          l,
          c,
          f,
          i,
          h,
          b,
          n,
          e
        );
        return;
      case "select":
        S = c = f = g = null;
        for (n in u)
          if (i = u[n], u.hasOwnProperty(n) && i != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                S = i;
              default:
                a.hasOwnProperty(n) || cl(
                  l,
                  t,
                  n,
                  null,
                  a,
                  i
                );
            }
        for (e in a)
          if (n = a[e], i = u[e], a.hasOwnProperty(e) && (n != null || i != null))
            switch (e) {
              case "value":
                g = n;
                break;
              case "defaultValue":
                f = n;
                break;
              case "multiple":
                c = n;
              default:
                n !== i && cl(
                  l,
                  t,
                  e,
                  n,
                  a,
                  i
                );
            }
        t = f, u = c, a = S, g != null ? Wu(l, !!u, g, !1) : !!a != !!u && (t != null ? Wu(l, !!u, t, !0) : Wu(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        S = g = null;
        for (f in u)
          if (e = u[f], u.hasOwnProperty(f) && e != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                cl(l, t, f, null, a, e);
            }
        for (c in a)
          if (e = a[c], n = u[c], a.hasOwnProperty(c) && (e != null || n != null))
            switch (c) {
              case "value":
                g = e;
                break;
              case "defaultValue":
                S = e;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (e != null) throw Error(m(91));
                break;
              default:
                e !== n && cl(l, t, c, e, a, n);
            }
        Ci(l, g, S);
        return;
      case "option":
        for (var U in u)
          if (g = u[U], u.hasOwnProperty(U) && g != null && !a.hasOwnProperty(U))
            switch (U) {
              case "selected":
                l.selected = !1;
                break;
              default:
                cl(
                  l,
                  t,
                  U,
                  null,
                  a,
                  g
                );
            }
        for (i in a)
          if (g = a[i], S = u[i], a.hasOwnProperty(i) && g !== S && (g != null || S != null))
            switch (i) {
              case "selected":
                l.selected = g && typeof g != "function" && typeof g != "symbol";
                break;
              default:
                cl(
                  l,
                  t,
                  i,
                  g,
                  a,
                  S
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var q in u)
          g = u[q], u.hasOwnProperty(q) && g != null && !a.hasOwnProperty(q) && cl(l, t, q, null, a, g);
        for (h in a)
          if (g = a[h], S = u[h], a.hasOwnProperty(h) && g !== S && (g != null || S != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(m(137, t));
                break;
              default:
                cl(
                  l,
                  t,
                  h,
                  g,
                  a,
                  S
                );
            }
        return;
      default:
        if (tc(t)) {
          for (var fl in u)
            g = u[fl], u.hasOwnProperty(fl) && g !== void 0 && !a.hasOwnProperty(fl) && Zf(
              l,
              t,
              fl,
              void 0,
              a,
              g
            );
          for (b in a)
            g = a[b], S = u[b], !a.hasOwnProperty(b) || g === S || g === void 0 && S === void 0 || Zf(
              l,
              t,
              b,
              g,
              a,
              S
            );
          return;
        }
    }
    for (var v in u)
      g = u[v], u.hasOwnProperty(v) && g != null && !a.hasOwnProperty(v) && cl(l, t, v, null, a, g);
    for (T in a)
      g = a[T], S = u[T], !a.hasOwnProperty(T) || g === S || g == null && S == null || cl(l, t, T, g, a, S);
  }
  function By(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function bo() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, u = performance.getEntriesByType("resource"), a = 0; a < u.length; a++) {
        var e = u[a], n = e.transferSize, c = e.initiatorType, f = e.duration;
        if (n && f && By(c)) {
          for (c = 0, f = e.responseEnd, a += 1; a < u.length; a++) {
            var i = u[a], h = i.startTime;
            if (h > f) break;
            var b = i.transferSize, T = i.initiatorType;
            b && By(T) && (i = i.responseEnd, c += b * (i < f ? 1 : (f - h) / (i - h)));
          }
          if (--a, t += 8 * (n + c) / (e.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Vf = null, Lf = null;
  function Dn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Yy(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Gy(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Kf(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Jf = null;
  function ro() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Jf ? !1 : (Jf = l, !0) : (Jf = null, !1);
  }
  var Qy = typeof setTimeout == "function" ? setTimeout : void 0, zo = typeof clearTimeout == "function" ? clearTimeout : void 0, Xy = typeof Promise == "function" ? Promise : void 0, To = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xy < "u" ? function(l) {
    return Xy.resolve(null).then(l).catch(Eo);
  } : Qy;
  function Eo(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function mu(l) {
    return l === "head";
  }
  function xy(l, t) {
    var u = t, a = 0;
    do {
      var e = u.nextSibling;
      if (l.removeChild(u), e && e.nodeType === 8)
        if (u = e.data, u === "/$" || u === "/&") {
          if (a === 0) {
            l.removeChild(e), Oa(t);
            return;
          }
          a--;
        } else if (u === "$" || u === "$?" || u === "$~" || u === "$!" || u === "&")
          a++;
        else if (u === "html")
          oe(l.ownerDocument.documentElement);
        else if (u === "head") {
          u = l.ownerDocument.head, oe(u);
          for (var n = u.firstChild; n; ) {
            var c = n.nextSibling, f = n.nodeName;
            n[Ra] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && n.rel.toLowerCase() === "stylesheet" || u.removeChild(n), n = c;
          }
        } else
          u === "body" && oe(l.ownerDocument.body);
      u = e;
    } while (u);
    Oa(t);
  }
  function Zy(l, t) {
    var u = l;
    l = 0;
    do {
      var a = u.nextSibling;
      if (u.nodeType === 1 ? t ? (u._stashedDisplay = u.style.display, u.style.display = "none") : (u.style.display = u._stashedDisplay || "", u.getAttribute("style") === "" && u.removeAttribute("style")) : u.nodeType === 3 && (t ? (u._stashedText = u.nodeValue, u.nodeValue = "") : u.nodeValue = u._stashedText || ""), a && a.nodeType === 8)
        if (u = a.data, u === "/$") {
          if (l === 0) break;
          l--;
        } else
          u !== "$" && u !== "$?" && u !== "$~" && u !== "$!" || l++;
      u = a;
    } while (u);
  }
  function wf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var u = t;
      switch (t = t.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          wf(u), Fn(u);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function Ao(l, t, u, a) {
    for (; l.nodeType === 1; ) {
      var e = u;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[Ra])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (n !== e.rel || l.getAttribute("href") !== (e.href == null || e.href === "" ? null : e.href) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin) || l.getAttribute("title") !== (e.title == null ? null : e.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (n = l.getAttribute("src"), (n !== (e.src == null ? null : e.src) || l.getAttribute("type") !== (e.type == null ? null : e.type) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = e.name == null ? null : "" + e.name;
        if (e.type === "hidden" && l.getAttribute("name") === n)
          return l;
      } else return l;
      if (l = bt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function _o(l, t, u) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Vy(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Wf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function $f(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Mo(l, t) {
    var u = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || u.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), u.removeEventListener("DOMContentLoaded", a);
      };
      u.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function bt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var kf = null;
  function Ly(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "/$" || u === "/&") {
          if (t === 0)
            return bt(l.nextSibling);
          t--;
        } else
          u !== "$" && u !== "$!" && u !== "$?" && u !== "$~" && u !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Ky(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?" || u === "$~" || u === "&") {
          if (t === 0) return l;
          t--;
        } else u !== "/$" && u !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Jy(l, t, u) {
    switch (t = Dn(u), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(m(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(m(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(m(454));
        return l;
      default:
        throw Error(m(451));
    }
  }
  function oe(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Fn(l);
  }
  var rt = /* @__PURE__ */ new Map(), wy = /* @__PURE__ */ new Set();
  function Un(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var $t = O.d;
  O.d = {
    f: Oo,
    r: Do,
    D: Uo,
    C: No,
    L: Ho,
    m: Ro,
    X: qo,
    S: Co,
    M: po
  };
  function Oo() {
    var l = $t.f(), t = rn();
    return l || t;
  }
  function Do(l) {
    var t = Ku(l);
    t !== null && t.tag === 5 && t.type === "form" ? y0(t) : $t.r(l);
  }
  var Aa = typeof document > "u" ? null : document;
  function Wy(l, t, u) {
    var a = Aa;
    if (a && typeof t == "string" && t) {
      var e = vt(t);
      e = 'link[rel="' + l + '"][href="' + e + '"]', typeof u == "string" && (e += '[crossorigin="' + u + '"]'), wy.has(e) || (wy.add(e), l = { rel: l, crossOrigin: u, href: t }, a.querySelector(e) === null && (t = a.createElement("link"), Bl(t, "link", l), Ul(t), a.head.appendChild(t)));
    }
  }
  function Uo(l) {
    $t.D(l), Wy("dns-prefetch", l, null);
  }
  function No(l, t) {
    $t.C(l, t), Wy("preconnect", l, t);
  }
  function Ho(l, t, u) {
    $t.L(l, t, u);
    var a = Aa;
    if (a && l && t) {
      var e = 'link[rel="preload"][as="' + vt(t) + '"]';
      t === "image" && u && u.imageSrcSet ? (e += '[imagesrcset="' + vt(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (e += '[imagesizes="' + vt(
        u.imageSizes
      ) + '"]')) : e += '[href="' + vt(l) + '"]';
      var n = e;
      switch (t) {
        case "style":
          n = _a(l);
          break;
        case "script":
          n = Ma(l);
      }
      rt.has(n) || (l = p(
        {
          rel: "preload",
          href: t === "image" && u && u.imageSrcSet ? void 0 : l,
          as: t
        },
        u
      ), rt.set(n, l), a.querySelector(e) !== null || t === "style" && a.querySelector(he(n)) || t === "script" && a.querySelector(me(n)) || (t = a.createElement("link"), Bl(t, "link", l), Ul(t), a.head.appendChild(t)));
    }
  }
  function Ro(l, t) {
    $t.m(l, t);
    var u = Aa;
    if (u && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + vt(a) + '"][href="' + vt(l) + '"]', n = e;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ma(l);
      }
      if (!rt.has(n) && (l = p({ rel: "modulepreload", href: l }, t), rt.set(n, l), u.querySelector(e) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(me(n)))
              return;
        }
        a = u.createElement("link"), Bl(a, "link", l), Ul(a), u.head.appendChild(a);
      }
    }
  }
  function Co(l, t, u) {
    $t.S(l, t, u);
    var a = Aa;
    if (a && l) {
      var e = Ju(a).hoistableStyles, n = _a(l);
      t = t || "default";
      var c = e.get(n);
      if (!c) {
        var f = { loading: 0, preload: null };
        if (c = a.querySelector(
          he(n)
        ))
          f.loading = 5;
        else {
          l = p(
            { rel: "stylesheet", href: l, "data-precedence": t },
            u
          ), (u = rt.get(n)) && Ff(l, u);
          var i = c = a.createElement("link");
          Ul(i), Bl(i, "link", l), i._p = new Promise(function(h, b) {
            i.onload = h, i.onerror = b;
          }), i.addEventListener("load", function() {
            f.loading |= 1;
          }), i.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, Nn(c, t, a);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: f
        }, e.set(n, c);
      }
    }
  }
  function qo(l, t) {
    $t.X(l, t);
    var u = Aa;
    if (u && l) {
      var a = Ju(u).hoistableScripts, e = Ma(l), n = a.get(e);
      n || (n = u.querySelector(me(e)), n || (l = p({ src: l, async: !0 }, t), (t = rt.get(e)) && If(l, t), n = u.createElement("script"), Ul(n), Bl(n, "link", l), u.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(e, n));
    }
  }
  function po(l, t) {
    $t.M(l, t);
    var u = Aa;
    if (u && l) {
      var a = Ju(u).hoistableScripts, e = Ma(l), n = a.get(e);
      n || (n = u.querySelector(me(e)), n || (l = p({ src: l, async: !0, type: "module" }, t), (t = rt.get(e)) && If(l, t), n = u.createElement("script"), Ul(n), Bl(n, "link", l), u.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(e, n));
    }
  }
  function $y(l, t, u, a) {
    var e = (e = Z.current) ? Un(e) : null;
    if (!e) throw Error(m(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (t = _a(u.href), u = Ju(
          e
        ).hoistableStyles, a = u.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = _a(u.href);
          var n = Ju(
            e
          ).hoistableStyles, c = n.get(l);
          if (c || (e = e.ownerDocument || e, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, c), (n = e.querySelector(
            he(l)
          )) && !n._p && (c.instance = n, c.state.loading = 5), rt.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, rt.set(l, u), n || jo(
            e,
            l,
            u,
            c.state
          ))), t && a === null)
            throw Error(m(528, ""));
          return c;
        }
        if (t && a !== null)
          throw Error(m(529, ""));
        return null;
      case "script":
        return t = u.async, u = u.src, typeof u == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ma(u), u = Ju(
          e
        ).hoistableScripts, a = u.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(m(444, l));
    }
  }
  function _a(l) {
    return 'href="' + vt(l) + '"';
  }
  function he(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function ky(l) {
    return p({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function jo(l, t, u, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Bl(t, "link", u), Ul(t), l.head.appendChild(t));
  }
  function Ma(l) {
    return '[src="' + vt(l) + '"]';
  }
  function me(l) {
    return "script[async]" + l;
  }
  function Fy(l, t, u) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + vt(u.href) + '"]'
          );
          if (a)
            return t.instance = a, Ul(a), a;
          var e = p({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Ul(a), Bl(a, "style", e), Nn(a, u.precedence, l), t.instance = a;
        case "stylesheet":
          e = _a(u.href);
          var n = l.querySelector(
            he(e)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Ul(n), n;
          a = ky(u), (e = rt.get(e)) && Ff(a, e), n = (l.ownerDocument || l).createElement("link"), Ul(n);
          var c = n;
          return c._p = new Promise(function(f, i) {
            c.onload = f, c.onerror = i;
          }), Bl(n, "link", a), t.state.loading |= 4, Nn(n, u.precedence, l), t.instance = n;
        case "script":
          return n = Ma(u.src), (e = l.querySelector(
            me(n)
          )) ? (t.instance = e, Ul(e), e) : (a = u, (e = rt.get(n)) && (a = p({}, u), If(a, e)), l = l.ownerDocument || l, e = l.createElement("script"), Ul(e), Bl(e, "link", a), l.head.appendChild(e), t.instance = e);
        case "void":
          return null;
        default:
          throw Error(m(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Nn(a, u.precedence, l));
    return t.instance;
  }
  function Nn(l, t, u) {
    for (var a = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), e = a.length ? a[a.length - 1] : null, n = e, c = 0; c < a.length; c++) {
      var f = a[c];
      if (f.dataset.precedence === t) n = f;
      else if (n !== e) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = u.nodeType === 9 ? u.head : u, t.insertBefore(l, t.firstChild));
  }
  function Ff(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function If(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Hn = null;
  function Iy(l, t, u) {
    if (Hn === null) {
      var a = /* @__PURE__ */ new Map(), e = Hn = /* @__PURE__ */ new Map();
      e.set(u, a);
    } else
      e = Hn, a = e.get(u), a || (a = /* @__PURE__ */ new Map(), e.set(u, a));
    if (a.has(l)) return a;
    for (a.set(l, null), u = u.getElementsByTagName(l), e = 0; e < u.length; e++) {
      var n = u[e];
      if (!(n[Ra] || n[Cl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var f = a.get(c);
        f ? f.push(n) : a.set(c, [n]);
      }
    }
    return a;
  }
  function Py(l, t, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function Bo(l, t, u) {
    if (u === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return l = t.disabled, typeof t.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function lv(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Yo(l, t, u, a) {
    if (u.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (u.state.loading & 4) === 0) {
      if (u.instance === null) {
        var e = _a(a.href), n = t.querySelector(
          he(e)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Rn.bind(l), t.then(l, l)), u.state.loading |= 4, u.instance = n, Ul(n);
          return;
        }
        n = t.ownerDocument || t, a = ky(a), (e = rt.get(e)) && Ff(a, e), n = n.createElement("link"), Ul(n);
        var c = n;
        c._p = new Promise(function(f, i) {
          c.onload = f, c.onerror = i;
        }), Bl(n, "link", a), u.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(u, t), (t = u.state.preload) && (u.state.loading & 3) === 0 && (l.count++, u = Rn.bind(l), t.addEventListener("load", u), t.addEventListener("error", u));
    }
  }
  var Pf = 0;
  function Go(l, t) {
    return l.stylesheets && l.count === 0 && qn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(u) {
      var a = setTimeout(function() {
        if (l.stylesheets && qn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Pf === 0 && (Pf = 62500 * bo());
      var e = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && qn(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Pf ? 50 : 800) + t
      );
      return l.unsuspend = u, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(e);
      };
    } : null;
  }
  function Rn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) qn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Cn = null;
  function qn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Cn = /* @__PURE__ */ new Map(), t.forEach(Qo, l), Cn = null, Rn.call(l));
  }
  function Qo(l, t) {
    if (!(t.state.loading & 4)) {
      var u = Cn.get(l);
      if (u) var a = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Cn.set(l, u);
        for (var e = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < e.length; n++) {
          var c = e[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (u.set(c.dataset.precedence, c), a = c);
        }
        a && u.set(null, a);
      }
      e = t.instance, c = e.getAttribute("data-precedence"), n = u.get(c) || a, n === a && u.set(null, e), u.set(c, e), this.count++, a = Rn.bind(this), e.addEventListener("load", a), e.addEventListener("error", a), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
    }
  }
  var ge = {
    $$typeof: Dl,
    Provider: null,
    Consumer: null,
    _currentValue: B,
    _currentValue2: B,
    _threadCount: 0
  };
  function Xo(l, t, u, a, e, n, c, f, i) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = a, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = i, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function tv(l, t, u, a, e, n, c, f, i, h, b, T) {
    return l = new Xo(
      l,
      t,
      u,
      c,
      i,
      h,
      b,
      T,
      f
    ), t = 1, n === !0 && (t |= 24), n = et(3, null, null, t), l.current = n, n.stateNode = l, t = Rc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: u,
      cache: t
    }, jc(n), l;
  }
  function uv(l) {
    return l ? (l = ua, l) : ua;
  }
  function av(l, t, u, a, e, n) {
    e = uv(e), a.context === null ? a.context = e : a.pendingContext = e, a = eu(t), a.payload = { element: u }, n = n === void 0 ? null : n, n !== null && (a.callback = n), u = nu(l, a, t), u !== null && (Il(u, l, t), Wa(u, l, t));
  }
  function ev(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < t ? u : t;
    }
  }
  function li(l, t) {
    ev(l, t), (l = l.alternate) && ev(l, t);
  }
  function nv(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Uu(l, 67108864);
      t !== null && Il(t, l, 67108864), li(l, 67108864);
    }
  }
  function cv(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = st();
      t = Wn(t);
      var u = Uu(l, t);
      u !== null && Il(u, l, t), li(l, t);
    }
  }
  var pn = !0;
  function xo(l, t, u, a) {
    var e = r.T;
    r.T = null;
    var n = O.p;
    try {
      O.p = 2, ti(l, t, u, a);
    } finally {
      O.p = n, r.T = e;
    }
  }
  function Zo(l, t, u, a) {
    var e = r.T;
    r.T = null;
    var n = O.p;
    try {
      O.p = 8, ti(l, t, u, a);
    } finally {
      O.p = n, r.T = e;
    }
  }
  function ti(l, t, u, a) {
    if (pn) {
      var e = ui(a);
      if (e === null)
        xf(
          l,
          t,
          a,
          jn,
          u
        ), iv(l, a);
      else if (Lo(
        e,
        l,
        t,
        u,
        a
      ))
        a.stopPropagation();
      else if (iv(l, a), t & 4 && -1 < Vo.indexOf(l)) {
        for (; e !== null; ) {
          var n = Ku(e);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var c = Au(n.pendingLanes);
                  if (c !== 0) {
                    var f = n;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; c; ) {
                      var i = 1 << 31 - ut(c);
                      f.entanglements[1] |= i, c &= ~i;
                    }
                    Ht(n), (P & 6) === 0 && (Sn = lt() + 500, ye(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = Uu(n, 2), f !== null && Il(f, n, 2), rn(), li(n, 2);
            }
          if (n = ui(a), n === null && xf(
            l,
            t,
            a,
            jn,
            u
          ), n === e) break;
          e = n;
        }
        e !== null && a.stopPropagation();
      } else
        xf(
          l,
          t,
          a,
          null,
          u
        );
    }
  }
  function ui(l) {
    return l = ac(l), ai(l);
  }
  var jn = null;
  function ai(l) {
    if (jn = null, l = Lu(l), l !== null) {
      var t = al(l);
      if (t === null) l = null;
      else {
        var u = t.tag;
        if (u === 13) {
          if (l = I(t), l !== null) return l;
          l = null;
        } else if (u === 31) {
          if (l = yl(t), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return jn = l, null;
  }
  function fv(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Dv()) {
          case mi:
            return 2;
          case gi:
            return 8;
          case Ae:
          case Uv:
            return 32;
          case Si:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ei = !1, gu = null, Su = null, bu = null, Se = /* @__PURE__ */ new Map(), be = /* @__PURE__ */ new Map(), ru = [], Vo = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function iv(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        gu = null;
        break;
      case "dragenter":
      case "dragleave":
        Su = null;
        break;
      case "mouseover":
      case "mouseout":
        bu = null;
        break;
      case "pointerover":
      case "pointerout":
        Se.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        be.delete(t.pointerId);
    }
  }
  function re(l, t, u, a, e, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: u,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [e]
    }, t !== null && (t = Ku(t), t !== null && nv(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
  }
  function Lo(l, t, u, a, e) {
    switch (t) {
      case "focusin":
        return gu = re(
          gu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "dragenter":
        return Su = re(
          Su,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "mouseover":
        return bu = re(
          bu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "pointerover":
        var n = e.pointerId;
        return Se.set(
          n,
          re(
            Se.get(n) || null,
            l,
            t,
            u,
            a,
            e
          )
        ), !0;
      case "gotpointercapture":
        return n = e.pointerId, be.set(
          n,
          re(
            be.get(n) || null,
            l,
            t,
            u,
            a,
            e
          )
        ), !0;
    }
    return !1;
  }
  function sv(l) {
    var t = Lu(l.target);
    if (t !== null) {
      var u = al(t);
      if (u !== null) {
        if (t = u.tag, t === 13) {
          if (t = I(u), t !== null) {
            l.blockedOn = t, Ai(l.priority, function() {
              cv(u);
            });
            return;
          }
        } else if (t === 31) {
          if (t = yl(u), t !== null) {
            l.blockedOn = t, Ai(l.priority, function() {
              cv(u);
            });
            return;
          }
        } else if (t === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Bn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var u = ui(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var a = new u.constructor(
          u.type,
          u
        );
        uc = a, u.target.dispatchEvent(a), uc = null;
      } else
        return t = Ku(u), t !== null && nv(t), l.blockedOn = u, !1;
      t.shift();
    }
    return !0;
  }
  function yv(l, t, u) {
    Bn(l) && u.delete(t);
  }
  function Ko() {
    ei = !1, gu !== null && Bn(gu) && (gu = null), Su !== null && Bn(Su) && (Su = null), bu !== null && Bn(bu) && (bu = null), Se.forEach(yv), be.forEach(yv);
  }
  function Yn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, ei || (ei = !0, _.unstable_scheduleCallback(
      _.unstable_NormalPriority,
      Ko
    )));
  }
  var Gn = null;
  function vv(l) {
    Gn !== l && (Gn = l, _.unstable_scheduleCallback(
      _.unstable_NormalPriority,
      function() {
        Gn === l && (Gn = null);
        for (var t = 0; t < l.length; t += 3) {
          var u = l[t], a = l[t + 1], e = l[t + 2];
          if (typeof a != "function") {
            if (ai(a || u) === null)
              continue;
            break;
          }
          var n = Ku(u);
          n !== null && (l.splice(t, 3), t -= 3, tf(
            n,
            {
              pending: !0,
              data: e,
              method: u.method,
              action: a
            },
            a,
            e
          ));
        }
      }
    ));
  }
  function Oa(l) {
    function t(i) {
      return Yn(i, l);
    }
    gu !== null && Yn(gu, l), Su !== null && Yn(Su, l), bu !== null && Yn(bu, l), Se.forEach(t), be.forEach(t);
    for (var u = 0; u < ru.length; u++) {
      var a = ru[u];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < ru.length && (u = ru[0], u.blockedOn === null); )
      sv(u), u.blockedOn === null && ru.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (a = 0; a < u.length; a += 3) {
        var e = u[a], n = u[a + 1], c = e[Jl] || null;
        if (typeof n == "function")
          c || vv(u);
        else if (c) {
          var f = null;
          if (n && n.hasAttribute("formAction")) {
            if (e = n, c = n[Jl] || null)
              f = c.formAction;
            else if (ai(e) !== null) continue;
          } else f = c.action;
          typeof f == "function" ? u[a + 1] = f : (u.splice(a, 3), a -= 3), vv(u);
        }
      }
  }
  function dv() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(c) {
            return e = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      e !== null && (e(), e = null), a || setTimeout(u, 20);
    }
    function u() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, e = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(u, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), e !== null && (e(), e = null);
      };
    }
  }
  function ni(l) {
    this._internalRoot = l;
  }
  Qn.prototype.render = ni.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(m(409));
    var u = t.current, a = st();
    av(u, a, l, t, null, null);
  }, Qn.prototype.unmount = ni.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      av(l.current, 2, null, l, null, null), rn(), t[Vu] = null;
    }
  };
  function Qn(l) {
    this._internalRoot = l;
  }
  Qn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Ei();
      l = { blockedOn: null, target: l, priority: t };
      for (var u = 0; u < ru.length && t !== 0 && t < ru[u].priority; u++) ;
      ru.splice(u, 0, l), u === 0 && sv(l);
    }
  };
  var ov = d.version;
  if (ov !== "19.2.4")
    throw Error(
      m(
        527,
        ov,
        "19.2.4"
      )
    );
  O.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(m(188)) : (l = Object.keys(l).join(","), Error(m(268, l)));
    return l = A(t), l = l !== null ? W(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Jo = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: r,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xn.isDisabled && Xn.supportsFiber)
      try {
        Ua = Xn.inject(
          Jo
        ), tt = Xn;
      } catch {
      }
  }
  return Te.createRoot = function(l, t) {
    if (!$(l)) throw Error(m(299));
    var u = !1, a = "", e = z0, n = T0, c = E0;
    return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = tv(
      l,
      1,
      !1,
      null,
      null,
      u,
      a,
      null,
      e,
      n,
      c,
      dv
    ), l[Vu] = t.current, Xf(l), new ni(t);
  }, Te.hydrateRoot = function(l, t, u) {
    if (!$(l)) throw Error(m(299));
    var a = !1, e = "", n = z0, c = T0, f = E0, i = null;
    return u != null && (u.unstable_strictMode === !0 && (a = !0), u.identifierPrefix !== void 0 && (e = u.identifierPrefix), u.onUncaughtError !== void 0 && (n = u.onUncaughtError), u.onCaughtError !== void 0 && (c = u.onCaughtError), u.onRecoverableError !== void 0 && (f = u.onRecoverableError), u.formState !== void 0 && (i = u.formState)), t = tv(
      l,
      1,
      !0,
      t,
      u ?? null,
      a,
      e,
      i,
      n,
      c,
      f,
      dv
    ), t.context = uv(null), u = t.current, a = st(), a = Wn(a), e = eu(a), e.callback = null, nu(u, e, a), u = a, t.current.lanes = u, Ha(t, u), Ht(t), l[Vu] = t.current, Xf(l), new Qn(t);
  }, Te.version = "19.2.4", Te;
}
var Av;
function eh() {
  if (Av) return fi.exports;
  Av = 1;
  function _() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_);
      } catch (d) {
        console.error(d);
      }
  }
  return _(), fi.exports = ah(), fi.exports;
}
var nh = eh(), Pl = di();
class ch {
  constructor(d) {
    xu(this, "baseUrl");
    xu(this, "clientId");
    xu(this, "clientSecret");
    xu(this, "moderatorId");
    xu(this, "accessToken", null);
    xu(this, "tokenExpiresAt", 0);
    this.baseUrl = d.baseUrl.replace(/\/$/, ""), this.clientId = d.clientId, this.clientSecret = d.clientSecret, this.moderatorId = d.moderatorId;
  }
  // ─── Authentication ─────────────────────────────────────────────────────────
  /**
   * Fetches a new OAuth2 bearer token using client credentials flow.
   * POST /oauth2/token
   */
  async authenticate() {
    const d = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret
    }), M = await fetch(`${this.baseUrl}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: d.toString()
    });
    if (!M.ok)
      throw new Error(`Authentication failed: ${M.status} ${M.statusText}`);
    const m = await M.json();
    return this.accessToken = m.access_token, this.tokenExpiresAt = Date.now() + m.expires_in * 1e3 - 6e4, m;
  }
  /** Returns a valid bearer token, re-authenticating if expired. */
  async getToken() {
    return (!this.accessToken || Date.now() >= this.tokenExpiresAt) && await this.authenticate(), this.accessToken;
  }
  // ─── Core Request Helper ────────────────────────────────────────────────────
  async request(d, M = {}, m) {
    const $ = await this.getToken(), al = new URL(`${this.baseUrl}${d}`);
    if (m)
      for (const [yl, N] of Object.entries(m))
        N !== void 0 && al.searchParams.set(yl, String(N));
    this.moderatorId && al.searchParams.set("moderatorId", this.moderatorId);
    const I = await fetch(al.toString(), {
      ...M,
      headers: {
        Authorization: `Bearer ${$}`,
        "Content-Type": "application/json",
        ...M.headers ?? {}
      }
    });
    if (!I.ok) {
      const yl = await I.text().catch(() => "");
      throw new Error(`API error ${I.status} on ${d}: ${yl}`);
    }
    return I.json();
  }
  // ─── Conversations ──────────────────────────────────────────────────────────
  /**
   * List conversations (community discussions).
   * GET /v2/conversations
   */
  async getConversations(d) {
    return this.request("/v2/conversations", {}, {
      page: d == null ? void 0 : d.page,
      pageSize: d == null ? void 0 : d.pageSize,
      categoryId: d == null ? void 0 : d.categoryId,
      tag: d == null ? void 0 : d.tag,
      authorId: d == null ? void 0 : d.authorId
    });
  }
  /**
   * Get a single conversation by its private ID.
   * GET /v2/conversations/{id}
   */
  async getConversation(d) {
    return this.request(`/v2/conversations/${d}`);
  }
  /**
   * Get replies for a conversation.
   * GET /v2/conversations/{id}/replies
   */
  async getConversationReplies(d, M) {
    return this.request(`/v2/conversations/${d}/replies`, {}, {
      page: M == null ? void 0 : M.page,
      pageSize: M == null ? void 0 : M.pageSize
    });
  }
  // ─── Articles ───────────────────────────────────────────────────────────────
  /**
   * List articles.
   * GET /v2/articles
   */
  async getArticles(d) {
    return this.request("/v2/articles", {}, {
      page: d == null ? void 0 : d.page,
      pageSize: d == null ? void 0 : d.pageSize,
      categoryId: d == null ? void 0 : d.categoryId,
      tag: d == null ? void 0 : d.tag,
      authorId: d == null ? void 0 : d.authorId
    });
  }
  /**
   * Get a single article by its private ID.
   * GET /v2/articles/{id}
   */
  async getArticle(d) {
    return this.request(`/v2/articles/${d}`);
  }
  /**
   * Get replies for an article.
   * GET /v2/articles/{id}/replies
   */
  async getArticleReplies(d, M) {
    return this.request(`/v2/articles/${d}/replies`, {}, {
      page: M == null ? void 0 : M.page,
      pageSize: M == null ? void 0 : M.pageSize
    });
  }
  // ─── Questions ──────────────────────────────────────────────────────────────
  /**
   * List questions.
   * GET /v2/questions
   */
  async getQuestions(d) {
    return this.request("/v2/questions", {}, {
      page: d == null ? void 0 : d.page,
      pageSize: d == null ? void 0 : d.pageSize,
      categoryId: d == null ? void 0 : d.categoryId,
      tag: d == null ? void 0 : d.tag,
      authorId: d == null ? void 0 : d.authorId
    });
  }
  /**
   * Get a single question by its private ID.
   * GET /v2/questions/{id}
   */
  async getQuestion(d) {
    return this.request(`/v2/questions/${d}`);
  }
  /**
   * Get replies for a question.
   * GET /v2/questions/{id}/replies
   */
  async getQuestionReplies(d, M) {
    return this.request(`/v2/questions/${d}/replies`, {}, {
      page: M == null ? void 0 : M.page,
      pageSize: M == null ? void 0 : M.pageSize
    });
  }
  // ─── Ideas ──────────────────────────────────────────────────────────────────
  /**
   * List ideas.
   * GET /v2/ideas
   */
  async getIdeas(d) {
    return this.request("/v2/ideas", {}, {
      page: d == null ? void 0 : d.page,
      pageSize: d == null ? void 0 : d.pageSize,
      categoryId: d == null ? void 0 : d.categoryId,
      tag: d == null ? void 0 : d.tag,
      authorId: d == null ? void 0 : d.authorId
    });
  }
  /**
   * Get a single idea by its private ID.
   * GET /v2/ideas/{id}
   */
  async getIdea(d) {
    return this.request(`/v2/ideas/${d}`);
  }
  /**
   * Get replies for an idea.
   * GET /v2/ideas/{id}/replies
   */
  async getIdeaReplies(d, M) {
    return this.request(`/v2/ideas/${d}/replies`, {}, {
      page: M == null ? void 0 : M.page,
      pageSize: M == null ? void 0 : M.pageSize
    });
  }
  // ─── Users ──────────────────────────────────────────────────────────────────
  /**
   * Get a user profile by ID.
   * GET /v2/users/{id}
   */
  async getUser(d) {
    return this.request(`/v2/users/${d}`);
  }
  /**
   * List users.
   * GET /v2/users
   */
  async getUsers(d) {
    return this.request("/v2/users", {}, {
      page: d == null ? void 0 : d.page,
      pageSize: d == null ? void 0 : d.pageSize
    });
  }
  // ─── Spaces / Categories ────────────────────────────────────────────────────
  /**
   * List all spaces (top-level community spaces).
   * GET /v2/spaces
   */
  async getSpaces() {
    return this.request("/v2/spaces");
  }
  /**
   * Get a single space by ID.
   * GET /v2/spaces/{id}
   */
  async getSpace(d) {
    return this.request(`/v2/spaces/${d}`);
  }
  /**
   * List all categories.
   * GET /v2/categories
   */
  async getCategories() {
    return this.request("/v2/categories");
  }
  /**
   * Get a single category by ID.
   * GET /v2/categories/{id}
   */
  async getCategory(d) {
    return this.request(`/v2/categories/${d}`);
  }
  // ─── Webhooks ───────────────────────────────────────────────────────────────
  /**
   * Subscribe to a webhook event.
   * POST /webhooks/{eventName}/subscriptions
   *
   * Available eventNames include:
   *   article.Created, article.Published, article.Updated, article.Deleted
   *   conversation.Created, conversation.Updated, conversation.Deleted
   *   question.Asked, question.Answered, question.Updated, question.Deleted
   *   idea.Created, idea.Updated, idea.Deleted
   *   user.Created, user.Updated, user.Deleted
   *   group.Created, group.Updated, group.Deleted
   */
  async subscribeToWebhook(d, M) {
    return this.request(
      `/webhooks/${encodeURIComponent(d)}/subscriptions`,
      {
        method: "POST",
        body: JSON.stringify(M)
      }
    );
  }
  /**
   * List subscriptions for a webhook event.
   * GET /webhooks/{eventName}/subscriptions
   */
  async getWebhookSubscriptions(d) {
    return this.request(
      `/webhooks/${encodeURIComponent(d)}/subscriptions`
    );
  }
  /**
   * Delete a webhook subscription.
   * DELETE /webhooks/{eventName}/subscriptions/{subscriptionId}
   */
  async deleteWebhookSubscription(d, M) {
    await this.request(
      `/webhooks/${encodeURIComponent(d)}/subscriptions/${M}`,
      { method: "DELETE" }
    );
  }
  // ─── Utility ─────────────────────────────────────────────────────────────────
  /**
   * Set a moderator ID to include on all subsequent requests.
   * This allows performing actions as a specific moderator user.
   */
  setModeratorId(d) {
    this.moderatorId = d;
  }
  /** Clear the cached access token, forcing re-authentication on the next call. */
  clearToken() {
    this.accessToken = null, this.tokenExpiresAt = 0;
  }
}
function fh(_) {
  const d = Date.now() - new Date(_).getTime(), M = Math.floor(d / 6e4);
  if (M < 1) return "just now";
  if (M < 60) return `${M}m ago`;
  const m = Math.floor(M / 60);
  if (m < 24) return `${m}h ago`;
  const $ = Math.floor(m / 24);
  return $ < 30 ? `${$}d ago` : new Date(_).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function ih(_) {
  return _.split(/[\s._-]+/).slice(0, 2).map((d) => {
    var M;
    return ((M = d[0]) == null ? void 0 : M.toUpperCase()) ?? "";
  }).join("");
}
function sh(_) {
  let d = 0;
  for (let M = 0; M < _.length; M++) d = _.charCodeAt(M) + ((d << 5) - d);
  return Math.abs(d) % 360;
}
function yh() {
  return /* @__PURE__ */ j.jsxs("li", { className: "ml-card ml-card--skeleton", "aria-hidden": "true", children: [
    /* @__PURE__ */ j.jsx("div", { className: "ml-card__avatar ml-skeleton" }),
    /* @__PURE__ */ j.jsxs("div", { className: "ml-card__body", children: [
      /* @__PURE__ */ j.jsx("div", { className: "ml-skeleton ml-skeleton--title" }),
      /* @__PURE__ */ j.jsx("div", { className: "ml-skeleton ml-skeleton--meta" })
    ] })
  ] });
}
function vh({ item: _ }) {
  var M;
  const d = sh(_.author.username);
  return /* @__PURE__ */ j.jsxs("li", { className: "ml-card", children: [
    _.author.avatar ? /* @__PURE__ */ j.jsx(
      "img",
      {
        className: "ml-card__avatar",
        src: _.author.avatar,
        alt: _.author.username,
        loading: "lazy"
      }
    ) : /* @__PURE__ */ j.jsx(
      "div",
      {
        className: "ml-card__avatar ml-card__avatar--initials",
        style: { background: `hsl(${d},55%,48%)` },
        "aria-label": _.author.username,
        children: ih(_.author.username)
      }
    ),
    /* @__PURE__ */ j.jsxs("div", { className: "ml-card__body", children: [
      /* @__PURE__ */ j.jsx("p", { className: "ml-card__title", children: _.title }),
      /* @__PURE__ */ j.jsxs("div", { className: "ml-card__meta", children: [
        /* @__PURE__ */ j.jsx("span", { className: "ml-card__author", children: _.author.username }),
        /* @__PURE__ */ j.jsx("span", { className: "ml-card__dot", "aria-hidden": "true", children: "·" }),
        /* @__PURE__ */ j.jsx(
          "time",
          {
            className: "ml-card__time",
            dateTime: _.updatedAt,
            title: new Date(_.updatedAt).toLocaleString(),
            children: fh(_.updatedAt)
          }
        ),
        ((M = _.category) == null ? void 0 : M.name) && /* @__PURE__ */ j.jsxs(j.Fragment, { children: [
          /* @__PURE__ */ j.jsx("span", { className: "ml-card__dot", "aria-hidden": "true", children: "·" }),
          /* @__PURE__ */ j.jsx("span", { className: "ml-card__tag", children: _.category.name })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ j.jsxs("div", { className: "ml-card__stats", children: [
      /* @__PURE__ */ j.jsxs("span", { className: "ml-card__stat", title: "Replies", children: [
        /* @__PURE__ */ j.jsx("svg", { width: "13", height: "13", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ j.jsx("path", { d: "M2 2h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 3V3a1 1 0 0 1 1-1z" }) }),
        _.replyCount
      ] }),
      _.viewCount > 0 && /* @__PURE__ */ j.jsxs("span", { className: "ml-card__stat", title: "Views", children: [
        /* @__PURE__ */ j.jsx("svg", { width: "13", height: "13", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ j.jsx("path", { d: "M8 3C4 3 1 8 1 8s3 5 7 5 7-5 7-5-3-5-7-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" }) }),
        _.viewCount
      ] })
    ] })
  ] });
}
function dh({ api: _, pageSize: d = 8, categoryId: M, title: m }) {
  const [$, al] = Pl.useState([]), [I, yl] = Pl.useState(!0), [N, A] = Pl.useState(null), [W, p] = Pl.useState(1), [vl, Gl] = Pl.useState(!1), [Hl, Rl] = Pl.useState(0), Zl = Pl.useCallback(
    async (Tl, Vl = !1) => {
      yl(!0), A(null);
      try {
        const ml = await _.getConversations({
          page: Tl,
          pageSize: d,
          categoryId: M
        });
        al((x) => Vl ? [...x, ...ml.data] : ml.data), Rl(ml.total), Gl(Tl * d < ml.total), p(Tl);
      } catch (ml) {
        A(ml instanceof Error ? ml.message : "Failed to load conversations.");
      } finally {
        yl(!1);
      }
    },
    [_, d, M]
  );
  Pl.useEffect(() => {
    Zl(1);
  }, [Zl]);
  const Ql = () => Zl(W + 1, !0), _t = () => Zl(1), Dl = Math.min(d, 5);
  return /* @__PURE__ */ j.jsxs("div", { className: "ml-root", children: [
    /* @__PURE__ */ j.jsxs("div", { className: "ml-header", children: [
      /* @__PURE__ */ j.jsx("span", { className: "ml-header__title", children: m ?? "Recent Conversations" }),
      Hl > 0 && !I && /* @__PURE__ */ j.jsx("span", { className: "ml-header__count", children: Hl.toLocaleString() })
    ] }),
    N && /* @__PURE__ */ j.jsxs("div", { className: "ml-error", role: "alert", children: [
      /* @__PURE__ */ j.jsx("span", { children: N }),
      /* @__PURE__ */ j.jsx("button", { className: "ml-btn ml-btn--ghost", onClick: _t, children: "Retry" })
    ] }),
    /* @__PURE__ */ j.jsx("ul", { className: "ml-list", role: "list", children: I && $.length === 0 ? Array.from({ length: Dl }, (Tl, Vl) => /* @__PURE__ */ j.jsx(yh, {}, Vl)) : $.map((Tl) => /* @__PURE__ */ j.jsx(vh, { item: Tl }, Tl.id)) }),
    !I && !N && $.length === 0 && /* @__PURE__ */ j.jsxs("div", { className: "ml-empty", children: [
      /* @__PURE__ */ j.jsx("svg", { width: "40", height: "40", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": "true", children: /* @__PURE__ */ j.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
      /* @__PURE__ */ j.jsx("p", { children: "No conversations yet." })
    ] }),
    vl && !N && /* @__PURE__ */ j.jsx("div", { className: "ml-footer", children: /* @__PURE__ */ j.jsx(
      "button",
      {
        className: "ml-btn ml-btn--primary",
        onClick: Ql,
        disabled: I,
        children: I ? /* @__PURE__ */ j.jsx("span", { className: "ml-spinner", "aria-hidden": "true" }) : "Load more"
      }
    ) })
  ] });
}
function oh({ sdk: _ }) {
  const [d, M] = Pl.useState(_.getProps()), [m, $] = Pl.useState(!1), [al, I] = Pl.useState(null), yl = Pl.useMemo(
    () => new ch({
      baseUrl: "https://api2-us-west-2.insided.com/",
      clientId: "ce9f904c-02bf-41a4-8706-19c24b9752d8",
      clientSecret: "61e3aed3d08d50709faa9e11da4856a8ac6d33b41d2a65af16c90c93d4b11f55"
    }),
    []
  );
  Pl.useEffect(() => _.on("propsChanged", M), [_]), Pl.useEffect(() => {
    $(!1), I(null), yl.authenticate().then(() => $(!0)).catch((A) => {
      console.error("Gainsight Community API auth failed:", A), I(A instanceof Error ? A.message : "Authentication failed.");
    });
  }, [yl]);
  const N = () => {
    const A = prompt("Enter new title:", d.title), W = prompt("Enter new description:", d.description);
    M({ title: A, description: W });
  };
  return /* @__PURE__ */ j.jsxs("section", { className: "react-widget-section", children: [
    /* @__PURE__ */ j.jsx("h3", { className: "react-widget-title", children: d.title }),
    d.description && /* @__PURE__ */ j.jsx("p", { className: "react-widget-description", children: d.description }),
    /* @__PURE__ */ j.jsx("button", { onClick: N, children: "Update Props" }),
    al ? /* @__PURE__ */ j.jsxs("p", { style: { marginTop: "1rem", fontSize: "0.875rem", opacity: 0.9 }, children: [
      "⚠️ ",
      al
    ] }) : m ? /* @__PURE__ */ j.jsx(
      dh,
      {
        api: yl,
        pageSize: 8,
        title: d.title
      }
    ) : /* @__PURE__ */ j.jsx("p", { style: { marginTop: "1rem", fontSize: "0.875rem", opacity: 0.75 }, children: "Connecting…" })
  ] });
}
async function mh(_) {
  await _.whenReady();
  const d = nh.createRoot(_.getContainer());
  d.render(/* @__PURE__ */ j.jsx(oh, { sdk: _ })), _.on("destroy", () => d.unmount());
}
export {
  mh as init
};
