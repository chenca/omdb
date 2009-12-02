#! /usr/bin/python

import cgi
import curl
import re
import ConfigParser

def cgi_params():
    storage = cgi.FieldStorage()
    params = {}
    for key in storage.keys():
        params[key] = storage[key].value
    return params

params = cgi_params()
uid = params['uid']

config = ConfigParser.ConfigParser()
config.read('config.ini')

hd = config.getboolean('trailers', 'hd')

uri = "http://www.keep-youtube.com/watch?v=%s" % str(uid)
crl = curl.Curl(uri)
data = crl.get()
crl.close()

if hd:
    url = re.findall("http.*fmt\%3D22", data)[0]
else:
    url = re.findall("http.*fmt\%3D18", data)[0]

print "Location: %s" % ("http://keep-tube.com/dl.php?r=" + url)
print
