import { template as _$template } from "solid-js/web";
import { memo as _$memo } from "solid-js/web";
import { spread as _$spread } from "solid-js/web";
import { mergeProps as _$mergeProps } from "solid-js/web";
import { setAttribute as _$setAttribute } from "solid-js/web";
import { effect as _$effect } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
const _tmpl$ = /* @__PURE__ */ _$template(`<svg><g><path></svg>`, false, true), _tmpl$2 = /* @__PURE__ */ _$template(`<svg><use></svg>`, false, true), _tmpl$3 = /* @__PURE__ */ _$template(`<svg><image></svg>`, false, true), _tmpl$4 = /* @__PURE__ */ _$template(`<svg width=100%><defs>`), _tmpl$5 = /* @__PURE__ */ _$template(`<svg><g><mask id=mask></mask><rect x=0 y=0 width=100% height=100% mask="url('#mask')"></svg>`, false, true), _tmpl$6 = /* @__PURE__ */ _$template(`<svg><path></svg>`, false, true), _tmpl$7 = /* @__PURE__ */ _$template(`<svg><pattern patternUnits=userSpaceOnUse width=100% height=100%><image x=0 y=0 width=100% height=100% preserveAspectRatio="xMidYMid slice"></svg>`, false, true), _tmpl$8 = /* @__PURE__ */ _$template(`<svg><stop></svg>`, false, true);
import { getSVGData } from "@qr-x/core";
import { createMemo, For, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
function QRX($props) {
  const [props, rest] = splitProps($props, ["data", "level", "shapes", "image", "gradient", "fillImage", "logo"]);
  const svg = createMemo(() => getSVGData(props));
  const logoSqueezeFactor = 6;
  const group = (() => {
    const _el$ = _tmpl$(), _el$2 = _el$.firstChild;
    _$insert(_el$, _$createComponent(For, {
      get each() {
        return svg().eyeItems;
      },
      children: (item) => _$createComponent(For, {
        get each() {
          return svg().markers;
        },
        children: (marker) => (() => {
          const _el$3 = _tmpl$2();
          _$spread(_el$3, _$mergeProps({
            get href() {
              return `#${svg().ids[item]}`;
            }
          }, marker), true, false);
          return _el$3;
        })()
      })
    }), null);
    _$effect((_p$) => {
      const _v$ = svg().fills.path, _v$2 = svg().paths.body;
      _v$ !== _p$._v$ && _$setAttribute(_el$, "fill", _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && _$setAttribute(_el$2, "d", _p$._v$2 = _v$2);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0
    });
    return _el$;
  })();
  return (() => {
    const _el$4 = _tmpl$4(), _el$5 = _el$4.firstChild;
    _$spread(_el$4, _$mergeProps(rest, {
      get viewBox() {
        return `0 0 ${svg().length} ${svg().length}`;
      }
    }), true, true);
    _$insert(_el$4, (() => {
      const _c$ = _$memo(() => !!svg().isMasked);
      return () => _c$() ? (() => {
        const _el$7 = _tmpl$5(), _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling;
        _$insert(_el$8, group);
        _$effect(() => _$setAttribute(_el$9, "fill", svg().fills.rect));
        return _el$7;
      })() : group;
    })(), _el$5);
    _$insert(_el$5, _$createComponent(For, {
      get each() {
        return svg().eyeItems;
      },
      children: (item) => (() => {
        const _el$10 = _tmpl$6();
        _$effect((_p$) => {
          const _v$8 = svg().ids[item], _v$9 = svg().paths[item];
          _v$8 !== _p$._v$8 && _$setAttribute(_el$10, "id", _p$._v$8 = _v$8);
          _v$9 !== _p$._v$9 && _$setAttribute(_el$10, "d", _p$._v$9 = _v$9);
          return _p$;
        }, {
          _v$8: void 0,
          _v$9: void 0
        });
        return _el$10;
      })()
    }), null);
    _$insert(_el$5, _$createComponent(Show, {
      get when() {
        return svg().gradient;
      },
      get fallback() {
        return _$createComponent(Show, {
          get when() {
            return props.fillImage;
          },
          get children() {
            const _el$11 = _tmpl$7(), _el$12 = _el$11.firstChild;
            _$effect((_p$) => {
              const _v$10 = svg().ids.image, _v$11 = props.fillImage;
              _v$10 !== _p$._v$10 && _$setAttribute(_el$11, "id", _p$._v$10 = _v$10);
              _v$11 !== _p$._v$11 && _$setAttribute(_el$12, "href", _p$._v$11 = _v$11);
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
        return _$createComponent(Dynamic, _$mergeProps({
          get component() {
            return svg().gradient?.isLinearGradient ? "linearGradient" : "radialGradient";
          }
        }, () => svg().gradient?.attributes, {
          get children() {
            return _$createComponent(For, {
              get each() {
                return svg().gradient?.colors;
              },
              children: ({
                color,
                offset
              }) => (() => {
                const _el$13 = _tmpl$8();
                _$setAttribute(_el$13, "offset", offset);
                _$setAttribute(_el$13, "stop-color", color);
                return _el$13;
              })()
            });
          }
        }));
      }
    }), null);
    _$insert(_el$4, _$createComponent(Show, {
      get when() {
        return props.logo;
      },
      get children() {
        const _el$6 = _tmpl$3();
        _$effect((_p$) => {
          const _v$3 = props.logo?.src, _v$4 = svg().length / 2 - svg().length / logoSqueezeFactor / 2, _v$5 = svg().length / 2 - svg().length / logoSqueezeFactor / 2, _v$6 = svg().length / logoSqueezeFactor, _v$7 = svg().length / logoSqueezeFactor;
          _v$3 !== _p$._v$3 && _$setAttribute(_el$6, "href", _p$._v$3 = _v$3);
          _v$4 !== _p$._v$4 && _$setAttribute(_el$6, "x", _p$._v$4 = _v$4);
          _v$5 !== _p$._v$5 && _$setAttribute(_el$6, "y", _p$._v$5 = _v$5);
          _v$6 !== _p$._v$6 && _$setAttribute(_el$6, "height", _p$._v$6 = _v$6);
          _v$7 !== _p$._v$7 && _$setAttribute(_el$6, "width", _p$._v$7 = _v$7);
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
export {
  QRX as default
};
