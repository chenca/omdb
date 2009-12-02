#! /usr/bin/python

import re
import curl
import sys, os

BASE_URL = 'https://www.binsearch.info/'
SEARCH_ARGS = 'index.php?q=%s&minsize="minSize"&max=250&adv_age=999&adv_sort=date&adv_nfo=on&postdate=on&hideposter=on&hidegroup=on'

def search_imdb_url(movie):
    crl = curl.Curl(BASE_URL + SEARCH_ARGS % curl.urllib.quote(movie))
    data = crl.get()
    crl.close()
    subs = re.findall('viewNFO.php\?oid=\d+&amp;server="', data)

    imdb = {}
    for item in subs:
        crl = curl.Curl(BASE_URL + item)
        data = crl.get()
        crl.close()
        urls = re.findall('http://www.imdb.com/title/\w*', data)
        for url in urls:
            if url in imdb.keys():
                imdb[url] = imdb[url] + 1
            else:
                imdb[url] = 0
    return imdb

def get_imdb_data(url):
    crl = curl.Curl(url)
    data = crl.get()
    crl.close()

    return data

def get_imdb_title(data):
    subs = re.findall('<title>(.*) \(\d{4}.*\)</title>', data)

    if not len(subs):
        return ""

    return subs[0]

def get_imdb_cover_url(data):
    subs = re.findall('name="poster".*src="(.*_V1).*"', data)

    if not len(subs):
        return ""

    return subs[0]

def get_release_date(data):
    subs = re.findall('<h5>Release Date:</h5>\n.*\n([^\n<]*)', data)

    if not len(subs):
        return ""

    return subs[0]

def get_rating(data):
    subs = re.findall('<b>(.*/10)</b>', data)

    if not len(subs):
        return ""

    return subs[0]

def get_plot(data):
    subs = re.findall('<h5>Plot:</h5>\n.*\n([^<]*)', data)

    if not len(subs):
        return ""

    return subs[0]


def imdb_info(url):
    data = get_imdb_data(url)
    title = get_imdb_title(data)
    cover = get_imdb_cover_url(data)
    date = get_release_date(data)
    plot = get_plot(data)
    rating = get_rating(data)

    return (url, title, cover, date, rating, plot)

def movie_info(movie):
    name = re.sub("[^a-zA-Z0-9]", " ", movie).split(" ")

    imdb_url = ""
    for i in range(len(name)):
        if (i == 0):
            imdb = search_imdb_url(" ".join(name))
        else:
            imdb = search_imdb_url(" ".join(name[:-1 * i]))

        if len(imdb.keys()) >= 1:
            imdb_url = imdb.keys()[0]
            for k in imdb.keys():
                if imdb[k] > imdb[imdb_url]:
                    imdb_url = k
            break
    if imdb_url == "":
        return ("", "", "", "", "", "")

    print "IMDB URL", imdb_url

    return imdb_info(imdb_url)



