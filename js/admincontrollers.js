
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* Controllers */
google.load('visualization', '1', {
  packages: ['corechart']
});
 
google.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['schoolmate']);
});


var chartdata = [];

var SchoolMateAdminControllerModule = angular.module('schoolmate.admincontrollers', ['ngStorage']);

SchoolMateAdminControllerModule.controller('AdminAppLoginCtrl', function ($scope,adminService,$localStorage,SideMenuOptions,$compile) {
          
        $scope.sample  = "Admin";
    
        
       
        
               
        var first = this;
        first.greeting = SideMenuOptions;
        //var sidemenu = SideMenuOptions;
        $scope.login = function(){
                
              console.log("Login");
              
              adminService.loginAdmin(this.admin.aid,this.admin.password).success(function (response) {
		                
				globaldata = response;
                               
                                $scope.$storage = $localStorage;
                                
				if(typeof globaldata[0].name != 'undefined')
                                {
				 
                                   
                                   
                                  //sidemenu.options.dashboard = "true";
				  //sidemenu.options.search = "true";
                                  
                                  //console.log("Side Menu Options:"+sidemenu.options.dashboard);
                                 
                                  $scope.admin = angular.copy($scope.originalUser);
                                  $scope.adminLoginForm.$setPristine();
                                  $scope.$storage.admin = globaldata[0].uname;
                                  
                                  location.href = "#/tab/dashboard/"+globaldata[0].name;
                                  if($scope.$storage.admin)
                                  {

                                      first.greeting.login =true;
				      //first.greeting.search = true;

                                  }
				  console.log("From Response:"+globaldata[0].name);
                                  
                                }
				else
                                {
                                 
				  alert(globaldata[0].message);
				  console.log("From Response-Login Failed: "+globaldata[0].message);
				}
			    });

        }
       

   })


.controller('AdminAppListCtrl', function ($scope,adminService,$localStorage,$ionicSideMenuDelegate,$filter,$window) {

    if($localStorage.admin=="")
		location.href= "#/admin/login";


    $scope.toggleLeft = function(){
	
	
        $ionicSideMenuDelegate.toggleLeft();

  }

 
 
/************************************************************************************/

    //why data is not available to function outside the if block even though we load it into a global vairable?
    adminService.listUserDetails($localStorage.admin).success(function (response) {
		                
				globaldata = response;
                                
				if(typeof globaldata[0].firstName != 'undefined')
                                {
				 
                                    draw();
                                    draw2();
				   
                                  
				  console.log("From Response:"+globaldata[0].firstName);
                                  
				}


				function draw(){
				
				console.log("IN DRAW");
				var filterdata;
				    filterdata = $filter('filter')(globaldata,{semesterIntended:"Fall 2015"});
                                    $scope.userlist = filterdata;
                                    
                                    // computing average value
					
                                    var c = 0; 
                                    for(var i = 0; i < filterdata.length ; i++)
				    {
	                              
				      c = c + parseInt(filterdata[i].greScore);
				    }
				
				    $scope.avg = c / filterdata.length;
			           
                                    
                                    var x = filterdata;
                                    var cdata = new google.visualization.DataTable();

				    cdata.addColumn('string', 'Name');
				    cdata.addColumn('number', 'GRE Score');
				      
				    console.log("X length Now:"+chartdata.length);
								    
				    for (var i = 0; i < x.length ; i++) {
				       cdata.addRow([x[i].firstName.toUpperCase()+"-"+x[i].greScore, parseInt(x[i].greScore)]);
				    }

				    var options = {
					title : 'GRE Scores of registered users',
					//width: '450', 
					//height: '290',
				        //pieHole: 0.1
                                        //is3D: true
					//vAxis: {title: "Names"},
       				        //seriesType: "bars",
                                        //series: {1: {type: "line"}}
				        orientation: 'horizontal'
				    };

				    var chart = new google.visualization.BarChart(document.getElementById('chart-div'));
				    chart.draw(cdata, options);
                                  
			



				
				}

				function draw2(){
				
				console.log("IN DRAW");
				var filterdata;
				    filterdata = $filter('filter')(globaldata,{semesterIntended:"Fall 2015"});
                                    $scope.userlist = filterdata;
                                    
                                    // computing average value
					
                                    var c = 0; 
                                    for(var i = 0; i < filterdata.length ; i++)
				    {
	                              
				      c = c + parseFloat(filterdata[i].undergradGPA);
				    }
				
				    $scope.undergradGPA = c / filterdata.length;
			           
                                    
                                    var x = filterdata;
                                    var cdata = new google.visualization.DataTable();

				    cdata.addColumn('string', 'Name');
				    cdata.addColumn('number', 'Undergrad GPA');
				      
				    console.log("X length Now:"+chartdata.length);
								    
				    for (var i = 0; i < x.length ; i++) {
				       cdata.addRow([x[i].firstName.toUpperCase(), parseFloat(x[i].undergradGPA)]);
				    }

				    var options = {
					title : 'GPA of registered users',
					//width: '450', 
					//height: '290',
				        //pieHole: 0.1
                                        //is3D: true
					//vAxis: {title: "Names"},
       				        //seriesType: "bars",
					//series: {5: {type: "line"}}
                                        //series: {1: {type: "line"}}
				        //orientation: 'horizontal'
				    };

				    var chart = new google.visualization.ComboChart(document.getElementById('chart-div2'));
				    chart.draw(cdata, options);
                                  
			



				
				}


				

				
				
				
			
				$scope.$watch(function(){
				       return $window.innerWidth;
				    }, function(value) {
				       console.log(value);
                                 });
                                
				/*$scope.$watch($scope.getWindowDimensions ,function(newValue, oldValue) {
                                 
                                //console.log("OLD SIZE:"+"("+oldValue.height+","+oldValue.width+")"+"--"+"NEW SIZE:"+"("+newValue.height+","+newValue.width+")");
				draw();


                                });*/
				$scope.$on('$ionicView.enter', function(){
             
				      draw();
				      draw2();
				      
				      //$scope.draw2();
				      console.log("A view was loaded and is active");
                                });
                                


			    });
    

    

    


        



/**********************************************************************************/




          
       


      

  

       
              

    
 
    })

