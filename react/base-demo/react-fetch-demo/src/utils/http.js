import qs from "querystring";

export function httpGet(url) {
  const result = fetch(url);
  return result;
}
export function httpPost(url, params) {
  const result = fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Accept: "application/json,text/plain,*/*",
    },
    // 利用qs
    // {
    //     user_id:"iwen@qq.com",
    //     password:"iwen123",
    //     verification_code:"crfvw"
    //   }
    // 转换成
    //  "user_id=iwen@qq.com&password=iwen123&verification_code=crfvw"
    body: qs.stringify(params),
  });
  return result;
}
