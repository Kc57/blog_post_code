'use strict;'

if (Java.available) {
  Java.perform(function() {

    //Cipher stuff
    const Cipher = Java.use('javax.crypto.Cipher');

    Cipher.init.overload('int', 'java.security.Key').implementation = function (opmode, key) {

      console.log('[+] Entering Cipher.init()');
      console.log('[ ] opmode: ' + opmode);
      console.log('[ ] key: ' + key.toString());
      console.log('[-] Leaving Cipher.init()');
      console.log('');

      // call original init method
      this.init.overload('int', 'java.security.Key').call(this, opmode, key);
    }

  }
)}
