function getStartAndEndDateString({ year, month }) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  return {
    startDate: `${year}-${month}-${start.getDate()}`,
    endDate: `${year}-${month}-${end.getDate()}`,
  };
}

function makeDateString({ year, month, date }) {
  if (!year || !month || !date) return;
  return `${year}-${(month + '').padStart(2, 0)}-${(date + '').padStart(2, 0)}`;
}

module.exports = {
  getStartAndEndDateString,
  makeDateString,
};
