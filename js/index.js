import {$} from '/js/utils.js'

(function () {
  const DOM = {
    entriesList: $('.entries-list')
  }

  let files
  let entries
  let filteredEntries

  setup()

  async function setup () {
    if (!window.DatArchive) {
      // TODO
    }

    files = new DatArchive(window.location)

    await readEntries()
    renderEntries(entries)
  }

  // filesystem
  async function readEntries () {
    let entriesFile = await files.readFile('data/entries.json')
    entries = JSON.parse(entriesFile)
    filteredEntries = entries
  }

  // rendering
  function renderEntries (entries) {
    for (let i = 0; i < entries.length; i++) {
      DOM.entriesList.innerHTML += renderEntry(entries[i])
    }
  }

  function renderEntry (entry) {
    let clsStr = entry.classes
      ? entry.classes.reduce((acc, val) => acc +  val + ' ', '')
      : ''

    let descriptionEl = ''
    if (entry.description) {
      descriptionEl = `<p class="entry-description">${entry.description}</p>`
    }

    let imageEl = ''
    if (entry.image) {
      imageEl = `<img src=${entry.image} class="entry-image" aria-hidden="true" />`
    }

    let screenshotEl = ''
    if (entry.screenshot) {
      screenshotEl = `<img src=${entry.screenshot} class="entry-screenshot" aria-hidden="true" />`
    }

    return `
      <div class="entry ${clsStr}">
        <h3 class="entry-title">${entry.title}</h3>

        ${descriptionEl}
        ${imageEl}
        ${screenshotEl}

        <div class="entry-footer">
        </div>
      </div>
    `
  }
})()