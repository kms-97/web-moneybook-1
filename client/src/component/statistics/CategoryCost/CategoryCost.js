import { getFormattedAmount } from '../../../utils/amount';
import { categoryClassName } from '../../../utils/constant';

export class CategoryCost {
  constructor($target, data) {
    this.$target = $target;
    this.$categoryCost = document.createElement('section');
    this.$categoryCost.className = 'category-cost';

    this.data = data;
    this.$target.appendChild(this.$categoryCost);
    this.render();
  }

  getTotalCost() {
    return this.data.reduce((total, { sum }) => total + sum, 0);
  }

  makeTableRow(totalCost) {
    return this.data
      .map(({ id, content, sum }) => {
        const className = categoryClassName[id];

        return `
        <tr>
          <td class='category'>
            <span class=${className}>
                ${content}
            </span>
          </td>
          <td class='percentage'>
            ${totalCost ? Math.round((sum / totalCost) * 100) : 0}%
          </td>
          <td class='amount'>
            ${getFormattedAmount(sum)}
          </td>
        </tr>    
      `;
      })
      .join('');
  }

  render() {
    const totalCost = this.getTotalCost();

    this.$categoryCost.innerHTML = `
        <div class='header'>
            이번 달 지출 금액 ${getFormattedAmount(totalCost)}
        </div>
        <table>
            ${this.makeTableRow(totalCost)}
        </table>
    `;
  }
}
