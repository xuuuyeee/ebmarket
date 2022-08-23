import request from '@/api/index'

export default {
  getList: () => request({
    url: '/returnOrder/getAll',
    method: 'GET'
  }),
  getOne: (orderId) => request({
    url: '/returnOrder/search',
    method: 'GET',
    params: { id: orderId }
  }),
  updateOne: (data) => request({
    url: '/returnOrder/retrieveOneByBody',
    method: 'POST',
    data
  }),
  getByUsername: (userName) => request({
    url: '/returnOrder/search',
    method: 'POST',
    params: userName
  }),
  getByOrderId: (orderId) => request({
    url: '/returnOrder/search',
    method: 'POST',
    params: orderId
  })
}
