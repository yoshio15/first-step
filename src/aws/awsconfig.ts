const AwsConfig = {
  Auth: {
    identityPoolId: 'ap-northeast-1:7466e2e6-7f9c-4127-a33a-50f1880ce054',
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_9Wu2HZWOt',
    userPoolWebClientId: '6qsrmoc3p7mga2acq3krcqqg42'
  },
  API: {
    endpoints: [
      {
        name: "dev-first-step-stack",
        endpoint: "https://5j5l9zh1g2.execute-api.ap-northeast-1.amazonaws.com/Stage"
      }
    ]
  }
}

export default AwsConfig