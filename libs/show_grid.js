var GridApp = angular.module('GridApp', ['ngAnimate']);

function GetGridParams($scope,$window,$animate) {
	$scope.refresh_size = function () {
		for (i=0;i<$scope.gridparams_columns;i++) {
			for (j=0;j<$scope.gridparams_rows;j++) {
				if ($scope.grid[i].cells[j] != undefined) {
					$scope.grid[i].cells[j].image.style_to_ng.width=Math.round(($window.innerWidth-60)/$scope.gridparams_columns_visible);
					$scope.grid[i].cells[j].image.style_to_ng.height=Math.round(($window.innerHeight-100)/$scope.gridparams_rows_visible);
				}
			}
		}		
	};
	$scope.refreshgrid = function () {
		var cursize = 1;
		var numbers = 1;
		$scope.grid = [{yi:0, visible:1, cells : [{yi:0, xi: 0,visible:1, id: 0, image: {src:"https://source.unsplash.com/random?sig=0_0", alt:'0',style_to_ng: {width: '30',height: '20'}}}]}];
		$scope.gridparams_columns = ($scope.gridparams_size*2)-1;
		$scope.gridparams_rows = ($scope.gridparams_size*2)-1;
		$scope.gridparams_columns_visible = $scope.gridparams_columns;
		$scope.gridparams_rows_visible = $scope.gridparams_rows;
		$scope.gridparams_size_visible = $scope.gridparams_size;		
		while ( cursize < $scope.gridparams_size ) {
			$scope.grid[0].cells.push({yi:1-cursize, xi:cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+(1-cursize)+'_'+cursize, alt:numbers,style_to_ng: {width: '30',height: '20'}}});
			numbers++;
			for (j=1; j<2*cursize-1; j++) {
				$scope.grid[j].cells.push({yi:2-cursize+j, xi:cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+(2-cursize+j)+'_'+cursize, alt:numbers,style_to_ng: {width: '30',height: '20'}}});
				numbers++;
			};
			$scope.grid.push({yi:cursize,visible:1, cells : [{yi:cursize, xi:cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+cursize+'_'+cursize, alt:numbers,style_to_ng: {width: '30',height: '20'}}}]});
			numbers++;
			for (j=1; j<=2*cursize; j++) {
				$scope.grid[2*cursize-1].cells.unshift({yi:cursize, xi:cursize-j, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+cursize+'_'+(cursize-j), alt:numbers,style_to_ng: {width: '30',height: '20'}}});
				numbers++;
			};
			for (j=cursize-1; j>-cursize; j--) {
				$scope.grid[cursize+j-1].cells.unshift({yi:j, xi:-cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+j+'_'+(-cursize), alt:numbers,style_to_ng: {width: '30',height: '20'}}});
				numbers++;
			};
			$scope.grid.unshift({yi:-cursize,visible:1, cells : [{yi:-cursize, xi:-cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+(-cursize)+'_'+(-cursize), alt:numbers,style_to_ng: {width: '30',height: '20'}}}]});
			numbers++;
			for (j=1;j<=2*cursize;j++) {
				$scope.grid[0].cells.push({yi:-cursize, xi:-cursize+j, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+(-cursize)+'_'+(-cursize+j), alt:numbers,style_to_ng: {width: '30',height: '20'}}});
				numbers++;
			};
			cursize++;
		};
		$scope.refresh_size(0);
	};
	$scope.zoom_in = function () {
		$animate.enabled(false);
		if ($scope.gridparams_rows_visible > 1) {
			$scope.gridparams_rows_visible=$scope.gridparams_rows_visible-2;
			$scope.grid[(($scope.gridparams_rows-$scope.gridparams_rows_visible)/2)-1].visible=0;
			$scope.grid[$scope.gridparams_rows-(($scope.gridparams_rows-$scope.gridparams_rows_visible)/2)].visible=0;
		};
		if ($scope.gridparams_columns_visible > 1) {
			$scope.gridparams_columns_visible=$scope.gridparams_columns_visible-2;
			for (j=(($scope.gridparams_rows-$scope.gridparams_rows_visible)/2); j<$scope.gridparams_rows-(($scope.gridparams_rows-$scope.gridparams_rows_visible)/2); j++) {
				$scope.grid[j].cells[(($scope.gridparams_columns-$scope.gridparams_columns_visible)/2)-1].visible=0;
				$scope.grid[j].cells[$scope.gridparams_columns-(($scope.gridparams_columns-$scope.gridparams_columns_visible)/2)].visible=0;
			};
		};
		if ($scope.gridparams_size_visible > 1) {
			$scope.gridparams_size_visible=$scope.gridparams_size_visible-1;
		};
		$scope.refresh_size(0);
		$animate.enabled(true);
	};
	$scope.zoom_out = function () {
		var cursize = $scope.gridparams_size;
		var numbers = (2*$scope.gridparams_size-1)*(2*$scope.gridparams_size-1);
		if ($scope.gridparams_columns_visible < $scope.gridparams_columns) {
			$scope.gridparams_columns_visible=$scope.gridparams_columns_visible+2;
			$scope.gridparams_rows_visible=$scope.gridparams_rows_visible+2;
			$scope.gridparams_size_visible=$scope.gridparams_size_visible+1;
			$scope.grid[(($scope.gridparams_rows-$scope.gridparams_rows_visible)/2)].visible=1;
			$scope.grid[$scope.gridparams_rows-(($scope.gridparams_rows-$scope.gridparams_rows_visible)/2)-1].visible=1;
			for (j=(($scope.gridparams_rows-$scope.gridparams_rows_visible)/2); j<$scope.gridparams_rows-(($scope.gridparams_rows-$scope.gridparams_rows_visible)/2); j++) {
				$scope.grid[j].cells[(($scope.gridparams_columns-$scope.gridparams_columns_visible)/2)].visible=1;
				$scope.grid[j].cells[$scope.gridparams_columns-(($scope.gridparams_columns-$scope.gridparams_columns_visible)/2)-1].visible=1;
			};
			$scope.refresh_size(0);
		}
		else {
			$scope.grid[0].cells.push({yi:1-cursize, xi:cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+(1-cursize)+'_'+cursize, alt:numbers,style_to_ng: {width: '30',height: '20'}}});
			numbers++;
			for (j=1; j<2*cursize-1; j++) {
				$scope.grid[j].cells.push({yi:2-cursize+j, xi:cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+(1-cursize+j)+'_'+cursize, alt:numbers,style_to_ng: {width: '30',height: '20'}}});
				numbers++;
			};
			$scope.grid.push({yi:cursize,visible:1, cells : [{yi:cursize, xi:cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+cursize+'_'+cursize, alt:numbers,style_to_ng: {width: '30',height: '20'}}}]});
			numbers++;
			for (j=1; j<=2*cursize; j++) {
				$scope.grid[2*cursize-1].cells.unshift({yi:cursize, xi:cursize-j, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+cursize+'_'+(cursize-j), alt:numbers,style_to_ng: {width: '30',height: '20'}}});
				numbers++;
			};
			for (j=cursize-1; j>-cursize; j--) {
				$scope.grid[cursize+j-1].cells.unshift({yi:j, xi:-cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+j+'_'+(-cursize), alt:numbers,style_to_ng: {width: '30',height: '20'}}});
				numbers++;
			};
			$scope.grid.unshift({yi:-cursize,visible:1, cells : [{yi:-cursize, xi:-cursize, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+(-cursize)+'_'+(-cursize), alt:numbers,style_to_ng: {width: '30',height: '20'}}}]});
			numbers++;
			for (j=1;j<=2*cursize;j++) {
				$scope.grid[0].cells.push({yi:-cursize, xi:-cursize+j, visible:1, id: numbers, image: {src:"https://source.unsplash.com/random?sig="+(-cursize)+'_'+(-cursize+j), alt:numbers,style_to_ng: {width: '30',height: '20'}}});
				numbers++;
			};
			$scope.gridparams_size=$scope.gridparams_size+1;
			$scope.gridparams_columns = ($scope.gridparams_size*2)-1;
			$scope.gridparams_rows = ($scope.gridparams_size*2)-1;
			$scope.gridparams_columns_visible = $scope.gridparams_columns;
			$scope.gridparams_rows_visible = $scope.gridparams_rows;
			$scope.gridparams_size_visible = $scope.gridparams_size;	
		};
		$scope.refresh_size(0);
	};
	 $scope.CellClick = function (cell) {
		 console.log(cell.yi);
		 console.log(cell.xi);
		 console.log($scope.gridparams_size);
	 };
	$scope.gridparams_columns = 3;
	$scope.gridparams_rows = 3;
	$scope.gridparams_size = 2;
	$scope.gridparams_columns_visible = 3;
	$scope.gridparams_rows_visible = 3;
	$scope.gridparams_size_visible = 2;	
	$scope.refreshgrid(0);
}

GridApp.directive('ngMouseWheelUp', function() {
        return function(scope, element, attrs) {
            element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {
                   
            	        // cross-browser wheel delta
            	        var event = window.event || event; // old IE support
            	        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            	
            	        if(delta > 0) {
                            scope.$apply(function(){
                                scope.$eval(attrs.ngMouseWheelUp);
                            });
                        
                            // for IE
                            event.returnValue = false;
                            // for Chrome and Firefox
                            if(event.preventDefault) {
                            	event.preventDefault();                        
                            }

                        }
            });
        };
});


GridApp.directive('ngMouseWheelDown', function() {
        return function(scope, element, attrs) {
            element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {
                   
            	        // cross-browser wheel delta
            	        var event = window.event || event; // old IE support
            	        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            	
            	        if(delta < 0) {
                            scope.$apply(function(){
                                scope.$eval(attrs.ngMouseWheelDown);
                            });
                        
                            // for IE
                            event.returnValue = false;
                            // for Chrome and Firefox
                            if(event.preventDefault)  {
                            	event.preventDefault();
                            }

                        }
            });
        };
});