.service("SideMenuOptions",function SideMenuOptions(){

   //options for admin
 console.log("In Service SideMenuOptions");
  var options = this;
  
  options.dashboard = false;
  options.search = false;
  options.access = "options";
  options.message = "This is a sidemenu service";

})

.controller('SideMenuCtrl', function ($scope,SideMenuOptions,$ionicSideMenuDelegate,$localStorage,AdminAppSearchService) {
  
    
    console.log("SideMenuCtrl");
    var first = this;
    first.flags = AdminAppSearchService.flags;
    first.greFlag =  AdminAppSearchService.greFlag;
    first.greFilterInputs = AdminAppSearchService.greFilterInputs;
    first.greFilterType = AdminAppSearchService.greFilterType;
    console.log("In SideMenu CTRL-State checked:"+first.flags.stateData[1].state+"--"+first.flags.stateData[1].stateChecked);
    first.greeting = SideMenuOptions;
    $scope.$storage = $localStorage;
    console.log("Search:"+first.greeting.search); 
   
    $scope.stateChecked = function(){  
	
	



     } 
    
      $scope.showMenu = function () {
        
            
            if($localStorage.admin!="")
            {
               
                
		
		console.log("Page:"+location.href);
                var url = location.href;
		url = url.split("#/tab/");
                first.pageNow = url[1];
		console.log(url);
                if(url[1] === "search")
		{
			first.greeting.search = true;	
			first.greeting.dashboard = false;	
		}
                else
                {
			first.greeting.dashboard = true;
			first.greeting.search = false;
		
		}
     
            }
	    $ionicSideMenuDelegate.toggleLeft();
	  
      };
      
      $scope.showRightMenu = function () {
 
            $ionicSideMenuDelegate.toggleRight();
  
      };

     $scope.logoutAdmin = function() {
 
        $localStorage.admin = "";
        first.greeting.login = false;
        first.greeting.dashboard = false;
        first.greeting.search = false;
        location.href = "#/admin/login";

     };
           
          
	   
     
         
    })

