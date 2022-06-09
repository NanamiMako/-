import {
  Http
} from "../utils/http"

class GetBookModel extends Http {
  //获取图书分类数据
  async getBook(data) {
    let res = await this.request({
      url: data.url,
      data:{
        ...data.type
      }
    })
    return res.data
  }

  //根据选项栏下标选择url类型
  async judegTabIndex(idx,pageNum,CallBack){

    let data = {
      0: {
        url: "api/index",
        type: {
          page: pageNum
        }
      },
      1: {
        url: "api/index",
        type: {
          new: 1,
          page: pageNum
        }
      },
      2:{
        url: "api/goods",
        type: {
          sales: 1,
          page: pageNum
        }
      }
    }[idx]
    let bookData = await this.getBook(data);
    CallBack(bookData)
  }

  //根据数据价格排序
  storArr(data,modeNum,CallBack){
    let arr = [];

    //价格从低到高排序
    function compare (prop) {
      return (a,b) =>{
        let val1 = a[prop];
        let val2 = b[prop];
        return val1 - val2
      }
    }
    arr = data.sort(compare("price"))
    if(modeNum == 2){
      arr.reverse();
    }

    CallBack(arr)
  }

  
}
export {
  GetBookModel
}