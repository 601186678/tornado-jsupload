#!/usr/bin/env python   
# -*- coding: utf8 -*-


from library.UrlHelper import *
from controller.Index import Index
from urls import upload
from urls import download

url = urlpattern(
    (r'/index', Index),
    Url(r'/upload', upload.url),
    Url(r'/download', download.url)

)


