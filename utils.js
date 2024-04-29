const _ = require('lodash');

module.exports.findSmallestAndAverageOfRest = function (numbers, jingdu = 4) {
  if (!Array.isArray(numbers) || numbers.length <= 1) {
    // 如果数组不存在或者长度不足以进行比较，返回null
    return null;
  }

  // 排序数组并找到最小的数
  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const smallestNumber = sortedNumbers.shift(); // 移除并获取数组中的最小数

  // 计算剩余数字的平均值
  const sumOfRest = sortedNumbers.reduce((acc, val) => acc + val, 0);
  const averageOfRest = sumOfRest / sortedNumbers.length;

  // 返回结果
  return { min: smallestNumber, avg: _.round(averageOfRest, jingdu) };
}