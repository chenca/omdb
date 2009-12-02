#! /usr/bin/python

import cgi
import os, sys, re
import pickle
import curl
from imdb import movie_info, imdb_info
from trailers import search_trailers

from template import dirs_location

def unescape(text):
   def fixup(m):
      text = m.group(0)
      if text[:2] == "&#":
         try:
            if text[:3] == "&#x":
               return unichr(int(text[3:-1], 16))
            else:
               return unichr(int(text[2:-1]))
         except ValueError:
            pass
      return text
   ret = re.sub("&#?\w+;", fixup, text)
   return re.sub(u"\u2022", "-", ret).encode("utf-8")

def store_info(imdb_url, imdb_title, imdb_cover, imdb_date, imdb_rating, imdb_plot, trailers, dest):

            info = {}
            info['movie_title'] = imdb_title
            info['imdb_url'] = imdb_url
            info['imdb_date'] = imdb_date
            info['imdb_rating'] = imdb_rating
            info['imdb_plot'] = imdb_plot
            info['cover_url'] = "/covers/" + os.path.basename(imdb_cover) + "_SMALL.jpg"
            info['cover_link'] = "/covers/" + os.path.basename(imdb_cover) + "_.jpg"

            if len(trailers) > 0 :
                info['trailer_url1'] = trailers[0].id
                info['trailer_title1'] = trailers[0].title
            else:
                info['trailer_url1'] = "#"
                info['trailer_title1'] = "#"

            if len(trailers) > 1:
                info['trailer_url2'] = trailers[1].id
                info['trailer_title2'] = trailers[1].title
            else:
                info['trailer_url2'] = "#"
                info['trailer_title2'] = "#"

            if len(trailers) > 2 :
                info['trailer_url3'] = trailers[2].id
                info['trailer_title3'] = trailers[2].title
            else:
                info['trailer_url3'] = "#"
                info['trailer_title3'] = "#"

            print "Getting cover: %s" % imdb_cover

            if imdb_cover != "nocover":
               crl = curl.Curl(imdb_cover + "_.jpg")
               data = crl.get()
               crl.close()
               cover = open("/var/www/localhost/htdocs" + info['cover_link'], "wb")
               cover.write(data)
               cover.close()
            if imdb_cover != "nocover":
               crl = curl.Curl(imdb_cover + "_SX135_SY200_.jpg")
               data = crl.get()
               crl.close()
               cover = open("/var/www/localhost/htdocs" + info['cover_url'], "wb")
               cover.write(data)
               cover.close()

            print "Writing data"

            nfo = open(os.path.join(dest, "nfo.pickle"), "wb")
            pickle.dump(info, nfo)
            nfo.close()

            print dest, "-->", imdb_title, "ok\n"


def scan_dirs(location):

    dirs = [d[:-1] for d in open(location).readlines() if d[:-1] != '']


    for d in dirs:
        movies = [i for i in os.listdir(d) if os.path.isdir(os.path.join(d, i))]
        movies.sort()
        for m in movies:

            if os.path.exists(os.path.join(d,m,"nfo.pickle")):
                print "\n\nNFO already found: %s" % m
                #continue
                nfo = open(os.path.join(d,m,"nfo.pickle"), 'rb')
                info = pickle.load(nfo)
                nfo.close()
                (imdb_url, imdb_title, imdb_cover, imdb_date, imdb_rating, imdb_plot) = imdb_info(info['imdb_url'])
            else:
                print "\n\nSearching imdb info for: %s" % m
                (imdb_url, imdb_title, imdb_cover, imdb_date, imdb_rating, imdb_plot) = movie_info(m)

            if imdb_url == "":
                print "IMDB info not found for: %s" % m
                continue

            if imdb_cover == "":
               imdb_cover = "nocover"

            print "Searching youtube trailers for: %s" % imdb_title

            trailers = search_trailers(unescape(imdb_title) + " Official Trailer ")
            store_info(imdb_url, imdb_title, imdb_cover, imdb_date, imdb_rating, imdb_plot,
                       trailers, os.path.join(d, m))


if len(sys.argv) == 3:
    folder = sys.argv[1]
    imdb_url = sys.argv[2]

    (imdb_url, imdb_title, imdb_cover, imdb_date, imdb_rating, imdb_plot) = imdb_info(imdb_url)
    trailers = search_trailers(unescape(imdb_title) + " Official Trailer ")
    store_info(imdb_url, imdb_title, imdb_cover, imdb_date, imdb_rating, imdb_plot, trailers, folder)
else:
    scan_dirs(dirs_location)
