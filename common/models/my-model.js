module.exports = function(MyModel) {

  MyModel.prototype.hello = function(cb) {
    cb(null,"Hello: " + this.name);
  }

  MyModel.remoteMethod(
    'hello',
    {
      isStatic: false,
      http: { verb: 'get' },
      returns: {arg: 'message', type: 'string'}
    }
  );

};
