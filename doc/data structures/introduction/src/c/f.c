#include "f.h"

int maxsubSequenceSum1(int arr[], int n)
{
  int maxNum = 0;
  for (int i = 0; i < n; i++)
  {
    for (int j = i; j < n; j++)
    {
      int currentNum = 0;
      for (int k = i; k <= j; k++)
      {
        currentNum += arr[k];
      }
      if (maxNum < currentNum)
      {
        maxNum = currentNum;
      }
    }
  }
  return maxNum;
}
int maxsubSequenceSum2(int arr[], int n)
{
  int maxNum = 0;
  for (int i = 0; i < n; i++)
  {
    int currentNum = 0;
    for (int j = i; j < n; j++)
    {
      currentNum += arr[j];
      if (maxNum < currentNum)
      {
        maxNum = currentNum;
      }
    }
  }
  return maxNum;
}
int Max3(int a, int b, int c)
{
  int max = (a > b ? a : b);
  return c > max ? c : max;
}
int maxsubSequenceSum3(int arr[], int start, int end)
{
  if (start == end)
  {
    if (arr[start] > 0)
    {
      return arr[start];
    }
    return 0;
  }
  int center = (start + end) / 2;
  int rmax = maxsubSequenceSum3(arr, start, center);
  int lmax = maxsubSequenceSum3(arr, center + 1, end);
  int rmmax = 0, rrmax = 0;
  for (int i = center; i >= start; i--)
  {
    rrmax += arr[i];
    if (rmmax < rrmax)
    {
      rmmax = rrmax;
    }
  }
  int lmmax = 0, lrmax = 0;
  for (int i = center + 1; i <= end; i++)
  {
    lrmax += arr[i];
    if (lmmax < lrmax)
    {
      lmmax = lrmax;
    }
  }
  return Max3(rmax, lmax, rmmax + lmmax);
}
int maxsubSequenceSum4(int arr[], int n)
{
  int maxNum = 0, currentNum = 0;
  for (int i = 0; i < n; i++)
  {
    currentNum += arr[i];
    if (maxNum < currentNum)
    {
      maxNum = currentNum;
    }
    else if (currentNum < 0)
    {
      currentNum = 0;
    }
  }
  return maxNum;
}
int main()
{
  int list1[6] = {-2, 11, -4, 13, -5, -2};
  int list2[8] = {4, -3, 5, -2, -1, 2, 6, 1};
  assert(12 == maxsubSequenceSum2(list2, 8));
  assert(12 == maxsubSequenceSum1(list2, 8));
  assert(12 == maxsubSequenceSum3(list2, 0, 7));
  assert(12 == maxsubSequenceSum4(list2, 8));
  assert(20 == maxsubSequenceSum1(list1, 6));
  assert(20 == maxsubSequenceSum2(list1, 6));
  assert(20 == maxsubSequenceSum3(list1, 0, 5));
  assert(20 == maxsubSequenceSum4(list1, 6));
  return 0;
}
