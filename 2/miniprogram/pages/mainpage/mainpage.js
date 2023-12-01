//pages/mainpage/mainpage.js
Page({


  getdata(){
    const db=wx.cloud.database()
    db.collection('Daily_post_table').get().then(res=>{
      console.log(res);
      let fons=res.data.length
      console.log(fons)
      this.setData({
        first_comment:res.data[fons-1],
        second_comment:res.data[fons-2],
        third_comment:res.data[fons-3],
        forth_comment:res.data[fons-4],
      })
    })
  },


  
  /**
   * 页面的初始数据
   */
  data: {
    first_comment:'',
    second_comment:'',
    third_comment:'',
    forth_comment:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getdata();
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


})



wx.setNavigationBarTitle({
  title: "用户首页"
})



