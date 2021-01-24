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
		
		var imgCanvas = document.getElementById("imgCanvas")
		imgCanvas.fn = file.name;
		
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
	convertToPPM(pix, width, height, imgCanvas.fn);
	//debugger;
}

function convertToPPM(data, width, height, fn)	{
	
	var output = { data: [], width: width, height: height, filename: fn } // PPM Object
	
	for (var i = 0; i < data.length; i += 4)	{
		
		output.data.push(data[i])
		output.data.push(data[i+1])
		output.data.push(data[i+2])
	}
	
	Data.PPM[fn] = output;
	Data.PPM_refs.push(fn);
	
	log("Converted Image To PPM.")
}