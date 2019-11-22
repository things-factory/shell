import Swal from 'sweetalert2'

/**
 * Custom Alert utilized sweetalert2 to produce a simple pop-up message box.
 * *Side note: Did not fully utilize sweet alert capability, just added some common usage.
 * @param {string} type - ['success', 'error', 'warning', 'info', 'question']
 * @param {string} title - Title for the message box.
 * @param {string} text - Description for the message box. Input can be in html format.
 * @param {string} footer - Footer message. Input can be in html format
 * @param {string} [position = 'center'] - Position of the message box. ['top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', 'bottom-end']
 * @param {boolean} toast - Set to 'True' to display as toast.
 * @param {object} confirmButton - Confirm button is an object type. The text and color of the button can be changed by adding 'text' or 'color' property into the object.
 *                                 text is the required field of the object. When the object is populated, the confirm button will automatically shown.
 * @param {object} cancelButton - Cancel button is an object type. The text and color of the button can be changed by adding 'text' or 'color' property into the object.
 *                                text is the required field of the object. When the object is populated, the cancel button will automatically shown.
 * @param {boolean} [invertButton = false] - Invert button to swap the position of the buttons.
 *                                           eg. Confirm button on the right, Cancel button on the left.
 * @param {function} callback - Accepts a function with an input parameter. Will invoked after swal.fire. It is a promise chaining function.
 * @param {function} onBeforeOpen - Accepts a function with no parameter. Function to run when modal built, but not shown yet. Provides modal DOM element as the first argument.
 * @param {function} onOpen - Accepts a function with no parameter. Function to run when modal opens, provides modal DOM element as the first argument.
 * @param {function} onRender - Accepts a function with no parameter. Function to run after modal DOM has been updated. eg. After Swal.fire() or Swal.update()
 * @param {function} onClose - Accepts a function with no parameter. Function to run when modal closes, provides modal DOM element as the first argument.
 * @param {function} onAfterClose - Accepts a function with no parameter. Function to run after modal has been disposed.
 * @param {boolean} [debug = false] - Check all parameters are set properly. When set to 'true', simple checking will be done on the input parameters to verify the type.
 */

export async function CustomAlert({
  type = 'info',
  title,
  text,
  footer,
  position = 'center',
  toast,
  confirmButton = {},
  cancelButton = {},
  invertButton = false,
  callback,
  onBeforeOpen,
  onOpen,
  onRender,
  onClose,
  onAfterClose,
  debug = false
}) {
  try {
    if (debug) {
      let arrTypes = ['success', 'error', 'warning', 'info', 'question']
      let err = ''
      if (!arrTypes.includes(type)) {
        err = err + 'Invalid Alert Type.\n'
      }

      if (title && typeof title !== 'string') err = err + 'Invalid Title.\n'
      if (text && typeof text !== 'string') err = err + 'Invalid Text.\n'
      if (footer && typeof text !== 'string') err = err + 'Invalid Footer.\n'
      if (typeof position !== 'string') err = err + 'Invalid Position.\n'
      if (toast && typeof toast !== 'boolean') err = err + 'Invalid Footer.\n'
      if (
        Object.keys(confirmButton).length > 0 &&
        (typeof confirmButton !== 'object' || !confirmButton.hasOwnProperty('text'))
      )
        err = err + 'Invalid Confirm Button.\n'
      if (
        Object.keys(cancelButton).length > 0 &&
        (typeof cancelButton !== 'object' || !cancelButton.hasOwnProperty('text'))
      )
        err = err + 'Invalid Cancel Button.\n'

      if (err !== '') throw new Error(err)
    }

    const result = await Swal.fire({
      type: type,
      title: title,
      text: text,
      footer: footer,
      position: position,
      showConfirmButton: Object.keys(confirmButton).length > 0 ? true : false,
      showCancelButton: Object.keys(cancelButton).length > 0 ? true : false,
      confirmButtonText: confirmButton.hasOwnProperty('text') ? confirmButton.text : 'confirm',
      cancelButtonText: cancelButton.hasOwnProperty('text') ? cancelButton.text : 'cancel',
      confirmButtonColor: confirmButton.hasOwnProperty('color') ? confirmButton.color : '#22a6a7',
      cancelButtonColor: cancelButton.hasOwnProperty('color') ? cancelButton.color : '#cfcfcf',
      toast: toast,
      reverseButtons: invertButton,
      onBeforeOpen: () => {
        onBeforeOpen ? onBeforeOpen() : undefined
      },
      onOpen: () => {
        onOpen ? onOpen() : undefined
      },
      onRender: () => {
        onRender ? onRender() : undefined
      },
      onClose: () => {
        onClose ? onClose() : undefined
      },
      onAfterClose: () => {
        onAfterClose ? onAfterClose() : undefined
      }
    })

    if (callback && typeof callback === 'function') {
      callback(result)
    } else {
      return Promise.resolve(result)
    }
  } catch (error) {
    console.log('%c(Custom-Alert)\n' + error, 'color:Red')
  }
}
