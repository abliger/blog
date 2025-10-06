let assert = require('assert')
let nums = {
  20: [-2, 11, -4, 13, -5, -2],
  11: [4, -3, 5, -2, -1, 2, 6, -2],
  12: [4, -3, 5, -2, -1, 2, 6, 1]
}

let maxsubSequenceSum1 = (array) => {
  let maxsubSum = 0
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      let currentMax = 0
      for (let k = i; k <= j; k++) {
        currentMax += array[k]
      }
      if (maxsubSum < currentMax) {
        maxsubSum = currentMax
      }
    }
  }
  return maxsubSum
}
let maxsubSequenceSum2 = (array) => {
  let maxsubSum = 0
  for (let i = 0; i < array.length; i++) {
    let currentMax = 0
    for (let j = i; j < array.length; j++) {
      currentMax += array[j]
      if (maxsubSum < currentMax) {
        maxsubSum = currentMax
      }
    }
  }
  return maxsubSum
}
let maxsubSequenceSum3 = (array, start, end) => {
  if (start == end) {
    if (array[start] > 0) {
      return array[start]
    } else {
      return 0
    }
  }
  let center = Number.parseInt((start + end) / 2 + '')
  let rMax = maxsubSequenceSum3(array, start, center)
  let lMax = maxsubSequenceSum3(array, center + 1, end)

  let rdMax = rdCurr = 0
  for (let i = center; i >= start; i--) {
    rdCurr += array[i]
    if (rdCurr > rdMax) {
      rdMax = rdCurr
    }
  }
  let ldMax = ldCurr = 0
  for (let i = center + 1; i <= end; i++) {
    ldCurr += array[i]
    if (ldCurr > ldMax) {
      ldMax = ldCurr
    }
  }
  return Math.max(rMax, lMax, rdMax + ldMax)
}
let maxsubSequenceSum4 = (array) => {
  let thisSum = maxSum = 0
  for (let i = 0; i < array.length; i++) {
    thisSum += array[i]
    if (thisSum < 0) {
      thisSum = 0
    } else if (thisSum > maxSum) {
      maxSum = thisSum
    }
  }
  return maxSum
}
for (let key of Object.keys(nums)) {
  assert.equal(key, maxsubSequenceSum1(nums[key]))
  assert.equal(key, maxsubSequenceSum2(nums[key]))
  assert.equal(key, maxsubSequenceSum3(nums[key], 0, nums[key].length - 1))
  assert.equal(key, maxsubSequenceSum4(nums[key]))
}


