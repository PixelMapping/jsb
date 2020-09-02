import axios from "axios";
import { message } from "antd";
import config from "../../config/base.conf";


/**
 * Http服务类
 * get
 * post
 * upload
 * put
 * patch
 * delete
 */
class ApiRequest {
  constructor() {
    //创建axios实例
    this.instance = axios.create({
      // baseUrl: `http://192.168.0.254:8870`
      baseURL:config.baseUrl
    });
  }

  /**
   * 通过authTokenMiddleware中间件监听action=REHYDRATE|AUTH_SUCCESS来设置token
   */
  setToken = token => {
    this.instance.defaults.headers.common["Authorization"] = token;
    this.instance.defaults.headers.common["User-Client"] = "web";
    localStorage.setItem("token",token)
  };

  authentication = data => {
    if(data.status == 50101){
      message.warning(data.message)
    }
    if(data.status == 50102 || data.status == 50103){
      message.warning(data.message)
    }
    setTimeout(() => {
          localStorage.removeItem(`persist:${config.persist}`);
          window.location.href = "/login";
        }, 1500);
    // let errJson = JSON.parse(str);
    // console.log("判断token状态,是否过期",errJson);
    // if (errJson.response && errJson.response.status === 401) {
    //   message.error("用户认证出错，正在跳转登录页面！");
    //   setTimeout(() => {
    //     localStorage.removeItem(`persist:${config.persist}`);
    //     window.location.href = "/login";
    //   }, 1500);
    // }
  };

  upload(url, formData) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          // this.authentication(errStr);
          reject(errStr);
        });
    });
  }

  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .get(url, { params: { ...params } })
        .then(({ data }) => {
          // console.log("获取get接口状态",data.status)
          // 判断返回的状态 
          if(data.status == 50103 || data.status == 50102 || data.status == 50101){
            this.authentication(data);
            return;
          }



          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          // console.log("获取get接口状态",error)
          // this.authentication(errStr);
          reject(errStr);
        });
    });
  }

  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .delete(url, { data: { ...params } })
        .then(({ data }) => {
          if(data.status == 50103 || data.status == 50102 || data.status == 50101){
            this.authentication(data);
            return;
          }

          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          // this.authentication(errStr);
          reject(errStr);
        });
    });
  }

  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, { ...params })
        .then(({ data }) => {
          if(data.status == 50103 || data.status == 50102 || data.status == 50101){
            this.authentication(data);
            return;
          }

          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          if (url.includes("login")) {
            reject(errStr);
          } else {
            // this.authentication(errStr);
          }
        });
    });
  }

  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .put(url, { ...params })
        .then(({ data }) => {
          if(data.status == 50103 || data.status == 50102 || data.status == 50101){
            this.authentication(data);
            return;
          }

          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          // this.authentication(errStr);
          reject(errStr);
        });
    });
  }

  patch(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .patch(url, { ...params })
        .then(({ data }) => {
          if(data.status == 50103 || data.status == 50102 || data.status == 50101){
            this.authentication(data);
            return;
          }

          resolve(data);
        })
        .catch(error => {
          let errStr = JSON.stringify(error);
          // this.authentication(errStr);
          reject(errStr);
        });
    });
  }
}

export default new ApiRequest();
