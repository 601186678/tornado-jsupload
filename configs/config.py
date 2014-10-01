#!/usr/bin/env python   
# -*- coding: utf8 -*-
import os


template_path = [
    os.path.join(os.path.dirname(os.path.dirname(__file__)), 'view')
]



static_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static')


nginx_static = 'http://10.211.55.11:80/jsupload'


cookie_secret = "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo="