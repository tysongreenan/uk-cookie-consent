/**
 * Document-level stylesheet for the adjustments. Injected once into <head> as
 * <style id="cb-a11y-adjust">. Everything is keyed off classes on <html> so
 * apply/remove is a class flip, and every selector excludes our own host element.
 *
 * Shadow DOM note: document styles never reach the panel's shadow tree, and the
 * host resets inherited properties with `all: initial`, so the menu itself keeps
 * its own size/colours while the visitor changes the page.
 */

const H = ':not(#cb-a11y-host)'
// Elements that must keep their icon fonts or we'd turn Font Awesome into squares.
const ICONS = ':not(i):not([class*="icon"]):not([class*="fa-"]):not(.material-icons):not(.material-symbols-outlined)'

const CURSOR_ARROW =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24'><path d='M5 3l14 8.5-6.2 1.6L9.3 20z' fill='%23000' stroke='%23fff' stroke-width='1.5' stroke-linejoin='round'/></svg>\") 6 4, auto"
const CURSOR_HAND =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24'><path d='M9 3.5a1.5 1.5 0 013 0V10h1V5.5a1.5 1.5 0 013 0V11h1V7.5a1.5 1.5 0 013 0V15c0 3.5-2.5 6-6 6h-1.5c-2 0-3.4-.8-4.4-2.2L4.6 14a1.4 1.4 0 012.2-1.7L9 14.5z' fill='%23000' stroke='%23fff' stroke-width='1.5' stroke-linejoin='round'/></svg>\") 10 4, pointer"

