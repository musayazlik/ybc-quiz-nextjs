var Iyzipay = require("iyzipay")
import { db } from "@/libs/firebase"
import { set, ref, push } from "firebase/database"
import Swal from "sweetalert2"
import { uid } from "uid"

export default async function handler(req, res) {
  const { method } = req

  let iyzipay = new Iyzipay({
    apiKey: process.env.IYZIPAY_API_KEY,
    secretKey: process.env.IYZIPAY_SECRET_KEY,
    uri: "https://sandbox-api.iyzipay.com",
  })

  switch (method) {
    case "POST":
      try {
        if (req.body.token) {
          res.status(200).json({ success: true, data: req.body })
          let request = {
            locale: Iyzipay.LOCALE.EN,
            token: req.body.token,
          }
          iyzipay.checkoutForm.retrieve(request, async function (err, result) {
            if (err) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: err.message,
              })
            } else {
              const data = result
              console.log(data)

              // if (data.paymentStatus == "SUCCESS") {
              //   await Order.updateOne(
              //     { paymentToken: req.body.token },
              //     {
              //       paymentResult: true,
              //       orderKey: orderKey,
              //       paymentId: data.paymentId,
              //     }
              //   ).exec()

              //   const orderDetail = await Order.findOne({
              //     paymentToken: req.body.token,
              //   })
              //     .select(["email", "orderKey"])
              //     .exec()

              //   // E-posta gövdesi ve başlığı
              //   const mailOptions = {
              //     from: "info@interactspacez.com",
              //     to: orderDetail.email,
              //     subject: "TEST EMAIL",
              //     text: `Your order key is ${orderDetail.orderKey}`,
              //   }

              //   // E-postayı gönder
              //   transporter.sendMail(mailOptions, (error, info) => {
              //     if (error) {
              //       console.log(error)
              //     } else {
              //     }
              //   })

              //   res.writeHead(302, {
              //     Location: "/payment/success",
              //   })
              //   res.end()
              // } else {
              //   res.redirect(process.env.APP_URL + "/payment/error")
              // }
            }
          })
        } else {
          let price = req.body.locale === "tr" ? 9.99 * 19 : 9.99
          let userId = uid(10)
          let conversationId = uid(10)
          let basketId = uid(10)

          let basketItems = [
            {
              id: "BI101",
              name: "Premium Package",
              category1: "Package",
              itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
              price: price,
            },
          ]

          let request = {
            conversationId: conversationId,
            price: price,
            locale:
              req.body.locale === "tr" ? Iyzipay.LOCALE.TR : Iyzipay.LOCALE.EN,
            paidPrice: price,
            currency:
              req.body.locale === "tr"
                ? Iyzipay.CURRENCY.TRY
                : Iyzipay.CURRENCY.USD,
            basketId: basketId,
            paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
            callbackUrl: process.env.NEXT_PUBLIC_APP_URL + "/api/payments",
            cancelUrl: process.env.NEXT_PUBLIC_APP_URL,
            buyer: {
              id: userId,
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              identityNumber: "11111111111",
              registrationAddress: req.body.address,
              ip: "1.1.1.1",
              city: req.body.city,
              country: req.body.country,
            },
            shippingAddress: {
              contactName: req.body.name + " " + req.body.surname,
              city: req.body.city,
              country: req.body.country,
              address: req.body.address,
            },
            billingAddress: {
              contactName: req.body.name + " " + req.body.surname,
              city: req.body.city,
              country: req.body.country,
              address: req.body.address,
            },
            basketItems: basketItems,
          }

          iyzipay.checkoutFormInitialize.create(
            request,
            async function (err, result) {
              if (err) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                  footer: result.errorMessage,
                })
              } else {
                const ordersSet = {
                  conversationId,
                  basketId,
                  name: req.body.name,
                  surname: req.body.surname,
                  email: req.body.email,
                  address: req.body.address,
                  city: req.body.city,
                  country: req.body.country,
                  basketItems,
                  paymentResult: false,
                  paymentToken: result.token,
                  totalPrice: price,
                }

                push(ref(db, "/orders"), ordersSet)
                  .then(() => {
                    console.log("Order added")
                  })
                  .catch((err) => {
                    console.log(err)
                  })
                const data = result
                res.status(200).json({ data })
              }
            }
          )
        }
      } catch (error) {
        res.status(400).json({ message: error.message })
      }
      break

    default:
      res.status(400).json({ message: "Bad Request" })
      break
  }
}
