#!/usr/bin/perl
use DBI;
use CGI;
use CGI::Cookie;


my $q = new CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn008";
my $username = "jadrn008";
my $password = "seat";
my $database_source = "dbi:mysql:$database:$host:$port";	
my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $sth = $dbh->prepare("select jadrn008.accounts.OrderDate, jadrn008.accounts.sku, proj4.products.title, jadrn008.accounts.quantity, proj4.products.cost, proj4.products.retail  from jadrn008.accounts, proj4.products where jadrn008.accounts.sku = proj4.products.sku  ORDER BY jadrn008.accounts.sku");
$sth->execute();

print <<END_HTML;
Content-type: text/html

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title>CGI Script that echoes parameters</title>
	<meta http-equiv="content-type" 
		content="text/html;charset=utf-8" />
	<meta http-equiv="Content-Style-Type" content="text/css" />
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
            <center><h1>Sales Report</h1></center>
            </br>

<table class='table-responsive table' id='confrim-table'>\n
<tr>
<th class="confirm-h1" style="padding-left: 7%;">Order Date</th>
<th class="confirm-h1" style="padding-left: 5%;">SKU</th>
<th class="confirm-h1" style="padding-left: 11%;">Product</th>
<th class="confirm-h1" style="padding-left: 7%;">Quantity</th>
<th class="confirm-h1" style="padding-left: 5%;">Cost</th>		
<th class="confirm-h1" style="padding-left: 5%;">Sales</th>
</tr>
END_HTML

$str = "";
$totalQuant = 0;
$totalaccounts = 0;
$totalCost = 0;
while(my @row=$sth->fetchrow_array()) {
print "<tr>\n";
       
for(my $i=0; $i< @row; $i++) {
	if($i == 3) {
		$totalQuant += $row[$i];
		$totalaccounts += ($row[$i]*$row[5]);
		$totalCost += ($row[$i]*$row[4]);
	}
}
foreach $item (@row) { 
     print "<td class='confirm-td'>$item</td>\n";
  	 }         
     print "</tr>\n"; 
}
 
$sth->finish();
$dbh->disconnect();

my $profit = $totalaccounts - $totalCost;
print "<tr>\n<td colspan = '6'></td></tr>";
print "<tr>\n";
print "<td class='confirm-td'> <strong>Total Items sold :</strong> </td><td class='confirm-td'><strong>$totalQuant</strong></td></tr>";
print "<tr><td class='confirm-td'> <strong>Gross Sale :</strong> </td><td class='confirm-td'><strong>\$$totalaccounts</strong></td></tr>";
# print "Total accounts = \$$totalaccounts <br/>"; 
print "<tr><td class='confirm-td'> <strong>Gross Profit :</strong> </td><td class='confirm-td'><strong>\$$profit</strong></td></tr>";
print "</table>\n";
print "</div>\n";
print "</body>\n";
print "</html>\n";
