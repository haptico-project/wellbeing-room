import CheckoutResource from "./checkoutResource";

export default class CheckoutService {

  public static checkouForPaymanage(priceId: string, agencyCode: string, subscription: boolean, oneTimePriceIds: string[] = []) {
    if (subscription) {
      return this.checkoutSubscriptionForPaymanage(priceId, agencyCode, oneTimePriceIds);
    } else {
      return this.checkoutPaymentForPaymanage(priceId, agencyCode);
    }
  }

  public static checkoutPaymentForPaymanage(priceId: string, agencyCode: string) {
    const data = {
      agencyCode: agencyCode,
      checkoutSuccessUrl: window.location.href,
      checkoutCancelUrl: window.location.href,
      orderProducts: [
        {
          productId: `${priceId}`,
          quantity: 1
        }
      ]
    }
    return CheckoutResource.post(`/api/v1/checkout/payment-url`, data);
  }

  public static checkoutSubscriptionForPaymanage(priceId: string, agencyCode: string, oneTimePriceIds: string[] = []) {
    const data = {
      agencyCode: agencyCode,
      checkoutSuccessUrl: window.location.href,
      checkoutCancelUrl: window.location.href,
      orderProducts: [
        {
          productId: `${priceId}`,
          quantity: 1
        }
      ],
      oneTimePriceIds
    }
    return CheckoutResource.post(`/api/v1/checkout/subscription-url`, data);
  }

  public static getSubscriptionPortalUrl(shopId: string, mailAddress: string, returnUrl: string) {
    return CheckoutResource.get('/api/v1/subscription/portal-url', {
      params: {
        shopId,
        mail_address: mailAddress,
        return_url: returnUrl
      }
    });
  }
}
