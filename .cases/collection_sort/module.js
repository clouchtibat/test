Tests = new Mongo.Collection('tests');

if(Meteor.isClient){

  console.log("flmsdkfmlskfmlsdkfmlskflmskdfmls");
  
  angular.module("tests", [
    "angular-meteor"
  ])

  .controller("subscribes", function($scope, $meteorCollection, $meteorUtils, $meteorSubscribe) {

    $scope.updateSort = function(){
      $scope.sort = !$scope.sort;
    };
    
    $scope.tests = $meteorCollection(Tests, false);
    
    $meteorUtils.autorun($scope, function() {
      $meteorSubscribe.subscribe("filteredTests", "", $scope.getReactively('sort'));
    });    

  }); 

}


if(Meteor.isServer){

  Tests.allow({
    insert: function () {
      return true; 
    },
    update:function(){
      return true;       
    },
    remove:function(){
      return true;       
    }
  });   
  
  Meteor.publish('tests', function() {
    
    console.info("publish tests");
    
    return Tests.find();
  });
    
  Meteor.publish("filteredTests", function(filter, reverseSort) {
    
    console.info("publish filtered tests with filter '"+filter+"' and reverseSort to "+reverseSort);
    
    var config = {};

    if(filter){
      config.name = new RegExp(".*"+filter+".*", "i");
    }
    return Tests.find(config, {sort: {name: reverseSort?-1:1}, limit: 2});
  });    
  
  
  Meteor.startup(function () {

    if (!Tests.find().count()) {

      var tests = [
        "aaaaaa",
        "bbbbbb",
        "cccccc",
        "nnnnnn"
      ];

      for (var i = 0; i < tests.length; i++){
        console.info("Inserting test " + tests[i]);
        Tests.insert({name:tests[i]});
      }
    }
  });  
  
  
}



