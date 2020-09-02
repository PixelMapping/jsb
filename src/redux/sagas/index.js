import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import productSaga from "./productSaga";
import orderSaga from "./orderSaga";
import companySaga from "./companySaga"
import billSaga from "./billSaga"
import userSaga from "./userSaga"
import industrySaga from "./industrySaga"
/*添加对action的监听 */
export default function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(productSaga)]);
  yield all([fork(orderSaga)]);
  yield all([fork(companySaga)]);
  yield all([fork(billSaga)]);
  yield all([fork(userSaga)]);
  yield all([fork(industrySaga)]);
}
