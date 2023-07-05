import { filter, find } from 'lodash'

export function getActions(tree, current) {

  let currentItem
  const findListActions = tree => {
    find(tree, m => {

      if (m.url === current) {
        //console.log('m', m)
        currentItem = m
      } else if (m?.children?.length > 0) {
        const target = findListActions(m.children)
        if (target) {
          currentItem = target
        }
      }
    })
  }

  findListActions(tree)

  /*let subItems = []
  if (currentItem?.children.length > 0) {
    return filter(currentItem.children, item => item.isListAction === true)
  }*/
  return currentItem
}

