export const PATHS = {
  GET: {
    WORK_PATH: '/get-work',
    USER_PATH: '/get-user',
    USER_ICOM_IMG_PATH: '/get-user-icon-img',
    WORKS_LIST_PATH: '/get-works-list',
    S3_PRESIGNED_URL_PATH: '/get-s3-presigned-url',
    S3_PRESIGNED_URL_FOR_USER_ICON_PATH: '/get-s3-presigned-url-for-user-icon'
  },
  POST: {
    NEW_WORK_PATH: '/post-work',
    NEW_USER_PATH: '/post-user',
    UPDATE_USER_PATH: '/update-user'
  },
  BASE_URL: 'https://dev-first-step-works.s3-ap-northeast-1.amazonaws.com',
  ICONS_FOLDER_URL: 'http://d3gb33njhqlz7c.cloudfront.net/icons'
}

export const API_GATEWAY = {
  NAME: 'dev-first-step'
}