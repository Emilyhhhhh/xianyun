function dateHandle(date) {
    let time = new Date(date);
    let month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    let min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    let now = time.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        min;
    return now;
}
export default dateHandle