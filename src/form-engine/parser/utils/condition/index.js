import { EQ, NE, ALL, NIN, LK, ULK, EP, NEP, GT, GTE, LT, LTE, RG, IN_MANY, IN_ONE, ALL_ADDRESS, NIN_ADDRESS, FM } from './constants'
import dayjs from 'dayjs'

export const getLabel = (op) => {
  switch (op) {
    case EQ:
      return '等于'
    case NE:
      return '不等于'
    case ALL:
      return '同时包含'
    case NIN:
      return '不等于任意一个'
    case LK:
      return '包含'
    case ULK:
      return '不包含'
    case EP:
      return '为空'
    case NEP:
      return '不为空'
    case GT:
      return '大于'
    case GTE:
      return '大于等于'
    case LT:
      return '小于'
    case LTE:
      return '小于等于'
    case RG:
      return '选择范围'
    case IN_MANY:
      return '包含任意一个'
    case IN_ONE:
      return '等于任意一个'
    case ALL_ADDRESS:
      return '属于'
    case NIN_ADDRESS:
      return '不属于'
    case FM:
      return '动态筛选'
  }
}

export const getTypeIds = (op) => {
  switch (op) {
    case EQ:
      return ['INPUT', 'NUMBER_INPUT', 'DATE', 'RADIO', 'CHECKBOX', 'SELECT', 'SELECT-MULTIPLE', 'SERIALNUMBER_INPUT', 'MEMBER_RADIO', 'MEMBER_CHECK', 'DEPT_RADIO', 'DEPT_CHECK']
    case NE:
      return ['INPUT', 'NUMBER_INPUT', 'DATE', 'RADIO', 'SELECT', 'SERIALNUMBER_INPUT', 'MEMBER_RADIO', 'DEPT_RADIO']
    case ALL:
      return ['CHECKBOX', 'SELECT-MULTIPLE', 'MEMBER_CHECK', 'DEPT_CHECK']
    case NIN:
      return ['INPUT', 'RADIO', 'SELECT', 'SERIALNUMBER_INPUT', 'MEMBER_RADIO', 'DEPT_RADIO']
    case LK:
    case ULK:
      return ['INPUT', 'TEXTAREA', 'RADIO', 'SELECT', 'SERIALNUMBER_INPUT']

    case LT:
    case GT:
      return ['NUMBER_INPUT']
    case GTE:
    case LTE:
    case RG:
      return ['NUMBER_INPUT', 'DATE']
    case IN_MANY:
      return ['CHECKBOX', 'SELECT-MULTIPLE', 'MEMBER_CHECK', 'DEPT_CHECK']
    case IN_ONE:
      return ['INPUT', 'RADIO', 'SELECT', 'SERIALNUMBER_INPUT', 'MEMBER_RADIO', 'DEPT_RADIO']
    case ALL_ADDRESS:
    case NIN_ADDRESS:
      return ['PROVINCE_CITY', 'INPUT_MAP']

    // case EP:
    // case NEP:
    //   return [] // 包含全部
    default:
      return []

    case FM:
      return ['DATE']
  }
}

export const getOperators = (typeId) => {
  switch (typeId) {
    case 'INPUT':
    case 'RADIO':
    case 'SELECT':
      return [EQ, IN_ONE, LK, NE, NIN, ULK, EP, NEP]
    case 'NUMBER_INPUT':
      return [EQ, GT, GTE, LT, LTE, NE, RG, EP, NEP]
    case 'TEXTAREA':
      return [LK, ULK, EP, NEP]
    case 'DATE':
      return [EQ, NE, GTE, LTE, RG, FM, EP, NEP]
    case 'CHECKBOX':
    case 'SELECT-MULTIPLE':
    case 'MEMBER_CHECK':
    case 'DEPT_CHECK':
      return [IN_MANY, ALL, EQ, EP, NEP]
    case 'MEMBER_RADIO':
    case 'DEPT_RADIO':
      // case 'account_pool':
      // case 'leads_pool':
      // case 'sale_stage':
      return [EQ, NE, IN_ONE, NIN, EP, NEP]
    // case 'upload':
    // case 'image':
    // case 'signature':
    //   return [EP, NEP]
    // case 'phone':
    //   return [LK, EP, NEP]
    case 'INPUT_MAP':
    case 'PROVINCE_CITY':
      return [ALL_ADDRESS, NIN_ADDRESS, EP, NEP]
    default:
      return []
  }
}

const isEmpty = (o) => {
  if ([undefined, null, ''].includes(o)) return true
  if (typeof o === 'object') return Object.keys(o).length === 0
  return false
}

const isEqual = (lhs, rhs) => {
  if (Array.isArray(lhs)) {
    if (!Array.isArray(rhs)) {
      // 左边是数组，右边不是数组
      const l = lhs[0]
      return l === rhs
    }
    // 两边都是数组，长度要相等
    if (lhs.length !== rhs.length) return false
    // 去除重复，避免出现 ['a','a'].every(m=>['a','b'].includes(m))
    const l = lhs.filter((m, i) => lhs.findIndex((n) => n === m) === i)
    const r = rhs.filter((m, i) => rhs.findIndex((n) => n === m) === i)

    return l.every((m) => r.includes(m))
  }
  const r = Array.isArray(rhs) ? rhs[0] : rhs
  return lhs === r
}

