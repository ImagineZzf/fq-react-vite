import { baseType, clearStorage, dateType, getStorage, removeStorage, setStorage } from "fq-utils"
import { getAppPrefixKey } from "."

// storage工具库
class Storage {
  // 设置storage
  set = (key: string, value: baseType, expire?: dateType, containType?: boolean): void => {
    setStorage(getAppPrefixKey(key), value, expire, containType)
  }
  // 获取storage
  get = (key: string): baseType => {
    return getStorage(getAppPrefixKey(key))
  } 
  // 移除对应key的storage
  remove = (key: string) => {
    removeStorage(getAppPrefixKey(key))
  }
  // 清除storage
  clear = clearStorage
}

const storage = new Storage()

export default storage