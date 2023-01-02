"use strict";
exports.id = 67;
exports.ids = [67];
exports.modules = {

/***/ 8786:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n5": () => (/* binding */ User)
/* harmony export */ });
/* unused harmony exports normalUser, ifpUser */
const normalUser = [
    {
        id: 1,
        name: "tanner linsley",
        image: "https://picsum.photos/200",
        wallet_address: "GVEW23243J3H4H4N4",
        role: "user",
        joined: new Date()
    }
];
const ifpUser = [
    {
        id: 2,
        name: "tandy miller",
        image: "https://picsum.photos/200",
        wallet_address: "GVEW23243J3H4H4N4",
        role: "ifp",
        joined: new Date()
    }
];
const User = [
    {
        id: 1,
        name: "tanner linsley",
        image: "https://picsum.photos/200",
        wallet_address: "GVEW23243J3H4H4N4",
        role: "user",
        joined: new Date()
    },
    {
        id: 2,
        name: "tandy miller",
        image: "https://picsum.photos/200",
        wallet_address: "GVEW23243J3H4H4N4",
        role: "ifp",
        joined: new Date()
    }
];


/***/ }),

/***/ 9067:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ useUser),
/* harmony export */   "d": () => (/* binding */ UserProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constant_dummydata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8786);



const UserContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    userData: _constant_dummydata__WEBPACK_IMPORTED_MODULE_2__/* .User[0] */ .n5[0] || null,
    setUserData: ()=>null,
    initialUserStatus: ()=>null,
    logout: null,
    setLogout: ()=>null,
    toggleLogoutMode: ()=>null,
    role: "",
    initialRoleStatus: ()=>null
});
const initialUserStatus = ()=>{
    if (true) return;
    const user = localStorage.getItem("userType");
    if (user === "user") {
        return _constant_dummydata__WEBPACK_IMPORTED_MODULE_2__/* .User[0] */ .n5[0];
    } else if (user === "ifp") {
        return _constant_dummydata__WEBPACK_IMPORTED_MODULE_2__/* .User[1] */ .n5[1];
    }
};
const initialRoleStatus = ()=>{
    if (true) return;
    const role = localStorage.getItem("userType");
    return role;
};
const UserProvider = ({ children  })=>{
    // TODO: data is expected to obtained from api endpoint
    const [userData, setUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialUserStatus);
    const [logout, setLogout] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [role, setRole] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialRoleStatus);
    const toggleLogoutMode = ()=>{
        if (logout !== null) {
            setLogout(true);
            localStorage.removeItem("logout");
        }
        return logout;
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(UserContext.Provider, {
        value: {
            userData,
            setUserData,
            initialUserStatus,
            logout,
            setLogout,
            toggleLogoutMode,
            role,
            initialRoleStatus
        },
        children: children
    });
};
const useUser = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(UserContext);


/***/ })

};
;