'use strict;'

if (Java.available) {
  Java.perform(function() {

    //Cipher stuff
    const Cipher = Java.use('javax.crypto.Cipher');

    Cipher.init.overload('int', 'java.security.Key').implementation = function (opmode, key) {

      var args = [];
      args.push({'name': 'opmode', 'value': opmode});
      args.push({'name': 'key', 'value': key.toString()});

      var send_message = {
        'method': 'javax.crypto.Cipher.init',
        'args': args
      };

      send(send_message);

      // call original init method
      this.init.overload('int', 'java.security.Key').call(this, opmode, key);
    }

  }
)}
