const { exec } = require('child_process');

module.exports.beep = function () {
  exec('osascript -e "beep 30"', (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
      return;
    }
  });
}