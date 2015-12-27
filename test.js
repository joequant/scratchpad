// Look ma, no jQuery!
LC.init(
    document.getElementsByClassName('literally')[0],
    {imageURLPrefix: 'literallycanvas/img'}
);
PDFJS.getDocument('pdfjs/web/compressed.tracemonkey-pldi-09.pdf').then(function(pdf) {
    // you can now use *pdf* here
    pdf.getPage(1).then(function(page) {
	// you can now use *page* here
	var scale = 1.5;
	var viewport = page.getViewport(scale);
	var canvas =
	    document.querySelector('div.lc-drawing canvas:first-child');
	var context = canvas.getContext('2d');
	canvas.height = viewport.height;
	canvas.width = viewport.width;
	var renderContext = {
	    canvasContext: context,
	    viewport: viewport
	};
	page.render(renderContext);
    });
});

