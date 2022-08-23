import request from '@/api/index'

export default {
  searchProduct: (searchText) => {
    return request({
      url: '/product/searchByName',
      method: 'POST',
      params: { searchText }
    })
  }
}
