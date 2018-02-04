/*  We load the global array proj4_data once, then use it as needed
    to retrieve product information.
    
    The Milk Chocolate handler is done the old-fashion way, with an 
    'onclick' call in the xhtml code.  The rest of the buttons have 
    handlers assigned the correct way.
    
    Alan Riggins
    CS545
    Fall 2017

    Assignment 4
    Hitesh Bhatia,
    821439483
*/    


var proj4_data;
var proj4_price;

$(document).ready(function() {
    proj4_data = new Array();
    $.get('/perl/jadrn008/get_products.cgi', storeData);
        
    setTimeout( function() { homeProds(); }, 100); 

    var cart = new shopping_cart("jadrn008");
    var overall_total = 0;          
    var overall_pretotal = 0;           
    var overall_shipping = 0;           
    var overall_tax = 0;            
 
     $(function(){   
        var cart = new shopping_cart("jadrn008");
         if($('body').is('.cart-body')){         
            updateDisplay();         
          } else {            
              updateCartDisplay();            
          }           
     });        
             
     setTimeout(function() { updateDisplay(); }, 100);

     $('#dark').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Dark chocolate") {
                tmpString += "<div class='card prod-size'>";
                tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/" +
                    proj4_data[i][0] + ".jpg\" alt=\"" + proj4_data[i][2] + "\"" +
                    " width=\"200px\"  />";
                tmpString += "\n" + "<h4 class='card-title'>" + proj4_data[i][2] + "</h4>";
                tmpString += "<p class='prod-text'>"+ proj4_data[i][3] + "<br /><strong>$" + proj4_data[i][6] + "</strong></p>";

                    tmpString += "<input type='number' class='custom amount form form-control' value='1' id='amount" + proj4_data[i][0] + "'>";

                    tmpString += "<input type='button' value='Add To Cart'" +
                        "class='buy' id='" + proj4_data[i][0] + "' />";
                    tmpString += "<p id='add_to_cart'>Added to Cart</p>"; 
                    tmpString += "</div>";

            }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
    });
        
    $('#nuts').on('click', function() {   
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Nuts and chews") {  
                tmpString += "<div class='card prod-size'>";
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";                     
                tmpString += "\n" + "<h4 class='card-title'>" + proj4_data[i][2] + "</h4>";
                tmpString += "<p class='prod-text'>"+ proj4_data[i][3] + "<br /><strong>$" + proj4_data[i][6] + "</strong></p>";

                    tmpString += "<input type='number' class='custom amount form form-control' value='1' id='amount" + proj4_data[i][0] + "'>";

                    tmpString += "<input type='button' value='Add To Cart'" +
                        "class='buy' id='" + proj4_data[i][0] + "' />";
                    tmpString += "<p id='add_to_cart'>Added to Cart</p>"; 
                    tmpString += "</div>";
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
    });
        
    $('#brittle').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Brittles and toffies") {
                tmpString += "<div class='card prod-size'>";
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                 tmpString += "\n" + "<h4 class='card-title'>" + proj4_data[i][2] + "</h4>";
                tmpString += "<p class='prod-text'>"+ proj4_data[i][3] + "<br /><strong>$" + proj4_data[i][6] + "</strong></p>";

                    tmpString += "<input type='number' class='custom amount form form-control' value='1' id='amount" + proj4_data[i][0] + "'>";

                    tmpString += "<input type='button' value='Add To Cart'" +
                        "class='buy' id='" + proj4_data[i][0] + "' />";
                    tmpString += "<p id='add_to_cart'>Added to Cart</p>"; 
                    tmpString += "</div>";
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
    });

    $('#milk').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Milk chocolate") {
                tmpString += "<div class='card prod-size'>";
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                 tmpString += "\n" + "<h4 class='card-title'>" + proj4_data[i][2] + "</h4>";
                tmpString += "<p class='prod-text'>"+ proj4_data[i][3] + "<br /><strong>$" + proj4_data[i][6] + "</strong></p>";

                    tmpString += "<input type='number' class='custom amount form form-control' value='1' id='amount" + proj4_data[i][0] + "'>";

                    tmpString += "<input type='button' value='Add To Cart'" +
                        "class='buy' id='" + proj4_data[i][0] + "' />";
                    tmpString += "<p id='add_to_cart'>Added to Cart</p>"; 
                    tmpString += "</div>";      
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
    });         

     $('#holidays').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Holiday assortments") {
                tmpString += "<div class='card prod-size'>";
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                tmpString += "\n" + "<h4 class='card-title'>" + proj4_data[i][2] + "</h4>";
                tmpString += "<p class='prod-text'>"+ proj4_data[i][3] + "<br /><strong>$" + proj4_data[i][6] + "</strong></p>";

                    tmpString += "<input type='number' class='custom amount form form-control' value='1' id='amount" + proj4_data[i][0] + "'>";

                    tmpString += "<input type='button' value='Add To Cart'" +
                        "class='buy' id='" + proj4_data[i][0] + "' />";
                    tmpString += "<p id='add_to_cart'>Added to Cart</p>"; 
                    tmpString += "</div>";       
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
    });       
        
     $('#gifts').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Gifts") {
                tmpString += "<div class='card prod-size'>";
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                tmpString += "\n" + "<h4 class='card-title'>" + proj4_data[i][2] + "</h4>";
                tmpString += "<p class='prod-text'>"+ proj4_data[i][3] + "<br /><strong>$" + proj4_data[i][6] + "</strong></p>";

                    tmpString += "<input type='number' class='custom amount form form-control' value='1' id='amount" + proj4_data[i][0] + "'>";

                    tmpString += "<input type='button' value='Add To Cart'" +
                        "class='buy' id='" + proj4_data[i][0] + "' />";
                    tmpString += "<p id='add_to_cart'>Added to Cart</p>"; 
                    tmpString += "</div>";       
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
    });    

     $('#truffle').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Truffles") {
                tmpString += "<div class='card prod-size'>";
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                tmpString += "\n" + "<h4 class='card-title'>" + proj4_data[i][2] + "</h4>";
                tmpString += "<p class='prod-text'>"+ proj4_data[i][3] + "<br /><strong>$" + proj4_data[i][6] + "</strong></p>";

                    tmpString += "<input type='number' class='custom form form-control' value='1' id='amount" + proj4_data[i][0] + "'>";

                    tmpString += "<input type='button' value='Add To Cart'" +
                        "class='buy' id='" + proj4_data[i][0] + "' />";
                    tmpString += "<p id='add_to_cart'>Added to Cart</p>"; 
                    tmpString += "</div>";       
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
    });   
        
    $(document).on('click', ".buy", function() {  
            var sku = this.id;
            var amt = $("#amount" + sku).val();

        if(amt <= 0){
            alert("You can not go less than 0 on products.");
            $("#amount" + this.id).val(1);
            return;
        }
            cart.add(sku,amt);

            updateCartDisplay();
             $(this).next().fadeIn(50).fadeOut(2000);
            $("#cart-count").text = cart.size();
    });      

    function updateCartDisplay() {
        $('#cart-count').text(cart.size()); 
    }

    function updateDisplay() {
        var cartArray = cart.getCartArray();
        var currrentTotal = 0;
        var productTotal = 0;
        var taxAmt = 0;
        var shipping = 0;
        var totalShipping =0;

        var toWrite = "<table id='cart-table' class='table table-striped'>";
        toWrite += "<tr><th class='table-header'>Photo</th><th class='table-header'>SKU</th><th class='table-header'>Quantity</th><th class='table-header'>Product</th><th class='table-header'>Price($)</th><th class='table-header'>Total Price($)</th><th class='table-header'>Shipping($)</th></tr>";
        for(i=0; i < cartArray.length; i++) {
            var sku1 = cartArray[i][0];
            var qty = cartArray[i][1];

            toWrite += "<tr>";
            toWrite += "<td><img alt='chocolate' src='/~jadrn000/PROJ4_IMAGES/"+ sku1 +".jpg' width='80px'/>" +"</td>";
            toWrite += "<td>"+sku1+"</td>"; // sku 
            toWrite += "<td>"+qty+"</td>";  // quantity
            for(var j=0; j < proj4_data.length; j++){
                if(proj4_data[j][0] == sku1){
                     toWrite += "<td>"+proj4_data[j][2]+"</td>";  // product
                    productTotal += (parseFloat(proj4_data[j][6]) * parseFloat(qty));
                    shipping += (parseFloat(2));
                    currrentTotal += productTotal;
                    toWrite += "<td>$"+proj4_data[j][6]+"</td>"; // price
                }
            }
            toWrite += "<td>$"+productTotal.toFixed(2)+"</td>"; 
            toWrite += "<td>$"+shipping+"</td>";
           // toWrite += "<td><input type='button' value='add' id='add' name='" + sku1 + "' />" + "</td>";
           toWrite += "<td><input type='number' value='"+qty+"' id='add' class='custom2 form form-control' name='" + sku1 + "' quant ='"+this.text+"'></td>";
           
            toWrite += "<td><input type='button' value='Delete' id='empty' name='" + sku1 + "' quant />" + "</td>";
            totalShipping += shipping; 
            shipping = 0;
            productTotal = 0;
            toWrite += "</tr>";
            }
            overall_pretotal = currrentTotal.toFixed(2);
            taxAmt = currrentTotal * .08;
            currrentTotal += (taxAmt + totalShipping);


            overall_total = currrentTotal;
            overall_shipping = totalShipping;
            overall_tax = taxAmt;

            toWrite += "<tr><td>Sales Tax</td><td>$" + taxAmt.toFixed(2) + "</td>";
            toWrite += "<tr><td>Total Shipping</td><td>$" + totalShipping + "</td>";
            toWrite += "<tr><td>Total</td><td>$" +currrentTotal.toFixed(2) + "</td>";
        toWrite += "</table>"; 
        //toWrite += "<div class='order'><input type='button' value='Order Now'></input></div>";
        toWrite += "<h3 id='error_msg'>&nbsp;</h3>";
        $('#cart').html(toWrite);     
        updateCartDisplay();
        $('#total-order').text(currrentTotal.toFixed(2));
    } 
      

    $(document).on('change', "#add", function(e) {  
        var sku = $(e.target).attr("name");
        var qty = parseInt(e.target.value);
        if(qty <= 0){
            cart.delete(sku);
        }else{
            cart.setQuantity(sku,qty);
        }
        updateCartDisplay();
        updateDisplay();
    });


     $(document).on('click', "#remove", function(e) {  
        var sku = $(e.target).attr("name");
        // if qty == 1, then empty

        cart.add(sku,-1);
        updateCartDisplay();
        updateDisplay();
    });   

     $(document).on('click', "#update", function(e) {  
        var sku = $(e.target).attr("name");
        var qty = $(e.target).attr("placeholder");
        alert("qty is :" + qty);

        // if qty == 1, then empty
        cart.setQuantity(sku, qty);
        updateCartDisplay();
        updateDisplay();
    });         

    $(document).on('click', "#empty", function(e) {  
        var sku = $(e.target).attr("name");
        cart.delete(sku);
        updateCartDisplay();
        updateDisplay();
        display_order_form();
    });    

