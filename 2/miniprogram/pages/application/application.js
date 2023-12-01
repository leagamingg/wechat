// index.js
const db = wx.cloud.database();


  
Page({
  data: {
    formData: {}, // 表单数据
    adress:"",
    contact:"",
    real_name:"",
    reason:"",
    environment:"",
    disableButton: true // 按钮的可点击状态，默认为不可点击
  },

  redirectTopet_classify()
  {wx.redirectTo({
    url: '/pages/pet_classify/pet_classify'
  });},
  
  buss(res){
        var resVlu=res.detail.value
        
        db.collection("Application_Form").add({
          data:resVlu
        }).then(res=>{
          console.log(res)
        })
       
      },

  handleInput(event) {
    const { name } = event.currentTarget.dataset;
    const { value } = event.detail;

    // 更新表单数据
    const { formData } = this.data;
    formData[name] = value;
    this.setData({
      formData
    });

    // 检查表单数据是否完整
    this.checkFormData();
  },

  checkFormData() {
    const { formData } = this.data;
    const disableButton = Object.values(formData).some(value => !value);
    this.setData({
      disableButton
    });
  },

  submitApplication(event) {
    const { formData } = this.data;
    console.log(this.data.formData)
    // 调用后端函数
    this.buss(formData);
  },

  send(resVlu) {
    // 将数据存储到数据库中
    console.log(this.data)
    db.collection("Application_Form").add({
      data:{
        adress:this.data.adress,
        contant:this.data.contant,
        environment:this.data.environment,
        name:this.data.real_name,
        reason:this.data.reason,
      },
    }).then(res => {
      wx.showToast({
        title: '提交成功',
        icon: 'none',
        duration: 2000
      }).then(res=>
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/mainpage/mainpage'
          })
          },1000
        )
  
        )
    }).catch(err => {
      // console.error(err);
    });
  }


});