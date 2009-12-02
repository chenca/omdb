dirs_location = "/var/www/localhost/htdocs/cgi/oversight/dirs"

header = '''\
Content-type: text/html


<html>
<head>
<title> Media Library </title>
<link id="www-core-css" rel="stylesheet" href="/css/www-core-vfl134429.css">
<link  rel="stylesheet" href="/css/www-the-rest-vfl134429.css">
<link  rel="stylesheet" href="/css/www-browse-vfl134246.css">
<link  rel="stylesheet" href="/css/www-hovercard-vfl130085.css">
<script src="/css/www-hovercard-vfl133369.js"></script>

</head>
<body>
<BR><BR><BR><BR>
  <div id="side-column" style="width:10px"></div>
  <div id="body-column">
  <div class="main-tab-layout-top-browse-tabs" style="width:450px" >
    <div class="browse-tab-modifiers yt-rounded">
	<div class="subcategory selected first yt-rounded">
	Sort By:
	</div>
	<div class="subcategory ">
	<a href="/media/?sort=movie_title">Movie Name</a>
	</div>
	<div class="subcategory ">
	<a href="/media/?sort=imdb_rating">IMDB Rating</a>
	</div>
	<div class="subcategory ">
	<a href="/media/?sort=imdb_date">Release Date</a>
	</div>
	<div class="clear"></div>
     </div>
   </div>
	<div class="clear"><BR><BR></div>
	<div id="browseMain">
		<div class="grid-view" style="width:1100px">
'''

footer = '''\
</div></div></div>
</body>
</html>
'''

movie = '''\
<div class="trailer-cell *vl" style="width:13.9%%">
  <div class="trailer-entry yt-uix-hovercard">
	<div class="vTrailerEntry">
	  <a href="%(cover_link)s" target="_blank">
		<img src="%(cover_url)s" class="vimgTrailer  yt-uix-hovercard-target"/>
	  </a>
	</div>
	<div class="trailer-main-content">
	  <div class="trailer-short-title">
		<div title="%(movie_title)s">
		  %(movie_title)s
		</div>
	  </div>
	  <div class="trailer-facets smallText">
		<span class="grayText"><a href="%(imdb_url)s">IMDB Link</a></span>
		<span class="grayText">Trailers:
                  <a href="/cgi/oversight/get-trailer.py?uid=%(trailer_url1)s" class="yt-uix-hovercard-target" title="%(trailer_title1)s">#1</a>
		  <a href="/cgi/oversight/get-trailer.py?uid=%(trailer_url2)s" class="yt-uix-hovercard-target" title="%(trailer_title2)s">#2</a>
		  <a href="/cgi/oversight/get-trailer.py?uid=%(trailer_url3)s" class="yt-uix-hovercard-target" title="%(trailer_title3)s">#3</a>
		</span>
	  </div>
	</div>

	<div class="yt-uix-hovercard-content" style="display: none;">
	  <strong class="hovercard-title" >%(movie_title)s</strong><br>
	  <div><span class="hovercard-date">%(imdb_date)s</span></div>
          <div><span class="hovercard-title">IMDB Rating: <strong>%(imdb_rating)s</strong></span></div>
	  <hr>
	  <p class="hovercard-description" >%(imdb_plot)s</p>
          <hr>
          <div><strong class="hovercard-title">Trailers:</strong><br><br>
             <div><strong class="hovercard-title">#1</strong><span> %(trailer_title1)s</span></div>
             <br>
             <div><strong class="hovercard-title">#2</strong><span> %(trailer_title2)s</span></div>
             <br>
             <div><strong class="hovercard-title">#3</strong><span> %(trailer_title3)s</span></div>
          </div>
	  <div class="clear"></div>
	</div>
	<div class="clear"></div>
  </div>
</div>
'''
