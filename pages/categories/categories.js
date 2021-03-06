// pages/categories/categories.js
Page({
  /**
   * Page initial data
   */

  data: {
    // options: {
    //   collection: "photo"
    // }
    itemName: 'item'
  },
  

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options){
    let page = this;
    let collection = JSON.parse(options.collection)
    // collection.forEach(c=>{
    // let img = c.photo;
    // })
    let categoryType = collection[0].item_type
    let amount = collection.length
    console.log("collection", collection)
    page.setData({
      collection, amount, categoryType
    })
    if(amount > 1){
      page.setData({
        itemName: 'items'
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    return {
      title: 'DeCloset - delutter your closet, save your favourite items only 💗',
      imageUrl: '/images/head.jpeg',
      path: '/pages/index/index'
    }
  }
})