#!/usr/bin/env python   
# -*- coding: utf8 -*-


from library.UrlHelper import *
from controller.download import *

url = urlpattern(
    (r'/(.+)', DownloadHandler),
)