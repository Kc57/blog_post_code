'use strict;'

if (Java.available) {
  Java.perform(function() {

    const Cipher = Java.use('javax.crypto.Cipher');
    const AndroidKeyStoreKey = Java.use('android.security.keystore.AndroidKeyStoreKey');
    const AndroidKeyStoreRSAPublicKey = Java.use('android.security.keystore.AndroidKeyStoreRSAPublicKey');
    const AndroidKeyStoreRSAPrivateKey = Java.use('android.security.keystore.AndroidKeyStoreRSAPrivateKey');

    const KeyFactory = Java.use('java.security.KeyFactory');
    const KeyInfo = Java.use('android.security.keystore.KeyInfo');

    Cipher.init.overload('int', 'java.security.Key').implementation = function (opmode, key) {

      var args = [];
      var details = [];

      var opmodeString = this.getOpmodeString(opmode);
      var algo = this.getAlgorithm();

      args.push({'name': 'opmode', 'value': opmodeString});
      args.push({'name': 'key', 'value': key.$className});

      details.push({'name': 'key', 'value': algo});

      if (key.$className === 'android.security.keystore.AndroidKeyStoreRSAPublicKey') {
        var pub_key = Java.cast(key, AndroidKeyStoreRSAPublicKey);
        var keystoreKey = Java.cast(key, AndroidKeyStoreKey);

        details.push({'name': 'AndroidKeyStoreKey.getAlias()', 'value': keystoreKey.getAlias()});
        details.push({'name': 'key.getPublicExponent()', 'value': pub_key.getPublicExponent().toString()});
        details.push({'name': 'key.getModulus()', 'value': pub_key.getModulus().toString()});
      }

      if (key.$className === 'android.security.keystore.AndroidKeyStoreRSAPrivateKey') {
        var priv_key = Java.cast(key, AndroidKeyStoreRSAPrivateKey);

        var factory = KeyFactory.getInstance(key.getAlgorithm(), "AndroidKeyStore");
        var keyInfo = Java.cast(factory.getKeySpec(key, KeyInfo.class), KeyInfo);

        details.push({'name': 'keyInfo.getKeystoreAlias()', 'value': keyInfo.getKeystoreAlias()});
        details.push({'name': 'keyInfo.getKeySize()', 'value': keyInfo.getKeySize().toString()});
        details.push({'name': 'keyInfo.isInsideSecureHardware()', 'value': keyInfo.isInsideSecureHardware().toString()});

        details.push({'name': 'key.getModulus()', 'value': priv_key.getModulus().toString()});
      }

      var send_message = {
        'method': 'javax.crypto.Cipher.init',
        'args': args,
        'details': details
      };

      send(send_message);

      // call original init method
      this.init.overload('int', 'java.security.Key').call(this, opmode, key);
    }

  }
)}
