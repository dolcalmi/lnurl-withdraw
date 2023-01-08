import axios from 'axios'
import { validWithdrawServiceParams } from './helper'
import { requestPayment } from '../src/request-payment'

jest.mock('axios')

describe('requestPayment', () => {
  test.each(validWithdrawServiceParams)(
    'request a payment successfully to $lnUrl',
    async ({
      lnUrl,
      invoice,
      serviceParams,
      serviceParamsExpected,
      serviceResponse,
    }) => {
      axios.get = jest
        .fn()
        .mockResolvedValueOnce({ data: serviceParams })
        .mockResolvedValueOnce({ data: serviceResponse })
      const result = await requestPayment({
        lnUrl,
        invoice,
        validateInvoice: true,
      })
      expect(result).toMatchObject({
        sent: true,
        params: { ...serviceParamsExpected },
        invoice,
        hasValidAmount: true,
        hasValidDescription: true,
      })
    }
  )

  test.each(validWithdrawServiceParams)(
    '$lnUrl throws with invalid amount',
    async ({ lnUrl, invoice, serviceParams, serviceResponse }) => {
      const params = {
        ...serviceParams,
        minWithdrawable: 1000,
        maxWithdrawable: 2000,
      }
      axios.get = jest
        .fn()
        .mockResolvedValueOnce({ data: params })
        .mockResolvedValueOnce({ data: serviceResponse })

      await expect(async () => {
        await requestPayment({
          lnUrl,
          invoice,
          validateInvoice: true,
        })
      }).rejects.toThrowError(
        /Invalid invoice amount \d+ sats. Expected min: 1 - max: 2/
      )
    }
  )

  test.each(validWithdrawServiceParams)(
    '$lnUrl throws with invalid description',
    async ({ lnUrl, invoice, serviceParams, serviceResponse }) => {
      const params = {
        ...serviceParams,
        defaultDescription: 'Other description',
      }
      axios.get = jest
        .fn()
        .mockResolvedValueOnce({ data: params })
        .mockResolvedValueOnce({ data: serviceResponse })

      await expect(async () => {
        await requestPayment({
          lnUrl,
          invoice,
          validateInvoice: true,
        })
      }).rejects.toThrowError(
        "Invalid invoice description 'Some description'. Expected 'Other description'"
      )
    }
  )
})
