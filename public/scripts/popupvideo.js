var url = "";

 console.log("its workking");
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */

    console.log(url);
    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#myModal").on('hide.bs.modal', function(){
        $("#cartoonVideo").attr('src', '');
    });
    
    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#myModal").on('show.bs.modal', function(){
        $("#cartoonVideo").attr('src', url);
    });


//click listener which assigns url
$('.demo-reels').on('click', 'a', (function(){
 console.log($(this).attr('target'));
 url = ($(this).attr('target'));
 	var title = $(this).attr("title"); console.log(title);
  	$('.modal-title').html(title);

}));