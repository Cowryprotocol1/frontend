"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[880],{5491:function(e,t,a){a.d(t,{Z:function(){return l}});var r=a(5893);function l(e){var t=e.children;return(0,r.jsx)(r.Fragment,{children:t})}a(7294)},9842:function(e,t,a){a.r(t),a.d(t,{default:function(){return D}});var r,l=a(828),s=a(5893),n=a(7294),i=a(5675),c=a.n(i),o=a(9583),d=function(e){var t=e.src,a=e.alt,r=e.className,l=e.width,n=e.height,i=e.editBg,d=e.onClick;return(0,s.jsxs)("div",{className:"flex flex-col justify-center items-center",children:[(0,s.jsx)(c(),{src:t,alt:a,width:void 0===l?70:l,height:void 0===n?70:n,className:r,onClick:d}),(0,s.jsx)("span",{className:"".concat(i," -mt-8 ml-4 p-2 rounded-full"),children:(0,s.jsx)(o.Dmm,{size:15,className:"text-white_day"})})]})},u=a(471),m=a(454),x=a(1163),h=a(9352),f=a(5788),g=function(e){var t=e.href,a=e.text,r=e.activeBg,l=e.activeText,n=e.inactiveBg,i=e.onClick,c=(0,x.useRouter)(),o=c.pathname,d=c.push,u=function(e){d(e)},m=t===o.split("/users/").pop()||t===o.split("/ifps/").pop()?"".concat(r," rounded-l-lg w-full h-12 ").concat(l," flex flex-row text-sm items-center pl-8 my-3"):"".concat(n," rounded-l-lg w-full h-12 text-white flex flex-row items-center pl-8 my-3 text-sm");return(0,s.jsxs)("button",{onClick:function(){"Logout"===a?i():u(t)},className:m,children:["Dashboard"===a&&(0,s.jsx)(f.toC,{size:25,className:"mr-4"}),"Payment Method"===a&&(0,s.jsx)(h.DxL,{size:25,className:"mr-4"}),"Settings"===a&&(0,s.jsx)(h.EmM,{size:25,className:"mr-4"}),"Become an IFP"===a&&(0,s.jsx)(f.bxl,{size:25,className:"mr-2"}),"Top up"===a&&(0,s.jsx)(h.Qk4,{size:25,className:"mr-2"}),"Logout"===a&&(0,s.jsx)(h.YEt,{size:25,className:"mr-2"}),a]})},b=a(9067);function p(e){var t=e.alt,a=e.image,r=e.route,i=e.handleLogOut,o=(0,l.Z)((0,n.useState)(!1),2),d=o[0],x=o[1],h=(0,l.Z)((0,n.useState)(""),2),f=h[0],p=h[1],v=(0,l.Z)((0,n.useState)(""),2),A=v[0],j=v[1],y=function(){x(!d)},w=(0,b.a)().userData;(0,n.useEffect)(function(){w&&"object"==typeof w&&w&&("user"===w.role?(p("Become an IFP"),j("join_ifp")):"ifp"===w.role&&(p("Top up"),j("top_up")))});var N=[{id:1,href:"/".concat(r,"/dashboard"),label:"Dashboard"},{id:2,href:"/".concat(r,"/payment"),label:"Payment Method"},{id:3,href:"/".concat(r,"/settings"),label:"Settings"},{id:4,href:"/".concat(r,"/").concat(A),label:f},{id:5,href:"#",label:"Logout"}];return(0,s.jsxs)("header",{className:"md:hidden xs:bg-white_day xs:flex flex-row justify-between p-3 lg:hiden shadow-[0px_1px_4px_rgba(0,0,0,0.5)]",children:[(0,s.jsx)(u.WfK,{size:25,onClick:y}),(0,s.jsx)("div",{className:"md:hidden xs:flex flex-row justify-around",children:(0,s.jsx)(c(),{src:a,alt:t,width:32,height:32,className:"img-circle"})}),d&&"users"===r&&(0,s.jsxs)("div",{className:"fixed top-0 left-0 bg-brand_primary_blue w-2/3 h-fit p-4",children:[(0,s.jsx)(m.Ivx,{size:25,className:"text-white_day mb-4",onClick:y}),(0,s.jsx)("ul",{className:"flex items-center flex-col justify-center",children:N.map(function(e){var t=e.id,a=e.href,r=e.label;return(0,s.jsx)(g,{href:a,text:r,activeBg:"bg-brand_primary_green",activeText:"text-white",inactiveBg:"bg-[#0D2A3B]",onClick:i},t)})})]}),d&&"ifps"===r&&(0,s.jsxs)("div",{className:"fixed top-0 left-0 bg-brand_primary_green w-2/3 h-fit p-4",children:[(0,s.jsx)(m.Ivx,{size:25,className:"text-white_day mb-4",onClick:y}),(0,s.jsx)("ul",{className:"flex items-center flex-col justify-center",children:N.map(function(e){var t=e.id,a=e.href,r=e.label;return(0,s.jsx)(g,{href:a,text:r,activeBg:"bg-white_day",activeText:"text-brand_primary_blue",inactiveBg:"bg-[#26C965]",onClick:i},t)})})]})]})}let v=e=>"boolean"==typeof e?"".concat(e):0===e?"0":e,A=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.flat(1/0).filter(Boolean).join(" ")};var j=(r={variants:{intent:{h1:"sm:text-4xl text-3xl font-bold",h2:"sm:text-3xl text-2xl font-semibold",h3:"sm:text-2xl text-xl font-semibold",h4:"text-sm font-semibold",p:"text-base",h6:"text-amber-700 error-msg"},avatar:{avatar_name:"text-white_day text-center mt-4 text-2xl",wallet_address:"text-brand_tertiary_grey text-base text-center font-thin underline",link:"text-purple-500 text-center"}},defaultVariants:{}},e=>{var t;if((null==r?void 0:r.variants)==null)return A("",null==e?void 0:e.class,null==e?void 0:e.className);let{variants:a,defaultVariants:l}=r,s=Object.keys(a).map(t=>{let r=null==e?void 0:e[t],s=null==l?void 0:l[t];if(null===r)return null;let n=v(r)||v(s);return a[t][n]}),n=e&&Object.entries(e).reduce((e,t)=>{let[a,r]=t;return void 0===r||(e[a]=r),e},{}),i=null==r?void 0:null===(t=r.compoundVariants)||void 0===t?void 0:t.reduce((e,t)=>{let{class:a,className:r,...s}=t;return Object.entries(s).every(e=>{let[t,a]=e;return Array.isArray(a)?a.includes({...l,...n}[t]):({...l,...n})[t]===a})?[...e,a,r]:e},[]);return A("",s,i,null==e?void 0:e.class,null==e?void 0:e.className)}),y=function(e){var t=e.children,a=e.intent,r=e.avatar,l=e.className;return(0,s.jsx)("span",{className:l,children:(0,s.jsx)(a||"p",{className:j({intent:a,avatar:r}),children:t})})},w={src:"/_next/static/media/logo_name.b5eda52f.png",height:118,width:621,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAAOklEQVR4nGNUOJywn4GBYS0QbwdiLgaG//8YGBg5gOyfQMwCUnAQKLgcKLgZKCADZH8BskGSQMUMjADtiA3om4FecAAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:2},N={src:"/_next/static/media/logo_name_white.c6d535de.png",height:118,width:620,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAQAAADPnVVmAAAAKklEQVR42gXAuQ0AEAAAQHso6TyRKKyksCOTXSS4jqQppmoEzxYtRdaND2hkFD0Bnq08AAAAAElFTkSuQmCC",blurWidth:8,blurHeight:2},_={src:"/_next/static/media/pass_back.bd4aeb55.png",height:81,width:90,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHBAMAAADHdxFtAAAAD1BMVEXS1tzS1tzS1tzS1tzS1twvHTNcAAAABXRSTlMFBgcICZuq8jQAAAAgSURBVHjaY3AyNjZkMFRSVGAwUlKCEoZQliKDgqCgAABQOgQYweqj1QAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:7};function B(){var e=(0,l.Z)((0,n.useState)({}),2),t=(e[0],e[1]),a=(0,l.Z)((0,n.useState)(""),2),r=a[0],i=a[1],o=(0,l.Z)((0,n.useState)(""),2),u=o[0],m=o[1],h=(0,l.Z)((0,n.useState)(""),2),f=h[0],v=h[1],A=(0,l.Z)((0,n.useState)(""),2),j=A[0],B=A[1],k=(0,b.a)(),C=k.userData,S=k.toggleLogoutMode,D=(0,x.useRouter)().push;(0,n.useEffect)(function(){C&&"object"==typeof C&&C&&(m(null==C?void 0:C.name),v(null==C?void 0:C.image),(null==C?void 0:C.role)==="user"?B("users"):(null==C?void 0:C.role)==="ifp"&&B("ifps"),i(null==C?void 0:C.wallet_address),t(C))},[C]);var E=function(){var e=S();console.log(e,"logout"),e&&D("/")},O=[{id:1,href:"/".concat(j,"/dashboard"),label:"Dashboard"},{id:2,href:"/".concat(j,"/payment"),label:"Payment Method"},{id:3,href:"/".concat(j,"/settings"),label:"Settings"}];return(0,s.jsxs)(s.Fragment,{children:["users"===j&&(0,s.jsxs)("section",{className:"bg-brand_primary_blue hidden md:block sidebar md:pl-8 md:pr-12  md:col-span-2",children:[(0,s.jsx)(c(),{src:w,className:"mb-8 mt-8 pr-8",alt:"Logo",onClick:E}),(0,s.jsxs)("div",{className:"relative w-full",children:[(0,s.jsx)(c(),{src:_,alt:"passbg",className:"absolute top-0 right-12"}),(0,s.jsx)(d,{src:f,alt:u,width:70,height:70,className:"img-circle mt-10 -ml-12",editBg:"bg-brand_primary_green"}),(0,s.jsx)(y,{avatar:"avatar_name",children:u}),(0,s.jsx)(y,{avatar:"wallet_address",children:(null==r?void 0:r.substring(0,4))+"..."+(null==r?void 0:r.substring(5,9))}),(0,s.jsx)("ul",{className:"flex items-center flex-col justify-center mt-10",children:O.map(function(e){var t=e.id,a=e.href,r=e.label;return(0,s.jsx)(g,{href:a,text:r,activeBg:"bg-brand_primary_green",activeText:"text-white",inactiveBg:"bg-[#0D2A3B]"},t)})})]})]}),"ifps"===j&&(0,s.jsxs)("section",{className:"bg-brand_primary_green hidden md:block sidebar md:pl-8 md:pr-12  md:col-span-2",children:[(0,s.jsx)(c(),{src:N,className:"mb-8 mt-8 pr-8",alt:"Logo",onClick:E}),(0,s.jsxs)("div",{className:"relative w-full",children:[(0,s.jsx)(c(),{src:_,alt:"passbg",className:"absolute top-0 right-12"}),(0,s.jsx)(d,{src:f,alt:u,width:70,height:70,className:"img-circle mt-10 -ml-12",editBg:"bg-brand_primary_blue"}),(0,s.jsx)(y,{avatar:"avatar_name",children:u}),(0,s.jsx)(y,{avatar:"wallet_address",children:(null==r?void 0:r.substring(0,4))+"..."+(null==r?void 0:r.substring(5,9))}),(0,s.jsx)("ul",{className:"flex items-center flex-col justify-center mt-10",children:O.map(function(e){var t=e.id,a=e.href,r=e.label;return(0,s.jsx)(g,{href:a,text:r,activeBg:"bg-white_day",activeText:"text-brand_primary_blue",inactiveBg:"bg-[#26C965]"},t)})})]})]}),(0,s.jsx)(p,{image:f,alt:f,route:j,handleLogOut:E})]})}var k=a(5491),C=function(e){var t=e.username,a=e.role;return(0,s.jsxs)("section",{className:"hidden md:bg-white_day md:flex md:flex-row md:justify-between md:px-12 md:py-6 md:items-center md:shadow-[0px_1px_0px_rgba(0,0,0,0.1)] md:-mr-12 md:rounded-tl-3xl",children:[(0,s.jsxs)("p",{children:[" ",(0,s.jsx)("span",{className:"mr-1",children:"\uD83D\uDC4B "})," Hi ",null==t?void 0:t.split(" ")[0],"!"]}),"ifp"===a?(0,s.jsx)("button",{className:"bg-[#0D2A3B] rounded-xl h-12 text-white flex flex-row justify-between items-center px-12 text-sm",children:"Top Up"}):(0,s.jsxs)("button",{className:"bg-[#0D2A3B] rounded-xl h-12 text-white flex flex-row justify-between items-center px-4 text-sm",children:[(0,s.jsx)(f.bxl,{size:25,className:"mr-2"})," Become an IFP"]})]})};C.getLayout=function(e){return(0,s.jsx)(k.Z,{children:e})};var S=function(e){var t=e.title,a=(0,l.Z)((0,n.useState)(""),2),r=a[0],i=a[1],c=(0,b.a)(),o=c.userData,d=c.role,u=c.toggleLogoutMode,m=(0,x.useRouter)().push;return(0,n.useEffect)(function(){if(o&&"object"==typeof o){if(o&&null!==d)i(null==o?void 0:o.name);else if(o&&null===d){var e=u();console.log(e,"logout"),e&&m("/")}}},[o]),(0,s.jsxs)("div",{className:"parent md:h-screen md:grid md:grid-cols-8",children:[(0,s.jsx)(B,{}),(0,s.jsx)("main",{className:"main bg-brand-background md:col-span-6",children:(0,s.jsxs)("div",{className:"md:z-[100] md:h-screen w-full bg-white_day md:-ml-12 md:rounded-l-3xl -pr-12",children:[(0,s.jsx)(C,{username:r,role:d}),(0,s.jsx)("h1",{children:t})]})})]})};S.getLayout=function(e){return(0,s.jsx)(k.Z,{children:e})};var D=S},8357:function(e,t,a){a.d(t,{w_:function(){return c}});var r=a(7294),l={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=r.createContext&&r.createContext(l),n=function(){return(n=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var l in t=arguments[a])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)},i=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(a[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)0>t.indexOf(r[l])&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(a[r[l]]=e[r[l]]);return a};function c(e){return function(t){return r.createElement(o,n({attr:n({},e.attr)},t),function e(t){return t&&t.map(function(t,a){return r.createElement(t.tag,n({key:a},t.attr),e(t.child))})}(e.child))}}function o(e){var t=function(t){var a,l=e.attr,s=e.size,c=e.title,o=i(e,["attr","size","title"]),d=s||t.size||"1em";return t.className&&(a=t.className),e.className&&(a=(a?a+" ":"")+e.className),r.createElement("svg",n({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,l,o,{className:a,style:n(n({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),c&&r.createElement("title",null,c),e.children)};return void 0!==s?r.createElement(s.Consumer,null,function(e){return t(e)}):t(l)}}}]);