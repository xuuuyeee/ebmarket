import request from '@/api/index'

export default {
  getList: (current) => request({
    url: '/order/getAll',
    method: 'GET',
    params: { current: current }
  }),
  getOne: (id) => request({
    url: '/order/getOne',
    method: 'GET',
    params: { id: id }
  }),
  updateOne: (data) => request({
    url: '/order/updateOrder',
    method: 'PUT',
    data
  }),
  deleteOne: (id) => request({
    url: '/order',
    method: 'DELETE',
    params: { id: id }
  }),
  getByUsername: (userName) => request({
    url: '/order/search',
    method: 'GET',
    params: userName
  })
}
