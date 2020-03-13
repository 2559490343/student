const getTime = function getTime() {
  let time = new Date();
  let year = time.getFullYear();
  let month = (time.getMonth() + 1) > 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1).toString();
  let day = time.getDate() > 10 ? time.getDate() : '0' + time.getDate().toString();
  let hour = time.getHours() > 10 ? time.getHours() : '0' + time.getHours().toString();
  let min = time.getMinutes() > 10 ? time.getMinutes() : '0' + time.getMinutes().toString();
  let second = time.getSeconds() > 10 ? time.getSeconds() : '0' + time.getSeconds().toString();;
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second
}


module.exports = {
  getTime: getTime //暴露格式化时间的函数
}