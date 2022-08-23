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
    method: 'GET',
    params: userName
  }),
  getByOrderId: (orderId) => request({
    url: '/returnOrder/search',
    method: 'GET',
    params: orderId
  }),
  takeOver: (orderId, reason) => request({
    url: '/returnOrder/takeOver',
    method: 'POST',
    params: { id: orderId, reason }
  })
}
