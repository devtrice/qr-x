"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var solid_exports = {};
__export(solid_exports, {
  default: () => QRX
});
module.exports = __toCommonJS(solid_exports);
var import_web = require("solid-js/web");
var import_web2 = require("solid-js/web");
var import_web3 = require("solid-js/web");
var import_web4 = require("solid-js/web");
var import_web5 = require("solid-js/web");
var import_web6 = require("solid-js/web");
var import_web7 = require("solid-js/web");
var import_web8 = require("solid-js/web");
var import_core = require("@qr-x/core");
var import_solid_js = require("solid-js");
var import_web9 = require("solid-js/web");
const _tmpl$ = /* @__PURE__ */ (0, import_web.template)(`<svg><g><path></svg>`, false, true), _tmpl$2 = /* @__PURE__ */ (0, import_web.template)(`<svg><use></svg>`, false, true), _tmpl$3 = /* @__PURE__ */ (0, import_web.template)(`<svg><image></svg>`, false, true), _tmpl$4 = /* @__PURE__ */ (0, import_web.template)(`<svg width=100%><defs>`), _tmpl$5 = /* @__PURE__ */ (0, import_web.template)(`<svg><g><mask id=mask></mask><rect x=0 y=0 width=100% height=100% mask="url('#mask')"></svg>`, false, true), _tmpl$6 = /* @__PURE__ */ (0, import_web.template)(`<svg><path></svg>`, false, true), _tmpl$7 = /* @__PURE__ */ (0, import_web.template)(`<svg><pattern patternUnits=userSpaceOnUse width=100% height=100%><image x=0 y=0 width=100% height=100% preserveAspectRatio="xMidYMid slice"></svg>`, false, true), _tmpl$8 = /* @__PURE__ */ (0, import_web.template)(`<svg><stop></svg>`, false, true);
function QRX($props) {
  const [props, rest] = (0, import_solid_js.splitProps)($props, ["data", "level", "shapes", "image", "gradient", "fillImage", "logo"]);
  const svg = (0, import_solid_js.createMemo)(() => (0, import_core.getSVGData)(props));
  const logoSqueezeFactor = 6;
  const group = (() => {
    const _el$ = _tmpl$(), _el$2 = _el$.firstChild;
    (0, import_web7.insert)(_el$, (0, import_web8.createComponent)(import_solid_js.For, {
      get each() {
        return svg().eyeItems;
      },
      children: (item) => (0, import_web8.createComponent)(import_solid_js.For, {
        get each() {
          return svg().markers;
        },
        children: (marker) => (() => {
          const _el$3 = _tmpl$2();
          (0, import_web3.spread)(_el$3, (0, import_web4.mergeProps)({
            get href() {
              return `#${svg().ids[item]}`;
            }
          }, marker), true, false);
          return _el$3;
        })()
      })
    }), null);
    (0, import_web6.effect)((_p$) => {
      const _v$ = svg().fills.path, _v$2 = svg().paths.body;
      _v$ !== _p$._v$ && (0, import_web5.setAttribute)(_el$, "fill", _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && (0, import_web5.setAttribute)(_el$2, "d", _p$._v$2 = _v$2);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0
    });
    return _el$;
  })();
  return (() => {
    const _el$4 = _tmpl$4(), _el$5 = _el$4.firstChild;
    (0, import_web3.spread)(_el$4, (0, import_web4.mergeProps)(rest, {
      get viewBox() {
        return `0 0 ${svg().length} ${svg().length}`;
      }
    }), true, true);
    (0, import_web7.insert)(_el$4, (() => {
      const _c$ = (0, import_web2.memo)(() => !!svg().isMasked);
      return () => _c$() ? (() => {
        const _el$7 = _tmpl$5(), _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling;
        (0, import_web7.insert)(_el$8, group);
        (0, import_web6.effect)(() => (0, import_web5.setAttribute)(_el$9, "fill", svg().fills.rect));
        return _el$7;
      })() : group;
    })(), _el$5);
    (0, import_web7.insert)(_el$5, (0, import_web8.createComponent)(import_solid_js.For, {
      get each() {
        return svg().eyeItems;
      },
      children: (item) => (() => {
        const _el$10 = _tmpl$6();
        (0, import_web6.effect)((_p$) => {
          const _v$8 = svg().ids[item], _v$9 = svg().paths[item];
          _v$8 !== _p$._v$8 && (0, import_web5.setAttribute)(_el$10, "id", _p$._v$8 = _v$8);
          _v$9 !== _p$._v$9 && (0, import_web5.setAttribute)(_el$10, "d", _p$._v$9 = _v$9);
          return _p$;
        }, {
          _v$8: void 0,
          _v$9: void 0
        });
        return _el$10;
      })()
    }), null);
    (0, import_web7.insert)(_el$5, (0, import_web8.createComponent)(import_solid_js.Show, {
      get when() {
        return svg().gradient;
      },
      get fallback() {
        return (0, import_web8.createComponent)(import_solid_js.Show, {
          get when() {
            return props.fillImage;
          },
          get children() {
            const _el$11 = _tmpl$7(), _el$12 = _el$11.firstChild;
            (0, import_web6.effect)((_p$) => {
              const _v$10 = svg().ids.image, _v$11 = props.fillImage;
              _v$10 !== _p$._v$10 && (0, import_web5.setAttribute)(_el$11, "id", _p$._v$10 = _v$10);
              _v$11 !== _p$._v$11 && (0, import_web5.setAttribute)(_el$12, "href", _p$._v$11 = _v$11);
              return _p$;
            }, {
              _v$10: void 0,
              _v$11: void 0
            });
            return _el$11;
          }
        });
      },
      get children() {
        return (0, import_web8.createComponent)(import_web9.Dynamic, (0, import_web4.mergeProps)({
          get component() {
            return svg().gradient?.isLinearGradient ? "linearGradient" : "radialGradient";
          }
        }, () => svg().gradient?.attributes, {
          get children() {
            return (0, import_web8.createComponent)(import_solid_js.For, {
              get each() {
                return svg().gradient?.colors;
              },
              children: ({
                color,
                offset
              }) => (() => {
                const _el$13 = _tmpl$8();
                (0, import_web5.setAttribute)(_el$13, "offset", offset);
                (0, import_web5.setAttribute)(_el$13, "stop-color", color);
                return _el$13;
              })()
            });
          }
        }));
      }
    }), null);
    (0, import_web7.insert)(_el$4, (0, import_web8.createComponent)(import_solid_js.Show, {
      get when() {
        return props.logo;
      },
      get children() {
        const _el$6 = _tmpl$3();
        (0, import_web6.effect)((_p$) => {
          const _v$3 = props.logo?.src, _v$4 = svg().length / 2 - svg().length / logoSqueezeFactor / 2, _v$5 = svg().length / 2 - svg().length / logoSqueezeFactor / 2, _v$6 = svg().length / logoSqueezeFactor, _v$7 = svg().length / logoSqueezeFactor;
          _v$3 !== _p$._v$3 && (0, import_web5.setAttribute)(_el$6, "href", _p$._v$3 = _v$3);
          _v$4 !== _p$._v$4 && (0, import_web5.setAttribute)(_el$6, "x", _p$._v$4 = _v$4);
          _v$5 !== _p$._v$5 && (0, import_web5.setAttribute)(_el$6, "y", _p$._v$5 = _v$5);
          _v$6 !== _p$._v$6 && (0, import_web5.setAttribute)(_el$6, "height", _p$._v$6 = _v$6);
          _v$7 !== _p$._v$7 && (0, import_web5.setAttribute)(_el$6, "width", _p$._v$7 = _v$7);
          return _p$;
        }, {
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0,
          _v$6: void 0,
          _v$7: void 0
        });
        return _el$6;
      }
    }), null);
    return _el$4;
  })();
}
