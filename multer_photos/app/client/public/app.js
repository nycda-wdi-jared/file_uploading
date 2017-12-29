$(document).ready(function(){
	
	$('#file-form').on('submit', function(e) {
		e.preventDefault();
      	var formData = new FormData($(this)[0]);
	   	$.ajax({
			url: '/fileupload/' + $('#name-input').val(),
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			enctype: 'multipart/form-data',
			processData: false,
			success: function (response) {
				$.ajax({
					method: 'GET',
					url: '/images'
				}).then(function(res){
					var img;
					for(var i = 0; i < res.length; i++){
						img = $('<img>',{
							height: 125,
							width: 'auto',
							src: './public/uploaded_images/' + res[i]
						});
						$('#images-div').append(img)
					}
				});
			}
	   	});
	   	return false;
	});

});

