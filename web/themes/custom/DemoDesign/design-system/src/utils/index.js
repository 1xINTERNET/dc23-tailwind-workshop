import sanitizeHtml from 'sanitize-html'
import customElementsJson from '../../custom-elements.json'

const getCustomElements = () => {
  const { tags } = customElementsJson
  return tags.map((tag) => tag.name)
}

export const sanitizeHTML = (dirty) => sanitizeHtml(dirty, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'video',
    'iframe',
    'span',
    'svg',
    'path',
    'form',
    'input',
    'select',
    'textarea',
    'button',
    'a',
    'g'
  ], getCustomElements()),
  allowedAttributes: false
})
