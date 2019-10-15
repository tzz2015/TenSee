const app = getApp()
// 选择文件
function chooseImage(count, onSuccess) {
  wx.chooseImage({
    count: count,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      onSuccess(tempFilePaths)
    }
  })
}
// 上传文件到自己的服务器
function uploadFile(path) {
  wx.uploadFile({
    url: app.globalData.baseUrl + 'upload_wx_file',
    filePath: path,
    name: 'file',
    formData: {
      'filePath': path
    },
    success(res) {
      const data = res.data
      console.log(data)
      //do something
    }
  })
}


module.exports = {
  chooseImage: chooseImage,
  uploadFile: uploadFile
}