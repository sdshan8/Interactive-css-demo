/*
 *Implemented Based on this question on stack overflow
 *https://stackoverflow.com/questions/41884969/highlight-syntax-in-contenteditable
 */
 import { tokenize } from 'https://unpkg.com/@csstools/tokenizer?module'

const token_type = [
  "none",
  "symbol",
  "comment",
  "space",
  "word",
  "function",
  "atword",
  "hash",
  "string",
  "number",
  // Extra
  "bracket",
  "curly",
  "square",
  "variable",
  "property"
]

// const hl = {
//   brakets: /(\(|\))/g,
//   curly: /(\{|\})/g,
//   comment: /(\/\*[^*]*\*+([^\/*][^*]*\*+)*\/)/g,
//   hex_color: /(#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b)/g,
//   variable: /((--)[^\,\:\)]+)/g,
//   operators: /((\;|\:))/g
// }
const highLite = (el) => {
  const cssText = el.innerHTML
  let i = 1
  let output = "";
  let tokens =[]
  for (const token of tokenize(cssText)) {
    tokens.push(token)
  }
  for (const token of tokens) {
    // if(i < tokens.length) {
    //   console.log(token, tokens[i].data)
    // }
    if(token.type == 5) {
      output+=`<span class='hl_${token_type[token.type]}'>${token.lead}${token.data}</span><span class='hl_${token_type[10]}'>${token.tail}</span>`
    } else if (token.type == 1 && (token.code == 40 || token.code == 41)) {
      output += `<span class='hl_${token_type[10]}'>${token.data}</span>`
    } else if (token.type == 1 && (token.code == 91 || token.code == 93)) {
      output += `<span class='hl_${token_type[12]}'>${token.data}</span>`
    } else if (token.type == 1 && (token.code == 123 || token.code == 125))  {
      output += `<span class='hl_${token_type[11]}'>${token.data}</span>`
    } else if (token.type == 4 && token.data.startsWith("--"))  {
      output += `<span class='hl_${token_type[13]}'>${token.lead}${token.data}${token.tail}</span>`
    } else if (token.type == 4 && tokens[i].data == ":" && tokens[i+1].data == " ")  {
      output += `<span class='hl_${token_type[14]}'>${token.lead}${token.data}${token.tail}</span>`
    } else if (token.type == 6)  {
      output+=`<span class='hl_${token_type[1]}'>${token.lead}</span><span class='hl_${token_type[token.type]}'>${token.data}${token.tail}</span>`
    } else {
      output += `<span class='hl_${token_type[token.type]}'>${token.lead}${token.data}${token.tail}</span>`
    }
    i++
  }


  // el.previousElementSibling.innerHTML = el.innerHTML
  //    .replace(hl.comment, "<span class='hl_comment'>$1</span>")
  //    .replace(hl.hex_color, "<span class='hl_color'>$1</span>")
  //    .replace(hl.variable, "<span class='hl_var'>$1</span>")
  //    .replace(hl.operators, "<span class='hl_operators'>$1</span>")
  //    .replace(hl.brakets, "<span class='hl_bracket'>$1</span>")
  //    .replace(hl.curly, "<span class='hl_curly'>$1</span>")
  el.previousElementSibling.innerHTML = output
};

document.querySelectorAll("[contenteditable]").forEach(el => {
  el.addEventListener("input", () => highLite(el));
  highLite(el);
});