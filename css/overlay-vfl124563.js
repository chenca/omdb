/*
 * Implements the overlay affect
 * for YouTube videos
 * @author Ian Mendiola (ianmendiola@google.com)
 */

/*
 * Dummy pixel path
 */

var _PIXEL = 'http://s.ytimg.com/yt/img/pixel-vfl73.gif'
/*
 * Overlay background image path
 */

var _OVERLAY_BG_IMG = 'http://s.ytimg.com/yt/img/white-1x1-vfl52732.png';

/*
 * Modal box dark border image path
 */
var _BORDER_BG_IMG = 'http://s.ytimg.com/yt/img/overlay-border-1x1-vfl52732.png';

/*
 * hide div only used in IE6 version
 */
var __hidediv = null;

/*
 * div to be displayed when
 * overlay is activated
 */
var _modalBox = null;

/*
 * div that gives overlay
 * effect
 */
var _overlay = null;

/*
 * CSS prefix to be used 
 * for all overlay style classes
 */

var _CSS_PREFIX = 'yt-overlay-';

/*
 * Sets the extra width
 * for the modal box
 */
var _MODAL_EXTRA_WIDTH = 22;
/*
 * max size of youtube page
 */
var _maxPageWidth = 855;

/*
 * target box height
 */
var _boxHeight = 0;

/*
 * target box width
 */
var _boxWidth = 0;

/*
 * close string
 */
var _closeText = null;

/*
 * YT path component of requestURI_
 */
var _YT_REQUEST_PATH = '/browse_box';

/*
 * Hostname to request
 */

var _requestYTHostname = 'ianmendiola.i.corp.google.com';

/*
 * global width and height of window
 */

var _winW, _winH = 0;

/*
 * id of video to be displayed
 */

var _videoId = null;

// Browser detection 
{
	var userAgent = navigator.userAgent.toLowerCase();
	_isOpera = userAgent.indexOf('opera') != -1;
	_isMSIE = userAgent.indexOf('msie') != -1 && !_isOpera;
	_isMSIE6 = userAgent.indexOf('msie 6') != -1 && !_isOpera;
	_isWebkit = userAgent.indexOf('webkit') != -1;
}

function install(boxWidth, boxHeight, closeText, optMultiplier) {
	optMultiplier = optMultiplier || 1;
	_boxHeight = boxHeight * optMultiplier;
	_boxWidth = boxWidth * optMultiplier;
	_closeText = closeText;
	// create modal box
	initModalBox();
	initOverlay();

	// hide target box on install
	hide();

	// assign listener to target box to prevent it
	// from hiding the overlay when clicked
	
	yt.events.listen(document, 'mousedown', hide);
	yt.events.listen(window, 'resize', positionModalBox);
	
	// initialize CSS styles
	initStyles();
}

/*
 * create modal dialog box
 */
function initOverlay() {
	_overlay = document.createElement('div');
	_overlay.id = _CSS_PREFIX + 'a';
	if(_isMSIE)
		_overlay.onclick = function() {hide();}

	// add iframe for ie6 SELECT hack
	// and create additional div for hiding
	if(_isMSIE6) {
		iframe = document.createElement('iframe');
		_overlay.appendChild(iframe);
	
		__hidediv = document.createElement('div');
		__hidediv.id = _CSS_PREFIX + 'b';
		__hidediv.onclick = function() {hide();}
		document.body.appendChild(__hidediv);
	}
	
	document.body.appendChild(_overlay);
}

function initModalBox() {
	_modalBox = document.createElement('div');
	_modalBox.id = _CSS_PREFIX + 'modal-box';
	
	_modalBar = document.createElement('div');
	_modalBar.id = _CSS_PREFIX + 'modal-bar';
	_modalBox.appendChild(_modalBar);
	
	var closeLink = document.createElement('div');
	closeLink.id = _CSS_PREFIX + 'close-link';
	appendText(closeLink, _closeText);

	closeLink.onclick = function() {hide();}
	_modalBar.appendChild(closeLink);

	_modalViewport = document.createElement('div');
	_modalViewport.id = _CSS_PREFIX + 'modal-viewport';
	_modalBox.appendChild(_modalViewport);

	

	// used to make sure clicking on the 
	// modal box does not hide it
	if(!_isMSIE) {
		_modalBox.addEventListener('mousedown', function(e){e.stopPropagation()}, false);
	}
	else if(_isMSIE) {
		_modalBox.attachEvent('mousedown', function(e){e.stopPropagation()});
	}
	document.body.appendChild(_modalBox);
}
/*
 * Initialize CSS Style rules
 */
