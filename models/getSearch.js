import {
  Http
} from "../utils/http"

class GetSearchModel extends Http {
  //获取图书分类数据
  async getSearch(data,Callback) {
    let res = await this.request({
      url: "api/goods/",
      data:{
        ...data.page
      }
    })
    Callback(res)
  }

  
}
export {
  GetSearchModel
}