.factory("AdminAppSearchService",function AdminAppSearchService (){

var _this = this;

//_this.flags = {stateChecked:false};
_this.flags = {stateData:[{state:"Andaman and Nicobar Islands",stateChecked:false},{state:"Andhra Pradesh",stateChecked:false},{state:"Arunachal Pradesh",stateChecked:false},{state:"Assam",stateChecked:false},{state:"Bihar",stateChecked:false},{state:"Chandigarh",stateChecked:false},{state:"Chhattisgarh",stateChecked:false},{state:"Dadra and Nagar Haveli",stateChecked:false},{state:"Daman and Diu",stateChecked:false},{state:"Delhi",stateChecked:false},{state:"Goa",stateChecked:false},{state:"Gujarat",stateChecked:false},{state:"Haryana",stateChecked:false},{state:"Himachal Pradesh",stateChecked:false},{state:"Jammu and Kashmir",stateChecked:false},{state:"Jharkhand",stateChecked:false},{state:"Karnataka",stateChecked:false},{state:"Kerala",stateChecked:false},{state:"Lakshadweep",stateChecked:false},{state:"Madhya Pradesh",stateChecked:false},{state:"Maharashtra",stateChecked:false},{state:"Manipur",stateChecked:false},{state:"Meghalaya",stateChecked:false},{state:"Mizoram",stateChecked:false},{state:"Nagaland",stateChecked:false},{state:"Odisha",stateChecked:false},{state:"Puducherry",stateChecked:false},{state:"Punjab",stateChecked:false},{state:"Rajasthan",stateChecked:false},{state:"Sikkim",stateChecked:false},{state:"Tamil Nadu",stateChecked:false},{state:"Telangana",stateChecked:false},{state:"Tripura",stateChecked:false},{state:"Uttar Pradesh",stateChecked:false},{state:"Uttarakhand",stateChecked:false},{state:"West Bengal",stateChecked:false}]};
_this.greFlag = {gre:[{scoreRange:290,checked:false},{scoreRange:300,checked:false},{scoreRange:305,checked:false}]};
_this.greFilterInputs = {input1:0,input2:0};
_this.greFilterType = {type:'none'};
console.log("AdminAppSearchService active");

_this.globaldata = [];

_this.checkGREChecked = {};

return _this;
})

.filter('filterGRE', function () {
 
        return function (input,filterInputs,filterType) {
 
	////////////////////////////////////////////
	
		if(filterType.type==='greater than')
		{

			var greaterthan = [];
        
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseInt(input[i].greScore))
			    {	
				greaterthan.push(input[i]);
		
				console.log(input[i].greScore);	
			    } 
			}

			return greaterthan;
			
		}
		else if(filterType.type==='less than')
		{

			var lessthan = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 > parseInt(input[i].greScore))
			    {	
				lessthan.push(input[i]);
		
				console.log(input[i].greScore);	
			    } 
			}
			
			return lessthan;	

		}
		else if(filterType.type==='equal to')
		{

			var equalto = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 == parseInt(input[i].greScore))
			    {	
				equalto.push(input[i]);
		
				console.log(input[i].greScore);	
			    } 
			}
			
			return equalto;
			
		}
		else if(filterType.type==='between')
		{

		     var between = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseInt(input[i].greScore) && filterInputs.input2 > parseInt(input[i].greScore))
			    {	
				between.push(input[i]);
		
				console.log(input[i].greScore);	
			    } 
			}
			
			return between;

	
		}		



	////////////////////////////////////////////

 
	
							
							
						        
	
            
        };
    })

.filter('filterMajor', function () {
 
        return function (majors) {
 
	var majorList = {};
        
	var count = 0;
	for(var i=0;i<majors.length;i++)
        {
	    for(var j=0;j<majors.length;j++)
	    {
		if(majors[i].undergradMajor === majors[j].undergradMajor)
			count = count + 1;

	    }
	    majorList[majors[i].undergradMajor]  = count;
	    count = 0;
	    
        }
							
							
						        
	return  majorList;
            
        };
    })



