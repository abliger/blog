import { assertEquals } from 'https://deno.land/std@0.109.0/testing/asserts.ts';

let nums = {
  20: [-2, 11, -4, 13, -5, -2],
  11: [4, -3, 5, -2, -1, 2, 6, -2]
}
let maxsubSequenceSum1 = (arr: Array<number>) => {
  let maxNum = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      let currentNum = 0;
      for (let k = i; k <= j; k++) {
        currentNum += arr[k]
      }
      if (maxNum < currentNum) {
        maxNum = currentNum
      }
    }
  }
  return maxNum
}
let maxsubSequenceSum2 = (arr: Array<number>) => {
  let maxNum = 0
  for (let i = 0; i < arr.length; i++) {
    let currentNum = 0;
    for (let j = i; j < arr.length; j++) {
      currentNum += arr[j]
      if (maxNum < currentNum) {
        maxNum = currentNum
      }
    }
  }
  return maxNum
}
let maxsubSequenceSum3 = (arr: Array<number>, start, end) => {
  if (start == end) {
    if (arr[start] > 0) {
      return arr[start]
    }
    return 0
  }
  let center = Number.parseInt((start + end) / 2 + '')
  let rmax = maxsubSequenceSum3(arr, start, center)
  let lmax = maxsubSequenceSum3(arr, center + 1, end)
  let rcmax = 0
  let rmmax = 0
  for (let i = center; i >= start; i--) {
    rcmax += arr[i]
    if (rcmax > rmmax) {
      rmmax = rcmax
    }
  }
  let lcmax = 0
  let lmmax = 0
  for (let i = center + 1; i <= end; i++) {
    lcmax += arr[i]
    if (lcmax > lmmax) {
      lmmax = lcmax
    }
  }
  return Math.max(rmax, lmax, rmmax + lmmax)
}
let maxsubSequenceSum4 = (arr: Array<number>) => {
  let currentNum = 0
  let maxNum = 0;
  for (let i = 0; i < arr.length; i++) {
    currentNum += arr[i]
    if (currentNum > maxNum) {
      maxNum = currentNum
    } else if (currentNum < 0) {
      currentNum = 0
    }
  }
  return maxNum
}
for (let key of Object.keys(nums)) {
  assertEquals(Number.parseInt(key), maxsubSequenceSum1(nums[key]))
  assertEquals(Number.parseInt(key), maxsubSequenceSum2(nums[key]))
  assertEquals(Number.parseInt(key), maxsubSequenceSum3(nums[key], 0, nums[key].length - 1))
  assertEquals(Number.parseInt(key), maxsubSequenceSum4(nums[key]))
}         
