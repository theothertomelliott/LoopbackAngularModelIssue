module.exports = function(ModelA) {

   ModelA.prototype.hello = function(cb) {
     cb(null,"Hello: " + this.name);
   }

   ModelA.remoteMethod(
     'hello',
     {
       isStatic: false,
       http: { verb: 'get' },
       returns: {arg: 'message', type: 'string'}
     }
   );

};
