#!/usr/bin/env python   
# -*- coding: utf8 -*-
import os

from library import myFunc


class Download_service:
    def __init__(self, handler):
        self.handler = handler


    def download(self, fileName):
        file_path = os.path.join(myFunc.getUploadPath(), fileName)
        with open(file_path, "rb") as f:
            self.handler.set_header('Content-Type', 'application/octet-stream')
            self.handler.write(f.read())
