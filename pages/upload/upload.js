// pages/upload/upload.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    max_number: 0,
    radioItems: [
      {name: 'Yes', value: 'item', checked: 'true'},
      {name: 'No', value: 'giveaway'}
    ],
  
    categories:['Tops', 'Bottoms', 'Coats', 'Dresses','Shoes','Bags','Accessories'],

    // upload page data
    is_giveaway: false,
    item_type: 'Tops',
    tag_list: [],
    remark: '',
    imgSrc: '/images/icons/photo.png',

    itemName: '',
    checked: false,
    state:'',
    show:false,
    inputValue:'',
    typeArray: [
      {
        name: 'spring',
        num: 0,
        selected: false,
      },
      {
        name: 'summer',
        num: 1,
        selected: false,
      },
      {
        name: 'autumn',
        num: 2,
        selected: false,
      },
      {
        name: 'winter',
        num: 3,
        selected: false,
      },
      {
        name: 'casual',
        num: 4,
        selected: false,
      },
      {
        name: 'formal',
        num: 5,
        selected: false,
      },
      {
        name: 'sporty',
        num: 6,
        selected: false,
      },
      {
        name: 'work',
        num: 7,
        selected: false,
      }
    ]
  },

  radioChange(e) {
    const page = this
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    console.log(changed)
    this.setData(changed)
    if (changed['radioItems[1].checked'] === true) {
      page.data.is_giveaway = true
    } else {
      page.data.is_giveaway = false
    }
  },

  bindChangePicker(e) {
    const val = e.detail.value
    // console.log('this in bindChange', val)
    this.setData({
      item_type: this.data.categories[val],
    })
    // console.log('item_type', data.item_type)
  },
  // sync input
  bindKeyInput(e) {
    this.setData({
      itemName: e.detail.value
    })
  },
  // choose tags and give to tag_list
  dealTap: function(e) {
    let string = "typeArray[" + e.target.dataset.index + "].selected";
    console.log(!this.data.typeArray[e.target.dataset.index].selected);
    this.setData({
      [string]: !this.data.typeArray[e.target.dataset.index].selected
    })
    let detailValue = this.data.typeArray.filter(it => it.selected).map(it => it.name)
    this.setData({
      tag_list: detailValue
    })
    console.log(this.data.tag_list)
  },

  addinput(e){
    this.setData({
      show: true,
    });
  },
  // close pop-up window
  onClose(){
    this.setData({ show: false });
  },
  // get input value
  bindValue(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  // add new tag
  onInputValue(){
    this.setData({
      show: false,
      inputValue: this.data.inputValue
    });
    var typeArray = this.data.typeArray;
    console.log(this.data.inputValue)
    var newData = { num: typeArray.length, name: this.data.inputValue, selected: false};
    typeArray.push(newData);
    this.setData({
      typeArray,
    })
    console.log(this.data.inputValue)
  },


  chooseImg() {
    const page = this;
    // console.log('page', page);
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        // console.log('res', res)
        const imgInfo = res.tempFiles[0];
        page.setData ({
          imgSrc: res.tempFiles[0].tempFilePath,
        })
        wx.showToast({
          title: "uploaded",
          icon: 'success',
          duration: 1000
      });
      }
    })
  },

  onInput(e){
    this.setData({
      remark: e.detail.value
    })
  },

  saveThings(e) {
    const page = this;
    // console.log('radioItems', page.data.radioItems)
    // console.log('It is page:', page.data)
    var header = app.globalData.header;
    const url = `${app.globalData.baseUrl}/items`
    // const url = "https://de-closet-backend.wogengapp.cn/api/v1/items" // real url address
    wx.request({
      url: url,
      header: header,
      data: page.data,
      method:'POST',
      success (res) {
        console.log('INSIDE UPLOAD.JS', res.data)
        // console.log(url)
        // console.log(page.data)
        app.globalData.user = res.data.user
        console.log(`${url}/${res.data.item.id}/upload`)
        console.log(page.data.imgSrc)
        wx.uploadFile({
          url: `${url}/${res.data.item.id}/upload`,
          filePath: page.data.imgSrc,
          name: 'file',
          header: header,
          success(res) {
            console.log('this is for upload file', res)
            console.log('is_giveaway', page.data.is_giveaway)
            const data = res.data
            if(page.data.is_giveaway == true ){
              wx.reLaunch({
                url: '/pages/giveaways/giveaways'
              })
            } else {
              wx.reLaunch({
                url: '/pages/closet/closet',
              })
            }
          },
          fail(err) {
            console
            console.log(err)
          }
        })
      }
    })

  },

  // cancel choose
  onCancel(){
    this.setData({ show:false });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      currentNum: options.currentNum,
      targetNum: options.targetNum,
      max_number: app.globalData.max_number
    });
    // console.log('local max number', this.data.max_number)
  },

  // onShareAppMessage: function () {
  //   return {
  //     title: 'upload',
  //     path: 'pages/upload/upload'
  //   }
  // }
})
