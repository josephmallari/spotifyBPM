$('input').click((e) => {
 e.preventDefault();

 const searchString = $('input').val();
 const originalHref = $('form').attr('action');

 $('form').submit(
	$.get(`${originalHref}?search=${searchString}`, {}).done((data) => {
		console.log(data);
		data[0].items.forEach((track) => {
			document.querySelector('.track__title').innerHTML += `<div>${track.name}</div>`;
		});
		data[1].forEach((x) => {
			document.querySelector('.track__audio-features').innerHTML += `<div>${x.tempo}</div>`;
		});
	 })
  );
});
