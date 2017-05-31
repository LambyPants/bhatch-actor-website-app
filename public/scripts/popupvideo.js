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


     /* copy loaded thumbnails into carousel */
$('.row .thumbnail').on('load', function() {
  
}).each(function(i) {
  if(this.complete) {
  	var item = $('<div class="item"></div>'); console.log(item);
    var itemDiv = $(this).parents('div');
    var title = $(this).parent('a').attr("title"); console.log(title);
    
    item.attr("title",title);
  	$(itemDiv.html()).appendTo(item);
  	item.appendTo('.carousel-inner'); 
    if (i==0){ // set first item active
     item.addClass('active');
  $('.modal-title').text(title);
    }
  }
});

/* activate the carousel */
$('#modalCarousel').carousel({interval:false});

/* change modal title when slide changes */
$('#modalCarousel').on('slid.bs.carousel', function () {

  $('.modal-title').html($(this).find('.active').attr("title"));
 
})

/* when clicking a thumbnail */
$('.row .thumbnail').click(function(){
$(this).children(".buttons-to-hide").addClass("hide");
    var idx = $(this).attr('id'); console.log(idx);
  	var id = parseInt(idx);
  	$('#myModal2').modal('show'); // show the modal
    $('#modalCarousel').carousel(id); // slide carousel to selected
  	
});
