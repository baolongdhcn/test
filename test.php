<?php
//connect vào CSDL MySQL
//host = localhost
//username = root
//password = rỗng
$conn = mysqli_connect('localhost', 'root', '', 'test') or die ('Không thể kết nối tới database');
 

 $ffmpeg="/ffmpeg/bin/ffmpeg";

//$videoFile = $_FILES['file']['tmp_name'];
 if(!isset($_FILES['file']) || ($_FILES['file']['tmp_name'] == ''))
        echo "<pre>".['file']['error']."</pre>";
    else {
echo $_FILES['file']['tmp_name'];
}
$size="120x90";


for ($num=1; $num <=3 ; $num++) { 
	$interval=$num * 3;
	shell_exec("$ffmpeg -i 2.mp4 -an -ss 00:00:03 -an -r 1 -vframes 1 -s $size -y $num.jpg");
	echo "ok";
}

//mở file ảnh để đọc với chế độ đọc binary

 
?>