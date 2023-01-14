#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');

const from = 'src/assets/sprite/svg';
const to = 'src/assets/sprite/gen';

compile();
fs.watch(from, compile);

function compile() {
    console.log('Building SVG...');
    const spriter = new SVGSpriter({
        dest: path.resolve(to),
        mode: {
            symbol: true
        }
    });
    const svgs = getFiles(from).filter(item => item.endsWith('.svg'));

    svgs.forEach((name) => spriter.add(
        path.resolve(name),
        null,
        fs.readFileSync(name, {encoding: 'utf-8'})
    ));

    spriter.compile((error, result, data) => {
        const fullPath = result.symbol.sprite.path;
        let correctPath = fullPath.slice(0, fullPath.indexOf('symbol')) + 'sprite.svg';

        fs.mkdirSync(path.dirname(correctPath), { recursive: true });
        fs.writeFileSync(correctPath, result.symbol.sprite.contents);
    });

    console.log('SVG successfully built.');
}

function getFiles (dir, files_){
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files){
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}
