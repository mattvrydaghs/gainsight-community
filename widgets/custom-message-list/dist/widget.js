var wh = Object.defineProperty;
var Wh = (r, g, O) => g in r ? wh(r, g, { enumerable: !0, configurable: !0, writable: !0, value: O }) : r[g] = O;
var Xu = (r, g, O) => Wh(r, typeof g != "symbol" ? g + "" : g, O);
var fi = { exports: {} }, ze = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var os;
function $h() {
  if (os) return ze;
  os = 1;
  var r = Symbol.for("react.transitional.element"), g = Symbol.for("react.fragment");
  function O(m, cl, fl) {
    var vl = null;
    if (fl !== void 0 && (vl = "" + fl), cl.key !== void 0 && (vl = "" + cl.key), "key" in cl) {
      fl = {};
      for (var hl in cl)
        hl !== "key" && (fl[hl] = cl[hl]);
    } else fl = cl;
    return cl = fl.ref, {
      $$typeof: r,
      type: m,
      key: vl,
      ref: cl !== void 0 ? cl : null,
      props: fl
    };
  }
  return ze.Fragment = g, ze.jsx = O, ze.jsxs = O, ze;
}
var ms;
function Fh() {
  return ms || (ms = 1, fi.exports = $h()), fi.exports;
}
var ju = Fh(), ci = { exports: {} }, Te = {}, ii = { exports: {} }, yi = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gs;
function kh() {
  return gs || (gs = 1, (function(r) {
    function g(z, M) {
      var B = z.length;
      z.push(M);
      l: for (; 0 < B; ) {
        var ll = B - 1 >>> 1, el = z[ll];
        if (0 < cl(el, M))
          z[ll] = M, z[B] = el, B = ll;
        else break l;
      }
    }
    function O(z) {
      return z.length === 0 ? null : z[0];
    }
    function m(z) {
      if (z.length === 0) return null;
      var M = z[0], B = z.pop();
      if (B !== M) {
        z[0] = B;
        l: for (var ll = 0, el = z.length, v = el >>> 1; ll < v; ) {
          var A = 2 * (ll + 1) - 1, D = z[A], H = A + 1, G = z[H];
          if (0 > cl(D, B))
            H < el && 0 > cl(G, D) ? (z[ll] = G, z[H] = B, ll = H) : (z[ll] = D, z[A] = B, ll = A);
          else if (H < el && 0 > cl(G, B))
            z[ll] = G, z[H] = B, ll = H;
          else break l;
        }
      }
      return M;
    }
    function cl(z, M) {
      var B = z.sortIndex - M.sortIndex;
      return B !== 0 ? B : z.id - M.id;
    }
    if (r.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var fl = performance;
      r.unstable_now = function() {
        return fl.now();
      };
    } else {
      var vl = Date, hl = vl.now();
      r.unstable_now = function() {
        return vl.now() - hl;
      };
    }
    var q = [], _ = [], F = 1, Y = null, sl = 3, wl = !1, pl = !1, Cl = !1, Dt = !1, Wl = typeof setTimeout == "function" ? setTimeout : null, wt = typeof clearTimeout == "function" ? clearTimeout : null, ql = typeof setImmediate < "u" ? setImmediate : null;
    function nt(z) {
      for (var M = O(_); M !== null; ) {
        if (M.callback === null) m(_);
        else if (M.startTime <= z)
          m(_), M.sortIndex = M.expirationTime, g(q, M);
        else break;
        M = O(_);
      }
    }
    function Tt(z) {
      if (Cl = !1, nt(z), !pl)
        if (O(q) !== null)
          pl = !0, Gl || (Gl = !0, Xl());
        else {
          var M = O(_);
          M !== null && gt(Tt, M.startTime - z);
        }
    }
    var Gl = !1, K = -1, Ql = 5, Et = -1;
    function Zu() {
      return Dt ? !0 : !(r.unstable_now() - Et < Ql);
    }
    function At() {
      if (Dt = !1, Gl) {
        var z = r.unstable_now();
        Et = z;
        var M = !0;
        try {
          l: {
            pl = !1, Cl && (Cl = !1, wt(K), K = -1), wl = !0;
            var B = sl;
            try {
              t: {
                for (nt(z), Y = O(q); Y !== null && !(Y.expirationTime > z && Zu()); ) {
                  var ll = Y.callback;
                  if (typeof ll == "function") {
                    Y.callback = null, sl = Y.priorityLevel;
                    var el = ll(
                      Y.expirationTime <= z
                    );
                    if (z = r.unstable_now(), typeof el == "function") {
                      Y.callback = el, nt(z), M = !0;
                      break t;
                    }
                    Y === O(q) && m(q), nt(z);
                  } else m(q);
                  Y = O(q);
                }
                if (Y !== null) M = !0;
                else {
                  var v = O(_);
                  v !== null && gt(
                    Tt,
                    v.startTime - z
                  ), M = !1;
                }
              }
              break l;
            } finally {
              Y = null, sl = B, wl = !1;
            }
            M = void 0;
          }
        } finally {
          M ? Xl() : Gl = !1;
        }
      }
    }
    var Xl;
    if (typeof ql == "function")
      Xl = function() {
        ql(At);
      };
    else if (typeof MessageChannel < "u") {
      var zu = new MessageChannel(), Ut = zu.port2;
      zu.port1.onmessage = At, Xl = function() {
        Ut.postMessage(null);
      };
    } else
      Xl = function() {
        Wl(At, 0);
      };
    function gt(z, M) {
      K = Wl(function() {
        z(r.unstable_now());
      }, M);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, r.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Ql = 0 < z ? Math.floor(1e3 / z) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return sl;
    }, r.unstable_next = function(z) {
      switch (sl) {
        case 1:
        case 2:
        case 3:
          var M = 3;
          break;
        default:
          M = sl;
      }
      var B = sl;
      sl = M;
      try {
        return z();
      } finally {
        sl = B;
      }
    }, r.unstable_requestPaint = function() {
      Dt = !0;
    }, r.unstable_runWithPriority = function(z, M) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var B = sl;
      sl = z;
      try {
        return M();
      } finally {
        sl = B;
      }
    }, r.unstable_scheduleCallback = function(z, M, B) {
      var ll = r.unstable_now();
      switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? ll + B : ll) : B = ll, z) {
        case 1:
          var el = -1;
          break;
        case 2:
          el = 250;
          break;
        case 5:
          el = 1073741823;
          break;
        case 4:
          el = 1e4;
          break;
        default:
          el = 5e3;
      }
      return el = B + el, z = {
        id: F++,
        callback: M,
        priorityLevel: z,
        startTime: B,
        expirationTime: el,
        sortIndex: -1
      }, B > ll ? (z.sortIndex = B, g(_, z), O(q) === null && z === O(_) && (Cl ? (wt(K), K = -1) : Cl = !0, gt(Tt, B - ll))) : (z.sortIndex = el, g(q, z), pl || wl || (pl = !0, Gl || (Gl = !0, Xl()))), z;
    }, r.unstable_shouldYield = Zu, r.unstable_wrapCallback = function(z) {
      var M = sl;
      return function() {
        var B = sl;
        sl = M;
        try {
          return z.apply(this, arguments);
        } finally {
          sl = B;
        }
      };
    };
  })(yi)), yi;
}
var Ss;
function Ih() {
  return Ss || (Ss = 1, ii.exports = kh()), ii.exports;
}
var vi = { exports: {} }, p = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bs;
function Ph() {
  if (bs) return p;
  bs = 1;
  var r = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), O = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), cl = Symbol.for("react.profiler"), fl = Symbol.for("react.consumer"), vl = Symbol.for("react.context"), hl = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), _ = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), Y = Symbol.for("react.activity"), sl = Symbol.iterator;
  function wl(v) {
    return v === null || typeof v != "object" ? null : (v = sl && v[sl] || v["@@iterator"], typeof v == "function" ? v : null);
  }
  var pl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Cl = Object.assign, Dt = {};
  function Wl(v, A, D) {
    this.props = v, this.context = A, this.refs = Dt, this.updater = D || pl;
  }
  Wl.prototype.isReactComponent = {}, Wl.prototype.setState = function(v, A) {
    if (typeof v != "object" && typeof v != "function" && v != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, v, A, "setState");
  }, Wl.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function wt() {
  }
  wt.prototype = Wl.prototype;
  function ql(v, A, D) {
    this.props = v, this.context = A, this.refs = Dt, this.updater = D || pl;
  }
  var nt = ql.prototype = new wt();
  nt.constructor = ql, Cl(nt, Wl.prototype), nt.isPureReactComponent = !0;
  var Tt = Array.isArray;
  function Gl() {
  }
  var K = { H: null, A: null, T: null, S: null }, Ql = Object.prototype.hasOwnProperty;
  function Et(v, A, D) {
    var H = D.ref;
    return {
      $$typeof: r,
      type: v,
      key: A,
      ref: H !== void 0 ? H : null,
      props: D
    };
  }
  function Zu(v, A) {
    return Et(v.type, A, v.props);
  }
  function At(v) {
    return typeof v == "object" && v !== null && v.$$typeof === r;
  }
  function Xl(v) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + v.replace(/[=:]/g, function(D) {
      return A[D];
    });
  }
  var zu = /\/+/g;
  function Ut(v, A) {
    return typeof v == "object" && v !== null && v.key != null ? Xl("" + v.key) : A.toString(36);
  }
  function gt(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(Gl, Gl) : (v.status = "pending", v.then(
          function(A) {
            v.status === "pending" && (v.status = "fulfilled", v.value = A);
          },
          function(A) {
            v.status === "pending" && (v.status = "rejected", v.reason = A);
          }
        )), v.status) {
          case "fulfilled":
            return v.value;
          case "rejected":
            throw v.reason;
        }
    }
    throw v;
  }
  function z(v, A, D, H, G) {
    var j = typeof v;
    (j === "undefined" || j === "boolean") && (v = null);
    var k = !1;
    if (v === null) k = !0;
    else
      switch (j) {
        case "bigint":
        case "string":
        case "number":
          k = !0;
          break;
        case "object":
          switch (v.$$typeof) {
            case r:
            case g:
              k = !0;
              break;
            case F:
              return k = v._init, z(
                k(v._payload),
                A,
                D,
                H,
                G
              );
          }
      }
    if (k)
      return G = G(v), k = H === "" ? "." + Ut(v, 0) : H, Tt(G) ? (D = "", k != null && (D = k.replace(zu, "$&/") + "/"), z(G, A, D, "", function(ra) {
        return ra;
      })) : G != null && (At(G) && (G = Zu(
        G,
        D + (G.key == null || v && v.key === G.key ? "" : ("" + G.key).replace(
          zu,
          "$&/"
        ) + "/") + k
      )), A.push(G)), 1;
    k = 0;
    var Yl = H === "" ? "." : H + ":";
    if (Tt(v))
      for (var gl = 0; gl < v.length; gl++)
        H = v[gl], j = Yl + Ut(H, gl), k += z(
          H,
          A,
          D,
          j,
          G
        );
    else if (gl = wl(v), typeof gl == "function")
      for (v = gl.call(v), gl = 0; !(H = v.next()).done; )
        H = H.value, j = Yl + Ut(H, gl++), k += z(
          H,
          A,
          D,
          j,
          G
        );
    else if (j === "object") {
      if (typeof v.then == "function")
        return z(
          gt(v),
          A,
          D,
          H,
          G
        );
      throw A = String(v), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return k;
  }
  function M(v, A, D) {
    if (v == null) return v;
    var H = [], G = 0;
    return z(v, H, "", "", function(j) {
      return A.call(D, j, G++);
    }), H;
  }
  function B(v) {
    if (v._status === -1) {
      var A = v._result;
      A = A(), A.then(
        function(D) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = D);
        },
        function(D) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = D);
        }
      ), v._status === -1 && (v._status = 0, v._result = A);
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var ll = typeof reportError == "function" ? reportError : function(v) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
        error: v
      });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", v);
      return;
    }
    console.error(v);
  }, el = {
    map: M,
    forEach: function(v, A, D) {
      M(
        v,
        function() {
          A.apply(this, arguments);
        },
        D
      );
    },
    count: function(v) {
      var A = 0;
      return M(v, function() {
        A++;
      }), A;
    },
    toArray: function(v) {
      return M(v, function(A) {
        return A;
      }) || [];
    },
    only: function(v) {
      if (!At(v))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return v;
    }
  };
  return p.Activity = Y, p.Children = el, p.Component = Wl, p.Fragment = O, p.Profiler = cl, p.PureComponent = ql, p.StrictMode = m, p.Suspense = q, p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K, p.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return K.H.useMemoCache(v);
    }
  }, p.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, p.cacheSignal = function() {
    return null;
  }, p.cloneElement = function(v, A, D) {
    if (v == null)
      throw Error(
        "The argument must be a React element, but you passed " + v + "."
      );
    var H = Cl({}, v.props), G = v.key;
    if (A != null)
      for (j in A.key !== void 0 && (G = "" + A.key), A)
        !Ql.call(A, j) || j === "key" || j === "__self" || j === "__source" || j === "ref" && A.ref === void 0 || (H[j] = A[j]);
    var j = arguments.length - 2;
    if (j === 1) H.children = D;
    else if (1 < j) {
      for (var k = Array(j), Yl = 0; Yl < j; Yl++)
        k[Yl] = arguments[Yl + 2];
      H.children = k;
    }
    return Et(v.type, G, H);
  }, p.createContext = function(v) {
    return v = {
      $$typeof: vl,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: fl,
      _context: v
    }, v;
  }, p.createElement = function(v, A, D) {
    var H, G = {}, j = null;
    if (A != null)
      for (H in A.key !== void 0 && (j = "" + A.key), A)
        Ql.call(A, H) && H !== "key" && H !== "__self" && H !== "__source" && (G[H] = A[H]);
    var k = arguments.length - 2;
    if (k === 1) G.children = D;
    else if (1 < k) {
      for (var Yl = Array(k), gl = 0; gl < k; gl++)
        Yl[gl] = arguments[gl + 2];
      G.children = Yl;
    }
    if (v && v.defaultProps)
      for (H in k = v.defaultProps, k)
        G[H] === void 0 && (G[H] = k[H]);
    return Et(v, j, G);
  }, p.createRef = function() {
    return { current: null };
  }, p.forwardRef = function(v) {
    return { $$typeof: hl, render: v };
  }, p.isValidElement = At, p.lazy = function(v) {
    return {
      $$typeof: F,
      _payload: { _status: -1, _result: v },
      _init: B
    };
  }, p.memo = function(v, A) {
    return {
      $$typeof: _,
      type: v,
      compare: A === void 0 ? null : A
    };
  }, p.startTransition = function(v) {
    var A = K.T, D = {};
    K.T = D;
    try {
      var H = v(), G = K.S;
      G !== null && G(D, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(Gl, ll);
    } catch (j) {
      ll(j);
    } finally {
      A !== null && D.types !== null && (A.types = D.types), K.T = A;
    }
  }, p.unstable_useCacheRefresh = function() {
    return K.H.useCacheRefresh();
  }, p.use = function(v) {
    return K.H.use(v);
  }, p.useActionState = function(v, A, D) {
    return K.H.useActionState(v, A, D);
  }, p.useCallback = function(v, A) {
    return K.H.useCallback(v, A);
  }, p.useContext = function(v) {
    return K.H.useContext(v);
  }, p.useDebugValue = function() {
  }, p.useDeferredValue = function(v, A) {
    return K.H.useDeferredValue(v, A);
  }, p.useEffect = function(v, A) {
    return K.H.useEffect(v, A);
  }, p.useEffectEvent = function(v) {
    return K.H.useEffectEvent(v);
  }, p.useId = function() {
    return K.H.useId();
  }, p.useImperativeHandle = function(v, A, D) {
    return K.H.useImperativeHandle(v, A, D);
  }, p.useInsertionEffect = function(v, A) {
    return K.H.useInsertionEffect(v, A);
  }, p.useLayoutEffect = function(v, A) {
    return K.H.useLayoutEffect(v, A);
  }, p.useMemo = function(v, A) {
    return K.H.useMemo(v, A);
  }, p.useOptimistic = function(v, A) {
    return K.H.useOptimistic(v, A);
  }, p.useReducer = function(v, A, D) {
    return K.H.useReducer(v, A, D);
  }, p.useRef = function(v) {
    return K.H.useRef(v);
  }, p.useState = function(v) {
    return K.H.useState(v);
  }, p.useSyncExternalStore = function(v, A, D) {
    return K.H.useSyncExternalStore(
      v,
      A,
      D
    );
  }, p.useTransition = function() {
    return K.H.useTransition();
  }, p.version = "19.2.4", p;
}
var zs;
function di() {
  return zs || (zs = 1, vi.exports = Ph()), vi.exports;
}
var si = { exports: {} }, Rl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ts;
function l1() {
  if (Ts) return Rl;
  Ts = 1;
  var r = di();
  function g(q) {
    var _ = "https://react.dev/errors/" + q;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var F = 2; F < arguments.length; F++)
        _ += "&args[]=" + encodeURIComponent(arguments[F]);
    }
    return "Minified React error #" + q + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function O() {
  }
  var m = {
    d: {
      f: O,
      r: function() {
        throw Error(g(522));
      },
      D: O,
      C: O,
      L: O,
      m: O,
      X: O,
      S: O,
      M: O
    },
    p: 0,
    findDOMNode: null
  }, cl = Symbol.for("react.portal");
  function fl(q, _, F) {
    var Y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: cl,
      key: Y == null ? null : "" + Y,
      children: q,
      containerInfo: _,
      implementation: F
    };
  }
  var vl = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function hl(q, _) {
    if (q === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return Rl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = m, Rl.createPortal = function(q, _) {
    var F = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(g(299));
    return fl(q, _, null, F);
  }, Rl.flushSync = function(q) {
    var _ = vl.T, F = m.p;
    try {
      if (vl.T = null, m.p = 2, q) return q();
    } finally {
      vl.T = _, m.p = F, m.d.f();
    }
  }, Rl.preconnect = function(q, _) {
    typeof q == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, m.d.C(q, _));
  }, Rl.prefetchDNS = function(q) {
    typeof q == "string" && m.d.D(q);
  }, Rl.preinit = function(q, _) {
    if (typeof q == "string" && _ && typeof _.as == "string") {
      var F = _.as, Y = hl(F, _.crossOrigin), sl = typeof _.integrity == "string" ? _.integrity : void 0, wl = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      F === "style" ? m.d.S(
        q,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: Y,
          integrity: sl,
          fetchPriority: wl
        }
      ) : F === "script" && m.d.X(q, {
        crossOrigin: Y,
        integrity: sl,
        fetchPriority: wl,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, Rl.preinitModule = function(q, _) {
    if (typeof q == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var F = hl(
            _.as,
            _.crossOrigin
          );
          m.d.M(q, {
            crossOrigin: F,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0
          });
        }
      } else _ == null && m.d.M(q);
  }, Rl.preload = function(q, _) {
    if (typeof q == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var F = _.as, Y = hl(F, _.crossOrigin);
      m.d.L(q, F, {
        crossOrigin: Y,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0,
        type: typeof _.type == "string" ? _.type : void 0,
        fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0,
        referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0,
        imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0,
        imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0,
        media: typeof _.media == "string" ? _.media : void 0
      });
    }
  }, Rl.preloadModule = function(q, _) {
    if (typeof q == "string")
      if (_) {
        var F = hl(_.as, _.crossOrigin);
        m.d.m(q, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: F,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
        });
      } else m.d.m(q);
  }, Rl.requestFormReset = function(q) {
    m.d.r(q);
  }, Rl.unstable_batchedUpdates = function(q, _) {
    return q(_);
  }, Rl.useFormState = function(q, _, F) {
    return vl.H.useFormState(q, _, F);
  }, Rl.useFormStatus = function() {
    return vl.H.useHostTransitionStatus();
  }, Rl.version = "19.2.4", Rl;
}
var Es;
function t1() {
  if (Es) return si.exports;
  Es = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (g) {
        console.error(g);
      }
  }
  return r(), si.exports = l1(), si.exports;
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
var As;
function u1() {
  if (As) return Te;
  As = 1;
  var r = Ih(), g = di(), O = t1();
  function m(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        t += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function cl(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function fl(l) {
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
  function vl(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function hl(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function q(l) {
    if (fl(l) !== l)
      throw Error(m(188));
  }
  function _(l) {
    var t = l.alternate;
    if (!t) {
      if (t = fl(l), t === null) throw Error(m(188));
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
          if (n === u) return q(e), l;
          if (n === a) return q(e), t;
          n = n.sibling;
        }
        throw Error(m(188));
      }
      if (u.return !== a.return) u = e, a = n;
      else {
        for (var f = !1, c = e.child; c; ) {
          if (c === u) {
            f = !0, u = e, a = n;
            break;
          }
          if (c === a) {
            f = !0, a = e, u = n;
            break;
          }
          c = c.sibling;
        }
        if (!f) {
          for (c = n.child; c; ) {
            if (c === u) {
              f = !0, u = n, a = e;
              break;
            }
            if (c === a) {
              f = !0, a = n, u = e;
              break;
            }
            c = c.sibling;
          }
          if (!f) throw Error(m(189));
        }
      }
      if (u.alternate !== a) throw Error(m(190));
    }
    if (u.tag !== 3) throw Error(m(188));
    return u.stateNode.current === u ? l : t;
  }
  function F(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = F(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var Y = Object.assign, sl = Symbol.for("react.element"), wl = Symbol.for("react.transitional.element"), pl = Symbol.for("react.portal"), Cl = Symbol.for("react.fragment"), Dt = Symbol.for("react.strict_mode"), Wl = Symbol.for("react.profiler"), wt = Symbol.for("react.consumer"), ql = Symbol.for("react.context"), nt = Symbol.for("react.forward_ref"), Tt = Symbol.for("react.suspense"), Gl = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), Ql = Symbol.for("react.lazy"), Et = Symbol.for("react.activity"), Zu = Symbol.for("react.memo_cache_sentinel"), At = Symbol.iterator;
  function Xl(l) {
    return l === null || typeof l != "object" ? null : (l = At && l[At] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var zu = Symbol.for("react.client.reference");
  function Ut(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === zu ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Cl:
        return "Fragment";
      case Wl:
        return "Profiler";
      case Dt:
        return "StrictMode";
      case Tt:
        return "Suspense";
      case Gl:
        return "SuspenseList";
      case Et:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case pl:
          return "Portal";
        case ql:
          return l.displayName || "Context";
        case wt:
          return (l._context.displayName || "Context") + ".Consumer";
        case nt:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case K:
          return t = l.displayName || null, t !== null ? t : Ut(l.type) || "Memo";
        case Ql:
          t = l._payload, l = l._init;
          try {
            return Ut(l(t));
          } catch {
          }
      }
    return null;
  }
  var gt = Array.isArray, z = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, M = O.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ll = [], el = -1;
  function v(l) {
    return { current: l };
  }
  function A(l) {
    0 > el || (l.current = ll[el], ll[el] = null, el--);
  }
  function D(l, t) {
    el++, ll[el] = l.current, l.current = t;
  }
  var H = v(null), G = v(null), j = v(null), k = v(null);
  function Yl(l, t) {
    switch (D(j, t), D(G, l), D(H, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Gv(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Gv(t), l = Qv(t, l);
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
    A(H), D(H, l);
  }
  function gl() {
    A(H), A(G), A(j);
  }
  function ra(l) {
    l.memoizedState !== null && D(k, l);
    var t = H.current, u = Qv(t, l.type);
    t !== u && (D(G, l), D(H, u));
  }
  function Ee(l) {
    G.current === l && (A(H), A(G)), k.current === l && (A(k), me._currentValue = B);
  }
  var Zn, hi;
  function Tu(l) {
    if (Zn === void 0)
      try {
        throw Error();
      } catch (u) {
        var t = u.stack.trim().match(/\n( *(at )?)/);
        Zn = t && t[1] || "", hi = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Zn + l + hi;
  }
  var xn = !1;
  function Vn(l, t) {
    if (!l || xn) return "";
    xn = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var E = function() {
                throw Error();
              };
              if (Object.defineProperty(E.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(E, []);
                } catch (S) {
                  var o = S;
                }
                Reflect.construct(l, [], E);
              } else {
                try {
                  E.call();
                } catch (S) {
                  o = S;
                }
                l.call(E.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (S) {
                o = S;
              }
              (E = l()) && typeof E.catch == "function" && E.catch(function() {
              });
            }
          } catch (S) {
            if (S && o && typeof S.stack == "string")
              return [S.stack, o.stack];
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
      var n = a.DetermineComponentFrameRoot(), f = n[0], c = n[1];
      if (f && c) {
        var i = f.split(`
`), h = c.split(`
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
      xn = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? Tu(u) : "";
  }
  function Os(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Tu(l.type);
      case 16:
        return Tu("Lazy");
      case 13:
        return l.child !== t && t !== null ? Tu("Suspense Fallback") : Tu("Suspense");
      case 19:
        return Tu("SuspenseList");
      case 0:
      case 15:
        return Vn(l.type, !1);
      case 11:
        return Vn(l.type.render, !1);
      case 1:
        return Vn(l.type, !0);
      case 31:
        return Tu("Activity");
      default:
        return "";
    }
  }
  function oi(l) {
    try {
      var t = "", u = null;
      do
        t += Os(l, u), u = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ln = Object.prototype.hasOwnProperty, Kn = r.unstable_scheduleCallback, Jn = r.unstable_cancelCallback, Ms = r.unstable_shouldYield, rs = r.unstable_requestPaint, $l = r.unstable_now, Ds = r.unstable_getCurrentPriorityLevel, mi = r.unstable_ImmediatePriority, gi = r.unstable_UserBlockingPriority, Ae = r.unstable_NormalPriority, Us = r.unstable_LowPriority, Si = r.unstable_IdlePriority, Hs = r.log, Ns = r.unstable_setDisableYieldValue, Da = null, Fl = null;
  function Wt(l) {
    if (typeof Hs == "function" && Ns(l), Fl && typeof Fl.setStrictMode == "function")
      try {
        Fl.setStrictMode(Da, l);
      } catch {
      }
  }
  var kl = Math.clz32 ? Math.clz32 : Cs, qs = Math.log, Rs = Math.LN2;
  function Cs(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (qs(l) / Rs | 0) | 0;
  }
  var _e = 256, Oe = 262144, Me = 4194304;
  function Eu(l) {
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
  function re(l, t, u) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? e = Eu(a) : (f &= c, f !== 0 ? e = Eu(f) : u || (u = c & ~l, u !== 0 && (e = Eu(u))))) : (c = a & ~n, c !== 0 ? e = Eu(c) : f !== 0 ? e = Eu(f) : u || (u = a & ~l, u !== 0 && (e = Eu(u)))), e === 0 ? 0 : t !== 0 && t !== e && (t & n) === 0 && (n = e & -e, u = t & -t, n >= u || n === 32 && (u & 4194048) !== 0) ? t : e;
  }
  function Ua(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Ys(l, t) {
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
    var l = Me;
    return Me <<= 1, (Me & 62914560) === 0 && (Me = 4194304), l;
  }
  function wn(l) {
    for (var t = [], u = 0; 31 > u; u++) t.push(l);
    return t;
  }
  function Ha(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function Bs(l, t, u, a, e, n) {
    var f = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var c = l.entanglements, i = l.expirationTimes, h = l.hiddenUpdates;
    for (u = f & ~u; 0 < u; ) {
      var b = 31 - kl(u), E = 1 << b;
      c[b] = 0, i[b] = -1;
      var o = h[b];
      if (o !== null)
        for (h[b] = null, b = 0; b < o.length; b++) {
          var S = o[b];
          S !== null && (S.lane &= -536870913);
        }
      u &= ~E;
    }
    a !== 0 && zi(l, a, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
  }
  function zi(l, t, u) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - kl(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | u & 261930;
  }
  function Ti(l, t) {
    var u = l.entangledLanes |= t;
    for (l = l.entanglements; u; ) {
      var a = 31 - kl(u), e = 1 << a;
      e & t | l[a] & t && (l[a] |= t), u &= ~e;
    }
  }
  function Ei(l, t) {
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
  function Ai() {
    var l = M.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : cs(l.type));
  }
  function _i(l, t) {
    var u = M.p;
    try {
      return M.p = l, t();
    } finally {
      M.p = u;
    }
  }
  var $t = Math.random().toString(36).slice(2), rl = "__reactFiber$" + $t, jl = "__reactProps$" + $t, xu = "__reactContainer$" + $t, Fn = "__reactEvents$" + $t, ps = "__reactListeners$" + $t, Gs = "__reactHandles$" + $t, Oi = "__reactResources$" + $t, Na = "__reactMarker$" + $t;
  function kn(l) {
    delete l[rl], delete l[jl], delete l[Fn], delete l[ps], delete l[Gs];
  }
  function Vu(l) {
    var t = l[rl];
    if (t) return t;
    for (var u = l.parentNode; u; ) {
      if (t = u[xu] || u[rl]) {
        if (u = t.alternate, t.child !== null || u !== null && u.child !== null)
          for (l = Kv(l); l !== null; ) {
            if (u = l[rl]) return u;
            l = Kv(l);
          }
        return t;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function Lu(l) {
    if (l = l[rl] || l[xu]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function qa(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(m(33));
  }
  function Ku(l) {
    var t = l[Oi];
    return t || (t = l[Oi] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ol(l) {
    l[Na] = !0;
  }
  var Mi = /* @__PURE__ */ new Set(), ri = {};
  function Au(l, t) {
    Ju(l, t), Ju(l + "Capture", t);
  }
  function Ju(l, t) {
    for (ri[l] = t, l = 0; l < t.length; l++)
      Mi.add(t[l]);
  }
  var Qs = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Di = {}, Ui = {};
  function Xs(l) {
    return Ln.call(Ui, l) ? !0 : Ln.call(Di, l) ? !1 : Qs.test(l) ? Ui[l] = !0 : (Di[l] = !0, !1);
  }
  function De(l, t, u) {
    if (Xs(t))
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
  function Ue(l, t, u) {
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
  function Ht(l, t, u, a) {
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
  function ft(l) {
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
  function Hi(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function js(l, t, u) {
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
        set: function(f) {
          u = "" + f, n.call(this, f);
        }
      }), Object.defineProperty(l, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return u;
        },
        setValue: function(f) {
          u = "" + f;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function In(l) {
    if (!l._valueTracker) {
      var t = Hi(l) ? "checked" : "value";
      l._valueTracker = js(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Ni(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var u = t.getValue(), a = "";
    return l && (a = Hi(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
  }
  function He(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Zs = /[\n"\\]/g;
  function ct(l) {
    return l.replace(
      Zs,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Pn(l, t, u, a, e, n, f, c) {
    l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + ft(t)) : l.value !== "" + ft(t) && (l.value = "" + ft(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? lf(l, f, ft(t)) : u != null ? lf(l, f, ft(u)) : a != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + ft(c) : l.removeAttribute("name");
  }
  function qi(l, t, u, a, e, n, f, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || u != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        In(l);
        return;
      }
      u = u != null ? "" + ft(u) : "", t = t != null ? "" + ft(t) : u, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? e, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f), In(l);
  }
  function lf(l, t, u) {
    t === "number" && He(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function wu(l, t, u, a) {
    if (l = l.options, t) {
      t = {};
      for (var e = 0; e < u.length; e++)
        t["$" + u[e]] = !0;
      for (u = 0; u < l.length; u++)
        e = t.hasOwnProperty("$" + l[u].value), l[u].selected !== e && (l[u].selected = e), e && a && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + ft(u), t = null, e = 0; e < l.length; e++) {
        if (l[e].value === u) {
          l[e].selected = !0, a && (l[e].defaultSelected = !0);
          return;
        }
        t !== null || l[e].disabled || (t = l[e]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ri(l, t, u) {
    if (t != null && (t = "" + ft(t), t !== l.value && (l.value = t), u == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = u != null ? "" + ft(u) : "";
  }
  function Ci(l, t, u, a) {
    if (t == null) {
      if (a != null) {
        if (u != null) throw Error(m(92));
        if (gt(a)) {
          if (1 < a.length) throw Error(m(93));
          a = a[0];
        }
        u = a;
      }
      u == null && (u = ""), t = u;
    }
    u = ft(t), l.defaultValue = u, a = l.textContent, a === u && a !== "" && a !== null && (l.value = a), In(l);
  }
  function Wu(l, t) {
    if (t) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var xs = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Yi(l, t, u) {
    var a = t.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || xs.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
  }
  function Bi(l, t, u) {
    if (t != null && typeof t != "object")
      throw Error(m(62));
    if (l = l.style, u != null) {
      for (var a in u)
        !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var e in t)
        a = t[e], t.hasOwnProperty(e) && u[e] !== a && Yi(l, e, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Yi(l, n, t[n]);
  }
  function tf(l) {
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
  var Vs = /* @__PURE__ */ new Map([
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
  ]), Ls = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ne(l) {
    return Ls.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Nt() {
  }
  var uf = null;
  function af(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var $u = null, Fu = null;
  function pi(l) {
    var t = Lu(l);
    if (t && (l = t.stateNode)) {
      var u = l[jl] || null;
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
              'input[name="' + ct(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < u.length; t++) {
              var a = u[t];
              if (a !== l && a.form === l.form) {
                var e = a[jl] || null;
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
              a = u[t], a.form === l.form && Ni(a);
          }
          break l;
        case "textarea":
          Ri(l, u.value, u.defaultValue);
          break l;
        case "select":
          t = u.value, t != null && wu(l, !!u.multiple, t, !1);
      }
    }
  }
  var ef = !1;
  function Gi(l, t, u) {
    if (ef) return l(t, u);
    ef = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (ef = !1, ($u !== null || Fu !== null) && (bn(), $u && (t = $u, l = Fu, Fu = $u = null, pi(t), l)))
        for (t = 0; t < l.length; t++) pi(l[t]);
    }
  }
  function Ra(l, t) {
    var u = l.stateNode;
    if (u === null) return null;
    var a = u[jl] || null;
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
  var qt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nf = !1;
  if (qt)
    try {
      var Ca = {};
      Object.defineProperty(Ca, "passive", {
        get: function() {
          nf = !0;
        }
      }), window.addEventListener("test", Ca, Ca), window.removeEventListener("test", Ca, Ca);
    } catch {
      nf = !1;
    }
  var Ft = null, ff = null, qe = null;
  function Qi() {
    if (qe) return qe;
    var l, t = ff, u = t.length, a, e = "value" in Ft ? Ft.value : Ft.textContent, n = e.length;
    for (l = 0; l < u && t[l] === e[l]; l++) ;
    var f = u - l;
    for (a = 1; a <= f && t[u - a] === e[n - a]; a++) ;
    return qe = e.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Re(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Ce() {
    return !0;
  }
  function Xi() {
    return !1;
  }
  function Zl(l) {
    function t(u, a, e, n, f) {
      this._reactName = u, this._targetInst = e, this.type = a, this.nativeEvent = n, this.target = f, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (u = l[c], this[c] = u ? u(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Ce : Xi, this.isPropagationStopped = Xi, this;
    }
    return Y(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Ce);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Ce);
      },
      persist: function() {
      },
      isPersistent: Ce
    }), t;
  }
  var _u = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ye = Zl(_u), Ya = Y({}, _u, { view: 0, detail: 0 }), Ks = Zl(Ya), cf, yf, Ba, Be = Y({}, Ya, {
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
    getModifierState: sf,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== Ba && (Ba && l.type === "mousemove" ? (cf = l.screenX - Ba.screenX, yf = l.screenY - Ba.screenY) : yf = cf = 0, Ba = l), cf);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : yf;
    }
  }), ji = Zl(Be), Js = Y({}, Be, { dataTransfer: 0 }), ws = Zl(Js), Ws = Y({}, Ya, { relatedTarget: 0 }), vf = Zl(Ws), $s = Y({}, _u, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Fs = Zl($s), ks = Y({}, _u, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Is = Zl(ks), Ps = Y({}, _u, { data: 0 }), Zi = Zl(Ps), ld = {
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
  function sf() {
    return ad;
  }
  var ed = Y({}, Ya, {
    key: function(l) {
      if (l.key) {
        var t = ld[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Re(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? td[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: sf,
    charCode: function(l) {
      return l.type === "keypress" ? Re(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Re(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), nd = Zl(ed), fd = Y({}, Be, {
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
  }), xi = Zl(fd), cd = Y({}, Ya, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: sf
  }), id = Zl(cd), yd = Y({}, _u, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vd = Zl(yd), sd = Y({}, Be, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), dd = Zl(sd), hd = Y({}, _u, {
    newState: 0,
    oldState: 0
  }), od = Zl(hd), md = [9, 13, 27, 32], df = qt && "CompositionEvent" in window, pa = null;
  qt && "documentMode" in document && (pa = document.documentMode);
  var gd = qt && "TextEvent" in window && !pa, Vi = qt && (!df || pa && 8 < pa && 11 >= pa), Li = " ", Ki = !1;
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
  var ku = !1;
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
    if (ku)
      return l === "compositionend" || !df && Ji(l, t) ? (l = Qi(), qe = ff = Ft = null, ku = !1, l) : null;
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
  var zd = {
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
    return t === "input" ? !!zd[l.type] : t === "textarea";
  }
  function $i(l, t, u, a) {
    $u ? Fu ? Fu.push(a) : Fu = [a] : $u = a, t = Mn(t, "onChange"), 0 < t.length && (u = new Ye(
      "onChange",
      "change",
      null,
      u,
      a
    ), l.push({ event: u, listeners: t }));
  }
  var Ga = null, Qa = null;
  function Td(l) {
    qv(l, 0);
  }
  function pe(l) {
    var t = qa(l);
    if (Ni(t)) return l;
  }
  function Fi(l, t) {
    if (l === "change") return t;
  }
  var ki = !1;
  if (qt) {
    var hf;
    if (qt) {
      var of = "oninput" in document;
      if (!of) {
        var Ii = document.createElement("div");
        Ii.setAttribute("oninput", "return;"), of = typeof Ii.oninput == "function";
      }
      hf = of;
    } else hf = !1;
    ki = hf && (!document.documentMode || 9 < document.documentMode);
  }
  function Pi() {
    Ga && (Ga.detachEvent("onpropertychange", l0), Qa = Ga = null);
  }
  function l0(l) {
    if (l.propertyName === "value" && pe(Qa)) {
      var t = [];
      $i(
        t,
        Qa,
        l,
        af(l)
      ), Gi(Td, t);
    }
  }
  function Ed(l, t, u) {
    l === "focusin" ? (Pi(), Ga = t, Qa = u, Ga.attachEvent("onpropertychange", l0)) : l === "focusout" && Pi();
  }
  function Ad(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return pe(Qa);
  }
  function _d(l, t) {
    if (l === "click") return pe(t);
  }
  function Od(l, t) {
    if (l === "input" || l === "change")
      return pe(t);
  }
  function Md(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var Il = typeof Object.is == "function" ? Object.is : Md;
  function Xa(l, t) {
    if (Il(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var u = Object.keys(l), a = Object.keys(t);
    if (u.length !== a.length) return !1;
    for (a = 0; a < u.length; a++) {
      var e = u[a];
      if (!Ln.call(t, e) || !Il(l[e], t[e]))
        return !1;
    }
    return !0;
  }
  function t0(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function u0(l, t) {
    var u = t0(l);
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
      u = t0(u);
    }
  }
  function a0(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? a0(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function e0(l) {
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
  function mf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var rd = qt && "documentMode" in document && 11 >= document.documentMode, Iu = null, gf = null, ja = null, Sf = !1;
  function n0(l, t, u) {
    var a = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Sf || Iu == null || Iu !== He(a) || (a = Iu, "selectionStart" in a && mf(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), ja && Xa(ja, a) || (ja = a, a = Mn(gf, "onSelect"), 0 < a.length && (t = new Ye(
      "onSelect",
      "select",
      null,
      t,
      u
    ), l.push({ event: t, listeners: a }), t.target = Iu)));
  }
  function Ou(l, t) {
    var u = {};
    return u[l.toLowerCase()] = t.toLowerCase(), u["Webkit" + l] = "webkit" + t, u["Moz" + l] = "moz" + t, u;
  }
  var Pu = {
    animationend: Ou("Animation", "AnimationEnd"),
    animationiteration: Ou("Animation", "AnimationIteration"),
    animationstart: Ou("Animation", "AnimationStart"),
    transitionrun: Ou("Transition", "TransitionRun"),
    transitionstart: Ou("Transition", "TransitionStart"),
    transitioncancel: Ou("Transition", "TransitionCancel"),
    transitionend: Ou("Transition", "TransitionEnd")
  }, bf = {}, f0 = {};
  qt && (f0 = document.createElement("div").style, "AnimationEvent" in window || (delete Pu.animationend.animation, delete Pu.animationiteration.animation, delete Pu.animationstart.animation), "TransitionEvent" in window || delete Pu.transitionend.transition);
  function Mu(l) {
    if (bf[l]) return bf[l];
    if (!Pu[l]) return l;
    var t = Pu[l], u;
    for (u in t)
      if (t.hasOwnProperty(u) && u in f0)
        return bf[l] = t[u];
    return l;
  }
  var c0 = Mu("animationend"), i0 = Mu("animationiteration"), y0 = Mu("animationstart"), Dd = Mu("transitionrun"), Ud = Mu("transitionstart"), Hd = Mu("transitioncancel"), v0 = Mu("transitionend"), s0 = /* @__PURE__ */ new Map(), zf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  zf.push("scrollEnd");
  function St(l, t) {
    s0.set(l, t), Au(t, [l]);
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
  }, it = [], la = 0, Tf = 0;
  function Qe() {
    for (var l = la, t = Tf = la = 0; t < l; ) {
      var u = it[t];
      it[t++] = null;
      var a = it[t];
      it[t++] = null;
      var e = it[t];
      it[t++] = null;
      var n = it[t];
      if (it[t++] = null, a !== null && e !== null) {
        var f = a.pending;
        f === null ? e.next = e : (e.next = f.next, f.next = e), a.pending = e;
      }
      n !== 0 && d0(u, e, n);
    }
  }
  function Xe(l, t, u, a) {
    it[la++] = l, it[la++] = t, it[la++] = u, it[la++] = a, Tf |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function Ef(l, t, u, a) {
    return Xe(l, t, u, a), je(l);
  }
  function ru(l, t) {
    return Xe(l, null, null, t), je(l);
  }
  function d0(l, t, u) {
    l.lanes |= u;
    var a = l.alternate;
    a !== null && (a.lanes |= u);
    for (var e = !1, n = l.return; n !== null; )
      n.childLanes |= u, a = n.alternate, a !== null && (a.childLanes |= u), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - kl(u), l = n.hiddenUpdates, a = l[e], a === null ? l[e] = [t] : a.push(t), t.lane = u | 536870912), n) : null;
  }
  function je(l) {
    if (50 < ie)
      throw ie = 0, Nc = null, Error(m(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ta = {};
  function Nd(l, t, u, a) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Pl(l, t, u, a) {
    return new Nd(l, t, u, a);
  }
  function Af(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Rt(l, t) {
    var u = l.alternate;
    return u === null ? (u = Pl(
      l.tag,
      t,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = t, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, t = l.dependencies, u.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function h0(l, t) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, t = u.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Ze(l, t, u, a, e, n) {
    var f = 0;
    if (a = l, typeof l == "function") Af(l) && (f = 1);
    else if (typeof l == "string")
      f = Bh(
        l,
        u,
        H.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case Et:
          return l = Pl(31, u, t, e), l.elementType = Et, l.lanes = n, l;
        case Cl:
          return Du(u.children, e, n, t);
        case Dt:
          f = 8, e |= 24;
          break;
        case Wl:
          return l = Pl(12, u, t, e | 2), l.elementType = Wl, l.lanes = n, l;
        case Tt:
          return l = Pl(13, u, t, e), l.elementType = Tt, l.lanes = n, l;
        case Gl:
          return l = Pl(19, u, t, e), l.elementType = Gl, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case ql:
                f = 10;
                break l;
              case wt:
                f = 9;
                break l;
              case nt:
                f = 11;
                break l;
              case K:
                f = 14;
                break l;
              case Ql:
                f = 16, a = null;
                break l;
            }
          f = 29, u = Error(
            m(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = Pl(f, u, t, e), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function Du(l, t, u, a) {
    return l = Pl(7, l, a, t), l.lanes = u, l;
  }
  function _f(l, t, u) {
    return l = Pl(6, l, null, t), l.lanes = u, l;
  }
  function o0(l) {
    var t = Pl(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Of(l, t, u) {
    return t = Pl(
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
  var m0 = /* @__PURE__ */ new WeakMap();
  function yt(l, t) {
    if (typeof l == "object" && l !== null) {
      var u = m0.get(l);
      return u !== void 0 ? u : (t = {
        value: l,
        source: t,
        stack: oi(t)
      }, m0.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: oi(t)
    };
  }
  var ua = [], aa = 0, xe = null, Za = 0, vt = [], st = 0, kt = null, _t = 1, Ot = "";
  function Ct(l, t) {
    ua[aa++] = Za, ua[aa++] = xe, xe = l, Za = t;
  }
  function g0(l, t, u) {
    vt[st++] = _t, vt[st++] = Ot, vt[st++] = kt, kt = l;
    var a = _t;
    l = Ot;
    var e = 32 - kl(a) - 1;
    a &= ~(1 << e), u += 1;
    var n = 32 - kl(t) + e;
    if (30 < n) {
      var f = e - e % 5;
      n = (a & (1 << f) - 1).toString(32), a >>= f, e -= f, _t = 1 << 32 - kl(t) + e | u << e | a, Ot = n + l;
    } else
      _t = 1 << n | u << e | a, Ot = l;
  }
  function Mf(l) {
    l.return !== null && (Ct(l, 1), g0(l, 1, 0));
  }
  function rf(l) {
    for (; l === xe; )
      xe = ua[--aa], ua[aa] = null, Za = ua[--aa], ua[aa] = null;
    for (; l === kt; )
      kt = vt[--st], vt[st] = null, Ot = vt[--st], vt[st] = null, _t = vt[--st], vt[st] = null;
  }
  function S0(l, t) {
    vt[st++] = _t, vt[st++] = Ot, vt[st++] = kt, _t = t.id, Ot = t.overflow, kt = l;
  }
  var Dl = null, il = null, J = !1, It = null, dt = !1, Df = Error(m(519));
  function Pt(l) {
    var t = Error(
      m(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw xa(yt(t, l)), Df;
  }
  function b0(l) {
    var t = l.stateNode, u = l.type, a = l.memoizedProps;
    switch (t[rl] = l, t[jl] = a, u) {
      case "dialog":
        x("cancel", t), x("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        x("load", t);
        break;
      case "video":
      case "audio":
        for (u = 0; u < ve.length; u++)
          x(ve[u], t);
        break;
      case "source":
        x("error", t);
        break;
      case "img":
      case "image":
      case "link":
        x("error", t), x("load", t);
        break;
      case "details":
        x("toggle", t);
        break;
      case "input":
        x("invalid", t), qi(
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
        x("invalid", t);
        break;
      case "textarea":
        x("invalid", t), Ci(t, a.value, a.defaultValue, a.children);
    }
    u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || Bv(t.textContent, u) ? (a.popover != null && (x("beforetoggle", t), x("toggle", t)), a.onScroll != null && x("scroll", t), a.onScrollEnd != null && x("scrollend", t), a.onClick != null && (t.onclick = Nt), t = !0) : t = !1, t || Pt(l, !0);
  }
  function z0(l) {
    for (Dl = l.return; Dl; )
      switch (Dl.tag) {
        case 5:
        case 31:
        case 13:
          dt = !1;
          return;
        case 27:
        case 3:
          dt = !0;
          return;
        default:
          Dl = Dl.return;
      }
  }
  function ea(l) {
    if (l !== Dl) return !1;
    if (!J) return z0(l), J = !0, !1;
    var t = l.tag, u;
    if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Kc(l.type, l.memoizedProps)), u = !u), u && il && Pt(l), z0(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(317));
      il = Lv(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(317));
      il = Lv(l);
    } else
      t === 27 ? (t = il, hu(l.type) ? (l = Fc, Fc = null, il = l) : il = t) : il = Dl ? ot(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Uu() {
    il = Dl = null, J = !1;
  }
  function Uf() {
    var l = It;
    return l !== null && (Kl === null ? Kl = l : Kl.push.apply(
      Kl,
      l
    ), It = null), l;
  }
  function xa(l) {
    It === null ? It = [l] : It.push(l);
  }
  var Hf = v(null), Hu = null, Yt = null;
  function lu(l, t, u) {
    D(Hf, t._currentValue), t._currentValue = u;
  }
  function Bt(l) {
    l._currentValue = Hf.current, A(Hf);
  }
  function Nf(l, t, u) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === u) break;
      l = l.return;
    }
  }
  function qf(l, t, u, a) {
    var e = l.child;
    for (e !== null && (e.return = l); e !== null; ) {
      var n = e.dependencies;
      if (n !== null) {
        var f = e.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = e;
          for (var i = 0; i < t.length; i++)
            if (c.context === t[i]) {
              n.lanes |= u, c = n.alternate, c !== null && (c.lanes |= u), Nf(
                n.return,
                u,
                l
              ), a || (f = null);
              break l;
            }
          n = c.next;
        }
      } else if (e.tag === 18) {
        if (f = e.return, f === null) throw Error(m(341));
        f.lanes |= u, n = f.alternate, n !== null && (n.lanes |= u), Nf(f, u, l), f = null;
      } else f = e.child;
      if (f !== null) f.return = e;
      else
        for (f = e; f !== null; ) {
          if (f === l) {
            f = null;
            break;
          }
          if (e = f.sibling, e !== null) {
            e.return = f.return, f = e;
            break;
          }
          f = f.return;
        }
      e = f;
    }
  }
  function na(l, t, u, a) {
    l = null;
    for (var e = t, n = !1; e !== null; ) {
      if (!n) {
        if ((e.flags & 524288) !== 0) n = !0;
        else if ((e.flags & 262144) !== 0) break;
      }
      if (e.tag === 10) {
        var f = e.alternate;
        if (f === null) throw Error(m(387));
        if (f = f.memoizedProps, f !== null) {
          var c = e.type;
          Il(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (e === k.current) {
        if (f = e.alternate, f === null) throw Error(m(387));
        f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(me) : l = [me]);
      }
      e = e.return;
    }
    l !== null && qf(
      t,
      l,
      u,
      a
    ), t.flags |= 262144;
  }
  function Ve(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!Il(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Nu(l) {
    Hu = l, Yt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Ul(l) {
    return T0(Hu, l);
  }
  function Le(l, t) {
    return Hu === null && Nu(l), T0(l, t);
  }
  function T0(l, t) {
    var u = t._currentValue;
    if (t = { context: t, memoizedValue: u, next: null }, Yt === null) {
      if (l === null) throw Error(m(308));
      Yt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Yt = Yt.next = t;
    return u;
  }
  var qd = typeof AbortController < "u" ? AbortController : function() {
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
  }, Rd = r.unstable_scheduleCallback, Cd = r.unstable_NormalPriority, zl = {
    $$typeof: ql,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Rf() {
    return {
      controller: new qd(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Va(l) {
    l.refCount--, l.refCount === 0 && Rd(Cd, function() {
      l.controller.abort();
    });
  }
  var La = null, Cf = 0, fa = 0, ca = null;
  function Yd(l, t) {
    if (La === null) {
      var u = La = [];
      Cf = 0, fa = pc(), ca = {
        status: "pending",
        value: void 0,
        then: function(a) {
          u.push(a);
        }
      };
    }
    return Cf++, t.then(E0, E0), t;
  }
  function E0() {
    if (--Cf === 0 && La !== null) {
      ca !== null && (ca.status = "fulfilled");
      var l = La;
      La = null, fa = 0, ca = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Bd(l, t) {
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
  var A0 = z.S;
  z.S = function(l, t) {
    nv = $l(), typeof t == "object" && t !== null && typeof t.then == "function" && Yd(l, t), A0 !== null && A0(l, t);
  };
  var qu = v(null);
  function Yf() {
    var l = qu.current;
    return l !== null ? l : nl.pooledCache;
  }
  function Ke(l, t) {
    t === null ? D(qu, qu.current) : D(qu, t.pool);
  }
  function _0() {
    var l = Yf();
    return l === null ? null : { parent: zl._currentValue, pool: l };
  }
  var ia = Error(m(460)), Bf = Error(m(474)), Je = Error(m(542)), we = { then: function() {
  } };
  function O0(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function M0(l, t, u) {
    switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(Nt, Nt), t = u), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, D0(l), l;
      default:
        if (typeof t.status == "string") t.then(Nt, Nt);
        else {
          if (l = nl, l !== null && 100 < l.shellSuspendCounter)
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
            throw l = t.reason, D0(l), l;
        }
        throw Cu = t, ia;
    }
  }
  function Ru(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (u) {
      throw u !== null && typeof u == "object" && typeof u.then == "function" ? (Cu = u, ia) : u;
    }
  }
  var Cu = null;
  function r0() {
    if (Cu === null) throw Error(m(459));
    var l = Cu;
    return Cu = null, l;
  }
  function D0(l) {
    if (l === ia || l === Je)
      throw Error(m(483));
  }
  var ya = null, Ka = 0;
  function We(l) {
    var t = Ka;
    return Ka += 1, ya === null && (ya = []), M0(ya, l, t);
  }
  function Ja(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function $e(l, t) {
    throw t.$$typeof === sl ? Error(m(525)) : (l = Object.prototype.toString.call(t), Error(
      m(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function U0(l) {
    function t(s, y) {
      if (l) {
        var d = s.deletions;
        d === null ? (s.deletions = [y], s.flags |= 16) : d.push(y);
      }
    }
    function u(s, y) {
      if (!l) return null;
      for (; y !== null; )
        t(s, y), y = y.sibling;
      return null;
    }
    function a(s) {
      for (var y = /* @__PURE__ */ new Map(); s !== null; )
        s.key !== null ? y.set(s.key, s) : y.set(s.index, s), s = s.sibling;
      return y;
    }
    function e(s, y) {
      return s = Rt(s, y), s.index = 0, s.sibling = null, s;
    }
    function n(s, y, d) {
      return s.index = d, l ? (d = s.alternate, d !== null ? (d = d.index, d < y ? (s.flags |= 67108866, y) : d) : (s.flags |= 67108866, y)) : (s.flags |= 1048576, y);
    }
    function f(s) {
      return l && s.alternate === null && (s.flags |= 67108866), s;
    }
    function c(s, y, d, T) {
      return y === null || y.tag !== 6 ? (y = _f(d, s.mode, T), y.return = s, y) : (y = e(y, d), y.return = s, y);
    }
    function i(s, y, d, T) {
      var R = d.type;
      return R === Cl ? b(
        s,
        y,
        d.props.children,
        T,
        d.key
      ) : y !== null && (y.elementType === R || typeof R == "object" && R !== null && R.$$typeof === Ql && Ru(R) === y.type) ? (y = e(y, d.props), Ja(y, d), y.return = s, y) : (y = Ze(
        d.type,
        d.key,
        d.props,
        null,
        s.mode,
        T
      ), Ja(y, d), y.return = s, y);
    }
    function h(s, y, d, T) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== d.containerInfo || y.stateNode.implementation !== d.implementation ? (y = Of(d, s.mode, T), y.return = s, y) : (y = e(y, d.children || []), y.return = s, y);
    }
    function b(s, y, d, T, R) {
      return y === null || y.tag !== 7 ? (y = Du(
        d,
        s.mode,
        T,
        R
      ), y.return = s, y) : (y = e(y, d), y.return = s, y);
    }
    function E(s, y, d) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = _f(
          "" + y,
          s.mode,
          d
        ), y.return = s, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case wl:
            return d = Ze(
              y.type,
              y.key,
              y.props,
              null,
              s.mode,
              d
            ), Ja(d, y), d.return = s, d;
          case pl:
            return y = Of(
              y,
              s.mode,
              d
            ), y.return = s, y;
          case Ql:
            return y = Ru(y), E(s, y, d);
        }
        if (gt(y) || Xl(y))
          return y = Du(
            y,
            s.mode,
            d,
            null
          ), y.return = s, y;
        if (typeof y.then == "function")
          return E(s, We(y), d);
        if (y.$$typeof === ql)
          return E(
            s,
            Le(s, y),
            d
          );
        $e(s, y);
      }
      return null;
    }
    function o(s, y, d, T) {
      var R = y !== null ? y.key : null;
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
        return R !== null ? null : c(s, y, "" + d, T);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case wl:
            return d.key === R ? i(s, y, d, T) : null;
          case pl:
            return d.key === R ? h(s, y, d, T) : null;
          case Ql:
            return d = Ru(d), o(s, y, d, T);
        }
        if (gt(d) || Xl(d))
          return R !== null ? null : b(s, y, d, T, null);
        if (typeof d.then == "function")
          return o(
            s,
            y,
            We(d),
            T
          );
        if (d.$$typeof === ql)
          return o(
            s,
            y,
            Le(s, d),
            T
          );
        $e(s, d);
      }
      return null;
    }
    function S(s, y, d, T, R) {
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return s = s.get(d) || null, c(y, s, "" + T, R);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case wl:
            return s = s.get(
              T.key === null ? d : T.key
            ) || null, i(y, s, T, R);
          case pl:
            return s = s.get(
              T.key === null ? d : T.key
            ) || null, h(y, s, T, R);
          case Ql:
            return T = Ru(T), S(
              s,
              y,
              d,
              T,
              R
            );
        }
        if (gt(T) || Xl(T))
          return s = s.get(d) || null, b(y, s, T, R, null);
        if (typeof T.then == "function")
          return S(
            s,
            y,
            d,
            We(T),
            R
          );
        if (T.$$typeof === ql)
          return S(
            s,
            y,
            d,
            Le(y, T),
            R
          );
        $e(y, T);
      }
      return null;
    }
    function U(s, y, d, T) {
      for (var R = null, w = null, N = y, X = y = 0, L = null; N !== null && X < d.length; X++) {
        N.index > X ? (L = N, N = null) : L = N.sibling;
        var W = o(
          s,
          N,
          d[X],
          T
        );
        if (W === null) {
          N === null && (N = L);
          break;
        }
        l && N && W.alternate === null && t(s, N), y = n(W, y, X), w === null ? R = W : w.sibling = W, w = W, N = L;
      }
      if (X === d.length)
        return u(s, N), J && Ct(s, X), R;
      if (N === null) {
        for (; X < d.length; X++)
          N = E(s, d[X], T), N !== null && (y = n(
            N,
            y,
            X
          ), w === null ? R = N : w.sibling = N, w = N);
        return J && Ct(s, X), R;
      }
      for (N = a(N); X < d.length; X++)
        L = S(
          N,
          s,
          X,
          d[X],
          T
        ), L !== null && (l && L.alternate !== null && N.delete(
          L.key === null ? X : L.key
        ), y = n(
          L,
          y,
          X
        ), w === null ? R = L : w.sibling = L, w = L);
      return l && N.forEach(function(bu) {
        return t(s, bu);
      }), J && Ct(s, X), R;
    }
    function C(s, y, d, T) {
      if (d == null) throw Error(m(151));
      for (var R = null, w = null, N = y, X = y = 0, L = null, W = d.next(); N !== null && !W.done; X++, W = d.next()) {
        N.index > X ? (L = N, N = null) : L = N.sibling;
        var bu = o(s, N, W.value, T);
        if (bu === null) {
          N === null && (N = L);
          break;
        }
        l && N && bu.alternate === null && t(s, N), y = n(bu, y, X), w === null ? R = bu : w.sibling = bu, w = bu, N = L;
      }
      if (W.done)
        return u(s, N), J && Ct(s, X), R;
      if (N === null) {
        for (; !W.done; X++, W = d.next())
          W = E(s, W.value, T), W !== null && (y = n(W, y, X), w === null ? R = W : w.sibling = W, w = W);
        return J && Ct(s, X), R;
      }
      for (N = a(N); !W.done; X++, W = d.next())
        W = S(N, s, X, W.value, T), W !== null && (l && W.alternate !== null && N.delete(W.key === null ? X : W.key), y = n(W, y, X), w === null ? R = W : w.sibling = W, w = W);
      return l && N.forEach(function(Jh) {
        return t(s, Jh);
      }), J && Ct(s, X), R;
    }
    function al(s, y, d, T) {
      if (typeof d == "object" && d !== null && d.type === Cl && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case wl:
            l: {
              for (var R = d.key; y !== null; ) {
                if (y.key === R) {
                  if (R = d.type, R === Cl) {
                    if (y.tag === 7) {
                      u(
                        s,
                        y.sibling
                      ), T = e(
                        y,
                        d.props.children
                      ), T.return = s, s = T;
                      break l;
                    }
                  } else if (y.elementType === R || typeof R == "object" && R !== null && R.$$typeof === Ql && Ru(R) === y.type) {
                    u(
                      s,
                      y.sibling
                    ), T = e(y, d.props), Ja(T, d), T.return = s, s = T;
                    break l;
                  }
                  u(s, y);
                  break;
                } else t(s, y);
                y = y.sibling;
              }
              d.type === Cl ? (T = Du(
                d.props.children,
                s.mode,
                T,
                d.key
              ), T.return = s, s = T) : (T = Ze(
                d.type,
                d.key,
                d.props,
                null,
                s.mode,
                T
              ), Ja(T, d), T.return = s, s = T);
            }
            return f(s);
          case pl:
            l: {
              for (R = d.key; y !== null; ) {
                if (y.key === R)
                  if (y.tag === 4 && y.stateNode.containerInfo === d.containerInfo && y.stateNode.implementation === d.implementation) {
                    u(
                      s,
                      y.sibling
                    ), T = e(y, d.children || []), T.return = s, s = T;
                    break l;
                  } else {
                    u(s, y);
                    break;
                  }
                else t(s, y);
                y = y.sibling;
              }
              T = Of(d, s.mode, T), T.return = s, s = T;
            }
            return f(s);
          case Ql:
            return d = Ru(d), al(
              s,
              y,
              d,
              T
            );
        }
        if (gt(d))
          return U(
            s,
            y,
            d,
            T
          );
        if (Xl(d)) {
          if (R = Xl(d), typeof R != "function") throw Error(m(150));
          return d = R.call(d), C(
            s,
            y,
            d,
            T
          );
        }
        if (typeof d.then == "function")
          return al(
            s,
            y,
            We(d),
            T
          );
        if (d.$$typeof === ql)
          return al(
            s,
            y,
            Le(s, d),
            T
          );
        $e(s, d);
      }
      return typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint" ? (d = "" + d, y !== null && y.tag === 6 ? (u(s, y.sibling), T = e(y, d), T.return = s, s = T) : (u(s, y), T = _f(d, s.mode, T), T.return = s, s = T), f(s)) : u(s, y);
    }
    return function(s, y, d, T) {
      try {
        Ka = 0;
        var R = al(
          s,
          y,
          d,
          T
        );
        return ya = null, R;
      } catch (N) {
        if (N === ia || N === Je) throw N;
        var w = Pl(29, N, null, s.mode);
        return w.lanes = T, w.return = s, w;
      } finally {
      }
    };
  }
  var Yu = U0(!0), H0 = U0(!1), tu = !1;
  function pf(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Gf(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function uu(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function au(l, t, u) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, ($ & 2) !== 0) {
      var e = a.pending;
      return e === null ? t.next = t : (t.next = e.next, e.next = t), a.pending = t, t = je(l), d0(l, null, u), t;
    }
    return Xe(l, a, t, u), je(l);
  }
  function wa(l, t, u) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (u & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, Ti(l, u);
    }
  }
  function Qf(l, t) {
    var u = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, u === a)) {
      var e = null, n = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var f = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          n === null ? e = n = f : n = n.next = f, u = u.next;
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
  var Xf = !1;
  function Wa() {
    if (Xf) {
      var l = ca;
      if (l !== null) throw l;
    }
  }
  function $a(l, t, u, a) {
    Xf = !1;
    var e = l.updateQueue;
    tu = !1;
    var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
    if (c !== null) {
      e.shared.pending = null;
      var i = c, h = i.next;
      i.next = null, f === null ? n = h : f.next = h, f = i;
      var b = l.alternate;
      b !== null && (b = b.updateQueue, c = b.lastBaseUpdate, c !== f && (c === null ? b.firstBaseUpdate = h : c.next = h, b.lastBaseUpdate = i));
    }
    if (n !== null) {
      var E = e.baseState;
      f = 0, b = h = i = null, c = n;
      do {
        var o = c.lane & -536870913, S = o !== c.lane;
        if (S ? (V & o) === o : (a & o) === o) {
          o !== 0 && o === fa && (Xf = !0), b !== null && (b = b.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var U = l, C = c;
            o = t;
            var al = u;
            switch (C.tag) {
              case 1:
                if (U = C.payload, typeof U == "function") {
                  E = U.call(al, E, o);
                  break l;
                }
                E = U;
                break l;
              case 3:
                U.flags = U.flags & -65537 | 128;
              case 0:
                if (U = C.payload, o = typeof U == "function" ? U.call(al, E, o) : U, o == null) break l;
                E = Y({}, E, o);
                break l;
              case 2:
                tu = !0;
            }
          }
          o = c.callback, o !== null && (l.flags |= 64, S && (l.flags |= 8192), S = e.callbacks, S === null ? e.callbacks = [o] : S.push(o));
        } else
          S = {
            lane: o,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, b === null ? (h = b = S, i = E) : b = b.next = S, f |= o;
        if (c = c.next, c === null) {
          if (c = e.shared.pending, c === null)
            break;
          S = c, c = S.next, S.next = null, e.lastBaseUpdate = S, e.shared.pending = null;
        }
      } while (!0);
      b === null && (i = E), e.baseState = i, e.firstBaseUpdate = h, e.lastBaseUpdate = b, n === null && (e.shared.lanes = 0), iu |= f, l.lanes = f, l.memoizedState = E;
    }
  }
  function N0(l, t) {
    if (typeof l != "function")
      throw Error(m(191, l));
    l.call(t);
  }
  function q0(l, t) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        N0(u[l], t);
  }
  var va = v(null), Fe = v(0);
  function R0(l, t) {
    l = Lt, D(Fe, l), D(va, t), Lt = l | t.baseLanes;
  }
  function jf() {
    D(Fe, Lt), D(va, va.current);
  }
  function Zf() {
    Lt = Fe.current, A(va), A(Fe);
  }
  var lt = v(null), ht = null;
  function eu(l) {
    var t = l.alternate;
    D(Sl, Sl.current & 1), D(lt, l), ht === null && (t === null || va.current !== null || t.memoizedState !== null) && (ht = l);
  }
  function xf(l) {
    D(Sl, Sl.current), D(lt, l), ht === null && (ht = l);
  }
  function C0(l) {
    l.tag === 22 ? (D(Sl, Sl.current), D(lt, l), ht === null && (ht = l)) : nu();
  }
  function nu() {
    D(Sl, Sl.current), D(lt, lt.current);
  }
  function tt(l) {
    A(lt), ht === l && (ht = null), A(Sl);
  }
  var Sl = v(0);
  function ke(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var u = t.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || Wc(u) || $c(u)))
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
  var pt = 0, Q = null, tl = null, Tl = null, Ie = !1, sa = !1, Bu = !1, Pe = 0, Fa = 0, da = null, pd = 0;
  function ol() {
    throw Error(m(321));
  }
  function Vf(l, t) {
    if (t === null) return !1;
    for (var u = 0; u < t.length && u < l.length; u++)
      if (!Il(l[u], t[u])) return !1;
    return !0;
  }
  function Lf(l, t, u, a, e, n) {
    return pt = n, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, z.H = l === null || l.memoizedState === null ? gy : nc, Bu = !1, n = u(a, e), Bu = !1, sa && (n = B0(
      t,
      u,
      a,
      e
    )), Y0(l), n;
  }
  function Y0(l) {
    z.H = Pa;
    var t = tl !== null && tl.next !== null;
    if (pt = 0, Tl = tl = Q = null, Ie = !1, Fa = 0, da = null, t) throw Error(m(300));
    l === null || El || (l = l.dependencies, l !== null && Ve(l) && (El = !0));
  }
  function B0(l, t, u, a) {
    Q = l;
    var e = 0;
    do {
      if (sa && (da = null), Fa = 0, sa = !1, 25 <= e) throw Error(m(301));
      if (e += 1, Tl = tl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      z.H = Sy, n = t(u, a);
    } while (sa);
    return n;
  }
  function Gd() {
    var l = z.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? ka(t) : t, l = l.useState()[0], (tl !== null ? tl.memoizedState : null) !== l && (Q.flags |= 1024), t;
  }
  function Kf() {
    var l = Pe !== 0;
    return Pe = 0, l;
  }
  function Jf(l, t, u) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~u;
  }
  function wf(l) {
    if (Ie) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Ie = !1;
    }
    pt = 0, Tl = tl = Q = null, sa = !1, Fa = Pe = 0, da = null;
  }
  function Bl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Tl === null ? Q.memoizedState = Tl = l : Tl = Tl.next = l, Tl;
  }
  function bl() {
    if (tl === null) {
      var l = Q.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = tl.next;
    var t = Tl === null ? Q.memoizedState : Tl.next;
    if (t !== null)
      Tl = t, tl = l;
    else {
      if (l === null)
        throw Q.alternate === null ? Error(m(467)) : Error(m(310));
      tl = l, l = {
        memoizedState: tl.memoizedState,
        baseState: tl.baseState,
        baseQueue: tl.baseQueue,
        queue: tl.queue,
        next: null
      }, Tl === null ? Q.memoizedState = Tl = l : Tl = Tl.next = l;
    }
    return Tl;
  }
  function ln() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ka(l) {
    var t = Fa;
    return Fa += 1, da === null && (da = []), l = M0(da, l, t), t = Q, (Tl === null ? t.memoizedState : Tl.next) === null && (t = t.alternate, z.H = t === null || t.memoizedState === null ? gy : nc), l;
  }
  function tn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return ka(l);
      if (l.$$typeof === ql) return Ul(l);
    }
    throw Error(m(438, String(l)));
  }
  function Wf(l) {
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
    if (t == null && (t = { data: [], index: 0 }), u === null && (u = ln(), Q.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0)
      for (u = t.data[t.index] = Array(l), a = 0; a < l; a++)
        u[a] = Zu;
    return t.index++, u;
  }
  function Gt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function un(l) {
    var t = bl();
    return $f(t, tl, l);
  }
  function $f(l, t, u) {
    var a = l.queue;
    if (a === null) throw Error(m(311));
    a.lastRenderedReducer = u;
    var e = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (e !== null) {
        var f = e.next;
        e.next = n.next, n.next = f;
      }
      t.baseQueue = e = n, a.pending = null;
    }
    if (n = l.baseState, e === null) l.memoizedState = n;
    else {
      t = e.next;
      var c = f = null, i = null, h = t, b = !1;
      do {
        var E = h.lane & -536870913;
        if (E !== h.lane ? (V & E) === E : (pt & E) === E) {
          var o = h.revertLane;
          if (o === 0)
            i !== null && (i = i.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }), E === fa && (b = !0);
          else if ((pt & o) === o) {
            h = h.next, o === fa && (b = !0);
            continue;
          } else
            E = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }, i === null ? (c = i = E, f = n) : i = i.next = E, Q.lanes |= o, iu |= o;
          E = h.action, Bu && u(n, E), n = h.hasEagerState ? h.eagerState : u(n, E);
        } else
          o = {
            lane: E,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, i === null ? (c = i = o, f = n) : i = i.next = o, Q.lanes |= E, iu |= E;
        h = h.next;
      } while (h !== null && h !== t);
      if (i === null ? f = n : i.next = c, !Il(n, l.memoizedState) && (El = !0, b && (u = ca, u !== null)))
        throw u;
      l.memoizedState = n, l.baseState = f, l.baseQueue = i, a.lastRenderedState = n;
    }
    return e === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Ff(l) {
    var t = bl(), u = t.queue;
    if (u === null) throw Error(m(311));
    u.lastRenderedReducer = l;
    var a = u.dispatch, e = u.pending, n = t.memoizedState;
    if (e !== null) {
      u.pending = null;
      var f = e = e.next;
      do
        n = l(n, f.action), f = f.next;
      while (f !== e);
      Il(n, t.memoizedState) || (El = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), u.lastRenderedState = n;
    }
    return [n, a];
  }
  function p0(l, t, u) {
    var a = Q, e = bl(), n = J;
    if (n) {
      if (u === void 0) throw Error(m(407));
      u = u();
    } else u = t();
    var f = !Il(
      (tl || e).memoizedState,
      u
    );
    if (f && (e.memoizedState = u, El = !0), e = e.queue, Pf(X0.bind(null, a, e, l), [
      l
    ]), e.getSnapshot !== t || f || Tl !== null && Tl.memoizedState.tag & 1) {
      if (a.flags |= 2048, ha(
        9,
        { destroy: void 0 },
        Q0.bind(
          null,
          a,
          e,
          u,
          t
        ),
        null
      ), nl === null) throw Error(m(349));
      n || (pt & 127) !== 0 || G0(a, t, u);
    }
    return u;
  }
  function G0(l, t, u) {
    l.flags |= 16384, l = { getSnapshot: t, value: u }, t = Q.updateQueue, t === null ? (t = ln(), Q.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
  }
  function Q0(l, t, u, a) {
    t.value = u, t.getSnapshot = a, j0(t) && Z0(l);
  }
  function X0(l, t, u) {
    return u(function() {
      j0(t) && Z0(l);
    });
  }
  function j0(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var u = t();
      return !Il(l, u);
    } catch {
      return !0;
    }
  }
  function Z0(l) {
    var t = ru(l, 2);
    t !== null && Jl(t, l, 2);
  }
  function kf(l) {
    var t = Bl();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), Bu) {
        Wt(!0);
        try {
          u();
        } finally {
          Wt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Gt,
      lastRenderedState: l
    }, t;
  }
  function x0(l, t, u, a) {
    return l.baseState = u, $f(
      l,
      tl,
      typeof a == "function" ? a : Gt
    );
  }
  function Qd(l, t, u, a, e) {
    if (nn(l)) throw Error(m(485));
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
        then: function(f) {
          n.listeners.push(f);
        }
      };
      z.T !== null ? u(!0) : n.isTransition = !1, a(n), u = t.pending, u === null ? (n.next = t.pending = n, V0(t, n)) : (n.next = u.next, t.pending = u.next = n);
    }
  }
  function V0(l, t) {
    var u = t.action, a = t.payload, e = l.state;
    if (t.isTransition) {
      var n = z.T, f = {};
      z.T = f;
      try {
        var c = u(e, a), i = z.S;
        i !== null && i(f, c), L0(l, t, c);
      } catch (h) {
        If(l, t, h);
      } finally {
        n !== null && f.types !== null && (n.types = f.types), z.T = n;
      }
    } else
      try {
        n = u(e, a), L0(l, t, n);
      } catch (h) {
        If(l, t, h);
      }
  }
  function L0(l, t, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(a) {
        K0(l, t, a);
      },
      function(a) {
        return If(l, t, a);
      }
    ) : K0(l, t, u);
  }
  function K0(l, t, u) {
    t.status = "fulfilled", t.value = u, J0(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, V0(l, u)));
  }
  function If(l, t, u) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = u, J0(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function J0(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function w0(l, t) {
    return t;
  }
  function W0(l, t) {
    if (J) {
      var u = nl.formState;
      if (u !== null) {
        l: {
          var a = Q;
          if (J) {
            if (il) {
              t: {
                for (var e = il, n = dt; e.nodeType !== 8; ) {
                  if (!n) {
                    e = null;
                    break t;
                  }
                  if (e = ot(
                    e.nextSibling
                  ), e === null) {
                    e = null;
                    break t;
                  }
                }
                n = e.data, e = n === "F!" || n === "F" ? e : null;
              }
              if (e) {
                il = ot(
                  e.nextSibling
                ), a = e.data === "F!";
                break l;
              }
            }
            Pt(a);
          }
          a = !1;
        }
        a && (t = u[0]);
      }
    }
    return u = Bl(), u.memoizedState = u.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: w0,
      lastRenderedState: t
    }, u.queue = a, u = hy.bind(
      null,
      Q,
      a
    ), a.dispatch = u, a = kf(!1), n = ec.bind(
      null,
      Q,
      !1,
      a.queue
    ), a = Bl(), e = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = e, u = Qd.bind(
      null,
      Q,
      e,
      n,
      u
    ), e.dispatch = u, a.memoizedState = l, [t, u, !1];
  }
  function $0(l) {
    var t = bl();
    return F0(t, tl, l);
  }
  function F0(l, t, u) {
    if (t = $f(
      l,
      t,
      w0
    )[0], l = un(Gt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = ka(t);
      } catch (f) {
        throw f === ia ? Je : f;
      }
    else a = t;
    t = bl();
    var e = t.queue, n = e.dispatch;
    return u !== t.memoizedState && (Q.flags |= 2048, ha(
      9,
      { destroy: void 0 },
      Xd.bind(null, e, u),
      null
    )), [a, n, l];
  }
  function Xd(l, t) {
    l.action = t;
  }
  function k0(l) {
    var t = bl(), u = tl;
    if (u !== null)
      return F0(t, u, l);
    bl(), t = t.memoizedState, u = bl();
    var a = u.queue.dispatch;
    return u.memoizedState = l, [t, a, !1];
  }
  function ha(l, t, u, a) {
    return l = { tag: l, create: u, deps: a, inst: t, next: null }, t = Q.updateQueue, t === null && (t = ln(), Q.updateQueue = t), u = t.lastEffect, u === null ? t.lastEffect = l.next = l : (a = u.next, u.next = l, l.next = a, t.lastEffect = l), l;
  }
  function I0() {
    return bl().memoizedState;
  }
  function an(l, t, u, a) {
    var e = Bl();
    Q.flags |= l, e.memoizedState = ha(
      1 | t,
      { destroy: void 0 },
      u,
      a === void 0 ? null : a
    );
  }
  function en(l, t, u, a) {
    var e = bl();
    a = a === void 0 ? null : a;
    var n = e.memoizedState.inst;
    tl !== null && a !== null && Vf(a, tl.memoizedState.deps) ? e.memoizedState = ha(t, n, u, a) : (Q.flags |= l, e.memoizedState = ha(
      1 | t,
      n,
      u,
      a
    ));
  }
  function P0(l, t) {
    an(8390656, 8, l, t);
  }
  function Pf(l, t) {
    en(2048, 8, l, t);
  }
  function jd(l) {
    Q.flags |= 4;
    var t = Q.updateQueue;
    if (t === null)
      t = ln(), Q.updateQueue = t, t.events = [l];
    else {
      var u = t.events;
      u === null ? t.events = [l] : u.push(l);
    }
  }
  function ly(l) {
    var t = bl().memoizedState;
    return jd({ ref: t, nextImpl: l }), function() {
      if (($ & 2) !== 0) throw Error(m(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ty(l, t) {
    return en(4, 2, l, t);
  }
  function uy(l, t) {
    return en(4, 4, l, t);
  }
  function ay(l, t) {
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
  function ey(l, t, u) {
    u = u != null ? u.concat([l]) : null, en(4, 4, ay.bind(null, t, l), u);
  }
  function lc() {
  }
  function ny(l, t) {
    var u = bl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    return t !== null && Vf(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
  }
  function fy(l, t) {
    var u = bl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    if (t !== null && Vf(t, a[1]))
      return a[0];
    if (a = l(), Bu) {
      Wt(!0);
      try {
        l();
      } finally {
        Wt(!1);
      }
    }
    return u.memoizedState = [a, t], a;
  }
  function tc(l, t, u) {
    return u === void 0 || (pt & 1073741824) !== 0 && (V & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = u, l = cv(), Q.lanes |= l, iu |= l, u);
  }
  function cy(l, t, u, a) {
    return Il(u, t) ? u : va.current !== null ? (l = tc(l, u, a), Il(l, t) || (El = !0), l) : (pt & 42) === 0 || (pt & 1073741824) !== 0 && (V & 261930) === 0 ? (El = !0, l.memoizedState = u) : (l = cv(), Q.lanes |= l, iu |= l, t);
  }
  function iy(l, t, u, a, e) {
    var n = M.p;
    M.p = n !== 0 && 8 > n ? n : 8;
    var f = z.T, c = {};
    z.T = c, ec(l, !1, t, u);
    try {
      var i = e(), h = z.S;
      if (h !== null && h(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
        var b = Bd(
          i,
          a
        );
        Ia(
          l,
          t,
          b,
          et(l)
        );
      } else
        Ia(
          l,
          t,
          a,
          et(l)
        );
    } catch (E) {
      Ia(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: E },
        et()
      );
    } finally {
      M.p = n, f !== null && c.types !== null && (f.types = c.types), z.T = f;
    }
  }
  function Zd() {
  }
  function uc(l, t, u, a) {
    if (l.tag !== 5) throw Error(m(476));
    var e = yy(l).queue;
    iy(
      l,
      e,
      t,
      B,
      u === null ? Zd : function() {
        return vy(l), u(a);
      }
    );
  }
  function yy(l) {
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
        lastRenderedReducer: Gt,
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
        lastRenderedReducer: Gt,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function vy(l) {
    var t = yy(l);
    t.next === null && (t = l.alternate.memoizedState), Ia(
      l,
      t.next.queue,
      {},
      et()
    );
  }
  function ac() {
    return Ul(me);
  }
  function sy() {
    return bl().memoizedState;
  }
  function dy() {
    return bl().memoizedState;
  }
  function xd(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var u = et();
          l = uu(u);
          var a = au(t, l, u);
          a !== null && (Jl(a, t, u), wa(a, t, u)), t = { cache: Rf() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Vd(l, t, u) {
    var a = et();
    u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, nn(l) ? oy(t, u) : (u = Ef(l, t, u, a), u !== null && (Jl(u, l, a), my(u, t, a)));
  }
  function hy(l, t, u) {
    var a = et();
    Ia(l, t, u, a);
  }
  function Ia(l, t, u, a) {
    var e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (nn(l)) oy(t, e);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var f = t.lastRenderedState, c = n(f, u);
          if (e.hasEagerState = !0, e.eagerState = c, Il(c, f))
            return Xe(l, t, e, 0), nl === null && Qe(), !1;
        } catch {
        } finally {
        }
      if (u = Ef(l, t, e, a), u !== null)
        return Jl(u, l, a), my(u, t, a), !0;
    }
    return !1;
  }
  function ec(l, t, u, a) {
    if (a = {
      lane: 2,
      revertLane: pc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, nn(l)) {
      if (t) throw Error(m(479));
    } else
      t = Ef(
        l,
        u,
        a,
        2
      ), t !== null && Jl(t, l, 2);
  }
  function nn(l) {
    var t = l.alternate;
    return l === Q || t !== null && t === Q;
  }
  function oy(l, t) {
    sa = Ie = !0;
    var u = l.pending;
    u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t;
  }
  function my(l, t, u) {
    if ((u & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, u |= a, t.lanes = u, Ti(l, u);
    }
  }
  var Pa = {
    readContext: Ul,
    use: tn,
    useCallback: ol,
    useContext: ol,
    useEffect: ol,
    useImperativeHandle: ol,
    useLayoutEffect: ol,
    useInsertionEffect: ol,
    useMemo: ol,
    useReducer: ol,
    useRef: ol,
    useState: ol,
    useDebugValue: ol,
    useDeferredValue: ol,
    useTransition: ol,
    useSyncExternalStore: ol,
    useId: ol,
    useHostTransitionStatus: ol,
    useFormState: ol,
    useActionState: ol,
    useOptimistic: ol,
    useMemoCache: ol,
    useCacheRefresh: ol
  };
  Pa.useEffectEvent = ol;
  var gy = {
    readContext: Ul,
    use: tn,
    useCallback: function(l, t) {
      return Bl().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: Ul,
    useEffect: P0,
    useImperativeHandle: function(l, t, u) {
      u = u != null ? u.concat([l]) : null, an(
        4194308,
        4,
        ay.bind(null, t, l),
        u
      );
    },
    useLayoutEffect: function(l, t) {
      return an(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      an(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var u = Bl();
      t = t === void 0 ? null : t;
      var a = l();
      if (Bu) {
        Wt(!0);
        try {
          l();
        } finally {
          Wt(!1);
        }
      }
      return u.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, u) {
      var a = Bl();
      if (u !== void 0) {
        var e = u(t);
        if (Bu) {
          Wt(!0);
          try {
            u(t);
          } finally {
            Wt(!1);
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
      var t = Bl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = kf(l);
      var t = l.queue, u = hy.bind(null, Q, t);
      return t.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: lc,
    useDeferredValue: function(l, t) {
      var u = Bl();
      return tc(u, l, t);
    },
    useTransition: function() {
      var l = kf(!1);
      return l = iy.bind(
        null,
        Q,
        l.queue,
        !0,
        !1
      ), Bl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, u) {
      var a = Q, e = Bl();
      if (J) {
        if (u === void 0)
          throw Error(m(407));
        u = u();
      } else {
        if (u = t(), nl === null)
          throw Error(m(349));
        (V & 127) !== 0 || G0(a, t, u);
      }
      e.memoizedState = u;
      var n = { value: u, getSnapshot: t };
      return e.queue = n, P0(X0.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, ha(
        9,
        { destroy: void 0 },
        Q0.bind(
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
      var l = Bl(), t = nl.identifierPrefix;
      if (J) {
        var u = Ot, a = _t;
        u = (a & ~(1 << 32 - kl(a) - 1)).toString(32) + u, t = "_" + t + "R_" + u, u = Pe++, 0 < u && (t += "H" + u.toString(32)), t += "_";
      } else
        u = pd++, t = "_" + t + "r_" + u.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: ac,
    useFormState: W0,
    useActionState: W0,
    useOptimistic: function(l) {
      var t = Bl();
      t.memoizedState = t.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = u, t = ec.bind(
        null,
        Q,
        !0,
        u
      ), u.dispatch = t, [l, t];
    },
    useMemoCache: Wf,
    useCacheRefresh: function() {
      return Bl().memoizedState = xd.bind(
        null,
        Q
      );
    },
    useEffectEvent: function(l) {
      var t = Bl(), u = { impl: l };
      return t.memoizedState = u, function() {
        if (($ & 2) !== 0)
          throw Error(m(440));
        return u.impl.apply(void 0, arguments);
      };
    }
  }, nc = {
    readContext: Ul,
    use: tn,
    useCallback: ny,
    useContext: Ul,
    useEffect: Pf,
    useImperativeHandle: ey,
    useInsertionEffect: ty,
    useLayoutEffect: uy,
    useMemo: fy,
    useReducer: un,
    useRef: I0,
    useState: function() {
      return un(Gt);
    },
    useDebugValue: lc,
    useDeferredValue: function(l, t) {
      var u = bl();
      return cy(
        u,
        tl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = un(Gt)[0], t = bl().memoizedState;
      return [
        typeof l == "boolean" ? l : ka(l),
        t
      ];
    },
    useSyncExternalStore: p0,
    useId: sy,
    useHostTransitionStatus: ac,
    useFormState: $0,
    useActionState: $0,
    useOptimistic: function(l, t) {
      var u = bl();
      return x0(u, tl, l, t);
    },
    useMemoCache: Wf,
    useCacheRefresh: dy
  };
  nc.useEffectEvent = ly;
  var Sy = {
    readContext: Ul,
    use: tn,
    useCallback: ny,
    useContext: Ul,
    useEffect: Pf,
    useImperativeHandle: ey,
    useInsertionEffect: ty,
    useLayoutEffect: uy,
    useMemo: fy,
    useReducer: Ff,
    useRef: I0,
    useState: function() {
      return Ff(Gt);
    },
    useDebugValue: lc,
    useDeferredValue: function(l, t) {
      var u = bl();
      return tl === null ? tc(u, l, t) : cy(
        u,
        tl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Ff(Gt)[0], t = bl().memoizedState;
      return [
        typeof l == "boolean" ? l : ka(l),
        t
      ];
    },
    useSyncExternalStore: p0,
    useId: sy,
    useHostTransitionStatus: ac,
    useFormState: k0,
    useActionState: k0,
    useOptimistic: function(l, t) {
      var u = bl();
      return tl !== null ? x0(u, tl, l, t) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Wf,
    useCacheRefresh: dy
  };
  Sy.useEffectEvent = ly;
  function fc(l, t, u, a) {
    t = l.memoizedState, u = u(a, t), u = u == null ? t : Y({}, t, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var cc = {
    enqueueSetState: function(l, t, u) {
      l = l._reactInternals;
      var a = et(), e = uu(a);
      e.payload = t, u != null && (e.callback = u), t = au(l, e, a), t !== null && (Jl(t, l, a), wa(t, l, a));
    },
    enqueueReplaceState: function(l, t, u) {
      l = l._reactInternals;
      var a = et(), e = uu(a);
      e.tag = 1, e.payload = t, u != null && (e.callback = u), t = au(l, e, a), t !== null && (Jl(t, l, a), wa(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var u = et(), a = uu(u);
      a.tag = 2, t != null && (a.callback = t), t = au(l, a, u), t !== null && (Jl(t, l, u), wa(t, l, u));
    }
  };
  function by(l, t, u, a, e, n, f) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, f) : t.prototype && t.prototype.isPureReactComponent ? !Xa(u, a) || !Xa(e, n) : !0;
  }
  function zy(l, t, u, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(u, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(u, a), t.state !== l && cc.enqueueReplaceState(t, t.state, null);
  }
  function pu(l, t) {
    var u = t;
    if ("ref" in t) {
      u = {};
      for (var a in t)
        a !== "ref" && (u[a] = t[a]);
    }
    if (l = l.defaultProps) {
      u === t && (u = Y({}, u));
      for (var e in l)
        u[e] === void 0 && (u[e] = l[e]);
    }
    return u;
  }
  function Ty(l) {
    Ge(l);
  }
  function Ey(l) {
    console.error(l);
  }
  function Ay(l) {
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
  function _y(l, t, u) {
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
  function ic(l, t, u) {
    return u = uu(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      fn(l, t);
    }, u;
  }
  function Oy(l) {
    return l = uu(l), l.tag = 3, l;
  }
  function My(l, t, u, a) {
    var e = u.type.getDerivedStateFromError;
    if (typeof e == "function") {
      var n = a.value;
      l.payload = function() {
        return e(n);
      }, l.callback = function() {
        _y(t, u, a);
      };
    }
    var f = u.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
      _y(t, u, a), typeof e != "function" && (yu === null ? yu = /* @__PURE__ */ new Set([this]) : yu.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function Ld(l, t, u, a, e) {
    if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = u.alternate, t !== null && na(
        t,
        u,
        e,
        !0
      ), u = lt.current, u !== null) {
        switch (u.tag) {
          case 31:
          case 13:
            return ht === null ? zn() : u.alternate === null && ml === 0 && (ml = 3), u.flags &= -257, u.flags |= 65536, u.lanes = e, a === we ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Cc(l, a, e)), !1;
          case 22:
            return u.flags |= 65536, a === we ? u.flags |= 16384 : (t = u.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, u.updateQueue = t) : (u = t.retryQueue, u === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : u.add(a)), Cc(l, a, e)), !1;
        }
        throw Error(m(435, u.tag));
      }
      return Cc(l, a, e), zn(), !1;
    }
    if (J)
      return t = lt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = e, a !== Df && (l = Error(m(422), { cause: a }), xa(yt(l, u)))) : (a !== Df && (t = Error(m(423), {
        cause: a
      }), xa(
        yt(t, u)
      )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, a = yt(a, u), e = ic(
        l.stateNode,
        a,
        e
      ), Qf(l, e), ml !== 4 && (ml = 2)), !1;
    var n = Error(m(520), { cause: a });
    if (n = yt(n, u), ce === null ? ce = [n] : ce.push(n), ml !== 4 && (ml = 2), t === null) return !0;
    a = yt(a, u), u = t;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = e & -e, u.lanes |= l, l = ic(u.stateNode, a, l), Qf(u, l), !1;
        case 1:
          if (t = u.type, n = u.stateNode, (u.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (yu === null || !yu.has(n))))
            return u.flags |= 65536, e &= -e, u.lanes |= e, e = Oy(e), My(
              e,
              l,
              u,
              a
            ), Qf(u, e), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var yc = Error(m(461)), El = !1;
  function Hl(l, t, u, a) {
    t.child = l === null ? H0(t, null, u, a) : Yu(
      t,
      l.child,
      u,
      a
    );
  }
  function ry(l, t, u, a, e) {
    u = u.render;
    var n = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var c in a)
        c !== "ref" && (f[c] = a[c]);
    } else f = a;
    return Nu(t), a = Lf(
      l,
      t,
      u,
      f,
      n,
      e
    ), c = Kf(), l !== null && !El ? (Jf(l, t, e), Qt(l, t, e)) : (J && c && Mf(t), t.flags |= 1, Hl(l, t, a, e), t.child);
  }
  function Dy(l, t, u, a, e) {
    if (l === null) {
      var n = u.type;
      return typeof n == "function" && !Af(n) && n.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = n, Uy(
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
    if (n = l.child, !Sc(l, e)) {
      var f = n.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Xa, u(f, a) && l.ref === t.ref)
        return Qt(l, t, e);
    }
    return t.flags |= 1, l = Rt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Uy(l, t, u, a, e) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Xa(n, a) && l.ref === t.ref)
        if (El = !1, t.pendingProps = a = n, Sc(l, e))
          (l.flags & 131072) !== 0 && (El = !0);
        else
          return t.lanes = l.lanes, Qt(l, t, e);
    }
    return vc(
      l,
      t,
      u,
      a,
      e
    );
  }
  function Hy(l, t, u, a) {
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
        return Ny(
          l,
          t,
          n,
          u,
          a
        );
      }
      if ((u & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Ke(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? R0(t, n) : jf(), C0(t);
      else
        return a = t.lanes = 536870912, Ny(
          l,
          t,
          n !== null ? n.baseLanes | u : u,
          u,
          a
        );
    } else
      n !== null ? (Ke(t, n.cachePool), R0(t, n), nu(), t.memoizedState = null) : (l !== null && Ke(t, null), jf(), nu());
    return Hl(l, t, e, u), t.child;
  }
  function le(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Ny(l, t, u, a, e) {
    var n = Yf();
    return n = n === null ? null : { parent: zl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: u,
      cachePool: n
    }, l !== null && Ke(t, null), jf(), C0(t), l !== null && na(l, t, a, !0), t.childLanes = e, null;
  }
  function cn(l, t) {
    return t = vn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function qy(l, t, u) {
    return Yu(t, l.child, null, u), l = cn(t, t.pendingProps), l.flags |= 2, tt(t), t.memoizedState = null, l;
  }
  function Kd(l, t, u) {
    var a = t.pendingProps, e = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (J) {
        if (a.mode === "hidden")
          return l = cn(t, a), t.lanes = 536870912, le(null, l);
        if (xf(t), (l = il) ? (l = Vv(
          l,
          dt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: kt !== null ? { id: _t, overflow: Ot } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = o0(l), u.return = t, t.child = u, Dl = t, il = null)) : l = null, l === null) throw Pt(t);
        return t.lanes = 536870912, null;
      }
      return cn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var f = n.dehydrated;
      if (xf(t), e)
        if (t.flags & 256)
          t.flags &= -257, t = qy(
            l,
            t,
            u
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(m(558));
      else if (El || na(l, t, u, !1), e = (u & l.childLanes) !== 0, El || e) {
        if (a = nl, a !== null && (f = Ei(a, u), f !== 0 && f !== n.retryLane))
          throw n.retryLane = f, ru(l, f), Jl(a, l, f), yc;
        zn(), t = qy(
          l,
          t,
          u
        );
      } else
        l = n.treeContext, il = ot(f.nextSibling), Dl = t, J = !0, It = null, dt = !1, l !== null && S0(t, l), t = cn(t, a), t.flags |= 4096;
      return t;
    }
    return l = Rt(l.child, {
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
  function vc(l, t, u, a, e) {
    return Nu(t), u = Lf(
      l,
      t,
      u,
      a,
      void 0,
      e
    ), a = Kf(), l !== null && !El ? (Jf(l, t, e), Qt(l, t, e)) : (J && a && Mf(t), t.flags |= 1, Hl(l, t, u, e), t.child);
  }
  function Ry(l, t, u, a, e, n) {
    return Nu(t), t.updateQueue = null, u = B0(
      t,
      a,
      u,
      e
    ), Y0(l), a = Kf(), l !== null && !El ? (Jf(l, t, n), Qt(l, t, n)) : (J && a && Mf(t), t.flags |= 1, Hl(l, t, u, n), t.child);
  }
  function Cy(l, t, u, a, e) {
    if (Nu(t), t.stateNode === null) {
      var n = ta, f = u.contextType;
      typeof f == "object" && f !== null && (n = Ul(f)), n = new u(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = cc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, pf(t), f = u.contextType, n.context = typeof f == "object" && f !== null ? Ul(f) : ta, n.state = t.memoizedState, f = u.getDerivedStateFromProps, typeof f == "function" && (fc(
        t,
        u,
        f,
        a
      ), n.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && cc.enqueueReplaceState(n, n.state, null), $a(t, a, n, e), Wa(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, i = pu(u, c);
      n.props = i;
      var h = n.context, b = u.contextType;
      f = ta, typeof b == "object" && b !== null && (f = Ul(b));
      var E = u.getDerivedStateFromProps;
      b = typeof E == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, b || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || h !== f) && zy(
        t,
        n,
        a,
        f
      ), tu = !1;
      var o = t.memoizedState;
      n.state = o, $a(t, a, n, e), Wa(), h = t.memoizedState, c || o !== h || tu ? (typeof E == "function" && (fc(
        t,
        u,
        E,
        a
      ), h = t.memoizedState), (i = tu || by(
        t,
        u,
        i,
        a,
        o,
        h,
        f
      )) ? (b || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = h), n.props = a, n.state = h, n.context = f, a = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, Gf(l, t), f = t.memoizedProps, b = pu(u, f), n.props = b, E = t.pendingProps, o = n.context, h = u.contextType, i = ta, typeof h == "object" && h !== null && (i = Ul(h)), c = u.getDerivedStateFromProps, (h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== E || o !== i) && zy(
        t,
        n,
        a,
        i
      ), tu = !1, o = t.memoizedState, n.state = o, $a(t, a, n, e), Wa();
      var S = t.memoizedState;
      f !== E || o !== S || tu || l !== null && l.dependencies !== null && Ve(l.dependencies) ? (typeof c == "function" && (fc(
        t,
        u,
        c,
        a
      ), S = t.memoizedState), (b = tu || by(
        t,
        u,
        b,
        a,
        o,
        S,
        i
      ) || l !== null && l.dependencies !== null && Ve(l.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, S, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        S,
        i
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && o === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && o === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = S), n.props = a, n.state = S, n.context = i, a = b) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && o === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && o === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, yn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = Yu(
      t,
      l.child,
      null,
      e
    ), t.child = Yu(
      t,
      null,
      u,
      e
    )) : Hl(l, t, u, e), t.memoizedState = n.state, l = t.child) : l = Qt(
      l,
      t,
      e
    ), l;
  }
  function Yy(l, t, u, a) {
    return Uu(), t.flags |= 256, Hl(l, t, u, a), t.child;
  }
  var sc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function dc(l) {
    return { baseLanes: l, cachePool: _0() };
  }
  function hc(l, t, u) {
    return l = l !== null ? l.childLanes & ~u : 0, t && (l |= at), l;
  }
  function By(l, t, u) {
    var a = t.pendingProps, e = !1, n = (t.flags & 128) !== 0, f;
    if ((f = n) || (f = l !== null && l.memoizedState === null ? !1 : (Sl.current & 2) !== 0), f && (e = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (J) {
        if (e ? eu(t) : nu(), (l = il) ? (l = Vv(
          l,
          dt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: kt !== null ? { id: _t, overflow: Ot } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = o0(l), u.return = t, t.child = u, Dl = t, il = null)) : l = null, l === null) throw Pt(t);
        return $c(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, e ? (nu(), e = t.mode, c = vn(
        { mode: "hidden", children: c },
        e
      ), a = Du(
        a,
        e,
        u,
        null
      ), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = dc(u), a.childLanes = hc(
        l,
        f,
        u
      ), t.memoizedState = sc, le(null, a)) : (eu(t), oc(t, c));
    }
    var i = l.memoizedState;
    if (i !== null && (c = i.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (eu(t), t.flags &= -257, t = mc(
          l,
          t,
          u
        )) : t.memoizedState !== null ? (nu(), t.child = l.child, t.flags |= 128, t = null) : (nu(), c = a.fallback, e = t.mode, a = vn(
          { mode: "visible", children: a.children },
          e
        ), c = Du(
          c,
          e,
          u,
          null
        ), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, Yu(
          t,
          l.child,
          null,
          u
        ), a = t.child, a.memoizedState = dc(u), a.childLanes = hc(
          l,
          f,
          u
        ), t.memoizedState = sc, t = le(null, a));
      else if (eu(t), $c(c)) {
        if (f = c.nextSibling && c.nextSibling.dataset, f) var h = f.dgst;
        f = h, a = Error(m(419)), a.stack = "", a.digest = f, xa({ value: a, source: null, stack: null }), t = mc(
          l,
          t,
          u
        );
      } else if (El || na(l, t, u, !1), f = (u & l.childLanes) !== 0, El || f) {
        if (f = nl, f !== null && (a = Ei(f, u), a !== 0 && a !== i.retryLane))
          throw i.retryLane = a, ru(l, a), Jl(f, l, a), yc;
        Wc(c) || zn(), t = mc(
          l,
          t,
          u
        );
      } else
        Wc(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, il = ot(
          c.nextSibling
        ), Dl = t, J = !0, It = null, dt = !1, l !== null && S0(t, l), t = oc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return e ? (nu(), c = a.fallback, e = t.mode, i = l.child, h = i.sibling, a = Rt(i, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = i.subtreeFlags & 65011712, h !== null ? c = Rt(
      h,
      c
    ) : (c = Du(
      c,
      e,
      u,
      null
    ), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, le(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = dc(u) : (e = c.cachePool, e !== null ? (i = zl._currentValue, e = e.parent !== i ? { parent: i, pool: i } : e) : e = _0(), c = {
      baseLanes: c.baseLanes | u,
      cachePool: e
    }), a.memoizedState = c, a.childLanes = hc(
      l,
      f,
      u
    ), t.memoizedState = sc, le(l.child, a)) : (eu(t), u = l.child, l = u.sibling, u = Rt(u, {
      mode: "visible",
      children: a.children
    }), u.return = t, u.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = u, t.memoizedState = null, u);
  }
  function oc(l, t) {
    return t = vn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function vn(l, t) {
    return l = Pl(22, l, null, t), l.lanes = 0, l;
  }
  function mc(l, t, u) {
    return Yu(t, l.child, null, u), l = oc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function py(l, t, u) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Nf(l.return, t, u);
  }
  function gc(l, t, u, a, e, n) {
    var f = l.memoizedState;
    f === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: u,
      tailMode: e,
      treeForkCount: n
    } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = a, f.tail = u, f.tailMode = e, f.treeForkCount = n);
  }
  function Gy(l, t, u) {
    var a = t.pendingProps, e = a.revealOrder, n = a.tail;
    a = a.children;
    var f = Sl.current, c = (f & 2) !== 0;
    if (c ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, D(Sl, f), Hl(l, t, a, u), a = J ? Za : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && py(l, u, t);
        else if (l.tag === 19)
          py(l, u, t);
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
          l = u.alternate, l !== null && ke(l) === null && (e = u), u = u.sibling;
        u = e, u === null ? (e = t.child, t.child = null) : (e = u.sibling, u.sibling = null), gc(
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
          if (l = e.alternate, l !== null && ke(l) === null) {
            t.child = e;
            break;
          }
          l = e.sibling, e.sibling = u, u = e, e = l;
        }
        gc(
          t,
          !0,
          u,
          null,
          n,
          a
        );
        break;
      case "together":
        gc(
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
  function Qt(l, t, u) {
    if (l !== null && (t.dependencies = l.dependencies), iu |= t.lanes, (u & t.childLanes) === 0)
      if (l !== null) {
        if (na(
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
      for (l = t.child, u = Rt(l, l.pendingProps), t.child = u, u.return = t; l.sibling !== null; )
        l = l.sibling, u = u.sibling = Rt(l, l.pendingProps), u.return = t;
      u.sibling = null;
    }
    return t.child;
  }
  function Sc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Ve(l)));
  }
  function Jd(l, t, u) {
    switch (t.tag) {
      case 3:
        Yl(t, t.stateNode.containerInfo), lu(t, zl, l.memoizedState.cache), Uu();
        break;
      case 27:
      case 5:
        ra(t);
        break;
      case 4:
        Yl(t, t.stateNode.containerInfo);
        break;
      case 10:
        lu(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, xf(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (eu(t), t.flags |= 128, null) : (u & t.child.childLanes) !== 0 ? By(l, t, u) : (eu(t), l = Qt(
            l,
            t,
            u
          ), l !== null ? l.sibling : null);
        eu(t);
        break;
      case 19:
        var e = (l.flags & 128) !== 0;
        if (a = (u & t.childLanes) !== 0, a || (na(
          l,
          t,
          u,
          !1
        ), a = (u & t.childLanes) !== 0), e) {
          if (a)
            return Gy(
              l,
              t,
              u
            );
          t.flags |= 128;
        }
        if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), D(Sl, Sl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Hy(
          l,
          t,
          u,
          t.pendingProps
        );
      case 24:
        lu(t, zl, l.memoizedState.cache);
    }
    return Qt(l, t, u);
  }
  function Qy(l, t, u) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        El = !0;
      else {
        if (!Sc(l, u) && (t.flags & 128) === 0)
          return El = !1, Jd(
            l,
            t,
            u
          );
        El = (l.flags & 131072) !== 0;
      }
    else
      El = !1, J && (t.flags & 1048576) !== 0 && g0(t, Za, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = Ru(t.elementType), t.type = l, typeof l == "function")
            Af(l) ? (a = pu(l, a), t.tag = 1, t = Cy(
              null,
              t,
              l,
              a,
              u
            )) : (t.tag = 0, t = vc(
              null,
              t,
              l,
              a,
              u
            ));
          else {
            if (l != null) {
              var e = l.$$typeof;
              if (e === nt) {
                t.tag = 11, t = ry(
                  null,
                  t,
                  l,
                  a,
                  u
                );
                break l;
              } else if (e === K) {
                t.tag = 14, t = Dy(
                  null,
                  t,
                  l,
                  a,
                  u
                );
                break l;
              }
            }
            throw t = Ut(l) || l, Error(m(306, t, ""));
          }
        }
        return t;
      case 0:
        return vc(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 1:
        return a = t.type, e = pu(
          a,
          t.pendingProps
        ), Cy(
          l,
          t,
          a,
          e,
          u
        );
      case 3:
        l: {
          if (Yl(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(m(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          e = n.element, Gf(l, t), $a(t, a, null, u);
          var f = t.memoizedState;
          if (a = f.cache, lu(t, zl, a), a !== n.cache && qf(
            t,
            [zl],
            u,
            !0
          ), Wa(), a = f.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: f.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Yy(
                l,
                t,
                a,
                u
              );
              break l;
            } else if (a !== e) {
              e = yt(
                Error(m(424)),
                t
              ), xa(e), t = Yy(
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
              for (il = ot(l.firstChild), Dl = t, J = !0, It = null, dt = !0, u = H0(
                t,
                null,
                a,
                u
              ), t.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
            }
          else {
            if (Uu(), a === e) {
              t = Qt(
                l,
                t,
                u
              );
              break l;
            }
            Hl(l, t, a, u);
          }
          t = t.child;
        }
        return t;
      case 26:
        return yn(l, t), l === null ? (u = $v(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = u : J || (u = t.type, l = t.pendingProps, a = rn(
          j.current
        ).createElement(u), a[rl] = t, a[jl] = l, Nl(a, u, l), Ol(a), t.stateNode = a) : t.memoizedState = $v(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return ra(t), l === null && J && (a = t.stateNode = Jv(
          t.type,
          t.pendingProps,
          j.current
        ), Dl = t, dt = !0, e = il, hu(t.type) ? (Fc = e, il = ot(a.firstChild)) : il = e), Hl(
          l,
          t,
          t.pendingProps.children,
          u
        ), yn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && J && ((e = a = il) && (a = Ah(
          a,
          t.type,
          t.pendingProps,
          dt
        ), a !== null ? (t.stateNode = a, Dl = t, il = ot(a.firstChild), dt = !1, e = !0) : e = !1), e || Pt(t)), ra(t), e = t.type, n = t.pendingProps, f = l !== null ? l.memoizedProps : null, a = n.children, Kc(e, n) ? a = null : f !== null && Kc(e, f) && (t.flags |= 32), t.memoizedState !== null && (e = Lf(
          l,
          t,
          Gd,
          null,
          null,
          u
        ), me._currentValue = e), yn(l, t), Hl(l, t, a, u), t.child;
      case 6:
        return l === null && J && ((l = u = il) && (u = _h(
          u,
          t.pendingProps,
          dt
        ), u !== null ? (t.stateNode = u, Dl = t, il = null, l = !0) : l = !1), l || Pt(t)), null;
      case 13:
        return By(l, t, u);
      case 4:
        return Yl(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = Yu(
          t,
          null,
          a,
          u
        ) : Hl(l, t, a, u), t.child;
      case 11:
        return ry(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 7:
        return Hl(
          l,
          t,
          t.pendingProps,
          u
        ), t.child;
      case 8:
        return Hl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 12:
        return Hl(
          l,
          t,
          t.pendingProps.children,
          u
        ), t.child;
      case 10:
        return a = t.pendingProps, lu(t, t.type, a.value), Hl(l, t, a.children, u), t.child;
      case 9:
        return e = t.type._context, a = t.pendingProps.children, Nu(t), e = Ul(e), a = a(e), t.flags |= 1, Hl(l, t, a, u), t.child;
      case 14:
        return Dy(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 15:
        return Uy(
          l,
          t,
          t.type,
          t.pendingProps,
          u
        );
      case 19:
        return Gy(l, t, u);
      case 31:
        return Kd(l, t, u);
      case 22:
        return Hy(
          l,
          t,
          u,
          t.pendingProps
        );
      case 24:
        return Nu(t), a = Ul(zl), l === null ? (e = Yf(), e === null && (e = nl, n = Rf(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= u), e = n), t.memoizedState = { parent: a, cache: e }, pf(t), lu(t, zl, e)) : ((l.lanes & u) !== 0 && (Gf(l, t), $a(t, null, null, u), Wa()), e = l.memoizedState, n = t.memoizedState, e.parent !== a ? (e = { parent: a, cache: a }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), lu(t, zl, a)) : (a = n.cache, lu(t, zl, a), a !== e.cache && qf(
          t,
          [zl],
          u,
          !0
        ))), Hl(
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
  function Xt(l) {
    l.flags |= 4;
  }
  function bc(l, t, u, a, e) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (e & 335544128) === e)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (sv()) l.flags |= 8192;
        else
          throw Cu = we, Bf;
    } else l.flags &= -16777217;
  }
  function Xy(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !ls(t))
      if (sv()) l.flags |= 8192;
      else
        throw Cu = we, Bf;
  }
  function sn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? bi() : 536870912, l.lanes |= t, Sa |= t);
  }
  function te(l, t) {
    if (!J)
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
  function yl(l) {
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
    switch (rf(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return yl(t), null;
      case 1:
        return yl(t), null;
      case 3:
        return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Bt(zl), gl(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (ea(t) ? Xt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Uf())), yl(t), null;
      case 26:
        var e = t.type, n = t.memoizedState;
        return l === null ? (Xt(t), n !== null ? (yl(t), Xy(t, n)) : (yl(t), bc(
          t,
          e,
          null,
          a,
          u
        ))) : n ? n !== l.memoizedState ? (Xt(t), yl(t), Xy(t, n)) : (yl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Xt(t), yl(t), bc(
          t,
          e,
          l,
          a,
          u
        )), null;
      case 27:
        if (Ee(t), u = j.current, e = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && Xt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(m(166));
            return yl(t), null;
          }
          l = H.current, ea(t) ? b0(t) : (l = Jv(e, a, u), t.stateNode = l, Xt(t));
        }
        return yl(t), null;
      case 5:
        if (Ee(t), e = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && Xt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(m(166));
            return yl(t), null;
          }
          if (n = H.current, ea(t))
            b0(t);
          else {
            var f = rn(
              j.current
            );
            switch (n) {
              case 1:
                n = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  e
                );
                break;
              case 2:
                n = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  e
                );
                break;
              default:
                switch (e) {
                  case "svg":
                    n = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      e
                    );
                    break;
                  case "math":
                    n = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      e
                    );
                    break;
                  case "script":
                    n = f.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? f.createElement("select", {
                      is: a.is
                    }) : f.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? f.createElement(e, { is: a.is }) : f.createElement(e);
                }
            }
            n[rl] = t, n[jl] = a;
            l: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                n.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === t) break l;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t)
                  break l;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            t.stateNode = n;
            l: switch (Nl(n, e, a), e) {
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
            a && Xt(t);
          }
        }
        return yl(t), bc(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          u
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && Xt(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(m(166));
          if (l = j.current, ea(t)) {
            if (l = t.stateNode, u = t.memoizedProps, a = null, e = Dl, e !== null)
              switch (e.tag) {
                case 27:
                case 5:
                  a = e.memoizedProps;
              }
            l[rl] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || Bv(l.nodeValue, u)), l || Pt(t, !0);
          } else
            l = rn(l).createTextNode(
              a
            ), l[rl] = t, t.stateNode = l;
        }
        return yl(t), null;
      case 31:
        if (u = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = ea(t), u !== null) {
            if (l === null) {
              if (!a) throw Error(m(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(557));
              l[rl] = t;
            } else
              Uu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yl(t), l = !1;
          } else
            u = Uf(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), l = !0;
          if (!l)
            return t.flags & 256 ? (tt(t), t) : (tt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(m(558));
        }
        return yl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (e = ea(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!e) throw Error(m(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(m(317));
              e[rl] = t;
            } else
              Uu(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yl(t), e = !1;
          } else
            e = Uf(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
          if (!e)
            return t.flags & 256 ? (tt(t), t) : (tt(t), null);
        }
        return tt(t), (t.flags & 128) !== 0 ? (t.lanes = u, t) : (u = a !== null, l = l !== null && l.memoizedState !== null, u && (a = t.child, e = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (e = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== e && (a.flags |= 2048)), u !== l && u && (t.child.flags |= 8192), sn(t, t.updateQueue), yl(t), null);
      case 4:
        return gl(), l === null && jc(t.stateNode.containerInfo), yl(t), null;
      case 10:
        return Bt(t.type), yl(t), null;
      case 19:
        if (A(Sl), a = t.memoizedState, a === null) return yl(t), null;
        if (e = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (e) te(a, !1);
          else {
            if (ml !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = ke(l), n !== null) {
                  for (t.flags |= 128, te(a, !1), l = n.updateQueue, t.updateQueue = l, sn(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; )
                    h0(u, l), u = u.sibling;
                  return D(
                    Sl,
                    Sl.current & 1 | 2
                  ), J && Ct(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && $l() > gn && (t.flags |= 128, e = !0, te(a, !1), t.lanes = 4194304);
          }
        else {
          if (!e)
            if (l = ke(n), l !== null) {
              if (t.flags |= 128, e = !0, l = l.updateQueue, t.updateQueue = l, sn(t, l), te(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !J)
                return yl(t), null;
            } else
              2 * $l() - a.renderingStartTime > gn && u !== 536870912 && (t.flags |= 128, e = !0, te(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = $l(), l.sibling = null, u = Sl.current, D(
          Sl,
          e ? u & 1 | 2 : u & 1
        ), J && Ct(t, a.treeForkCount), l) : (yl(t), null);
      case 22:
      case 23:
        return tt(t), Zf(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (u & 536870912) !== 0 && (t.flags & 128) === 0 && (yl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : yl(t), u = t.updateQueue, u !== null && sn(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && A(qu), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), Bt(zl), yl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(m(156, t.tag));
  }
  function Wd(l, t) {
    switch (rf(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Bt(zl), gl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ee(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (tt(t), t.alternate === null)
            throw Error(m(340));
          Uu();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (tt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(m(340));
          Uu();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return A(Sl), null;
      case 4:
        return gl(), null;
      case 10:
        return Bt(t.type), null;
      case 22:
      case 23:
        return tt(t), Zf(), l !== null && A(qu), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Bt(zl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function jy(l, t) {
    switch (rf(t), t.tag) {
      case 3:
        Bt(zl), gl();
        break;
      case 26:
      case 27:
      case 5:
        Ee(t);
        break;
      case 4:
        gl();
        break;
      case 31:
        t.memoizedState !== null && tt(t);
        break;
      case 13:
        tt(t);
        break;
      case 19:
        A(Sl);
        break;
      case 10:
        Bt(t.type);
        break;
      case 22:
      case 23:
        tt(t), Zf(), l !== null && A(qu);
        break;
      case 24:
        Bt(zl);
    }
  }
  function ue(l, t) {
    try {
      var u = t.updateQueue, a = u !== null ? u.lastEffect : null;
      if (a !== null) {
        var e = a.next;
        u = e;
        do {
          if ((u.tag & l) === l) {
            a = void 0;
            var n = u.create, f = u.inst;
            a = n(), f.destroy = a;
          }
          u = u.next;
        } while (u !== e);
      }
    } catch (c) {
      P(t, t.return, c);
    }
  }
  function fu(l, t, u) {
    try {
      var a = t.updateQueue, e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var n = e.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var f = a.inst, c = f.destroy;
            if (c !== void 0) {
              f.destroy = void 0, e = t;
              var i = u, h = c;
              try {
                h();
              } catch (b) {
                P(
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
      P(t, t.return, b);
    }
  }
  function Zy(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var u = l.stateNode;
      try {
        q0(t, u);
      } catch (a) {
        P(l, l.return, a);
      }
    }
  }
  function xy(l, t, u) {
    u.props = pu(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (a) {
      P(l, t, a);
    }
  }
  function ae(l, t) {
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
      P(l, t, e);
    }
  }
  function Mt(l, t) {
    var u = l.ref, a = l.refCleanup;
    if (u !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (e) {
          P(l, t, e);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (e) {
          P(l, t, e);
        }
      else u.current = null;
  }
  function Vy(l) {
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
      P(l, l.return, e);
    }
  }
  function zc(l, t, u) {
    try {
      var a = l.stateNode;
      gh(a, l.type, u, t), a[jl] = t;
    } catch (e) {
      P(l, l.return, e);
    }
  }
  function Ly(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && hu(l.type) || l.tag === 4;
  }
  function Tc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Ly(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && hu(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ec(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(l), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = Nt));
    else if (a !== 4 && (a === 27 && hu(l.type) && (u = l.stateNode, t = null), l = l.child, l !== null))
      for (Ec(l, t, u), l = l.sibling; l !== null; )
        Ec(l, t, u), l = l.sibling;
  }
  function dn(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? u.insertBefore(l, t) : u.appendChild(l);
    else if (a !== 4 && (a === 27 && hu(l.type) && (u = l.stateNode), l = l.child, l !== null))
      for (dn(l, t, u), l = l.sibling; l !== null; )
        dn(l, t, u), l = l.sibling;
  }
  function Ky(l) {
    var t = l.stateNode, u = l.memoizedProps;
    try {
      for (var a = l.type, e = t.attributes; e.length; )
        t.removeAttributeNode(e[0]);
      Nl(t, a, u), t[rl] = l, t[jl] = u;
    } catch (n) {
      P(l, l.return, n);
    }
  }
  var jt = !1, Al = !1, Ac = !1, Jy = typeof WeakSet == "function" ? WeakSet : Set, Ml = null;
  function $d(l, t) {
    if (l = l.containerInfo, Vc = Cn, l = e0(l), mf(l)) {
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
            var f = 0, c = -1, i = -1, h = 0, b = 0, E = l, o = null;
            t: for (; ; ) {
              for (var S; E !== u || e !== 0 && E.nodeType !== 3 || (c = f + e), E !== n || a !== 0 && E.nodeType !== 3 || (i = f + a), E.nodeType === 3 && (f += E.nodeValue.length), (S = E.firstChild) !== null; )
                o = E, E = S;
              for (; ; ) {
                if (E === l) break t;
                if (o === u && ++h === e && (c = f), o === n && ++b === a && (i = f), (S = E.nextSibling) !== null) break;
                E = o, o = E.parentNode;
              }
              E = S;
            }
            u = c === -1 || i === -1 ? null : { start: c, end: i };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (Lc = { focusedElem: l, selectionRange: u }, Cn = !1, Ml = t; Ml !== null; )
      if (t = Ml, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Ml = l;
      else
        for (; Ml !== null; ) {
          switch (t = Ml, n = t.alternate, l = t.flags, t.tag) {
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
                  var U = pu(
                    u.type,
                    e
                  );
                  l = a.getSnapshotBeforeUpdate(
                    U,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (C) {
                  P(
                    u,
                    u.return,
                    C
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, u = l.nodeType, u === 9)
                  wc(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wc(l);
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
            l.return = t.return, Ml = l;
            break;
          }
          Ml = t.return;
        }
  }
  function wy(l, t, u) {
    var a = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        xt(l, u), a & 4 && ue(5, u);
        break;
      case 1:
        if (xt(l, u), a & 4)
          if (l = u.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (f) {
              P(u, u.return, f);
            }
          else {
            var e = pu(
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
            } catch (f) {
              P(
                u,
                u.return,
                f
              );
            }
          }
        a & 64 && Zy(u), a & 512 && ae(u, u.return);
        break;
      case 3:
        if (xt(l, u), a & 64 && (l = u.updateQueue, l !== null)) {
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
            q0(l, t);
          } catch (f) {
            P(u, u.return, f);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Ky(u);
      case 26:
      case 5:
        xt(l, u), t === null && a & 4 && Vy(u), a & 512 && ae(u, u.return);
        break;
      case 12:
        xt(l, u);
        break;
      case 31:
        xt(l, u), a & 4 && Fy(l, u);
        break;
      case 13:
        xt(l, u), a & 4 && ky(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = eh.bind(
          null,
          u
        ), Oh(l, u))));
        break;
      case 22:
        if (a = u.memoizedState !== null || jt, !a) {
          t = t !== null && t.memoizedState !== null || Al, e = jt;
          var n = Al;
          jt = a, (Al = t) && !n ? Vt(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : xt(l, u), jt = e, Al = n;
        }
        break;
      case 30:
        break;
      default:
        xt(l, u);
    }
  }
  function Wy(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Wy(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && kn(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var dl = null, xl = !1;
  function Zt(l, t, u) {
    for (u = u.child; u !== null; )
      $y(l, t, u), u = u.sibling;
  }
  function $y(l, t, u) {
    if (Fl && typeof Fl.onCommitFiberUnmount == "function")
      try {
        Fl.onCommitFiberUnmount(Da, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        Al || Mt(u, t), Zt(
          l,
          t,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        Al || Mt(u, t);
        var a = dl, e = xl;
        hu(u.type) && (dl = u.stateNode, xl = !1), Zt(
          l,
          t,
          u
        ), de(u.stateNode), dl = a, xl = e;
        break;
      case 5:
        Al || Mt(u, t);
      case 6:
        if (a = dl, e = xl, dl = null, Zt(
          l,
          t,
          u
        ), dl = a, xl = e, dl !== null)
          if (xl)
            try {
              (dl.nodeType === 9 ? dl.body : dl.nodeName === "HTML" ? dl.ownerDocument.body : dl).removeChild(u.stateNode);
            } catch (n) {
              P(
                u,
                t,
                n
              );
            }
          else
            try {
              dl.removeChild(u.stateNode);
            } catch (n) {
              P(
                u,
                t,
                n
              );
            }
        break;
      case 18:
        dl !== null && (xl ? (l = dl, Zv(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), Ma(l)) : Zv(dl, u.stateNode));
        break;
      case 4:
        a = dl, e = xl, dl = u.stateNode.containerInfo, xl = !0, Zt(
          l,
          t,
          u
        ), dl = a, xl = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        fu(2, u, t), Al || fu(4, u, t), Zt(
          l,
          t,
          u
        );
        break;
      case 1:
        Al || (Mt(u, t), a = u.stateNode, typeof a.componentWillUnmount == "function" && xy(
          u,
          t,
          a
        )), Zt(
          l,
          t,
          u
        );
        break;
      case 21:
        Zt(
          l,
          t,
          u
        );
        break;
      case 22:
        Al = (a = Al) || u.memoizedState !== null, Zt(
          l,
          t,
          u
        ), Al = a;
        break;
      default:
        Zt(
          l,
          t,
          u
        );
    }
  }
  function Fy(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Ma(l);
      } catch (u) {
        P(t, t.return, u);
      }
    }
  }
  function ky(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Ma(l);
      } catch (u) {
        P(t, t.return, u);
      }
  }
  function Fd(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Jy()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Jy()), t;
      default:
        throw Error(m(435, l.tag));
    }
  }
  function hn(l, t) {
    var u = Fd(l);
    t.forEach(function(a) {
      if (!u.has(a)) {
        u.add(a);
        var e = nh.bind(null, l, a);
        a.then(e, e);
      }
    });
  }
  function Vl(l, t) {
    var u = t.deletions;
    if (u !== null)
      for (var a = 0; a < u.length; a++) {
        var e = u[a], n = l, f = t, c = f;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (hu(c.type)) {
                dl = c.stateNode, xl = !1;
                break l;
              }
              break;
            case 5:
              dl = c.stateNode, xl = !1;
              break l;
            case 3:
            case 4:
              dl = c.stateNode.containerInfo, xl = !0;
              break l;
          }
          c = c.return;
        }
        if (dl === null) throw Error(m(160));
        $y(n, f, e), dl = null, xl = !1, n = e.alternate, n !== null && (n.return = null), e.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Iy(t, l), t = t.sibling;
  }
  var bt = null;
  function Iy(l, t) {
    var u = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Vl(t, l), Ll(l), a & 4 && (fu(3, l, l.return), ue(3, l), fu(5, l, l.return));
        break;
      case 1:
        Vl(t, l), Ll(l), a & 512 && (Al || u === null || Mt(u, u.return)), a & 64 && jt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? a : u.concat(a))));
        break;
      case 26:
        var e = bt;
        if (Vl(t, l), Ll(l), a & 512 && (Al || u === null || Mt(u, u.return)), a & 4) {
          var n = u !== null ? u.memoizedState : null;
          if (a = l.memoizedState, u === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, u = l.memoizedProps, e = e.ownerDocument || e;
                  t: switch (a) {
                    case "title":
                      n = e.getElementsByTagName("title")[0], (!n || n[Na] || n[rl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = e.createElement(a), e.head.insertBefore(
                        n,
                        e.querySelector("head > title")
                      )), Nl(n, a, u), n[rl] = l, Ol(n), a = n;
                      break l;
                    case "link":
                      var f = Iv(
                        "link",
                        "href",
                        e
                      ).get(a + (u.href || ""));
                      if (f) {
                        for (var c = 0; c < f.length; c++)
                          if (n = f[c], n.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && n.getAttribute("rel") === (u.rel == null ? null : u.rel) && n.getAttribute("title") === (u.title == null ? null : u.title) && n.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                            f.splice(c, 1);
                            break t;
                          }
                      }
                      n = e.createElement(a), Nl(n, a, u), e.head.appendChild(n);
                      break;
                    case "meta":
                      if (f = Iv(
                        "meta",
                        "content",
                        e
                      ).get(a + (u.content || ""))) {
                        for (c = 0; c < f.length; c++)
                          if (n = f[c], n.getAttribute("content") === (u.content == null ? null : "" + u.content) && n.getAttribute("name") === (u.name == null ? null : u.name) && n.getAttribute("property") === (u.property == null ? null : u.property) && n.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && n.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                            f.splice(c, 1);
                            break t;
                          }
                      }
                      n = e.createElement(a), Nl(n, a, u), e.head.appendChild(n);
                      break;
                    default:
                      throw Error(m(468, a));
                  }
                  n[rl] = l, Ol(n), a = n;
                }
                l.stateNode = a;
              } else
                Pv(
                  e,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = kv(
                e,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : n.count--, a === null ? Pv(
              e,
              l.type,
              l.stateNode
            ) : kv(
              e,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && zc(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        Vl(t, l), Ll(l), a & 512 && (Al || u === null || Mt(u, u.return)), u !== null && a & 4 && zc(
          l,
          l.memoizedProps,
          u.memoizedProps
        );
        break;
      case 5:
        if (Vl(t, l), Ll(l), a & 512 && (Al || u === null || Mt(u, u.return)), l.flags & 32) {
          e = l.stateNode;
          try {
            Wu(e, "");
          } catch (U) {
            P(l, l.return, U);
          }
        }
        a & 4 && l.stateNode != null && (e = l.memoizedProps, zc(
          l,
          e,
          u !== null ? u.memoizedProps : e
        )), a & 1024 && (Ac = !0);
        break;
      case 6:
        if (Vl(t, l), Ll(l), a & 4) {
          if (l.stateNode === null)
            throw Error(m(162));
          a = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = a;
          } catch (U) {
            P(l, l.return, U);
          }
        }
        break;
      case 3:
        if (Hn = null, e = bt, bt = Dn(t.containerInfo), Vl(t, l), bt = e, Ll(l), a & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            Ma(t.containerInfo);
          } catch (U) {
            P(l, l.return, U);
          }
        Ac && (Ac = !1, Py(l));
        break;
      case 4:
        a = bt, bt = Dn(
          l.stateNode.containerInfo
        ), Vl(t, l), Ll(l), bt = a;
        break;
      case 12:
        Vl(t, l), Ll(l);
        break;
      case 31:
        Vl(t, l), Ll(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, hn(l, a)));
        break;
      case 13:
        Vl(t, l), Ll(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (mn = $l()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, hn(l, a)));
        break;
      case 22:
        e = l.memoizedState !== null;
        var i = u !== null && u.memoizedState !== null, h = jt, b = Al;
        if (jt = h || e, Al = b || i, Vl(t, l), Al = b, jt = h, Ll(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = e ? t._visibility & -2 : t._visibility | 1, e && (u === null || i || jt || Al || Gu(l)), u = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (u === null) {
                i = u = t;
                try {
                  if (n = i.stateNode, e)
                    f = n.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                  else {
                    c = i.stateNode;
                    var E = i.memoizedProps.style, o = E != null && E.hasOwnProperty("display") ? E.display : null;
                    c.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
                  }
                } catch (U) {
                  P(i, i.return, U);
                }
              }
            } else if (t.tag === 6) {
              if (u === null) {
                i = t;
                try {
                  i.stateNode.nodeValue = e ? "" : i.memoizedProps;
                } catch (U) {
                  P(i, i.return, U);
                }
              }
            } else if (t.tag === 18) {
              if (u === null) {
                i = t;
                try {
                  var S = i.stateNode;
                  e ? xv(S, !0) : xv(i.stateNode, !1);
                } catch (U) {
                  P(i, i.return, U);
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
        Vl(t, l), Ll(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, hn(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Vl(t, l), Ll(l);
    }
  }
  function Ll(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var u, a = l.return; a !== null; ) {
          if (Ly(a)) {
            u = a;
            break;
          }
          a = a.return;
        }
        if (u == null) throw Error(m(160));
        switch (u.tag) {
          case 27:
            var e = u.stateNode, n = Tc(l);
            dn(l, n, e);
            break;
          case 5:
            var f = u.stateNode;
            u.flags & 32 && (Wu(f, ""), u.flags &= -33);
            var c = Tc(l);
            dn(l, c, f);
            break;
          case 3:
          case 4:
            var i = u.stateNode.containerInfo, h = Tc(l);
            Ec(
              l,
              h,
              i
            );
            break;
          default:
            throw Error(m(161));
        }
      } catch (b) {
        P(l, l.return, b);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function Py(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        Py(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function xt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        wy(l, t.alternate, t), t = t.sibling;
  }
  function Gu(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          fu(4, t, t.return), Gu(t);
          break;
        case 1:
          Mt(t, t.return);
          var u = t.stateNode;
          typeof u.componentWillUnmount == "function" && xy(
            t,
            t.return,
            u
          ), Gu(t);
          break;
        case 27:
          de(t.stateNode);
        case 26:
        case 5:
          Mt(t, t.return), Gu(t);
          break;
        case 22:
          t.memoizedState === null && Gu(t);
          break;
        case 30:
          Gu(t);
          break;
        default:
          Gu(t);
      }
      l = l.sibling;
    }
  }
  function Vt(l, t, u) {
    for (u = u && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, e = l, n = t, f = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Vt(
            e,
            n,
            u
          ), ue(4, n);
          break;
        case 1:
          if (Vt(
            e,
            n,
            u
          ), a = n, e = a.stateNode, typeof e.componentDidMount == "function")
            try {
              e.componentDidMount();
            } catch (h) {
              P(a, a.return, h);
            }
          if (a = n, e = a.updateQueue, e !== null) {
            var c = a.stateNode;
            try {
              var i = e.shared.hiddenCallbacks;
              if (i !== null)
                for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                  N0(i[e], c);
            } catch (h) {
              P(a, a.return, h);
            }
          }
          u && f & 64 && Zy(n), ae(n, n.return);
          break;
        case 27:
          Ky(n);
        case 26:
        case 5:
          Vt(
            e,
            n,
            u
          ), u && a === null && f & 4 && Vy(n), ae(n, n.return);
          break;
        case 12:
          Vt(
            e,
            n,
            u
          );
          break;
        case 31:
          Vt(
            e,
            n,
            u
          ), u && f & 4 && Fy(e, n);
          break;
        case 13:
          Vt(
            e,
            n,
            u
          ), u && f & 4 && ky(e, n);
          break;
        case 22:
          n.memoizedState === null && Vt(
            e,
            n,
            u
          ), ae(n, n.return);
          break;
        case 30:
          break;
        default:
          Vt(
            e,
            n,
            u
          );
      }
      t = t.sibling;
    }
  }
  function _c(l, t) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Va(u));
  }
  function Oc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Va(l));
  }
  function zt(l, t, u, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        lv(
          l,
          t,
          u,
          a
        ), t = t.sibling;
  }
  function lv(l, t, u, a) {
    var e = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        zt(
          l,
          t,
          u,
          a
        ), e & 2048 && ue(9, t);
        break;
      case 1:
        zt(
          l,
          t,
          u,
          a
        );
        break;
      case 3:
        zt(
          l,
          t,
          u,
          a
        ), e & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Va(l)));
        break;
      case 12:
        if (e & 2048) {
          zt(
            l,
            t,
            u,
            a
          ), l = t.stateNode;
          try {
            var n = t.memoizedProps, f = n.id, c = n.onPostCommit;
            typeof c == "function" && c(
              f,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (i) {
            P(t, t.return, i);
          }
        } else
          zt(
            l,
            t,
            u,
            a
          );
        break;
      case 31:
        zt(
          l,
          t,
          u,
          a
        );
        break;
      case 13:
        zt(
          l,
          t,
          u,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, f = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? zt(
          l,
          t,
          u,
          a
        ) : ee(l, t) : n._visibility & 2 ? zt(
          l,
          t,
          u,
          a
        ) : (n._visibility |= 2, oa(
          l,
          t,
          u,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), e & 2048 && _c(f, t);
        break;
      case 24:
        zt(
          l,
          t,
          u,
          a
        ), e & 2048 && Oc(t.alternate, t);
        break;
      default:
        zt(
          l,
          t,
          u,
          a
        );
    }
  }
  function oa(l, t, u, a, e) {
    for (e = e && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, f = t, c = u, i = a, h = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          oa(
            n,
            f,
            c,
            i,
            e
          ), ue(8, f);
          break;
        case 23:
          break;
        case 22:
          var b = f.stateNode;
          f.memoizedState !== null ? b._visibility & 2 ? oa(
            n,
            f,
            c,
            i,
            e
          ) : ee(
            n,
            f
          ) : (b._visibility |= 2, oa(
            n,
            f,
            c,
            i,
            e
          )), e && h & 2048 && _c(
            f.alternate,
            f
          );
          break;
        case 24:
          oa(
            n,
            f,
            c,
            i,
            e
          ), e && h & 2048 && Oc(f.alternate, f);
          break;
        default:
          oa(
            n,
            f,
            c,
            i,
            e
          );
      }
      t = t.sibling;
    }
  }
  function ee(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var u = l, a = t, e = a.flags;
        switch (a.tag) {
          case 22:
            ee(u, a), e & 2048 && _c(
              a.alternate,
              a
            );
            break;
          case 24:
            ee(u, a), e & 2048 && Oc(a.alternate, a);
            break;
          default:
            ee(u, a);
        }
        t = t.sibling;
      }
  }
  var ne = 8192;
  function ma(l, t, u) {
    if (l.subtreeFlags & ne)
      for (l = l.child; l !== null; )
        tv(
          l,
          t,
          u
        ), l = l.sibling;
  }
  function tv(l, t, u) {
    switch (l.tag) {
      case 26:
        ma(
          l,
          t,
          u
        ), l.flags & ne && l.memoizedState !== null && ph(
          u,
          bt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        ma(
          l,
          t,
          u
        );
        break;
      case 3:
      case 4:
        var a = bt;
        bt = Dn(l.stateNode.containerInfo), ma(
          l,
          t,
          u
        ), bt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = ne, ne = 16777216, ma(
          l,
          t,
          u
        ), ne = a) : ma(
          l,
          t,
          u
        ));
        break;
      default:
        ma(
          l,
          t,
          u
        );
    }
  }
  function uv(l) {
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
          Ml = a, ev(
            a,
            l
          );
        }
      uv(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        av(l), l = l.sibling;
  }
  function av(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        fe(l), l.flags & 2048 && fu(9, l, l.return);
        break;
      case 3:
        fe(l);
        break;
      case 12:
        fe(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, on(l)) : fe(l);
        break;
      default:
        fe(l);
    }
  }
  function on(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          Ml = a, ev(
            a,
            l
          );
        }
      uv(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          fu(8, t, t.return), on(t);
          break;
        case 22:
          u = t.stateNode, u._visibility & 2 && (u._visibility &= -3, on(t));
          break;
        default:
          on(t);
      }
      l = l.sibling;
    }
  }
  function ev(l, t) {
    for (; Ml !== null; ) {
      var u = Ml;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          fu(8, u, t);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var a = u.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Va(u.memoizedState.cache);
      }
      if (a = u.child, a !== null) a.return = u, Ml = a;
      else
        l: for (u = l; Ml !== null; ) {
          a = Ml;
          var e = a.sibling, n = a.return;
          if (Wy(a), a === u) {
            Ml = null;
            break l;
          }
          if (e !== null) {
            e.return = n, Ml = e;
            break l;
          }
          Ml = n;
        }
    }
  }
  var kd = {
    getCacheForType: function(l) {
      var t = Ul(zl), u = t.data.get(l);
      return u === void 0 && (u = l(), t.data.set(l, u)), u;
    },
    cacheSignal: function() {
      return Ul(zl).controller.signal;
    }
  }, Id = typeof WeakMap == "function" ? WeakMap : Map, $ = 0, nl = null, Z = null, V = 0, I = 0, ut = null, cu = !1, ga = !1, Mc = !1, Lt = 0, ml = 0, iu = 0, Qu = 0, rc = 0, at = 0, Sa = 0, ce = null, Kl = null, Dc = !1, mn = 0, nv = 0, gn = 1 / 0, Sn = null, yu = null, _l = 0, vu = null, ba = null, Kt = 0, Uc = 0, Hc = null, fv = null, ie = 0, Nc = null;
  function et() {
    return ($ & 2) !== 0 && V !== 0 ? V & -V : z.T !== null ? pc() : Ai();
  }
  function cv() {
    if (at === 0)
      if ((V & 536870912) === 0 || J) {
        var l = Oe;
        Oe <<= 1, (Oe & 3932160) === 0 && (Oe = 262144), at = l;
      } else at = 536870912;
    return l = lt.current, l !== null && (l.flags |= 32), at;
  }
  function Jl(l, t, u) {
    (l === nl && (I === 2 || I === 9) || l.cancelPendingCommit !== null) && (za(l, 0), su(
      l,
      V,
      at,
      !1
    )), Ha(l, u), (($ & 2) === 0 || l !== nl) && (l === nl && (($ & 2) === 0 && (Qu |= u), ml === 4 && su(
      l,
      V,
      at,
      !1
    )), rt(l));
  }
  function iv(l, t, u) {
    if (($ & 6) !== 0) throw Error(m(327));
    var a = !u && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Ua(l, t), e = a ? th(l, t) : Rc(l, t, !0), n = a;
    do {
      if (e === 0) {
        ga && !a && su(l, t, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, n && !Pd(u)) {
          e = Rc(l, t, !1), n = !1;
          continue;
        }
        if (e === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var f = 0;
          else
            f = l.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            t = f;
            l: {
              var c = l;
              e = ce;
              var i = c.current.memoizedState.isDehydrated;
              if (i && (za(c, f).flags |= 256), f = Rc(
                c,
                f,
                !1
              ), f !== 2) {
                if (Mc && !i) {
                  c.errorRecoveryDisabledLanes |= n, Qu |= n, e = 4;
                  break l;
                }
                n = Kl, Kl = e, n !== null && (Kl === null ? Kl = n : Kl.push.apply(
                  Kl,
                  n
                ));
              }
              e = f;
            }
            if (n = !1, e !== 2) continue;
          }
        }
        if (e === 1) {
          za(l, 0), su(l, t, 0, !0);
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
              su(
                a,
                t,
                at,
                !cu
              );
              break l;
            case 2:
              Kl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(m(329));
          }
          if ((t & 62914560) === t && (e = mn + 300 - $l(), 10 < e)) {
            if (su(
              a,
              t,
              at,
              !cu
            ), re(a, 0, !0) !== 0) break l;
            Kt = t, a.timeoutHandle = Xv(
              yv.bind(
                null,
                a,
                u,
                Kl,
                Sn,
                Dc,
                t,
                at,
                Qu,
                Sa,
                cu,
                n,
                "Throttled",
                -0,
                0
              ),
              e
            );
            break l;
          }
          yv(
            a,
            u,
            Kl,
            Sn,
            Dc,
            t,
            at,
            Qu,
            Sa,
            cu,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    rt(l);
  }
  function yv(l, t, u, a, e, n, f, c, i, h, b, E, o, S) {
    if (l.timeoutHandle = -1, E = t.subtreeFlags, E & 8192 || (E & 16785408) === 16785408) {
      E = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Nt
      }, tv(
        t,
        n,
        E
      );
      var U = (n & 62914560) === n ? mn - $l() : (n & 4194048) === n ? nv - $l() : 0;
      if (U = Gh(
        E,
        U
      ), U !== null) {
        Kt = n, l.cancelPendingCommit = U(
          Sv.bind(
            null,
            l,
            t,
            n,
            u,
            a,
            e,
            f,
            c,
            i,
            b,
            E,
            null,
            o,
            S
          )
        ), su(l, n, f, !h);
        return;
      }
    }
    Sv(
      l,
      t,
      n,
      u,
      a,
      e,
      f,
      c,
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
            if (!Il(n(), e)) return !1;
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
  function su(l, t, u, a) {
    t &= ~rc, t &= ~Qu, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var e = t; 0 < e; ) {
      var n = 31 - kl(e), f = 1 << n;
      a[n] = -1, e &= ~f;
    }
    u !== 0 && zi(l, u, t);
  }
  function bn() {
    return ($ & 6) === 0 ? (ye(0), !1) : !0;
  }
  function qc() {
    if (Z !== null) {
      if (I === 0)
        var l = Z.return;
      else
        l = Z, Yt = Hu = null, wf(l), ya = null, Ka = 0, l = Z;
      for (; l !== null; )
        jy(l.alternate, l), l = l.return;
      Z = null;
    }
  }
  function za(l, t) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, zh(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Kt = 0, qc(), nl = l, Z = u = Rt(l.current, null), V = t, I = 0, ut = null, cu = !1, ga = Ua(l, t), Mc = !1, Sa = at = rc = Qu = iu = ml = 0, Kl = ce = null, Dc = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var e = 31 - kl(a), n = 1 << e;
        t |= l[e], a &= ~n;
      }
    return Lt = t, Qe(), u;
  }
  function vv(l, t) {
    Q = null, z.H = Pa, t === ia || t === Je ? (t = r0(), I = 3) : t === Bf ? (t = r0(), I = 4) : I = t === yc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ut = t, Z === null && (ml = 1, fn(
      l,
      yt(t, l.current)
    ));
  }
  function sv() {
    var l = lt.current;
    return l === null ? !0 : (V & 4194048) === V ? ht === null : (V & 62914560) === V || (V & 536870912) !== 0 ? l === ht : !1;
  }
  function dv() {
    var l = z.H;
    return z.H = Pa, l === null ? Pa : l;
  }
  function hv() {
    var l = z.A;
    return z.A = kd, l;
  }
  function zn() {
    ml = 4, cu || (V & 4194048) !== V && lt.current !== null || (ga = !0), (iu & 134217727) === 0 && (Qu & 134217727) === 0 || nl === null || su(
      nl,
      V,
      at,
      !1
    );
  }
  function Rc(l, t, u) {
    var a = $;
    $ |= 2;
    var e = dv(), n = hv();
    (nl !== l || V !== t) && (Sn = null, za(l, t)), t = !1;
    var f = ml;
    l: do
      try {
        if (I !== 0 && Z !== null) {
          var c = Z, i = ut;
          switch (I) {
            case 8:
              qc(), f = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              lt.current === null && (t = !0);
              var h = I;
              if (I = 0, ut = null, Ta(l, c, i, h), u && ga) {
                f = 0;
                break l;
              }
              break;
            default:
              h = I, I = 0, ut = null, Ta(l, c, i, h);
          }
        }
        lh(), f = ml;
        break;
      } catch (b) {
        vv(l, b);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Yt = Hu = null, $ = a, z.H = e, z.A = n, Z === null && (nl = null, V = 0, Qe()), f;
  }
  function lh() {
    for (; Z !== null; ) ov(Z);
  }
  function th(l, t) {
    var u = $;
    $ |= 2;
    var a = dv(), e = hv();
    nl !== l || V !== t ? (Sn = null, gn = $l() + 500, za(l, t)) : ga = Ua(
      l,
      t
    );
    l: do
      try {
        if (I !== 0 && Z !== null) {
          t = Z;
          var n = ut;
          t: switch (I) {
            case 1:
              I = 0, ut = null, Ta(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (O0(n)) {
                I = 0, ut = null, mv(t);
                break;
              }
              t = function() {
                I !== 2 && I !== 9 || nl !== l || (I = 7), rt(l);
              }, n.then(t, t);
              break l;
            case 3:
              I = 7;
              break l;
            case 4:
              I = 5;
              break l;
            case 7:
              O0(n) ? (I = 0, ut = null, mv(t)) : (I = 0, ut = null, Ta(l, t, n, 7));
              break;
            case 5:
              var f = null;
              switch (Z.tag) {
                case 26:
                  f = Z.memoizedState;
                case 5:
                case 27:
                  var c = Z;
                  if (f ? ls(f) : c.stateNode.complete) {
                    I = 0, ut = null;
                    var i = c.sibling;
                    if (i !== null) Z = i;
                    else {
                      var h = c.return;
                      h !== null ? (Z = h, Tn(h)) : Z = null;
                    }
                    break t;
                  }
              }
              I = 0, ut = null, Ta(l, t, n, 5);
              break;
            case 6:
              I = 0, ut = null, Ta(l, t, n, 6);
              break;
            case 8:
              qc(), ml = 6;
              break l;
            default:
              throw Error(m(462));
          }
        }
        uh();
        break;
      } catch (b) {
        vv(l, b);
      }
    while (!0);
    return Yt = Hu = null, z.H = a, z.A = e, $ = u, Z !== null ? 0 : (nl = null, V = 0, Qe(), ml);
  }
  function uh() {
    for (; Z !== null && !Ms(); )
      ov(Z);
  }
  function ov(l) {
    var t = Qy(l.alternate, l, Lt);
    l.memoizedProps = l.pendingProps, t === null ? Tn(l) : Z = t;
  }
  function mv(l) {
    var t = l, u = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ry(
          u,
          t,
          t.pendingProps,
          t.type,
          void 0,
          V
        );
        break;
      case 11:
        t = Ry(
          u,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          V
        );
        break;
      case 5:
        wf(t);
      default:
        jy(u, t), t = Z = h0(t, Lt), t = Qy(u, t, Lt);
    }
    l.memoizedProps = l.pendingProps, t === null ? Tn(l) : Z = t;
  }
  function Ta(l, t, u, a) {
    Yt = Hu = null, wf(t), ya = null, Ka = 0;
    var e = t.return;
    try {
      if (Ld(
        l,
        e,
        t,
        u,
        V
      )) {
        ml = 1, fn(
          l,
          yt(u, l.current)
        ), Z = null;
        return;
      }
    } catch (n) {
      if (e !== null) throw Z = e, n;
      ml = 1, fn(
        l,
        yt(u, l.current)
      ), Z = null;
      return;
    }
    t.flags & 32768 ? (J || a === 1 ? l = !0 : ga || (V & 536870912) !== 0 ? l = !1 : (cu = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = lt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), gv(t, l)) : Tn(t);
  }
  function Tn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        gv(
          t,
          cu
        );
        return;
      }
      l = t.return;
      var u = wd(
        t.alternate,
        t,
        Lt
      );
      if (u !== null) {
        Z = u;
        return;
      }
      if (t = t.sibling, t !== null) {
        Z = t;
        return;
      }
      Z = t = l;
    } while (t !== null);
    ml === 0 && (ml = 5);
  }
  function gv(l, t) {
    do {
      var u = Wd(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, Z = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !t && (l = l.sibling, l !== null)) {
        Z = l;
        return;
      }
      Z = l = u;
    } while (l !== null);
    ml = 6, Z = null;
  }
  function Sv(l, t, u, a, e, n, f, c, i) {
    l.cancelPendingCommit = null;
    do
      En();
    while (_l !== 0);
    if (($ & 6) !== 0) throw Error(m(327));
    if (t !== null) {
      if (t === l.current) throw Error(m(177));
      if (n = t.lanes | t.childLanes, n |= Tf, Bs(
        l,
        u,
        n,
        f,
        c,
        i
      ), l === nl && (Z = nl = null, V = 0), ba = t, vu = l, Kt = u, Uc = n, Hc = e, fv = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, fh(Ae, function() {
        return Av(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = z.T, z.T = null, e = M.p, M.p = 2, f = $, $ |= 4;
        try {
          $d(l, t, u);
        } finally {
          $ = f, M.p = e, z.T = a;
        }
      }
      _l = 1, bv(), zv(), Tv();
    }
  }
  function bv() {
    if (_l === 1) {
      _l = 0;
      var l = vu, t = ba, u = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || u) {
        u = z.T, z.T = null;
        var a = M.p;
        M.p = 2;
        var e = $;
        $ |= 4;
        try {
          Iy(t, l);
          var n = Lc, f = e0(l.containerInfo), c = n.focusedElem, i = n.selectionRange;
          if (f !== c && c && c.ownerDocument && a0(
            c.ownerDocument.documentElement,
            c
          )) {
            if (i !== null && mf(c)) {
              var h = i.start, b = i.end;
              if (b === void 0 && (b = h), "selectionStart" in c)
                c.selectionStart = h, c.selectionEnd = Math.min(
                  b,
                  c.value.length
                );
              else {
                var E = c.ownerDocument || document, o = E && E.defaultView || window;
                if (o.getSelection) {
                  var S = o.getSelection(), U = c.textContent.length, C = Math.min(i.start, U), al = i.end === void 0 ? C : Math.min(i.end, U);
                  !S.extend && C > al && (f = al, al = C, C = f);
                  var s = u0(
                    c,
                    C
                  ), y = u0(
                    c,
                    al
                  );
                  if (s && y && (S.rangeCount !== 1 || S.anchorNode !== s.node || S.anchorOffset !== s.offset || S.focusNode !== y.node || S.focusOffset !== y.offset)) {
                    var d = E.createRange();
                    d.setStart(s.node, s.offset), S.removeAllRanges(), C > al ? (S.addRange(d), S.extend(y.node, y.offset)) : (d.setEnd(y.node, y.offset), S.addRange(d));
                  }
                }
              }
            }
            for (E = [], S = c; S = S.parentNode; )
              S.nodeType === 1 && E.push({
                element: S,
                left: S.scrollLeft,
                top: S.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < E.length; c++) {
              var T = E[c];
              T.element.scrollLeft = T.left, T.element.scrollTop = T.top;
            }
          }
          Cn = !!Vc, Lc = Vc = null;
        } finally {
          $ = e, M.p = a, z.T = u;
        }
      }
      l.current = t, _l = 2;
    }
  }
  function zv() {
    if (_l === 2) {
      _l = 0;
      var l = vu, t = ba, u = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || u) {
        u = z.T, z.T = null;
        var a = M.p;
        M.p = 2;
        var e = $;
        $ |= 4;
        try {
          wy(l, t.alternate, t);
        } finally {
          $ = e, M.p = a, z.T = u;
        }
      }
      _l = 3;
    }
  }
  function Tv() {
    if (_l === 4 || _l === 3) {
      _l = 0, rs();
      var l = vu, t = ba, u = Kt, a = fv;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? _l = 5 : (_l = 0, ba = vu = null, Ev(l, l.pendingLanes));
      var e = l.pendingLanes;
      if (e === 0 && (yu = null), $n(u), t = t.stateNode, Fl && typeof Fl.onCommitFiberRoot == "function")
        try {
          Fl.onCommitFiberRoot(
            Da,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = z.T, e = M.p, M.p = 2, z.T = null;
        try {
          for (var n = l.onRecoverableError, f = 0; f < a.length; f++) {
            var c = a[f];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          z.T = t, M.p = e;
        }
      }
      (Kt & 3) !== 0 && En(), rt(l), e = l.pendingLanes, (u & 261930) !== 0 && (e & 42) !== 0 ? l === Nc ? ie++ : (ie = 0, Nc = l) : ie = 0, ye(0);
    }
  }
  function Ev(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Va(t)));
  }
  function En() {
    return bv(), zv(), Tv(), Av();
  }
  function Av() {
    if (_l !== 5) return !1;
    var l = vu, t = Uc;
    Uc = 0;
    var u = $n(Kt), a = z.T, e = M.p;
    try {
      M.p = 32 > u ? 32 : u, z.T = null, u = Hc, Hc = null;
      var n = vu, f = Kt;
      if (_l = 0, ba = vu = null, Kt = 0, ($ & 6) !== 0) throw Error(m(331));
      var c = $;
      if ($ |= 4, av(n.current), lv(
        n,
        n.current,
        f,
        u
      ), $ = c, ye(0, !1), Fl && typeof Fl.onPostCommitFiberRoot == "function")
        try {
          Fl.onPostCommitFiberRoot(Da, n);
        } catch {
        }
      return !0;
    } finally {
      M.p = e, z.T = a, Ev(l, t);
    }
  }
  function _v(l, t, u) {
    t = yt(u, t), t = ic(l.stateNode, t, 2), l = au(l, t, 2), l !== null && (Ha(l, 2), rt(l));
  }
  function P(l, t, u) {
    if (l.tag === 3)
      _v(l, l, u);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          _v(
            t,
            l,
            u
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (yu === null || !yu.has(a))) {
            l = yt(u, l), u = Oy(2), a = au(t, u, 2), a !== null && (My(
              u,
              a,
              t,
              l
            ), Ha(a, 2), rt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Cc(l, t, u) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Id();
      var e = /* @__PURE__ */ new Set();
      a.set(t, e);
    } else
      e = a.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), a.set(t, e));
    e.has(u) || (Mc = !0, e.add(u), l = ah.bind(null, l, t, u), t.then(l, l));
  }
  function ah(l, t, u) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, nl === l && (V & u) === u && (ml === 4 || ml === 3 && (V & 62914560) === V && 300 > $l() - mn ? ($ & 2) === 0 && za(l, 0) : rc |= u, Sa === V && (Sa = 0)), rt(l);
  }
  function Ov(l, t) {
    t === 0 && (t = bi()), l = ru(l, t), l !== null && (Ha(l, t), rt(l));
  }
  function eh(l) {
    var t = l.memoizedState, u = 0;
    t !== null && (u = t.retryLane), Ov(l, u);
  }
  function nh(l, t) {
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
    a !== null && a.delete(t), Ov(l, u);
  }
  function fh(l, t) {
    return Kn(l, t);
  }
  var An = null, Ea = null, Yc = !1, _n = !1, Bc = !1, du = 0;
  function rt(l) {
    l !== Ea && l.next === null && (Ea === null ? An = Ea = l : Ea = Ea.next = l), _n = !0, Yc || (Yc = !0, ih());
  }
  function ye(l, t) {
    if (!Bc && _n) {
      Bc = !0;
      do
        for (var u = !1, a = An; a !== null; ) {
          if (l !== 0) {
            var e = a.pendingLanes;
            if (e === 0) var n = 0;
            else {
              var f = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - kl(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (u = !0, Uv(a, n));
          } else
            n = V, n = re(
              a,
              a === nl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || Ua(a, n) || (u = !0, Uv(a, n));
          a = a.next;
        }
      while (u);
      Bc = !1;
    }
  }
  function ch() {
    Mv();
  }
  function Mv() {
    _n = Yc = !1;
    var l = 0;
    du !== 0 && bh() && (l = du);
    for (var t = $l(), u = null, a = An; a !== null; ) {
      var e = a.next, n = rv(a, t);
      n === 0 ? (a.next = null, u === null ? An = e : u.next = e, e === null && (Ea = u)) : (u = a, (l !== 0 || (n & 3) !== 0) && (_n = !0)), a = e;
    }
    _l !== 0 && _l !== 5 || ye(l), du !== 0 && (du = 0);
  }
  function rv(l, t) {
    for (var u = l.suspendedLanes, a = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var f = 31 - kl(n), c = 1 << f, i = e[f];
      i === -1 ? ((c & u) === 0 || (c & a) !== 0) && (e[f] = Ys(c, t)) : i <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = nl, u = V, u = re(
      l,
      l === t ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, u === 0 || l === t && (I === 2 || I === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && Jn(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || Ua(l, u)) {
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
      return a = Dv.bind(null, l), u = Kn(u, a), l.callbackPriority = t, l.callbackNode = u, t;
    }
    return a !== null && a !== null && Jn(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Dv(l, t) {
    if (_l !== 0 && _l !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (En() && l.callbackNode !== u)
      return null;
    var a = V;
    return a = re(
      l,
      l === nl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (iv(l, a, t), rv(l, $l()), l.callbackNode != null && l.callbackNode === u ? Dv.bind(null, l) : null);
  }
  function Uv(l, t) {
    if (En()) return null;
    iv(l, t, !0);
  }
  function ih() {
    Th(function() {
      ($ & 6) !== 0 ? Kn(
        mi,
        ch
      ) : Mv();
    });
  }
  function pc() {
    if (du === 0) {
      var l = fa;
      l === 0 && (l = _e, _e <<= 1, (_e & 261888) === 0 && (_e = 256)), du = l;
    }
    return du;
  }
  function Hv(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Ne("" + l);
  }
  function Nv(l, t) {
    var u = t.ownerDocument.createElement("input");
    return u.name = t.name, u.value = t.value, l.id && u.setAttribute("form", l.id), t.parentNode.insertBefore(u, t), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function yh(l, t, u, a, e) {
    if (t === "submit" && u && u.stateNode === e) {
      var n = Hv(
        (e[jl] || null).action
      ), f = a.submitter;
      f && (t = (t = f[jl] || null) ? Hv(t.formAction) : f.getAttribute("formAction"), t !== null && (n = t, f = null));
      var c = new Ye(
        "action",
        "action",
        null,
        a,
        e
      );
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (du !== 0) {
                  var i = f ? Nv(e, f) : new FormData(e);
                  uc(
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
                typeof n == "function" && (c.preventDefault(), i = f ? Nv(e, f) : new FormData(e), uc(
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
  for (var Gc = 0; Gc < zf.length; Gc++) {
    var Qc = zf[Gc], vh = Qc.toLowerCase(), sh = Qc[0].toUpperCase() + Qc.slice(1);
    St(
      vh,
      "on" + sh
    );
  }
  St(c0, "onAnimationEnd"), St(i0, "onAnimationIteration"), St(y0, "onAnimationStart"), St("dblclick", "onDoubleClick"), St("focusin", "onFocus"), St("focusout", "onBlur"), St(Dd, "onTransitionRun"), St(Ud, "onTransitionStart"), St(Hd, "onTransitionCancel"), St(v0, "onTransitionEnd"), Ju("onMouseEnter", ["mouseout", "mouseover"]), Ju("onMouseLeave", ["mouseout", "mouseover"]), Ju("onPointerEnter", ["pointerout", "pointerover"]), Ju("onPointerLeave", ["pointerout", "pointerover"]), Au(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Au(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Au("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Au(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Au(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Au(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ve = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), dh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ve)
  );
  function qv(l, t) {
    t = (t & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var a = l[u], e = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var f = a.length - 1; 0 <= f; f--) {
            var c = a[f], i = c.instance, h = c.currentTarget;
            if (c = c.listener, i !== n && e.isPropagationStopped())
              break l;
            n = c, e.currentTarget = h;
            try {
              n(e);
            } catch (b) {
              Ge(b);
            }
            e.currentTarget = null, n = i;
          }
        else
          for (f = 0; f < a.length; f++) {
            if (c = a[f], i = c.instance, h = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped())
              break l;
            n = c, e.currentTarget = h;
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
  function x(l, t) {
    var u = t[Fn];
    u === void 0 && (u = t[Fn] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    u.has(a) || (Rv(t, l, 2, !1), u.add(a));
  }
  function Xc(l, t, u) {
    var a = 0;
    t && (a |= 4), Rv(
      u,
      l,
      a,
      t
    );
  }
  var On = "_reactListening" + Math.random().toString(36).slice(2);
  function jc(l) {
    if (!l[On]) {
      l[On] = !0, Mi.forEach(function(u) {
        u !== "selectionchange" && (dh.has(u) || Xc(u, !1, l), Xc(u, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[On] || (t[On] = !0, Xc("selectionchange", !1, t));
    }
  }
  function Rv(l, t, u, a) {
    switch (cs(t)) {
      case 2:
        var e = jh;
        break;
      case 8:
        e = Zh;
        break;
      default:
        e = ti;
    }
    u = e.bind(
      null,
      t,
      u,
      l
    ), e = void 0, !nf || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = !0), a ? e !== void 0 ? l.addEventListener(t, u, {
      capture: !0,
      passive: e
    }) : l.addEventListener(t, u, !0) : e !== void 0 ? l.addEventListener(t, u, {
      passive: e
    }) : l.addEventListener(t, u, !1);
  }
  function Zc(l, t, u, a, e) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var c = a.stateNode.containerInfo;
          if (c === e) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var i = f.tag;
              if ((i === 3 || i === 4) && f.stateNode.containerInfo === e)
                return;
              f = f.return;
            }
          for (; c !== null; ) {
            if (f = Vu(c), f === null) return;
            if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
              a = n = f;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Gi(function() {
      var h = n, b = af(u), E = [];
      l: {
        var o = s0.get(l);
        if (o !== void 0) {
          var S = Ye, U = l;
          switch (l) {
            case "keypress":
              if (Re(u) === 0) break l;
            case "keydown":
            case "keyup":
              S = nd;
              break;
            case "focusin":
              U = "focus", S = vf;
              break;
            case "focusout":
              U = "blur", S = vf;
              break;
            case "beforeblur":
            case "afterblur":
              S = vf;
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
              S = ji;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              S = ws;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              S = id;
              break;
            case c0:
            case i0:
            case y0:
              S = Fs;
              break;
            case v0:
              S = vd;
              break;
            case "scroll":
            case "scrollend":
              S = Ks;
              break;
            case "wheel":
              S = dd;
              break;
            case "copy":
            case "cut":
            case "paste":
              S = Is;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              S = xi;
              break;
            case "toggle":
            case "beforetoggle":
              S = od;
          }
          var C = (t & 4) !== 0, al = !C && (l === "scroll" || l === "scrollend"), s = C ? o !== null ? o + "Capture" : null : o;
          C = [];
          for (var y = h, d; y !== null; ) {
            var T = y;
            if (d = T.stateNode, T = T.tag, T !== 5 && T !== 26 && T !== 27 || d === null || s === null || (T = Ra(y, s), T != null && C.push(
              se(y, T, d)
            )), al) break;
            y = y.return;
          }
          0 < C.length && (o = new S(
            o,
            U,
            null,
            u,
            b
          ), E.push({ event: o, listeners: C }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (o = l === "mouseover" || l === "pointerover", S = l === "mouseout" || l === "pointerout", o && u !== uf && (U = u.relatedTarget || u.fromElement) && (Vu(U) || U[xu]))
            break l;
          if ((S || o) && (o = b.window === b ? b : (o = b.ownerDocument) ? o.defaultView || o.parentWindow : window, S ? (U = u.relatedTarget || u.toElement, S = h, U = U ? Vu(U) : null, U !== null && (al = fl(U), C = U.tag, U !== al || C !== 5 && C !== 27 && C !== 6) && (U = null)) : (S = null, U = h), S !== U)) {
            if (C = ji, T = "onMouseLeave", s = "onMouseEnter", y = "mouse", (l === "pointerout" || l === "pointerover") && (C = xi, T = "onPointerLeave", s = "onPointerEnter", y = "pointer"), al = S == null ? o : qa(S), d = U == null ? o : qa(U), o = new C(
              T,
              y + "leave",
              S,
              u,
              b
            ), o.target = al, o.relatedTarget = d, T = null, Vu(b) === h && (C = new C(
              s,
              y + "enter",
              U,
              u,
              b
            ), C.target = d, C.relatedTarget = al, T = C), al = T, S && U)
              t: {
                for (C = hh, s = S, y = U, d = 0, T = s; T; T = C(T))
                  d++;
                T = 0;
                for (var R = y; R; R = C(R))
                  T++;
                for (; 0 < d - T; )
                  s = C(s), d--;
                for (; 0 < T - d; )
                  y = C(y), T--;
                for (; d--; ) {
                  if (s === y || y !== null && s === y.alternate) {
                    C = s;
                    break t;
                  }
                  s = C(s), y = C(y);
                }
                C = null;
              }
            else C = null;
            S !== null && Cv(
              E,
              o,
              S,
              C,
              !1
            ), U !== null && al !== null && Cv(
              E,
              al,
              U,
              C,
              !0
            );
          }
        }
        l: {
          if (o = h ? qa(h) : window, S = o.nodeName && o.nodeName.toLowerCase(), S === "select" || S === "input" && o.type === "file")
            var w = Fi;
          else if (Wi(o))
            if (ki)
              w = Od;
            else {
              w = Ad;
              var N = Ed;
            }
          else
            S = o.nodeName, !S || S.toLowerCase() !== "input" || o.type !== "checkbox" && o.type !== "radio" ? h && tf(h.elementType) && (w = Fi) : w = _d;
          if (w && (w = w(l, h))) {
            $i(
              E,
              w,
              u,
              b
            );
            break l;
          }
          N && N(l, o, h), l === "focusout" && h && o.type === "number" && h.memoizedProps.value != null && lf(o, "number", o.value);
        }
        switch (N = h ? qa(h) : window, l) {
          case "focusin":
            (Wi(N) || N.contentEditable === "true") && (Iu = N, gf = h, ja = null);
            break;
          case "focusout":
            ja = gf = Iu = null;
            break;
          case "mousedown":
            Sf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Sf = !1, n0(E, u, b);
            break;
          case "selectionchange":
            if (rd) break;
          case "keydown":
          case "keyup":
            n0(E, u, b);
        }
        var X;
        if (df)
          l: {
            switch (l) {
              case "compositionstart":
                var L = "onCompositionStart";
                break l;
              case "compositionend":
                L = "onCompositionEnd";
                break l;
              case "compositionupdate":
                L = "onCompositionUpdate";
                break l;
            }
            L = void 0;
          }
        else
          ku ? Ji(l, u) && (L = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (L = "onCompositionStart");
        L && (Vi && u.locale !== "ko" && (ku || L !== "onCompositionStart" ? L === "onCompositionEnd" && ku && (X = Qi()) : (Ft = b, ff = "value" in Ft ? Ft.value : Ft.textContent, ku = !0)), N = Mn(h, L), 0 < N.length && (L = new Zi(
          L,
          l,
          null,
          u,
          b
        ), E.push({ event: L, listeners: N }), X ? L.data = X : (X = wi(u), X !== null && (L.data = X)))), (X = gd ? Sd(l, u) : bd(l, u)) && (L = Mn(h, "onBeforeInput"), 0 < L.length && (N = new Zi(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          b
        ), E.push({
          event: N,
          listeners: L
        }), N.data = X)), yh(
          E,
          l,
          h,
          u,
          b
        );
      }
      qv(E, t);
    });
  }
  function se(l, t, u) {
    return {
      instance: l,
      listener: t,
      currentTarget: u
    };
  }
  function Mn(l, t) {
    for (var u = t + "Capture", a = []; l !== null; ) {
      var e = l, n = e.stateNode;
      if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = Ra(l, u), e != null && a.unshift(
        se(l, e, n)
      ), e = Ra(l, t), e != null && a.push(
        se(l, e, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function hh(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Cv(l, t, u, a, e) {
    for (var n = t._reactName, f = []; u !== null && u !== a; ) {
      var c = u, i = c.alternate, h = c.stateNode;
      if (c = c.tag, i !== null && i === a) break;
      c !== 5 && c !== 26 && c !== 27 || h === null || (i = h, e ? (h = Ra(u, n), h != null && f.unshift(
        se(u, h, i)
      )) : e || (h = Ra(u, n), h != null && f.push(
        se(u, h, i)
      ))), u = u.return;
    }
    f.length !== 0 && l.push({ event: t, listeners: f });
  }
  var oh = /\r\n?/g, mh = /\u0000|\uFFFD/g;
  function Yv(l) {
    return (typeof l == "string" ? l : "" + l).replace(oh, `
`).replace(mh, "");
  }
  function Bv(l, t) {
    return t = Yv(t), Yv(l) === t;
  }
  function ul(l, t, u, a, e, n) {
    switch (u) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Wu(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Wu(l, "" + a);
        break;
      case "className":
        Ue(l, "class", a);
        break;
      case "tabIndex":
        Ue(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ue(l, u, a);
        break;
      case "style":
        Bi(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Ue(l, "data", a);
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
        a = Ne("" + a), l.setAttribute(u, a);
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
          typeof n == "function" && (u === "formAction" ? (t !== "input" && ul(l, t, "name", e.name, e, null), ul(
            l,
            t,
            "formEncType",
            e.formEncType,
            e,
            null
          ), ul(
            l,
            t,
            "formMethod",
            e.formMethod,
            e,
            null
          ), ul(
            l,
            t,
            "formTarget",
            e.formTarget,
            e,
            null
          )) : (ul(l, t, "encType", e.encType, e, null), ul(l, t, "method", e.method, e, null), ul(l, t, "target", e.target, e, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        a = Ne("" + a), l.setAttribute(u, a);
        break;
      case "onClick":
        a != null && (l.onclick = Nt);
        break;
      case "onScroll":
        a != null && x("scroll", l);
        break;
      case "onScrollEnd":
        a != null && x("scrollend", l);
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
        u = Ne("" + a), l.setAttributeNS(
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
        x("beforetoggle", l), x("toggle", l), De(l, "popover", a);
        break;
      case "xlinkActuate":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Ht(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Ht(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Ht(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        De(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = Vs.get(u) || u, De(l, u, a));
    }
  }
  function xc(l, t, u, a, e, n) {
    switch (u) {
      case "style":
        Bi(l, a, n);
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
        typeof a == "string" ? Wu(l, a) : (typeof a == "number" || typeof a == "bigint") && Wu(l, "" + a);
        break;
      case "onScroll":
        a != null && x("scroll", l);
        break;
      case "onScrollEnd":
        a != null && x("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Nt);
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
        if (!ri.hasOwnProperty(u))
          l: {
            if (u[0] === "o" && u[1] === "n" && (e = u.endsWith("Capture"), t = u.slice(2, e ? u.length - 7 : void 0), n = l[jl] || null, n = n != null ? n[u] : null, typeof n == "function" && l.removeEventListener(t, n, e), typeof a == "function")) {
              typeof n != "function" && n !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(t, a, e);
              break l;
            }
            u in l ? l[u] = a : a === !0 ? l.setAttribute(u, "") : De(l, u, a);
          }
    }
  }
  function Nl(l, t, u) {
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
        x("error", l), x("load", l);
        var a = !1, e = !1, n;
        for (n in u)
          if (u.hasOwnProperty(n)) {
            var f = u[n];
            if (f != null)
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
                  ul(l, t, n, f, u, null);
              }
          }
        e && ul(l, t, "srcSet", u.srcSet, u, null), a && ul(l, t, "src", u.src, u, null);
        return;
      case "input":
        x("invalid", l);
        var c = n = f = e = null, i = null, h = null;
        for (a in u)
          if (u.hasOwnProperty(a)) {
            var b = u[a];
            if (b != null)
              switch (a) {
                case "name":
                  e = b;
                  break;
                case "type":
                  f = b;
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
                  c = b;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (b != null)
                    throw Error(m(137, t));
                  break;
                default:
                  ul(l, t, a, b, u, null);
              }
          }
        qi(
          l,
          n,
          c,
          i,
          h,
          f,
          e,
          !1
        );
        return;
      case "select":
        x("invalid", l), a = f = n = null;
        for (e in u)
          if (u.hasOwnProperty(e) && (c = u[e], c != null))
            switch (e) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                f = c;
                break;
              case "multiple":
                a = c;
              default:
                ul(l, t, e, c, u, null);
            }
        t = n, u = f, l.multiple = !!a, t != null ? wu(l, !!a, t, !1) : u != null && wu(l, !!a, u, !0);
        return;
      case "textarea":
        x("invalid", l), n = e = a = null;
        for (f in u)
          if (u.hasOwnProperty(f) && (c = u[f], c != null))
            switch (f) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                e = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(m(91));
                break;
              default:
                ul(l, t, f, c, u, null);
            }
        Ci(l, a, e, n);
        return;
      case "option":
        for (i in u)
          if (u.hasOwnProperty(i) && (a = u[i], a != null))
            switch (i) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                ul(l, t, i, a, u, null);
            }
        return;
      case "dialog":
        x("beforetoggle", l), x("toggle", l), x("cancel", l), x("close", l);
        break;
      case "iframe":
      case "object":
        x("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ve.length; a++)
          x(ve[a], l);
        break;
      case "image":
        x("error", l), x("load", l);
        break;
      case "details":
        x("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        x("error", l), x("load", l);
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
                ul(l, t, h, a, u, null);
            }
        return;
      default:
        if (tf(t)) {
          for (b in u)
            u.hasOwnProperty(b) && (a = u[b], a !== void 0 && xc(
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
    for (c in u)
      u.hasOwnProperty(c) && (a = u[c], a != null && ul(l, t, c, a, u, null));
  }
  function gh(l, t, u, a) {
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
        var e = null, n = null, f = null, c = null, i = null, h = null, b = null;
        for (S in u) {
          var E = u[S];
          if (u.hasOwnProperty(S) && E != null)
            switch (S) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                i = E;
              default:
                a.hasOwnProperty(S) || ul(l, t, S, null, a, E);
            }
        }
        for (var o in a) {
          var S = a[o];
          if (E = u[o], a.hasOwnProperty(o) && (S != null || E != null))
            switch (o) {
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
                f = S;
                break;
              case "defaultValue":
                c = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(m(137, t));
                break;
              default:
                S !== E && ul(
                  l,
                  t,
                  o,
                  S,
                  a,
                  E
                );
            }
        }
        Pn(
          l,
          f,
          c,
          i,
          h,
          b,
          n,
          e
        );
        return;
      case "select":
        S = f = c = o = null;
        for (n in u)
          if (i = u[n], u.hasOwnProperty(n) && i != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                S = i;
              default:
                a.hasOwnProperty(n) || ul(
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
                o = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                f = n;
              default:
                n !== i && ul(
                  l,
                  t,
                  e,
                  n,
                  a,
                  i
                );
            }
        t = c, u = f, a = S, o != null ? wu(l, !!u, o, !1) : !!a != !!u && (t != null ? wu(l, !!u, t, !0) : wu(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        S = o = null;
        for (c in u)
          if (e = u[c], u.hasOwnProperty(c) && e != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                ul(l, t, c, null, a, e);
            }
        for (f in a)
          if (e = a[f], n = u[f], a.hasOwnProperty(f) && (e != null || n != null))
            switch (f) {
              case "value":
                o = e;
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
                e !== n && ul(l, t, f, e, a, n);
            }
        Ri(l, o, S);
        return;
      case "option":
        for (var U in u)
          if (o = u[U], u.hasOwnProperty(U) && o != null && !a.hasOwnProperty(U))
            switch (U) {
              case "selected":
                l.selected = !1;
                break;
              default:
                ul(
                  l,
                  t,
                  U,
                  null,
                  a,
                  o
                );
            }
        for (i in a)
          if (o = a[i], S = u[i], a.hasOwnProperty(i) && o !== S && (o != null || S != null))
            switch (i) {
              case "selected":
                l.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                ul(
                  l,
                  t,
                  i,
                  o,
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
        for (var C in u)
          o = u[C], u.hasOwnProperty(C) && o != null && !a.hasOwnProperty(C) && ul(l, t, C, null, a, o);
        for (h in a)
          if (o = a[h], S = u[h], a.hasOwnProperty(h) && o !== S && (o != null || S != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (o != null)
                  throw Error(m(137, t));
                break;
              default:
                ul(
                  l,
                  t,
                  h,
                  o,
                  a,
                  S
                );
            }
        return;
      default:
        if (tf(t)) {
          for (var al in u)
            o = u[al], u.hasOwnProperty(al) && o !== void 0 && !a.hasOwnProperty(al) && xc(
              l,
              t,
              al,
              void 0,
              a,
              o
            );
          for (b in a)
            o = a[b], S = u[b], !a.hasOwnProperty(b) || o === S || o === void 0 && S === void 0 || xc(
              l,
              t,
              b,
              o,
              a,
              S
            );
          return;
        }
    }
    for (var s in u)
      o = u[s], u.hasOwnProperty(s) && o != null && !a.hasOwnProperty(s) && ul(l, t, s, null, a, o);
    for (E in a)
      o = a[E], S = u[E], !a.hasOwnProperty(E) || o === S || o == null && S == null || ul(l, t, E, o, a, S);
  }
  function pv(l) {
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
  function Sh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, u = performance.getEntriesByType("resource"), a = 0; a < u.length; a++) {
        var e = u[a], n = e.transferSize, f = e.initiatorType, c = e.duration;
        if (n && c && pv(f)) {
          for (f = 0, c = e.responseEnd, a += 1; a < u.length; a++) {
            var i = u[a], h = i.startTime;
            if (h > c) break;
            var b = i.transferSize, E = i.initiatorType;
            b && pv(E) && (i = i.responseEnd, f += b * (i < c ? 1 : (c - h) / (i - h)));
          }
          if (--a, t += 8 * (n + f) / (e.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Vc = null, Lc = null;
  function rn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Gv(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Qv(l, t) {
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
  function Kc(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Jc = null;
  function bh() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Jc ? !1 : (Jc = l, !0) : (Jc = null, !1);
  }
  var Xv = typeof setTimeout == "function" ? setTimeout : void 0, zh = typeof clearTimeout == "function" ? clearTimeout : void 0, jv = typeof Promise == "function" ? Promise : void 0, Th = typeof queueMicrotask == "function" ? queueMicrotask : typeof jv < "u" ? function(l) {
    return jv.resolve(null).then(l).catch(Eh);
  } : Xv;
  function Eh(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function hu(l) {
    return l === "head";
  }
  function Zv(l, t) {
    var u = t, a = 0;
    do {
      var e = u.nextSibling;
      if (l.removeChild(u), e && e.nodeType === 8)
        if (u = e.data, u === "/$" || u === "/&") {
          if (a === 0) {
            l.removeChild(e), Ma(t);
            return;
          }
          a--;
        } else if (u === "$" || u === "$?" || u === "$~" || u === "$!" || u === "&")
          a++;
        else if (u === "html")
          de(l.ownerDocument.documentElement);
        else if (u === "head") {
          u = l.ownerDocument.head, de(u);
          for (var n = u.firstChild; n; ) {
            var f = n.nextSibling, c = n.nodeName;
            n[Na] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || u.removeChild(n), n = f;
          }
        } else
          u === "body" && de(l.ownerDocument.body);
      u = e;
    } while (u);
    Ma(t);
  }
  function xv(l, t) {
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
  function wc(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var u = t;
      switch (t = t.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          wc(u), kn(u);
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
  function Ah(l, t, u, a) {
    for (; l.nodeType === 1; ) {
      var e = u;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[Na])
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
      if (l = ot(l.nextSibling), l === null) break;
    }
    return null;
  }
  function _h(l, t, u) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = ot(l.nextSibling), l === null)) return null;
    return l;
  }
  function Vv(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = ot(l.nextSibling), l === null)) return null;
    return l;
  }
  function Wc(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function $c(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Oh(l, t) {
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
  function ot(l) {
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
  var Fc = null;
  function Lv(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "/$" || u === "/&") {
          if (t === 0)
            return ot(l.nextSibling);
          t--;
        } else
          u !== "$" && u !== "$!" && u !== "$?" && u !== "$~" && u !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Kv(l) {
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
  function Jv(l, t, u) {
    switch (t = rn(u), l) {
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
  function de(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    kn(l);
  }
  var mt = /* @__PURE__ */ new Map(), wv = /* @__PURE__ */ new Set();
  function Dn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Jt = M.d;
  M.d = {
    f: Mh,
    r: rh,
    D: Dh,
    C: Uh,
    L: Hh,
    m: Nh,
    X: Rh,
    S: qh,
    M: Ch
  };
  function Mh() {
    var l = Jt.f(), t = bn();
    return l || t;
  }
  function rh(l) {
    var t = Lu(l);
    t !== null && t.tag === 5 && t.type === "form" ? vy(t) : Jt.r(l);
  }
  var Aa = typeof document > "u" ? null : document;
  function Wv(l, t, u) {
    var a = Aa;
    if (a && typeof t == "string" && t) {
      var e = ct(t);
      e = 'link[rel="' + l + '"][href="' + e + '"]', typeof u == "string" && (e += '[crossorigin="' + u + '"]'), wv.has(e) || (wv.add(e), l = { rel: l, crossOrigin: u, href: t }, a.querySelector(e) === null && (t = a.createElement("link"), Nl(t, "link", l), Ol(t), a.head.appendChild(t)));
    }
  }
  function Dh(l) {
    Jt.D(l), Wv("dns-prefetch", l, null);
  }
  function Uh(l, t) {
    Jt.C(l, t), Wv("preconnect", l, t);
  }
  function Hh(l, t, u) {
    Jt.L(l, t, u);
    var a = Aa;
    if (a && l && t) {
      var e = 'link[rel="preload"][as="' + ct(t) + '"]';
      t === "image" && u && u.imageSrcSet ? (e += '[imagesrcset="' + ct(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (e += '[imagesizes="' + ct(
        u.imageSizes
      ) + '"]')) : e += '[href="' + ct(l) + '"]';
      var n = e;
      switch (t) {
        case "style":
          n = _a(l);
          break;
        case "script":
          n = Oa(l);
      }
      mt.has(n) || (l = Y(
        {
          rel: "preload",
          href: t === "image" && u && u.imageSrcSet ? void 0 : l,
          as: t
        },
        u
      ), mt.set(n, l), a.querySelector(e) !== null || t === "style" && a.querySelector(he(n)) || t === "script" && a.querySelector(oe(n)) || (t = a.createElement("link"), Nl(t, "link", l), Ol(t), a.head.appendChild(t)));
    }
  }
  function Nh(l, t) {
    Jt.m(l, t);
    var u = Aa;
    if (u && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + ct(a) + '"][href="' + ct(l) + '"]', n = e;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Oa(l);
      }
      if (!mt.has(n) && (l = Y({ rel: "modulepreload", href: l }, t), mt.set(n, l), u.querySelector(e) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(oe(n)))
              return;
        }
        a = u.createElement("link"), Nl(a, "link", l), Ol(a), u.head.appendChild(a);
      }
    }
  }
  function qh(l, t, u) {
    Jt.S(l, t, u);
    var a = Aa;
    if (a && l) {
      var e = Ku(a).hoistableStyles, n = _a(l);
      t = t || "default";
      var f = e.get(n);
      if (!f) {
        var c = { loading: 0, preload: null };
        if (f = a.querySelector(
          he(n)
        ))
          c.loading = 5;
        else {
          l = Y(
            { rel: "stylesheet", href: l, "data-precedence": t },
            u
          ), (u = mt.get(n)) && kc(l, u);
          var i = f = a.createElement("link");
          Ol(i), Nl(i, "link", l), i._p = new Promise(function(h, b) {
            i.onload = h, i.onerror = b;
          }), i.addEventListener("load", function() {
            c.loading |= 1;
          }), i.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Un(f, t, a);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: c
        }, e.set(n, f);
      }
    }
  }
  function Rh(l, t) {
    Jt.X(l, t);
    var u = Aa;
    if (u && l) {
      var a = Ku(u).hoistableScripts, e = Oa(l), n = a.get(e);
      n || (n = u.querySelector(oe(e)), n || (l = Y({ src: l, async: !0 }, t), (t = mt.get(e)) && Ic(l, t), n = u.createElement("script"), Ol(n), Nl(n, "link", l), u.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(e, n));
    }
  }
  function Ch(l, t) {
    Jt.M(l, t);
    var u = Aa;
    if (u && l) {
      var a = Ku(u).hoistableScripts, e = Oa(l), n = a.get(e);
      n || (n = u.querySelector(oe(e)), n || (l = Y({ src: l, async: !0, type: "module" }, t), (t = mt.get(e)) && Ic(l, t), n = u.createElement("script"), Ol(n), Nl(n, "link", l), u.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(e, n));
    }
  }
  function $v(l, t, u, a) {
    var e = (e = j.current) ? Dn(e) : null;
    if (!e) throw Error(m(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (t = _a(u.href), u = Ku(
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
          var n = Ku(
            e
          ).hoistableStyles, f = n.get(l);
          if (f || (e = e.ownerDocument || e, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, f), (n = e.querySelector(
            he(l)
          )) && !n._p && (f.instance = n, f.state.loading = 5), mt.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, mt.set(l, u), n || Yh(
            e,
            l,
            u,
            f.state
          ))), t && a === null)
            throw Error(m(528, ""));
          return f;
        }
        if (t && a !== null)
          throw Error(m(529, ""));
        return null;
      case "script":
        return t = u.async, u = u.src, typeof u == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Oa(u), u = Ku(
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
    return 'href="' + ct(l) + '"';
  }
  function he(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Fv(l) {
    return Y({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Yh(l, t, u, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Nl(t, "link", u), Ol(t), l.head.appendChild(t));
  }
  function Oa(l) {
    return '[src="' + ct(l) + '"]';
  }
  function oe(l) {
    return "script[async]" + l;
  }
  function kv(l, t, u) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + ct(u.href) + '"]'
          );
          if (a)
            return t.instance = a, Ol(a), a;
          var e = Y({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Ol(a), Nl(a, "style", e), Un(a, u.precedence, l), t.instance = a;
        case "stylesheet":
          e = _a(u.href);
          var n = l.querySelector(
            he(e)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Ol(n), n;
          a = Fv(u), (e = mt.get(e)) && kc(a, e), n = (l.ownerDocument || l).createElement("link"), Ol(n);
          var f = n;
          return f._p = new Promise(function(c, i) {
            f.onload = c, f.onerror = i;
          }), Nl(n, "link", a), t.state.loading |= 4, Un(n, u.precedence, l), t.instance = n;
        case "script":
          return n = Oa(u.src), (e = l.querySelector(
            oe(n)
          )) ? (t.instance = e, Ol(e), e) : (a = u, (e = mt.get(n)) && (a = Y({}, u), Ic(a, e)), l = l.ownerDocument || l, e = l.createElement("script"), Ol(e), Nl(e, "link", a), l.head.appendChild(e), t.instance = e);
        case "void":
          return null;
        default:
          throw Error(m(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Un(a, u.precedence, l));
    return t.instance;
  }
  function Un(l, t, u) {
    for (var a = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), e = a.length ? a[a.length - 1] : null, n = e, f = 0; f < a.length; f++) {
      var c = a[f];
      if (c.dataset.precedence === t) n = c;
      else if (n !== e) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = u.nodeType === 9 ? u.head : u, t.insertBefore(l, t.firstChild));
  }
  function kc(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Ic(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Hn = null;
  function Iv(l, t, u) {
    if (Hn === null) {
      var a = /* @__PURE__ */ new Map(), e = Hn = /* @__PURE__ */ new Map();
      e.set(u, a);
    } else
      e = Hn, a = e.get(u), a || (a = /* @__PURE__ */ new Map(), e.set(u, a));
    if (a.has(l)) return a;
    for (a.set(l, null), u = u.getElementsByTagName(l), e = 0; e < u.length; e++) {
      var n = u[e];
      if (!(n[Na] || n[rl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = n.getAttribute(t) || "";
        f = l + f;
        var c = a.get(f);
        c ? c.push(n) : a.set(f, [n]);
      }
    }
    return a;
  }
  function Pv(l, t, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function Bh(l, t, u) {
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
  function ls(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function ph(l, t, u, a) {
    if (u.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (u.state.loading & 4) === 0) {
      if (u.instance === null) {
        var e = _a(a.href), n = t.querySelector(
          he(e)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Nn.bind(l), t.then(l, l)), u.state.loading |= 4, u.instance = n, Ol(n);
          return;
        }
        n = t.ownerDocument || t, a = Fv(a), (e = mt.get(e)) && kc(a, e), n = n.createElement("link"), Ol(n);
        var f = n;
        f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), Nl(n, "link", a), u.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(u, t), (t = u.state.preload) && (u.state.loading & 3) === 0 && (l.count++, u = Nn.bind(l), t.addEventListener("load", u), t.addEventListener("error", u));
    }
  }
  var Pc = 0;
  function Gh(l, t) {
    return l.stylesheets && l.count === 0 && Rn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(u) {
      var a = setTimeout(function() {
        if (l.stylesheets && Rn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Pc === 0 && (Pc = 62500 * Sh());
      var e = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Rn(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Pc ? 50 : 800) + t
      );
      return l.unsuspend = u, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(e);
      };
    } : null;
  }
  function Nn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Rn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var qn = null;
  function Rn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, qn = /* @__PURE__ */ new Map(), t.forEach(Qh, l), qn = null, Nn.call(l));
  }
  function Qh(l, t) {
    if (!(t.state.loading & 4)) {
      var u = qn.get(l);
      if (u) var a = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), qn.set(l, u);
        for (var e = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < e.length; n++) {
          var f = e[n];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (u.set(f.dataset.precedence, f), a = f);
        }
        a && u.set(null, a);
      }
      e = t.instance, f = e.getAttribute("data-precedence"), n = u.get(f) || a, n === a && u.set(null, e), u.set(f, e), this.count++, a = Nn.bind(this), e.addEventListener("load", a), e.addEventListener("error", a), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
    }
  }
  var me = {
    $$typeof: ql,
    Provider: null,
    Consumer: null,
    _currentValue: B,
    _currentValue2: B,
    _threadCount: 0
  };
  function Xh(l, t, u, a, e, n, f, c, i) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = a, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = i, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ts(l, t, u, a, e, n, f, c, i, h, b, E) {
    return l = new Xh(
      l,
      t,
      u,
      f,
      i,
      h,
      b,
      E,
      c
    ), t = 1, n === !0 && (t |= 24), n = Pl(3, null, null, t), l.current = n, n.stateNode = l, t = Rf(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: u,
      cache: t
    }, pf(n), l;
  }
  function us(l) {
    return l ? (l = ta, l) : ta;
  }
  function as(l, t, u, a, e, n) {
    e = us(e), a.context === null ? a.context = e : a.pendingContext = e, a = uu(t), a.payload = { element: u }, n = n === void 0 ? null : n, n !== null && (a.callback = n), u = au(l, a, t), u !== null && (Jl(u, l, t), wa(u, l, t));
  }
  function es(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < t ? u : t;
    }
  }
  function li(l, t) {
    es(l, t), (l = l.alternate) && es(l, t);
  }
  function ns(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ru(l, 67108864);
      t !== null && Jl(t, l, 67108864), li(l, 67108864);
    }
  }
  function fs(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = et();
      t = Wn(t);
      var u = ru(l, t);
      u !== null && Jl(u, l, t), li(l, t);
    }
  }
  var Cn = !0;
  function jh(l, t, u, a) {
    var e = z.T;
    z.T = null;
    var n = M.p;
    try {
      M.p = 2, ti(l, t, u, a);
    } finally {
      M.p = n, z.T = e;
    }
  }
  function Zh(l, t, u, a) {
    var e = z.T;
    z.T = null;
    var n = M.p;
    try {
      M.p = 8, ti(l, t, u, a);
    } finally {
      M.p = n, z.T = e;
    }
  }
  function ti(l, t, u, a) {
    if (Cn) {
      var e = ui(a);
      if (e === null)
        Zc(
          l,
          t,
          a,
          Yn,
          u
        ), is(l, a);
      else if (Vh(
        e,
        l,
        t,
        u,
        a
      ))
        a.stopPropagation();
      else if (is(l, a), t & 4 && -1 < xh.indexOf(l)) {
        for (; e !== null; ) {
          var n = Lu(e);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var f = Eu(n.pendingLanes);
                  if (f !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                      var i = 1 << 31 - kl(f);
                      c.entanglements[1] |= i, f &= ~i;
                    }
                    rt(n), ($ & 6) === 0 && (gn = $l() + 500, ye(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = ru(n, 2), c !== null && Jl(c, n, 2), bn(), li(n, 2);
            }
          if (n = ui(a), n === null && Zc(
            l,
            t,
            a,
            Yn,
            u
          ), n === e) break;
          e = n;
        }
        e !== null && a.stopPropagation();
      } else
        Zc(
          l,
          t,
          a,
          null,
          u
        );
    }
  }
  function ui(l) {
    return l = af(l), ai(l);
  }
  var Yn = null;
  function ai(l) {
    if (Yn = null, l = Vu(l), l !== null) {
      var t = fl(l);
      if (t === null) l = null;
      else {
        var u = t.tag;
        if (u === 13) {
          if (l = vl(t), l !== null) return l;
          l = null;
        } else if (u === 31) {
          if (l = hl(t), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Yn = l, null;
  }
  function cs(l) {
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
        switch (Ds()) {
          case mi:
            return 2;
          case gi:
            return 8;
          case Ae:
          case Us:
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
  var ei = !1, ou = null, mu = null, gu = null, ge = /* @__PURE__ */ new Map(), Se = /* @__PURE__ */ new Map(), Su = [], xh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function is(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        ou = null;
        break;
      case "dragenter":
      case "dragleave":
        mu = null;
        break;
      case "mouseover":
      case "mouseout":
        gu = null;
        break;
      case "pointerover":
      case "pointerout":
        ge.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Se.delete(t.pointerId);
    }
  }
  function be(l, t, u, a, e, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: u,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [e]
    }, t !== null && (t = Lu(t), t !== null && ns(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
  }
  function Vh(l, t, u, a, e) {
    switch (t) {
      case "focusin":
        return ou = be(
          ou,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "dragenter":
        return mu = be(
          mu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "mouseover":
        return gu = be(
          gu,
          l,
          t,
          u,
          a,
          e
        ), !0;
      case "pointerover":
        var n = e.pointerId;
        return ge.set(
          n,
          be(
            ge.get(n) || null,
            l,
            t,
            u,
            a,
            e
          )
        ), !0;
      case "gotpointercapture":
        return n = e.pointerId, Se.set(
          n,
          be(
            Se.get(n) || null,
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
  function ys(l) {
    var t = Vu(l.target);
    if (t !== null) {
      var u = fl(t);
      if (u !== null) {
        if (t = u.tag, t === 13) {
          if (t = vl(u), t !== null) {
            l.blockedOn = t, _i(l.priority, function() {
              fs(u);
            });
            return;
          }
        } else if (t === 31) {
          if (t = hl(u), t !== null) {
            l.blockedOn = t, _i(l.priority, function() {
              fs(u);
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
        uf = a, u.target.dispatchEvent(a), uf = null;
      } else
        return t = Lu(u), t !== null && ns(t), l.blockedOn = u, !1;
      t.shift();
    }
    return !0;
  }
  function vs(l, t, u) {
    Bn(l) && u.delete(t);
  }
  function Lh() {
    ei = !1, ou !== null && Bn(ou) && (ou = null), mu !== null && Bn(mu) && (mu = null), gu !== null && Bn(gu) && (gu = null), ge.forEach(vs), Se.forEach(vs);
  }
  function pn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, ei || (ei = !0, r.unstable_scheduleCallback(
      r.unstable_NormalPriority,
      Lh
    )));
  }
  var Gn = null;
  function ss(l) {
    Gn !== l && (Gn = l, r.unstable_scheduleCallback(
      r.unstable_NormalPriority,
      function() {
        Gn === l && (Gn = null);
        for (var t = 0; t < l.length; t += 3) {
          var u = l[t], a = l[t + 1], e = l[t + 2];
          if (typeof a != "function") {
            if (ai(a || u) === null)
              continue;
            break;
          }
          var n = Lu(u);
          n !== null && (l.splice(t, 3), t -= 3, uc(
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
  function Ma(l) {
    function t(i) {
      return pn(i, l);
    }
    ou !== null && pn(ou, l), mu !== null && pn(mu, l), gu !== null && pn(gu, l), ge.forEach(t), Se.forEach(t);
    for (var u = 0; u < Su.length; u++) {
      var a = Su[u];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Su.length && (u = Su[0], u.blockedOn === null); )
      ys(u), u.blockedOn === null && Su.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (a = 0; a < u.length; a += 3) {
        var e = u[a], n = u[a + 1], f = e[jl] || null;
        if (typeof n == "function")
          f || ss(u);
        else if (f) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (e = n, f = n[jl] || null)
              c = f.formAction;
            else if (ai(e) !== null) continue;
          } else c = f.action;
          typeof c == "function" ? u[a + 1] = c : (u.splice(a, 3), a -= 3), ss(u);
        }
      }
  }
  function ds() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(f) {
            return e = f;
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
    var u = t.current, a = et();
    as(u, a, l, t, null, null);
  }, Qn.prototype.unmount = ni.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      as(l.current, 2, null, l, null, null), bn(), t[xu] = null;
    }
  };
  function Qn(l) {
    this._internalRoot = l;
  }
  Qn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Ai();
      l = { blockedOn: null, target: l, priority: t };
      for (var u = 0; u < Su.length && t !== 0 && t < Su[u].priority; u++) ;
      Su.splice(u, 0, l), u === 0 && ys(l);
    }
  };
  var hs = g.version;
  if (hs !== "19.2.4")
    throw Error(
      m(
        527,
        hs,
        "19.2.4"
      )
    );
  M.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(m(188)) : (l = Object.keys(l).join(","), Error(m(268, l)));
    return l = _(t), l = l !== null ? F(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Kh = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xn.isDisabled && Xn.supportsFiber)
      try {
        Da = Xn.inject(
          Kh
        ), Fl = Xn;
      } catch {
      }
  }
  return Te.createRoot = function(l, t) {
    if (!cl(l)) throw Error(m(299));
    var u = !1, a = "", e = Ty, n = Ey, f = Ay;
    return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = ts(
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
      f,
      ds
    ), l[xu] = t.current, jc(l), new ni(t);
  }, Te.hydrateRoot = function(l, t, u) {
    if (!cl(l)) throw Error(m(299));
    var a = !1, e = "", n = Ty, f = Ey, c = Ay, i = null;
    return u != null && (u.unstable_strictMode === !0 && (a = !0), u.identifierPrefix !== void 0 && (e = u.identifierPrefix), u.onUncaughtError !== void 0 && (n = u.onUncaughtError), u.onCaughtError !== void 0 && (f = u.onCaughtError), u.onRecoverableError !== void 0 && (c = u.onRecoverableError), u.formState !== void 0 && (i = u.formState)), t = ts(
      l,
      1,
      !0,
      t,
      u ?? null,
      a,
      e,
      i,
      n,
      f,
      c,
      ds
    ), t.context = us(null), u = t.current, a = et(), a = Wn(a), e = uu(a), e.callback = null, au(u, e, a), u = a, t.current.lanes = u, Ha(t, u), rt(t), l[xu] = t.current, jc(l), new Qn(t);
  }, Te.version = "19.2.4", Te;
}
var _s;
function a1() {
  if (_s) return ci.exports;
  _s = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (g) {
        console.error(g);
      }
  }
  return r(), ci.exports = u1(), ci.exports;
}
var e1 = a1(), jn = di();
class n1 {
  constructor(g) {
    Xu(this, "baseUrl");
    Xu(this, "clientId");
    Xu(this, "clientSecret");
    Xu(this, "moderatorId");
    Xu(this, "accessToken", null);
    Xu(this, "tokenExpiresAt", 0);
    this.baseUrl = g.baseUrl.replace(/\/$/, ""), this.clientId = g.clientId, this.clientSecret = g.clientSecret, this.moderatorId = g.moderatorId;
  }
  // ─── Authentication ─────────────────────────────────────────────────────────
  /**
   * Fetches a new OAuth2 bearer token using client credentials flow.
   * POST /oauth2/token
   */
  async authenticate() {
    const g = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret
    }), O = await fetch(`${this.baseUrl}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: g.toString()
    });
    if (!O.ok)
      throw new Error(`Authentication failed: ${O.status} ${O.statusText}`);
    const m = await O.json();
    return this.accessToken = m.access_token, this.tokenExpiresAt = Date.now() + m.expires_in * 1e3 - 6e4, m;
  }
  /** Returns a valid bearer token, re-authenticating if expired. */
  async getToken() {
    return (!this.accessToken || Date.now() >= this.tokenExpiresAt) && await this.authenticate(), this.accessToken;
  }
  // ─── Core Request Helper ────────────────────────────────────────────────────
  async request(g, O = {}, m) {
    const cl = await this.getToken(), fl = new URL(`${this.baseUrl}${g}`);
    if (m)
      for (const [hl, q] of Object.entries(m))
        q !== void 0 && fl.searchParams.set(hl, String(q));
    this.moderatorId && fl.searchParams.set("moderatorId", this.moderatorId);
    const vl = await fetch(fl.toString(), {
      ...O,
      headers: {
        Authorization: `Bearer ${cl}`,
        "Content-Type": "application/json",
        ...O.headers ?? {}
      }
    });
    if (!vl.ok) {
      const hl = await vl.text().catch(() => "");
      throw new Error(`API error ${vl.status} on ${g}: ${hl}`);
    }
    return vl.json();
  }
  // ─── Conversations ──────────────────────────────────────────────────────────
  /**
   * List conversations (community discussions).
   * GET /v2/conversations
   */
  async getConversations(g) {
    return this.request("/v2/conversations", {}, {
      page: g == null ? void 0 : g.page,
      pageSize: g == null ? void 0 : g.pageSize,
      categoryId: g == null ? void 0 : g.categoryId,
      tag: g == null ? void 0 : g.tag,
      authorId: g == null ? void 0 : g.authorId
    });
  }
  /**
   * Get a single conversation by its private ID.
   * GET /v2/conversations/{id}
   */
  async getConversation(g) {
    return this.request(`/v2/conversations/${g}`);
  }
  /**
   * Get replies for a conversation.
   * GET /v2/conversations/{id}/replies
   */
  async getConversationReplies(g, O) {
    return this.request(`/v2/conversations/${g}/replies`, {}, {
      page: O == null ? void 0 : O.page,
      pageSize: O == null ? void 0 : O.pageSize
    });
  }
  // ─── Articles ───────────────────────────────────────────────────────────────
  /**
   * List articles.
   * GET /v2/articles
   */
  async getArticles(g) {
    return this.request("/v2/articles", {}, {
      page: g == null ? void 0 : g.page,
      pageSize: g == null ? void 0 : g.pageSize,
      categoryId: g == null ? void 0 : g.categoryId,
      tag: g == null ? void 0 : g.tag,
      authorId: g == null ? void 0 : g.authorId
    });
  }
  /**
   * Get a single article by its private ID.
   * GET /v2/articles/{id}
   */
  async getArticle(g) {
    return this.request(`/v2/articles/${g}`);
  }
  /**
   * Get replies for an article.
   * GET /v2/articles/{id}/replies
   */
  async getArticleReplies(g, O) {
    return this.request(`/v2/articles/${g}/replies`, {}, {
      page: O == null ? void 0 : O.page,
      pageSize: O == null ? void 0 : O.pageSize
    });
  }
  // ─── Questions ──────────────────────────────────────────────────────────────
  /**
   * List questions.
   * GET /v2/questions
   */
  async getQuestions(g) {
    return this.request("/v2/questions", {}, {
      page: g == null ? void 0 : g.page,
      pageSize: g == null ? void 0 : g.pageSize,
      categoryId: g == null ? void 0 : g.categoryId,
      tag: g == null ? void 0 : g.tag,
      authorId: g == null ? void 0 : g.authorId
    });
  }
  /**
   * Get a single question by its private ID.
   * GET /v2/questions/{id}
   */
  async getQuestion(g) {
    return this.request(`/v2/questions/${g}`);
  }
  /**
   * Get replies for a question.
   * GET /v2/questions/{id}/replies
   */
  async getQuestionReplies(g, O) {
    return this.request(`/v2/questions/${g}/replies`, {}, {
      page: O == null ? void 0 : O.page,
      pageSize: O == null ? void 0 : O.pageSize
    });
  }
  // ─── Ideas ──────────────────────────────────────────────────────────────────
  /**
   * List ideas.
   * GET /v2/ideas
   */
  async getIdeas(g) {
    return this.request("/v2/ideas", {}, {
      page: g == null ? void 0 : g.page,
      pageSize: g == null ? void 0 : g.pageSize,
      categoryId: g == null ? void 0 : g.categoryId,
      tag: g == null ? void 0 : g.tag,
      authorId: g == null ? void 0 : g.authorId
    });
  }
  /**
   * Get a single idea by its private ID.
   * GET /v2/ideas/{id}
   */
  async getIdea(g) {
    return this.request(`/v2/ideas/${g}`);
  }
  /**
   * Get replies for an idea.
   * GET /v2/ideas/{id}/replies
   */
  async getIdeaReplies(g, O) {
    return this.request(`/v2/ideas/${g}/replies`, {}, {
      page: O == null ? void 0 : O.page,
      pageSize: O == null ? void 0 : O.pageSize
    });
  }
  // ─── Users ──────────────────────────────────────────────────────────────────
  /**
   * Get a user profile by ID.
   * GET /v2/users/{id}
   */
  async getUser(g) {
    return this.request(`/v2/users/${g}`);
  }
  /**
   * List users.
   * GET /v2/users
   */
  async getUsers(g) {
    return this.request("/v2/users", {}, {
      page: g == null ? void 0 : g.page,
      pageSize: g == null ? void 0 : g.pageSize
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
  async getSpace(g) {
    return this.request(`/v2/spaces/${g}`);
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
  async getCategory(g) {
    return this.request(`/v2/categories/${g}`);
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
  async subscribeToWebhook(g, O) {
    return this.request(
      `/webhooks/${encodeURIComponent(g)}/subscriptions`,
      {
        method: "POST",
        body: JSON.stringify(O)
      }
    );
  }
  /**
   * List subscriptions for a webhook event.
   * GET /webhooks/{eventName}/subscriptions
   */
  async getWebhookSubscriptions(g) {
    return this.request(
      `/webhooks/${encodeURIComponent(g)}/subscriptions`
    );
  }
  /**
   * Delete a webhook subscription.
   * DELETE /webhooks/{eventName}/subscriptions/{subscriptionId}
   */
  async deleteWebhookSubscription(g, O) {
    await this.request(
      `/webhooks/${encodeURIComponent(g)}/subscriptions/${O}`,
      { method: "DELETE" }
    );
  }
  // ─── Utility ─────────────────────────────────────────────────────────────────
  /**
   * Set a moderator ID to include on all subsequent requests.
   * This allows performing actions as a specific moderator user.
   */
  setModeratorId(g) {
    this.moderatorId = g;
  }
  /** Clear the cached access token, forcing re-authentication on the next call. */
  clearToken() {
    this.accessToken = null, this.tokenExpiresAt = 0;
  }
}
function f1({ sdk: r }) {
  const [g, O] = jn.useState(r.getProps()), [m, cl] = jn.useState(!1), fl = new n1({
    baseUrl: "https://api2-us-west-2.insided.com/",
    clientId: "ce9f904c-02bf-41a4-8706-19c24b9752d8",
    clientSecret: "61e3aed3d08d50709faa9e11da4856a8ac6d33b41d2a65af16c90c93d4b11f55"
  });
  jn.useEffect(() => r.on("propsChanged", O), [r]), jn.useEffect(() => {
    fl.authenticate().then(() => {
      console.log("Authenticated with Gainsight Community API"), cl(!0);
    }).catch((hl) => {
      console.error("Failed to authenticate with Gainsight Community API:", hl);
    });
  }, [fl]);
  const vl = () => {
    const hl = prompt("Enter new title:", g.title), q = prompt("Enter new description:", g.description);
    O({ title: hl, description: q });
  };
  return /* @__PURE__ */ ju.jsxs("section", { className: "react-widget-section", children: [
    /* @__PURE__ */ ju.jsx("h3", { className: "react-widget-title", children: g.title }),
    g.description && /* @__PURE__ */ ju.jsx("p", { className: "react-widget-description", children: g.description }),
    /* @__PURE__ */ ju.jsx("button", { onClick: vl, children: "Update Props" }),
    m ? /* @__PURE__ */ ju.jsx("p", { children: "Authenticated with Gainsight Community API. You can now make API calls." }) : /* @__PURE__ */ ju.jsx("p", { children: "Authenticating with Gainsight Community API..." })
  ] });
}
async function i1(r) {
  await r.whenReady();
  const g = e1.createRoot(r.getContainer());
  g.render(/* @__PURE__ */ ju.jsx(f1, { sdk: r })), r.on("destroy", () => g.unmount());
}
export {
  i1 as init
};
