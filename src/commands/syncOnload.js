// Pull
import { checkForGitRepository, checkForFile, executeSafely, exec } from '../common'
import {setTimeout, clearTimeout} from 'sketch-module-settimeout-polyfill'

export default function (context) {

  context.document.showMessage('opening..');
  log('opening');

  setTimeout(function () {
    context.document.showMessage('Checking for updates..');
    log('starting');

    if (!checkForGitRepository(context)) { return }
    if (!checkForFile(context)) { return }

    log('Checking for updates..');

    executeSafely(context, function () {
      exec(context, 'git pull -q')
      context.document.showMessage('Changes pulled')
      log('Changes pulled');
    })
  }, 5000)
}
