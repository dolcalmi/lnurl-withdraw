import axios from 'axios'
import { validWithdrawServiceParams } from './helper'
import { requestWithdrawServiceParams } from '../src/request-withdraw-service-params'

jest.mock('axios')

describe('requestWithdrawServiceParams', () => {
  test.each(validWithdrawServiceParams)(
    '$lnUrlOrAddress returns valid params',
    async ({ lnUrl, serviceParams: data, serviceParamsExpected }) => {
      axios.get = jest.fn().mockResolvedValueOnce({ data })
      const result = await requestWithdrawServiceParams({ lnUrl })
      expect(result).toMatchObject(serviceParamsExpected)
    }
  )
})
