export function getMockHistory(month) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [];

      for (let i = 0; i < Math.random() * 15; i++) {
        data.push({
          id: i + 1,
          content: '목업 데이터',
          date: `2022-${(month + '').padStart(2, 0)}-${(
            Math.floor(Math.random() * 30) +
            1 +
            ''
          ).padStart(2, 0)}`,
          categoryId: Math.floor(Math.random() * 5) + 1,
          paymentId: Math.floor(Math.random() + 1.5),
          amount: 30000,
          isIncome: Boolean(Math.floor(Math.random() + 0.5)),
        });
      }

      data.sort((a, b) => {
        if (a.date > b.date) return -1;
        else if (a.date < b.date) return 1;
        return 0;
      });

      const map = new Map();
      data.forEach((h) => {
        map.get(h.date) ?? map.set(h.date, []);
        map.get(h.date).push(h);
      });

      resolve(
        Array.from(map.entries()).map((v) => {
          return { date: v[0], datas: v[1] };
        }),
      );
    }, 0);
  });
}
