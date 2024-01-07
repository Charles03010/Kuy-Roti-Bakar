function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

function toCRC16(str) {
  function charCodeAt(str, i) {
    let get = str.substr(i, 1);
    return get.charCodeAt();
  }

  let crc = 0xffff;
  let strlen = str.length;
  for (let c = 0; c < strlen; c++) {
    crc ^= charCodeAt(str, c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  hex = crc & 0xffff;
  hex = hex.toString(16);
  hex = hex.toUpperCase();
  if (hex.length == 3) {
    hex = "0" + hex;
  }
  return hex;
}
function qris(jml) {
  let qris =
    "00020101021126610014COM.GO-JEK.WWW01189360091438833807360210G8833807360303UKE51440014ID.CO.QRIS.WWW0215ID10232903657830303UKE5204581253033605802ID5922Roti Bakar KUY!, Depok6006SLEMAN61055528262070703A016304F2EA";
  let nominal = jml;
  let taxtype = "r"; // r/p, r = rupiah, p = persen
  let fee = "0"; //contoh persen 10%
  let qris2 = qris.slice(0, -4);
  let replaceQris = qris2.replace("010211", "010212");
  let pecahQris = replaceQris.split("5802ID");
  let uang = "54" + pad(nominal.length) + nominal;
  tax =
    taxtype == "p"
      ? "55020357" + pad(fee.length) + fee
      : "55020256" + pad(fee.length) + fee;
  uang += tax.length == 0 ? "5802ID" : tax + "5802ID";
  let output = pecahQris[0].trim() + uang + pecahQris[1].trim();
  output += toCRC16(output);
//   url = "https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=" + output;
  url = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" + output;
  return url;
}
