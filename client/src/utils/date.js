export function parseDateString(str) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (dateFormat.test(str)) return null;

  const [year, month, date] = str.split('-');
  return { year: Number(year), month: Number(month), date: Number(date) };
}

export function makeDateString(year, month, date) {
  if (!year || !month || !date) return;
  let dateString = `${year}-${(month + '').padStart(2, 0)}`;

  if (date) dateString += `-${(date + '').padStart(2, 0)}`;
  return dateString;
}

export function getTodayString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, 0);
  const day = today.getDate().toString().padStart(2, 0);

  return `${year}-${month}-${day}`;
}

export function getStartAndEndDate({ year, month }) {
  const startDate = new Date(year, month - 1, 1).getDate();
  const endDate = new Date(year, month, 0).getDate();

  return {
    startDate,
    endDate,
  };
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

export function getPreviousMonths(year, month, prev) {
  const prevMonths = [];
  for (let i = 0; i < prev; i++) {
    prevMonths.push({ year, month });

    month--;
    if (month === 0) {
      year--;
      month = 12;
    }
  }

  return prevMonths.reverse();
}
