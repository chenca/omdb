#! /usr/bin/python
# -*- coding: utf-8 -*-

import cgi
import os, urllib2
import ConfigParser
import pickle

from imdb import movie_info
from template import *

def cgi_params():
    storage = cgi.FieldStorage()
    params = {}
    for key in storage.keys():
        params[key] = storage[key].value
    return params

params = cgi_params()

if 'sort' in params.keys():
    sortby = params['sort']
else:
    sortby = 'movie_title'

def sort_string(x, y):
    if x > y:
        return 1
    elif x == y:
        return 0
    else:
        return -1

def sort_title(x, y):
    return sort_string(x[sortby], y[sortby])

def sort_rate(x, y):
    return sort_string(y[sortby], x[sortby])

months = {'January':'01',
          'February':'02',
          'March':'03',
          'April':'04',
          'May':'05',
          'June':'06',
          'July':'07',
          'August':'08',
          'September':'09',
          'October':'10',
          'November':'11',
          'December':'12'}

def sort_date(x, y):

    xdata = x[sortby].split(" ")
    ydata = y[sortby].split(" ")

    if len(xdata) < 3:
        return 1
    if len(ydata) < 3:
        return -1

    xY = xdata[2]
    xD = xdata[0]
    xM = months[xdata[1]]

    yY = ydata[2]
    yD = ydata[0]
    yM = months[ydata[1]]

    return sort_string(" ".join([yY, yM, yD]), " ".join([xY, xM, yD]))

sort_options = {'imdb_rating': sort_rate, 'movie_title': sort_title, 'imdb_date': sort_date }

config = ConfigParser.ConfigParser()
config.read('config.ini')

dirs = [d.strip() for d in config.get('general', 'watch_dirs').split(",")]

info = {'css_url' : config.get('general', 'css_url'),
        'base_url' : config.get('general', 'base_url') }

print header % info

info_list = []
for d in dirs:
    movies = [i for i in os.listdir(d) if os.path.isdir(os.path.join(d, i))]
    for m in movies:

        path = os.path.join(d, m)
        path = os.path.join(path, "nfo.pickle")

        if not os.path.exists(path):
            continue

        nfo = open(path, 'rb')
        info = pickle.load(nfo)
        nfo.close()

        info['cgi_url'] = config.get('general', 'cgi_url')
        info_list.append(info)

info_list.sort(sort_options[sortby])
for info in info_list:
    print movie % info

print footer
