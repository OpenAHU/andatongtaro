import dayjs from "dayjs";

const weeknumber = (startDate) => {
  // 计算当前周数
  // 这周一的日期
  const monday = dayjs().day(1);
  startDate = dayjs(startDate).day(1);
  let week = 0;
  // 如果已经开学，则更新当前周数
  if (startDate.isBefore(monday)) {
    // dayjs.diff
    // https://day.js.org/docs/zh-CN/display/difference#docsNav
    week = monday.diff(dayjs(startDate), "week");
  }

  // dayjs 默认周日为一周开始，所以如果今天是周日需要做些修正
  if (dayjs().day() == 0) week -= 1;

  return week;
}

export default weeknumber;
