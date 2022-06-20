//USEUNIT MainAtomicFunctions
//USEUNIT SendMail
function Login(){
  
  var Driver1 = DDT.ExcelDriver(ProjectSuite.Path+"\Malta\\TestCaseDataFiles\\TestCases.xlsx","FrameworkCfg",true);
   Browsers.Item(btChrome).Run(Driver1.Value("AppUrl"));
   Sys.Browser().BrowserWindow(0).Maximize();
   Aliases.browser.page("*").Wait();
   var page = Aliases.browser.Page(Driver1.Value("AppUrl"));
   var logInRegisterBtn = page.FindElement("//div[2]/div/a/span[contains(@class, 'text-wrap')]"); 
   logInRegisterBtn.Click();
   var emailId = page.FindElement("//input[@id=(//label[contains(.,'Email address:')]/@for)]")
   emailId.SetText(Driver1.Value("UserName")); 
   var continueBtn = page.FindElement("//button[.='Continue']");
   continueBtn.Click();
   Delay(5000);
   var pwd = page.WaitElement("//input[@id=(//label[contains(.,'Password:')]/@for)]",100);
   autoDelay(pwd);
   pwd.SetText(Driver1.Value("Password"));
   var signInBtn = page.FindElement("//button[.='Sign in']");
   signInBtn.Click();
   Aliases.browser.Page("https://lava.mt/*").Wait();
   Log.Message("User is successfully logged in to the application.");    
   DDT.CloseDriver(Driver1.Name);
}

function BeforeTestStart(){

   if(Sys.WaitBrowser().Exists)
    {
      Aliases.browser.close();
    }
        
   }

function Message(){
  
Project.Variables.endTime = aqDateTime.Time();
Project.Variables.timeInterval=aqDateTime.TimeInterval(Project.Variables.startTime,Project.Variables.endTime);
      var excel = Excel.Open(ProjectSuite.Path+"\Malta\\Report\\Report.xlsx");
      var oSheete1 = excel.SheetByTitle("Sheet1");
      oSheete1.Cell(1,Project.Variables.i).Value = Project.Variables.TCID;
      oSheete1.Cell(2,Project.Variables.i).Value = Project.Variables.desc;
      oSheete1.Cell(3,Project.Variables.i).Value = Project.Variables.status;
      oSheete1.Cell(4,Project.Variables.i).Value = Project.Variables.result;
      oSheete1.Cell(5,Project.Variables.i).Value = Project.Variables.startTime;
      oSheete1.Cell(6,Project.Variables.i).Value = Project.Variables.endTime;
      oSheete1.Cell(7,Project.Variables.i).Value = Project.Variables.timeInterval;
      excel.Save();   
}

function AfterTestEnds(){
  
  var Driver1 = DDT.ExcelDriver(ProjectSuite.Path+"\Malta\\TestCaseDataFiles\\TestCases.xlsx","FrameworkCfg",true);
  
  if (SendEmail(Driver1.Value("mailTo"),Driver1.Value("mailFrom"), "Automation Execution Report",
             "Hi All,"+"\n"+" Please find attached executed report"+"\n"+"Thanks & Regards,"+"\n"+"Automation Team", ProjectSuite.Path+"\Malta\\Report\\Report.xlsx"))
   {
     Log.Message("Message sent successfully.");
   }
   else{
     Log.Message("Not able to send message, please check recepient's ID");
   }
   
   DDT.CloseDriver(Driver1.Name);

}

function logOut(){
  
  var page = Aliases.browser.page("https://lava.mt/*");
  var myAccount = page.FindElement("(//span/span[contains(text(),'My Account')])[2]");
  myAccount.Click();
  Delay(2000);
  var logOutOption = page.FindElement("(//a[contains(text(),'Log Out')])[2]");
  logOutOption.Click();
  page.Wait();
  Aliases.browser.Close();
}