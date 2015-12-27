// Look ma, no jQuery!
var pdf_file = 'pdfjs/web/compressed.tracemonkey-pldi-09.pdf';

var lc = LC.init(
    document.getElementsByClassName('literally')[0],
    {imageURLPrefix: 'literallycanvas/img'}
);

PDFJS.getDocument(pdf_file).then(function(pdf) {
    function draw_pdf(pageno) {
	// you can now use *pdf* here
	pdf.getPage(pageno).then(function(page) {
	    // you can now use *page* here
	    var scale = 1.5;
	    var viewport = page.getViewport(scale);
	    var i, canvas_list =
		document.querySelectorAll('div.lc-drawing canvas');
	    for (i=0; i < canvas_list.length; ++i) {
	    	canvas_list[i].style.height = viewport.height;
		canvas_list[i].style.width = viewport.width;
		canvas_list[i].height = viewport.height;
		canvas_list[i].width = viewport.width;
	    }
	    var canvas =
		document.querySelector('div.lc-drawing canvas:first-child');
	    var context = canvas.getContext('2d');
	    var renderContext = {
		canvasContext: context,
		viewport: viewport
	    };
	    page.render(renderContext);
	});
    };
    lc.on("repaint", function(layer) {
	if (layer.layerKey != "background") {
	    return;
	}
	draw_pdf(1);
    });
    draw_pdf(1);
});



