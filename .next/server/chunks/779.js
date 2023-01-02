"use strict";
exports.id = 779;
exports.ids = [779];
exports.modules = {

/***/ 5491:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Layout({ children  }) {
    // Put Header or Footer Here
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
}


/***/ }),

/***/ 6779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ mainboard)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: external "react-icons/fa"
var fa_ = __webpack_require__(6290);
;// CONCATENATED MODULE: ./src/components/icons/avatar.tsx




const Avatar = ({ src , alt , className , width =70 , height =70 , editBg , onClick  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col justify-center items-center",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: src,
                alt: alt,
                width: width,
                height: height,
                className: className,
                onClick: onClick
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: `${editBg} -mt-8 ml-4 p-2 rounded-full`,
                children: /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaCamera, {
                    size: 15,
                    className: "text-white_day"
                })
            })
        ]
    });
};
/* harmony default export */ const avatar = (Avatar);

// EXTERNAL MODULE: external "react-icons/cg"
var cg_ = __webpack_require__(7865);
// EXTERNAL MODULE: external "react-icons/sl"
var sl_ = __webpack_require__(5065);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react-icons/ri"
var ri_ = __webpack_require__(8098);
// EXTERNAL MODULE: external "react-icons/rx"
var rx_ = __webpack_require__(5452);
;// CONCATENATED MODULE: ./src/components/links/Headerbutton.tsx





const HeaderButton = ({ href , text , activeBg , activeText , inactiveBg , onClick  })=>{
    const { pathname , push  } = (0,router_.useRouter)();
    const handleLink = (link)=>{
        push(link);
    };
    const classname = href === pathname.split("/users/").pop() || href === pathname.split("/ifps/").pop() ? `${activeBg} rounded-l-lg w-full h-12 ${activeText} flex flex-row text-sm items-center pl-8 my-3` : `${inactiveBg} rounded-l-lg w-full h-12 text-white flex flex-row items-center pl-8 my-3 text-sm`;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
        onClick: ()=>{
            text === "Logout" ? onClick() : handleLink(href);
        },
        className: classname,
        children: [
            text === "Dashboard" && /*#__PURE__*/ jsx_runtime_.jsx(rx_.RxDashboard, {
                size: 25,
                className: "mr-4"
            }),
            text === "Payment Method" && /*#__PURE__*/ jsx_runtime_.jsx(ri_.RiBankFill, {
                size: 25,
                className: "mr-4"
            }),
            text === "Settings" && /*#__PURE__*/ jsx_runtime_.jsx(ri_.RiSettings5Fill, {
                size: 25,
                className: "mr-4"
            }),
            text === "Become an IFP" && /*#__PURE__*/ jsx_runtime_.jsx(rx_.RxPlusCircled, {
                size: 25,
                className: "mr-2"
            }),
            text === "Top up" && /*#__PURE__*/ jsx_runtime_.jsx(ri_.RiBankCardFill, {
                size: 25,
                className: "mr-2"
            }),
            text === "Logout" && /*#__PURE__*/ jsx_runtime_.jsx(ri_.RiLogoutCircleLine, {
                size: 25,
                className: "mr-2"
            }),
            text
        ]
    });
};
/* harmony default export */ const Headerbutton = (HeaderButton);

// EXTERNAL MODULE: ./src/store/user.tsx
var store_user = __webpack_require__(9067);
;// CONCATENATED MODULE: ./src/components/layout/HeaderMobile.tsx







