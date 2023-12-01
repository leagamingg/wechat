// pages/message/message.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    messageArray:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(
      res=>{
      this.data.openid=res.result.openid
      this.setData({
        openid:res.result.openid
      })
      this.getdata()
    }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  getdata(){
    db.collection('User_message').where({_openid:this.data.openid}).get().then(res=>{
      console.log(res.data[0].xitong)
      if(res.data.length!=0)
      this.setData({
          messageArray:res.data[0].xitong
      })
    })
  },

})