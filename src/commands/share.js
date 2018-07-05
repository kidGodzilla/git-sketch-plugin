// Commits all working file to git (cmd alt ctrl c)
import { sendEvent } from '../analytics'
import { getCurrentFileName, getCurrentBranch, checkForFile, executeSafely, exec, createInput, createInputWithCheckbox, exportArtboards, copyCommandlet, reloadCurrentSketchDocument } from '../common'
import { getUserPreferences } from '../preferences'

export default function (context) {
  if (!checkForFile(context)) { return }

  // Add
  // executeSafely(context, function () {
  //   sendEvent(context, 'Add', 'add current file')
  //   var currentFileName = getCurrentFileName(context)
  //   if (currentFileName) {
  //     var command = `git add "${currentFileName}"`
  //     exec(context, command)
  //     context.document.showMessage('File added to git')
  //   }
  // })

  // Commit
  executeSafely(context, function () {
    sendEvent(context, 'Commit', 'Start commiting')
    var currentBranch = getCurrentBranch(context)
    const prefs = getUserPreferences(context)
    var commitMsg = createInput(context, 'What did you change?', 'Share')

    if (commitMsg.responseCode == 1000 && commitMsg.message != null) {

      exportArtboards(context, prefs);
      copyCommandlet(context);

      var command = `git commit -m "${commitMsg.message.split('"').join('\\"')}" -a; exit`
      var message = exec(context, command)
      context.document.showMessage(message.split('\n').join(' '))
    }
  })

  // Push
  executeSafely(context, function () {
    sendEvent(context, 'Push', 'Push to remote')
    exec(context, 'git -c push.default=current push -q')
    exec(context, './generate-sketch-files.command')
    context.document.showMessage('Changes pushed. Re-opening sketch file.')
    reloadCurrentSketchDocument(context)
  })
}
