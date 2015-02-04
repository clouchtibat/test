<div ng-controller="subscribes">
  
  <button ng-click="updateSort()">sort</button>
  
  <h5>Sorted list</h5>  
  <div ng-repeat="test in tests | orderBy:(sort?'-':'')+'name'">{{test.name}} - {{test._id}}</div>
  
</div>