function MobileHeader({ alt , image , route , handleLogOut  }) {
    const [isOpen, setIsOpen] = (0,external_react_.useState)(false);
    const [label, setLabel] = (0,external_react_.useState)("");
    const [labelRoute, setLabelRoute] = (0,external_react_.useState)("");
    const toggleModal = ()=>{
        setIsOpen(!isOpen);
    };
    const { userData  } = (0,store_user/* useUser */.a)();
    (0,external_react_.useEffect)(()=>{
        if (userData && typeof userData === "object") {
            if (userData) {
                if (userData.role === "user") {
                    setLabel("Become an IFP");
                    setLabelRoute("join_ifp");
                } else if (userData.role === "ifp") {
                    setLabel("Top up");
                    setLabelRoute("top_up");
                }
            }
        }
    });
    const links = [
        {
            id: 1,
            href: `/${route}/dashboard`,
            label: "Dashboard"
        },
        {
            id: 2,
            href: `/${route}/payment`,
            label: "Payment Method"
        },
        {
            id: 3,
            href: `/${route}/settings`,
            label: "Settings"
        },
        {
            id: 4,
            href: `/${route}/${labelRoute}`,
            label: label
        },
        {
            id: 5,
            href: "#",
            label: "Logout"
        }
    ];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
        className: "md:hidden xs:bg-white_day xs:flex flex-row justify-between p-3 lg:hiden shadow-[0px_1px_4px_rgba(0,0,0,0.5)]",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(cg_.CgMenuLeftAlt, {
                size: 25,
                onClick: toggleModal
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "md:hidden xs:flex flex-row justify-around",
                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                    src: image,
                    alt: alt,
                    width: 32,
                    height: 32,
                    className: "img-circle"
                })
            }),
            isOpen && route === "users" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: `fixed top-0 left-0 bg-brand_primary_blue w-2/3 h-fit p-4`,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(sl_.SlClose, {
                        size: 25,
                        className: "text-white_day mb-4",
                        onClick: toggleModal
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                        className: "flex items-center flex-col justify-center",
                        children: links.map(({ id , href , label  })=>/*#__PURE__*/ jsx_runtime_.jsx(Headerbutton, {
                                href: href,
                                text: label,
                                activeBg: "bg-brand_primary_green",
                                activeText: "text-white",
                                inactiveBg: "bg-[#0D2A3B]",
                                onClick: handleLogOut
                            }, id))
                    })
                ]
            }),
            isOpen && route === "ifps" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: `fixed top-0 left-0 bg-brand_primary_green w-2/3 h-fit p-4`,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(sl_.SlClose, {
                        size: 25,
                        className: "text-white_day mb-4",
                        onClick: toggleModal
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                        className: "flex items-center flex-col justify-center",
                        children: links.map(({ id , href , label  })=>/*#__PURE__*/ jsx_runtime_.jsx(Headerbutton, {
                                href: href,
                                text: label,
                                activeBg: "bg-white_day",
                                activeText: "text-brand_primary_blue",
                                inactiveBg: "bg-[#26C965]",
                                onClick: handleLogOut
                            }, id))
                    })
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: external "class-variance-authority"
var external_class_variance_authority_ = __webpack_require__(1169);
;// CONCATENATED MODULE: ./src/components/text/index.tsx



const textStyles = (0,external_class_variance_authority_.cva)("", {
    variants: {
        intent: {
            h1: "sm:text-4xl text-3xl font-bold",
            h2: "sm:text-3xl text-2xl font-semibold",
            h3: "sm:text-2xl text-xl font-semibold",
            h4: "text-sm font-semibold",
            p: "text-base",
            h6: "text-amber-700 error-msg"
        },
        avatar: {
            avatar_name: "text-white_day text-center mt-4 text-2xl",
            wallet_address: "text-brand_tertiary_grey text-base text-center font-thin underline",
            link: "text-purple-500 text-center"
        }
    },
    defaultVariants: {}
});
function Text({ children , intent , avatar , className  }) {
    const Element = intent || "p";
    return /*#__PURE__*/ jsx_runtime_.jsx("span", {
        className: className,
        children: /*#__PURE__*/ jsx_runtime_.jsx(Element, {
            className: textStyles({
                intent,
                avatar
            }),
            children: children
        })
    });
}
/* harmony default export */ const components_text = (Text);

