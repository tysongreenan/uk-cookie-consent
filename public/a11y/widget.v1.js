/* cookie-banner.ca Accessibility Menu v1 — https://www.cookie-banner.ca */
"use strict";(()=>{var d=":not(#cb-a11y-host)",U=':not(i):not([class*="icon"]):not([class*="fa-"]):not(.material-icons):not(.material-symbols-outlined)',Xe=`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24'><path d='M5 3l14 8.5-6.2 1.6L9.3 20z' fill='%23000' stroke='%23fff' stroke-width='1.5' stroke-linejoin='round'/></svg>") 6 4, auto`,Je=`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24'><path d='M9 3.5a1.5 1.5 0 013 0V10h1V5.5a1.5 1.5 0 013 0V11h1V7.5a1.5 1.5 0 013 0V15c0 3.5-2.5 6-6 6h-1.5c-2 0-3.4-.8-4.4-2.2L4.6 14a1.4 1.4 0 012.2-1.7L9 14.5z' fill='%23000' stroke='%23fff' stroke-width='1.5' stroke-linejoin='round'/></svg>") 10 4, pointer`;function ie(t){let e=t.replace(/\/$/,"")+"/fonts",n=!1;try{n=typeof CSS!="undefined"&&CSS.supports("selector(:has(h1))")}catch(o){n=!1}let r=n?`html.cb-a11y-highlightLinks body a[href]:not(:has(h1,h2,h3,h4,h5,h6,p,ul,ol,img,picture,video,figure))${d},
html.cb-a11y-highlightLinks body a[href]:not(:has(h1,h2,h3,h4,h5,h6,p,ul,ol,img,picture,video,figure))${d} *{background:#fff176!important;color:#000!important}`:"";return`
@font-face{font-family:'CB OpenDyslexic';font-style:normal;font-weight:400;font-display:swap;src:url('${e}/OpenDyslexic-Regular.woff2') format('woff2')}
@font-face{font-family:'CB OpenDyslexic';font-style:normal;font-weight:700;font-display:swap;src:url('${e}/OpenDyslexic-Bold.woff2') format('woff2')}

/* Font weight */
html.cb-a11y-fw-1 body *${d}${U}{font-weight:600!important}
html.cb-a11y-fw-2 body *${d}${U}{font-weight:700!important}
html.cb-a11y-fw-3 body *${d}${U}{font-weight:800!important}

/* Line height */
/* Most sites already ship 1.5, so level 1 must be a visible step up from that */
html.cb-a11y-lh-1 body *${d}:not(img):not(svg):not(video):not(canvas):not(br):not(hr){line-height:1.8!important}
html.cb-a11y-lh-2 body *${d}:not(img):not(svg):not(video):not(canvas):not(br):not(hr){line-height:2.2!important}
html.cb-a11y-lh-3 body *${d}:not(img):not(svg):not(video):not(canvas):not(br):not(hr){line-height:2.6!important}

/* Letter spacing \u2014 skip icon fonts (they become unreadable) and code blocks */
html.cb-a11y-ls-1 body *${d}${U}:not(code):not(pre):not(kbd):not(samp){letter-spacing:.08em!important}
html.cb-a11y-ls-2 body *${d}${U}:not(code):not(pre):not(kbd):not(samp){letter-spacing:.16em!important}
html.cb-a11y-ls-3 body *${d}${U}:not(code):not(pre):not(kbd):not(samp){letter-spacing:.24em!important}

/* Dyslexia font */
html.cb-a11y-dyslexiaFont body *${d}${U}{font-family:'CB OpenDyslexic',Verdana,Arial,sans-serif!important}

/* Highlight links / titles.
   Card-sized links (an <a> wrapping a heading + image) only get an outline \u2014 painting
   the whole card yellow hides the content low-vision users are trying to read.
   Inline/text links get the high-visibility yellow strip when :has() is supported. */
html.cb-a11y-highlightLinks body a[href]${d}{text-decoration:underline!important;text-decoration-thickness:3px!important;text-underline-offset:3px!important;outline:2px solid #111!important;outline-offset:2px!important}
${r}
html.cb-a11y-highlightTitles body :is(h1,h2,h3,h4,h5,h6,[role="heading"])${d}{outline:3px solid #4a4fd1!important;outline-offset:3px!important;background-image:none!important;text-decoration:underline!important;text-decoration-thickness:3px!important;text-underline-offset:4px!important}

/* Focus ring (motor + low vision) */
html.cb-a11y-focusRing body *${d}:focus{outline:3px solid #ffbf00!important;outline-offset:3px!important;box-shadow:0 0 0 6px rgba(0,0,0,.65)!important}
html.cb-a11y-focusRing body :is(button,[role="button"],input,select,textarea,summary)${d},
html.cb-a11y-bigCursor body :is(button,[role="button"],input:not([type="hidden"]),select,textarea,summary)${d}{min-height:44px!important}
html.cb-a11y-focusRing body a${d}:not(p a):not(li a):not(td a):not(dd a),
html.cb-a11y-bigCursor body a${d}:not(p a):not(li a):not(td a):not(dd a){min-height:44px!important;min-width:44px!important}

/* Enlarged type: keep words on screen instead of overflowing the viewport */
html.cb-a11y-enlarge body *${d}{overflow-wrap:break-word!important}

/* What is currently being read aloud \u2014 must be visible, not only audible */
html.cb-a11y-readAloud [data-cb-a11y-speaking]{outline:4px solid #4a4fd1!important;outline-offset:4px!important;box-shadow:0 0 0 8px rgba(255,235,59,.5)!important}
html.cb-a11y-darkContrast [data-cb-a11y-speaking]{outline-color:#ffe600!important;box-shadow:0 0 0 8px rgba(255,230,0,.28)!important}

/* Big cursor */
html.cb-a11y-bigCursor, html.cb-a11y-bigCursor body *${d}{cursor:${Xe}!important}
html.cb-a11y-bigCursor body :is(a,button,[role="button"],input[type="submit"],input[type="button"],label,select,summary)${d}, html.cb-a11y-bigCursor body :is(a,button,[role="button"])${d} *{cursor:${Je}!important}

/* Stop animations */
html.cb-a11y-stopAnimations body *${d}, html.cb-a11y-stopAnimations body *${d}::before, html.cb-a11y-stopAnimations body *${d}::after{animation-play-state:paused!important;animation-duration:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}
html.cb-a11y-stopAnimations{scroll-behavior:auto!important}

/* Hide images (alt text is surfaced by the widget's tooltip feature).
   Icon SVGs inside links/buttons stay: hiding them removes the only visible
   affordance of icon-only controls (nav toggles, search, close buttons). */
html.cb-a11y-hideImages body :is(img,picture,video,canvas,[role="img"])${d}{visibility:hidden!important}
html.cb-a11y-hideImages body svg:not(a svg):not(button svg):not([role="button"] svg)${d}{visibility:hidden!important}
html.cb-a11y-hideImages body *${d}{background-image:none!important}

/* Light / dark contrast: forced colours, not filters, so they survive the filter escape hatch.
   :where() keeps the broad rule at low specificity so the link rules below can win.
   -webkit-text-fill-color beats gradient/clipped headings that otherwise stay invisible. */
html.cb-a11y-lightContrast body, html.cb-a11y-lightContrast body :where(*${d}:not(img):not(video):not(svg):not(svg *):not(picture):not(iframe):not(canvas)){background-color:#fff!important;background-image:none!important;color:#000!important;-webkit-text-fill-color:#000!important;border-color:#333!important;text-shadow:none!important;box-shadow:none!important;mix-blend-mode:normal!important}
html.cb-a11y-lightContrast body a${d}, html.cb-a11y-lightContrast body a${d} *{color:#0000cc!important;-webkit-text-fill-color:#0000cc!important;text-decoration:underline!important}
html.cb-a11y-lightContrast body a:visited${d}, html.cb-a11y-lightContrast body a:visited${d} *{color:#5b21b6!important;-webkit-text-fill-color:#5b21b6!important}
html.cb-a11y-darkContrast body, html.cb-a11y-darkContrast body :where(*${d}:not(img):not(video):not(svg):not(svg *):not(picture):not(iframe):not(canvas)){background-color:#0d0d0d!important;background-image:none!important;color:#fff!important;-webkit-text-fill-color:#fff!important;border-color:#8a8a8a!important;text-shadow:none!important;box-shadow:none!important;mix-blend-mode:normal!important}
html.cb-a11y-darkContrast body a${d}, html.cb-a11y-darkContrast body a${d} *{color:#ffe600!important;-webkit-text-fill-color:#ffe600!important;text-decoration:underline!important}
html.cb-a11y-darkContrast body a:visited${d}, html.cb-a11y-darkContrast body a:visited${d} *{color:#ffd54f!important;-webkit-text-fill-color:#ffd54f!important}
html.cb-a11y-lightContrast ::selection, html.cb-a11y-darkContrast ::selection{background:#ffe600!important;color:#000!important;-webkit-text-fill-color:#000!important}
/* Forced colours erase borderless buttons/fields into plain text; draw an inset ring so controls stay controls */
html.cb-a11y-lightContrast body :is(button,[role="button"],input:not([type="hidden"]),select,textarea)${d},
html.cb-a11y-darkContrast body :is(button,[role="button"],input:not([type="hidden"]),select,textarea)${d}{box-shadow:inset 0 0 0 2px currentColor!important}
html.cb-a11y-lightContrast body :is(input,textarea,select)${d}{background-color:#fff!important;color:#000!important;-webkit-text-fill-color:#000!important;caret-color:#000!important}
html.cb-a11y-darkContrast body :is(input,textarea,select)${d}{background-color:#0d0d0d!important;color:#fff!important;-webkit-text-fill-color:#fff!important;caret-color:#fff!important}
html.cb-a11y-lightContrast body ::placeholder{color:#444!important;opacity:1!important;-webkit-text-fill-color:#444!important}
html.cb-a11y-darkContrast body ::placeholder{color:#bbb!important;opacity:1!important;-webkit-text-fill-color:#bbb!important}
html.cb-a11y-lightContrast body :is(img,video,picture)${d},
html.cb-a11y-darkContrast body :is(img,video,picture)${d},
html.cb-a11y-highContrast body :is(img,video,picture)${d}{outline:2px solid currentColor!important;outline-offset:2px!important}
html.cb-a11y-lightContrast body :is([disabled],:disabled)${d}{opacity:.7!important;color:#222!important}

/* Filter fallback when backdrop-filter is unsupported: applied below <html> so fixed
   elements keep their viewport containing block for the common body>* case */
html.cb-a11y-nobf.cb-a11y-monochrome body>*${d}{filter:grayscale(1)!important}
html.cb-a11y-nobf.cb-a11y-lowSaturation body>*${d}{filter:saturate(.5)!important}
html.cb-a11y-nobf.cb-a11y-highSaturation body>*${d}{filter:saturate(2)!important}
html.cb-a11y-nobf.cb-a11y-highContrast body>*${d}{filter:contrast(1.7)!important}
`}var y="cb-a11y-host",Ot="cb-a11y-adjust";function l(t,e={},n=[]){let r=document.createElement(t);for(let[o,a]of Object.entries(e))a==null||a===!1||(o==="class"?r.className=String(a):o==="text"?r.textContent=String(a):o==="html"?r.innerHTML=String(a):r.setAttribute(o,a===!0?"":String(a)));for(let o of n)o!=null&&r.appendChild(typeof o=="string"?document.createTextNode(o):o);return r}function M(t,e=24){let n=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(e)),n.setAttribute("height",String(e)),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.9"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.setAttribute("aria-hidden","true"),n.setAttribute("focusable","false"),n.innerHTML=t,n}function R(t,e){return t.replace(/\{(\w+)\}/g,(n,r)=>r in e?String(e[r]):`{${r}}`)}function It(t){let e=$t(t);if(!e)return"#ffffff";let[n,r,o]=e.map(s=>{let c=s/255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4)});return .2126*n+.7152*r+.0722*o>.45?"#111111":"#ffffff"}function Tt([t,e,n]){let r=o=>{let a=o/255;return a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4)};return .2126*r(t)+.7152*r(e)+.0722*r(n)}function Ze(t,e){let n=Tt(t),r=Tt(e);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function $t(t){let e=/^#([0-9a-f]{3,8})$/i.exec(t.trim());if(e){let r=e[1];return(r.length===3||r.length===4)&&(r=r.split("").map(o=>o+o).join("")),[parseInt(r.slice(0,2),16),parseInt(r.slice(2,4),16),parseInt(r.slice(4,6),16)]}let n=/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i.exec(t);return n?[Number(n[1]),Number(n[2]),Number(n[3])]:null}function ae(t,e){let n=$t(t),r=$t(e);if(!n||!r)return t;let o=Tt(r)>.4?[0,0,0]:[255,255,255];for(let a=0;a<=1.0001;a+=.05){let s=n.map((c,u)=>Math.round(c+(o[u]-c)*a));if(Ze(s,r)>=4.5)return`rgb(${s.join(",")})`}return o[0]===0?"#111111":"#ffffff"}function se(){try{return window.matchMedia("(max-width: 767px)").matches}catch(t){return!1}}function le(){try{return window.matchMedia("(prefers-color-scheme: dark)").matches}catch(t){return!1}}function _(t){var r;let e=typeof t.composedPath=="function"?t.composedPath():[],n=e.length?e:[t.target];for(let o of n)if(o instanceof Element)return o.id===y||(r=o.closest)!=null&&r.call(o,`#${y}`)?null:o;return null}function ce(t){return Array.from(t.querySelectorAll('button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(e=>e.offsetParent!==null||e.getClientRects().length>0)}var de={monochrome:"grayscale(1)",lowSaturation:"saturate(0.5)",highSaturation:"saturate(2)",highContrast:"contrast(1.7)"},Ht=Object.keys(de),I=null;function Qe(){try{return typeof CSS!="undefined"&&(CSS.supports("backdrop-filter","grayscale(1)")||CSS.supports("-webkit-backdrop-filter","grayscale(1)"))}catch(t){return!1}}function ue(t,e){let n=Ht.filter(o=>e[o]).map(o=>de[o]).join(" "),r=document.documentElement;if(!Qe()){r.classList.add("cb-a11y-nobf");return}if(r.classList.remove("cb-a11y-nobf"),!n){I==null||I.remove(),I=null;return}I||(I=l("div",{class:"cb-a11y-overlay","aria-hidden":"true"}),t.insertBefore(I,t.firstChild)),I.style.setProperty("backdrop-filter",n),I.style.setProperty("-webkit-backdrop-filter",n)}var bt="data-cb-a11y-fs",Pt="data-cb-a11y-fs-inline",tn=6e3,en=new Set(["SCRIPT","STYLE","NOSCRIPT","TEMPLATE","SVG","PATH","IFRAME","CANVAS","VIDEO","AUDIO"]),yt=1,q=null,Q=null;function nn(t){for(let e of Array.from(t.childNodes))if(e.nodeType===3&&(e.textContent||"").trim())return!0;return!1}function rn(t,e){let n=parseFloat(t.getAttribute(bt)||"");if(!Number.isFinite(n)){if(n=parseFloat(getComputedStyle(t).fontSize),!Number.isFinite(n)||n<=0)return;t.setAttribute(bt,String(n));let r=t.style.getPropertyValue("font-size");r&&t.setAttribute(Pt,`${r}${t.style.getPropertyPriority("font-size")==="important"?"!":""}`)}t.style.setProperty("font-size",`${Math.round(on(n,e)*100)/100}px`,"important")}function on(t,e){let n=t*e;return e>=1.4?Math.max(n,18):e>1?Math.max(n,15):n}function pe(t,e){let n=t.querySelectorAll("body *"),r=Math.min(n.length,tn);for(let o=0;o<r;o++){let a=n[o];en.has(a.tagName.toUpperCase())||a.id===y||a.closest(`#${y}`)||!nn(a)&&!a.matches("input,textarea,select,button")||rn(a,e)}}function an(){document.querySelectorAll(`[${bt}]`).forEach(t=>{let e=t.getAttribute(Pt);if(e){let n=e.endsWith("!");t.style.setProperty("font-size",n?e.slice(0,-1):e,n?"important":"")}else t.style.removeProperty("font-size");t.removeAttribute(bt),t.removeAttribute(Pt)})}function fe(t){let e=t/100;if(e===1){yt=1,an(),ln();return}yt=e,pe(document,e),sn()}function sn(){q||typeof MutationObserver=="undefined"||(q=new MutationObserver(()=>{Q===null&&(Q=window.setTimeout(()=>{Q=null,yt!==1&&pe(document,yt)},250))}),q.observe(document.body,{childList:!0,subtree:!0}))}function ln(){q==null||q.disconnect(),q=null,Q!==null&&(clearTimeout(Q),Q=null)}function me(t){var r;let e=(r=t.effect)==null?void 0:r.target,n=e==null?void 0:e.getRootNode();return!!(n&&n.host&&n.host.id===y)}var zt=new WeakSet,Rt=new WeakSet,G=null,W=null;function vt(){return Array.from(document.querySelectorAll("audio,video"))}function ge(t){if(t){let e=()=>vt().forEach(n=>{n.muted||(n.muted=!0,zt.add(n))});e(),!G&&typeof MutationObserver!="undefined"&&(G=new MutationObserver(e),G.observe(document.body,{childList:!0,subtree:!0}))}else G==null||G.disconnect(),G=null,vt().forEach(e=>{zt.has(e)&&(e.muted=!1,zt.delete(e))})}function he(t){var e;if(t){let n=()=>{var r;vt().forEach(o=>{o.paused||(o.pause(),Rt.add(o)),o.removeAttribute("autoplay")});try{(r=document.getAnimations)==null||r.call(document).forEach(o=>{me(o)||o.pause()})}catch(o){}};n(),!W&&typeof MutationObserver!="undefined"&&(W=new MutationObserver(n),W.observe(document.body,{childList:!0,subtree:!0}))}else{W==null||W.disconnect(),W=null;try{(e=document.getAnimations)==null||e.call(document).forEach(n=>{n.playState==="paused"&&!me(n)&&n.play()})}catch(n){}vt().forEach(n=>{Rt.has(n)&&(n.play().catch(()=>{}),Rt.delete(n))})}}var H=null,Y=null;function be(t,e){e&&!H?(H=l("div",{class:"cb-a11y-guide","aria-hidden":"true"}),H.style.transform=`translateY(${Math.round(window.innerHeight*.4)}px)`,t.root.appendChild(H),Y=n=>{H&&(H.style.transform=`translateY(${n.clientY-6}px)`)},document.addEventListener("pointermove",Y,{passive:!0}),document.addEventListener("pointerdown",Y,{passive:!0})):!e&&H&&(H.remove(),H=null,Y&&(document.removeEventListener("pointermove",Y),document.removeEventListener("pointerdown",Y)),Y=null)}var cn="p,li,h1,h2,h3,h4,h5,h6,blockquote,figure,td,th,dt,dd,pre,label,button,a,summary,article,section,aside,nav,header,footer,form,img,video",$=null,P=null,_t=0,it=null;function dn(t,e){let n=document.elementFromPoint(t,e);if(!n||n.id===y||n.closest(`#${y}`))return null;let r=n.closest(cn);return!r||r===document.body||r===document.documentElement?null:r}function un(){if(_t=0,!$||!it)return;let t=dn(it.x,it.y);if(!t)return;let e=t.getBoundingClientRect(),n=8;$.style.opacity="1",$.style.transform=`translate(${e.left-n}px, ${e.top-n}px)`,$.style.width=`${e.width+n*2}px`,$.style.height=`${e.height+n*2}px`}function ye(t,e){e&&!$?($=l("div",{class:"cb-a11y-focus-hole","aria-hidden":"true"}),t.root.appendChild($),P=n=>{typeof n.clientX=="number"&&(it={x:n.clientX,y:n.clientY}),_t||(_t=requestAnimationFrame(un))},document.addEventListener("pointermove",P,{passive:!0}),document.addEventListener("pointerdown",P,{passive:!0}),document.addEventListener("scroll",P,{passive:!0,capture:!0})):!e&&$&&($.remove(),$=null,P&&(document.removeEventListener("pointermove",P),document.removeEventListener("pointerdown",P),document.removeEventListener("scroll",P,{capture:!0})),P=null,it=null)}var v=null,z=null,ot=null;function pn(t,e){var s,c,u;let n=t.closest('img,[role="img"],svg,picture,figure');if(!n)return{text:"",missing:!1};if(n.getAttribute("aria-hidden")==="true"||/^(presentation|none)$/.test(n.getAttribute("role")||""))return{text:"",missing:!1};let r=n.getAttribute("alt");if(r!==null&&r.trim()==="")return{text:"",missing:!1};let a=(n.getAttribute("aria-labelledby")||"").trim().split(/\s+/).filter(Boolean).map(g=>{var x;return((x=document.getElementById(g))==null?void 0:x.textContent)||""}).join(" ").trim()||r||n.getAttribute("aria-label")||n.getAttribute("title")||((s=n.querySelector("title"))==null?void 0:s.textContent)||((c=n.querySelector("figcaption"))==null?void 0:c.textContent)||(n.tagName==="PICTURE"?(u=n.querySelector("img"))==null?void 0:u.getAttribute("alt"):null)||null;return a===null?{text:e,missing:!0}:String(a).trim()===""?{text:"",missing:!1}:{text:String(a).trim(),missing:!1}}function fn(t,e,n){let r=Math.min(e+14,window.innerWidth-t.offsetWidth-8),o=Math.min(n+18,window.innerHeight-t.offsetHeight-8);t.style.transform=`translate(${Math.max(8,r)}px, ${Math.max(8,o)}px)`}function ve(t,e){if(e&&!v){v=l("div",{class:"cb-a11y-tip",role:"tooltip",hidden:!0}),t.root.appendChild(v);let n=(r,o,a)=>{if(!v||!r){v&&(v.hidden=!0);return}let s=pn(r,t.strings.missingAlt);if(!s.text){v.hidden=!0;return}v.textContent=s.text,v.classList.toggle("is-missing",s.missing),v.hidden=!1,fn(v,o,a)};z=r=>{let o=_(r);if(!o){v&&(v.hidden=!0);return}let a=r;n(o,"clientX"in a?a.clientX:0,"clientY"in a?a.clientY:0)},ot=r=>{var c,u,g;let o=r.relatedTarget;if(o instanceof Node&&((u=(c=r.currentTarget)==null?void 0:c.contains)!=null&&u.call(c,o)))return;let a=o instanceof Element?o.closest('img,[role="img"],svg,picture,figure'):null,s=(g=_(r))==null?void 0:g.closest('img,[role="img"],svg,picture,figure');a&&a===s||v&&(v.hidden=!0)},document.addEventListener("pointerover",z,{passive:!0}),document.addEventListener("pointermove",z,{passive:!0}),document.addEventListener("pointerdown",z,{passive:!0}),document.addEventListener("pointerout",ot,{passive:!0})}else!e&&v&&(v.remove(),v=null,z&&(document.removeEventListener("pointerover",z),document.removeEventListener("pointermove",z),document.removeEventListener("pointerdown",z)),ot&&document.removeEventListener("pointerout",ot),z=ot=null)}var Nt="data-cb-a11y-speaking",Ft=800,mn=380,gn=900,hn=80,bn=9e3,yn='p,li,h1,h2,h3,h4,h5,h6,blockquote,td,th,dt,dd,label,button,summary,figcaption,caption,legend,pre,option,abbr,area,[role="button"],[role="img"],img,input,textarea,select,a[href],[contenteditable="true"],[contenteditable=""]',xe="h1,h2,h3,h4,h5,h6,p,li,figcaption,img,blockquote,td,th",N=null,st=null,lt=null,ct=null,dt=null,ut=null,pt=null,ft=null,Et=0,Dt=0,Kt=0,mt=0,X=null,xt=null,we=0,Bt=!1,A=null;function F(){return typeof window!="undefined"&&"speechSynthesis"in window&&typeof SpeechSynthesisUtterance!="undefined"}function wt(t){if(!t||!(t instanceof Element)||t.closest(`#${y}`)||t.closest('[hidden],[aria-hidden="true"],[inert]'))return!0;let e=t.getAttribute("role")||"";if(e==="presentation"||e==="none")return!0;try{let n=getComputedStyle(t);if(n.display==="none"||n.visibility==="hidden")return!0}catch(n){}return!1}function at(t){var n,r;if(!(t instanceof Element)||t.closest(`#${y}`))return null;let e=t;for(;e&&e!==document.documentElement&&e!==document.body;){if(e.id===y||e.tagName==="IFRAME")return null;if((n=e.matches)!=null&&n.call(e,'input:not([type="hidden"]),textarea,select')&&!wt(e)||e instanceof HTMLElement&&e.isContentEditable&&!wt(e))return e;if((r=e.matches)!=null&&r.call(e,yn)&&!wt(e)){if(e.tagName==="A"&&e.querySelector(xe)){let o=t.closest(xe);if(o&&e.contains(o)&&!wt(o))return o}return e}e=e.parentElement}return null}function vn(t){let e=(t.getAttribute("aria-labelledby")||"").trim();return e?e.split(/\s+/).map(n=>{var r;return((r=document.getElementById(n))==null?void 0:r.textContent)||""}).join(" ").replace(/\s+/g," ").trim():""}function xn(t){let e=(t.getAttribute("aria-describedby")||"").trim();return e?e.split(/\s+/).map(n=>{var r;return((r=document.getElementById(n))==null?void 0:r.textContent)||""}).join(" ").replace(/\s+/g," ").trim():""}function wn(t){if(!(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t instanceof HTMLSelectElement))return"";if(t.id){let n=typeof CSS!="undefined"&&CSS.escape?CSS.escape(t.id):t.id.replace(/"/g,""),r=document.querySelector(`label[for="${n}"]`);if(r)return(r.textContent||"").replace(/\s+/g," ").trim()}let e=t.closest("label");return e?(e.textContent||"").replace(/\s+/g," ").trim():""}function En(t){if(t instanceof HTMLImageElement)return(t.alt||"").trim();let e=[],n=(r,o)=>{if(r.nodeType===3){let a=(r.textContent||"").replace(/\s+/g," ");a.trim()&&e.push(a);return}if(r instanceof Element&&!r.closest(`#${y}`)&&!(r.getAttribute("aria-hidden")==="true"||r.hasAttribute("hidden"))&&!r.matches("script,style,noscript,template,svg")&&!(o.tagName==="LI"&&r!==o&&r.matches("ul,ol")))for(let a of Array.from(r.childNodes))n(a,o)};return n(t,t),e.join(" ").replace(/\s+/g," ").trim()}function Sn(t){var e;return t.tagName!=="SVG"&&t.getAttribute("role")!=="img"?"":(t.getAttribute("aria-label")||"").trim()||(((e=t.querySelector("title"))==null?void 0:e.textContent)||"").replace(/\s+/g," ").trim()}function ke(t){let e=t.closest("figure"),n=e==null?void 0:e.querySelector("figcaption");return n?(n.textContent||"").replace(/\s+/g," ").trim():""}function kn(t){if(t.tagName!=="TD")return"";let e=t.closest("tr"),n=t.closest("table");if(!e||!n)return"";let r=Array.from(e.children).indexOf(t);if(r<0)return"";let o=n.querySelector(`thead tr th:nth-child(${r+1})`)||e.querySelector("th")||n.querySelector(`tr:first-child th:nth-child(${r+1})`);return o?(o.textContent||"").replace(/\s+/g," ").trim():""}function Mn(t){let e=vn(t);if(e)return e;let n=(t.getAttribute("aria-label")||"").trim();if(n)return n;if(t instanceof HTMLImageElement){let u=(t.alt||"").trim();return u||ke(t)}if(t.tagName==="AREA")return(t.getAttribute("alt")||"").trim();let r=Sn(t);if(r)return r;let o=wn(t);if(o)return o;let a=En(t),s=(t.getAttribute("title")||"").trim(),c=t.tagName==="ABBR"?s:"";return a||s||c}function An(t,e){let n=t.tagName;return/^H[1-6]$/.test(n)?R(e.speakHeading,{n:n.slice(1)}):n==="A"||t.getAttribute("role")==="link"?e.speakLink:n==="BUTTON"||t.getAttribute("role")==="button"?e.speakButton:n==="IMG"||t.getAttribute("role")==="img"||n==="AREA"?e.speakImage:""}function Ln(t,e){var n;return t instanceof HTMLInputElement?t.type==="password"?"":t.type==="checkbox"||t.type==="radio"?t.checked?e.speakChecked:e.speakNotChecked:t.value.trim():t instanceof HTMLTextAreaElement?t.value.trim():t instanceof HTMLSelectElement?(((n=t.selectedOptions[0])==null?void 0:n.text)||t.value||"").trim():""}function Me(t){if(t.length<=Ft)return t;let e=t.slice(0,Ft),n=Math.max(e.lastIndexOf(". "),e.lastIndexOf("? "),e.lastIndexOf("! "));return(n>Ft*.5?e.slice(0,n+1):e).trim()}function Cn(t,e){if(t instanceof HTMLImageElement){if(t.getAttribute("aria-hidden")==="true"||/^(presentation|none)$/.test(t.getAttribute("role")||"")||t.getAttribute("alt")==="")return"";if(t.getAttribute("alt")===null&&!t.getAttribute("aria-label")&&!ke(t))return`${e.speakImage}. ${e.speakImageMissing}`}let n=Mn(t),r=An(t,e),o=[],a=kn(t);a&&a!==n&&o.push(a);let s=Ln(t,e);s&&s!==n&&o.push(s),t instanceof HTMLElement&&t.hasAttribute("required")&&o.push(e.speakRequired),t.getAttribute("aria-invalid")==="true"&&o.push(e.speakInvalid);let c=xn(t);if(c&&c!==n&&o.push(c),!n&&!r&&o.length===0)return"";let u=[r,n,...o].filter(Boolean);return Me(u.join(". ").replace(/\s+/g," ").trim())}function Ee(){try{let t=window.getSelection();if(!t||t.isCollapsed)return"";let e=t.toString().replace(/\s+/g," ").trim();return e.length>=2?Me(e):""}catch(t){return""}}function gt(t){document.querySelectorAll(`[${Nt}]`).forEach(e=>e.removeAttribute(Nt)),t instanceof HTMLElement&&t.setAttribute(Nt,"")}function Tn(t){try{let e=speechSynthesis.getVoices();if(!e.length)return null;let n=(t||"en").slice(0,2).toLowerCase();return e.find(r=>r.lang.toLowerCase().startsWith(n)&&r.localService)||e.find(r=>r.lang.toLowerCase().startsWith(n))||null}catch(e){return null}}function Ae(){if(!(Bt||!F()))try{speechSynthesis.getVoices().length?Bt=!0:speechSynthesis.addEventListener("voiceschanged",()=>{Bt=!0},{once:!0})}catch(t){}}function $n(){mt||!F()||(mt=window.setInterval(()=>{try{speechSynthesis.speaking&&!speechSynthesis.paused&&(speechSynthesis.pause(),speechSynthesis.resume())}catch(t){}},bn))}function On(){mt&&(clearInterval(mt),mt=0)}function tt(){clearTimeout(Dt);try{speechSynthesis.cancel()}catch(t){}X=null,gt(null)}function jt(t,e,n=!1){if(!F())return;let r=(t||"").replace(/\s+/g," ").trim();r&&(Ae(),X=null,gt(null),Ut(r,e,null,n))}function In(t,e){var n;return(((n=t==null?void 0:t.closest("[lang]"))==null?void 0:n.getAttribute("lang"))||document.documentElement.lang||e||"en").slice(0,8)}function Ut(t,e,n,r=!1){if(!t)return;try{speechSynthesis.paused&&speechSynthesis.resume(),(speechSynthesis.speaking||speechSynthesis.pending)&&speechSynthesis.cancel()}catch(a){}clearTimeout(Dt);let o=()=>{try{let a=new SpeechSynthesisUtterance(t);a.lang=In(n,e),a.rate=.92;let s=Tn(a.lang);s&&(a.voice=s),a.onend=a.onerror=()=>{X===n&&(X=null),gt(null)},$n(),speechSynthesis.speak(a)}catch(a){}};r?o():Dt=window.setTimeout(o,hn)}function Vt(t,e,n,r=!1){if(t===X)return;let o=Cn(t,n);if(o){if(X=t,gt(t),t instanceof HTMLElement)try{let a=t.getBoundingClientRect(),s=document.documentElement.clientHeight||window.innerHeight;(a.bottom<0||a.top>s)&&t.scrollIntoView({block:"nearest",inline:"nearest"})}catch(a){}Ut(o,e,t,r)}}function Se(){N&&document.removeEventListener("mouseover",N),st&&document.removeEventListener("mouseout",st),lt&&document.removeEventListener("focusin",lt),dt&&document.removeEventListener("pointerdown",dt),ut&&document.removeEventListener("selectionchange",ut),ct&&document.removeEventListener("keydown",ct),pt&&document.removeEventListener("visibilitychange",pt),ft&&window.removeEventListener("pagehide",ft),N=st=lt=ct=dt=ut=pt=ft=A=null,clearTimeout(Et),clearTimeout(Kt),On(),tt()}function Le(t,e){if(!e){N&&Se();return}if(!F()){N&&Se(),t.announce(t.strings.ttsUnavailable);return}A={lang:t.lang==="auto"?navigator.language:t.lang,strings:t.strings},!N&&(Ae(),N=n=>{if(!A||Date.now()-we<gn||Ee())return;let r=at(_(n));clearTimeout(Et),xt=r,r&&(Et=window.setTimeout(()=>{xt===r&&A&&Vt(r,A.lang,A.strings)},mn))},st=n=>{let r=at(_(n)),o=at(n.relatedTarget);r&&o!==r&&(clearTimeout(Et),xt===r&&(xt=null))},lt=n=>{if(!A)return;let r=at(_(n));r&&Vt(r,A.lang,A.strings)},dt=n=>{if(n.pointerType==="mouse")return;we=Date.now();let r=at(_(n));!r||!A||Vt(r,A.lang,A.strings,!0)},ut=()=>{clearTimeout(Kt),Kt=window.setTimeout(()=>{let n=Ee();!n||!A||(X=null,gt(null),Ut(n,A.lang,null))},400)},ct=n=>{n.key==="Escape"&&(tt(),n.stopPropagation())},pt=()=>{document.hidden&&tt()},ft=()=>tt(),document.addEventListener("mouseover",N,{passive:!0}),document.addEventListener("mouseout",st,{passive:!0}),document.addEventListener("focusin",lt),document.addEventListener("pointerdown",dt,{passive:!0}),document.addEventListener("selectionchange",ut),document.addEventListener("keydown",ct),document.addEventListener("visibilitychange",pt),window.addEventListener("pagehide",ft))}var Hn=["dyslexiaFont","highlightLinks","highlightTitles","focusRing","bigCursor","stopAnimations","hideImages","lightContrast","darkContrast","readAloud","monochrome","lowSaturation","highSaturation","highContrast"];function Pn(t){if(document.getElementById(Ot))return;let e=document.createElement("style");e.id=Ot,e.textContent=ie(t),document.head.appendChild(e)}function qt(t,e){let n=document.documentElement;for(let r=1;r<=3;r++)n.classList.toggle(`${t}-${r}`,e===r)}function St(t){let{prefs:e}=t,n=document.documentElement,r=e.toggles;(e.fontSize!==100||e.fontWeight||e.lineHeight||e.letterSpacing||Object.keys(r).some(a=>r[a]))&&Pn(t.cfg.assetsBase);for(let a of Hn)n.classList.toggle(`cb-a11y-${a}`,!!r[a]);qt("cb-a11y-fw",e.fontWeight),qt("cb-a11y-lh",e.lineHeight),qt("cb-a11y-ls",e.letterSpacing),n.classList.toggle("cb-a11y-enlarge",e.fontSize>100),B(()=>fe(e.fontSize)),B(()=>ue(t.root,Object.fromEntries(Ht.map(a=>[a,r[a]])))),B(()=>he(!!r.stopAnimations)),B(()=>ge(!!r.muteSounds)),B(()=>be(t,!!r.readingGuide)),B(()=>ye(t,!!r.superFocus)),B(()=>ve(t,!!r.imageTooltips)),B(()=>Le(t,!!r.readAloud))}function B(t){try{t()}catch(e){try{console.warn("[Accessibility Menu] adjustment failed:",e)}catch(n){}}}var Ce="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";function zn(t){if(typeof t!="string")return"";let e=t.trim().slice(0,80);return!e||!/^[A-Za-z][A-Za-z0-9 \-]*$/.test(e)?"":e}function Te(t){return/\s/.test(t)?`"${t}"`:t}function $e(t,e){let n=zn(t),r=e.trim();return r&&(!n||r.toLowerCase().includes(n.toLowerCase()))?r:n&&r?`${Te(n)}, ${r}`:n?`${Te(n)}, ${Ce}`:r||Ce}function Oe(){try{return document.body&&getComputedStyle(document.body).fontFamily||getComputedStyle(document.documentElement).fontFamily||""}catch(t){return""}}var Ie=`:host {
  all: initial;
  display: block;
  position: fixed;
  inset: auto;
  width: 0;
  height: 0;
  z-index: 2147483001;
  font-family: var(--font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif);
  font-size: 15px;
  line-height: 1.4;
  color: var(--text);
  direction: ltr;
  --bg: #eef0f6;
  --card: #ffffff;
  --card-2: #f7f8fb;
  --text: #17181c;
  --muted: #4a5568;
  --border: #5c6578;
  --control: #5c6578;
  --tint: rgba(74, 79, 209, 0.1);
  --shadow: 0 12px 40px rgba(20, 24, 40, 0.28);
}
:host([data-theme='dark']) {
  --bg: #15171d;
  --card: #1f222b;
  --card-2: #262a35;
  --text: #f3f4f8;
  --muted: #c5cad8;
  --border: #8b93a8;
  --control: #8b93a8;
  --tint: rgba(255, 255, 255, 0.08);
}
:host([dir='rtl']) .cb-a11y-panel { direction: rtl; }

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
button { font: inherit; color: inherit; }
button:focus-visible, a:focus-visible, select:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
:host([data-theme='dark']) button:focus-visible,
:host([data-theme='dark']) a:focus-visible,
:host([data-theme='dark']) select:focus-visible { outline-color: #ffd54f; }

/* \u2500\u2500 Trigger \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.cb-a11y-trigger {
  position: fixed;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  --size: var(--size-cfg, 48px);
  min-width: var(--size);
  height: var(--size);
  padding: 0 calc(var(--size) * 0.18);
  border: 2px solid var(--trigger-border);
  border-radius: 999px;
  background: var(--trigger-bg);
  color: var(--trigger-fg);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  transition: transform 160ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 160ms;
}
.cb-a11y-trigger[data-shape='square'] { border-radius: 12px; }
.cb-a11y-trigger:focus-visible { outline: 3px solid #fff; outline-offset: 0; box-shadow: 0 0 0 6px #111, 0 4px 16px rgba(0, 0, 0, 0.22); }
.cb-a11y-trigger:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(0, 0, 0, 0.26); }
.cb-a11y-trigger:active { transform: translateY(0); }
.cb-a11y-trigger svg { width: calc(var(--size) * 0.56); height: calc(var(--size) * 0.56); flex: none; }
.cb-a11y-trigger[hidden] { display: none; }

/* \u2500\u2500 Scrim + panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.cb-a11y-scrim {
  position: fixed;
  inset: 0;
  z-index: 9;
  background: rgba(10, 12, 20, 0.35);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms;
}
.cb-a11y-scrim.is-open { opacity: 1; pointer-events: auto; }

.cb-a11y-panel {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 10;
  width: min(440px, 100%);
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
  box-shadow: var(--shadow);
  transform: translateX(var(--offscreen));
  visibility: hidden;
  transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s linear 260ms;
}
.cb-a11y-panel[data-side='left'] { left: 0; --offscreen: -105%; }
.cb-a11y-panel[data-side='right'] { right: 0; --offscreen: 105%; }
.cb-a11y-panel.is-open { transform: none; visibility: visible; transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1); }

.cb-a11y-header {
  flex: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: calc(14px + env(safe-area-inset-top, 0px)) 16px 14px;
  background: var(--header-bg, var(--accent));
  color: var(--header-fg, var(--accent-text));
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
}
.cb-a11y-header h2 { flex: 1; margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.01em; color: var(--header-fg, var(--accent-text)); }
.cb-a11y-iconbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 2px solid currentColor;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}
.cb-a11y-iconbtn:hover { background: color-mix(in srgb, currentColor 16%, transparent); }
.cb-a11y-iconbtn svg { width: 20px; height: 20px; }
.cb-a11y-voicebtn.is-on {
  background: var(--accent-text);
  color: var(--accent);
  border-color: var(--accent-text);
}

.cb-a11y-body { flex: 1; overflow-y: auto; overscroll-behavior: contain; padding: 14px 14px 24px; -webkit-overflow-scrolling: touch; }
.cb-a11y-profile, .cb-a11y-tile, .cb-a11y-stepper, .cb-a11y-select {
  scroll-margin-bottom: 96px;
  scroll-margin-top: 12px;
}
.cb-a11y-card {
  background: var(--card-2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 14px;
}
.cb-a11y-card h3 {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-ink, var(--text));
}

.cb-a11y-select {
  display: block;
  width: 100%;
  height: 46px;
  margin-bottom: 14px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card);
  color: var(--text);
  font: inherit;
  cursor: pointer;
}

/* Profiles */
.cb-a11y-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--card);
  text-align: start;
  cursor: pointer;
}
.cb-a11y-profile:last-child { margin-bottom: 0; }
.cb-a11y-profile .ic {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--tint);
}
.cb-a11y-profile .ic svg { width: 26px; height: 26px; }
.cb-a11y-profile .tx { flex: 1; min-width: 0; }
.cb-a11y-profile .tx b { display: block; font-size: 15px; font-weight: 700; }
.cb-a11y-profile .tx span { display: block; font-size: 13px; color: var(--muted); margin-top: 2px; }
.cb-a11y-switch {
  flex: none;
  position: relative;
  width: 44px;
  height: 26px;
  border-radius: 999px;
  background: var(--control);
  transition: background 160ms;
}
.cb-a11y-switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.cb-a11y-profile[aria-checked='true'] { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.cb-a11y-profile[aria-checked='true'] .cb-a11y-switch { background: var(--accent); }
.cb-a11y-profile[aria-checked='true'] .cb-a11y-switch::after { transform: translateX(18px); }

/* Font size stepper */
.cb-a11y-stepper {
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  gap: 8px;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--card);
}
.cb-a11y-stepper .lb { grid-column: 1 / -1; display: flex; align-items: center; gap: 8px; font-weight: 600; }
.cb-a11y-stepper .lb svg { width: 22px; height: 22px; }
.cb-a11y-stepper .val { text-align: center; font-size: 18px; font-weight: 700; font-variant-numeric: tabular-nums; }
.cb-a11y-stepbtn {
  width: 44px;
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--card-2);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.cb-a11y-stepbtn:disabled { opacity: 0.4; cursor: default; }
.cb-a11y-stepbtn svg { width: 20px; height: 20px; }

