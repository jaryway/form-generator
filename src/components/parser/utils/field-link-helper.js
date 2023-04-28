import getIn from 'lodash/get'
/**
 * 关联查询
 * 在一张表单的下拉框/下拉复选框中，调用其他表单中某个字段录入的所有数据作为选项
 * 当表单字段值发生变化时，获取数据过滤条件，并触发查询请求
 */

/**
 *
 * linkList // 关联的表的字段
 * linkedShowField // 要显示在当前表单的字段
 * // 过滤条件
 * filterCond:[{
 *      condition,
 *      value,// 关联的表的字段
 *      value2 // 当前表的字段或自定义的值
 * }]
 *
 * 注：
 * 子表单中的关联查询，只能显示单行
 *
 * 发起查询的时机
 * 1、过滤条件字段输入失去焦点时
 * 2、关联查询初始化时（初始化时）
 * 3、以上两个条件满足其一，且所有过滤条件的值都不为空
 */

/**
 * 获取所有关联查询字段
 * @param {*} fields
 */
export function getLinkFields(fields) {
  const loop = (data) => {
    return (data || []).reduce((prev, cur) => {
      // 关联查询，并且关联了其他表单
      if (cur.typeId === 'QUERY_CHECK' && cur.config.dbTable) {
        return [...prev, cur]
      }
      if (cur.children) {
        return [...prev, ...loop(cur.children)]
      }
      return prev
    }, [])
  }

  return loop(fields)
}

export function getFieldLinksMap(linkFields) {
  return linkFields.reduce((prev, cur) => {
    const filteredList = (cur.filterCond || []).filter((m) => !m.typeDisabled)
    // const condFields = filteredList.map((m) => m.value2)
    const currentMap = filteredList.reduce((p, c) => {
      // 当前字段发生变化时，构建查询条件
      // 获取当前字段值
      // 获取其他的字段
      const prevList = prev[c.value2] || []
      const fieldList = cur.linkList.map((m) => m.vModel) // 关联表单的字段
      const formDesignerId = cur.config.dbTable // 关联的表单
      const filters = cur.filterCond // 关联的过滤条件
      const multi = cur.dataNum === 1 ? 0 : 1

      return { ...p, [c.value2]: [...prevList, { vModel: cur.vModel, filters, fieldList, formDesignerId, multi }] }
    }, {})

    return { ...prev, ...currentMap }
  }, {})
}

export function calcFieldLinks(fieldLinksMap, field, formData, parentScheme, index) {
  const key = parentScheme ? [parentScheme.vModel, field.vModel].join('.') : field.vModel
  const fieldLink = fieldLinksMap[key]

  if (!fieldLink) return

  const cond = fieldLink.map((link) => {
    return link.filters.map((m) => {
      let path = m.value2

      // 如果是深层对象并且是数组
      if (path.indexOf('.') && index !== undefined) {
        path = path.split('.').join(`[${index}]`)
      }

      const value = getIn(formData, path)
      return { condition: m.condition, fieldId: m.value, value: [value], typeId: m.typeId }
    })
  })

  return cond
}

export function calcFieldLinkConditions(field, formData, index) {
  // console.log('calcFieldLinkConditions', field, formData)
  const filter = field.filterCond.map((m) => {
    let path = m.value2.split('.')
    if (index !== undefined) {
      path = path.slice(0, -1).concat(index, path.slice(-1))
    }

    const value = getIn(formData, path)
    // console.log('calcFieldLinkConditions.getIn', formData, path, value)
    return { condition: m.condition, fieldId: m.value, value, typeId: m.typeId }
  })

  if (filter.length <= 0) return undefined

  const hasEmptyValue = filter.some((m) => [undefined, null, ''].includes(m.value))

  return hasEmptyValue ? undefined : filter.map((m) => ({ ...m, value: [m.value] }))
}
