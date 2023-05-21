const utils = {};

const formatPercent = (n) => {
  return (n * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = formatPercent(count / max);
  process.stdout.write(`${count}/${max}(${percent})`);
};

utils.groupBy = (objArr, key) => {
  let groups = {};
  for (const obj of objArr) {
    const val = obj[key];
    if (!groups[val]) {
      groups[val] = [];
    }
    groups[val].push(obj);
    // console.log();
  }
  return groups;
};

export default utils;  
