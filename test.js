// Look ma, no jQuery!
var pdf_file = 'pdfjs/web/compressed.tracemonkey-pldi-09.pdf';

var lc = LC.init(
    document.getElementsByClassName('literally')[0],
    {imageURLPrefix: 'literallycanvas/img'}
);

var scale = 1.0;
var pageno = 1;
var canvas =
    document.querySelector('div.lc-drawing canvas:first-child');
var context = canvas.getContext('2d');
var canvas_list =
    document.querySelectorAll('div.lc-drawing canvas');

PDFJS.getDocument(pdf_file).then(function(pdf) {
    function draw_pdf(pageno) {
	// you can now use *pdf* here
	pdf.getPage(pageno).then(function(page) {
	    // you can now use *page* here
	    var viewport = page.getViewport(lc.scale);
	    var i;
	    for (i=0; i < canvas_list.length; ++i) {
	    	canvas_list[i].style.height = viewport.height;
		canvas_list[i].style.width = viewport.width;
		canvas_list[i].height = viewport.height;
		canvas_list[i].width = viewport.width;
	    }
	    var context = canvas.getContext('2d');
	    context.setTransform(1, 0, 0, 1, lc.position.x,
			      lc.position.y);
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
	draw_pdf(pageno);
    });

    draw_pdf(pageno);
});



