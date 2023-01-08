import {
  decodeInvoice,
  getJson,
  isOnionUrl,
  isUrl,
  isValidAmount,
} from './utils'
import type {
  LnUrlRequestPaymentArgs,
  LnUrlRequestPaymentResponse,
  LnUrlRequestPaymentWithServiceParamsArgs,
} from './types'
import { requestWithdrawServiceParams } from './request-withdraw-service-params'

export const requestPaymentWithServiceParams = async ({
  params,
  invoice,
  validateInvoice = false,
  onionAllowed = false,
  fetchGet = getJson,
}: LnUrlRequestPaymentWithServiceParamsArgs): Promise<LnUrlRequestPaymentResponse> => {
  const { callback, k1, invoiceDescription, min, max } = params

  if (!isUrl(callback)) throw new Error('Callback must be a valid url')
  if (!(k1 + '').trim()) throw new Error('K1 must be a valid value')
  if (!onionAllowed && isOnionUrl(callback))
    throw new Error('Onion requests not allowed')

  const decodedInvoice = decodeInvoice(invoice)
  if (!decodedInvoice || !decodedInvoice.satoshis)
    throw new Error('Invalid invoice')

  const hasValidAmount = isValidAmount({
    amount: decodedInvoice.satoshis,
    min,
    max,
  })
  if (validateInvoice && !hasValidAmount)
    throw new Error(
      `Invalid invoice amount ${decodedInvoice?.satoshis} sats. Expected min: ${min} - max: ${max}`
    )

  const description = decodedInvoice.tags.find(
    (t) => t.tagName === 'description'
  )
  const hasValidDescription =
    !!invoiceDescription && description?.data === invoiceDescription
  if (validateInvoice && !hasValidDescription)
    throw new Error(
      `Invalid invoice description '${description?.data}'. Expected '${invoiceDescription}'`
    )

  const paymentParams: { k1: string; pr: string } = { k1, pr: invoice }
  const data = await fetchGet({ url: callback, params: paymentParams })
  const status = data && data.status && data.status.toUpperCase()

  return {
    sent: status === 'OK',
    params,
    invoice,
    hasValidAmount,
    hasValidDescription,
  }
}

export const requestPayment = async ({
  lnUrl,
  invoice,
  validateInvoice = false,
  onionAllowed = false,
  fetchGet = getJson,
}: LnUrlRequestPaymentArgs): Promise<LnUrlRequestPaymentResponse> => {
  const params = await requestWithdrawServiceParams({
    lnUrl,
    onionAllowed,
    fetchGet,
  })
  return requestPaymentWithServiceParams({
    params,
    invoice,
    validateInvoice,
    onionAllowed,
    fetchGet,
  })
}
