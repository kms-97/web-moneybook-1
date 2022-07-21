export function getMockHistory(month) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [];

      for (let i = 0; i < 10; i++) {
        data.push({
          id: i + 1,
          content: '목업 데이터',
          date: `2022-${(month + '').padStart(2, 0)}-${(
            Math.floor(Math.random() * 30) +
            1 +
            ''
          ).padStart(2, 0)}`,
          categoryId: Math.floor(Math.random() * 5) + 1,
          paymentId: Math.floor(Math.random() + 1),
          amount: 30000,
          isIncome: Boolean(Math.floor(Math.random() + 0.5)),
        });
      }
      console.log(data);
      resolve(data);
    }, 0);
  });
}
