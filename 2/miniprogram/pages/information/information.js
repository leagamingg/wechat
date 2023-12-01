const defaultAvatarUrl = ''
const db=wx.cloud.database()
Page({
  data: {
    listid:"",
    openid:"",
    avatarUrl: "",
    mid_avatarUrl:"",
    username:"",
    sex:"",
    like:"",
    fileid:"",
    exist:"",
    old_avatarUrl:"",
    old_username:"",
    old_sex:"",
    old_like:"",
  },

  onReady()
  {
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(
      res=>{
      this.data.openid=res.result.openid
      this.getdata()
    }
    )
  },

  onShow()
  {
    this.getdata()
  },


  getdata(){
    db.collection('Personal_Data_Sheet').where({_openid:this.data.openid}).get().then(res=>{
      console.log(this.data.openid)
      console.log(res.data.length)
      if(res.data.length>0)
      {
        this.setData(
          {
            exist:true
          }
        )
        this.setData({
          like:res.data[0].User_favorite,
          avatarUrl:res.data[0].picture,
          sex:res.data[0].User_gender,
          username:res.data[0].User_name,
          listid:res.data[0]._id,
          old_avatarUrl:res.data[0].picture,
          old_like:res.data[0].User_favorite,
          old_sex:res.data[0].User_gender,
          old_username:res.data[0].User_name,
        })
      }
      else
      {
        this.setData(
          {
            exist:false
          }
        )
      }

      console.log(this.data.exist)
    })
  },
  //点击保存按钮
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    console.log(e.detail)
    this.setData({
      avatarUrl,
    })
    // console.log(this.data.avatarUrl)
  },

  senddata(res){


    if(this.data.exist==true)
    {
      console.log("true情况")

      //更新头像
      if(this.data.avatarUrl!=this.data.old_avatarUrl)
      wx.cloud.uploadFile({
        cloudPath:new Date().getTime()+'.png',
        filePath:this.data.avatarUrl, 

        //更新头像并且上传成功
        success: res => {
          console.log(res.fileID)
          console.log("对了对了true")
          this.setData({mid_avatarUrl:res.fileID})

            db.collection('Personal_Data_Sheet').doc(this.data.listid).update({
            // data 字段表示需更新的 JSON 数据
            data: {
              picture:this.data.mid_avatarUrl,
              // openid:this.data.openid
            }
          })
          wx.cloud.deleteFile({
            fileList: [this.data.old_avatarUrl],
            success: res => {
              // handle success
              console.log("替换成功")
            },
            // fail: console.error
          })
          this.setData({
            old_avatarUrl:this.data.mid_avatarUrl
          })
          console.log("头像更换")
          
        },
        fail: 
          console.log("没有更换头像true")
      })

      if(this.data.username!=this.data.old_username&&this.data.username!="")
      {
        db.collection('Personal_Data_Sheet').doc(this.data.listid).update({
          data:{
            User_name:this.data.username,
          }
        })
        this.setData({
          old_username:this.data.username
        })
        console.log("名称更换")
      }

      if(this.data.sex!=this.data.old_sex)
      {
        db.collection('Personal_Data_Sheet').doc(this.data.listid).update({
          data:{
            User_gender:this.data.sex,
          }
        })
        this.setData({
          old_sex:this.data.sex
        })
        console.log("性别更换")
      }

      if(this.data.like!=this.data.old_like)
      {
        db.collection('Personal_Data_Sheet').doc(this.data.listid).update({
          data:{
            User_favorite:this.data.like,
          }
        })
        this.setData({
          old_like:this.data.like
        })
        console.log("喜好更换")
      }

      

      
    }


    if(this.data.exist==false){

      console.log("false情况")
      
      wx.cloud.uploadFile({
        cloudPath:new Date().getTime()+'.png',
        filePath:this.data.avatarUrl, // 文件路径
        success: res => {
          console.log(res.fileID)
          console.log("对了对了false")
          this.data.avatarUrl=res.fileID
          this.data.mid_avatarUrl=res.fileID
          //成功上传头像并且返回fileid的时候
          db.collection('Personal_Data_Sheet').add({
            // data 字段表示需更新的 JSON 数据
            data: {
              User_name:this.data.username,
              User_gender:this.data.sex,
              User_favorite:this.data.like,
              picture:this.data.mid_avatarUrl,
              openid:this.data.openid,
            }
  
          })
          console.log("跳转")
          wx.navigateTo({
            url: '/pages/adress/adress.js',
          })
        },
        fail: 
          console.error
      })
      console.log(this.data)
    }




    this.success_jump()


   },

   success_jump()
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

wx.setNavigationBarTitle({
  title: '个人资料'
})