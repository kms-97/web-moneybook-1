function getStartAndEndDateString({ year, month }) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  return {
    startDate: `${year}-${month}-${start.getDate()}`,
    endDate: `${year}-${month}-${end.getDate()}`,
  };
}

module.exports = {
  getStartAndEndDateString,
};
