//USEUNIT MainActionsFunction

function verifySearchBoxFunctionality(){
  var Driver2 = DDT.ExcelDriver(ProjectSuite.Path+"\Malta\\TestCaseDataFiles\\TestCases.xlsx","TestData",true);
  var page =Aliases.browser.Page("https://lava.mt/*");
  page.Wait();
  var searchBox = page.FindElement("//input[@type='search']");
  searchBox.SetText(Driver2.Value("SearchItem"));
  searchBox.Keys("[Enter]");
  do{
    var searchedItems = page.WaitElement("//p[@class='woocommerce-result-count']",100);
  }
  while(! searchedItems.Exists)
  
  if(searchedItems.Exists){
     Project.Variables.status = "Pass";
     Project.Variables.result="User is able to search items from search box. Total search items cout is as - "+searchedItems.contentText;
     Message();
  }else{
    Project.Variables.status = "Fail";
    Project.Variables.result="User is not able to search items from search boxx.";
  Message();
  }
   
}

function removeWishListItems(){
  var page =Aliases.browser.Page("https://lava.mt/*");
   var wishListTab = page.FindElement("//a[.='Wishlist']");
  wishListTab.Click();
  page.Wait();
  var removeBtn = page.FindElements("//button[@class='minus-qty']");
    var itemStatus = page.FindElement("(//a[@class='remove remove_from_wishlist'])[1]");
    if(itemStatus.VisibleOnScreen){
    itemStatus.Click();
    Delay(5000);
    page.Wait();
    Project.Variables.result=page.FindElement("//div[@class='woocommerce-message']").contentText; 
   if(Project.Variables.result=="Product successfully removed."){
     Project.Variables.status = "Pass";
   }
    Message();
   }
    else{
      Project.Variables.result="Not able to delete items from wishlist";
      Project.Variables.status = "Fail";
    }
  }
  
function increaseQtyWishListItem(){
    var page =Aliases.browser.Page("https://lava.mt/*");
    var wishListTab = page.FindElement("//a[.='Wishlist']");
     wishListTab.Click();
     page.Wait();
     var plusBtn = page.FindElement("(//button[@class='plus-qty'])[1]");
     var initialQty = page.FindElement("(//div[@class='product-quantity-wrap']//div/input)[1]").Text;
     var count = parseInt(initialQty);
     plusBtn.Click();
     Delay(5000);
     var finalQty=page.FindElement("(//div[@class='product-quantity-wrap']//div/input)[1]").Text;
     var count1 = parseInt(finalQty)
     if( count1 > count){
        Project.Variables.result="Initial Qty is "+initialQty+" and increased Qty is "+finalQty;
        Project.Variables.status = "Pass";
     }else{
        Project.Variables.result="User is not able to increase Qty of wishList Items";
        Project.Variables.status = "Fail";
     }
     page.Wait();
     Message();
}

function addItemsInACart(){  
  var Driver2 = DDT.ExcelDriver(ProjectSuite.Path+"\Malta\\TestCaseDataFiles\\TestCases.xlsx","TestData",true);
  var page =Aliases.browser.Page("https://lava.mt/*");
  var searchBox = page.WaitElement("//input[@type='search']",100);
   autoDelay(searchBox);
   searchBox.Keys("^a");
   searchBox.SetText("");
   searchBox.SetText(Driver2.Value("SearchItem"));
   searchBox.Keys("[Enter]");
   page.Wait(); 
 do{
    var searchedItems = page.WaitElement("//p[@class='woocommerce-result-count']",100);
  }
  while(! searchedItems.Exists)
 
  var ele = page.FindElements("//h2[@class='woocommerce-loop-product__title']");
        page.FindElement("(//ul/li/a//picture/img)[1]").Click();
        page.Wait();   
     var addCart = page.FindElement("//button[.='Add to cart']")
     if(addCart.WaitProperty("Enabled",3000,true)){       
        addCart.Click();
        page.Wait(); 
        Project.Variables.status="Pass";
        Project.Variables.result="Items added to cart successfully.";
        Message();
        }else{
          Project.Variables.status="Fail";
        Project.Variables.result="Add To Cart Button is disabled for this item";
        Message();
        }
}

