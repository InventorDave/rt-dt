var img_;
function readImageFile(e)	{
	
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
	
	
	log("Image File Loaded.")
	convertToPPM(pix, width, height);
	//debugger;
}

function convertToPPM(data, width, height)	{
	
	var nl = " "
	
	var output = "P3 <br>" + width + " " + height + " <br>" + "255 <br>"
	for (var i = 0; i < data.length; i += 4)	{
		
		output += data[i] + nl + data[i+1] + nl + data[i+2] + nl
		
		/*
		if ((i % 16) == 0)
			output += "<br>"
		*/
	}
	
	var ppmWindow = window.open("ppmWindow.html","newWindow" + GetUID(),"width=500,height=700");  
	ppmWindow.onload = function(){

		ppmWindow.document.getElementById('mainBody').innerHTML = output;
    }
}