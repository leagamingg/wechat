const db=wx.cloud.database()
Page({

    navigateToDogPage() {  
        wx.navigateTo({  
          url: '/pages/pet_classify/pet_classify'  // 替换为你的猫页面的路径  
        });  
      }, 
  navigateToCatPage() {  
    wx.navigateTo({  
      url: '/pages/cat/cat'  // 替换为你的猫页面的路径  
    });  
  }, 
  navigateToRatPage() {  
    wx.navigateTo({  
      url: '/pages/rat/rat'  // 替换为你的猫页面的路径  
    });  
  }, 

  navigateToFishPage() {  
    wx.navigateTo({  
      url: '/pages/fish/fish'  // 替换为你的猫页面的路径  
    });  
  }, 
  navigateToElsePage() {  
    wx.navigateTo({  
      url: '/pages/else/else'  // 替换为你的猫页面的路径  
    });  
  }, 
  
    
    
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
     
        this.getdata()

    },

    data:{
      
      item:[],
      page:1,
      pagesize:10,
      total:0 
    },

    handleClick: function(event) {  
      var _id = event.currentTarget.dataset._id;
      console.log('Clicked _id:', _id);
      var url = '/pages/qwer/qwer?_id=' + _id;
      console.log('Generated URL:', url);
      wx.navigateTo({
        url: url
      });
    }, 
   
    getdata(){
      wx.showLoading({
        title: "数据加载中~",
      });

      wx.cloud.callFunction({
        name:"bird",
        data:{
          _page:this.data.page,
          _limit:this.data.pagesize
        }
      }).then(res=>{
        
        console.log(res)
        this.setData({
          
          item:res.result
          
         
        });
        wx.hideLoading();
      
      })
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
      wx.stopPullDownRefresh()
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
      wx.showToast({
        title: '没有小动物了！',
        icon: 'none',
        duration: 1500
      });
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
  
    }
  })