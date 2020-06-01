var img_;
function readImageFile(e)	{
	
	//alert("inside readimagefile()!")
	//var file = e.target.files[0]
	var file = e.target.files[0];
	
	if (!file)	{
		alert("No File identified!")
		return
	}
	
	var reader = new FileReader()
	
	reader.onload = function(e)	{
		
		img_ = new Image();
		img_.onload = imageLoaded;
		img_.src = e.target.result;
	}
	
	reader.readAsDataURL(file)
}

function imageLoaded()	{
	
	var imgCanvas = document.getElementById("imgCanvas")
	imgCanvas.width = img_.width;      // set canvas size big enough for the image
	imgCanvas.height = img_.height;
	var ctx = imgCanvas.getContext("2d");
	ctx.drawImage(img_,0,0);
	
	var img = ctx.getImageData(0, 0, img_.width, img_.height);
	
	var width = img_.width
	var height = img_.height
	var pix = img.data;
	
	
	//debugger;
}

/*
var file = input.files[0];
var fr = new FileReader();
fr.onload = createImage;   // onload fires after reading is complete
fr.readAsDataURL(file);    // begin reading


createImage():

img = new Image();
img.onload = imageLoaded;
img.src = fr.result;


imageLoaded():

canvas.width = img.width;      // set canvas size big enough for the image
canvas.height = img.height;
var ctx = canvas.getContext("2d");
ctx.drawImage(img,0,0);         // draw the image

// do some manipulations...

canvas.toDataURL("image/png");  // get the data URL

*/