;// CONCATENATED MODULE: ./public/images/logo_name.png
/* harmony default export */ const logo_name = ({"src":"/_next/static/media/logo_name.b5eda52f.png","height":118,"width":621,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAAOklEQVR4nGNUOJywn4GBYS0QbwdiLgaG//8YGBg5gOyfQMwCUnAQKLgcKLgZKCADZH8BskGSQMUMjADtiA3om4FecAAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":2});
;// CONCATENATED MODULE: ./public/images/logo_name_white.png
/* harmony default export */ const logo_name_white = ({"src":"/_next/static/media/logo_name_white.c6d535de.png","height":118,"width":620,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAQAAADPnVVmAAAAKklEQVR42gXAuQ0AEAAAQHso6TyRKKyksCOTXSS4jqQppmoEzxYtRdaND2hkFD0Bnq08AAAAAElFTkSuQmCC","blurWidth":8,"blurHeight":2});
;// CONCATENATED MODULE: ./public/images/pass_back.png
/* harmony default export */ const pass_back = ({"src":"/_next/static/media/pass_back.bd4aeb55.png","height":81,"width":90,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHBAMAAADHdxFtAAAAD1BMVEXS1tzS1tzS1tzS1tzS1twvHTNcAAAABXRSTlMFBgcICZuq8jQAAAAgSURBVHjaY3AyNjZkMFRSVGAwUlKCEoZQliKDgqCgAABQOgQYweqj1QAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":7});
;// CONCATENATED MODULE: ./src/components/layout/Header.tsx












function Header() {
    const [user, setUser] = (0,external_react_.useState)({});
    const [walletAddress, setWalletAddress] = (0,external_react_.useState)("");
    const [name, setName] = (0,external_react_.useState)("");
    const [image, setImage] = (0,external_react_.useState)("");
    const [route, setRoute] = (0,external_react_.useState)("");
    const { userData , toggleLogoutMode  } = (0,store_user/* useUser */.a)();
    const { push  } = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
        if (userData && typeof userData === "object") {
            if (userData) {
                setName(userData?.name);
                setImage(userData?.image);
                if (userData?.role === "user") {
                    setRoute("users");
                } else if (userData?.role === "ifp") {
                    setRoute("ifps");
                }
                setWalletAddress(userData?.wallet_address);
                setUser(userData);
            }
        }
    }, [
        userData
    ]);
    const handleLogOut = ()=>{
        const logout = toggleLogoutMode();
        console.log(logout, "logout");
        if (logout) {
            push("/");
        }
    };
    const links = [
        {
            id: 1,
            href: `/${route}/dashboard`,
            label: "Dashboard"
        },
        {
            id: 2,
            href: `/${route}/payment`,
            label: "Payment Method"
        },
        {
            id: 3,
            href: `/${route}/settings`,
            label: "Settings"
        }
    ];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            route === "users" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                className: `bg-brand_primary_blue hidden md:block sidebar md:pl-8 md:pr-12  md:col-span-2`,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        src: logo_name,
                        className: "mb-8 mt-8 pr-8",
                        alt: "Logo",
                        onClick: handleLogOut
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "relative w-full",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                src: pass_back,
                                alt: "passbg",
                                className: "absolute top-0 right-12"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(avatar, {
                                src: image,
                                alt: name,
                                width: 70,
                                height: 70,
                                className: "img-circle mt-10 -ml-12",
                                editBg: "bg-brand_primary_green"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(components_text, {
                                avatar: "avatar_name",
                                children: name
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(components_text, {
                                avatar: "wallet_address",
                                children: walletAddress?.substring(0, 4) + "..." + walletAddress?.substring(5, 9)
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                className: "flex items-center flex-col justify-center mt-10",
                                children: links.map(({ id , href , label  })=>/*#__PURE__*/ jsx_runtime_.jsx(Headerbutton, {
                                        href: href,
                                        text: label,
                                        activeBg: "bg-brand_primary_green",
                                        activeText: "text-white",
                                        inactiveBg: "bg-[#0D2A3B]"
                                    }, id))
                            })
                        ]
                    })
                ]
            }),
            route === "ifps" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                className: `bg-brand_primary_green hidden md:block sidebar md:pl-8 md:pr-12  md:col-span-2`,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        src: logo_name_white,
                        className: "mb-8 mt-8 pr-8",
                        alt: "Logo",
                        onClick: handleLogOut
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "relative w-full",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                src: pass_back,
                                alt: "passbg",
                                className: "absolute top-0 right-12"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(avatar, {
                                src: image,
                                alt: name,
                                width: 70,
                                height: 70,
                                className: "img-circle mt-10 -ml-12",
                                editBg: "bg-brand_primary_blue"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(components_text, {
                                avatar: "avatar_name",
                                children: name
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(components_text, {
                                avatar: "wallet_address",
                                children: walletAddress?.substring(0, 4) + "..." + walletAddress?.substring(5, 9)
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                className: "flex items-center flex-col justify-center mt-10",
                                children: links.map(({ id , href , label  })=>/*#__PURE__*/ jsx_runtime_.jsx(Headerbutton, {
                                        href: href,
                                        text: label,
                                        activeBg: "bg-white_day",
                                        activeText: "text-brand_primary_blue",
                                        inactiveBg: "bg-[#26C965]"
                                    }, id))
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(MobileHeader, {
                image: image,
                alt: image,
                route: route,
                handleLogOut: handleLogOut
            })
        ]
    });
}

// EXTERNAL MODULE: ./src/components/layout/Layout.tsx
var Layout = __webpack_require__(5491);
;// CONCATENATED MODULE: ./src/components/layout/TopBar.tsx




const TopBar = ({ username , role  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "hidden md:bg-white_day md:flex md:flex-row md:justify-between md:px-12 md:py-6 md:items-center md:shadow-[0px_1px_0px_rgba(0,0,0,0.1)] md:-mr-12 md:rounded-tl-3xl",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    " ",
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "mr-1",
                        children: "\uD83D\uDC4B "
                    }),
                    " Hi ",
                    username?.split(" ")[0],
                    "!"
                ]
            }),
            role === "ifp" ? /*#__PURE__*/ jsx_runtime_.jsx("button", {
                className: "bg-[#0D2A3B] rounded-xl h-12 text-white flex flex-row justify-between items-center px-12 text-sm",
                children: "Top Up"
            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                className: "bg-[#0D2A3B] rounded-xl h-12 text-white flex flex-row justify-between items-center px-4 text-sm",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(rx_.RxPlusCircled, {
                        size: 25,
                        className: "mr-2"
                    }),
                    " Become an IFP"
                ]
            })
        ]
    });
};
TopBar.getLayout = (page)=>/*#__PURE__*/ jsx_runtime_.jsx(Layout/* default */.Z, {
        children: page
    });
/* harmony default export */ const layout_TopBar = (TopBar);

;// CONCATENATED MODULE: ./src/pages/common/mainboard.tsx







const Mainboard = ({ title  })=>{
    const [name, setName] = (0,external_react_.useState)("");
    const { userData , role , toggleLogoutMode  } = (0,store_user/* useUser */.a)();
    const { push  } = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
        if (userData && typeof userData === "object") {
            if (userData && role !== null) {
                setName(userData?.name);
            } else if (userData && role === null) {
                const logout = toggleLogoutMode();
                console.log(logout, "logout");
                if (logout) {
                    push("/");
                }
            }
        }
    }, [
        userData
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "parent md:h-screen md:grid md:grid-cols-8",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Header, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: "main bg-brand-background md:col-span-6",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "md:z-[100] md:h-screen w-full bg-white_day md:-ml-12 md:rounded-l-3xl -pr-12",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(layout_TopBar, {
                            username: name,
                            role: role
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                            children: title
                        })
                    ]
                })
            })
        ]
    });
};
Mainboard.getLayout = (page)=>/*#__PURE__*/ jsx_runtime_.jsx(Layout/* default */.Z, {
        children: page
    });
/* harmony default export */ const mainboard = (Mainboard);


/***/ })

};
;