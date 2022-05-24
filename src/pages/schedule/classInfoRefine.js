const classInfoRefine = (classInfo) => {
    const sameColorArray = {};
    return classInfo.map((item, index) => {
        item.startTime = String(Number(item.startTime) + 1);
        item.weekday = String(Number(item.weekday) + 1);
        item.endTime = Number(item.startTime) + Number(item.length);
        item.endTime = String(item.endTime)
        item.location = "@" + item.location;
        if (item.location.substring(1, 3) == "博学") {
            item.location = "@博" + item.location[3] + item.location.substring(5, item.location.length);
        } else if (item.location.substring(1, 2) == "笃") {
            item.location = item.location.substring(0, 7);
        } else if (item.location.substring(2, 5) == "体育场") {
            item.location = "@" + item.location[1] + "体";
        } else if (item.location.substring(1, 4) == "行知楼") {
            item.location = "@行知" + item.location.substring(4, 8);
        }
        // 去除location开头的@
        item.location = item.location.substring(1, item.location.length);
        // 根据开始周数和结束周数,在范围里的周数为1,否则为0
        item.showArray = new Array(19)
            .fill(0)
            .map((showItem, showIndex) => {
                if (showIndex >= item.startWeek && showIndex <= item.endWeek) {
                    return 1;
                }
                return 0;
            })
        // 根据singleDouble判断是否为单双周，根据startWeek判断是单周还是双周
        // 于是可以判断是否应显示为彩色
        item
            .colorArray = new Array(19).fill("").map((colorItem, colorIndex) => { // 为单双周
                if (item.singleDouble == "1") { // 为双周
                    let courseParity = Number(item.startWeek) % 2;
                    item.singleDoubleText = courseParity
                        ? "单周"
                        : "双周";
                    let weekParity = colorIndex % 2;
                    return courseParity == weekParity
                        ? "color"
                        : "gray";
                } else {
                    return "color";
                }
            })
        const propSize = Number(item.length)
        let fullName = '';
        fullName = fullName + item.name;
        item['fullName'] = fullName;
        if (item.name.length > propSize * 3 + 2) {
            item.name = item.name.slice(0, (propSize - 1) * 3 + 2) + "..." + item.name.slice(-3);
        }
        // 相同的课程分配相同的颜色
        if (item.name in sameColorArray) {
            item.colorIndex = sameColorArray[item.name];
        } else {
            item.colorIndex = String((index) % 5 + 1);
            sameColorArray[item.name] = item.colorIndex;
        }
        return item;
    })
}
export default classInfoRefine;
