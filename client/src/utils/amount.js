export const getFormattedAmount = (amount) => {
  const myAmount = String(amount);
  let formattedAmount = '';
  let p = (myAmount.length - 1) % 3;

  for (let i = 0; i < myAmount.length; i++) {
    formattedAmount += myAmount[i];

    if (p === i && i !== myAmount.length - 1) {
      formattedAmount += ',';
      p += 3;
    }
  }
  return formattedAmount;
};
