import axios from 'axios'
import { account } from './_account'
// import { getFormConf } from '@/utils/db'

const baseURL = '/base/frame-workflow/api'
const appId = 3
const platformType = 3
const instance = axios.create({ baseURL })
instance.interceptors.request.use(async (config) => {
  const resp = await axios.post('/platform-api/system/base/adminLogin', account, { baseURL })
  const resp1 = await axios.post(
    '/enterprise-api/system/base/callbackLogin',
    { appId, token: resp.data.token, platformType },
    { baseURL, headers: { Platformtype: platformType } }
  )
  config.headers['Platformtype'] = platformType
  config.headers['Authorization'] = `Bearer ${resp1.data.token}`
  return config
})

export const getFieldListNotPage = (data) => {
  return instance.post('/enterprise-api/fd/form/data/getFieldListNotPage', { data })
}

export const getUserInfo = () => {
  return instance
    .get('/enterprise-api/system/base/getUserInfo', {
      params: { v: 8 }
    })
    .then((resp) => resp.data)
}
export const filterLink = (data) => {
  // /enterprise-api/fd/form/data/filterLink
  return instance //
    .post('/enterprise-api/fd/form/data/filterLink', data)
    .then((resp) => resp.data)
}

export const getFormConf = (appId, menuId) => {
  return instance //
    .get(`/enterprise-api/fd/form/designer/${appId}/${menuId}`)
    .then((resp) => resp.data)
}

// 获取指定表单指定控件提交过的值列表
export const listField = (data) => {
  return instance.post(`/enterprise-api/fd/form/data/getFieldListNotPage`, data)
}
