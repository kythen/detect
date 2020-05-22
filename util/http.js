import {config} from '../config.js';

class Http {
  request(params) {
    if (!params.method) {
      params.method = 'GET';
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'appkey': config.appkey,
        'content-type': 'application/json'
      },
      success: res => {
        let code = res.statusCode.toString();
        if(code.startsWith(2)) {
          params.success && params.success(res.data);
        } else {
          const error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: err => {
        this._show_error(1);
      }
    })
  }

  _show_error(msg) {
    error_code = msg || '系统异常';
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    });
  }
 }
 export {Http};