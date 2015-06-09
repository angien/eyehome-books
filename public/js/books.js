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
    $scope.currentBook = "";
    $scope.allBooks = {};
  }

  $scope.clickLeft = function() {
    if ($scope.currentScreen == 1)
      $scope.bookSelected(0);
    else
      $scope.prevBookPage();
  }

  $scope.clickTop = function() {
    if ($scope.currentScreen == 1)
      $scope.bookSelected(1);
    else
      $scope.bookmark();
  }

  $scope.clickRight = function() {
    if ($scope.currentScreen == 1)
      $scope.bookSelected(2);
    else
      $scope.nextBookPage();
  }

  $scope.clickBottom = function() {
    if ($scope.currentScreen == 1)
      $scope.nextPage();
    else
      $scope.backToMain();
  }

  $scope.loadBooks = function() {
    // load messages from file
    var file = '../books.txt';
    console.log(file);
    loadFile(file, displayBooks);
  }

  $scope.bookSelected = function (message_num) {
    var bookToOpen = $scope.messages[$scope.currentPage*3 + message_num]
    console.log("Opening book " + bookToOpen);
    $scope.currentBook = bookToOpen;

    $scope.currentBookPage = parseInt($scope.allBooks[bookToOpen]);
    loadFile("../books/"+ bookToOpen + ".txt", displayContents);

  };

  var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

  function loadFile(file, displayFunction) {
    reader.open('get', file, true); 
    reader.onreadystatechange = displayFunction;
    reader.send(null);
  }

  function displayBooks() {
    if(reader.readyState==4) {
      var lines = reader.responseText.split('\n');
      // for each line in books.txt
      for(var line = 0; line < lines.length; line++){
        if (lines[line] != "") {
          console.log("Loading " + lines[line]);

          var book = lines[line].split(',');
          $scope.messages[line] = book[0];
          currentBookPage = book[1];
          $scope.allBooks[book[0]] = book[1];
        }
        
      }
      $scope.$apply();

    }
  }

  // display contents of the book
  function displayContents() {
    if(reader.readyState==4) {
      if (reader.status === 200) {  
        $scope.booklines = [];
        var lines = reader.responseText.split(' ');
        //console.log(lines);
        for(var line = 0; line < lines.length; line++){
          //console.log(line + " " +lines[line]);
          $scope.booklines[line] = lines[line];
          
        }
        console.log("Finished loading");
        $scope.toScreen2();
        $scope.$apply();
      }
    }
  }
  $scope.bookmark = function() {
    console.log("Bookmarking at " + $scope.currentBookPage);
    $scope.allBooks[$scope.currentBook] = ($scope.currentBookPage).toString();

    $.ajax({
      type: 'POST',
      url: '/bookmark',
      data: JSON.stringify($scope.allBooks),
      contentType: 'application/json',
      success: function (data) {
          console.log("Bookmark saved!");
      },
      error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
          $('#lblResponse').html('Error connecting to the server.');
      }
    });
  };

  $scope.toScreen2 = function () {
    $scope.currentScreen = 2;
  };
  $scope.toScreen1 = function () {
    $scope.currentScreen = 1;
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
    if ($scope.booklines.length > ($scope.currentBookPage * 40) + 40) {
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
  
  $scope.backToMain = function () {
    $scope.currentPage = 0;
    $scope.currentBookPage = 0;
    $scope.loadBooks();
    $scope.toScreen1();
  };
  


  // have yet to check which page we're on (only works on first page)
  // may also want to refactor this out into its own controller
  $scope.keyPress = function(e, currentScreen) {
    //console.log('keyup', e);
    var key = e.keyCode ? e.keyCode : e.which;

      switch(e.keyCode) {
        case 81:
          console.log("left");
          $scope.clickLeft();
          break;
        case 87:
          console.log("up");
          $scope.clickTop();
          break;
        case 69:
          console.log("right");
          $scope.clickRight();
          break;
        case 82:
          console.log("down");
          $scope.clickBottom();
          break;
        case 84:
          console.log("engage");
          break;
        case 89:
          console.log("disengage");
          break;
        default:
          console.log(e.keyCode);
          break;
      }
    }
  



  init();
  
}]);