// Branches (cmd alt ctrl b)
import { sendEvent } from '../analytics'
import { getCurrentBranch, checkForFile, exec, executeSafely, createInput } from '../common'
import WebUI from 'sketch-module-web-view'

export default function (context) {
  if (!checkForFile(context)) { return }
  executeSafely(context, function () {
    var listBranchesCommand = 'git for-each-ref --format=\'%(refname:short)\' refs/heads/'
    var listBranches = exec(context, listBranchesCommand)
    if (listBranches != null && listBranches != '') {
      listBranches = listBranches.split('\n')
      listBranches.pop() // last item is always an empty string
      var currentBranch = getCurrentBranch(context)
      const webUI = new WebUI(context, 'branches.html', {
        identifier: 'git-sketch-plugin.branches',
        height: 280,
        onlyShowCloseButton: true,
        hideTitleBar: true,
        handlers: {
          checkoutBranch (name) {
            executeSafely(context, function () {
              var command = 'git checkout -q ' + name
              exec(context, command)
              var app = NSApp.delegate()
              app.refreshCurrentDocument()
              webUI.panel.close()
              context.document.showMessage(`Switched to branch '${name}'`)
            })
          },
          deleteBranch (name) {
            executeSafely(context, function () {
              var command = 'git branch -d ' + name
              exec(context, command)
              context.document.showMessage(`Deleted branch '${name}'`)
            })
          },
          createBranch () {
            executeSafely(context, function () {
              var branchName = createInput(context, 'New branch name', 'Create branch')

              if (branchName.responseCode == 1000 && branchName.message != null) {
                var command = 'git checkout -qb ' + branchName.message
                exec(context, command)
                context.document.showMessage("Switched to a new branch '" + branchName.message + "'")
                sendEvent(context, 'Branch', 'Create branch', 'Did create branch')
                webUI.panel.close()
              }
            })
          }
        }
      })
      webUI.eval('window.branches=["' + listBranches.join('", "') + '"]')
      webUI.eval('window.currentBranch="' + currentBranch + '"')
      webUI.eval('window.ready=true')
    } else {
      sendEvent(context, 'Branch', 'Switch branch', 'no branches')
      context.document.showMessage('No branches')
    }
  })
}
