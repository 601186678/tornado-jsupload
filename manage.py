#!/usr/bin/env python   
# -*- coding: utf8 -*-


import tornado.ioloop
import tornado.web
from library.Application import Application


if __name__ == '__main__':
    application = Application()
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()