/* Tile grid */
.cb-a11y-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.cb-a11y-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 108px;
  padding: 14px 8px 12px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--card);
  cursor: pointer;
  text-align: center;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.25;
  transition: border-color 120ms, background 120ms;
}
.cb-a11y-tile svg { width: 28px; height: 28px; }
.cb-a11y-tile.is-read-aloud {
  grid-column: 1 / -1;
  flex-direction: row;
  justify-content: flex-start;
  gap: 14px;
  min-height: 72px;
  padding: 12px 16px;
  text-align: start;
}
.cb-a11y-tile.is-read-aloud svg { width: 40px; height: 40px; flex: none; }
.cb-a11y-tile.is-read-aloud .tx { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.cb-a11y-tile.is-read-aloud .tx b { font-size: 16px; }
.cb-a11y-tile.is-read-aloud .tx span { font-size: 13px; font-weight: 500; color: var(--muted); }
.cb-a11y-tile:hover { border-color: var(--accent); background: var(--card); }
.cb-a11y-tile:active { transform: scale(0.98); }
.cb-a11y-tile[aria-checked='true'] { border-color: var(--accent); background: var(--tint); box-shadow: inset 0 0 0 1px var(--accent); }
.cb-a11y-tile[aria-checked='true']::after,
.cb-a11y-tile[aria-checked='true']::before {
  content: '';
  position: absolute;
  top: 7px;
  right: 7px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
.cb-a11y-tile[aria-checked='true']::after { background: var(--accent); }
.cb-a11y-tile[aria-checked='true']::before {
  z-index: 1;
  background: var(--accent-text);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E") center / 12px 12px no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E") center / 12px 12px no-repeat;
}
.cb-a11y-tile:disabled { opacity: 0.45; cursor: not-allowed; }
.cb-a11y-tile .lv { display: flex; gap: 4px; }
.cb-a11y-tile .lv i { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
.cb-a11y-tile .lv i.on { background: var(--accent); }

/* Footer */
.cb-a11y-footer { flex: none; padding: 12px 14px calc(14px + env(safe-area-inset-bottom, 0px)); border-top: 1px solid var(--border); background: var(--bg); }
.cb-a11y-reset {
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 12px;
  background: var(--accent);
  color: var(--accent-text);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
.cb-a11y-reset:hover { filter: brightness(1.08); }
.cb-a11y-links { display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 10px; font-size: 13px; }
.cb-a11y-links a { display: inline-flex; align-items: center; gap: 5px; color: var(--text); text-decoration: underline; }
.cb-a11y-links a svg { width: 14px; height: 14px; }
.cb-a11y-fine { margin: 10px 0 0; font-size: 12px; line-height: 1.45; color: var(--muted); }
.cb-a11y-fine a { color: inherit; }

/* Page structure view */
.cb-a11y-struct-section h3 { margin: 12px 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
.cb-a11y-struct-list { list-style: none; margin: 0; padding: 0; }
.cb-a11y-struct-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  width: 100%;
  padding: 9px 10px;
  margin-bottom: 4px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card);
  text-align: start;
  cursor: pointer;
  font-size: 14px;
  overflow-wrap: anywhere;
}
.cb-a11y-struct-item:hover { border-color: var(--accent); }
.cb-a11y-struct-meta { flex: none; font-size: 11px; font-weight: 700; color: var(--accent-ink, var(--text)); }
.cb-a11y-struct-empty { padding: 8px 10px; color: var(--muted); font-size: 14px; }

/* \u2500\u2500 Page-level aids (inside our shadow, above the page) \u2500\u2500\u2500 */
.cb-a11y-overlay { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
.cb-a11y-guide {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 18px;
  z-index: 3;
  pointer-events: none;
  background: rgba(255, 235, 59, 0.62);
  border-top: 3px solid #111;
  border-bottom: 3px solid #111;
  will-change: transform;
}
.cb-a11y-focus-hole {
  position: fixed;
  top: 0; left: 0;
  z-index: 3;
  pointer-events: none;
  border-radius: 8px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.62);
  opacity: 0;
  will-change: transform, width, height;
}
.cb-a11y-tip {
  position: fixed;
  top: 0; left: 0;
  z-index: 5;
  max-width: min(360px, calc(100vw - 16px));
  padding: 10px 14px;
  border-radius: 8px;
  background: #111;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  pointer-events: none;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
}
.cb-a11y-tip.is-missing { background: #8a0f22; }
.cb-a11y-tip.is-missing::before { content: '! '; font-weight: 700; }
.cb-a11y-tip[hidden] { display: none; }

.cb-a11y-sr {
  position: absolute;
  width: 1px; height: 1px;
  margin: -1px; padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .cb-a11y-panel, .cb-a11y-scrim, .cb-a11y-trigger, .cb-a11y-switch, .cb-a11y-switch::after, .cb-a11y-tile { transition: none !important; }
}
@media (forced-colors: active) {
  .cb-a11y-panel, .cb-a11y-card, .cb-a11y-profile, .cb-a11y-tile, .cb-a11y-select, .cb-a11y-stepper {
    border: 1px solid ButtonText;
  }
  .cb-a11y-trigger, .cb-a11y-iconbtn, .cb-a11y-stepbtn, .cb-a11y-reset {
    border: 2px solid ButtonText;
    forced-color-adjust: none;
  }
  .cb-a11y-switch { background: GrayText; }
  .cb-a11y-profile[aria-checked='true'] .cb-a11y-switch,
  .cb-a11y-tile[aria-checked='true']::after { background: Highlight; }
}
@media (max-width: 480px) {
  /* Phones: the trigger sits over content people are reading \u2014 icon only, never larger than 48px */
  .cb-a11y-trigger { --size: min(var(--size-cfg, 48px), 48px); padding: 0; }
  .cb-a11y-trigger span { display: none; }
  .cb-a11y-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cb-a11y-tile:last-child:nth-child(odd) { grid-column: 1 / -1; }
  /* Full-bleed sheet \u2014 100vw includes the scrollbar and overflows iOS by ~15px */
  .cb-a11y-panel { inset: 0; width: auto; }
  /* Compact footer so the menu itself keeps the room */
  .cb-a11y-footer { padding-top: 10px; }
  .cb-a11y-reset { height: 46px; font-size: 15px; }
  .cb-a11y-links { margin-top: 8px; gap: 4px 12px; }
  .cb-a11y-fine { margin-top: 8px; font-size: 11.5px; }
}
`;var Wt="cb-a11y-prefs";var _n=[["monochrome","lowSaturation","highSaturation"],["highContrast","lightContrast","darkContrast"]];function et(){return{v:1,fontSize:100,fontWeight:0,lineHeight:0,letterSpacing:0,toggles:{},profile:null,lang:null,menuVoice:!1}}function He(){try{let t=localStorage.getItem(Wt);if(!t)return et();let e=JSON.parse(t);if(!e||e.v!==1)return et();let n=et();return n.fontSize=Pe(Number(e.fontSize)),n.fontWeight=Gt(e.fontWeight),n.lineHeight=Gt(e.lineHeight),n.letterSpacing=Gt(e.letterSpacing),n.toggles=e.toggles&&typeof e.toggles=="object"?{...e.toggles}:{},n.profile=typeof e.profile=="string"?e.profile:null,n.lang=typeof e.lang=="string"?e.lang:null,n.menuVoice=e.menuVoice===!0,n}catch(t){return et()}}function Yt(t){try{Nn(t)?localStorage.removeItem(Wt):localStorage.setItem(Wt,JSON.stringify(t))}catch(e){}}function Nn(t){return t.fontSize===100&&t.fontWeight===0&&t.lineHeight===0&&t.letterSpacing===0&&t.profile===null&&t.lang===null&&!t.menuVoice&&!Object.keys(t.toggles).some(e=>t.toggles[e])}function Pe(t){if(!Number.isFinite(t))return 100;let e=Math.round(t/10)*10;return Math.min(200,Math.max(80,e))}function Gt(t){let e=typeof t=="number"?Math.round(t):0;return Math.min(3,Math.max(0,Number.isFinite(e)?e:0))}function ze(t,e,n){if(n){for(let r of _n)if(r.includes(e))for(let o of r)o!==e&&delete t.toggles[o];t.toggles[e]=!0}else delete t.toggles[e];t.profile=null}function Re(t,e){return t[e]=(t[e]+1)%4,t.profile=null,t[e]}function _e(t,e){return t.fontSize=Pe(t.fontSize+e*10),t.profile=null,t.fontSize}var Fn={seizureSafe:{toggles:{stopAnimations:!0,lowSaturation:!0,muteSounds:!0}},readAloud:{toggles:{readAloud:!0}},visuallyImpaired:{fontSize:150,fontWeight:1,lineHeight:1,letterSpacing:1,toggles:{lightContrast:!0,highlightLinks:!0,highlightTitles:!0,bigCursor:!0,focusRing:!0,imageTooltips:!0,readingGuide:!0}},adhd:{toggles:{superFocus:!0,stopAnimations:!0,muteSounds:!0}},cognitive:{toggles:{readingGuide:!0,highlightTitles:!0,highlightLinks:!0,dyslexiaFont:!0},lineHeight:1},motorImpaired:{fontSize:110,toggles:{bigCursor:!0,focusRing:!0,highlightLinks:!0}}};function Ne(t,e){let n=t.lang,r=t.menuVoice,o=et();if(o.lang=n,o.menuVoice=r,e){let a=Fn[e];Object.assign(o,a,{toggles:{...a.toggles||{}},profile:e,lang:n,menuVoice:r})}Object.assign(t,o)}function Fe(t){let e=t.lang;Object.assign(t,et()),t.lang=e}var Bn=["bg","card","card-2","text","muted","border","control","tint"];function Xt(t,e,n){let r=e.surface,o=(r==null?void 0:r.theme)||n;if(t.setAttribute("data-theme",o),t.style.setProperty("--accent",e.accent),t.style.setProperty("--accent-text",e.accentText||It(e.accent)),t.style.setProperty("--header-bg",e.headerBg||e.accent),t.style.setProperty("--header-fg",e.headerFg||e.accentText||It(e.accent)),r)t.style.setProperty("--bg",r.bg),t.style.setProperty("--card",r.card),t.style.setProperty("--card-2",r.card2),t.style.setProperty("--text",r.text),t.style.setProperty("--muted",r.muted),t.style.setProperty("--border",r.border),t.style.setProperty("--control",r.control),t.style.setProperty("--tint",r.tint);else for(let s of Bn)t.style.removeProperty(`--${s}`);let a=(r==null?void 0:r.card2)||(o==="dark"?"#262a35":"#f7f8fb");t.style.setProperty("--accent-ink",ae(e.accent,a))}var Vn=[['header,[role="banner"]',"header"],['nav,[role="navigation"]',"nav"],['main,[role="main"]',"main"],['aside,[role="complementary"]',"aside"],['form,[role="form"],[role="search"]',"form"],['footer,[role="contentinfo"]',"footer"]];function Jt(t){if(t.closest(`#${y},[hidden],[aria-hidden="true"]`))return!1;let e=t.getBoundingClientRect();return e.width>0||e.height>0?!0:getComputedStyle(t).display!=="none"}function Be(t){return t.getAttribute("aria-label")||(t.innerText||t.textContent||"").replace(/\s+/g," ").trim().slice(0,120)}function Dn(){let t=[];document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]').forEach(o=>{if(!Jt(o))return;let a=o.getAttribute("aria-level")||o.tagName.replace(/\D/g,"")||"2",s=Be(o);s&&t.push({label:s,meta:`H${a}`,el:o})});let e=[],n=new Set;for(let[o,a]of Vn)document.querySelectorAll(o).forEach(s=>{n.has(s)||!Jt(s)||(n.add(s),e.push({label:s.getAttribute("aria-label")||a,meta:a,el:s}))});let r=[];return document.querySelectorAll("a[href]").forEach(o=>{var s;if(r.length>=200||!Jt(o))return;let a=Be(o)||((s=o.querySelector("img"))==null?void 0:s.alt)||"";a&&r.push({label:a,meta:"",el:o})}),{headings:t,landmarks:e,links:r}}function Ve(t){let e=t,n=e.hasAttribute("tabindex");n||e.setAttribute("tabindex","-1"),e.scrollIntoView({block:"center"}),e.focus({preventScroll:!0}),n||e.addEventListener("blur",()=>e.removeAttribute("tabindex"),{once:!0})}function De(t,e){let n=Dn(),r=(o,a,s=!1)=>{let c=l("ul",{class:"cb-a11y-struct-list"});a.length||c.appendChild(l("li",{class:"cb-a11y-struct-empty",text:t.structureEmpty}));for(let u of a){let g=l("button",{type:"button",class:"cb-a11y-struct-item"},[u.meta?l("span",{class:"cb-a11y-struct-meta",text:u.meta}):null,l("span",{text:u.label})]);s&&u.meta&&(g.style.paddingLeft=`${8+(Number(u.meta.slice(1))-1)*12}px`),g.addEventListener("click",()=>e(u.el)),c.appendChild(l("li",{},[g]))}return l("section",{class:"cb-a11y-struct-section"},[l("h3",{text:o}),c])};return l("div",{class:"cb-a11y-struct"},[r(t.structureHeadings,n.headings,!0),r(t.structureLandmarks,n.landmarks),r(t.structureLinks,n.links)])}var S={"universal-access":'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="7" r="1.2" fill="currentColor" stroke="none"/><path d="M6.5 10.5c3.7 1 7.3 1 11 0"/><path d="M12 11v3.5l-2 4.5"/><path d="M12 14.5l2 4.5"/>',wheelchair:'<circle cx="14" cy="4" r="1.5"/><path d="M13 7v5h5l2 5"/><path d="M13 10h4"/><circle cx="10" cy="17" r="4.5"/><path d="M9.5 12.6a4.5 4.5 0 100 8.9"/>',eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',reset:'<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',menuVoice:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M7 11a5 5 0 0010 0"/><path d="M12 16v4M9 20h6"/>',menuVoiceOff:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M7 11a5 5 0 0010 0"/><path d="M12 16v4M9 20h6"/><path d="M4 4l16 16"/>',chevron:'<path d="M6 9l6 6 6-6"/>',back:'<path d="M15 6l-6 6 6 6"/>',minus:'<path d="M5 12h14"/>',plus:'<path d="M12 5v14M5 12h14"/>',seizureSafe:'<path d="M4 12h3l2-6 3 12 2-6h6"/><path d="M3 3l18 18"/>',readAloudProfile:'<path d="M4 9v6h3l4 4V5L7 9z"/><path d="M15 9a4 4 0 010 6"/><path d="M17.5 6.5a8 8 0 010 11"/>',visuallyImpaired:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',adhd:'<circle cx="12" cy="12" r="9"/><path d="M12 8v4l2 2"/>',cognitive:'<path d="M12 5.5C10 4 5 4 3 5.5v13c2-1.5 7-1.5 9 0 2-1.5 7-1.5 9 0v-13c-2-1.5-7-1.5-9 0z"/><path d="M12 5.5v13"/>',motorImpaired:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>',fontSize:'<path d="M4 18L9 6l5 12"/><path d="M6 14h6"/><path d="M15 18l2.5-6 2.5 6"/><path d="M16 16h3"/>',fontWeight:'<path d="M7 5h6a3.5 3.5 0 010 7H7z"/><path d="M7 12h7a3.5 3.5 0 010 7H7z"/>',lineHeight:'<path d="M4 5h16M4 19h16"/><path d="M12 8v8"/><path d="M9.5 10.5L12 8l2.5 2.5M9.5 13.5L12 16l2.5-2.5"/>',letterSpacing:'<path d="M4 4v16M20 4v16"/><path d="M8 16l4-8 4 8"/><path d="M9.5 13h5"/>',dyslexiaFont:'<path d="M5 18L9.5 6l4.5 12"/><path d="M6.7 14h5.6"/><path d="M16 12a3 3 0 106 0 3 3 0 10-6 0"/>',highlightLinks:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',highlightTitles:'<path d="M5 5h14"/><path d="M12 5v14"/><path d="M8 19h8"/>',superFocus:'<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3"/><circle cx="12" cy="12" r="3.5"/>',readAloud:'<path d="M4 9v6h3l4 4V5L7 9z"/><path d="M15 9a4 4 0 010 6"/><path d="M17.5 6.5a8 8 0 010 11"/>',readingGuide:'<path d="M12 5.5C10 4 5 4 3 5.5v13c2-1.5 7-1.5 9 0 2-1.5 7-1.5 9 0v-13c-2-1.5-7-1.5-9 0z"/><path d="M6 10h4M14 10h4M6 13h4M14 13h4"/>',bigCursor:'<path d="M5 3l14 8.5-6.2 1.6L9.3 20z"/>',pageStructure:'<path d="M4 6l8-3 8 3-8 3z"/><path d="M4 12l8 3 8-3"/><path d="M4 18l8 3 8-3"/>',monochrome:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 20L20 4"/><path d="M12 4v16" stroke-dasharray="2 2"/>',lowSaturation:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 4v16M12 4v16M16 4v16M4 8h16M4 12h16M4 16h16"/>',highSaturation:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2"/>',highContrast:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M12 3a9 9 0 010 18z" fill="currentColor" stroke="none"/>',lightContrast:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',darkContrast:'<path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/>',stopAnimations:'<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',hideImages:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 16l5-5 4 4 3-3 6 6"/><path d="M3 3l18 18"/>',imageTooltips:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M7 9h10M7 12h6"/>',muteSounds:'<path d="M4 9v6h3l4 4V5L7 9z"/><path d="M16 9l5 6M21 9l-5 6"/>',external:'<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'};var Ke=["cookie-consent-banner","cookie-settings-float"];function je(){return document.documentElement.clientHeight||window.innerHeight}function Kn(t){if(!t)return null;let e=getComputedStyle(t);if(e.display==="none"||e.visibility==="hidden"||e.opacity==="0")return null;let n=t.getBoundingClientRect();return n.width<=0||n.height<=0||n.bottom<0||n.top>je()||n.right<0||n.left>(document.documentElement.clientWidth||window.innerWidth)?null:n}function jn(t,e){return t.left<e.right+6&&t.right>e.left-6&&t.top<e.bottom+6&&t.bottom>e.top-6}function Zt(t,e){let n=t.style;n.left=n.right=n.top=n.bottom="auto",n.transform="";let r=e.position.endsWith("right")?"right":"left";n[r]=`calc(${e.offsetX}px + env(safe-area-inset-${r}, 0px))`,e.position.startsWith("top")?n.top=`calc(${e.offsetY}px + env(safe-area-inset-top, 0px))`:e.position.startsWith("middle")?(n.top="50%",n.transform="translateY(-50%)"):n.bottom=`calc(${e.offsetY}px + env(safe-area-inset-bottom, 0px))`}function Un(t,e){Zt(t,e);let n=e.position.startsWith("top")?"top":e.position.startsWith("middle")?"middle":"bottom",r=!1;for(let o=0;o<3;o++){let a=t.getBoundingClientRect();if(a.width===0)return r;let s=Ke.map(c=>Kn(document.getElementById(c))).find(c=>c&&jn(a,c));if(!s)return r;r=!0,n==="bottom"?t.style.bottom=`${Math.max(0,je()-s.top+12)}px`:n==="top"?t.style.top=`${s.bottom+12}px`:(t.style.transform="",t.style.top=`${Math.max(12,s.top-a.height-12)}px`)}return r}function Ue(t,e){let n=0,r=[],o=()=>{n||(n=requestAnimationFrame(()=>{n=0;try{Un(t,e)}catch(T){}}))},a=()=>{o(),r.forEach(clearTimeout),r.length=0;for(let T of[120,400,900,1800])r.push(window.setTimeout(o,T))},s=new WeakSet,c=typeof MutationObserver!="undefined"?new MutationObserver(a):null,u=typeof ResizeObserver!="undefined"?new ResizeObserver(o):null,g=()=>{for(let T of Ke){let k=document.getElementById(T);!k||s.has(k)||(s.add(k),c==null||c.observe(k,{attributes:!0,attributeFilter:["style","class","hidden","aria-hidden"]}),u==null||u.observe(k),k.addEventListener("transitionend",o),k.addEventListener("animationend",o))}};g(),a();let x=typeof MutationObserver!="undefined"?new MutationObserver(()=>{g(),a()}):null;return x==null||x.observe(document.body,{childList:!0}),window.addEventListener("resize",o,{passive:!0}),window.addEventListener("orientationchange",a),()=>{x==null||x.disconnect(),c==null||c.disconnect(),u==null||u.disconnect(),window.removeEventListener("resize",o),window.removeEventListener("orientationchange",a),r.forEach(clearTimeout),n&&cancelAnimationFrame(n)}}var Yn=["seizureSafe","readAloud","visuallyImpaired","adhd","cognitive","motorImpaired"],Xn={seizureSafe:"seizureSafe",readAloud:"readAloudProfile",visuallyImpaired:"visuallyImpaired",adhd:"adhd",cognitive:"cognitive",motorImpaired:"motorImpaired"},Jn=[{title:"sectionContent",keys:["fontWeight","lineHeight","letterSpacing","dyslexiaFont","highlightLinks","highlightTitles"]},{title:"sectionVisual",keys:["readAloud","superFocus","readingGuide","bigCursor","pageStructure"]},{title:"sectionColor",keys:["monochrome","lowSaturation","highSaturation","highContrast","lightContrast","darkContrast"]},{title:"sectionTools",keys:["stopAnimations","hideImages","imageTooltips","muteSounds"]}],Zn=["fontWeight","lineHeight","letterSpacing"],Qn={small:40,medium:48,large:56};function qe(t){let{cfg:e,root:n}=t,r=new Set(e.features),o=e.trigger.position.endsWith("right")?"right":"left",a=!1,s="menu",c=null,u=l("button",{type:"button",class:"cb-a11y-trigger","aria-label":t.strings.openMenu,"aria-haspopup":"dialog","aria-expanded":"false","aria-controls":"cb-a11y-panel","data-shape":e.trigger.shape,title:t.strings.openMenu});if(u.style.setProperty("--size-cfg",`${Qn[e.trigger.size]}px`),u.appendChild(M(S[e.trigger.icon]||S["universal-access"])),e.trigger.label&&e.trigger.shape!=="circle"&&u.appendChild(l("span",{text:e.trigger.label})),Zt(u,e.trigger),e.trigger.hideOnMobile){let i=()=>{u.hidden=se()};i();try{window.matchMedia("(max-width: 767px)").addEventListener("change",i)}catch(f){}}let g=l("div",{class:"cb-a11y-scrim"}),x=l("h2",{id:"cb-a11y-title",text:t.strings.menuTitle}),T=l("button",{type:"button",class:"cb-a11y-iconbtn","aria-label":t.strings.closeMenu,hidden:!0},[M(S.back)]),k=l("button",{type:"button",class:"cb-a11y-iconbtn","aria-label":t.strings.resetSettings,title:t.strings.resetSettings},[M(S.reset)]),O=l("button",{type:"button",class:"cb-a11y-iconbtn cb-a11y-voicebtn","aria-label":t.strings.menuVoiceOn,title:t.strings.menuVoiceOn,"aria-pressed":"false"},[M(S.menuVoiceOff)]),V=l("button",{type:"button",class:"cb-a11y-iconbtn","aria-label":t.strings.closeMenu,title:t.strings.closeMenu},[M(S.close)]),Ge=l("div",{class:"cb-a11y-header"},[T,x,O,k,V]),J=l("div",{class:"cb-a11y-body"}),nt=l("div",{class:"cb-a11y-footer"}),D=l("div",{id:"cb-a11y-panel",class:"cb-a11y-panel",role:"dialog","aria-modal":"true","aria-labelledby":"cb-a11y-title","data-side":o,tabindex:"-1"},[Ge,J,nt]),kt=l("div",{class:"cb-a11y-sr",role:"status","aria-live":"polite","aria-atomic":"true"});n.append(g,D,u,kt),t.announce=i=>{kt.textContent="",requestAnimationFrame(()=>kt.textContent=i)};function te(){return t.lang==="auto"?navigator.language:t.lang}function ht(i,f=!1){t.prefs.menuVoice&&jt(i,te(),f)}let Mt=0;function ee(){let i=t.prefs.menuVoice,f=t.strings;O.hidden=!F(),O.classList.toggle("is-on",i),O.setAttribute("aria-pressed",String(i)),O.setAttribute("aria-label",i?f.menuVoiceOff:f.menuVoiceOn),O.title=i?f.menuVoiceOff:f.menuVoiceOn,O.replaceChildren(M(S[i?"menuVoice":"menuVoiceOff"]))}function At(i,f){i.addEventListener("pointerenter",h=>{t.prefs.menuVoice&&(Date.now()<Mt||h.pointerType!=="touch"&&ht(f(),!1))}),i.addEventListener("focus",()=>{t.prefs.menuVoice&&(Date.now()<Mt||ht(f(),!1))})}function K(){let i=t.strings;if(x.textContent=s==="menu"?i.menuTitle:i.structureTitle,T.hidden=s==="menu",T.setAttribute("aria-label",i.menuTitle),k.hidden=s!=="menu",u.setAttribute("aria-label",i.openMenu),u.title=i.openMenu,V.setAttribute("aria-label",i.closeMenu),V.title=i.closeMenu,ee(),t.host.setAttribute("dir",t.lang==="ar"||t.lang==="he"?"rtl":"ltr"),J.replaceChildren(),nt.replaceChildren(),s==="structure"){J.appendChild(De(i,m=>{Z(),Ve(m)}));return}let f=Object.keys(e.strings);if(f.length>1){let m=l("select",{class:"cb-a11y-select","aria-label":i.language});for(let p of f){let E=l("option",{value:p,text:e.languageNames[p]||p});p===t.lang&&(E.selected=!0),m.appendChild(E)}m.addEventListener("change",()=>{var p;t.prefs.lang=m.value,Qt(t,m.value),t.save(),K(),(p=n.querySelector(".cb-a11y-select"))==null||p.focus(),t.announce(t.strings.menuTitle)}),J.appendChild(m)}if(r.has("profiles")){let m=l("div",{class:"cb-a11y-card"},[l("h3",{text:i.sectionProfiles})]);for(let p of Yn){if(p==="readAloud"&&(!r.has("readAloud")||!F()))continue;let E=t.prefs.profile===p,C=l("button",{type:"button",class:"cb-a11y-profile",role:"switch","aria-checked":String(E),"aria-label":`${i.profiles[p].name}, ${E?i.speakOn:i.speakOff}`,"data-profile":p},[l("span",{class:"ic","aria-hidden":"true"},[M(S[Xn[p]])]),l("span",{class:"tx"},[l("b",{text:i.profiles[p].name}),l("span",{text:i.profiles[p].description})]),l("span",{class:"cb-a11y-switch","aria-hidden":"true"})]);C.addEventListener("click",()=>{var oe;let b=!E;Ne(t.prefs,E?null:p);let j=p==="readAloud"?b?i.readAloudOnSpeak:i.readAloudOffSpeak:b?R(i.profileApplied,{name:i.profiles[p].name}):R(i.turnedOff,{name:i.profiles[p].name});rt(j),ht(j,!0),t.track("a11y_profile",{profile:p,on:b}),(oe=n.querySelector(`[data-profile="${p}"]`))==null||oe.focus()}),At(C,()=>p==="readAloud"?t.prefs.toggles.readAloud?i.readAloudPreviewOn:i.readAloudPreviewOff:R(i.profilePreview,{name:i.profiles[p].name,state:t.prefs.profile===p?i.speakOn:i.speakOff})),m.appendChild(C)}J.appendChild(m)}for(let m of Jn){let p=m.keys.filter(b=>r.has(b)),E=m.title==="sectionContent";if(!p.length&&!(E&&r.has("fontSize")))continue;let C=l("div",{class:"cb-a11y-card"},[l("h3",{text:i[m.title]})]);if(E&&r.has("fontSize")&&C.appendChild(We()),p.length){let b=l("div",{class:"cb-a11y-grid"});for(let j of p)b.appendChild(Ye(j));C.appendChild(b)}J.appendChild(C)}let h=l("button",{type:"button",class:"cb-a11y-reset",text:i.resetSettings});h.addEventListener("click",()=>{var m;ne(),(m=n.querySelector(".cb-a11y-reset"))==null||m.focus()}),nt.appendChild(h);let w=l("div",{class:"cb-a11y-links"});e.statementUrl&&w.appendChild(l("a",{href:e.statementUrl,target:"_blank",rel:"noopener"},[M(S.external),i.statementLink])),e.feedbackEmail&&w.appendChild(l("a",{href:`mailto:${e.feedbackEmail}?subject=${encodeURIComponent(i.feedbackLink)}`},[M(S.mail),i.feedbackLink])),w.childNodes.length&&nt.appendChild(w);let L=l("p",{class:"cb-a11y-fine",text:i.disclaimer});e.poweredBy&&(L.appendChild(document.createTextNode(" ")),L.appendChild(l("a",{href:"https://www.cookie-banner.ca/?ref=a11y",target:"_blank",rel:"noopener",text:i.poweredBy}))),nt.appendChild(L)}function We(){let i=t.strings,f=l("span",{class:"val","aria-live":"off",text:`${t.prefs.fontSize}%`}),h=l("button",{type:"button",class:"cb-a11y-stepbtn","aria-label":i.fontSizeDecrease},[M(S.minus)]),w=l("button",{type:"button",class:"cb-a11y-stepbtn","aria-label":i.fontSizeIncrease},[M(S.plus)]);h.disabled=t.prefs.fontSize<=80,w.disabled=t.prefs.fontSize>=200;let L=m=>{var E;let p=_e(t.prefs,m);rt(R(i.fontSizeAnnounce,{value:p})),t.track("a11y_toggle",{feature:"fontSize",value:p}),(E=n.querySelector(m===1?".cb-a11y-stepbtn:last-of-type":".cb-a11y-stepbtn"))==null||E.focus()};return h.addEventListener("click",()=>L(-1)),w.addEventListener("click",()=>L(1)),l("div",{class:"cb-a11y-stepper",role:"group","aria-label":`${i.fontSize}, ${t.prefs.fontSize}%`},[l("div",{class:"lb"},[M(S.fontSize),i.fontSize]),h,f,w])}function Ye(i){var E;let f=t.strings,h=f[i],w=Zn.includes(i),L=w?t.prefs[i]:0,m=w?L>0:i==="pageStructure"?!1:!!t.prefs.toggles[i],p=l("button",{type:"button",class:i==="readAloud"?"cb-a11y-tile is-read-aloud":"cb-a11y-tile",role:i==="pageStructure"?null:"switch","aria-checked":i==="pageStructure"?null:String(m),"data-key":i,"aria-label":w?`${h}: ${f.levelLabels[L]||f.levelOff}`:i==="pageStructure"?h:`${h}, ${m?f.speakOn:f.speakOff}`},[M(S[i]),l("span",{class:"tx"},[l("b",{text:h})])]);if(i==="readAloud"&&((E=p.querySelector(".tx"))==null||E.appendChild(l("span",{text:f.readAloudShort}))),w){let C=l("span",{class:"lv","aria-hidden":"true"});for(let b=1;b<=3;b++)C.appendChild(l("i",{class:b<=L?"on":""}));p.appendChild(C)}return i==="readAloud"&&(F()?p.title=t.strings.readAloudHint:(p.disabled=!0,p.title=t.strings.ttsUnavailable),At(p,()=>m?f.readAloudPreviewOn:f.readAloudPreviewOff)),p.addEventListener("click",()=>{var C;if(i==="pageStructure"){s="structure",K(),T.focus(),t.track("a11y_open",{view:"structure"});return}if(w){let b=Re(t.prefs,i);rt(`${h}: ${f.levelLabels[b]||f.levelOff}`),t.track("a11y_toggle",{feature:i,value:b})}else{let b=!m;ze(t.prefs,i,b);let j=i==="readAloud"?b?f.readAloudOnSpeak:f.readAloudOffSpeak:R(b?f.turnedOn:f.turnedOff,{name:h});rt(j),i==="readAloud"&&ht(j,!0),t.track("a11y_toggle",{feature:i,on:b})}(C=n.querySelector(`[data-key="${i}"]`))==null||C.focus()}),p}function rt(i){Mt=Date.now()+600,t.save(),t.render(),K(),t.announce(i)}function ne(){Fe(t.prefs),rt(t.strings.resetDone),t.track("a11y_reset")}function Lt(){if(a)return;a=!0,s="menu";let i=document.activeElement;c=i===t.host?n.activeElement:i,(!c||c===document.body||D.contains(c))&&(c=u),K(),g.classList.add("is-open"),D.classList.add("is-open"),u.setAttribute("aria-expanded","true"),u.style.visibility="hidden",V.focus(),document.addEventListener("keydown",re,!0),t.track("a11y_open")}function Z(){a&&(a=!1,g.classList.remove("is-open"),D.classList.remove("is-open"),u.setAttribute("aria-expanded","false"),u.style.visibility="",document.removeEventListener("keydown",re,!0),(c&&c.isConnected?c:u).focus())}function Ct(){a?Z():Lt()}function re(i){if(i.key==="Escape"){i.preventDefault(),s==="structure"?(s="menu",K(),V.focus()):Z();return}if(i.key!=="Tab")return;let f=ce(D);if(!f.length)return;let h=n.activeElement,w=f[0],L=f[f.length-1];i.shiftKey&&(h===w||!h||!D.contains(h))?(i.preventDefault(),L.focus()):!i.shiftKey&&(h===L||!h||!D.contains(h))&&(i.preventDefault(),w.focus())}return u.addEventListener("click",Ct),At(u,()=>t.strings.openMenu),O.addEventListener("click",()=>{let i=!t.prefs.menuVoice;if(t.prefs.menuVoice=i,t.save(),ee(),t.track("a11y_toggle",{feature:"menuVoice",on:i}),!i){tt(),t.announce(t.strings.menuVoiceOff);return}jt(t.strings.menuVoiceOnSpeak,te(),!0)}),V.addEventListener("click",Z),T.addEventListener("click",()=>{s="menu",K(),V.focus()}),k.addEventListener("click",ne),g.addEventListener("click",Z),e.shortcut!=="none"&&document.addEventListener("keydown",i=>{(e.shortcut==="alt-shift-a"?i.altKey&&i.shiftKey&&(i.key==="A"||i.key==="a"):(i.ctrlKey||i.metaKey)&&!i.shiftKey&&(i.key==="u"||i.key==="U"))&&(i.preventDefault(),Ct())}),e.trigger.customSelector&&document.addEventListener("click",i=>{let f=i.target;f&&f.closest(e.trigger.customSelector)&&(i.preventDefault(),Lt())}),Ue(u,e.trigger),{open:Lt,close:Z,toggle:Ct,render:K}}function Qt(t,e){let n=t.cfg.strings[e]||t.cfg.strings.en||Object.values(t.cfg.strings)[0];t.strings=n,t.lang=e}function er(){if(window.__cbA11yConfig&&typeof window.__cbA11yConfig=="object")return window.__cbA11yConfig;let t=document.currentScript||document.getElementById("cb-a11y-script"),e=t==null?void 0:t.getAttribute("data-cb-a11y");if(!e)return null;try{return JSON.parse(e)}catch(n){return null}}function nr(t,e){let n=Object.keys(t.strings);if(e&&n.includes(e))return e;if(t.lang==="auto"){let r=(navigator.language||"en").slice(0,2).toLowerCase();return n.includes(r)?r:n[0]||"en"}return n.includes(t.lang)?t.lang:n[0]||"en"}function rr(){if(window.__cbA11yBooted||document.getElementById(y))return;let t=er();if(!t||!t.strings||!t.trigger)return;window.__cbA11yBooted=!0;let e=()=>{if(!document.body){setTimeout(e,50);return}let n=$e(t.fontFamily||"",Oe()),r=document.createElement("div");r.id=y,r.style.cssText=`all:initial;display:block;position:fixed;inset:auto;width:0;height:0;z-index:${2147483001};font-family:${n};font-size:15px;line-height:1.4;font-weight:400;letter-spacing:normal;text-transform:none;color:var(--text)`;let o=r.attachShadow({mode:"open"}),a=document.createElement("style");a.textContent=Ie,o.appendChild(a);let s=t.panel.theme==="auto"?le()?"dark":"light":t.panel.theme;Xt(r,t.panel,s),r.style.setProperty("--trigger-bg",t.trigger.colors.background),r.style.setProperty("--trigger-fg",t.trigger.colors.icon),r.style.setProperty("--trigger-border",t.trigger.colors.border),r.style.setProperty("--font",n);let c=He(),u={cfg:t,prefs:c,strings:t.strings.en||Object.values(t.strings)[0],lang:"en",root:o,host:r,announce:()=>{},save:()=>Yt(c),render:()=>St(u),track:(x,T)=>{var k;try{(k=window.__cbA11yTrack)==null||k.call(window,x,T)}catch(O){}}};Qt(u,nr(t,c.lang)),document.body.appendChild(r);let g=qe(u);if(g.render(),St(u),t.panel.theme==="auto"&&!t.panel.surface)try{window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",x=>{Xt(r,t.panel,x.matches?"dark":"light")})}catch(x){}window.cbAccessibility={open:g.open,close:g.close,toggle:g.toggle,reset:()=>{c.fontSize=100,c.fontWeight=c.lineHeight=c.letterSpacing=0,c.toggles={},c.profile=null,c.menuVoice=!1,Yt(c),St(u),g.render()},version:1}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}try{rr()}catch(t){try{console.warn("[Accessibility Menu] failed to start:",t)}catch(e){}}})();
//# sourceMappingURL=widget.v1.js.map