function initStyles() {
	var headElement = document.getElementsByTagName('head')[0];
	
	// create a style element to hold our styles
	var styleElement = document.createElement('style');

	// check that hte browser supporrts styleSheet object property
	// if so insert a style element tot he DOM and get a reference
	if(document.styleSheets) {
		headElement.appendChild(styleElement)
		var sheet = styleElement.sheet ? styleElement.sheet : styleElement.styleSheet;
	}

	if(!sheet) {
		textNode = document.createTextNode('');
		styleElement.appendChild(textNode);
	}

	var addCSSRule = function(name, style) {
		var rule = name + ' { ' + style + ' }';
		if(sheet) {
			if (sheet.insertRule) 
				sheet.insertRule(rule, sheet.cssRules.length);
			else if(sheet.addRule)
				sheet.addRule(name, style);
		} else {
			textNode.data += rule + '\n';
		}
	}

	// IE6 specific CSS Rule to fix .png
	var overlayCondCSS = '';
	var borderCondCSS = '';
	if(!_isMSIE6) {
		overlayCondCSS = 'background-image:url("' + _OVERLAY_BG_IMG + '");';
	}
	else {
		overlayCondCSS =	alphaImageLoader(_OVERLAY_BG_IMG);
	}

	borderCondCSS = 'background-image:url("' + _BORDER_BG_IMG + '");';
	// styles the overlay screen 
	addCSSRule('#' + _CSS_PREFIX + 'a', 
						 'width:100%;' + 
						 'position:absolute; left:0; top:0;' +
						 overlayCondCSS);

	// css for internet explorer 6 SELECT bug
	if(_isMSIE6) {
		// style for dummy div to hide
		addCSSRule('#' + _CSS_PREFIX + 'b',
							'position:absolute;z-index:1000;top:0;left:0;');

		// style for iframe
		addCSSRule('#' + _CSS_PREFIX + 'a iframe', 
							'display:none;display:block;position:absolute;top:0;' +
							'left:0;z-index=-1;filter:mask();width:3000px;height:3000px;');
	}
	
	// styles the view port
	addCSSRule('#' + _CSS_PREFIX + 'modal-viewport',
						'background-color:#fff; height:' + _boxHeight +
						'px; width:' + _boxWidth + 'px; border:solid 1px #ccc;' +
						'margin:5px; padding:5px;text-align:center;');

	// styles the wrapping box
	extraWidth = _boxWidth + _MODAL_EXTRA_WIDTH;
	addCSSRule('#' + _CSS_PREFIX + 'modal-box',
						borderCondCSS + 'border:solid 1px #999;' +
						'padding:5px; position:absolute; left:0; top:0; z-index:2500;' + 
						'width:' + extraWidth + 'px; overflow:hidden;');
	if(!_isMSIE) {
		addCSSRule('#' + _CSS_PREFIX + 'modal-box', 
				'position:fixed;');
		
	}

	
	// styles the tool bar
	addCSSRule('#' + _CSS_PREFIX + 'modal-bar',
						 'height:12px; margin:0 6px 0 6px; text-align:right;');
	
	// styles close link
	addCSSRule('#' + _CSS_PREFIX + 'close-link',
						 'text-decoration:underline;color:#fff;' +
						 'cursor:pointer; font-size:11px; font-weight:bold;' +
						 'padding-left:15px; float:right;' + 
						 'background-image:url("http://s.ytimg.com/yt/img/overlay-close-10x10-vfl52732.png");' +
						 'background-repeat:no-repeat;background-position:0 2px;');
}

function show(component, box, viewport) {
	// request servlet
	setVisibility(_overlay, true);
	
	component.write(viewport.id);

	positionModalBox(box);
	setVisibility(box, true);
	if (_isMSIE6) {
		window.onscroll = positionModalBox;
	}
}

function hide() {
	setVisibility(_overlay, false);
	setVisibility(_modalBox, false);
	// clear viewport
	_modalViewport.innerHTML = '';
}

function positionModalBox(modalBox) {
	
	if(typeof modalBox == 'undefined') {
		modalBox = _modalBox;
	}

	// get the view port dimensions
	if(!_isMSIE) {
		_winW = window.innerWidth;
		_winH = window.innerHeight;
		_docW = document.documentElement.scrollWidth;
		_docH = document.documentElement.scrollHeight;
	} else if(_isMSIE) {
		_winW = document.documentElement.clientWidth;
		_winH = document.documentElement.clientHeight;
		_docW = document.documentElement.scrollWidth;
		_docH = document.documentElement.scrollHeight;
	}
	var offset = 0;
	if(_isMSIE6) {
		__hidediv.style.width = _winW + 'px';
		__hidediv.style.height= _winH + 'px';
		offset = document.documentElement.scrollTop;
	}

	//reposition height of overlay
	_overlay.style.height = _docH + 'px';

	if (modalBox.style) {
		modalBox.style.left = (_winW/2 - modalBox.offsetWidth/2) + "px";
		modalBox.style.top = (offset + _winH/2 - modalBox.offsetHeight/2) + "px";
	}
}

function setVisibility(target, visible) {
	target.style.visibility = visible ? 'visible' : 'hidden';
}

function appendText(elem, text) {
	elem.appendChild(document.createTextNode(text));
}

function alphaImageLoader(src) {
	return "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale');";
}

function sendRequest(videoId, embedUrl) {
	_videoId = videoId;

	var fo = new SWFObject(embedUrl, "movie_player-"+ videoId, _boxWidth, _boxHeight, "7", "#CCCCCC");
	fo.addVariable("use_get_video_info", "1");
	fo.addVariable("rel", "0");
	fo.addVariable("autoplay", "1");
	show(fo, _modalBox, _modalViewport);
}

/**
 * Application context. Public methods will be added
 * to yt.overlay. Everything else is private.
 */
yt = yt || {};
yt['kEI'] = "{{EVENT_ID:j}}";
yt['overlay'] = {
	'response': show,
	'install' : install,
	'get' : sendRequest,
	'hide' :hide
};
