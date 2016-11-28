MangoPaySDK.card = {

    /**
     * Status of card
     */
    status: {
        CREATED: 'CREATED',
        ERROR: 'ERROR',
        VALIDATED: 'VALIDATED'
    },

    /**
     * Types of card
     */
    type: {
        DINERS: 'DINERS',
        IDEAL: 'IDEAL',
        MAESTRO: 'MAESTRO',
        MASTERPASS: 'MASTERPASS',
        P24: 'P24',
        VISA_MASTERCARD: 'CB_VISA_MASTERCARD'
    },

    /**
     * Creates a new card
     * @param obj
     * @param callback
     */
    create: function (obj, cr, callback) {
        if (!(obj instanceof MangoPaySDK.card.Card)) {
            throw new Error('obj is not instance of Card');
        }
        if (!(cr instanceof MangoPaySDK.cardRegistraton.CardRegistration)) {
          console.log(cr);
            throw new Error('cr is not instance of CardRegistration');
        }

        // Cast Card to CardRegistration
        //var cr = new MangoPaySDK.cardRegistraton.CardRegistration(obj);

        // Create the card registration

        // Send card details
        console.log("posting to ", cr.CardRegistrationURL, cr);
        HTTP.post(cr.CardRegistrationURL, {
            params: {
                data: cr.PreregistrationData,
                accessKeyRef: cr.AccessKey,
                cardNumber: obj.CardNumber,
                cardExpirationDate: obj.CardExpirationDate,
                cardCvx: String(obj.CardCvx)
            }
        }, function (err, result2) {
            if (err || !result2 || result2.statusCode !== 200 || !result2.content || result2.content.indexOf('error') === 0) {
              console.log("ERROR MANGO REG CARD", err);
                MangoPayClient.callback(err, result2, callback);
            } else {
              console.log("NO error MANGO REG CARD", err, result2);
              MangoPayClient.callback(null, {data:{
                CardRegistrationId: cr.CardRegistrationId,
                RegistrationData: result2.content
              }}, callback);

            }
        });
    },

    /**
     * Fetches the card by Id
     * @param cardId
     * @param callback
     */
    fetch: function (cardId, callback) {
        if (typeof cardId !== 'number' && typeof cardId !== 'string') {
            throw new Error('cardId is not valid');
        }
        MangoPayClient.get('/cards/' + cardId, null, callback);
    },

    /**
     * Updates the card by Id
     * @param cardId
     * @param obj
     * @param callback
     */
    update: function (cardId, obj, callback) {
        if (typeof cardId !== 'number' && typeof cardId !== 'string') {
            throw new Error('cardId is not valid');
        }
        if (typeof obj !== 'object' || obj === null) {
            throw new Error('obj is not valid');
        }
        MangoPayClient.put('/cards/' + cardId, obj, callback);
    },

    /**
     * A payment card
     * @param options
     * @constructor
     */
    Card: function (options) {
        this.CardCvx = null;
        this.CardExpirationDate = null;
        this.CardNumber = null;
        this.CardType = null;
        this.Currency = null;
        this.UserId = null;

        _.extend(this, options);
    }
};
