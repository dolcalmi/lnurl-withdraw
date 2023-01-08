import type {
  LnUrlWithdrawServiceArgs,
  LnUrlWithdrawServiceResponse,
} from './types'
import { decodeUrl, isOnionUrl, checkedToSats, getJson, isUrl } from './utils'

const TAG_WITHDRAW_REQUEST = 'withdrawRequest'

export const requestWithdrawServiceParams = async ({
  lnUrl,
  onionAllowed = false,
  fetchGet = getJson,
}: LnUrlWithdrawServiceArgs): Promise<LnUrlWithdrawServiceResponse> => {
  const url = decodeUrl(lnUrl)
  if (!isUrl(url)) throw new Error('Invalid lnUrl')
  if (!onionAllowed && isOnionUrl(url))
    throw new Error('Onion requests not allowed')

  const json = await fetchGet({ url })
  const params = parseLnUrlWithdrawServiceResponse(json)
  if (!params) throw new Error('Invalid withdraw service params')

  return params
}

/**
 * Parse the ln service response to LnUrlWithdrawServiceResponse
 * @method parseLnUrlWithdrawServiceResponse
 * @param  data object to parse
 * @return  LnUrlWithdrawServiceResponse
 */
const parseLnUrlWithdrawServiceResponse = (data: {
  [key: string]: string | number
}): LnUrlWithdrawServiceResponse | null => {
  if (data.tag !== TAG_WITHDRAW_REQUEST) return null

  const callback = (data.callback + '').trim()
  if (!isUrl(callback)) return null

  const k1 = (data.k1 + '').trim()
  if (!k1) return null

  const invoiceDescription = (data.defaultDescription + '').trim()
  const min = checkedToSats(Math.ceil(Number(data.minWithdrawable || 0) / 1000))
  const max = checkedToSats(Math.floor(Number(data.maxWithdrawable) / 1000))
  if (!(min && max) || min > max) return null

  let domain
  try {
    domain = new URL(callback).hostname
  } catch {
    // fail silently and let domain remain undefined if callback is not a valid URL
  }

  return {
    callback,
    k1,
    invoiceDescription,
    min,
    max,
    fixed: min === max,
    domain,
    rawData: data,
  }
}
