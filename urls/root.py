#!/usr/bin/env python   
# -*- coding: utf8 -*-


from library.UrlHelper import *
from controller.Index import IndexHandler
url = Urlpattern(
    (r'/index', IndexHandler),
)


