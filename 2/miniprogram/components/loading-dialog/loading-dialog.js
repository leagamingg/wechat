Component({
  data: {
    visible: false, // 控制组件的显示和隐藏
  },

  methods: {
    // 显示组件
    show: function() {
      this.setData({
        visible: true
      });
    },

    // 隐藏组件
    hide: function() {
      this.setData({
        visible: false
      });
    }
  }
});