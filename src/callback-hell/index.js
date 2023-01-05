/**
 * npm run callback
 */
const fs = require('fs');
const path = require('path');
const gm = require('gm');

// assets 폴더의 이미지 파일들을 읽어서 resized 폴더에 저장
const source = path.join(__dirname, 'assets');
const dest = path.join(__dirname, 'resized');
const widths = [320, 640, 1024];

/**
 * callback hell 완화 방법
 * 1. depth를 flat 하게 -> early return
 * 2. 기능을 함수로 빼냄
 */

function handleSize(dest, filename, values) {
  console.log(filename + ' : ' + values);
  const aspect = values.width / values.height;
  widths.forEach(
    function (width, widthIndex) {
      height = Math.round(width / aspect);
      console.log('resizing ' + filename + ' to ' + height + 'x' + height);
      this.resize(width, height).write(
        path.join(dest, 'w' + width + '_' + filename),
        function (err) {
          if (err) console.log('Error writing file: ' + err);
        }
      );
    }.bind(this)
  );
}

function resizeAndWrite(filename, fileIndex) {
  console.log(filename);
  if (filename.startsWith('.')) return;

  gm(path.join(source, filename)).size(function (err, values) {
    if (err) {
      return console.log('Error identifying file size: ' + err);
    }

    handleSize.bind(this, dest)(filename, values);
  });
}

fs.readdir(source, function (err, files) {
  if (err) {
    return console.log('Error finding files: ' + err);
  }

  fs.mkdir(dest, (err) => {
    if (err) {
      return console.error('Failed to create a directory: ' + err);
    }

    files.forEach(resizeAndWrite);
  });
});
