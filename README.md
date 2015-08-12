# Model instance replaced with remote method result in Angular call to Loopback

This repo is a minimal example to demonstrate the problem described in a [Stackoverflow Question](http://stackoverflow.com/questions/31823169/model-instance-replaced-with-remote-method-result-in-angular-call-to-loopback).

The project can be run with the command `node .` and will launch under http://localhost:3000. There is also a [Plunker example](http://plnkr.co/edit/NCAIluDBHVSp1lpShaiZ).

I have a Loopback API with an Angular front end, and have been seeing some strange behavior when trying to call a non-static remote method.

I've boiled it down to this example. When making a call like this:

    $scope.myInstance = MyModel.findOne({}, function success(value){
      $scope.greeting = value.$prototype$hello({}, function success(){});
    });

I'm finding that $scope.myInstance ends up containing the result of the call to $prototype$hello and $scope.greeting is empty. MyModel is defined with a remote call like this:

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

So if I have this in my template:

    Greeting = {{ greeting }}, Instance = {{ myInstance }}

I see:

> Greeting = {}, Instance = {"message":"Hello: Test","$promise":{},"$resolved":true}

With the greeting result clearly in place of the model instance. There is a brief flash of the model during loading.

I can work around this by retrieving additional throwaway instances of the model, but I'm hoping someone knows why this is happening and if there's a cleaner solution.
