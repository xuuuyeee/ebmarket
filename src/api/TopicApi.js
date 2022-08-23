import request from '@/api/index'

export default {
  getList: () => request({
    url: '/topic/getAll',
    method: 'GET'
  }),
  getOne: (id) => request({
    url: '/topic/' + id,
    method: 'GET'
  }),
  addOne: (params) => request({
    url: '/topic',
    method: 'POST',
    params
  }),
  updateOne: (data) => request({
    url: '/topic',
    method: 'PUT',
    data
  }),
  deleteOne: (id) => {
    return request({
      url: '/topic',
      method: 'DELETE',
      params: { id: id }
    })
  }
}
