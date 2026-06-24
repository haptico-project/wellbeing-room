import CheckoutResource from "./checkoutResource";

export default class CheckoutService {

  public static checkouForPaymanage(priceId: string, agencyCode: string, subscription: boolean, oneTimePriceIds: string[] = []) {
    if (subscription) {
      return this.checkoutSubscriptionForPaymanage(priceId, agencyCode, oneTimePriceIds);
    } else {
      return this.checkoutPaymentForPaymanage(priceId, agencyCode);
    }
  }

  // 決済完了/中断の戻り先 URL に目印を付け、戻った直後に通知メールの案内ダイアログを出せるようにする。
  private static checkoutReturnUrls() {
    const successUrl = new URL(window.location.href);
    successUrl.searchParams.set('checkout', 'success');
    const cancelUrl = new URL(window.location.href);
    cancelUrl.searchParams.set('checkout', 'cancel');
    return { successUrl: successUrl.toString(), cancelUrl: cancelUrl.toString() };
  }

  public static checkoutPaymentForPaymanage(priceId: string, agencyCode: string) {
    const { successUrl, cancelUrl } = this.checkoutReturnUrls();
    const data = {
      agencyCode: agencyCode,
      checkoutSuccessUrl: successUrl,
      checkoutCancelUrl: cancelUrl,
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
    const { successUrl, cancelUrl } = this.checkoutReturnUrls();
    const data = {
      agencyCode: agencyCode,
      checkoutSuccessUrl: successUrl,
      checkoutCancelUrl: cancelUrl,
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
