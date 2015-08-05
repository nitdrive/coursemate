
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
    first.states = AdminAppSearchService.states;
    first.greFlag =  AdminAppSearchService.greFlag;
    first.greFilterInputs = AdminAppSearchService.greFilterInputs;
    first.greFilterType = AdminAppSearchService.greFilterType;
    first.filters = AdminAppSearchService.filters;
    console.log("In SideMenu CTRL-State checked");
    first.greeting = SideMenuOptions;
    $scope.$storage = $localStorage;
    console.log("Search:"+first.greeting.search); 
   
    
    
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
_this.states = {Andaman:{statename:"Andaman and Nicobar Islands",stateChecked:false},Andhra:{statename:"Andhra Pradesh",stateChecked:false},Arunachal:
{statename:"Arunachal Pradesh",stateChecked:false},Assam:{statename:"Assam",stateChecked:false},Bihar:{statename:"Bihar",stateChecked:false},
Chandigarh:{statename:"Chandigarh",stateChecked:false},Chhattisgarh:{statename:"Chhattisgarh",stateChecked:false},Dadra:{statename:"Dadra and Nagar Haveli",stateChecked:false},Daman:{statename:"Daman and Diu",stateChecked:false},Delhi:{statename:"Delhi",stateChecked:false},Goa:{statename:"Goa",stateChecked:false},Gujarat:{statename:"Gujarat",stateChecked:false},Haryana:{statename:"Haryana",stateChecked:false},Himachal:{statename:"Himachal Pradesh",stateChecked:false},JammuandKashmir:{statename:"Jammu and Kashmir",stateChecked:false},Jharkand:{statename:"Jharkhand",stateChecked:false},Karnataka:{statename:"Karnataka",stateChecked:false},Kerala:{statename:"Kerala",stateChecked:false},Lakshadweep:{statename:"Lakshadweep",stateChecked:false},MadhyaPradesh:{statename:"Madhya Pradesh",stateChecked:false},Maharashtra:{statename:"Maharashtra",stateChecked:false},Manipur:{statename:"Manipur",stateChecked:false},Meghalaya:{statename:"Meghalaya",stateChecked:false},Mizoram:{statename:"Mizoram",stateChecked:false},Nagaland:{statename:"Nagaland",stateChecked:false},Odisha:{statename:"Odisha",stateChecked:false},Puducherry:{statename:"Puducherry",stateChecked:false},Punjab:{statename:"Punjab",stateChecked:false},Rajasthan:{statename:"Rajasthan",stateChecked:false},Sikkim:{statename:"Sikkim",stateChecked:false},TamilNadu:{statename:"Tamil Nadu",stateChecked:false},Telangana:{statename:"Telangana",stateChecked:false},Tripura:{statename:"Tripura",stateChecked:false},Uttar:{statename:"Uttar Pradesh",stateChecked:false},Uttarakhand:{statename:"Uttarakhand",stateChecked:false},Bengal:{statename:"West Bengal",stateChecked:false}};

_this.greFlag = {gre:[{scoreRange:290,checked:false},{scoreRange:300,checked:false},{scoreRange:305,checked:false}]};

_this.greFilterInputs = {input1:0,input2:0};

_this.greFilterType = {type:'none'};

console.log("AdminAppSearchService active");

_this.filters = {GRE:{Inputs:{input1:0,input2:0},Type:'none',checked:false},GREQuant:{Inputs:{input1:0,input2:0},Type:'none',checked:false},TOEFL:{Inputs:{input1:0,input2:0},Type:'none',checked:false},ILETS:{Inputs:{input1:0,input2:0},Type:'none',checked:false},undergradGPA:{Inputs:{input1:0,input2:0},Type:'none',checked:false},undergradMajor:{Inputs:{input1:'none'},Type:'none',checked:false},intendedMajor:{Inputs:{input1:'none'},Type:'none',checked:false},undergradCollege:{Inputs:{input1:'none'},Type:'none',checked:false},city:{Inputs:{input1:'none'},Type:'none',checked:false},district:{Inputs:{input1:'none'},Type:'none',checked:false},state:{Inputs:{input1:'none'},Type:'none',checked:false}};

