import Component from '../../../core/Component';
import { getFormattedAmount } from '../../../utils/amount';
import { categoryClassName } from '../../../utils/constant';

export class CategoryCost extends Component {
  constructor($parent, props) {
    super($parent, 'section', { class: 'category-cost' }, props);
  }

  getTotalCost() {
    return this.props.reduce((total, { sum }) => total + sum, 0);
  }

  getTableRow(totalCost) {
    return this.props
      .map(({ id, content, sum }) => {
        const className = categoryClassName[id];

        return `
        <tr data-categoryid='${id}' data-categoryname='${content}'>
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

    this.$self.innerHTML = `
        <div class='header'>
            이번 달 지출 금액 ${getFormattedAmount(totalCost)}
        </div>
        <table>
            ${this.getTableRow(totalCost)}
        </table>
    `;
  }
}
