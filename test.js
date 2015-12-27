// Look ma, no jQuery!
var pdf_file = 'pdfjs/web/compressed.tracemonkey-pldi-09.pdf';
LC.init(
    document.getElementsByClassName('literally')[0],
    {imageURLPrefix: 'literallycanvas/img'}
);

function draw_pdf(pdf_file, pageno) {
    PDFJS.getDocument(pdf_file).then(function(pdf) {
	// you can now use *pdf* here
	pdf.getPage(pageno).then(function(page) {
	    // you can now use *page* here
	    var scale = 1.5;
	    var viewport = page.getViewport(scale);
	    var canvas =
		document.querySelector('div.lc-drawing canvas:first-child');
	    var context = canvas.getContext('2d');
	    canvas.style.height = viewport.height;
	    canvas.style.width = viewport.width;
	    canvas.height = viewport.height;
	    canvas.width = viewport.width;
	    var renderContext = {
		canvasContext: context,
		viewport: viewport
	    };
	    page.render(renderContext);
	});
    });
}

draw_pdf(pdf_file, 1);
