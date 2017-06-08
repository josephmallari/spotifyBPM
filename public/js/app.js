$('input').click((e) => {
 e.preventDefault();

 const searchString = $('input').val();
 const originalHref = $('form').attr('action');

 $('form').submit(
	$.get(`${originalHref}?search=${searchString}`, {}).done((data) => {
		console.log(data);
	 })
  );
});
