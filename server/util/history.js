function groupByDate(data) {
  const result = [];
  const group = {};

  data.forEach((d) => {
    if (group.hasOwnProperty(d.date)) group[d.date].push({ ...d });
    else group[d.date] = [{ ...d }];
  });

  for (let key of Object.keys(group).sort((a, b) => b - a)) {
    result.push({ date: key, data: group[key] });
  }

  return result;
}

module.exports = {
  groupByDate,
};
