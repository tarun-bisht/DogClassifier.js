$('#inputFile').change(function() {
	let reader=new FileReader();
	reader.onload=function(){
		let dataURL=reader.result;
		image=$("#input-image");
		image.attr('src', dataURL);
		$('.progress').show('fast');
		image.on('load',()=>{
			$("#output-prediction").empty();
			predict();
		});
	}
	let file=$(this).prop('files')[0];
	reader.readAsDataURL(file);
});

let model;
(async function(){
	path='/demo/image/'+Math.floor(Math.random()*3).toString()+'.jpg';
	$('#input-image').attr('src',path);
	model=await tf.loadLayersModel("https://ml-models11.herokuapp.com/model_dog_breed_classifier");
	$(".loader-wrapper").fadeOut('slow');
})().then(predict);

async function predict()
{
	let image=$('#input-image').get(0);
	let tensor=tf.browser.fromPixels(image)
		.resizeNearestNeighbor([299,299])
		.toFloat()
		.expandDims();
	tensor=preprocess_input(tensor);
	let predictions=await model.predict(tensor).data();
	$('.progress').hide('slow');
	getResult(predictions)
}
function getResult(predictions)
{
	let maxprob=indexOfMax(predictions);
	if(validPrediction(predictions))
	{
		$("#output-prediction").prop('innerHTML', "It's "+breeds[maxprob]);
	}
  	else
  	{
		$("#output-prediction").prop('innerHTML',"Not Sure, But Seems like "+breeds[maxprob]);
  	}
}
function validPrediction(arr)
{
	return (arr[indexOfMax(arr)]>0.5)
}

function indexOfMax(arr)
{
	if (arr.length === 0)
	{
		return -1;
	}

	var max = arr[0];
	var maxIndex = 0;
	for (var i = 1; i < arr.length; i++)
	{
		if (arr[i] > max)
		{
			maxIndex = i;
			max = arr[i];
		}
	}
	return maxIndex;
}
function preprocess_input(tensor)
{
	tensor=tf.div(tensor,255.);
	tensor=tf.sub(tensor,0.5);
	tensor=tf.mul(tensor,2.);
	return tensor;
}