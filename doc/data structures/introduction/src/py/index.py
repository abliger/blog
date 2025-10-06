def maxsubSequenceSum1(arr: list) -> int:
    max = 0
    for i in range(len(arr)):
        for j in range(i, len(arr)):
            cmax = 0
            for k in range(i, j):
                cmax += arr[k]
            if max < cmax:
                max = cmax
    return max


def maxsubSequenceSum2(arr: list) -> int:
    max = 0
    for i in range(len(arr)):
        cmax = 0
        for j in range(i, len(arr)):
            cmax += arr[j]
            if max < cmax:
                max = cmax
    return max

def maxsubSequenceSum3(arr: list, start: int, end: int) -> int:
    if start == end:
        if arr[start] > 0:
            return arr[start]
        else:
            return 0
    rmax, lmax, center = 0, 0, int((start + end)/2)
    rmax = maxsubSequenceSum3(arr, start, center)
    lmax = maxsubSequenceSum3(arr, center+1, end)
    rcmax, rmmax = 0, 0
    for i in range(center, start - 1, -1):
        rcmax += arr[i]
        if rmmax < rcmax:
            rmmax = rcmax
    lcmax, lmmax = 0, 0
    for i in range(center + 1, end + 1,):
        lcmax += arr[i]
        if lmmax < lcmax:
            lmmax = lcmax
    return max(rmax, lmax, rmmax+lmmax)


def maxsubSequenceSum4(arr: list) -> int:
    max, cmax = 0, 0
    for i in arr:
        cmax += i
        if max < cmax:
            max = cmax
        elif cmax < 0:
            cmax = 0
    return max


if __name__ == "__main__":
    nums = {
        20: [-2, 11, -4, 13, -5, -2],
        11: [4, -3, 5, -2, -1, 2, 6, -2]
    }
    assert maxsubSequenceSum1(nums[20]) == 20
    assert maxsubSequenceSum2(nums[20]) == 20
    assert maxsubSequenceSum3(nums[20], 0, 5) == 20
    assert maxsubSequenceSum4(nums[20]) == 20
    assert maxsubSequenceSum1(nums[11]) == 11
    assert maxsubSequenceSum2(nums[11]) == 11
    assert maxsubSequenceSum3(nums[11], 0, 7) == 11
    assert maxsubSequenceSum4(nums[11]) == 11
