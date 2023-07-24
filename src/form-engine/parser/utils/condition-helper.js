import { EQ, NE, ALL, NIN, LK, ULK, EP, NEP, GT, GTE, LT, LTE, RG, IN_MANY, IN_ONE, ALL_ADDR, NIN_ADDR } from '../constants'

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
    case ALL_ADDR:
      return '属于'
    case NIN_ADDR:
      return '不属于'
    // case FM:
    //   return '动态筛选'
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
    case ALL_ADDR:
    case NIN_ADDR:
      return ['PROVINCE_CITY', 'INPUT_MAP']

    case EP:
    case NEP:
    default:
      return []

    // case FM:
    //   return '动态筛选'
  }
}

export const getOperators = (typeId) => {
  switch (typeId) {
    case 'text':
    case 'radiogroup':
    case 'combo':
      return [EQ, NE, IN_MANY, IN_ONE, NIN, LK, ULK, EP, NEP]
    case 'number':
      return [EQ, NE, GT, GTE, LT, LTE, EP, NEP, RG]
    case 'textarea':
      return [LK, ULK, EP, NEP]
    case 'datetime':
      return [EQ, NE, GTE, LTE, RG, EP, NEP]
    case 'checkboxgroup':
    case 'combocheck':
    case 'usergroup':
    case 'deptgroup':
      return [IN_MANY, IN_ONE, ALL, EQ, EP, NEP]
    case 'user':
    case 'dept':
    case 'account_pool':
    case 'leads_pool':
    case 'sale_stage':
      return [EQ, NE, IN_MANY, IN_ONE, NIN, EP, NEP]
    case 'upload':
    case 'image':
    case 'signature':
      return [EP, NEP]
    case 'phone':
      return [LK, EP, NEP]
    case 'location':
    case 'address':
      return [ALL, NIN, EP, NEP]
    default:
      return []
  }
}

export const calcCondition = (op, lhs, rhs) => {
  switch (op) {
    case EQ:
      return lhs === rhs
    case NE:
      return lhs !== rhs
    case ALL:
      return rhs.every((m) => lhs.includes(m))
    case NIN: // '不等于任意一个'
      return lhs.every((m) => !rhs.includes(m))
    case LK: // '字符串包含'
      return lhs.includes(rhs)
    case ULK: // '不包含'
      return !lhs.includes(rhs)
    case EP: // '为空'
      return [undefined, null, ''].includes(rhs)
    case NEP: // '不为空'
      return ![undefined, null, ''].includes(rhs)
    case GT:
      return lhs > rhs
    case GTE: // '大于等于'
      return lhs >= rhs
    case LT: // '小于'
      return lhs < rhs
    case LTE: // '小于等于'
      return lhs < rhs
    case RG: // '选择范围'
      return lhs >= rhs[0] && lhs <= rhs[1]
    case IN_MANY: // '包含任意一个' 数组
      return lhs.length > 0 && lhs.some((m) => rhs.includes(m))
    case IN_ONE: // '等于任意一个' lhs string rhs=string[]
      return rhs.length > 0 && rhs.includes(lhs)
    case ALL_ADDR: // 不属于(地址/定位)
      return true
    case NIN_ADDR:
      return true
    default:
      return true
    // case FM:
    //   return '动态筛选'
  }
}
