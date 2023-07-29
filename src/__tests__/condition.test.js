import { describe, expect, test } from '@jest/globals'
import { isBetween, calcCondition, constants } from '../form-engine/parser/utils/condition/index'
import dayjs from 'dayjs'
import { cond } from 'lodash'

describe('isBetween', () => {
  test('当前1天-今天', () => {
    expect(isBetween(dayjs(), 'current', 1, 'day')).toBe(true)
  })
  test('当前1周', () => {
    expect(isBetween(dayjs(), 'current', 1, 'week')).toBe(true)
  })
  test('当前1月', () => {
    expect(isBetween(dayjs(), 'current', 1, 'month')).toBe(true)
  })
  test('当前1季', () => {
    expect(isBetween(dayjs(), 'current', 1, 'quarter')).toBe(true)
  })
  test('当前1年', () => {
    expect(isBetween(dayjs(), 'current', 1, 'year')).toBe(true)
  })

  test('本周', () => {
    expect(isBetween(dayjs(), 'current', 1, 'week')).toBe(true)
  })

  test('上一周', () => {
    expect(isBetween(dayjs().add(-1, 'week'), 'past', 1, 'week')).toBe(true)
  })

  test('下一周', () => {
    expect(isBetween(dayjs().add(1, 'week'), 'future', 1, 'week')).toBe(true)
  })

  test('本月', () => {
    expect(isBetween(dayjs(), 'current', 1, 'month')).toBe(true)
  })

  test('上一月', () => {
    expect(isBetween(dayjs().add(-1, 'month'), 'past', 1, 'month')).toBe(true)
  })

  test('下一月', () => {
    expect(isBetween(dayjs().add(1, 'month'), 'future', 1, 'month')).toBe(true)
  })

  test('本季度', () => {
    expect(isBetween(dayjs(), 'current', 1, 'quarter')).toBe(true)
  })

  test('上一季度', () => {
    expect(isBetween(dayjs().add(-3, 'month'), 'past', 1, 'quarter')).toBe(true)
  })

  test('下一季度', () => {
    expect(isBetween(dayjs().add(3, 'month'), 'future', 1, 'quarter')).toBe(true)
  })

  test('本年度', () => {
    expect(isBetween(dayjs(), 'current', 1, 'year')).toBe(true)
  })

  test('上一年度', () => {
    expect(isBetween(dayjs().add(-1, 'year'), 'past', 1, 'year')).toBe(true)
  })

  test('下一年度', () => {
    expect(isBetween(dayjs().add(1, 'year'), 'future', 1, 'year')).toBe(true)
  })

  describe('过去、未来第n天、周、月、季、年', () => {
    test(`过去、未来第0-99天`, () => {
      new Array(100).fill(1).forEach((_, n) => {
        expect(isBetween(dayjs().add(-n, 'day'), 'past', n, 'day')).toBe(true)
        expect(isBetween(dayjs().add(n, 'day'), 'future', n, 'day')).toBe(true)
      })
    })

    test(`过去、未来第0-99周`, () => {
      new Array(100).fill(1).forEach((_, n) => {
        expect(isBetween(dayjs().add(-n, 'week'), 'past', n, 'week')).toBe(true)
        expect(isBetween(dayjs().add(n, 'week'), 'future', n, 'week')).toBe(true)
      })
    })

    test(`过去、未来第0-99月`, () => {
      new Array(100).fill(1).forEach((_, n) => {
        expect(isBetween(dayjs().add(-n, 'month'), 'past', n, 'month')).toBe(true)
        expect(isBetween(dayjs().add(n, 'month'), 'future', n, 'month')).toBe(true)
      })
    })

    test(`过去、未来第0-99季`, () => {
      new Array(100).fill(1).forEach((_, n) => {
        expect(isBetween(dayjs().add(-n, 'month'), 'past', n, 'month')).toBe(true)
        expect(isBetween(dayjs().add(n, 'month'), 'future', n, 'month')).toBe(true)
      })
    })

    test(`过去、未来第0-99年`, () => {
      new Array(100).fill(1).forEach((_, n) => {
        expect(isBetween(dayjs().add(-n, 'year'), 'past', n, 'year')).toBe(true)
        expect(isBetween(dayjs().add(n, 'year'), 'future', n, 'year')).toBe(true)
      })
    })
  })
})

