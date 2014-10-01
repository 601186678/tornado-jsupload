#!/usr/bin/env python   
# -*- coding: utf8 -*-


import tornado.web
import tornado.ioloop
import mako.lookup
import tornado.httpserver
import mako.template
from configs.config import template_path

class BaseHandler(tornado.web.RequestHandler):


    def initialize(self):
        self.lookup = mako.lookup.TemplateLookup(directories=template_path, input_encoding='utf-8', output_encoding='utf-8')

    def render_string(self, filename, **kwargs):
        template = self.lookup.get_template(filename)
        namespace = self.get_template_namespace()
        namespace.update(kwargs)
        return template.render(**namespace)

    def render(self, filename, **kwargs):
        self.finish(self.render_string(filename, **kwargs))