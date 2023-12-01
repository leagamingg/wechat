const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
		_openid:"",
		_id:"",
		post:"",
    Info:"",
    woh:""
  },


	getOpenid() {
    // console.log(this.data._id)
		db.collection('Daily_post_table').doc(this.data._id).get({
			success: res => {
				// console.log('openid:', res);
				const openid = res.data._openid;
				this.setData({
          _openid: openid,
          post:res.data
				}, () => {
					this.getUserInfo(); 
					// this.getPost();
				});
			},
			fail: err => {
				console.error('Failed to get user info:', err);
			}
		});
	},

	// getPost() {
	// 	db.collection('Daily_post_table').where({_openid: this.data._openid}).get({
	// 		success: res => {
	// 			console.log('userPost:', res.data[0]); 
	// 			const userPost = res.data[0];
	// 			if (userPost) {
	// 				this.setData({
	// 						post:userPost
	// 				});
	// 			} else {
	// 				this.setData({
	// 					userPost: {}
	// 				});
	// 			}
	// 		},
	// 		fail: err => {
	// 			console.error('Failed to get user info:', err);
	// 		}
	// 	});
	// },

	getUserInfo() {
    // console.log(this.data)
		db.collection('Personal_Data_Sheet').where({_openid: this.data._openid}).get({
			success: res => {
				console.log('userInfo:', res.data[0]);
				const userInfo = res.data[0];
				if (userInfo) {
					this.setData({
            Info:userInfo,
            woh:userInfo.openid
					});
				} else {
					this.setData({
						Info: {}
					});
				}
			},
			fail: err => {
				console.error('Failed to get user info:', err);
			}
		});
	},


  showOriginalImage: function(event) {
    var imageUrl = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [imageUrl],
      current: imageUrl
    });
  },

  onLoad: function (option) {
    // console.log(option.id)
		this.setData({_id:option.id});
		this.getOpenid();
  },


});
