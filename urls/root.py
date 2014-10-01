#!/usr/bin/env python   
# -*- coding: utf8 -*-


from library.UrlHelper import *
from controller.Index import IndexHandler
from urls import upload

url = Urlpattern(
    (r'/index', IndexHandler),

    Url(r'/upload', upload.url)
)


