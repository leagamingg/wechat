// pages/qwer/qwer.js
let dcoId='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 结合两个 data 对象
    imageUr1s:'',
    imageUr2s:'',
    returnName: '',
    returnAge: '',
    returnSex: '',
    returnVaccine: '',
    returnJueyu: '',
    returnHealth: '',
    returnDescribe: '',
    returnReason: '',
    the_docID:""
  },
 
  

  getdata(docID){

    const db=wx.cloud.database()
    db.collection('Pet_post_form').doc(docID).get().then(res=>{console.log(res)
      this.setData({
        imageUr1s:res.data.picture,
        returnName: res.data.Pet_name,
        returnAge: res.data.Pet_age,
        returnSex: res.data.Pet_gender,
        returnVaccine: res.data.Pet_vac,
        returnJueyu: res.data.Pet_ste,
        returnHealth: res.data.Pet_health,
        returnDescribe:res.data.address,
        returnReason: res.data.Pet_abandon,
        imageUr2s:"cloud://cloud1-0g0otfoe73630424.636c-cloud1-0g0otfoe73630424-1322519872/dog.png"
      });
    });
  },


  onAdopt() {
    // 生成了 OpenID
    const openid = "随机生成的openid";

    // 将生成的 OpenID 存储在本地
    wx.setStorageSync("openid", openid);
    // 跳转页面
    wx.navigateTo({
      url: '/pages/liyan/index',
    });
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const docID = options._id;
    this.getdata(docID);
  },
  redirectToapplicationpage()
  {wx.redirectTo({
    url: '/pages/application/application'
  });},
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

  }
})