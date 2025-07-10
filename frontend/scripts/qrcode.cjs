const QRCode = require('qrcode');
const fs = require('fs');
const { argv } = require('process');

function generateSvgQrCode(url, outputFile = 'qrcode.svg', fgColor = '#000000', width = 64) {
  const options = {
    type: 'svg',
    width: width,
    color: {
      dark: fgColor,
      light: '#00000000', // transparent background
    },
  };

  QRCode.toString(url, options, function (err, svg) {
    if (err) {
      console.error('Error generating QR code:', err);
      process.exit(1);
    }

    // Ensure square dimensions in SVG tag
    svg = svg.replace(
      /<svg([^>]*)width="[^"]+" height="[^"]+"/,
      `<svg$1width="${width}" height="${width}"`
    );

    fs.writeFileSync(outputFile, svg);
    console.log(`QR code saved to ${outputFile} with width=${width}px`);
  });
}

// --- CLI support ---
const args = require('minimist')(argv.slice(2), {
  string: ['url', 'output', 'color', 'width'],
  alias: {
    u: 'url',
    o: 'output',
    c: 'color',
    w: 'width',
  },
  default: {
    output: 'qrcode.svg',
    color: '#000000',
    width: '64',
  },
});

if (!args.url) {
  console.error('Usage: node qr-svg.js --url <url> [--output qrcode.svg] [--color "#FF0000"] [--width 128]');
  process.exit(1);
}

generateSvgQrCode(args.url, args.output, args.color, parseInt(args.width));