_this.globaldata = [];

_this.checkGREChecked = {};

return _this;
})


/************************************************************************** FILTER CHAIN STARTS *****************************************************************/


.filter('filterGRE', function () {
 
        return function (input,filterInputs,filterType) {
 
	////////////////////////////////////////////
	
		if(filterType ==='greater than')
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
		else if(filterType ==='less than')
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
		else if(filterType ==='equal to')
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
		else if(filterType ==='between')
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


/************************************************************************** GRE QUANT FILTER *****************************************************************/


.filter('filterGREQuant', function () {
 
        return function (input,filterInputs,filterType) {
 
	////////////////////////////////////////////
	
		if(filterType ==='greater than')
		{

			var greaterthan = [];
        
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseInt(input[i].greQuantScore))
			    {	
				greaterthan.push(input[i]);
		
				//console.log(input[i].greQuantScore);	
			    } 
			}

			return greaterthan;
			
		}
		else if(filterType ==='less than')
		{

			var lessthan = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 > parseInt(input[i].greQuantScore))
			    {	
				lessthan.push(input[i]);
		
				//console.log(input[i].greQuantScore);	
			    } 
			}
			
			return lessthan;	

		}
		else if(filterType ==='equal to')
		{

			var equalto = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 == parseInt(input[i].greQuantScore))
			    {	
				equalto.push(input[i]);
		
				//console.log(input[i].greQuantScore);	
			    } 
			}
			
			return equalto;
			
		}
		else if(filterType ==='between')
		{

		     var between = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseInt(input[i].greQuantScore) && filterInputs.input2 > parseInt(input[i].greQuantScore))
			    {	
				between.push(input[i]);
		
				//console.log(input[i].greQuantScore);	
			    } 
			}
			
			return between;

	
		}		



	////////////////////////////////////////////

 
	
							
							
						        
	
            
        };
    })


/**************************************** TOEFL FILTER ***************************************************************************/


.filter('filterTOEFL', function () {
 
        return function (input,filterInputs,filterType) {
 
	////////////////////////////////////////////
	
		if(filterType ==='greater than')
		{

			var greaterthan = [];
        
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseInt(input[i].toeflScore))
			    {	
				greaterthan.push(input[i]);
		
				console.log(input[i].toeflScore);	
			    } 
			}

			return greaterthan;
			
		}
		else if(filterType ==='less than')
		{

			var lessthan = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 > parseInt(input[i].toeflScore))
			    {	
				lessthan.push(input[i]);
		
				console.log(input[i].toeflScore);	
			    } 
			}
			
			return lessthan;	

		}
		else if(filterType ==='equal to')
		{

			var equalto = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 == parseInt(input[i].toeflScore))
			    {	
				equalto.push(input[i]);
		
				console.log(input[i].toeflScore);	
			    } 
			}
			
			return equalto;
			
		}
		else if(filterType ==='between')
		{

		     var between = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseInt(input[i].toeflScore) && filterInputs.input2 > parseInt(input[i].toeflScore))
			    {	
				between.push(input[i]);
		
				console.log(input[i].toeflScore);	
			    } 
			}
			
			return between;

	
		}		



	////////////////////////////////////////////

 
	
							
							
						        
	
            
        };
    })





/*******************************************************************************************************************/



/**************************************** ILETS FILTER ***************************************************************************/


.filter('filterILETS', function () {
 
        return function (input,filterInputs,filterType) {
 
	////////////////////////////////////////////
	
		if(filterType ==='greater than')
		{

			var greaterthan = [];
        
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseFloat(input[i].iletsScore))
			    {	
				greaterthan.push(input[i]);
		
				console.log(input[i].iletsScore);	
			    } 
			}

			return greaterthan;
			
		}
		else if(filterType ==='less than')
		{

			var lessthan = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 > parseFloat(input[i].iletsScore))
			    {	
				lessthan.push(input[i]);
		
				console.log(input[i].iletsScore);	
			    } 
			}
			
			return lessthan;	

		}
		else if(filterType ==='equal to')
		{

			var equalto = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 == parseFloat(input[i].iletsScore))
			    {	
				equalto.push(input[i]);
		
				console.log(input[i].iletsScore);	
			    } 
			}
			
			return equalto;
			
		}
		else if(filterType ==='between')
		{

		     var between = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseFloat(input[i].iletsScore) && filterInputs.input2 > parseInt(input[i].iletsScore))
			    {	
				between.push(input[i]);
		
				console.log(input[i].iletsScore);	
			    } 
			}
			
			return between;

	
		}		



	////////////////////////////////////////////

 
	
							
							
						        
	
            
        };
    })





