const app = getApp();
const db = wx.cloud.database()

Page({
  /*** 页面的初始数据*/
  data: {
    Post_name: null,
    Post_content: null,
		Post_picture: null,
		showLoading: false,
  },

  
  saveEditOrNot() {
    wx.showModal({
      title: '将此次编辑保留',
      content: '',
      cancelText: '不保留',
      confirmText: '保留',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  getContentInputValue(e) {
    this.setData({
      Post_content: e.detail.value
    })
  },

  getTitleInputValue(e) {
    this.setData({
      Post_name: e.detail.value
    })
  },

	chooseImageTips() {
		let self = this;
		wx.chooseImage({
				count: 1, // 选择一张图片
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
						const tempFilePath = res.tempFilePaths[0]; // 获取选择的图片路径
						const suffix = /\.\w+$/.exec(tempFilePath)[0]; // 获取文件扩展名
						wx.cloud.uploadFile({
								cloudPath: Date.now() + suffix, // 以时间戳和文件扩展名作为文件名
								filePath: tempFilePath,
								success: (res) => {
										const fileId = res.fileID; // 获取上传到云存储后的文件ID
										self.setData({
											Post_picture: fileId 
										});
								},
								fail: (err) => {
										console.error('图片上传失败', err);
								}
						});
				}
		});
},


postData: function () {
  // 显示加载对话框
  const loadingDialog = this.selectComponent("#loadingDialog");
  loadingDialog.show();

  

  const db = wx.cloud.database();
  db.collection('Daily_post_table').add({
    data: {
      Post_name: this.data.Post_name,
      Post_content: this.data.Post_content,
      Post_picture: this.data.Post_picture,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: (res) => {
      console.log('数据保存成功', res);
      this.setData({
        Post_name: null,
        Post_content: null,
        Post_picture: null
      });
     
      wx.switchTab({
        url: '/pages/mainpage/mainpage'
      })
    
      // 模拟操作完成后，隐藏加载对话框
      setTimeout(() => {
        loadingDialog.hide();
      }, 500);
    },
    
    fail: (res) => {
      console.log('数据保存失败', res);
      // 隐藏加载对话框
      loadingDialog.hide();
    }
  });
}
})