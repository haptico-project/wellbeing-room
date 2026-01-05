export default class ContactService {

  public static createMailToLink(): string {

    // メーラー起動用のリンクを動的に生成
    const emailAddress = 't_ikeda@fyt.co.jp';
    const emailSubject = 'wellbeing room お問い合わせ';
    const emailBody = `お世話になります。

Wellbeing Room の件で問い合わせさせていただきます。

------------------------------
【ご担当者名】:
【会社名・施設名】:
【連絡先（電話番号）】:
【具体的なご相談内容】:
------------------------------
`;

    // URLエンコード: 件名に日本語が含まれるため必須
    const encodedSubject = encodeURIComponent(emailSubject);
    const mailtoLink = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodeURIComponent(emailBody)}`;

    return mailtoLink;
  }
}