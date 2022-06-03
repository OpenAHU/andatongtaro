import dayjs from "dayjs";

const weekdayattop = (startDate) => {
  // 计算当前周数
  // 开学那周周一的日期
  const monday = dayjs(startDate).day(1).format("YYYY-MM-DD");

  // 从startDate开始，计算18周每周每一天的日期
  const semester = [];
  for (let i = 0; i < 18; i++) {
    const week = [{ month: "", day: "" }];
    for (let j = 0; j < 7; j++) {
      week.push({
        month: dayjs(monday).add(i * 7 + j, "day").format("MM"),
        day: dayjs(monday).add(i * 7 + j, "day").format("DD"),
      })
    }
    semester.push(week);
  }
  return semester;
}

export default weekdayattop;
