(this.webpackJsonpsnek=this.webpackJsonpsnek||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n(0),a=n.n(c),i=n(8),u=n.n(i),o=(n(15),n(3)),s=n.p+"static/media/logo.103b5fa1.svg",l=(n(16),n(4)),f=n(1);var d=20,b={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"};function j(e){var t,n=null!==(t=b[e.key])&&void 0!==t?t:e.key,r=[];return e.shiftKey&&"Shift"!==n&&r.push("shift"),e.ctrlKey&&"Control"!==n&&r.push("ctrl"),e.altKey&&"Alt"!==n&&r.push("alt"),r.push(n.toLowerCase()),r.join(" ")}var O=function(e){return"INPUT"===e.tagName||"SELECT"===e.tagName||"TEXTAREA"===e.tagName||e.isContentEditable},h=n(9);function p(e,t,n){var r=window.innerWidth,c=window.innerHeight,a=e[0]+t[0]*n;a<0&&(a=r-d),a+d>r&&(a=0);var i=e[1]+t[1]*n;return i<0&&(i=c-d),i+d>c&&(i=0),[a,i]}var v=function(e,t){var n=Object(o.a)(e,2),r=n[0],c=n[1],a=Object(o.a)(t,2),i=a[0],u=a[1],s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d;return r+s>=i&&r<i+s&&c+s>=u&&c<u+s},y=function(){var e=window.innerWidth-40,t=window.innerHeight-40;return[Math.floor(Math.random()*(e-40))+d,Math.floor(Math.random()*(t-40))+d]},g=null,m=0,w=function(){var e=function(){throw new Error("too soon")},t={has:e,get:e,add:e,del:e,dispatch:e},n=a.a.createContext(t),i=function(){return Object(c.useContext)(n)};return[function(e){var t=e.children,a=e.systems,i=e.initialEntities,u=Object(c.useState)(i),s=Object(o.a)(u,2),d=s[0],b=s[1];Object(c.useLayoutEffect)((function(){b((function(e){return a.filter((function(e){return!!e.setup})).reduce((function(e,t){return t.setup(e)}),e)}))}),[a]);var j=Object(c.useCallback)((function(e){return d.hasOwnProperty(e)}),[d]),O=Object(c.useCallback)((function(e){return d[e]}),[d]),h=Object(c.useCallback)((function(e,t){var n=t;return b((function(t){return Object(f.a)(Object(f.a)({},t),{},Object(l.a)({},e,n))})),n}),[]),p=Object(c.useCallback)((function(e){b((function(t){var n=Object(f.a)({},t);return delete n[e],n}))}),[]),v=Object(c.useCallback)((function(e){b((function(t){return a.reduce((function(t,n){return n(t,e)}),t)}))}),[a]),y=Object(c.useMemo)((function(){return{has:j,get:O,add:h,del:p,dispatch:v}}),[j,O,h,p,v]);return Object(r.jsx)(n.Provider,{value:y,children:t(d)})},function(e){return i().get(e)},function(){return i().dispatch}]}(),k=Object(o.a)(w,3),E=k[0],x=k[1],A=k[2],C=requestAnimationFrame,L=cancelAnimationFrame,M=[function(e,t){var n=e.player.direction;if(!t)return e;var r=t.every((function(e,t){return e+n[t]}))?t:n;return Object(f.a)(Object(f.a)({},e),{},{player:Object(f.a)(Object(f.a)({},e.player),{},{direction:r})})},function(e){var t=e.player,n=t.head,r=t.tail,c=t.direction,a=t.speed;return c[0]||c[1]||a?Object(f.a)(Object(f.a)({},e),{},{player:Object(f.a)(Object(f.a)({},e.player),{},{tail:[].concat(Object(h.a)(r.slice(Math.max(r.length-e.game.score-5,0))),[n]),head:p(n,c,a)})}):(console.log("cant move"),e)},function(e){var t,n=e.player.head;if(g===n)return e;g=n;var r=Object.entries(e).filter((function(e){return"fruit"===Object(o.a)(e,2)[1].type})),c=r.find((function(e){var t=Object(o.a)(e,2)[1];return"fruit"===t.type&&v(t.position,n)}));return c?Object(f.a)(Object(f.a)({},r.reduce((function(e,t){var n=Object(o.a)(t,2),r=n[0],a=n[1];return r===c[0]?e:Object(f.a)(Object(f.a)({},e),{},Object(l.a)({},r,a))}),{})),{},(t={},Object(l.a)(t,++m,{position:y(),type:"fruit"}),Object(l.a)(t,"game",Object(f.a)(Object(f.a)({},e.game),{},{score:e.game.score+5})),Object(l.a)(t,"player",e.player),t)):e},function(e){var t=e.player,n=t.tail,r=t.head;return n.some((function(e){return v(e,r,1)}))?Object(f.a)(Object(f.a)({},e),{},{game:Object(f.a)(Object(f.a)({},e.game),{},{end:Date.now()}),player:Object(f.a)(Object(f.a)({},e.player),{},{speed:0})}):e}],D={player:{type:"player",head:y(),tail:[],speed:5,direction:[0,1]},game:{type:"game",score:0,start:Date.now()},0:{type:"fruit",position:y()}},N=["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"];function R(){var e=Object(c.useRef)(),t=Object(c.useRef)(),n=A(),r=x("game");return Object(c.useEffect)((function(){t.current=r}),[r]),function(e,t){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=r.excludeBoundry,i=r.includeBoundry,u=r.ignoreInputEvents,o=null!==(n=null===i||void 0===i?void 0:i.current)&&void 0!==n?n:document,s=Object(c.useRef)({handler:t,excludeBoundry:a,ignoreInputEvents:u});Object(c.useEffect)((function(){s.current={handler:t,excludeBoundry:a,ignoreInputEvents:u}}),[t,a,u]);var l=Object(c.useMemo)((function(){return Array.isArray(e)?e.map((function(e){return e.toLowerCase()})):[e.toLowerCase()]}),[e]),f=Object(c.useCallback)((function(e){if(!e.repeat){var t=j(e);if(l.includes(t)){var n=s.current,r=n.handler,c=n.excludeBoundry;n.ignoreInputEvents&&O(e.target)||(null===c||void 0===c?void 0:c.current)&&c.current.contains(e.target)||r(e)}}}),[l]);Object(c.useEffect)((function(){return o.addEventListener("keydown",f),function(){return o.removeEventListener("keydown",f)}}),[f,o])}(N,Object(c.useCallback)((function(t){switch(t.key){case"ArrowUp":e.current=[0,-1];break;case"ArrowDown":e.current=[0,1];break;case"ArrowLeft":e.current=[-1,0];break;case"ArrowRight":e.current=[1,0]}}),[])),Object(c.useEffect)((function(){var r=null;return r=C((function c(){var a;n(e.current),e.current=void 0,(null===(a=t.current)||void 0===a?void 0:a.end)||(r=C(c))})),function(){r&&(L(r),r=null)}}),[n]),null}function S(){var e=x("game");return Object(r.jsxs)("div",{className:"score",children:[Object(r.jsx)("h2",{children:e.score}),e.end&&Object(r.jsx)("h4",{children:"GAME OVER"})]})}var B=function(){var e=Object(c.useCallback)((function(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(R,{}),Object(r.jsx)(S,{}),Object.entries(e).map((function(e){var t=Object(o.a)(e,2),n=t[0],c=t[1];switch(c.type){case"player":var a=Object(o.a)(c.head,2),i=a[0],u=a[1];return[c.tail.map((function(e,t){var n=Object(o.a)(e,2),c=n[0],a=n[1];return Object(r.jsx)("div",{className:"snek snek-body",style:{width:d,height:d,left:c,top:a}},"t-".concat(t))})),Object(r.jsx)("div",{className:"snek snek-head",style:{width:d,height:d,left:i,top:u}},"player")];case"fruit":var l=Object(o.a)(c.position,2),f=l[0],b=l[1];return Object(r.jsx)("img",{alt:"fruit",className:"fruit",src:s,style:{left:f,top:b,width:40,height:40}},"fruit-".concat(n));default:return null}}))]})}),[]);return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(E,{systems:M,initialEntities:D,children:e})})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),a(e),i(e)}))};u.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(B,{})}),document.getElementById("root")),F()}},[[17,1,2]]]);
//# sourceMappingURL=main.8f1abdcb.chunk.js.map