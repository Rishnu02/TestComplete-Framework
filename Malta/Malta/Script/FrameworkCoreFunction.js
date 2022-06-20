﻿//USEUNIT MainActionsFunction
//USEUNIT MainAtomicFunctions
function FrameworkInitialStartUpfunction(){
  
//UserForms.TestSelectorUserForms.ShowModal();

  BeforeTestStart();
  Login();
  
  var Driver = DDT.ExcelDriver(ProjectSuite.Path+"\Malta\\TestCaseDataFiles\\TestCases.xlsx","Steps",true);
  
  Indicator.PushText("Hello!")
  var i=1; 
   while(!Driver.EOF()){        
    if(aqString.Compare(Driver.Value("ExecuteFlag"),"Y",false)==0){
      i=i+1;
      Project.Variables.i=i; 
      Project.Variables.TCID = Driver.Value("TCID");
      Project.Variables.desc = Driver.Value("Description");
      Project.Variables.status = "Pass";
      try{
      Project.Variables.startTime = aqDateTime.Time();       
      Runner.CallMethod(Driver.Value("TopLevelComplexAction"));       
      }
      catch(ex){
        Log.Message("No data in test data file");
      }
     
    }     
      Driver.Next();  
  }
  
  DDT.CloseDriver(Driver.Name);
  logOut();
  //AfterTestEnds();
}