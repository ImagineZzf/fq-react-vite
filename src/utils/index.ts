import { APP_NAME } from "./constants"

/**
 * @title 获取app前缀key
 * @description
 * @param {string} key
 * @return {*}
 */
export const getAppPrefixKey = (key: string): string => {
  return `${APP_NAME}_${import.meta.env.VITE_APP_ENV}_${key}`
}