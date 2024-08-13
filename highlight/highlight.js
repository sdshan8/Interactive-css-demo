/*
 *Implemented Based on this question on stack overflow
 *https://stackoverflow.com/questions/41884969/highlight-syntax-in-contenteditable
 */

const hl = {
  brakets: /(\(|\))/g,
  curly: /(\{|\})/g,
  comment: /(\/\*[^*]*\*+([^\/*][^*]*\*+)*\/)/g,
  hex_color: /(#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b)/g,
  variable: /((--)[^\,\:\)]+)/g,
  operators: /((\;|\:))/g
}
const highLite = (el) => {
  el.previousElementSibling.innerHTML = el.innerHTML
     .replace(hl.comment, "<span class='hl_comment'>$1</span>")
     .replace(hl.hex_color, "<span class='hl_color'>$1</span>")
     .replace(hl.variable, "<span class='hl_var'>$1</span>")
     .replace(hl.operators, "<span class='hl_operators'>$1</span>")
     .replace(hl.brakets, "<span class='hl_bracket'>$1</span>")
     .replace(hl.curly, "<span class='hl_curly'>$1</span>")
};

document.querySelectorAll("[contenteditable]").forEach(el => {
  el.addEventListener("input", () => highLite(el));
  highLite(el);
});