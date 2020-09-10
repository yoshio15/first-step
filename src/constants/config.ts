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

export const MESSAGES = {
  LOGIN_FAILED: 'IDまたはパスワードが違います。',
  SIGNUP_FAILED: '新規登録に失敗しました。時間をおいて再度お試しください。',
  NETWORK_ERROR: 'ネットワークが切断されました。',
  UNKNOWN_ERROR: '不明なエラーが発生しました。時間をおいて再度お試しください。',
  MISSING_PARAMETERS: 'ユーザ名/パスワードは入力必須です。',
  NO_CONFIRMED_USER: 'メールアドレスが認証されていません。',
  MISSING_PARAMETERS_SIGNUP: 'ユーザ名・メールアドレス・パスワード全て入力必須です。',
  PASSWORD_MISMATCH: 'パスワードが一致しませんでした。もう一度確認してください。',
  TITLE_IS_TOO_LONG: '作品タイトルは50文字以内で入力してください。',
  DESCRIPTION_IS_TOO_LONG: '作品説明は400文字以内で入力してください。',
  BAD_FILE_TYPE: '拡張子が「.html」であるファイルを添付してください。',
  USER_NAME_IS_TOO_LONG: 'ユーザ名は30文字以内で入力してください。',
  USER_SUMMARY_IS_TOO_LONG: '自己紹介文は400文字以内で入力してください。'
}

export const DIALOG_TITLE = {
  POST_WORK: '投稿確認',
  EDIT_PROFILE: '編集確認'
}

export const DIALOG_MESSAGES = {
  POST_WORK: '本当に作品を登録してよろしいですか？',
  EDIT_PROFILE: 'プロフィールを編集します。よろしいですか？'
}

export const DIALOG_EXEC_MSG = {
  POST_WORK: '投稿する',
  EDIT_PROFILE: '編集する'
}

export class APP_CONF {
  static readonly INITIAL_WORKS_TO_DISPLAY = 5
  static readonly ADDITIONAL_WORKS_TO_DISPLAY = 5
}