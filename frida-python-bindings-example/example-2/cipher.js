'use strict;'

if (Java.available) {
  Java.perform(function() {

    //Cipher stuff
    const Cipher = Java.use('javax.crypto.Cipher');

    Cipher.init.overload('int', 'java.security.Key').implementation = function (opmode, key) {

      send('Entering Cipher.init()');
      send('opmode: ' + opmode);
      send('key: ' + key);
      send('Leaving Cipher.init()');
      //console.log('');

      // call original init method
      this.init.overload('int', 'java.security.Key').call(this, opmode, key);
    }

  }
)}
