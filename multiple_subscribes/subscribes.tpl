<div ng-controller="subscribes">
  
  <input type="text" ng-model="test"><button ng-click="add()">add</button>
  
  <h5>complete list</h5>
  <div ng-repeat="test in tests">{{test.name}} - {{test._id}}</div>
  <br/>  
  <br/>  
  <br/>
  <h5>Filtered list</h5>  
  <div ng-repeat="test in filteredTests">{{test.name}} - {{test._id}}</div>
  
</div>