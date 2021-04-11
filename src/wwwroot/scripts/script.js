/*
 * ベースのURLを取得する
 */
function GetBaseUrl() {
  return $.url().attr('directory');
}

/*
 * 16進数をrgba値に整形する
 */
function ConvertToRgbaColor(hex, alpha) {
  var color = {};
  if (hex.length == 3) {
    // #nnn の場合
    color['r'] = SubstringColor(hex, 0, 1, true);
    color['g'] = SubstringColor(hex, 1, 2, true);
    color['b'] = SubstringColor(hex, 2, 3, true);
  } else if (hex.length == 6) {
    // #nnnnnn の場合
    color['r'] = SubstringColor(hex, 0, 2, true);
    color['g'] = SubstringColor(hex, 2, 4, true);
    color['b'] = SubstringColor(hex, 4, 6, true);
  } else {
    return false;
  }
  color['a'] = alpha;
  return color;
}

/*
 * 16進数の各色を取り出す
 */
function SubstringColor(hex, from, to, conv) {
  if (hex == '') {
    return false;
  }
  var s = hex.substring(from, to);
  if (s.length == 1) {
    s = s + s;
  } else if (2 < s.length) {
    return false;
  }
  return conv == true ? parseInt(s, 16) : s;
}

/*
 * rgba形式に整形する
 */
function FormatToRgba(color) {
  if (color == '') {
    return false;
  } else {
    return 'rgba(' + color['r'] + ', ' + color['g'] + ', ' + color['b'] + ', ' + color['a'].toFixed(1) + ')';
  }
}

/*
 * rgba値を16進数に形式変換する
 */
function ConvertToHexColor(color) {
  var decR = ConvertToHex(color['r'], color['a']);
  var decG = ConvertToHex(color['g'], color['a']);
  var decB = ConvertToHex(color['b'], color['a']);
  return '#' + decR + decG + decB;
}

/*
 * rgba値から16進数値に変換する
 */
function ConvertToHex(dec, alpha) {
  var def = parseInt(dec);
  var i = def + (255 - def) * (1 - alpha);
  var hex = Math.round(i).toString(16);
  return ('0' + hex).slice(-2);
}

/*
 * 色計算を行う
 */
function CalcColor() {
  var param = $.url().attr('fragment');
  for (var i = 1; i <= 10; i++) {
    var box = $('#box' + i);
    var color = ConvertToRgbaColor(param, parseFloat(box.data('alpha')));
    var rgba = FormatToRgba(color);
    var hex = ConvertToHexColor(color);
    box.css('background-color', rgba).find('.hex').text(hex).end().find('.rgba').text(rgba);
  }
}