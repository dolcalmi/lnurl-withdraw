export const defaultBech32Url =
  'lnurl1dp68gurn8ghj7amfw35xgunpwuh8xarpva5kueewvaskcmme9e5k7tewwajkcmpdddhx7amw9akxuatjd3mj7ar9wd6xjmn8jx0750'

export const validLnUrls = [
  `${defaultBech32Url}`,
  `${defaultBech32Url.toUpperCase()}`,
  `lightning:${defaultBech32Url}`,
  `lightning:${defaultBech32Url.toUpperCase()}`,
  `lnurlw:${defaultBech32Url}`,
  `lnurlw:${defaultBech32Url.toUpperCase()}`,
  `LIGHTNING:${defaultBech32Url}`,
  `LIGHTNING:${defaultBech32Url.toUpperCase()}`,
  `LNURLW:${defaultBech32Url}`,
  `LNURLW:${defaultBech32Url.toUpperCase()}`,
  `http://domain.com/?lightning=${defaultBech32Url}`,
  `http://domain.com/?lightning=${defaultBech32Url.toUpperCase()}`,
  `http://www.domain.com/?lightning=${defaultBech32Url}`,
  `http://www.domain.com/?lightning=${defaultBech32Url.toUpperCase()}`,
  `http://domain.com/pagina.html?lightning=${defaultBech32Url}`,
  `http://domain.com/pagina.html?lightning=${defaultBech32Url.toUpperCase()}`,
  `http://www.domain.com/pagina.html?lightning=${defaultBech32Url}`,
  `http://www.domain.com/pagina.html?lightning=${defaultBech32Url.toUpperCase()}`,
  `http://domain.com/?lnurlw=${defaultBech32Url}`,
  `http://domain.com/?lnurlw=${defaultBech32Url.toUpperCase()}`,
  `http://www.domain.com/?lnurlw=${defaultBech32Url}`,
  `http://www.domain.com/?lnurlw=${defaultBech32Url.toUpperCase()}`,
  `http://domain.com/pagina.html?lnurlw=${defaultBech32Url}`,
  `http://domain.com/pagina.html?lnurlw=${defaultBech32Url.toUpperCase()}`,
  `http://www.domain.com/pagina.html?lnurlw=${defaultBech32Url}`,
  `http://www.domain.com/pagina.html?lnurlw=${defaultBech32Url.toUpperCase()}`,
]

export const invalidLnUrls = [
  `lnurl`,
  `lightning:abcd`,
  `lightning:lnurl`,
  `lnurlw:abcd`,
  `lnurlw:lnurl`,
  `http://domain.com/?lightning=abcd`,
  `http://domain.com/?lightning=lnurl`,
  `http://www.domain.com/?lightning=abcd`,
  `http://www.domain.com/?lightning=lnurl`,
  `http://domain.com/pagina.html?lightning=abcd`,
  `http://domain.com/pagina.html?lightning=lnurl`,
  `http://www.domain.com/pagina.html?lightning=abcd`,
  `http://www.domain.com/pagina.html?lightning=lnurl`,
  `http://domain.com/?lnurlw=abcd`,
  `http://domain.com/?lnurlw=lnurl`,
  `http://www.domain.com/?lnurlw=abcd`,
  `http://www.domain.com/?lnurlw=lnurl`,
  `http://domain.com/pagina.html?lnurlw=abcd`,
  `http://domain.com/pagina.html?lnurlw=lnurl`,
  `http://www.domain.com/pagina.html?lnurlw=abcd`,
  `http://www.domain.com/pagina.html?lnurlw=lnurl`,
]
