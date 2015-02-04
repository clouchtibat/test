Tests = new Mongo.Collection('tests');

if(Meteor.isClient){

  angular.module("tests", [
    "angular-meteor"
  ])

  .controller("subscribes", function($scope, $meteorCollection) {

    //if this line is commented filtered list is correctly displayed
    $scope.tests = $meteorCollection(Tests, false).subscribe("tests");
    
    $scope.filteredTests = $meteorCollection(Tests, false).subscribe("filteredTests", "n", false);
    
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
    
    console.info("publish filtered tests with filter '"+filter+"'");
    
    var config = {};

    if(filter){
      config.name = new RegExp(".*"+filter+".*", "i");
    }
    return Tests.find(config, {sort: {title: reverseSort?-1:1}, limit: 100});
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



