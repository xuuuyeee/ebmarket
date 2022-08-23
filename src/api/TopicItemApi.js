import request from '@/api/index'

export default {
  addProductToTopic: (params) => request({
    url: '/topicItem',
    method: 'POST',
    params
  }),
  getTopicDetail: (id) => request({
    url: '/product/getByTopic',
    method: 'GET',
    params: { id: id }
  }),
  removeTopicItem: (params) => request({
    url: '/topicItem',
    method: 'DELETE',
    params
  })
}
