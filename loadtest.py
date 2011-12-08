#!/usr/bin/env python
# encoding: utf-8

import sys
import os
import urllib2
import time
import sys

## The syntax for this script is velocity-load-test.py <query-term> 
##
## All of the query url's and environments we used are commented below

iterations = 100

#your first environment
host = "http://127.0.0.1"
path = "/mferchak/"

u = host + path

if len(sys.argv) > 1:
	doc = sys.argv[1]
else:
	doc = ""

def loopthewhoop():
	theurl = u + doc
	
	print " "	
	print "Testing: ", theurl
	
	thelistoftimes = []
	
	for i in range(iterations):
		# measure wall time
		t0 = time.time()
		curlbutnotreally(theurl)
		timediff = time.time() - t0
		print timediff, "seconds"
		thelistoftimes.append(timediff)
		
	theaverage = gettheaverage(thelistoftimes)
	print " average time: " + str(theaverage)
	return theaverage

def curlbutnotreally(url):
	response = urllib2.urlopen(url)
	html = response.read()

def gettheaverage(thelist):
	if len(thelist):
		return float( sum(thelist) / len(thelist))
	else:
		return 0.0

def queue_them_up_real_good():
	loopthewhoop()

queue_them_up_real_good()
