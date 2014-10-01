#!/usr/bin/env python   
# -*- coding: utf8 -*-

from library.BaseHandler import BaseHandler


class IndexHandler(BaseHandler):
    def get(self):
        self.render('index.html', title='Text', body='This is body')