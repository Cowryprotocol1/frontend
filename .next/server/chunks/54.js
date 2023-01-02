"use strict";
exports.id = 54;
exports.ids = [54];
exports.modules = {

/***/ 5054:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ArrowLink)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_clsxm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3410);
/* harmony import */ var _components_links_UnderlineLink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(589);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_clsxm__WEBPACK_IMPORTED_MODULE_2__, _components_links_UnderlineLink__WEBPACK_IMPORTED_MODULE_3__]);
([_lib_clsxm__WEBPACK_IMPORTED_MODULE_2__, _components_links_UnderlineLink__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




function ArrowLink({ children , className , direction ="right" , as , ...rest }) {
    const Component = as || _components_links_UnderlineLink__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Component, {
        ...rest,
        className: (0,_lib_clsxm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)("group gap-[0.25em]", direction === "left" && "flex-row-reverse", className),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                children: children
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                viewBox: "0 0 16 16",
                height: "1em",
                width: "1em",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: (0,_lib_clsxm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)("relative", "transition-transform duration-200", direction === "right" ? "motion-safe:-translate-x-1" : "rotate-180", "group-hover:translate-x-0"),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        fill: "currentColor",
                        d: "M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        stroke: "currentColor",
                        d: "M1.75 8H11",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        className: (0,_lib_clsxm__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)("origin-left transition-all duration-200", "opacity-0 motion-safe:-translate-x-1", "group-hover:translate-x-0 group-hover:opacity-100")
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;