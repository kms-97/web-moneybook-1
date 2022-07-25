export function parseDateString(str) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (dateFormat.test(str)) return null;

  const [year, month, date] = str.split('-');
  return { year: Number(year), month: Number(month), date: Number(date) };
}

export function makeDateString(year, month, date) {
  if (!year || !month || !date) return;
  return `${year}-${(month + '').padStart(2, 0)}-${(date + '').padStart(2, 0)}`;
}

export function getDay(year, month, date) {
  const day = {
    1: '월',
    2: '화',
    3: '수',
    4: '목',
    5: '금',
    6: '토',
    0: '일',
  };
  return day[new Date(year, month - 1, date).getDay()];
}
