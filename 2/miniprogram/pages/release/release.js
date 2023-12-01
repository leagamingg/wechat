// index.js
const db=wx.cloud.database()
Page({
  data: {
    openid:"",
    type:"",
    name:"",
    age:"",
    gender:"",
    vac:"",
    ste:"",
    health:"",
    content:"",
    reason:"",
    real_name:"",
    phone:"",
    address:"",
    picture:"",
    picture_src:"",
  },

  onShow()
  {
    this.get_openid()
  },

  get_openid()
  {
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(
      res=>{
      this.data.openid=res.result.openid
      // console.log(this.data.openid)
    }
    )
  },
 
  send() {

    console.log("执行前")
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+'.png',
      filePath:this.data.picture_src,
      success: res => {
        this.setData({picture:res.fileID})
      }
    })
    let ifcan=true
    for(let i in this.data )
    {
        if(this.data[i]=="")
        ifcan = false
    }
    console.log(ifcan)
    if(ifcan)
    {
      db.collection('Pet_post_form').add({
        data: {
            Pet_abandon:this.data.reason,
            Pet_age:this.data.age,
            Pet_content:this.data.content,
            Pet_gender:this.data.gender,
            Pet_health:this.data.health,
            Pet_name:this.data.name,
            Pet_ste:this.data.ste,
            Pet_type:this.data.type,
            Pet_vac:this.data.vac,
            address:this.data.address,
            contact:this.data.content,
            name:this.data.real_name,
            picture:this.data.picture,
        }
      }).then(res=>{
        this.success_jump()
      })


    }
    else
    {
      console.log("请填写完整信息")
      console.log(this.data)
      wx.showToast({
        title: '请完善所有信息',
        icon: 'none',
        duration: 2000
      })
    }

  },

  success_jump()
  {
   wx.showToast({
     title: '提交成功',
     icon: 'none',
     duration: 2000
   }).then(res=>
     setTimeout(function(){
       wx.reLaunch({
         url: '/pages/index/index.js'
       })
       },1000
     )
     )
  },

  testUploadfile:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime()+'.png',
          filePath: res.tempFilePaths[0],
        }).then(res=>
        {
          this.data.picture
        }
        )
      },
    })
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    // console.log(e.detail)
    this.setData({
      picture_src:avatarUrl
    })
    console.log(this.data.picture_src)
  



  },

});