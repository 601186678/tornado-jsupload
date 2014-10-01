#!/usr/bin/env python   
# -*- coding: utf8 -*-

import tornado.web

from configs.config import *

from urls.root import url


class Application(tornado.web.Application):
    def __init__(self):
        tornado.web.Application.__init__(self, url, template_path=template_path)