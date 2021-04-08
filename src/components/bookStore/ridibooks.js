(window.webpackJsonp = window.webpackJsonp || []).push([
  [20],
  {
    DPaF: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return z;
      });
      var i = n("ODXe"),
        r = n("wTIg"),
        a = n("qKvR"),
        o = n("q1tI"),
        l = n.n(o),
        c = n("s/Ur"),
        u = n("dCXs"),
        d = n("IGQd"),
        s = n("4cc1"),
        b = n("ir/e"),
        h = n("GpEc");
      l.a.createElement;
      var f = 0.965,
        p = 10,
        g = 430,
        v = 355,
        w = 1,
        x = 5e3,
        m = Object(r.a)("div", {
          target: "ergyl4f0",
          label: "CarouselWrapper",
        })(
          "width:100%;margin:0 auto;position:relative;overflow:hidden;@media (min-width:375px){max-width:",
          v + (v + p) * (w + 1) * 2,
          "px;}@media (min-width:1000px){max-width:",
          g + (g * f + p) * (w + 1) * 2,
          "px;}"
        ),
        j = Object(r.a)("div", {
          target: "ergyl4f1",
          label: "CarouselControllerWrapper",
        })({
          name: "1r5lwe4",
          styles:
            "position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;display:flex;align-items:center;justify-content:center;pointer-events:none;",
        }),
        O = Object(r.a)("div", {
          target: "ergyl4f2",
          label: "CarouselController",
        })(
          "position:relative;width:calc(100vw - ",
          2 * p,
          "px);height:calc(66.67vw - ",
          (4 * p) / 3,
          "px);@media (min-width:375px){width:",
          v,
          "px;height:",
          (2 * v) / 3,
          "px;}@media (min-width:1000px){width:",
          g,
          "px;height:",
          (2 * g) / 3,
          "px;}"
        ),
        y = Object(r.a)("div", {
          target: "ergyl4f3",
          label: "SlideBadge",
        })({
          name: "qxaxpj",
          styles:
            "position:absolute;right:10px;bottom:10px;width:54px;height:24px;background-color:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.25);border-radius:12px;font-size:12px;line-height:22px;text-align:center;color:white;",
        }),
        k = {
          name: "38zs60-arrowStyle",
          styles:
            "opacity:0.5;transition:opacity 0.1s;cursor:pointer;:hover,:focus{opacity:1;}@media (hover:none){:hover{opacity:0.5;}};label:arrowStyle;",
        },
        C = Object(r.a)("a", {
          target: "ergyl4f4",
          label: "BannerImageLink",
        })({
          name: "1okfzik",
          styles: "width:100%;height:100%;display:inline-block;outline:none;",
        }),
        E = Object(r.a)("img", {
          target: "ergyl4f5",
          label: "BannerImage",
        })({
          name: "1sb3yjr",
          styles:
            "width:100%;height:100%;object-fit:cover;object-position:0 0;",
        }),
        I = Object(r.a)("li", {
          target: "ergyl4f6",
          label: "CarouselItemContainer",
        })(
          "flex:none;position:relative;width:calc(100vw - ",
          2 * p,
          "px);height:calc(66.6667vw - ",
          (4 * p) / 3,
          "px);@media (min-width:375px){width:",
          v,
          "px;height:",
          (2 * v) / 3,
          "px;}@media (min-width:1000px){width:",
          function (e) {
            return g * (e.active ? 1 : f);
          },
          "px;height:",
          function (e) {
            return (2 * g * (e.active ? 1 : f)) / 3;
          },
          "px;}overflow:hidden;border-radius:6px;line-height:0;transition:width 0.2s,height 0.2s,box-shadow 0.2s,opacity 0.2s;opacity:",
          function (e) {
            return e.invisible ? 0 : 1;
          },
          ";&:focus-within{box-shadow:0 0.8px 3px rgba(0,0,0,0.33);}&::after{display:block;content:'';position:absolute;left:0;top:0;width:100%;height:100%;transition:background-color 0.2s;background-color:rgba(26,26,26,",
          function (e) {
            return e.active ? 0 : 0.5;
          },
          ");",
          function (e) {
            return !e.invisible && "pointer-events: none;";
          },
          "}"
        ),
        S = Object(r.a)("div", {
          target: "ergyl4f7",
          label: "BannerBadge",
        })({
          name: "1pju6vf",
          styles:
            "position:absolute;right:12px;top:12px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background-color:#e64937;border:1px solid rgba(0,0,0,0.2);border-radius:22px;font-size:12px;font-weight:bold;text-align:center;color:white;word-break:keep-all;line-height:12px;",
        }),
        T = Object(r.a)("div", {
          target: "ergyl4f8",
          label: "ArrowWrapper",
        })({
          name: "4xahg1",
          styles: "opacity:0.7;margin:0 20px;pointer-events:auto;",
        }),
        X = Object(a.d)(
          "height:calc(66.67vw - ",
          (4 * p) / 3,
          "px);@media (min-width:375px){height:",
          (2 * v) / 3,
          "px;}@media (min-width:1000px){height:",
          (2 * g) / 3,
          "px;};label:carouselHeight;"
        );
      function _(e) {
        var t = e.banner,
          n = e.active,
          r = e.invisible,
          o = e.slug,
          c = l.a.useState(!1),
          u = Object(i.a)(c, 2),
          d = u[0],
          h = u[1],
          f = Object(b.b)(h),
          p = l.a.useCallback(
            function () {
              s.b(t, o);
            },
            [t, o]
          );
        return Object(a.e)(
          I,
          {
            ref: f,
            active: n,
            invisible: r,
          },
          Object(a.e)(
            C,
            {
              onClick: p,
              href: t.landing_url,
              tabIndex: n ? 0 : -1,
            },
            (!r || d) &&
              Object(a.e)(E, {
                alt: t.title,
                src: t.main_image_url,
              }),
            t.is_badge_available &&
              null != t.badge &&
              Object(a.e)(
                S,
                null,
                "END_TODAY" === t.badge && "\uc624\ub298 \ub9c8\uac10",
                "END_IN_3DAY" === t.badge && "\ub9c8\uac10 \uc784\ubc15"
              )
          )
        );
      }
      function z(e) {
        var t = e.banners,
          n = e.slug,
          r = t.length,
          o = l.a.useState(0),
          b = Object(i.a)(o, 2),
          C = b[0],
          E = b[1],
          I = l.a.useState(),
          S = Object(i.a)(I, 2),
          z = S[0],
          D = S[1],
          B = l.a.useCallback(
            function () {
              return E(function (e) {
                return (e - 1 + r) % r;
              });
            },
            [r]
          ),
          W = l.a.useCallback(
            function () {
              return E(function (e) {
                return (e + 1) % r;
              });
            },
            [r]
          ),
          L = Object(c.useMediaQuery)({
            minWidth: "1000px",
          }),
          M = Object(c.useMediaQuery)({
            minWidth: "375px",
          }),
          R = l.a.useRef(),
          q = l.a.useState(1),
          A = Object(i.a)(q, 2),
          H = A[0],
          N = A[1];
        l.a.useEffect(
          function () {
            function e() {
              R.current = void 0;
            }
            var t = (function (e, t) {
              return e ? g : t ? v : null;
            })(L, M);
            if (null == t)
              return (
                window.addEventListener("resize", e),
                e(),
                function () {
                  return window.removeEventListener("resize", e);
                }
              );
            R.current = t;
          },
          [L, M]
        ),
          l.a.useEffect(
            function () {
              N(L ? f : 1);
            },
            [L]
          );
        var Q = Object(h.b)().isMobile,
          F = l.a.useRef(null),
          G = l.a.useRef(),
          J = l.a.useCallback(function (e) {
            if (null == G.current) {
              D(0);
              var t = e.touches[0];
              G.current = {
                id: t.identifier,
                startX: t.clientX,
                at: window.performance.now(),
              };
            }
          }, []);
        l.a.useEffect(function () {
          var e;
          function t(e) {
            if (null != G.current)
              for (var t = e.changedTouches, n = 0; n < t.length; n += 1) {
                var i,
                  r = t[n];
                if (
                  r.identifier ===
                  (null === G || void 0 === G
                    ? void 0
                    : null === (i = G.current) || void 0 === i
                    ? void 0
                    : i.id)
                ) {
                  var a,
                    o =
                      r.clientX -
                      (null === G || void 0 === G
                        ? void 0
                        : null === (a = G.current) || void 0 === a
                        ? void 0
                        : a.startX);
                  D(o);
                  break;
                }
              }
          }
          return (
            null === (e = F.current) ||
              void 0 === e ||
              e.addEventListener("touchmove", t, {
                passive: !1,
              }),
            function () {
              var e;
              return null === (e = F.current) || void 0 === e
                ? void 0
                : e.removeEventListener("touchmove", t);
            }
          );
        }, []);
        var Y = l.a.useCallback(function (e) {
            if (null != G.current) {
              null == R.current && (R.current = window.innerWidth - 2 * p);
              for (
                var t = R.current, n = e.changedTouches, i = 0;
                i < n.length;
                i += 1
              ) {
                var a = n[i];
                if (a.identifier === G.current.id) {
                  var o = a.clientX - G.current.startX,
                    l = o / (window.performance.now() - G.current.at),
                    c = (t + p) / 200 / 3;
                  (o > t / 3 || l > c) &&
                    E(function (e) {
                      return (e - 1 + r) % r;
                    }),
                    (o < -t / 3 || l < -c) &&
                      E(function (e) {
                        return (e + 1) % r;
                      }),
                    D(void 0),
                    (G.current = void 0);
                  break;
                }
              }
            }
          }, []),
          K = l.a.useCallback(function (e) {
            if (null != G.current)
              for (var t = e.changedTouches, n = 0; n < t.length; n += 1)
                if (t[n].identifier === G.current.id) {
                  D(void 0), (G.current = void 0);
                  break;
                }
          }, []),
          P = l.a.useState(!1),
          U = Object(i.a)(P, 2),
          V = U[0],
          Z = U[1],
          $ = l.a.useCallback(function () {
            return Z(!0);
          }, []),
          ee = l.a.useCallback(function () {
            return Z(!1);
          }, []);
        return (
          l.a.useEffect(
            function () {
              if (null == z && !V) {
                var e = window.setTimeout(W, x);
                return function () {
                  return window.clearTimeout(e);
                };
              }
            },
            [W, C, z, V]
          ),
          l.a.useEffect(
            function () {
              window.setImmediate(function () {
                s.c({
                  slug: n,
                  id: String(t[C].id),
                  order: C,
                });
              });
            },
            [t, C]
          ),
          Object(a.e)(
            m,
            {
              ref: F,
              onTouchStart: J,
              onTouchEnd: Y,
              onTouchCancel: K,
              onFocus: $,
              onBlur: ee,
            },
            Object(a.e)(
              d.a,
              {
                totalItems: r,
                itemMargin: p,
                inactiveScale: H,
                currentIdx: C,
                touchDiff: z,
                css: X,
              },
              function (e) {
                var i,
                  o,
                  l,
                  c = e.index,
                  u = e.active,
                  d = e.activeIndex;
                return Object(a.e)(_, {
                  slug: n,
                  key: c,
                  banner: t[c],
                  active: u,
                  invisible:
                    ((i = (d - w + r) % r),
                    (o = (d + w) % r),
                    (l = c),
                    !(i <= o ? i <= l && l <= o : l <= o || i <= l)),
                });
              }
            ),
            Object(a.e)(
              j,
              null,
              Object(a.e)(
                O,
                null,
                Object(a.e)(
                  y,
                  null,
                  Object(a.e)("strong", null, C + 1),
                  " / ".concat(r)
                )
              )
            ),
            !Q &&
              Object(a.e)(
                j,
                null,
                Object(a.e)(
                  T,
                  null,
                  Object(a.e)(u.a, {
                    side: "left",
                    onClickHandler: B,
                    label: "\uc774\uc804 \ubc30\ub108 \ubcf4\uae30",
                    css: k,
                  })
                ),
                Object(a.e)(O, null),
                Object(a.e)(
                  T,
                  null,
                  Object(a.e)(u.a, {
                    onClickHandler: W,
                    side: "right",
                    label: "\ub2e4\uc74c \ubc30\ub108 \ubcf4\uae30",
                    css: k,
                  })
                )
              )
          )
        );
      }
    },
  },
]);
