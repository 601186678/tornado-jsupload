#!/usr/bin/env python   
# -*- coding: utf8 -*-


from library.UrlHelper import *
from controller.Index import Index
from urls import upload

url = Urlpattern(
    (r'/index', Index),
    Url(r'/upload', upload.url)
)


