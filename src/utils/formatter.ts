export const formatLinuxTimeToLocaleDate = (linuxTime: number) => (new Date(linuxTime * 1000)).toLocaleDateString()
export const formatResponseForWorks = (resList: any) => {
  return resList.map((item: any) => {
    return {
      workId: item.work_id,
      title: item.title,
      description: item.description,
      userId: item.user_id,
      userName: item.user_name,
      userIconImg: item.user_icon_img,
      postedAt: formatLinuxTimeToLocaleDate(item.posted_at)
    }
  })
}