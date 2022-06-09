// let headerUrl = "https://api.shop.eduwork.cn/";
// export const request = (parameter)=>{
  
//   let url = headerUrl + parameter.url;
  
//   return new Promise ((resolve,reject ) => {
//     wx.request({
//       url,
//       success(res){
//         console.log(res)
//         resolve(res.data.goods.data)
//       },
//       fail(err){
//         reject(err)
//       }
//     })
//   })
// }

import { config } from '../config.js'
class Http{
  constructor() {
    this.baseRestUrl = config.api_blink_url
  }

  request (params){
  
    let url = this.baseRestUrl + params.url;

    if (!params.method) {
      params.method = 'GET';
    }
    
    return new Promise ((resolve,reject ) => {
      wx.request({
        url,
        data: params.data,
        method: params.method,
        header: {
          'content-type': 'application/json'
        },
        success(res){
          resolve(res.data.goods)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }

}
export {
  Http
}