#!/usr/bin/env python   
# -*- coding: utf8 -*-

from library.BaseHandler import BaseHandler
from configs.config import nginx_static


class IndexHandler(BaseHandler):
    def get(self):
        self.render('index.html', title='Text', body='This is body',nginx_static = nginx_static)

