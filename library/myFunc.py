#!/usr/bin/env python   
# -*- coding: utf8 -*-


import os
import random
import string


def getUploadPath():
    return os.path.join(os.path.dirname(os.path.dirname(__file__)),'upload')


def getRandomStr(strlen):
    return ''.join(random.choice(list(string.ascii_letters)) for i in range(0, strlen))
