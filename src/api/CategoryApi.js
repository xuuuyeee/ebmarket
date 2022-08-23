import request from '@/api/index'

export default {
  getList: () => {
    return request({
      url: '/category/getAll',
      method: 'GET'
    })
  },
  addOne: (data) => {
    return request({
      url: '/category',
      method: 'POST',
      data
    })
  },
  getOne: (id) => {
    return request({
      url: '/category/' + id,
      method: 'GET'
    })
  },
  updateOne: (data) => {
    return request({
      url: '/category',
      method: 'PUT',
      data
    })
  },
  deleteOne: (id) => {
    return request({
      url: '/category',
      method: 'DELETE',
      params: { id: id }
    })
  }
}
