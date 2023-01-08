export const validWithdrawServiceParams = [
  {
    lnUrl:
      'lnurl1dp68gurn8ghj7amfw35xgunpwuh8xarpva5kueewvaskcmme9e5k7tewwajkcmpdddhx7amw9akxuatjd3mj7ar9wd6xjmn8jx0750',
    serviceParams: {
      callback: 'https://withdraw.staging.galoy.io/.well-known/lnurlw/testing',
      k1: '1a534925-0506-4813-9b32-40b9fe08e014',
      defaultDescription: 'Some description',
      minWithdrawable: 1000,
      maxWithdrawable: 500000000,
      tag: 'withdrawRequest',
    },
    serviceParamsExpected: {
      callback: 'https://withdraw.staging.galoy.io/.well-known/lnurlw/testing',
      k1: '1a534925-0506-4813-9b32-40b9fe08e014',
      invoiceDescription: 'Some description',
      min: 1,
      max: 500000,
      fixed: false,
      domain: 'withdraw.staging.galoy.io',
    },
    invoice:
      'lntbs21210n1p3m5sklpp5cmn96nk8f2mcg6x6su2hp2q2pejdvttywsdnhpxqewz9k0v6eyzssp5uwnxllvqaj7k343wz85ra80z9qd2582v9m7jj5w97dczl5tm9cmqdq62dhk6efqv3jhxcmjd9c8g6t0dccqzynxqyz5vq9q7sqqqqqqqqqqqqqqqqqqqqqqqqq9qsqfppqz8gs90ze5ssxp355k6mug8568pacg7hgrzjqvggcgjwuwyfct2897dmusg0ghw24ehxvnky9sr0am7rcl39spvxjqwln5qqqqsqqyqqqqqqqqqqqeqqqc9t36mqsu9ngtkwnyu6rsntsquqfcnzzxjc9a3p8paswzarrn36njkszawen2rl66nka920zxkvd8r0ynmz67mj5mj8zke7ehn474jlqpf9vcjt',
    serviceResponse: { status: 'OK' },
  },
  {
    lnUrl:
      'lnurl1dp68gurn8ghj7amfw35xgunpwuh8xarpva5kueewvaskcmme9e5k7tewwajkcmpdddhx7amw9akxuatjd3mj7ar9wd6xjmn8jx0750',
    serviceParams: {
      callback: 'https://withdraw.staging.galoy.io/.well-known/lnurlw/testing',
      k1: '1a534925-0506-4813-9b32-40b9fe08e014',
      defaultDescription: 'Some description',
      minWithdrawable: 1313000,
      maxWithdrawable: 1313000,
      tag: 'withdrawRequest',
    },
    serviceParamsExpected: {
      callback: 'https://withdraw.staging.galoy.io/.well-known/lnurlw/testing',
      k1: '1a534925-0506-4813-9b32-40b9fe08e014',
      invoiceDescription: 'Some description',
      min: 1313,
      max: 1313,
      fixed: true,
      domain: 'withdraw.staging.galoy.io',
    },
    invoice:
      'lntbs13130n1p3m5jx0pp5qyu4pf4dpynl70t8d77vxlhnmrex50pyvdv2jk757t8pvt2umjlssp558yny30u3gfvylllznz9wpe2k2md0mg3e2nqpux8wdwqx67aykpsdq62dhk6efqv3jhxcmjd9c8g6t0dccqzynxqyjw5q9q7sqqqqqqqqqqqqqqqqqqqqqqqqq9qsqfppqjkh4rtgz4jstd30kda9e0mra8l5ffptvrzjqvggcgjwuwyfct2897dmusg0ghw24ehxvnky9sr0am7rcl39spvxjqwln5qqqqsqqyqqqqqqqqqqqeqqqcwgllwwrg0myfu38hv0fw5cua2gpycyrxkqdn8cr03q70ugyvj3xs5kd4ph3lat7udp35fn2utnql7av3nvfxvl2r94mdjsyts5xpuwcpavxr83',
    serviceResponse: { status: 'OK' },
  },
]