/*******************************************************************************************************************/


/**************************************** GPA FILTER ***************************************************************************/


.filter('filterGPA', function () {
 
        return function (input,filterInputs,filterType) {
 
	////////////////////////////////////////////
	
		if(filterType ==='greater than')
		{

			var greaterthan = [];
        
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseFloat(input[i].undergradGPA))
			    {	
				greaterthan.push(input[i]);
		
				console.log(input[i].undergradGPA);	
			    } 
			}

			return greaterthan;
			
		}
		else if(filterType ==='less than')
		{

			var lessthan = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 > parseFloat(input[i].undergradGPA))
			    {	
				lessthan.push(input[i]);
		
				console.log(input[i].undergradGPA);	
			    } 
			}
			
			return lessthan;	

		}
		else if(filterType ==='equal to')
		{

			var equalto = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 == parseFloat(input[i].undergradGPA))
			    {	
				equalto.push(input[i]);
		
				console.log(input[i].undergradGPA);	
			    } 
			}
			
			return equalto;
			
		}
		else if(filterType ==='between')
		{

		     var between = [];
		
			for(var i=0;i<input.length;i++)
			{
			    if(filterInputs.input1 < parseFloat(input[i].undergradGPA) && filterInputs.input2 > parseFloat(input[i].undergradGPA))
			    {	
				between.push(input[i]);
		
				console.log(input[i].undergradGPA);	
			    } 
			}
			
			return between;

	
		}		



	////////////////////////////////////////////

 
	
							
							
						        
	
            
        };
    })





/*******************************************************************************************************************/



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



