export function getMockHistory() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [];

      for (let i = 0; i < Math.random() * 15; i++) {
        data.push({
          id: i + 1,
          content: '목업 데이터',
          date: Math.floor(Math.random() * 30) + 1,
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
    }, 1000);
  });
}

export function getMockPayment() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve([
      {id: 1, content:'국민카드'},
      {id: 2, content:'신한카드'}
    ]), 1000);
  })
}

export function getMockCategory() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve([
      {
        id: 1,
        content: '월급',
        isIncome: true,
      },
      {
        id: 2,
        content: '용돈',
        isIncome: true,
      },
      {
        id: 3,
        content: '식비',
        isIncome: false,
      },
      {
        id: 4,
        content: '생활',
        isIncome: false,
      },
      {
        id: 5,
        content: '교통',
        isIncome: false,
      },
      {
        id: 6,
        content: '여가',
        isIncome: false,
      },
    ]), 1000);
  })
}