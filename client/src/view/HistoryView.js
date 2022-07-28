import { CreatePaymentModal } from '../component/CreatePaymentModal/CreatePaymentModal';
import { DeletePaymentModal } from '../component/DeletePaymentModal/DeletePaymentModal';
import { Header } from '../component/Header/Header';
import { History } from '../component/History/History';
import { InputForm } from '../component/InputForm/InputForm';

export class HistoryView {
  constructor($target) {
    this.$target = $target;

    new Header(this.$target);
    new InputForm(this.$target);
    new History(this.$target);
    new CreatePaymentModal(this.$target);
    new DeletePaymentModal(this.$target);
  }

  init() {}

  render() {}
}
