#!/usr/bin/env python   
# -*- coding: utf8 -*-



from library.BaseHandler import BaseHandler

from library import myFunc

from service.upload_service import Upload_service


class Start(BaseHandler):
    def post(self):
        filename = self.get_argument('filename', None)
        service = Upload_service(self)
        result = service.uploadStart(filename)
        myFunc.rest_response(self, result['state'], result['data'])


class Blob(BaseHandler):
    def post(self):
        no = self.get_argument('no', None)
        data = self.get_argument('data', '')
        service = Upload_service(self)
        result = service.uploadBlog(no, data)
        myFunc.rest_response(self, result['state'], result['data'])


class End(BaseHandler):
    def post(self):
        no = self.get_argument('no', None)
        service = Upload_service(self)
        result = service.uploadEnd(no)
        myFunc.rest_response(self, result['state'], result['data'])

