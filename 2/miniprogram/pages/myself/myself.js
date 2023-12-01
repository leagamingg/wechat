// pages/myself/myself.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      picture:"",
      username:"",
      openid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(
      res=>{
      this.data.openid=res.result.openid
      this.getdata()
      this.setData({
        openid:res.result.openid
      })
    }
    )
    this.getdata();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
     this.getdata();
  },

  onUnload()
  {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getdata();
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
    db.collection('Personal_Data_Sheet').where({openid:this.data.openid}).get().then(res=>{
      // console.log(res.data)
      if(res.data.length!=0)
      this.setData({
        picture:res.data[0].picture,
        username:res.data[0].User_name,
      })
      // console.log(this.data)
    })
  },

})

wx.setNavigationBarTitle({
  title: '个人空间'
})

