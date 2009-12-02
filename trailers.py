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

        info = (id.text.split("/")[-1], unicode(title.text).encode("utf-8"))
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
