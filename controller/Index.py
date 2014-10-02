#!/usr/bin/env python   
# -*- coding: utf8 -*-

from library.BaseHandler import BaseHandler
class Index(BaseHandler):
    def get(self):
        thread_count = 5
        self.render('index.html',thread_count = thread_count)

