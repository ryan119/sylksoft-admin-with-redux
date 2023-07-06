import { head, isEmpty } from 'lodash'

export const defaultPage = 0
export const defaultPageSize = 25

export const defCrit = {
  keyword: '',
  page: 0,
  sidx: ['createTime'],
  size: 25,
  sord: ['desc']
}

export function getSortBy(criteria) {
  return isEmpty(criteria.sidx) ? [] : [{ id: head(criteria?.sidx), desc: head(criteria?.sord) === 'desc' }]
}

export function updateCriteria(props, dispatch, action) {
  const { pageIndex, pageSize, sortBy } = props
  dispatch(action('sidx', sortBy.map(x => x.id)))
  dispatch(action('sord', sortBy.map(x => x.desc ? 'desc' : 'asc')))
  dispatch(action('page', pageIndex))
  dispatch(action('size', pageSize))
}
