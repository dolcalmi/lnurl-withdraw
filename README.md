# Lnurl-withdraw

Client library for lnurl-withdraw

## Installation

Install the package with:

```bash
npm i lnurl-withdraw
# or
yarn add lnurl-withdraw
```

## Usage

### LNURL

```js
import { requestPayment } from 'lnurl-withdraw'

const { sent, params, invoice, hasValidAmount, hasValidDescription } =
  await requestPayment({
    lnUrl:
      'lnurl1dp68gurn8ghj7amfw35xgunpwuh8xarpva5kueewvaskcmme9e5k7tewwajkcmpdddhx7amw9akxuatjd3mj7ar9wd6xjmn8jx0750',
    invoice: 'lntbs21210n1p3...lqpf9vcjt',
    validateInvoice: true,
  })
```

## Methods

- [requestPayment](#requestPayment) - Request a payment to a lnurl service
- [requestWithdrawServiceParams](#requestWithdrawServiceParams) - Request withdraw service params (1st step)
- [requestPaymentWithServiceParams](#requestPaymentWithServiceParams) - Request a payment to a lnurl with the given invoice and [service params](#requestWithdrawServiceParams) (2nd step)

### requestPayment

Request a payment to a lnurl service

```
{
  lnUrl: <Bech32 encoded url (lnurl) String>
  invoice: <Invoice to be paid String>
  [validateInvoice]: <True if invoice amount and description should be validated Bool> // Default to false
  [onionAllowed]: <Onion url allowed Bool> // Default to false
  [fetchGet]: <Function to make a GET request Function> // Default to axios get
}

@throws <Error>

@returns
{
  sent: <True if returned status is OK Bool>
  invoice: <Invoice param String>
  hasValidAmount: <True if the invoice amount is a valid amount according to returned min and max values Bool>
  hasValidDescription: <True if the invoice description is equal to service returned description Bool>
  params: {
    callback: <Url used to request the invoice payment String>
    k1: <Random or non-random string to identify the user's LN WALLET String>
    invoiceDescription: <Default invoice description String>
    min: <Min amount in satoshis Number>
    max: <Max amount in satoshis Number>
    fixed: <Indicates if amount must be a fixed amount Bool>
    domain: <Callback domain String>
    rawData: <Raw data returned by service Object>
  }
}
```

Example:

```node
const { sent, params, invoice, hasValidAmount, hasValidDescription } =
  await requestPayment({
    lnUrl:
      'lnurl1dp68gurn8ghj7amfw35xgunpwuh8xarpva5kueewvaskcmme9e5k7tewwajkcmpdddhx7amw9akxuatjd3mj7ar9wd6xjmn8jx0750',
    invoice: 'lntbs21210n1p3...lqpf9vcjt',
    validateInvoice: true,
  })
```

### requestWithdrawServiceParams

Request withdraw service params (1st step)

```
{
  lnUrl: <Bech32 encoded url (lnurl) String>
  [onionAllowed]: <Onion url allowed Bool> // Default to false
  [fetchGet]: <Function to make a GET request Function> // Default to axios get
}

@throws <Error>

@returns
{
  callback: <Url used to request the invoice payment String>
  k1: <Random or non-random string to identify the user's LN WALLET String>
  invoiceDescription: <Default invoice description String>
  min: <Min amount in satoshis Number>
  max: <Max amount in satoshis Number>
  fixed: <Indicates if amount must be a fixed amount Bool>
  domain: <Callback domain String>
  rawData: <Raw data returned by service Object>
}
```

Example:

```node
const params = await requestWithdrawServiceParams({
  lnUrl:
    'lnurl1dp68gurn8ghj7amfw35xgunpwuh8xarpva5kueewvaskcmme9e5k7tewwajkcmpdddhx7amw9akxuatjd3mj7ar9wd6xjmn8jx0750',
})
```

### requestPaymentWithServiceParams

Request a payment to a lnurl with the given invoice and service params (2nd step)

```
{
  params: {
    callback: <Url used to request the invoice payment String>
    k1: <Random or non-random string to identify the user's LN WALLET String>
    invoiceDescription: <Default invoice description String>
    min: <Min amount in satoshis Number>
    max: <Max amount in satoshis Number>
    fixed: <Indicates if amount must be a fixed amount Bool>
    domain: <Callback domain String>
    rawData: <Raw data returned by service Object>
  }
  invoice: <Invoice to be paid String>
  [validateInvoice]: <True if invoice amount and description should be validated Bool> // Default to false
  [onionAllowed]: <Onion url allowed Bool> // Default to false
  [fetchGet]: <Function to make a GET request Function> // Default to axios get
}

@throws <Error>

@returns
{
  sent: <True if returned status is OK Bool>
  invoice: <Invoice param String>
  hasValidAmount: <True if the invoice amount is a valid amount according to returned min and max values Bool>
  hasValidDescription: <True if the invoice description is equal to service returned description Bool>
  params: {
    callback: <Url used to request the invoice payment String>
    k1: <Random or non-random string to identify the user's LN WALLET String>
    invoiceDescription: <Default invoice description String>
    min: <Min amount in satoshis Number>
    max: <Max amount in satoshis Number>
    fixed: <Indicates if amount must be a fixed amount Bool>
    domain: <Callback domain String>
    rawData: <Raw data returned by service Object>
  }
}
```

Example:

```node
const params = await requestPaymentWithServiceParams({
  params,
  invoice: 'lntbs21210n1p3...lqpf9vcjt',
  validateInvoice: true,
})
```

## Utils

- [decodeUrl](#decodeUrl) - Decode a bech32 encoded url (lnurl) and return a url
- [isLnurl](#isLnurl) - Verify if a string is a valid lnurl value
- [parseLnUrl](#parseLnUrl) - Parse an url and return a bech32 encoded url (lnurl)
- [isOnionUrl](#isOnionUrl) - Verify if a string is an onion url

## Test

Test with Jest framework:

```bash
yarn test
```

## Build

Build production (distribution) files in **dist** folder:

```bash
yarn build
```

It generates CommonJS (in **dist/cjs** folder), ES Modules (in **dist/esm** folder), bundled and minified UMD (in **dist/umd** folder), as well as TypeScript declaration files (in **dist/types** folder).

## Local development

Run:

```bash
yarn link
# or
npm link
```

and in your test project run:

```bash
yarn link lnurl-withdraw
# or
npm link lnurl-withdraw
```

If you want to remove the symlink, run:

```bash
# in your test project
yarn unlink lnurl-withdraw
# or
npm unlink lnurl-withdraw

# in lnurl-withdraw folder
yarn unlink
# or
npm unlink
```

Please check more details in [npm link](https://docs.npmjs.com/cli/v6/commands/npm-link) or [yarn link](https://yarnpkg.com/cli/link)

## References

This library was developed based on:

- [lnurl-rfc](https://github.com/fiatjaf/lnurl-rfc)
- [js-lnurl](https://github.com/fiatjaf/js-lnurl)
- [BlueWallet](https://github.com/BlueWallet/BlueWallet)
- [Example TypeScript Package ](https://github.com/tomchen/example-typescript-package)