.controller('AdminAppSearchCtrl', function ($scope,adminService,$localStorage,$filter,$window,AdminAppSearchService) {
  
    var first = this;
    
    first.flags  = AdminAppSearchService.flags;
    first.greFlag = AdminAppSearchService.greFlag;
    first.greFilterInputs = AdminAppSearchService.greFilterInputs;
    first.greFilterType = AdminAppSearchService.greFilterType;
    
    console.log("In Search CTRL-State checked:"+first.flags.stateData[1].stateChecked);
    
    adminService.listUserDetails($localStorage.admin).success(function (response) {
		                
				
                                 globaldata = response;
                                 
				if(typeof globaldata[0].firstName != 'undefined')
                                {
			           first.flags.globaldata = globaldata;
				   first.globaldata = globaldata;
				   
                                   $scope.searchList = globaldata;
				   console.log("Search List Length:"+$scope.searchList.length);
                                  //  draw3();
                                  //location.href = "#/admin/userlist";
                                  
				  console.log("From Response for page Search:"+globaldata[0].firstName+"---"+first.globaldata[0].greScore);
                                 
				}
	
				/*function checkMajor(){
				 var inputTitle = "Subject Majors count of Registered Users";
				  var column1Data = "Major";
				  var column2Data = "No of Registrations";
				
				  var filterdata = $filter('filter')(first.globaldata,{semesterIntended:"Fall 2015"});
				  
				  var majorList = $filter('filterMajor')(filterdata);
			
				    for(var i=0;i<majorList.length;i++)
				  console.log("Major List:"+majorList[i]+"--"+majorList[majorList[i]]);

    				
			           plotChartForMajors(majorList,column1Data,column2Data,inputTitle);
		              }*/
				 
                              
			
			/*$scope.$on('$ionicView.enter', function(){
             
				     //plotChartForInputs(districts,counts,column1Data,column2Data,inputTitle);
				      checkMajor();
				      //$scope.draw2();
				      console.log("A search view was loaded and is active");
                                });*/


		});

/*************************************************************************************************************************************************/
                               
	                       $scope.sflag = first.flags.stateData;
			       //$scope.globaldata = first.flags.globaldata;
			       var count = 0;
			       $scope.$watch('sflag', function(oldValue,newValue) {
  				 	
				       console.log("Execution Count:"+(count = count+1));
				       $scope.checkstateChecked();
				      //$scope.check();
			       },true);

			      /* $scope.greFlag = first.greFlag.gre;
			       $scope.$watch('greFlag',function(oldValue,newValue) {
  				 	
				       //console.log("GRE FLAG Execution");
				       $scope.checkGREChecked();
				      //$scope.check();
			       },true);*/
		
			      $scope.greInputs = first.greFilterInputs;
			      $scope.$watch('greInputs',function(oldValue,newValue) {
  				 	
				       //console.log("GRE FLAG Execution");
				       $scope.checkGREInputs();
				      //$scope.check();
			       },true);
                               
			     	

			       
				
			       $scope.checkGREInputs = function ()
			       {
					//alert("GREChecked");
					var inputTitle;
				        var column1Data = "Name";
				        var column2Data = "GRE Score";
					
					var finaldata = [];
					var filterfalldata = $filter('filter')(first.globaldata,{semesterIntended:"Fall 2015"});
					
						filterInputs = $filter('filterGRE')(filterfalldata,first.greFilterInputs,first.greFilterType);
						
						/*console.log("*******greInputs******");
						for(var s=0;s<filterInputs.length;s++)
						console.log(filterInputs.greScore);*/
					 
					        finaldata = filterInputs;
			                        $scope.greData = finaldata;
                                                (first.greFilterInputs.input2 ==0)?(inputTitle = "GRE Scores "+first.greFilterType.type+" "+first.greFilterInputs.input1):(inputTitle = "GRE Scores "+first.greFilterType.type+" "+first.greFilterInputs.input1+" and "+first.greFilterInputs.input2);
                                                $scope.greTitle = inputTitle;
                                                first.greTitle = inputTitle;
						return plotChartForGRE(finaldata,column1Data,column2Data,inputTitle);
					

				  
					
					
				}

				$scope.exportGREData = function()
				{
                                        alert("Exporting.....");
					var blob = new Blob([document.getElementById('greDataBlock').innerHTML], {
       						 type: "application/vnd.ms-excel"
    					});
   				        saveAs(blob, first.greTitle+".xls");
                                        
	
				};
	
	                              
                               
			      
                               $scope.checkstateChecked = function ()
			       {
				 
                                
				       first.districts = [];
				       var ds = {};
				       var counts = [];
				       var inputTitle = "District wise count of Registered Users";
				       var column1Data = "District";
				       var column2Data = "No of Registrations";
				       var filterstatedata = [];
		                       var datalist = [];
				/*if(first.flags.stateChecked)
				{
					alert("state checked");
					console.log("state checked true");
				}else
					console.log("state checked false");

			      }*/
                               
                                /*var statesSelected,onechecked=false;
                                for(var i=0;i<first.flags.stateData.length;i++)
				{
					
					if(first.flags.stateData[i].stateChecked)
					{
						
					      statesSelected.push(first.flags.stateData[i].state);
					      onechecked = true;
					}

				}*/
				
                                
				
				if(first.flags.stateData[1].stateChecked)
				{
				        		
					//alert("StateCheck True"); 
		                        var inputState = "Andhra Pradesh";
                                        console.log("State:"+inputState);
					console.log("Data Input:"+first.flags.globaldata);
				  	filterstatedata = $filter('filter')(first.flags.globaldata,{state:inputState});
					
                                       // console.log("filterstatedata length:"+filterstatedata);

						
						for(var i=0;i<filterstatedata.length;i++)
						{
							//districts.push(filterstatedata[i].district);	
							ds[filterstatedata[i].district] = true;
							
						}
                                                   
                                             
                                                
                                                for(var i in ds)
						{
							//console.log("***************************************DS:"+i+"***************************");
							first.districts.push(i);  // <---- problem origin districts not getting cleared;
				
						}

               					for(var i=0;i<first.districts.length;i++)
						{
							
							var count = getUserCountInDistrict(first.districts[i]);
							counts.push(count);
							
						}
                                    
   						function getUserCountInDistrict(inputDistrict)
						{
							
						   var filterdata = $filter('filter')(filterstatedata,{district:inputDistrict});
						   
                                                   return filterdata.length;
		
						}

			                        // console.log("/****************************************************************/");
						 //console.log("districts data:"+first.districts.length);
						
						
                                                for(var i=0;i<first.districts.length;i++)
						{
							var data = {};
							data["district"] = first.districts[i];
							data["count"] = counts[i];
							datalist.push(data);
							
							
						}
		                                console.log("datalist length"+datalist.length);
                                                
						first.chartData = datalist;
                                                //console.log("chart data length:"+first.chartData);
                                                //console.log("/********************************************************************/");
                                                // Plot chart for the above data
		                               
					
						plotChartForInputs(first.districts,counts,column1Data,column2Data,inputTitle);
						
                                                


				  }
				  else
				  {
					 datalist.length = 0;
					 
					 first.districts = [];
					 first.chartData = [];
					 filterstatedata = [];
				         //plotChartForInputs([],[],"","","");
				  }

				

					
				}


                      

			
		
			/*$scope.$on('$ionicView.loaded', function(){
              				
				       $scope.checkMajor();
				      //$scope.draw2();
				      console.log("A map view was loaded and is active");
                                });*/


			



			 function plotChartForInputs(Xdata,Ydata,column1Data,column2Data,inputTitle)
			 {

				//alert("In Plotter function");
				var cdata = new google.visualization.DataTable();

				    cdata.addColumn('string', column1Data);
				    cdata.addColumn('number', column2Data);
				      
				    console.log("X length Now:"+chartdata.length);
								    
				    for (var i = 0; i < Xdata.length ; i++) {
				       cdata.addRow([Xdata[i].toUpperCase(), parseInt(Ydata[i])]);
				    }

				    var options = {
					title : inputTitle,
					//width: '450', 
					//height: '290',filterstatedata
				        //pieHole: 0.1,
                                        //is3D: true
					//vAxis: {title: "Names"},
       				        //seriesType: "bars",
					//series: {5: {type: "line"}}
                                        //series: {1: {type: "line"}}
				        //hAxis: {minValue: 80},
				        //orientation: 'horizontal'
					 region: 'IN',
       					 displayMode: 'markers',
       					 colorAxis: {colors: ['green', 'blue']}
				    };

				    var chart = new google.visualization.GeoChart(document.getElementById('chart-div3'));
				    chart.draw(cdata, options);

			 }



			 function plotChartForGRE(input,column1Data,column2Data,inputTitle)
			 {

				//alert("In Plotter function");
				var cdata = new google.visualization.DataTable();

				    cdata.addColumn('string', column1Data);
				    cdata.addColumn('number', column2Data);
				      
				    console.log("X length for GRE Now:"+chartdata.length);
								    
				    for (var i = 0; i < input.length ; i++) {
				       cdata.addRow([input[i].firstName.toUpperCase(), parseInt(input[i].greScore)]);
				    }

				    var options = {
					title : inputTitle,
					//width: '450', 
					//height: '290',
				        //pieHole: 0.1,
                                        //is3D: true
					//vAxis: {title: "Names"},
       				        //seriesType: "bars",
					//series: {5: {type: "line"}}
                                        //series: {1: {type: "line"}}
				        //hAxis: {minValue: 80},
				         orientation: 'horizontal'
					 
				    };

				    var chart = new google.visualization.BarChart(document.getElementById('chart-div3'));
				    chart.draw(cdata, options);

			 }

			function plotChartForMajors(input,column1Data,column2Data,inputTitle)
			 {

				//alert("In Plotter function");
				var cdata = new google.visualization.DataTable();

				    cdata.addColumn('string', column1Data);
				    cdata.addColumn('number', column2Data);
				      
				    console.log("X length for GRE Now:"+chartdata.length);
								    
				    for (var i = 0; i < input.length ; i++) {
				       cdata.addRow([input[i].toUpperCase(), parseInt(input[input[i]])]);
				    }

				    var options = {
					title : inputTitle,
					//width: '450', 
					//height: '290',
				        //pieHole: 0.1,
                                        //is3D: true
					//vAxis: {title: "Names"},
       				        //seriesType: "bars",
					//series: {5: {type: "line"}}
                                        //series: {1: {type: "line"}}
				        //hAxis: {minValue: 80},
				         orientation: 'horizontal'
					 
				    };

				    var chart = new google.visualization.BarChart(document.getElementById('chart-div3'));
				    chart.draw(cdata, options);

			 }



/*************************************************************************************************************************************************/

});




