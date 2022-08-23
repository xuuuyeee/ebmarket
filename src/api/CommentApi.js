import request from '@/api/index'

export default {
  addOne: (data) => {
    return request({
      url: '/comment',
      method: 'POST',
      data
    })
  }
}
