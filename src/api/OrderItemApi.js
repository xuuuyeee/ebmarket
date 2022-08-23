import request from '@/api/index'

export default {
  getOrderItem: (id) => request({
    url: '/orderItem',
    method: 'GET',
    params: { id }
  })
}
