#!/usr/bin/env python   
# -*- coding: utf8 -*-


from library.BaseHandler import BaseHandler

from service.download_service import Download_service
class DownloadHandler(BaseHandler):
    def get(self, fileName):
        service = Download_service(self)
        service.download(fileName)