import {
  Http
} from "../utils/http"

class GetBookDetailModel extends Http {
  //获取图书分类数据
  async getBookDetail(data,Callback) {
    let res = await this.request({
      url: "api/goods/" + data.goodsId
    })
    Callback(res)
  }

  
}
export {
  GetBookDetailModel
}