import axios from 'axios'
import { API } from 'aws-amplify'
import { API_GATEWAY } from '../constants/config'

interface GetOptionI {
  headers: any,
  response: boolean,
  queryStringParameters: { name: string }
}
interface PostOptionI {
  body: any,
  headers: any,
}
interface PutOptionI {
  headers: { 'Content-Type': string }
}
const get = (path: string, option: Partial<GetOptionI> = {}): Promise<any> => {
  return API.get(API_GATEWAY.NAME, path, option)
}
const post = (path: string, option: Partial<PostOptionI> = {}): Promise<any> => {
  return API.post(API_GATEWAY.NAME, path, option)
}
const put = (path: string, file: File | undefined, option: Partial<PutOptionI> = {}): Promise<any> => {
  return axios.put(path, file, option)
}
export default { API_GATEWAY: { get, post }, S3: { put } }