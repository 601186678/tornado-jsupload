#!/usr/bin/env python   
# -*- coding: utf8 -*-


from library.UrlHelper import *
from controller.upload import *

url = urlpattern(
    (r'/start', Start),
    (r'/blob', Blob),
    (r'/end',End),
)