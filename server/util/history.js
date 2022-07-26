function groupByDate(data) {
  const result = [];
  const group = new Map();

  data.forEach((d) => {
    if (group.has(d.date)) group.get(d.date).push({ ...d });
    else group.set(d.date, [{ ...d }]);
  });

  for (let key of Array.from(group.keys()).sort((a, b) => b - a)) {
    result.push({ date: key, data: group.get(key) });
  }

  return result;
}

module.exports = {
  groupByDate,
};
