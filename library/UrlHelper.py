#!/usr/bin/env python   
# -*- coding: utf8 -*-


def urlpattern(*args):
    urls = []
    for arg in args:
        if isinstance(arg,Url):
            for url in arg.urls:
                urls.append((arg.pattern + url[0], url[1]))
        else:
            urls.append(arg)

    return urls


class Url:
    def __init__(self, pattern, urls):
        self.pattern = pattern
        self.urls = urls

