(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{6840:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return e(6505)}])},8786:function(t,n,e){"use strict";e.d(n,{n5:function(){return r}});var r=[{id:1,name:"tanner linsley",image:"https://picsum.photos/200",wallet_address:"GVEW23243J3H4H4N4",role:"user",joined:new Date},{id:2,name:"tandy miller",image:"https://picsum.photos/200",wallet_address:"GVEW23243J3H4H4N4",role:"ifp",joined:new Date}]},6505:function(t,n,e){"use strict";e.r(n);var r=e(1799),u=e(5893);e(7294),e(4222),e(86),e(2347);var o=e(9067);n.default=function(t){var n,e=t.Component,i=t.pageProps;return(null!==(n=e.getLayout)&&void 0!==n?n:function(t){return t})((0,u.jsx)(o.d,{children:(0,u.jsx)(e,(0,r.Z)({},i))}))}},9067:function(t,n,e){"use strict";e.d(n,{a:function(){return f},d:function(){return s}});var r=e(828),u=e(5893),o=e(7294),i=e(8786),a=(0,o.createContext)({userData:i.n5[0]||null,setUserData:function(){return null},initialUserStatus:function(){return null},logout:null,setLogout:function(){return null},toggleLogoutMode:function(){return null},role:"",initialRoleStatus:function(){return null}}),c=function(){var t=localStorage.getItem("userType");return"user"===t?i.n5[0]:"ifp"===t?i.n5[1]:void 0},l=function(){return localStorage.getItem("userType")},s=function(t){var n=t.children,e=(0,r.Z)((0,o.useState)(c),2),i=e[0],s=e[1],f=(0,r.Z)((0,o.useState)(!1),2),d=f[0],p=f[1],g=(0,r.Z)((0,o.useState)(l),2),m=g[0];return g[1],(0,u.jsx)(a.Provider,{value:{userData:i,setUserData:s,initialUserStatus:c,logout:d,setLogout:p,toggleLogoutMode:function(){return null!==d&&(p(!0),localStorage.removeItem("logout")),d},role:m,initialRoleStatus:l},children:n})},f=function(){return(0,o.useContext)(a)}},2347:function(){},4222:function(){},86:function(){},943:function(t,n,e){"use strict";function r(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=Array(n);e<n;e++)r[e]=t[e];return r}e.d(n,{Z:function(){return r}})},3375:function(t,n,e){"use strict";function r(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}e.d(n,{Z:function(){return r}})},1799:function(t,n,e){"use strict";function r(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){var r,u;r=t,u=e[n],n in r?Object.defineProperty(r,n,{value:u,enumerable:!0,configurable:!0,writable:!0}):r[n]=u})}return t}e.d(n,{Z:function(){return r}})},828:function(t,n,e){"use strict";e.d(n,{Z:function(){return o}});var r=e(3375),u=e(1566);function o(t,n){return function(t){if(Array.isArray(t))return t}(t)||(0,r.Z)(t,n)||(0,u.Z)(t,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},1566:function(t,n,e){"use strict";e.d(n,{Z:function(){return u}});var r=e(943);function u(t,n){if(t){if("string"==typeof t)return(0,r.Z)(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);if("Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return(0,r.Z)(t,n)}}}},function(t){var n=function(n){return t(t.s=n)};t.O(0,[774,179],function(){return n(6840),n(880)}),_N_E=t.O()}]);