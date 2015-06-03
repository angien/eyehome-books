angular.module('book', [])
.controller('Books', ['$scope', function($scope) {
  console.log(this);
    /**
     * init controller and set defaults
     */
  function init () {
    $scope.messages = [];
    $scope.booklines = [];
    $scope.loadBooks();
    $scope.currentPage = 0;
    $scope.currentBookPage = 0;
    $scope.currentScreen = 1;
  }

  $scope.loadBooks = function() {
    // load messages from file
    var file = '../books.txt';
    console.log(file);
    loadFile(file, displayBooks);
  }

  var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

  function loadFile(file, displayFunction) {
    reader.open('get', file, true); 
    reader.onreadystatechange = displayFunction;
    reader.send(null);
  }

  function displayBooks() {
    if(reader.readyState==4) {
      var lines = reader.responseText.split('\n');
      console.log($scope.currentPage + $scope.currentScreen);
      for(var line = 0; line < lines.length; line++){
        console.log(line + " " +lines[line]);
        $scope.messages[line] = lines[line];
      }
      $scope.$apply();

    }
  }

  function displayContents() {
    if(reader.readyState==4) {
      var lines = reader.responseText.split(' ');
      //console.log(lines);
      for(var line = 0; line < lines.length; line++){
        //console.log(line + " " +lines[line]);
        $scope.booklines[line] = lines[line];
        
      }
      console.log("Finished loading");
      $scope.$apply();

    }
  }
  $scope.arrayToString = function(array) {
    for (i = 0; i < 3; i++) {
      // highlight ones on current page
      index = $scope.currentPage * 3 + i;
      array[index] = "<span style='color:dark green;'>" + array[index] + "</span>";
      console.log(array[index]);
    }
    return array.join("<br/>");
  };

  $scope.toScreen2 = function () {
    $scope.currentScreen = 2;
  };
  $scope.toScreen1 = function () {
    $scope.currentScreen = 1;
  };
  
  $scope.writeMessage = function () {
    // open eyehome keyboard
    // play message when the keyboard is closed
  }
  
  $scope.chooseMessage = function () {

    $scope.toScreen2();
  };
  
  $scope.nextPage = function () {
    if ($scope.messages.length > ($scope.currentPage * 3) + 3) {
      $scope.currentPage++;
    } else {
      // wrap around to first page
      $scope.currentPage = 0;
    }
  };

  $scope.nextBookPage = function () {
    if ($scope.currentBookPage == 2000) {
      for(var line = 0; line < 2000; line++){
        console.log(line + " " +lines[line]);
        $scope.booklines[line] = lines[line];
        
      }
      // load more pages
    }
    if ($scope.booklines.length > ($scope.currentBookPage * 30) + 30) {
      $scope.currentBookPage++;
    } else {
      // wrap around to first page
      $scope.currentBookPage = 0;
    }
  };

  $scope.prevBookPage = function () {
    if ($scope.currentBookPage != 0) {
      $scope.currentBookPage--;
    } else {
      // wrap around to first page
      $scope.currentBookPage = 0;
    }
  };
  
  $scope.bookSelected = function (message_num) {
    console.log("Opening book " + $scope.messages[$scope.currentPage*3 + message_num]);
    //$scope.playMessage($scope.messages[$scope.currentPage*3 + message_num]);
    $scope.toScreen2();
    loadFile("../books/"+ $scope.messages[$scope.currentPage*3 + message_num] + ".txt", displayContents);

  };
  $scope.playMessage = function (msg) {
    responsiveVoice.speak(msg, $scope.voiceStyle);
    
  };
  
  $scope.backToMain = function () {
    $scope.currentPage = 0;
    $scope.toScreen1();
  };
  


  // have yet to check which page we're on (only works on first page)
  // may also want to refactor this out into its own controller
  $scope.keyPress = function(e, currentScreen) {
    console.log('keyup', e);
    var key = e.keyCode ? e.keyCode : e.which;

    if (currentScreen == 1) {
        if (key == '81') //left
          $scope.writeMessage();
        else if (key == '87') //up
          $scope.playAlert();
        else if (key == '69') // right
          $scope.chooseMessage();
        else if (key == '82') // down
          $scope.quit();
        else
          console.log(e.keyCode);
      }
    else { // is 2
        //TODO fix this because we don't want any pop ups (fix in index)
        if (key == '81') //left
          $scope.messageSelected(0);
        else if (key == '87') //up
          $scope.messageSelected(1);
        else if (key == '69') // right
          $scope.messageSelected(2);
        else if (key == '82') // down
          $scope.nextPage();
        else if (key == '89') // disengage
          $scope.backToMain();
        else
          console.log(e.keyCode);
      }
    }

    init();
  }
]);