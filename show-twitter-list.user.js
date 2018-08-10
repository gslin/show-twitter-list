// ==UserScript==
// @name         Show Twitter List
// @namespace    https://wiki.gslin.org/wiki/ShowTwitterList
// @version      0.0.20180810.0
// @description  Show twitter list in title.
// @author       Gea-Suan Lin <darkkiller@gmail.com>
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let url_re = new RegExp('^https://twitter\.com/[^/]+$');
    if (!document.location.href.match(url_re)) {
        return;
    }

    let el = document.querySelector('.ProfileCanopy-headerBg img');
    if (!el) {
        return;
    }
    let matched = el.getAttribute('src').match(new RegExp('https://pbs\.twimg\.com/profile_banners/([0-9]+)/'));
    if (!matched) {
        return;
    }

    let url = '/i/' + matched[1] + '/lists';
    let req = new XMLHttpRequest();
    req.addEventListener('load', function(){
        let h = document.createElement('div');
        h.innerHTML = JSON.parse(this.responseText).html;

        let c = h.querySelector('.membership-checkbox[checked="checked"]');
        if (!c) {
            return;
        }

        let l = c.parentElement.innerText.trim();
        let title = document.getElementsByTagName('title')[0];
        title.innerHTML = '(' + l + ') ' + title.innerHTML;
    });
    req.open('GET', url);
    req.send();
})();
