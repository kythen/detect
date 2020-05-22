import {
  chooseImg,
  upload
} from '../../util/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    phoneOpt: [],
    peopleOpt: [],
    peopleSelected: '',
    phoneSelected: []
  },

  call: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.value
    });
  },

  addContact: function(e) {
    const {
      phoneSelected,
      peopleSelected
    } = this.data;
    if (!(peopleSelected && phoneSelected.length)) {
      return;
    }
    wx.addPhoneContact({
      firstName: peopleSelected,
      mobilePhoneNumber: phoneSelected,
    });
  },

  radioChange: function(e) {
    this.setData({
      peopleSelected: e.detail.value
    });
  },

  checkboxChange: function(e) {
    this.setData({
      phoneSelected: e.detail.value
    });
  },

  format: function(info) {
    if (!info) return [];
    return info.map(item => ({
      name: item.content,
      value: item.content,
      checked: false
    }));
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      img: options.img
    });
    wx.showLoading({
      title: '检测中'
    });

    upload({
      url: 'detect/img',
      filePath: options.img,
      name: 'file',
      success: data => {
        wx.hideLoading();

        data = data || {};
        const formatedPeople = this.format(data.people);
        const formatedPhone = this.format(data.phone);
        this.setData({
          phoneOpt: formatedPhone,
          peopleOpt: formatedPeople
        });
      },
      fail: err => {
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})