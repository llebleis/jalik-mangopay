Package.describe({
    name: 'jalik:mangopay-cal',
    version: '0.2.6',
    author: 'karl.stein.pro@gmail.com',
    summary: 'MangoPay REST SDK',
    homepage: 'https://github.com/jalik/jalik-mangopay',
    git: 'https://github.com/llebleis/jalik-mangopay.git',
    documentation: 'README.md',
    license: 'MIT'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');
    api.use('check');
    api.use('ecmascript@0.1.5');
    api.use('http');
    api.use('underscore');

    api.addFiles('mangopay.js');
    api.addFiles('mangopay-client.js');
    api.addFiles('api/bank.js');
    api.addFiles('api/card.js');
    api.addFiles('api/card_registration.js');
    api.addFiles('api/document.js');
    api.addFiles('api/event.js');
    api.addFiles('api/hook.js');
    api.addFiles('api/payin.js');
    api.addFiles('api/payout.js');
    api.addFiles('api/pre_authorization.js');
    api.addFiles('api/refund.js');
    api.addFiles('api/transfer.js');
    api.addFiles('api/user.js');
    api.addFiles('api/wallet.js');

    api.export('MangoPaySDK');
    api.export('MangoPayClient');
});
