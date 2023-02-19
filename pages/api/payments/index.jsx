import Iyzipay from "iyzipay"

export default function (req, res) {
  let iyzipay = new Iyzipay({
    apiKey: process.env.IYZIPAY_API_KEY,
    secretKey: process.env.IYZIPAY_SECRET_KEY,
    uri: "https://sandbox-api.iyzipay.com",
  })

  let request = {
    locale: Iyzipay.LOCALE.EN,
    conversationId: "123456789",
    paidPrice: "100",
    price: "100",
    currency: Iyzipay.CURRENCY.USD,
    basketId: "B67832",
    paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
    paymentCard: {
      cardHolderName: "John Doe",
      cardNumber: "4054180000000007",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: 0,
    },
    enabledInstallments: [2, 3, 6, 9],
    buyer: {
      id: "BY789",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "74300864791",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationDate: "2013-04-21 15:12:09",
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
    },
    billingAddress: {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
    },
    basketItems: [
      {
        id: "BI103",
        name: "Usb",
        category1: "Electronics",
        category2: "Usb / Cable",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "100",
      },
    ],
  }

  iyzipay.payment.create(request, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.status(200).json(result)
    }
  })
}