function addItemsWishlist(){  
  var Driver2 = DDT.ExcelDriver(ProjectSuite.Path+"\Malta\\TestCaseDataFiles\\TestCases.xlsx","TestData",true);
  var page =Aliases.browser.Page("https://lava.mt/*");
  var searchBox = page.WaitElement("//input[@type='search']",100);
  page.Wait();
   autoDelay(searchBox);
   searchBox.Keys("^a");
   searchBox.SetText("");
   searchBox.SetText(Driver2.Value("SearchItem"));
   searchBox.Keys("[Enter]");
   page.Wait(); 
 do{
    var searchedItems = page.WaitElement("//p[@class='woocommerce-result-count']",100);
  }
  while(! searchedItems.Exists)
 
  var ele = page.FindElements("//h2[@class='woocommerce-loop-product__title']");
    for(var i=0;i<ele.length;i++){
        page.FindElement("(//i[@class='yith-wcwl-icon far fa-heart'])[1]").Click();
        page.Wait(); 
        break;              
    }   
    var checkedHeart = page.FindElement("(//i[@class='yith-wcwl-icon fa fa-heart'])[1]");
    if(checkedHeart.VisibleOnScreen){
       Project.Variables.status = "Pass";
        Project.Variables.result="Items successfully added to the wishlist"; 
        page.Wait();  
        Message();
        }
        else{
          Project.Variables.status="Fail";
          Project.Variables.result="User not able to add item in wishlist."; 
         Message();
        }
}

function validateWishListItems(){
  var page =Aliases.browser.Page("https://lava.mt/*");
  var wishListTab = page.FindElement("//a[.='Wishlist']");
  wishListTab.Click();
  page.Wait();
  var items = page.FindElement("//div[@class='product-info']/a");  
  if(items.Exists){
    Project.Variables.status="Pass";
    Project.Variables.result="Items added as wishlist ia available in wishlist tab";  
    Message();
  }else{
    Project.Variables.status="Fail";
    Project.Variables.result="Not able to add Items in wishlist";  
    Message();
  }
}

function totalWishListItems(){
  var page =Aliases.browser.Page("https://lava.mt/*");  
  var wishListTab = page.FindElement("//a[.='Wishlist']");
  wishListTab.Click();
  page.Wait();
  var totalProducts = page.FindElements("//div[@class='product-info']/a");
  Project.Variables.result="Total Items count in wishList is - "+totalProducts.length;
  Message();
}

function moveWishlistToCart(){
  
  var page =Aliases.browser.Page("https://lava.mt/*");  
  var wishListTab = page.FindElement("//a[.='Wishlist']");
  wishListTab.Click();
  page.Wait();
  var addBtn = page.FindElement("(//a[@class='button product_type_variation add_to_cart_button ajax_add_to_cart button add_to_cart alt'])[1]");
  addBtn.Click();
  Delay(2000);
  Aliases.browser.pageFatherSDayLavaMt.FindElement("//input[@name='update_wishlist']").Click();
  page.Wait();
  Delay(3000);
  var msg = page.FindElement("//div[@class='woocommerce-message']").contentText;
  if(msg=="Changes applied correctly"){
    Project.Variables.status="Pass";
    Project.Variables.result = "Changes applied correctly ";
    Message();
  }else{
    Project.Variables.status="Fail";
    Project.Variables.result = "Not able to mve wishlist Items to cart";
    Message();
  }
}

function checkCartTotalAmount(){
  var page =Aliases.browser.Page("https://lava.mt/*");  
  page.Wait();
  var amountEle = page.FindElement("(//span[@class='woocommerce-Price-amount amount'])[1]");
  
  Project.Variables.status = "Pass";
  Project.Variables.result = "Total amount for the items added in your cart is - "+amountEle.contentText;
  Message();
}

function checkRewardsPoint(){
  var page =Aliases.browser.Page("https://lava.mt/*");  
  var rewardsTab = page.FindElement("//a[.='My Rewards']");
  rewardsTab.Click();
  page.Wait();
  var points = page.FindElement("//ul[@class='points list-unstyled']/li[@class='points']");
  if(points.contentText){
    Project.Variables.status="Pass";
    Project.Variables.result="Your total rewards is - "+points.contentText;
    Message();
  }else{
    Project.Variables.status="Fail";
    Project.Variables.result="You don't have rewards point.";
    Message();
  }
  
}
function autoDelay(ele){
  
 do{
    var searchedItems = ele;
  }
  while(!searchedItems.Exists)

}