describe('calcCondition', () => {
  describe('constants.EQ，等于，两边都为数组', () => {
    const trueArray = [
      [
        [1, 2, 3, 4],
        [3, 4, 2, 1],
      ],
      [
        ['1', '2', '3', '4'],
        ['3', '4', '2', '1'],
      ],
    ]

    const falsyArray = [
      [
        [1, 2, 3, 4],
        [3, 4, 2, 9],
      ],
      [
        ['1', '2', '3', '4'],
        ['3', '4', '2'],
      ],
    ]

    trueArray.forEach(([act, exp]) => {
      test(`两边都为数组,要求长度一样,元素位置可以不一样 ${JSON.stringify(exp)}=${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.EQ, act, exp)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp]) => {
      test(`两边都为数组,要求类型、长度一样,元素位置可以不一样 ${JSON.stringify(exp)}=${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.EQ, act, exp)).toBe(false)
      })
    })
  })

  describe('constants.EQ，等于，左边为数组，右边为非数组，lhs[0]===rhs', () => {
    const trueArray = [
      [[1, 2, 3, 4], 1],
      [['1', '2', '3', '4'], '1'],
      [['a', 'b', 'c', 'd'], 'a'],
    ]

    const falsyArray = [
      [[1, 2, 3, 4], '1'],
      [['1', '2', '3', '4'], 1],
      [['a', 'b', 'c', 'd'], 'b'],
    ]

    trueArray.forEach(([act, exp]) => {
      test(`左边为数组，右边为非数组，lhs[0]===rhs ${JSON.stringify(act)}==${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.EQ, act, exp)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp]) => {
      test(`左边为数组，右边为非数组，lhs[0]===rhs ${JSON.stringify(act)}==${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.EQ, act, exp)).toBe(false)
      })
    })
  })

  describe('constants.EQ，等于，左边为非数组，右边为数组，lhs===rhs[0]', () => {
    const trueArray = [
      [[1, 2, 3, 4], 1],
      [['1', '2', '3', '4'], '1'],
      [['a', 'b', 'c', 'd'], 'a'],
    ].map((m) => m.reverse())

    const falsyArray = [
      [[1, 2, 3, 4], '1'],
      [['1', '2', '3', '4'], 1],
      [['a', 'b', 'c', 'd'], 'b'],
    ].map((m) => m.reverse())

    trueArray.forEach(([act, exp]) => {
      test(`左边为非数组，右边为数组，lhs===rhs[0] ${JSON.stringify(act)}==${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.EQ, act, exp)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp]) => {
      test(`左边为非数组，右边为数组，lhs===rhs[0] ${JSON.stringify(act)}==${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.EQ, act, exp)).toBe(false)
      })
    })
  })

  describe('constants.EQ，等于，两边都为非数组，lhs===rhs', () => {
    const trueArray = [
      ['1', '1'],
      ['0', '0'],
      [1, 1],
      [0, 0],
      [true, true],
      [false, false],
      ['qqqqqqqqq', 'qqqqqqqqq'],
    ].map((m) => m.reverse())

    const falsyArray = [
      [1, '1'],
      ['1', 1],
      [0, '0'],
      ['0', 0],
      ['a', 'b'],
      ['true', true],
      ['false', false],
      [true, 'true'],
      [false, 'false'],
      ['abc', 'dfg'],
    ].map((m) => m.reverse())

    trueArray.forEach(([act, exp]) => {
      test(`左边为非数组，右边为数组，lhs===rhs[0] ${JSON.stringify(act)}==${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.EQ, act, exp)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp]) => {
      test(`左边为非数组，右边为数组，lhs===rhs[0] ${JSON.stringify(act)}==${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.EQ, act, exp)).toBe(false)
      })
    })
  })

  describe('constants.NE，不等于,两边都为数组', () => {
    const falsyArray = [
      [
        [1, 2, 3, 4],
        [3, 4, 2, 1],
      ],
      [
        ['1', '2', '3', '4'],
        ['3', '4', '2', '1'],
      ],
    ]

    const trueArray = [
      [
        [1, 2, 3, 4],
        [3, 4, 2, 9],
      ],
      [
        ['1', '2', '3', '4'],
        ['3', '4', '2'],
      ],
    ]

    trueArray.forEach(([act, exp]) => {
      test(`两边都为数组,要求长度一样,元素位置可以不一样 ${JSON.stringify(exp)}=${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.NE, act, exp)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp]) => {
      test(`两边都为数组,要求类型、长度一样,元素位置可以不一样 ${JSON.stringify(exp)}=${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.NE, act, exp)).toBe(false)
      })
    })
  })

  describe('constants.NE,不等于，左边为数组，右边为非数组，lhs[0]!==rhs', () => {
    const falsyArray = [
      [[1, 2, 3, 4], 1],
      [['1', '2', '3', '4'], '1'],
      [['a', 'b', 'c', 'd'], 'a'],
    ]

    const trueArray = [
      [[1, 2, 3, 4], '1'],
      [['1', '2', '3', '4'], 1],
      [['a', 'b', 'c', 'd'], 'b'],
    ]

    trueArray.forEach(([act, exp]) => {
      test(`左边为数组，右边为非数组，lhs[0]===rhs ${JSON.stringify(act)}==${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.NE, act, exp)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp]) => {
      test(`左边为数组，右边为非数组，lhs[0]===rhs ${JSON.stringify(act)}==${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.NE, act, exp)).toBe(false)
      })
    })
  })

  describe('constants.NE,不等于，左边为非数组，右边为数组，lhs!==rhs[0]', () => {
    const falsyArray = [
      [[1, 2, 3, 4], 1],
      [['1', '2', '3', '4'], '1'],
      [['a', 'b', 'c', 'd'], 'a'],
    ].map((m) => m.reverse())

    const trueArray = [
      [[1, 2, 3, 4], '1'],
      [['1', '2', '3', '4'], 1],
      [['a', 'b', 'c', 'd'], 'b'],
    ].map((m) => m.reverse())

    trueArray.forEach(([act, exp]) => {
      test(`左边为非数组，右边为数组，lhs===rhs[0] ${JSON.stringify(act)}==${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.NE, act, exp)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp]) => {
      test(`左边为非数组，右边为数组，lhs===rhs[0] ${JSON.stringify(act)}==${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.NE, act, exp)).toBe(false)
      })
    })
  })

  describe('constants.NE，不等于,两边都为非数组，lhs!==rhs', () => {
    const falsyArray = [
      ['1', '1'],
      ['0', '0'],
      [1, 1],
      [0, 0],
      [true, true],
      [false, false],
      ['qqqqqqqqq', 'qqqqqqqqq'],
    ].map((m) => m.reverse())

    const trueArray = [
      [1, '1'],
      ['1', 1],
      [0, '0'],
      ['0', 0],
      ['a', 'b'],
      ['true', true],
      ['false', false],
      [true, 'true'],
      [false, 'false'],
      ['abc', 'dfg'],
    ].map((m) => m.reverse())

    trueArray.forEach(([act, exp]) => {
      test(`左边为非数组，右边为数组，lhs!==rhs[0] ${JSON.stringify(act)}==${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.NE, act, exp)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp]) => {
      test(`左边为非数组，右边为数组，lhs!==rhs[0] ${JSON.stringify(act)}==${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.NE, act, exp)).toBe(false)
      })
    })
  })

  describe('constants.ALL,  同时包含,两边都为数组', function () {
    const trueArray = [
      [
        [1, 2, 3, 4, 5],
        [3, 4, 2, 1],
      ],
      [
        ['1', '2', '3', '4', '5'],
        ['3', '4', '2', '1'],
      ],
    ]

    const falsyArray = [
      [
        [1, 2, 3, 4],
        [3, 4, 2, 9],
      ],
      [
        ['1', '2', '3', '4'],
        ['3', '4', '2', '5'],
      ],
    ]

    trueArray.forEach(([act, exp]) => {
      test(`两边都要数组,左边必须全部包含右边-true ${JSON.stringify(act)}同时包含${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.ALL, act, exp)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp]) => {
      test(`两边都要数组,左边必须全部包含右边 ${JSON.stringify(act)}同时包含${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.ALL, act, exp)).toBe(false)
      })
    })
    ;[
      [1, 1], //
      [1, [1]],
      [[1], 1],
      ['abc', 'abc'],
    ].forEach(([act, exp]) => {
      test(`一边不为数组将返回false ${JSON.stringify(act)}同时包含${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.ALL, act, exp)).toBe(false)
      })
    })
  })

  describe('constants.EP,为空', function () {
    const trueArray = [undefined, null, '', [], {}]
    const falsyArray = [0, 1, true, false, 'abcd', { name: 'kkmk' }, [11111]]

    trueArray.forEach((act) => {
      test(`undefined null "" {} [] 都属于为空 ${JSON.stringify(act)},expect true`, () => {
        expect(calcCondition(constants.EP, act)).toBe(true)
      })
    })

    falsyArray.forEach((act) => {
      test(`undefined null "" {} [] 除外都不属于为空 ${JSON.stringify(act)},expect false`, () => {
        expect(calcCondition(constants.EP, act)).toBe(false)
      })
    })
  })

  describe('constants.NEP,不为空', function () {
    const falsyArray = [undefined, null, '', [], {}]
    const trueArray = [0, 1, true, false, 'abcd', { name: 'kkmk' }, [11111]]

    trueArray.forEach((act) => {
      test(`undefined null "" {} [] 都属于为空 ${JSON.stringify(act)},expect true`, () => {
        expect(calcCondition(constants.NEP, act)).toBe(true)
      })
    })

    falsyArray.forEach((act) => {
      test(`undefined null "" {} [] 除外都属于不为空 ${JSON.stringify(act)},expect false`, () => {
        expect(calcCondition(constants.NEP, act)).toBe(false)
      })
    })
  })

  describe('constants.FM,动态筛选', function () {
    const trueArray = [
      [dayjs(), 'today'],
      [dayjs().add(-1, 'day'), 'yesterday'],
      [dayjs().add(1, 'day'), 'tomorrow'],
      [dayjs(), 'custom', 'curent', 1, 'day'],
    ]
    const falsyArray = [0, 1, true, false, 'abcd', { name: 'kkmk' }, [11111]]

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`DATE 动态筛选 ${JSON.stringify(act)},expect true`, () => {
        expect(calcCondition(constants.FM, act, exp, ...rest)).toBe(true)
      })
    })

    // falsyArray.forEach((act) => {
    //   test(`undefined null "" {} [] 除外都属于不为空 ${JSON.stringify(act)},expect false`, () => {
    //     expect(calcCondition(constants.FM, act)).toBe(false)
    //   })
    // })
  })

  describe('constants.GT,大于', function () {
    const trueArray = [
      [1, 0], //
      [[1], 0],
      [1, [0]],
      [true, false],
      [[true], false],
      [true, [false]],
      [999, -999],
    ]
    const falsyArray = trueArray.map((m) => m.slice().reverse())

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`大于 ${JSON.stringify(act)}>${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.GT, act, exp, ...rest)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp, ...rest]) => {
      test(`大于-fasle ${JSON.stringify(act)}>${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.GT, act, exp, ...rest)).toBe(false)
      })
    })
  })

  describe('constants.GTE,大于等于', function () {
    const trueArray = [
      [1, 0], //
      [[1], 0],
      [1, [0]],
      [true, false],
      [[true], false],
      [true, [false]],
      [999, -999],
      [1, 1],
      [true, true],
    ]
    const falsyArray = [
      [1, 2],
      [888, 999],
    ]

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`大于等于 ${JSON.stringify(act)}>${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.GTE, act, exp, ...rest)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp, ...rest]) => {
      test(`大于等于 ${JSON.stringify(act)}>${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.GTE, act, exp, ...rest)).toBe(false)
      })
    })
  })

  describe('constants.LT,小于', function () {
    const trueArray = [
      [1, 0], //
      [[1], 0],
      [1, [0]],
      [true, false],
      [[true], false],
      [true, [false]],
      [999, -999],
    ].map((m) => m.slice().reverse())
    const falsyArray = trueArray.map((m) => m.slice().reverse())

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`小于 ${JSON.stringify(act)}>${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.LT, act, exp, ...rest)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp, ...rest]) => {
      test(`小于 ${JSON.stringify(act)}>${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.LT, act, exp, ...rest)).toBe(false)
      })
    })
  })

  describe('constants.LTE,小于等于', function () {
    const trueArray = [
      [1, 0], //
      [[1], 0],
      [1, [0]],
      [true, false],
      [[true], false],
      [true, [false]],
      [999, -999],
      [1, 1],
      [true, true],
    ].map((m) => m.slice().reverse())
    const falsyArray = [
      [222, 2],
      [1000, 999],
    ]

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`小于等于 ${JSON.stringify(act)}>${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.LTE, act, exp, ...rest)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp, ...rest]) => {
      test(`小于等于 ${JSON.stringify(act)}>${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.LTE, act, exp, ...rest)).toBe(false)
      })
    })
  })

  describe('constants.RG,范围', function () {
    const trueArray = [
      [1, [1, 3]], //
      [1, [1, 1]],
    ]
    const falsyArray = [[1, [2, 3]]]

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`范围 ${JSON.stringify(act)}在${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.RG, act, exp, ...rest)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp, ...rest]) => {
      test(`范围 ${JSON.stringify(act)}在${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.RG, act, exp, ...rest)).toBe(false)
      })
    })
  })

  describe('constants.IN_MANY,包含任意一个', function () {
    const trueArray = [
      [
        [1, 3, 4, 5, 6],
        [1, 3],
      ], //
      [[1], [1, 1]],
    ]
    const falsyArray = [
      [
        [5, 6, 7, 8],
        [2, 3],
      ],
    ]

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`包含任意一个 ${JSON.stringify(act)}包含任意一个${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.IN_MANY, act, exp, ...rest)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp, ...rest]) => {
      test(`包含任意一个 ${JSON.stringify(act)}包含任意一个${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.IN_MANY, act, exp, ...rest)).toBe(false)
      })
    })
  })

  describe('constants.IN_ONE,等于任意一个', function () {
    const trueArray = [
      [
        [1, 3, 4, 5, 6],
        [1, 3],
      ], //
      [[1], [1, 1999]],
      ['def', ['abc', 'def', 'dddd']],
    ]
    const falsyArray = [
      [
        [5, 6, 7, 8],
        [2, 3],
      ],
      ['abc', ['def', 'ghi']],
      ['abc', 'abc'],
    ]

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`等于任意一个 ${JSON.stringify(act)}等于任意一个${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.IN_ONE, act, exp, ...rest)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp, ...rest]) => {
      test(`等于任意一个 ${JSON.stringify(act)}等于任意一个${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.IN_ONE, act, exp, ...rest)).toBe(false)
      })
    })
  })

  describe('constants.NIN,不等于任意一个', function () {
    const trueArray = [
      [4, [1, 3]], //
      [[1], [100, 1999]],
      ['AAA', ['abc', 'def', 'dddd']],
    ]
    const falsyArray = [
      [2, [2, 3]],
      [[1], [1, 1999]],
      ['abc', ['abc', 'def', 'ghi']],
      ['abc', 'abc'],
    ]

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`不等于任意一个 ${JSON.stringify(act)}不等于任意一个${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.NIN, act, exp, ...rest)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp, ...rest]) => {
      test(`不等于任意一个 ${JSON.stringify(act)}不等于任意一个${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.NIN, act, exp, ...rest)).toBe(false)
      })
    })
  })

  describe('constants.LK,包含-string', function () {
    const trueArray = [
      ['bbbabcd', 'abcd'],
      ['11abcd111', 'abcd'],
    ]

    const falsyArray = [
      ['abcd', 'abcdefg'], //
      ['abcd', '1111abcdefg111'], //
      ['111', 'ddddddd111111'],
    ]

    trueArray.forEach(([act, exp, ...rest]) => {
      test(`包含 ${JSON.stringify(act)}包含${JSON.stringify(exp)},expect true`, () => {
        expect(calcCondition(constants.LK, act, exp, ...rest)).toBe(true)
      })
    })

    falsyArray.forEach(([act, exp, ...rest]) => {
      test(`包含 ${JSON.stringify(act)}包含${JSON.stringify(exp)},expect false`, () => {
        expect(calcCondition(constants.LK, act, exp, ...rest)).toBe(false)
      })
    })
  })
})

describe('constants.ULK,不包含-string', function () {
  const trueArray = [
    ['bbbabcd', 'abcdm'],
    ['11abcd111', 'abcd0'],
  ]

  const falsyArray = [
    ['mmmabcdmmm', 'abcd'], //
    ['我是', '我是'], //
    ['我是测试呀', '测试呀'],
  ]

  trueArray.forEach(([act, exp, ...rest]) => {
    test(`不包含 ${JSON.stringify(act)}不包含${JSON.stringify(exp)},expect true`, () => {
      expect(calcCondition(constants.ULK, act, exp, ...rest)).toBe(true)
    })
  })

  falsyArray.forEach(([act, exp, ...rest]) => {
    test(`不包含 ${JSON.stringify(act)}不包含${JSON.stringify(exp)},expect false`, () => {
      expect(calcCondition(constants.ULK, act, exp, ...rest)).toBe(false)
    })
  })
})
