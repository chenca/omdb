#! /usr/bin/python

import cgi
import os, urllib2
import pickle

from trailers import *

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

        keys = ['trailer_url1', 'trailer_url2', 'trailer_url3']
        i = 0
        for uid in info['trailers']:
            trailer = get_trailer_keeptube(uid)
            info[keys[i]] = trailer
            i += 1

        nfo = open(path, 'wb')
        pickle.dump(info, nfo)
        nfo.close()
