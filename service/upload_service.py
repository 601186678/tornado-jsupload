#!/usr/bin/env python
# -*- coding: utf8 -*-
import base64
import os
from configs import config
from library import myFunc


class Upload_service:
    def __init__(self, handler):
        self.handler = handler

    def uploadStart(self, filename):
        name, ext = os.path.splitext(filename)
        temp_file_name = myFunc.getRandomStr(40)
        self.handler.set_secure_cookie("temp_file_name", temp_file_name)
        self.handler.set_secure_cookie('fileext', ext)
        config.upload_success = set()

        return {'state': 'success', 'data': ''}

    def uploadBlog(self, no, data):
        data = base64.decodestring(data)
        temp_file_name = self.handler.get_secure_cookie("temp_file_name")
        filePath = os.path.join(myFunc.getUploadPath(), '%s_%s' % (temp_file_name, no))
        f = open(filePath, 'ab')
        f.write(data)
        f.close()
        return {'state': 'success', 'data': ''}

    def uploadEnd(self, no):
        config.upload_success.add(no)
        if len(config.upload_success) >= 5:

            self.mergeFile()
            return {'state': 'success', 'data': 'all_success'}
        else:
            return {'state': 'success', 'data': 'wait'}

    def mergeFile(self):
        temp_file_name = self.handler.get_secure_cookie("temp_file_name")
        ext = self.handler.get_secure_cookie("fileext")
        newPath = os.path.join(myFunc.getUploadPath(), '%s%s' % (temp_file_name, ext))

        if os.path.exists(newPath):
            os.remove(newPath)
        newFile = open(newPath, 'ab')
        for i in range(0, 5):

            temp_path = os.path.join(myFunc.getUploadPath(), '%s_%s' % (temp_file_name, i))
            temp_file = open(temp_path, 'rb')
            while True:
                buff = temp_file.read(1024)
                if not buff:
                    break
                newFile.write(buff)
            temp_file.close()
        newFile.close()
        for i in range(0, 5):
            temp_path = os.path.join(myFunc.getUploadPath(), '%s_%s' % (temp_file_name, i))
            if os.path.exists(temp_path):
                os.remove(temp_path)









