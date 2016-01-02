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
var draw_pdf = function() {};
var shapes_pages = {}
var bg_shapes_pages = {}

PDFJS.getDocument(pdf_file).then(function(pdf) {
    var num_pages = pdf.numPages;
    var current_page = 1;
    document.getElementById('numPages').textContent = num_pages;
    document.getElementById('pageNumber').max = num_pages;
    function set_drawpdf(pageno) {
	document.getElementById('pageNumber').value = pageno;
	pdf.getPage(pageno).then (
	    function(page) {
		draw_pdf = function() {
		    // you can now use *page* here
		    var viewport = page.getViewport(lc.scale);
		    var i;
		    for (i=0; i < canvas_list.length; ++i) {
			canvas_list[i].style.height = viewport.height;
			canvas_list[i].style.width = viewport.width;
			canvas_list[i].height = viewport.height;
			canvas_list[i].width = viewport.width;
		    }
		    var renderContext = {
			canvasContext: context,
			viewport: viewport
		    };
		    page.render(renderContext);
		};
		lc.repaintAllLayers();
	    }
	);
    }
    document.getElementById("previous").onclick = function(event) {
	if (current_page <= 1) {
	    current_page = 1;
	    return;
	}
	shapes_pages[current_page] = lc.shapes;
	current_page = current_page - 1;
	lc._shapesInProgress = []
	if (shapes_pages[current_page] != undefined) {
	    lc.shapes = shapes_pages[current_page];
	} else {
	    lc.shapes = [];
	}
	set_drawpdf(current_page);
    };

    document.getElementById("next").onclick = function(event) {
	if (current_page >= num_pages) {
	    current_page = num_pages;
	    return;
	}
	shapes_pages[current_page] = lc.shapes;
	current_page = current_page + 1;
	lc._shapesInProgress = []
	if (shapes_pages[current_page] != undefined) {
	    lc.shapes = shapes_pages[current_page];
	} else {
	    lc.shapes = [];
	}
	set_drawpdf(current_page);
    };
    
    set_drawpdf(current_page);
});

lc.on("pan", function(pos) {
    context.setTransform(1, 0, 0, 1, pos.x,
			 pos.y);
});
lc.on("zoom", function() {
    context.setTransform(1, 0, 0, 1, lc.position.x,
			 lc.position.y);
});
lc.on("repaint", function(layer) {
    if (layer.layerKey != "background") {
	return;
    }
    draw_pdf();
});



