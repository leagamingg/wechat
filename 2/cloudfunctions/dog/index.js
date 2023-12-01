// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
// 云函数入口文件
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("Pet_post_form").aggregate().lookup({
      from:"Personal_Data_Sheet",
      localField: "_openid",
      foreignField: "openid",
      as: "newslist"
    }).
    match(pet_type="狗")
    .end()
  } catch (e) {
    console.error(e)
  }
}
