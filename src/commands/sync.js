// Pull
import { sendEvent } from '../analytics'
import { checkForFile, executeSafely, exec, reloadCurrentSketchDocument } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  executeSafely(context, function () {
    sendEvent(context, 'Pull', 'Pull remote')
    exec(context, 'git pull -q')
    exec(context, './generate-sketch-files.command')
    context.document.showMessage('Changes pulled. Re-opening sketch file.')
    reloadCurrentSketchDocument(context)
  })
}