export const isBetween = (date, mode, n, unit) => {
  // 当前、过去、未来 第 n 天、周、月、季、年
  const v = mode === 'past' ? -n : mode === 'future' ? n : 0

  if (unit === 'quarter') {
    // 季度计算
    const day = dayjs().add(v * 3, 'month') // 这个季度的日期
    const rest = dayjs(day).month() % 3 // 这个季度的第几月
    const head = -rest
    const tail = 2 - rest
    const start = dayjs(day).add(head, 'month').startOf('month') // 季度的第一个月
    const end = dayjs(day).add(tail, 'month').endOf('month') // 季度的最后一个月
    return (date.isAfter(start, 'month') || date.isSame(start, 'month')) && (date.isBefore(end, 'month') || date.isSame(end, 'month'))
  }

  const start = dayjs().add(v, unit).startOf(unit)
  const end = dayjs().add(v, unit).endOf(unit)
  return (date.isAfter(start, unit) || date.isSame(start, unit)) && (date.isBefore(end, unit) || date.isSame(end, unit))
}

export const calcCondition = (op, lhs, rhs, ...other) => {
  switch (op) {
    case EQ:
      return isEqual(lhs, rhs)
    case NE: // 可以是数组也可以不是数组，有一边不是数组，取数组一边的第一个进行比较
      return !isEqual(lhs, rhs)
    case ALL: {
      if (!Array.isArray(lhs) || !Array.isArray(rhs)) {
        console.warn('lhs 和 rhs 都应该是数组')
        return false
      }
      return rhs.every((m) => lhs.includes(m))
    }
    case NIN: {
      // 不等于任意一个
      // 左边是string，右边是数组
      if (!Array.isArray(rhs)) {
        console.warn('rhs 应该是数组')
        return false
      }
      const l = Array.isArray(lhs) ? lhs[0] : lhs
      return rhs.every((m) => m !== l)
    }
    case LK: {
      // 包含，左右都为字符串
      if (!lhs) return false
      const l = Array.isArray(lhs) ? lhs[0] : lhs
      const r = Array.isArray(rhs) ? rhs[0] : rhs
      return l.includes(r)
    }
    case ULK: {
      // 不包含，左右都为字符串
      if (!lhs) return false
      const v = Array.isArray(rhs) ? rhs[0] : rhs
      return !lhs.includes(v)
    }
    case EP: // 为空 undefined, null, '' , {}, []
      return isEmpty(lhs)
    case NEP: // 不为空
      return !isEmpty(lhs)
    case GT: {
      const l = Array.isArray(lhs) ? lhs[0] : lhs
      const r = Array.isArray(rhs) ? rhs[0] : rhs
      return l > r
    }
    case GTE: {
      // 大于等于
      const l = Array.isArray(lhs) ? lhs[0] : lhs
      const r = Array.isArray(rhs) ? rhs[0] : rhs
      return l >= r
    }
    case LT: {
      // 小于
      const l = Array.isArray(lhs) ? lhs[0] : lhs
      const r = Array.isArray(rhs) ? rhs[0] : rhs
      return l < r
    }
    case LTE: {
      // 小于等于
      const l = Array.isArray(lhs) ? lhs[0] : lhs
      const r = Array.isArray(rhs) ? rhs[0] : rhs
      return l <= r
    }
    case RG: {
      // 选择范围
      const l = Array.isArray(lhs) ? lhs[0] : lhs
      if (!Array.isArray(rhs) || rhs.length !== 2) {
        console.warn('rhs 应该是长度为2的数组')
        return false
      }

      return l >= rhs[0] && l <= rhs[1]
    }
    case IN_MANY: {
      // 包含任意一个
      // 两边都为数组
      if (!Array.isArray(lhs) || !Array.isArray(rhs)) {
        console.warn('lhs 和 rhs 都应该是数组')
        return false
      }

      return lhs.some((m) => rhs.includes(m))
    }
    case IN_ONE: {
      // 等于任意一个
      // 左边是字符串，右边是数组
      const actual = Array.isArray(lhs) ? lhs[0] : lhs
      if (!Array.isArray(rhs)) {
        console.warn('rhs expects an array, but not actually, will return false')
        return false
      }

      return rhs.includes(actual)
    }

    case FM: {
      // 日期动态筛选
      if (!dayjs(lhs).isValid(lhs)) {
        console.warn('不是一个有效的日期')
        return false
      }

      const l = dayjs(lhs)
      const f = 'YYYY-MM-DD'

      switch (rhs) {
        case 'today':
          return dayjs().format(f) === l.format(f)
        case 'yesterday':
          return dayjs().add(-1, 'day').format(f) === l.format(f)
        case 'tomorrow':
          return dayjs().add(1, 'day').format(f) === l.format(f)
        case 'thisWeek':
          return isBetween(l, 'current', 0, 'week')
        case 'lastWeek':
          return isBetween(l, 'past', 1, 'week')
        case 'nextWeek':
          return isBetween(l, 'future', 1, 'week')
        case 'thisMonth':
          return isBetween(l, 'current', 0, 'month')
        case 'lastMonth':
          return isBetween(l, 'past', 1, 'month')
        case 'nextMonth':
          return isBetween(l, 'future', 1, 'month')
        case 'thisQuarter':
          return isBetween(l, 'current', 0, 'quarter')
        case 'lastQuarter':
          return isBetween(l, 'past', 1, 'quarter')
        case 'nextQuarter':
          return isBetween(l, 'future', 1, 'quarter')
        case 'thisYear':
          return isBetween(l, 'current', 0, 'yaer')
        case 'lastYear': {
          return isBetween(l, 'past', 1, 'yaer')
        }
        case 'nextYear':
          return isBetween(l, 'future', 1, 'yaer')
        case 'custom': {
          // 当前、过去、未来 第 n 天、周、月、季、年
          const [mode, n, unit] = other
          return isBetween(l, mode, n, unit)
        }
      }

      return true
    }

    case ALL_ADDRESS: // 不属于(地址/定位)
      return true
    case NIN_ADDRESS:
      return true
    default:
      return true
    // case FM:

    //   return '动态筛选'
  }
}

export * as constants from './constants'
