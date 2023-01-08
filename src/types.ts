declare const satoshisSymbol: unique symbol
export type Satoshis = number & { [satoshisSymbol]: never }

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type Json = { [key: string]: any }

export type FetcGetArgs = {
  url: string
  params?: Json
}

export type LnUrlWithdrawServiceArgs = {
  lnUrl: string
  onionAllowed?: boolean
  fetchGet?: (args: FetcGetArgs) => Promise<Json>
}

export type LnUrlWithdrawServiceResponse = {
  callback: string
  k1: string
  invoiceDescription: string
  min: Satoshis
  max: Satoshis
  fixed: boolean
  domain?: string
  rawData: { [key: string]: string | number }
}

export type LnUrlRequestPaymentBaseArgs = {
  invoice: string
  onionAllowed?: boolean
  fetchGet?: (args: FetcGetArgs) => Promise<Json>
  validateInvoice?: boolean
}

export type LnUrlRequestPaymentWithServiceParamsArgs =
  LnUrlRequestPaymentBaseArgs & {
    params: LnUrlWithdrawServiceResponse
  }

export type LnUrlRequestPaymentArgs = LnUrlRequestPaymentBaseArgs & {
  lnUrl: string
}

export type LnUrlRequestPaymentResponse = {
  sent: boolean
  invoice: string
  hasValidAmount: boolean
  hasValidDescription: boolean
  params: LnUrlWithdrawServiceResponse
}
