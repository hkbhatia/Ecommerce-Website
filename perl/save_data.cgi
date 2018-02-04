#!/usr/bin/perl  

use CGI;
use CGI::Cookie;
use DBI;

$q = new CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn008";
my $username = "jadrn008";
my $password = "seat";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

#send a blank cookie.  You must insert this into the header before
#printing anything.  Also, using the CGI module makes printing
#content-type: text/html redundant.
my $cookie = $q->cookie(-name=>'jadrn008',-value=>'',-path=>'/');
print $q->header(-cookie=>$cookie);
print <<END_CONTENT;
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title>Berthas Deluxe Chocolates</title>
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
	<link rel ="stylesheet" type="text/css" href="http://jadran.sdsu.edu/~jadrn008/proj4/mycssfile.css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="http://jadran.sdsu.edu/~jadrn008/proj4/basic.js"></script>
	<script src="http://jadran.sdsu.edu/~jadrn008/proj4/js/shopping_cart.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</head>    

<body>

	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
				<span class="icon-bar"></span>
			</button>
				<a href="http://jadran.sdsu.edu/~jadrn008/proj4/index.html" class="navbar-brand">Home</a>
				<a href="http://jadran.sdsu.edu/~jadrn008/proj4/products.html" class="navbar-brand">Products</a>
				<a href="http://jadran.sdsu.edu/~jadrn008/proj4/order_online.html" class="navbar-brand">Order Online</a>
				<a href="http://jadran.sdsu.edu/~jadrn008/proj4/about_us.html" class="navbar-brand">About Us</a>
				<a href="http://jadran.sdsu.edu/~jadrn008/proj4/contact_us.html" class="navbar-brand">Contact</a>
				<a href="/perl/jadrn008/report.cgi" class="navbar-brand navbar-right">Report</a>
		</div>
	</div>


    <div>
            <center><h1>Order Confirmation</h1></center>
END_CONTENT
my %cookies = $ENV{COOKIE};

print "<br/><h3 class='confirm-h1'>Please find the Order Confirmation Below: </h3>";
my $v = $q->cookie('jadrn008');
# print "The raw cookie value is $v<br />";   
@rows = split('\|\|',$v);
foreach $row (@rows) {
    ($sku, $qty) = split('\|',$row);
    my $sth = $dbh->prepare("INSERT INTO accounts (sku, quantity, OrderDate) VALUES ('$sku','$qty', NOW())");
	$sth->execute();
    } 

 print "<table class='table-responsive table' id='confrim-table'>\n";
 
 print "<tr>";
 
 print "<td class='confirm-td'>Shpping Name : </td>";
 my $fname = $q->param('fname_shipping');
 my $lname = $q->param('lname_shipping');
 print "<td class='confirm-td'>$fname $lname</td></tr>";
 
 print "<tr>"; 
 
 print "<td class='confirm-td'>Shpping Address : </td>";
 my $ship1 = $q->param('address1_shipping');
 my $ship2 = $q->param('address2_shipping');
 my $zip = $q->param('zipcode_shipping');
 print "<td class='confirm-td'>$ship1\n$ship2\n$zip</td></tr>";
 
 print "<tr>"; 
 
 print "<td class='confirm-td'>Phone Number : </td>";
 my $phone = $q->param('phone_shipping');
 print "<td class='confirm-td'>$phone</td></tr>";

 print "<tr>"; 
 
 print "<td class='confirm-td'>Email ID : </td>";
 my $email = $q->param('email_id_shipping');
 print "<td class='confirm-td'>$email</td></tr>";

 print "<tr>"; 
 
 print "<td class='confirm-td'>Card Used : </td>";
 my $card = $q->param('card_number');
 $card = "XXXX-XXXX-XXXX-" . substr($card, -4);
 print "<td class='confirm-td'>$card</td></tr>";

 print "<tr>"; 
 
 print "<td colspan='2'><h3 class='confirm-h1'>Order Details : </h3></td>";

 print "<tr>"; 
 
 print "<td class='confirm-td'>Final Amount : </td>";
 my $final = $q->param('pretotal');
 print "<td class='confirm-td'>$final</td></tr>";

 print "<tr>"; 
 
 print "<td class='confirm-td'>Tax (8%) : </td>";
 my $tax = $q->param('tax');
 print "<td class='confirm-td'>$tax</td></tr>";

 print "<tr>"; 
 
 print "<td class='confirm-td'>Shipping : </td>";
 my $shipping = $q->param('shipping');
 print "<td class='confirm-td'>$shipping</td></tr>";

 print "<tr>"; 
 
 print "<td class='confirm-td'>Total : </td>";
 my $total = $q->param('total');
 print "<td class='confirm-td'>$total</td></tr>";

 print "</table>\n";

print "<a href='http://jadran.sdsu.edu/~jadrn008/proj4/products.html' class='confirm-a'> <button type='submit' class='btn btn-primary'> Continue Shopping </button></a>\n";

 print "</div>\n";

 print "</body>\n";
 print "</html>\n";

$dbh->disconnect();