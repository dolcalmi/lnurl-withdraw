import axios, { AxiosError } from 'axios'
import isURL from 'is-url'
import { bech32 } from 'bech32'
import * as bolt11 from 'bolt11'

import type { Satoshis } from './types'

const LNURL_REGEX =
  /^(?:http.*[&?]lightning=|lightning:)?(lnurl[0-9]{1,}[02-9ac-hj-np-z]+)/

const ONION_REGEX = /^(http:\/\/[^/:@]+\.onion(?::\d{1,5})?)(\/.*)?$/

/**
 * Decode a bech32 encoded url (lnurl) and return a url
 * @method decodeUrlOrAddress
 * @param  lnUrl string to decode
 * @return  plain url or null if is an invalid url or lightning address
 */
export const decodeUrl = (lnUrl: string): string | null => {
  const bech32Url = parseLnUrl(lnUrl)
  if (bech32Url) {
    const decoded = bech32.decode(bech32Url, 20000)
    return Buffer.from(bech32.fromWords(decoded.words)).toString()
  }

  return null
}

/**
 * Parse an url and return a bech32 encoded url (lnurl)
 * @method parseLnUrl
 * @param  url string to parse
 * @return  bech32 encoded url (lnurl) or null if is an invalid url
 */
export const parseLnUrl = (url: string): string | null => {
  if (!url) return null
  const result = LNURL_REGEX.exec(url.toLowerCase())
  return result ? result[1] : null
}

/**
 * Verify if a string is a valid lnurl value
 * @method isLnurl
 * @param  url string to validate
 * @return  true if is a valid lnurl value
 */
export const isLnurl = (url: string): boolean => {
  if (!url) return false
  return LNURL_REGEX.test(url.toLowerCase())
}

/**
 * Verify if a string is an url
 * @method isUrl
 * @param  url string to validate
 * @return  true if is an url
 */
export const isUrl = (url: string | null): url is string => {
  if (!url) return false
  try {
    return isURL(url)
  } catch {
    return false
  }
}

/**
 * Verify if a string is an onion url
 * @method isOnionUrl
 * @param  url string to validate
 * @return  true if is an onion url
 */
export const isOnionUrl = (url: string | null): boolean => {
  return isUrl(url) && ONION_REGEX.test(url.toLowerCase())
}

/**
 * Parse a number to Satoshis
 * @method checkedToSats
 * @param  value number to parse
 * @return  Satoshis or null
 */
export const checkedToSats = (value: number): Satoshis | null => {
  if (value && value >= 0) return toSats(value)
  return null
}

/**
 * Cast a number to Satoshis type
 * @method toSats
 * @param  value number to cast
 * @return  Satoshis
 */
export const toSats = (value: number): Satoshis => {
  return value as Satoshis
}

export const isValidAmount = ({
  amount,
  min,
  max,
}: {
  amount: number
  min: number
  max: number
}): boolean => {
  const isValid = amount > 0 && amount >= min && amount <= max
  const isFixed = min === max
  return isValid && isFixed ? amount === min : isValid
}

export const getJson = async ({
  url,
  params,
}: {
  url: string
  params?: { [key: string]: string | number }
}): Promise<{ [key: string]: string | number }> => {
  try {
    const { status, statusText, data } = await axios.get(url, { params })
    if (status >= 400 || data.status === 'ERROR')
      throw new Error(
        data.reason || data.detail || statusText || 'Invalid request'
      )
    return data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { data, statusText } = error.response
      throw new Error(
        data.reason || data.detail || statusText || 'Invalid request'
      )
    }
    throw error
  }
}

export const decodeInvoice = (
  invoice: string
): (bolt11.PaymentRequestObject & { tagsObject: bolt11.TagsObject }) | null => {
  if (!invoice) return null

  try {
    let network: bolt11.Network | undefined = undefined
    // hack to support signet invoices, remove when it is supported in bolt11
    if (invoice.startsWith('lntbs')) {
      network = {
        bech32: 'tbs',
        pubKeyHash: 0x6f,
        scriptHash: 0xc4,
        validWitnessVersions: [0, 1],
      }
    }

    return bolt11.decode(invoice, network)
  } catch {
    return null
  }
}
