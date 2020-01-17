export class FileDropHelper {
  static set(dropArea, judge) {
    var preventDefaults = e => {
      if (!judge || judge()) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    var highlight = e => {
      if (!judge || judge()) {
        dropArea.classList.add('candrop')
      }
    }

    var unhighlight = e => {
      if (!judge || judge()) {
        dropArea.classList.remove('candrop')
      }
    }

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      dropArea.addEventListener(event, preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach(event => {
      dropArea.addEventListener(event, highlight, false)
    })
    ;['dragleave', 'drop'].forEach(event => {
      dropArea.addEventListener(event, unhighlight, false)
    })

    dropArea.addEventListener(
      'drop',
      e => {
        if (!judge || judge()) {
          let dt = e.dataTransfer
          let files = dt.files

          dropArea.dispatchEvent(
            new CustomEvent('file-drop', {
              detail: [...files]
            })
          )
        }
      },
      false
    )
  }
}
