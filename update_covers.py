#! /usr/bin/python

import os, re
import pickle
from imdb import *
import curl

from trailers import search_trailers

dirs = [d[:-1] for d in open("/var/www/localhost/oversight/dirs").readlines() if d[:-1] != '']

for d in dirs:
    movies = [i for i in os.listdir(d) if os.path.isdir(os.path.join(d, i))]
    for m in movies:

        path = os.path.join(d, m)
        path = os.path.join(path, "nfo.pickle")

        if not os.path.exists(path):
            continue

        print "Updating: %s" % path

        nfo = open(path, 'rb')
        info = pickle.load(nfo)
        nfo.close()

        (url, title, imdb_cover) = imdb_info(info['imdb_url'])

        info['cover_url'] = "/covers/" + os.path.basename(imdb_cover) + "_SMALL.jpg"
        info['cover_link'] = "/covers/" + os.path.basename(imdb_cover) + "_.jpg"

        crl = curl.Curl(imdb_cover + "_.jpg")
        data = crl.get()
        crl.close()
        cover = open("/var/www/localhost/htdocs" + info['cover_link'], "wb")
        cover.write(data)
        cover.close()

        crl = curl.Curl(imdb_cover + "_SX135_SY200_.jpg")
        data = crl.get()
        crl.close()
        cover = open("/var/www/localhost/htdocs" + info['cover_url'], "wb")
        cover.write(data)
        cover.close()

        nfo = open(path, 'wb')
        pickle.dump(info, nfo)
        nfo.close()
