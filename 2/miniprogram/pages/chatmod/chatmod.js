// pagesatat.js
const db=wx.cloud.database()
const _ = db.command 
Page({

  /**
   * 页面的初始数据
   */
  data: {
        openid:"",
        listid:"",
        chatopenid:"",
        chat_list:"",
        myimage:"",
        myname:"",
        Bname:"",
        Bimage:"",
        text:"",
        toBottom:"",
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    this.setData({chatopenid:options.id})

    this.getchat()
    this.dbWatcher()


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(
      res=>{
      
      this.setData({
        openid:res.result.openid,
      })

      this.setData({
        toBottom : `item${this.data.chat_list.length-1}`,
      })
      
    }
    ).then(res=>
      {
        // console.log(this.data.openid)
        this.getdata()
      }
    )


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


    db.collection('The_chat').where({
      Auser:_.or((this.data.openid),(this.data.chatopenid)),
      Buser:_.or((this.data.chatopenid),(this.data.openid))
    }
    ).get({
      success: res=> {

        if(res.data.length==0)
        {
          db.collection('The_chat').add({
            data: {
                Auser:this.data.openid,
                Buser:this.data.chatopenid,
                chat:[{whoseid:this.data.openid,chat:"你好"},{whoseid:this.data.chatopenid,chat:"你好"}]
                // chat:[{whoseid:"",chat:""}]
            },
            success: function(res) {

              console.log(res)
              this.setData({chat_list:res.data[0].chat,
                            listid:res.data[0]._id,         
              })    
            }
          })
        }
        else
        {
          let indo=res.data[0].chat.length-1
          this.setData({chat_list:res.data[0].chat,
            listid:res.data[0]._id,})
            this.setData({
              // toBottom : `item${this.data.chat_list.length +1}`,
              toBottom : `scrollBottom`
            })
        }

        db.collection('Personal_Data_Sheet').where({_openid:this.data.openid}).get().then(res=>{
          console.log(res)
          if(res.data.length!=0)
          this.setData({
            myimage:res.data[0].picture,
            myname:res.data[0].User_name,
          })
        })
        
        db.collection('Personal_Data_Sheet').where({_openid:this.data.chatopenid}).get().then(res=>{
          if(res.data.length!=0)
          this.setData({
            Bimage:res.data[0].picture,
            Byname:res.data[0].User_name,
          })
        })

      }
    })



  },

  sendmessage()
  {
    if(this.data.text!="")
    {
    db.collection('The_chat').doc(this.data.listid).update({
      data:{
        chat:_.push([{whoseid:this.data.openid,chat:this.data.text}])
      }
    })
    
    this.setData({
      // chat_list:_.push({whoseid:this.data.openid,chat:this.data.text})
    })
    this.setData({text:""})
    // console.log("发送了一条消息")
  }
  },

  getchat()
  {
    db.collection('The_chat').where({
      Auser:_.or((this.data.openid),(this.data.chatopenid)),
      Buser:_.or((this.data.chatopenid),(this.data.openid))
    }
    ).get({})
    this.setData({
      // toBottom : `item${this.data.chat_list.length+1}`,
      toBottom : `scrollBottom`
    })

  },

  dbWatcher(){
    var that = this
    const watcher = db.collection('The_chat').watch({
      onChange: function(snapshot) {
        // console.log('snapshot', snapshot.docChanges[0].doc.chat)
        that.setData({
          toBottom : `scrollBottom`,
          chat_list:snapshot.docChanges[0].doc.chat,
        })
        that.getchat()
      },

      onError: function(err) {
        console.error('the watch closed because of error', err)
      }
    })
    },
  
 

})


wx.setNavigationBarTitle({
  title:"chat"
})
