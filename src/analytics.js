import send from 'sketch-module-google-analytics'
import { getUserPreferences } from './preferences'

const key = 'UA-ffffff-1'

export function sendEvent (context, category, action, label, value) {
  // const { sendAnalytics } = getUserPreferences(context)
  // if (!sendAnalytics) { return }
  // const payload = {}
  // if (category) { payload.ec = category }
  // if (action) { payload.ea = action }
  // if (label) { payload.el = label }
  // if (value) { payload.ev = value }

  return true
}

export function sendError (context, error) {
  // const { sendAnalytics } = getUserPreferences(context)
  // if (!sendAnalytics) { return }
  return true
}
