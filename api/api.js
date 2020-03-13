let r = require('./request.js')
let req = r.default.wxRequest
export default {
  // 登录验证
  login: (params) => {
    return req('POST', '/student/check', params)
  },
  // 选课界面获取当前开放的课
  getPublishCourse: (params) => {
    return req("POST", "/course/ongoingcode", params)
  },
  // 输入邀请码加入课程
  joinCourse: (params) => {
    return req("POST", '/student/checkandadd', params)
  },
  // 获取学生已有课程
  getStudentCourse: (params) => {
    return req("POST", "/student/allcourse", params)
  },
  // 获取当前课程进行中的签到
  getSigning: (params) => {
    return req("POST", '/course/getcheckcode', params)

  },
  // 获取当前课程历史签到记录
  getHisSign: (params) => {
    return req("POST", '/course/allsign', params)
  },
  // 获取当前课程发布的作业
  getHomeWork: (params) => {
    return req("POST", "/homework/allhomework", params)
  },
  // 查看作业详情
  getHomeWorkDetail: (params) => {
    return req("POST", '/homework/homeworkdetail', params)
  },
  // 提交作业
  submitHomeWork: (params) => {
    return req("POST", '/homework/commitandcorrect', params)
  },
  // 查看已提交的作业结果
  showSubmitResult: (params) => {
    return req("POST", '/homework/correctdetail', params)
  },
  // 提交学生签到情况
  submitSignStatus: (params) => {
    return req("POST", "/student/addsign", params)
  },
  // 获取学生考勤信息
  getSignInfo: (params) => {
    return req("POST", '/student/totalcount', params)
  },
  // 获取作业情况信息
  getHomeWorkInfo: (params) => {
    return req("POST", '/student/totalcommit', params)
  },
  // 获取学生成绩
  getGradeInfo: (params)=>{
    return req("POST",'/student/allgrade',params)
  }
}