import HTMLReactParser from 'html-react-parser'
import parse, { domToReact } from 'html-react-parser'
import { forEach } from 'lodash'
import React from 'react'

/**
 * Email Content 目前遇到有三種狀況
 * 1. plain text 1232787
 * 2. html 1237652
 *      判斷式: (!data.match(htmlRegex)
 * 3. plain text 但內含無效的html tag ex: <ryan119@sylksoft.com>  1237701
 *      判斷式: isValidHTMLTagWithEmail
 * 4. plain text 裡面有<Deliver> 這種被<> 包在一起的tag ，只能額外處理了! 另外加上包含<html>的判斷。
 *       判斷式: !data.toLowerCase().match(/<html[^>]*>/g)
 *
 * 這會遇到在parse content 時造成的錯誤。棄用html-react-parse, 因為無法解決第3點，parse時不會錯誤，但react 在render 時錯誤的jsx component。
 * @param data
 * @returns {JSX.Element}
 */
function parserContent(data) {
  const htmlRegex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
  //處理plain text 和 plain text裡帶有email 無效的html tag，\n 無法斷行.
  if (!data.match(htmlRegex) || isValidHTMLTagWithEmail(data) || !data.toLowerCase().match(/<html[^>]*>/g)) {
    data = data.replace(/\n/g, '<br>')
  }

  return <div dangerouslySetInnerHTML={{__html: data}}></div>

  /* 0601 不套入lib
  try {
    return parse(tData, {
      trim: false,
      replace: (domNode) => {
        if (domNode.name === 'head') {
          return <head></head>
        }

        if (domNode.name === 'body' || domNode.name === 'table') {
          forEach(domNode.children, (d) => {
            if (d.attribs) {
              d.attribs['style'] = ''
            }
          })
          return <body>{domToReact(domNode.children)}</body>
        }
      }
    })
  } catch (error) {
    console.log('error: ', error)
    return <div>{HTMLReactParser(tData)}</div>
  }*/
}


export { parserContent }

function isValidHTMLTag(tag) {
  const regex = /^<\/?([a-z][a-z0-9]*)\b[^>]*>$/i;
  return regex.test(tag);
}

function containsSpecialCharacters(str) {
  const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,./?]/
  return regex.test(str)
}

function isValidHTMLTagWithEmail(tag) {
  const regex = /<([^<>]+)>/;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

  const matches = tag.match(regex);
  if (matches) {
    const content = matches[1];
    return emailRegex.test(content);
  }
  return false;
}