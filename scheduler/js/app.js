app.controller('MainSchedulerCtrl', function($scope) {
  $scope.events = [
    { id:1, text:"Task A-12458",
      start_date: new Date(2013, 09, 30, 9, 0),
      end_date: new Date(2013, 09, 30, 16, 0) },
    { id:2, text:"Task A-83473",
      start_date: new Date(2013, 09, 28, 9, 0),
      end_date: new Date(2013, 09, 30, 16, 0) }
  ];

});

   <div dhx-scheduler data="events" style="height:350px; width:600px;">