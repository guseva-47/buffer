import moment from "moment";
import "dotenv/config";

class RecordsService {
  // library содержит все записи и должен быть отсортирован по дате от старых к новым.
  // Это легко соблюдать, т.к. операции с массивом не асинхронные, поток один.
  //   Значит время прихода запроса и время записи синхронны.
  library = [];
  periodDuration = JSON.parse(process.env.PERIOD) || { minutes: 1 };

  setRecords(record) {
    this.library.push({ record: record, startTime: new Date() });
    return record;
  }

  getRecords(count) {
    this._deleteObsolete();

    const res = this.library.splice(0, count).map((data) => data.record);
    return res;
  }

  _deleteObsolete() {
    const isActual = (date) =>
      moment(date).add(this.periodDuration).isSameOrAfter();

    const count = this.library.findIndex((data) => isActual(data.startTime));

    this.library.splice(0, count);
  }
}

export default new RecordsService();
