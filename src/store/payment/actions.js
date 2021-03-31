import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/Payments'

export async function loadPayments ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchPaymentsBegin')
  try {
    cleanFilter(filter)
    const currentPage = {
      page: page,
      limit: limit
    }
    const queryParams = new URLSearchParams({
      ...filter,
      ...currentPage
    }).toString()
    const response = await httpClient.get(`${endPoint}?${queryParams}`)
    commit('fetchPaymentsSuccess', {
      data: response.data,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchPaymentsError', error.response)
    return null
  }
}

export async function loadPayment ({ commit, dispatch }, id) {
  try {
    commit('fetchPaymentBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchPaymentSuccess', response)
  } catch (error) {
    commit('fetchPaymentError', error.response)
  }
}

export async function savePayment ({ commit }, { id, status }) {
  commit('savePaymentBegin')
  try {
    await httpClient.put(`${endPoint}/${id}`, { status: status })
    commit('savePaymentSuccess')
  } catch (error) {
    commit('savePaymentError', error.response)
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
