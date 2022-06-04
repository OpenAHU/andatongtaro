import Taro from "@tarojs/taro";
import {useEffect} from "react";
import {useValue} from "../hooks/useValue";

export async function useData(request: Taro.request.Option, key?: string) {
  // 检查当前key是否被缓存
  const keys: Array<string> = Taro.getStorageInfoSync().keys;
  // 如果没有key参数，则参数是url
  const storageKey = key ? key : request.url;
  let isCached = false;
  if (keys.includes(storageKey)) {
    isCached = true;
  }
  // 初始化状态
  const initialData = isCached ? Taro.getStorageSync(storageKey) : {};
  const data = useValue(initialData);
  // 请求
  useEffect(() => {
    Taro.request(request).then(result => {
      data.setValue(result.data);
      Taro.setStorageSync(storageKey, data.value);
    });
  }, [request, storageKey, data]);
  // 返回请求结果
  return data.value;
}