.controller('AdminAppSearchCtrl', function ($scope,adminService,$localStorage,$filter,$window,AdminAppSearchService,$timeout) {
  
    var first = this;
    
    first.states  = AdminAppSearchService.states;
    first.greFlag = AdminAppSearchService.greFlag;
    first.greFilterInputs = AdminAppSearchService.greFilterInputs;
    first.greFilterType = AdminAppSearchService.greFilterType;
    first.filters = AdminAppSearchService.filters;
    first.exportOptions = {option:[{column:"GRE Total Score",checked:false},{column:"GRE Quant Score",checked:false},{column:"GRE Verbal Score",checked:false},{column:"GRE AWA Score",checked:false},{column:"Undergrad GPA",checked:false},{column:"TOEFL Total Score",checked:false},{column:"TOEFL Reading Score",checked:false},{column:"TOEFL Writing Score",checked:false},{column:"TOEFL Listening Score",checked:false},{column:"TOEFL Speaking Score",checked:false},{column:"ILETS Total Score",checked:false},{column:"ILETS Reading Score",checked:false},{column:"ILETS Writing Score",checked:false},{column:"ILETS Listening Score",checked:false},{column:"ILETS Speaking Score",checked:false},{column:"Undergrad Major",checked:false},{column:"Intended Major",checked:false},{column:"Semester Intended",checked:false},{column:"Degree Expected",checked:false},{column:"Undergrad College",checked:false},{column:"Undergrad CollegeCity",checked:false},{column:"Undergrad CollegeState",checked:false},{column:"Undergrad CollegeCountry",checked:false},{column:"Email",checked:false},{column:"Phone Number",checked:false},{column:"City",checked:false},{column:"District",checked:false},{column:"State",checked:false},{column:"Country",checked:false}]};
    
   
    
    adminService.listUserDetails($localStorage.admin).success(function (response) {
		                
				
                                 globaldata = response;
                                 
				if(typeof globaldata[0].firstName != 'undefined')
                                {
			           //first.flags.globaldata = globaldata;
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
                               $scope.masterOptions = true;
	                       $scope.states = first.states;
			       //$scope.globaldata = first.flags.globaldata;
			       var count = 0;
			       $scope.$watch('states', function(oldValue,newValue) {
  				 	
				       $scope.checkstateChecked();
				     
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

			      $scope.exportOptions = first.exportOptions;
			      
			      $scope.$watch('exportOptions',function(oldValue,newValue) {
  				 	
				 var columns = [];
				 $scope.generateTable(columns);
				 
				      
			       },true);

			      $scope.filters = first.filters;
                              $scope.$watch('filters',function(oldValue,newValue) {
  				 	
				 $scope.filterChain();
				 
				      
			       },true);



				$scope.generateTable = function(columns){

					var input =  first.exportOptions.option;
					
					for(var i=0;i<input.length;i++)
					{

					     if(first.exportOptions.option[i].checked)
					     {
						
						columns.push(first.exportOptions.option[i].column);
						
					     }
						
					}
					
                                        $scope.columns = columns;
					//alert("Columns Length:"+columns.length);



				}

			       $scope.filterChain = function ()
			       {
					//alert("GREChecked");
					var inputTitle="";
				        var column1Data = "Name";
				        var column2Data = "GRE Score";
					
					var finaldata = [];
                                        var filtersUsed = [];
					var filteredsemesterdata; 
                                        /*if(first.filters.intendedSemster.checked){

                                                 filteredsemesterdata = $filter('filter')(first.globaldata,{semesterIntended:first.filters.intendedSemester.Input});
						 filtersUsed.push("Semester:"+first.filters.intendedSemester.Input);
					}else
					{*/
						 filteredsemesterdata = first.globaldata;
						 filtersUsed.push("Semester: All");
					//}

                                        if(first.filters.GRE.checked)
					{
						if(first.filters.GRE.Inputs.input1==0)
							return;
						else
						{
						
						
							filterOUT1 = $filter('filterGRE')(filteredsemesterdata,first.filters.GRE.Inputs,first.filters.GRE.Type);
							var input2 = 0;
		                                        if(first.filters.GRE.Inputs.input2!=0)
							{
								input2 = first.filters.GRE.Inputs.input2;
								filtersUsed.push("GRE: "+first.filters.GRE.Type+" "+first.filters.GRE.Inputs.input1+" and "+first.filters.GRE.Inputs.input2);
							}
							else 
							{
								filtersUsed.push("GRE:"+first.filters.GRE.Type+" "+first.filters.GRE.Inputs.input1);						
							}
						        filteredsemesterdata = filterOUT1;
						}
	
					}
					 if(first.filters.GREQuant.checked)
					{
						if(first.filters.GREQuant.Inputs.input1==0)
							return;
						else
						{
						
						
							filterOUT1Q = $filter('filterGREQuant')(filteredsemesterdata,first.filters.GREQuant.Inputs,first.filters.GREQuant.Type);
							var input2 = 0;
		                                        if(first.filters.GREQuant.Inputs.input2!=0)
							{
								input2 = first.filters.GREQuant.Inputs.input2;
								filtersUsed.push("GRE Quant Score: "+first.filters.GREQuant.Type+" "+first.filters.GREQuant.Inputs.input1+" and "+first.filters.GREQuant.Inputs.input2);
							}
							else 
							{
								filtersUsed.push("GRE Quant Score:"+first.filters.GREQuant.Type+" "+first.filters.GREQuant.Inputs.input1);						
							}
						        filteredsemesterdata = filterOUT1Q;
						}
	
					}
					if(first.filters.TOEFL.checked)
					{
					        if(first.filters.TOEFL.Inputs.input1==0)
							return;
						else
						{
							filterOUT2 = $filter('filterTOEFL')(filteredsemesterdata,first.filters.TOEFL.Inputs,first.filters.TOEFL.Type);
							var input2 = 0;
		                                        if(first.filters.TOEFL.Inputs.input2!=0)
							{
								input2 = first.filters.TOEFL.Inputs.input2;
								filtersUsed.push("TOEFL: "+first.filters.TOEFL.Type+" "+first.filters.TOEFL.Inputs.input1+" and "+first.filters.TOEFL.Inputs.input2);
							}
							else
							{
								filtersUsed.push("TOEFL: "+first.filters.TOEFL.Type+" "+first.filters.TOEFL.Inputs.input1);						
							}
			
							filteredsemesterdata = filterOUT2;
						}
			
					}
					if(first.filters.ILETS.checked)
					{
						if(first.filters.ILETS.Inputs.input1==0)
							return;
						else
						{
							filterOUT3 = $filter('filterILETS')(filteredsemesterdata,first.filters.ILETS.Inputs,first.filters.ILETS.Type);
							var input2 = 0;
		                                        if(first.filters.ILETS.Inputs.input2!=0)
							{
								input2 = first.filters.ILETS.Inputs.input2;
								filtersUsed.push("ILETS: "+first.filters.ILETS.Type+" "+first.filters.ILETS.Inputs.input1+" and "+first.filters.ILETS.Inputs.input2);
							}
							else
							{
								filtersUsed.push("ILETS:"+first.filters.ILETS.Type+" "+first.filters.ILETS.Inputs.input1);						
							}
							filteredsemesterdata = filterOUT3;
						}
			
					}
					if(first.filters.undergradGPA.checked)
					{
						
					      if(first.filters.undergradGPA.Inputs.input1==0)
							return;
					      else
					      {
					       filterOUT4 = $filter('filterGPA')(filteredsemesterdata,first.filters.undergradGPA.Inputs,first.filters.undergradGPA.Type);
						var input2 = 0;
                                                if(first.filters.undergradGPA.Inputs.input2!=0)
						{
							input2 = first.filters.undergradGPA.Inputs.input2;
					          filtersUsed.push("Undergrad GPA:"+first.filters.undergradGPA.Type+" "+first.filters.undergradGPA.Inputs.input1+" -- "+first.filters.undergradGPA.Inputs.input2);
						}
						else
						{
						  filtersUsed.push("Undergrad GPA:"+first.filters.undergradGPA.Type+" "+first.filters.undergradGPA.Inputs.input1);						
						}
					        filteredsemesterdata = filterOUT4;
				              }
                                                 
					}
				        if(first.filters.undergradMajor.checked)
					{

						var filterOUT5 = $filter('filter')(filteredsemesterdata,{undergradMajor:first.filters.undergradMajor.Input.input1});
						filtersUsed.push("Undergrad Major:"+first.filters.undergradMajor.Input.input1);	
					        filteredsemesterdata = filterOUT5;
			
					}
					if(first.filters.intendedMajor.checked)
					{

						var filterOUT6 = $filter('filter')(filteredsemesterdata,{intendedMajor:first.filters.intendedMajor.Input.input1});
						filtersUsed.push("Intended Major:"+first.filters.intendedMajor.Input.input1);	
					        filteredsemesterdata = filterOUT6;
			
					}
					if(first.filters.undergradCollege.checked)
					{

						var filterOUT7 = $filter('filter')(filteredsemesterdata,{undergradCollege:first.filters.undergradCollege.Input.input1});
						filtersUsed.push("Undergrad College:"+first.filters.undergradCollege.Input.input1);
					        filteredsemesterdata = filterOUT7;
			
					}
				        if(first.filters.district.checked)
					{

						var filterOUT8 = $filter('filter')(filteredsemesterdata,{district:first.filters.district.Input.input1});
						filtersUsed.push("District:"+first.filters.district.Input.input1);
					        filteredsemesterdata = filterOUT8;
			
					}
					if(first.filters.state.checked)
					{

						var filterOUT9 = $filter('filter')(filteredsemesterdata,{district:first.filters.state.Input.input1});
						filtersUsed.push("State:"+first.filters.state.Input.input1);
					        filteredsemesterdata = filterOUT9;
			
					}
					


					
					 
					        finaldata = filteredsemesterdata;
			                        $scope.filteredData = finaldata;
                                                first.filteredData = finaldata;
						for(var i=0;i<filtersUsed.length;i++)
						{
							inputTitle = inputTitle + filtersUsed[i]+" ";						
						}
                                                
                                                $scope.filteredDataTitle = inputTitle;
                                                first.filteredDataTitle = inputTitle;
						return plotChartForFilters(finaldata,column1Data,column2Data,inputTitle);
					

				  
					
					
				}
                               
				
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
                                                first.greData = finaldata;
                                                (first.greFilterInputs.input2 ==0)?(inputTitle = "GRE Scores "+first.greFilterType.type+" "+first.greFilterInputs.input1):(inputTitle = "GRE Scores "+first.greFilterType.type+" "+first.greFilterInputs.input1+" and "+first.greFilterInputs.input2);
                                                $scope.greTitle = inputTitle;
                                                first.greTitle = inputTitle;
						return plotChartForGRE(finaldata,column1Data,column2Data,inputTitle);
					

				  
					
					
				}

				/*$scope.exportGREData = function()
				{
                                        alert("Exporting.....");
					var blob = new Blob([document.getElementById('greDataBlock').innerHTML], {
       						 type: "application/vnd.ms-excel"
    					});
   				        saveAs(blob, first.greTitle+".xls");
                                        
	
				};*/
				
				$scope.exportFilteredData = function()
				{
                                        alert("Exporting Filtered Data.....");
					var blob = new Blob([document.getElementById('filteredDataBlock').innerHTML], {
       						 type: "application/vnd.ms-excel"
    					});
   				        saveAs(blob, first.filteredDataTitle+".xls");
                                        
	
				};

				$scope.exportDistrictWiseData = function()
				{
                                        alert("Exporting District Wise Data.....");
					var blob = new Blob([document.getElementById('districtWiseDataBlock').innerHTML], {
       						 type: "application/vnd.ms-excel"
    					});
   				        saveAs(blob, "DistrictWiseData.xls");
                                        
	
				};
			
				$scope.exportMasterData = function()
				{
                                        alert("Exporting Master Table.....");
					var blob = new Blob([document.getElementById('masterDataBlock').innerHTML], {
       						 type: "application/vnd.ms-excel"
    					});
   				        saveAs(blob, "master.xls");
                                        
	
				};

			        $scope.exportCustomTable = function()
				{
                                        alert("Exporting Custom Table.....");
					var blob = new Blob([document.getElementById('customDataBlock').innerHTML], {
       						 type: "application/vnd.ms-excel"
    					});
   				        saveAs(blob, "customTable.xls");
                                        
	
				};
		
				$scope.showCustomTable = function()
				{

					$scope.customBlock = !$scope.customBlock;
 					


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
				
                   
				
	  if(first.states.Andhra.stateChecked || first.states.Karnataka.stateChecked || first.states.TamilNadu.stateChecked || first.states.Maharashtra.stateChecked)
				{
				        		
					//alert("StateCheck True"); 
				        var inputState;
					if(first.states.Andhra.stateChecked)
		                        {	
						inputState = first.states.Andhra.statename;
						
					}
					else if(first.states.Karnataka.stateChecked)
					{
						inputState = first.states.Karnataka.statename;
						
					}
					else if(first.states.TamilNadu.stateChecked)
					{
						inputState = first.states.TamilNadu.statename;
						
					}
					else if(first.states.Maharashtra.stateChecked)
					{
						
						inputState = first.states.Maharashtra.statename;
						
					}
					else{

						alert("State Not Found");

					}

                                        console.log("State:"+inputState);
					console.log("Data Input:"+first.globaldata);
				  	filterstatedata = $filter('filter')(first.globaldata,{state:inputState});
					
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
				                $scope.stateData = datalist;
						first.chartData = datalist;
                                                //console.log("chart data length:"+first.chartData);
                                                //console.log("/********************************************************************/");
                                                // Plot chart for the above data
		                               
					
						plotChartForInputs(first.districts,counts,column1Data,column2Data,inputTitle);
                                                

                                   
				  
						
						
                                                


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



			function plotChartForFilters(input,column1Data,column2Data,inputTitle)
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