function display_order_form(){
      var x = document.getElementById("order_now_form");
         var y = document.getElementById("features");
         if (cart.size() > 0 ) {
         //$("#cart-table").toggle();
         $('#what_kind').html("");
         $("#total").val(overall_total.toFixed(2));
         $('#shipping').val(overall_shipping);
         $('#tax').val(overall_tax.toFixed(2));
         $('#pretotal').val(overall_pretotal);            
                    x.style.display = "block";
                    y.style.display = "block";                    
     } else {
        x.style.display = "none";
        y.style.display = "none";
        $('#error_msg').html("<a href='products.html'>Your cart is empty, Continue Shopping!</a>");
     }
}
 
    $( "#order" ).click(function() {
       display_order_form();
    });


    // copy billing to shipping technique via https://gist.github.com/jasonvarga/7492871
    $("#ship_addr").on("change", function(){
        if (this.checked) {
          $("[name='fname_shipping']").val($("[name='fname_billing']").val());
          $("[name='mname_shipping']").val($("[name='mname_billing']").val());
          $("[name='lname_shipping']").val($("[name='lname_billing']").val());
          $("[name='address1_shipping']").val($("[name='address1_billing']").val());
          $("[name='address2_shipping']").val($("[name='address2_billing']").val());
          $("[name='city_shipping']").val($("[name='city_billing']").val());
          $("[name='state_shipping']").val($("[name='state_billing']").val());
          $("[name='zipcode_shipping']").val($("[name='zipcode_billing']").val());
          $("[name='email_id_shipping']").val($("[name='email_id_billing']").val());
          $("[name='phone_shipping']").val($("[name='phone_billing']").val());
        }else{
          $("[name='fname_shipping']").val("");
          $("[name='mname_shipping']").val("");
          $("[name='lname_shipping']").val("");
          $("[name='address1_shipping']").val("");
          $("[name='address2_shipping']").val("");
          $("[name='city_shipping']").val("");
          $("[name='state_shipping']").val("");
          $("[name='zipcode_shipping']").val("");
          $("[name='email_id_shipping']").val("");
          $("[name='phone_shipping']").val("");
        }
  });
});    

function homeProds(){
        tmpString = "<h3><span id='home_prod_heading'>Some of Our Products: </span></h3>";
        tmpString += "<table class=\"table table-striped\"><tr>";

        var i = 1 ;
        for(var j=0; j < 8; j++) {
                i = Math.floor((Math.random() * (proj4_data.length-1)));
               if(j===4){
                     tmpString += " </tr> <tr> ";
                }
                tmpString += "<td class=\"ImageTd\"><center><a href='products.html'><img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\" /> </br><span id='home_prod_caption'> "+proj4_data[i][2]+"</span> </center></a></td>";  
        }
         tmpString += "</tr></table>"; 
        var handle = document.getElementById('home_products');
        handle.innerHTML = tmpString;

    } 
    
   
    function storeData(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;
        }
    }      
    
    // from http://www.webmasterworld.com/forum91/3262.htm            
    function explodeArray(item,delimiter) {
    tempArray=new Array(1);
    var Count=0;
    var tempString=new String(item);

    while (tempString.indexOf(delimiter)>0) {
    tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
    tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
    Count=Count+1
    }

    tempArray[Count]=tempString;
    return tempArray;
}     