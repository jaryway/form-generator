const isMemberOrDeptField = (typeId) => ['MEMBER_RADIO', 'DEPT_RADIO', 'MEMBER_CHECK', 'DEPT_CHECK'].includes(typeId)
const calcCondition = (op, value, condValue) => {
  switch (op) {
    case 0: {
      // 包含任意一个: value 中 包含任意一个 condValue 中的值
      return condValue.some((m) => value.includes(m))
    }

    case 1: {
      // 同时包含
      return condValue.every((m) => value.includes(m))
    }
    case 2: {
      // 等于
      // eslint-disable-next-line eqeqeq
      return condValue == value
    }
    case 3: {
      // 不等于
      // eslint-disable-next-line eqeqeq
      return condValue != value
    }
    case 4: {
      // 大于
      return condValue > value
    }

    case 5: {
      // 大于等于
      return condValue >= value
    }

    case 6: {
      // 小于
      return condValue < value
    }
    case 7: {
      // 小于等于
      return condValue <= value
    }
    case 8: {
      // 选择范围
      return value >= condValue[0] && value <= condValue[1]
    }
    //  case 9:
    //   // 动态筛选
    //   return condValue.every((m) => value.includes(m));
    // }
    case 10: {
      // 等于任意一个
      return condValue.split(',').includes(value)
    }
    case 11: {
      // 不等于任意一个
      return !condValue.split(',').includes(value)
    }
    case 12: {
      // 包含
      return value.indexOf(condValue) >= 0
    }
    case 13: {
      // 不包含
      return value.indexOf(condValue) < 0
    }
    //  case 14:
    //   // 属于
    //  case 15:
    //   // 不属于

    case 16: {
      // 为空
      return value === '' || value === null || value === undefined
    }
    case 17: {
      // 不为空
      return value !== '' && value !== null && value !== undefined
    }
    default:
      return true
  }
}

/**
 * 显隐规则计算
 * 当字段发生变化时，检查它有哪些规则，这些规则影响哪些字段显示隐藏
 * 1、一个条件字段可以有多条规则，每条规则可以控制多个显示字段，比如:a=3时，显示字段[b,c]，但a=4时，显示字段[d]
 * 2、一个显示字段只能被一个条件规则控制，否则会存在冲突，比如：规则1不满足，规则2满足，此时是应该显示还是隐藏?
 * 3、可以将规则转成字典，提高后续查找效率 {[field.id]:[rule1,rule2]} ，rule 结构为{conditions,rel,effects}
 * 4、开始计算，如果当前字段存在显隐规则，依次计算规则结果
 * 5、返回结果:[{id,visible}]
 * 6、根据返回结果设置字段的显隐
 */

/**
 * 将显隐规则转成字典
 * @param {*} fieldDisplayRules
 * @returns \{fieldId:[{conditions,rel,effects:[]}]\}
 */
export function getFieldDisplayRulesMap(fieldDisplayRules) {
  // 当字段发生变化时，在什么条件下影响那些字段

  const fieldDisplayRulesMap = fieldDisplayRules.reduce((prev, cur) => {
    // 获取该规则的条件
    const conditions = cur.conditionsList.map((m) => {
      return {
        id: m.id,
        op: m.condition, // 操作符
        typeId: m.typeId,
        condValue: m.condValue
      }
    })

    return conditions.reduce((p, c) => {
      const prevRules = p[c.id] || []
      const curRule = {
        conditions, // 条件
        rel: cur.conditionsChoice === 1 ? 'and' : 'or', // 关系符
        effects: cur.displayFieldList // 影响的字段，即显示字段
      }

      return {
        ...p,
        [c.id]: [...prevRules, curRule]
      }
    }, prev)
  }, {})

  return fieldDisplayRulesMap
}

/**
 * 计算显隐规则
 * @param {Obejct} fieldDisplayRulesMap
 * @param {*} field
 * @param {*} fields
 * @returns \[\{id,visible\}\]
 */
export function calcFieldDisplayRules(fieldDisplayRulesMap, field, fields) {
  // 该字段存在显隐规则
  const rules = fieldDisplayRulesMap[field.vModel] || []

  // console.log('setValue.calcFieldDisplayRules', rules)

  const calcRule = (rule) => {
    // 满足所有条件
    if (rule.rel === 'and') {
      return rule.conditions.every((m) => {
        const item = fields.find((f) => f.vModel === m.id)
        let value = item.config.defaultValue

        // console.log('setValue.vvvvv', value, m.condValue)

        if (isMemberOrDeptField(m.typeId)) {
          // TODO: 将 value 和 condValue 从对象数组转成 id 数组
          value = (item.config.defaultValue || []).map((m) => m.id)
        }

        return calcCondition(m.op, value, m.condValue)
      })
    }
    // 满足任一条件
    return rule.conditions.some((m) => {
      const item = fields.find((f) => f.vModel === m.id)
      let value = item.config.defaultValue
      if (isMemberOrDeptField(m.typeId)) {
        // TODO: 将 value 和 condValue 从对象数组转成 id 数组
        value = (item.config.defaultValue || []).map((m) => m.id)
      }
      return calcCondition(m.op, value, m.condValue)
    })
  }

  return rules.reduce((prev, rule) => {
    const result = calcRule(rule)
    const current = rule.effects.map((e) => ({ id: e, visible: result }))
    return [...prev, ...current]
  }, [])
}
// export function getDisplayFieldList(fieldDisplayRules) {
//   return fieldDisplayRules.reduce((prev, cur) => {
//     return [...prev, ...cur.displayFieldList]
//   }, [])
// }

export function getVisibilityMap(fieldDisplayRules) {
  return fieldDisplayRules
    .reduce((prev, cur) => {
      return [...prev, ...cur.displayFieldList]
    }, [])
    .reduce((prev, cur) => {
      return { ...prev, [cur]: false }
    }, {})
}
