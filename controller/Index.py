#!/usr/bin/env python   
# -*- coding: utf8 -*-

from library.BaseHandler import BaseHandler
from configs.config import nginx_static


class Index(BaseHandler):
    def get(self):
        thread_count = 5
        self.render('index.html',nginx_static = nginx_static,thread_count = thread_count)

