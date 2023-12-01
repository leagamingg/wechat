// pages/adress/adress.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
        adress:"",
        openid:"",
        listid:"",
        iftrue:""
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.get_openid()
    this.getdata()
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
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(
      res=>{
      this.data.openid=res.result.openid
      console.log(this.data.openid)
    }
    ).then(res=>
      {
        db.collection('Personal_Data_Sheet').where({openid:this.data.openid}).get().then(res=>{
          console.log(res.data.length)
          if(res.data.length!=0)
          {
            console.log("用户已注册")
            this.setData({
              adress:res.data[0].User_adress,
              listid:res.data[0]._id,
              iftrue:"1",
            })
          }
          if(res.data.length==0)
          {
            console.log("用户未注册")
            this.setData({
              iftrue:"0",
            })
            console.log(this.data.iftrue)
            this.success_jump()
          }
        }).then(res=>
          {
            console.log(res)
            console.log(this.data.iftrue)
            if(this.data.iftrue)
            {
            }
    
          })
      })
  },

  get_openid()
  {
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(
      res=>{
      this.data.openid=res.result.openid
      console.log(this.data.openid)
    }
    )
  },

  senddata()
  {
    console.log(this.data.iftrue)
    if(this.data.iftrue=="1")
    db.collection('Personal_Data_Sheet').doc(this.data.listid).update({
      data:{
        User_adress:this.data.adress,
      }
    })
    if(this.data.iftrue=="0")
    {
      db.collection('Personal_Data_Sheet').doc(this.data.listid).add({
        data:{
          User_adress:this.data.adress,
        }
      })
      
    }
    this.success_jump2()
  },

  success_jump()
  {
   wx.showToast({
     title: '请先完善个人资料',
     icon: 'none',
     duration: 2000
   }).then(res=>
     setTimeout(function(){
       wx.reLaunch({
         url: '/pages/myself/myself'
       })
       },1000
     )

     )


  },
  success_jump2()
  {
   wx.showToast({
     title: '保存成功',
     icon: 'none',
     duration: 2000
   }).then(res=>
     setTimeout(function(){
       wx.reLaunch({
         url: '/pages/myself/myself'
       })
       },1000
     )

     )


  },

})