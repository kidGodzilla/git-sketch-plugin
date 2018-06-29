// import update from 'sketch-module-update'
import { sendEvent } from '../analytics'
import { checkForGitRepository, executeSafely, exportArtboards } from '../common'
import { getUserPreferences } from '../preferences'
import { setIconForAlert } from '../common'

// const repoFullName = 'mathieudutour/git-sketch-plugin'
//
// const options = {
//   title: 'A new Git plugin version is available!',
//   customizeAlert: setIconForAlert
// }
//
// export default update(repoFullName, options)


export default function (context) {
  // let prefs = getUserPreferences(context)
  // context.document = context.actionContext.document
  //
  // if (!prefs.autoExportOnSave || !checkForGitRepository(context)) { return }
  // executeSafely(context, function () {
  //   sendEvent(context, 'Auto Export on save', 'Do export')
  //   exportArtboards(context, prefs)
  //   context.document.showMessage('Artboards exported')
  // })
}
