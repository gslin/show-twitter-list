// ==UserScript==
// @name         Show Twitter List
// @namespace    https://wiki.gslin.org/wiki/ShowTwitterList
// @version      0.0.20190504.3
// @description  Show twitter list in title.
// @author       Gea-Suan Lin <darkkiller@gmail.com>
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Don't run this script inside iframe.
    if (window !== top) {
        return;
    }

    const url_re = new RegExp('^https://twitter\.com/[^/]+(/media)?$');

    if (!document.location.href.match(url_re)) {
        return;
    }

    let user_id = document.querySelector('.ProfileNav[data-user-id]').getAttribute('data-user-id');
    let url = '/i/' + user_id + '/lists';
    console.debug('Trying to fetch ' + url);

    fetch(url).then(res => {
        return res.json();
    }).then(j => {
        let h = document.createElement('div');
        h.innerHTML = j.html;

        console.debug('Got ' + url, h);

        let c = h.querySelector('.membership-checkbox[checked="checked"]');
        if (!c) {
            return;
        }

        let l = c.parentElement.innerText.trim();
        let title = document.getElementsByTagName('title')[0];
        title.innerHTML = '(' + l + ') ' + title.innerHTML;
    });
})();
