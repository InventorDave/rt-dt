<?php

// note, this file needs to be on inventordave.com to work, or you need a PPM folder in your root dir.
$dir = "PPM";

// Sort in ascending order - this is default
$a = scandir($dir);

if(!$a)	{
	echo "fail!";
	die();
}

// Sort in descending order
//$b = scandir($dir,1);

//print_r($a);
//print_r($b);

//echo "name = " . $a[11] ."<br><br>";

echo "<doctype HTML>\n<html lang='en'>\n<head>\n<title>PPM Files</title>\n</head><body>\n";
echo "<script>\nfunction msg()	{ alert('DON'T download the files by directly clicking on the link! You must RIGHT-CLICK on the link and select \"save file as...\" from the context menu. Enjoy!'); }\n</script>\n\n";

$j = count($a);

for ($i = 2; $i < $j; $i++)	{
	
	echo "<a onclick='msg(); return false;' href='PPM/" . $a[$i] . "'>" . $a[$i] . "</a><br>\n";
	
}

echo "</body>\n</html>";

die();
?>