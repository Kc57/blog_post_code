'use strict;'

if (Java.available) {
  Java.perform(function() {

    //Cipher stuff
    const Cipher = Java.use('javax.crypto.Cipher');

    Cipher.init.overload('int', 'java.security.Key').implementation = function (opmode, key) {

      var args = [];
      var details = [];

      var opmodeString = this.getOpmodeString(opmode);
      var algo = this.getAlgorithm();

      args.push({'name': 'opmode', 'value': opmodeString});
      args.push({'name': 'key', 'value': key.$className});

      details.push({'name': 'key', 'value': algo});

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