export function buildAdjustCss(assetsBase: string): string {
  const fonts = assetsBase.replace(/\/$/, '') + '/fonts'
  let hasOk = false
  try {
    hasOk = typeof CSS !== 'undefined' && CSS.supports('selector(:has(h1))')
  } catch {
    hasOk = false
  }
  const inlineLink = hasOk
    ? `html.cb-a11y-highlightLinks body a[href]:not(:has(h1,h2,h3,h4,h5,h6,p,ul,ol,img,picture,video,figure))${H},
html.cb-a11y-highlightLinks body a[href]:not(:has(h1,h2,h3,h4,h5,h6,p,ul,ol,img,picture,video,figure))${H} *{background:#fff176!important;color:#000!important}`
    : ''
  return `
@font-face{font-family:'CB OpenDyslexic';font-style:normal;font-weight:400;font-display:swap;src:url('${fonts}/OpenDyslexic-Regular.woff2') format('woff2')}
@font-face{font-family:'CB OpenDyslexic';font-style:normal;font-weight:700;font-display:swap;src:url('${fonts}/OpenDyslexic-Bold.woff2') format('woff2')}

/* Font weight */
html.cb-a11y-fw-1 body *${H}${ICONS}{font-weight:600!important}
html.cb-a11y-fw-2 body *${H}${ICONS}{font-weight:700!important}
html.cb-a11y-fw-3 body *${H}${ICONS}{font-weight:800!important}

/* Line height */
/* Most sites already ship 1.5, so level 1 must be a visible step up from that */
html.cb-a11y-lh-1 body *${H}:not(img):not(svg):not(video):not(canvas):not(br):not(hr){line-height:1.8!important}
html.cb-a11y-lh-2 body *${H}:not(img):not(svg):not(video):not(canvas):not(br):not(hr){line-height:2.2!important}
html.cb-a11y-lh-3 body *${H}:not(img):not(svg):not(video):not(canvas):not(br):not(hr){line-height:2.6!important}

/* Letter spacing — skip icon fonts (they become unreadable) and code blocks */
html.cb-a11y-ls-1 body *${H}${ICONS}:not(code):not(pre):not(kbd):not(samp){letter-spacing:.08em!important}
html.cb-a11y-ls-2 body *${H}${ICONS}:not(code):not(pre):not(kbd):not(samp){letter-spacing:.16em!important}
html.cb-a11y-ls-3 body *${H}${ICONS}:not(code):not(pre):not(kbd):not(samp){letter-spacing:.24em!important}

/* Dyslexia font */
html.cb-a11y-dyslexiaFont body *${H}${ICONS}{font-family:'CB OpenDyslexic',Verdana,Arial,sans-serif!important}

/* Highlight links / titles.
   Card-sized links (an <a> wrapping a heading + image) only get an outline — painting
   the whole card yellow hides the content low-vision users are trying to read.
   Inline/text links get the high-visibility yellow strip when :has() is supported. */
html.cb-a11y-highlightLinks body a[href]${H}{text-decoration:underline!important;text-decoration-thickness:3px!important;text-underline-offset:3px!important;outline:2px solid #111!important;outline-offset:2px!important}
${inlineLink}
html.cb-a11y-highlightTitles body :is(h1,h2,h3,h4,h5,h6,[role="heading"])${H}{outline:3px solid #4a4fd1!important;outline-offset:3px!important;background-image:none!important;text-decoration:underline!important;text-decoration-thickness:3px!important;text-underline-offset:4px!important}

/* Focus ring (motor + low vision) */
html.cb-a11y-focusRing body *${H}:focus{outline:3px solid #ffbf00!important;outline-offset:3px!important;box-shadow:0 0 0 6px rgba(0,0,0,.65)!important}
html.cb-a11y-focusRing body :is(button,[role="button"],input,select,textarea,summary)${H},
html.cb-a11y-bigCursor body :is(button,[role="button"],input:not([type="hidden"]),select,textarea,summary)${H}{min-height:44px!important}
html.cb-a11y-focusRing body a${H}:not(p a):not(li a):not(td a):not(dd a),
html.cb-a11y-bigCursor body a${H}:not(p a):not(li a):not(td a):not(dd a){min-height:44px!important;min-width:44px!important}

/* Enlarged type: keep words on screen instead of overflowing the viewport */
html.cb-a11y-enlarge body *${H}{overflow-wrap:break-word!important}

/* What is currently being read aloud — must be visible, not only audible */
html.cb-a11y-readAloud [data-cb-a11y-speaking]{outline:4px solid #4a4fd1!important;outline-offset:4px!important;box-shadow:0 0 0 8px rgba(255,235,59,.5)!important}
html.cb-a11y-darkContrast [data-cb-a11y-speaking]{outline-color:#ffe600!important;box-shadow:0 0 0 8px rgba(255,230,0,.28)!important}

/* Big cursor */
html.cb-a11y-bigCursor, html.cb-a11y-bigCursor body *${H}{cursor:${CURSOR_ARROW}!important}
html.cb-a11y-bigCursor body :is(a,button,[role="button"],input[type="submit"],input[type="button"],label,select,summary)${H}, html.cb-a11y-bigCursor body :is(a,button,[role="button"])${H} *{cursor:${CURSOR_HAND}!important}

/* Stop animations */
html.cb-a11y-stopAnimations body *${H}, html.cb-a11y-stopAnimations body *${H}::before, html.cb-a11y-stopAnimations body *${H}::after{animation-play-state:paused!important;animation-duration:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}
html.cb-a11y-stopAnimations{scroll-behavior:auto!important}

/* Hide images (alt text is surfaced by the widget's tooltip feature).
   Icon SVGs inside links/buttons stay: hiding them removes the only visible
   affordance of icon-only controls (nav toggles, search, close buttons). */
html.cb-a11y-hideImages body :is(img,picture,video,canvas,[role="img"])${H}{visibility:hidden!important}
html.cb-a11y-hideImages body svg:not(a svg):not(button svg):not([role="button"] svg)${H}{visibility:hidden!important}
html.cb-a11y-hideImages body *${H}{background-image:none!important}

/* Light / dark contrast: forced colours, not filters, so they survive the filter escape hatch.
   :where() keeps the broad rule at low specificity so the link rules below can win.
   -webkit-text-fill-color beats gradient/clipped headings that otherwise stay invisible. */
html.cb-a11y-lightContrast body, html.cb-a11y-lightContrast body :where(*${H}:not(img):not(video):not(svg):not(svg *):not(picture):not(iframe):not(canvas)){background-color:#fff!important;background-image:none!important;color:#000!important;-webkit-text-fill-color:#000!important;border-color:#333!important;text-shadow:none!important;box-shadow:none!important;mix-blend-mode:normal!important}
html.cb-a11y-lightContrast body a${H}, html.cb-a11y-lightContrast body a${H} *{color:#0000cc!important;-webkit-text-fill-color:#0000cc!important;text-decoration:underline!important}
html.cb-a11y-lightContrast body a:visited${H}, html.cb-a11y-lightContrast body a:visited${H} *{color:#5b21b6!important;-webkit-text-fill-color:#5b21b6!important}
html.cb-a11y-darkContrast body, html.cb-a11y-darkContrast body :where(*${H}:not(img):not(video):not(svg):not(svg *):not(picture):not(iframe):not(canvas)){background-color:#0d0d0d!important;background-image:none!important;color:#fff!important;-webkit-text-fill-color:#fff!important;border-color:#8a8a8a!important;text-shadow:none!important;box-shadow:none!important;mix-blend-mode:normal!important}
html.cb-a11y-darkContrast body a${H}, html.cb-a11y-darkContrast body a${H} *{color:#ffe600!important;-webkit-text-fill-color:#ffe600!important;text-decoration:underline!important}
html.cb-a11y-darkContrast body a:visited${H}, html.cb-a11y-darkContrast body a:visited${H} *{color:#ffd54f!important;-webkit-text-fill-color:#ffd54f!important}
html.cb-a11y-lightContrast ::selection, html.cb-a11y-darkContrast ::selection{background:#ffe600!important;color:#000!important;-webkit-text-fill-color:#000!important}
/* Forced colours erase borderless buttons/fields into plain text; draw an inset ring so controls stay controls */
html.cb-a11y-lightContrast body :is(button,[role="button"],input:not([type="hidden"]),select,textarea)${H},
html.cb-a11y-darkContrast body :is(button,[role="button"],input:not([type="hidden"]),select,textarea)${H}{box-shadow:inset 0 0 0 2px currentColor!important}
html.cb-a11y-lightContrast body :is(input,textarea,select)${H}{background-color:#fff!important;color:#000!important;-webkit-text-fill-color:#000!important;caret-color:#000!important}
html.cb-a11y-darkContrast body :is(input,textarea,select)${H}{background-color:#0d0d0d!important;color:#fff!important;-webkit-text-fill-color:#fff!important;caret-color:#fff!important}
html.cb-a11y-lightContrast body ::placeholder{color:#444!important;opacity:1!important;-webkit-text-fill-color:#444!important}
html.cb-a11y-darkContrast body ::placeholder{color:#bbb!important;opacity:1!important;-webkit-text-fill-color:#bbb!important}
html.cb-a11y-lightContrast body :is(img,video,picture)${H},
html.cb-a11y-darkContrast body :is(img,video,picture)${H},
html.cb-a11y-highContrast body :is(img,video,picture)${H}{outline:2px solid currentColor!important;outline-offset:2px!important}
html.cb-a11y-lightContrast body :is([disabled],:disabled)${H}{opacity:.7!important;color:#222!important}

/* Filter fallback when backdrop-filter is unsupported: applied below <html> so fixed
   elements keep their viewport containing block for the common body>* case */
html.cb-a11y-nobf.cb-a11y-monochrome body>*${H}{filter:grayscale(1)!important}
html.cb-a11y-nobf.cb-a11y-lowSaturation body>*${H}{filter:saturate(.5)!important}
html.cb-a11y-nobf.cb-a11y-highSaturation body>*${H}{filter:saturate(2)!important}
html.cb-a11y-nobf.cb-a11y-highContrast body>*${H}{filter:contrast(1.7)!important}
`
}
