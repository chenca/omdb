#! /usr/bin/python
import re
import httplib
from cgi import parse_qs
from urlparse import urlparse
import urllib2, curl

try:
    from xml.etree import cElementTree as ElementTree
except ImportError:
    try:
        import cElementTree as ElementTree
    except ImportError:
        from elementtree import ElementTree

base_url       = "http://gdata.youtube.com/feeds/videos"
hd_option      = "&fmt=22"
basic_options  = "?vq=%s&orderby=relevance&max-results=5"
trailer_option = "&category=Trailers"

def to_utf8(data):
    return data

class InfoVideo(object):
    """Store information of a YouTube video."""

    def __init__(self, id, title):
        self.id = id
        self.title = unicode(title).encode("utf-8")
        self._url = None

    def url_hd(self):
        return self.url() + hd_option

    def url(self):
        if self._url:
            return self._url

        self._url = get_trailer_keeptube(self.id)

        return self._url

def get_trailer(id):
    std_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1',
        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
        'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
        'Accept-Language': 'en-us,en;q=0.5',
        }

    uri = "http://www.youtube.com/watch?v=%s" % str(id)

    request = urllib2.Request(uri, None, std_headers)
    try:
        video_webpage = urllib2.urlopen(request).read()
    except (urllib2.URLError, httplib.HTTPException, socket.error), err:
        return None

    # "t" param
    mobj = re.search(r', "t": "([^"]+)"', video_webpage)
    if mobj is None:
        return None

    url = 'http://youtube.com/get_video?video_id=%s&t=%s' % (id, mobj.group(1))

    return url

def get_trailer_keeptube(id):
    uri = "http://www.keep-youtube.com/watch?v=%s" % str(id)
    crl = curl.Curl(uri)
    data = crl.get()
    crl.close()

    url = re.findall("http.*fmt\%3D18", data)[0]
    return url

def get_namespaces(xml):
    space = {}
    ir = re.compile("<feed ([^>]+)")
    for c in ir.findall(xml)[0].split(' '):
        name, value = c.split("=")
        name = name.strip()
        value = value.strip()[1:-1]
        space[name] = value

    return space

def parse_youtube_xml(xml):
    """Parse an entry from youtube feed.

    Parse youtube feed and return summary and entries.
    """
    space = get_namespaces(xml)
    tree = ElementTree.fromstring(xml)

    lst = []
    for child in tree.findall("{%s}entry" % space['xmlns']):
        id = child.find("{%s}id" % space['xmlns'])
        title = child.find("{%s}title" % space['xmlns'])

        info = InfoVideo(id=to_utf8(id.text).split("/")[-1],
                         title=to_utf8(title.text))
        lst.append(info)

    return lst

def search_trailers(movie, trailer_category = False):
    """Return feed content of a specific query."""

    url = base_url + basic_options

    if trailer_category:
        url += trailer_option

    url = url % urllib2.quote(movie)

    xml = urllib2.urlopen(url).read()
    entries = parse_youtube_xml(xml)

    return entries
