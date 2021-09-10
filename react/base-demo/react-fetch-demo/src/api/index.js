import { httpGet, httpPost } from "../utils/http";
import base from "./base";

const api = {
  getChengpin() {
    return httpGet(base.baseUrl + base.chengpin);
  },
  getLogin(params) {
    return httpPost(base.baseUrl + base.login, params);
  },
};

export default api;
