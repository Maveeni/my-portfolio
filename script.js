/* =====================================================================
   SCRIPT
   Builds the page from your portfolio.js and makes it interactive.
   You don't need to edit this file to make the site yours.

   Sections below:
     1. Your content (from portfolio.js, or your unsaved Settings changes)
     2. Small helpers and icons
     3. Filling in the page
     4. Splash, theme, background, menu, sidebar highlight
     5. The tools carousel
     6. The Settings panel
   ===================================================================== */

;(function () {
  'use strict'

  /* -------------------------------------------------------------------
     1. Your content
     Settings changes are kept in this browser (localStorage) as a draft
     until you download portfolio.js and upload it to GitHub.
     ------------------------------------------------------------------- */
  var DRAFT_KEY = 'portfolio-draft'
  var original = window.PORTFOLIO || {}

  function copy(value) {
    return JSON.parse(JSON.stringify(value))
  }
  function storageGet(key) {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      return null
    }
  }
  function storageSet(key, value) {
    try {
      if (value === null) localStorage.removeItem(key)
      else localStorage.setItem(key, value)
    } catch (e) {
      /* Private browsing can block storage. The preview still works for this visit. */
    }
  }
  function loadData() {
    var saved = storageGet(DRAFT_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        storageSet(DRAFT_KEY, null)
      }
    }
    return copy(original)
  }

  var data = loadData()

  /* -------------------------------------------------------------------
     2. Helpers and icons
     ------------------------------------------------------------------- */
  function $(selector, root) {
    return (root || document).querySelector(selector)
  }
  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector))
  }
  function el(tag, attrs, children) {
    var node = document.createElement(tag)
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === 'text') node.textContent = attrs[key]
      else if (key === 'html') node.innerHTML = attrs[key]
      else node.setAttribute(key, attrs[key])
    })
    ;(children || []).forEach(function (child) {
      if (child) node.appendChild(child)
    })
    return node
  }

  // Simple line icons, drawn on a 24 x 24 grid.
  var ICONS = {
    home: '<path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
    tools: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8V20h3.2l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    settings: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
  }
  function paintIcons(root) {
    $$('svg[data-icon]', root).forEach(function (svg) {
      var name = svg.getAttribute('data-icon')
      svg.setAttribute('viewBox', '0 0 24 24')
      svg.setAttribute('fill', 'none')
      svg.setAttribute('stroke', 'currentColor')
      svg.setAttribute('stroke-width', '1.8')
      svg.setAttribute('stroke-linecap', 'round')
      svg.setAttribute('stroke-linejoin', 'round')
      svg.setAttribute('aria-hidden', 'true')
      svg.innerHTML = ICONS[name] || ''
    })
  }
  function icon(name) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('data-icon', name)
    paintIcons(el('div', {}, [svg]))
    return svg
  }

  // Link icons are drawn inline (copied from images/social) so they also
  // show when the page is opened straight from a file on your computer.
  var SOCIAL_SVGS = {
    github: '<path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    linkedin: '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
    x: '<path fill="currentColor" d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/>',
    youtube: '<path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
    website: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></g>',
  }
  var SOCIAL_ICONS = Object.keys(SOCIAL_SVGS)
  function socialIcon(name) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('class', 'social-icon')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('aria-hidden', 'true')
    svg.innerHTML = SOCIAL_SVGS[name] || SOCIAL_SVGS.website
    return svg
  }

  /* -------------------------------------------------------------------
     3. Filling in the page
     ------------------------------------------------------------------- */
  var SECTIONS = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'tools', label: 'Tools', icon: 'tools' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
    { id: 'about', label: 'About', icon: 'user', opens: true },
    { id: 'contact', label: 'Contact', icon: 'chat', opens: true },
  ]

  function renderNav() {
    $$('[data-nav]').forEach(function (list) {
      list.innerHTML = ''
      SECTIONS.forEach(function (s) {
        // About and Contact open a window instead of scrolling to a section.
        var link = s.opens
          ? el('button', { type: 'button', class: 'nav-btn', 'data-action': 'open-' + s.id }, [
              icon(s.icon),
              el('span', { class: 'rail__label', text: s.label }),
            ])
          : el('a', { href: '#' + s.id, 'data-section': s.id }, [
              icon(s.icon),
              el('span', { class: 'rail__label', text: s.label }),
            ])
        list.appendChild(el('li', {}, [link]))
      })
    })
  }

  function renderSocials() {
    $$('[data-socials]').forEach(function (list) {
      list.innerHTML = ''
      ;(data.socials || []).forEach(function (s) {
        if (!s.url) return
        var name = SOCIAL_ICONS.indexOf(s.icon) > -1 ? s.icon : 'website'
        var mark = socialIcon(name)
        var link = el('a', { href: s.url, target: '_blank', rel: 'noopener', title: s.label, 'aria-label': s.label }, [mark])
        list.appendChild(el('li', {}, [link]))
      })
    })
  }

  function render() {
    $$('[data-text]').forEach(function (node) {
      var value = data[node.getAttribute('data-text')]
      if (value) node.textContent = value
    })
    $$('[data-initial]').forEach(function (node) {
      node.textContent = (data.name || '?').trim().charAt(0).toUpperCase()
    })
    $$('[data-photo]').forEach(function (img) {
      img.src = data._photoPreview || data.photo || 'images/avatar.svg'
      img.alt = 'Photo of ' + (data.name || 'me')
    })
    var about = $('[data-about]')
    if (about) {
      about.innerHTML = ''
      ;(data.about || []).forEach(function (text) {
        about.appendChild(el('p', { text: text }))
      })
    }
    $$('[data-year]').forEach(function (node) {
      node.textContent = new Date().getFullYear()
    })
    if (data.name) document.title = data.name + ' - Portfolio'
    renderSocials()
    renderTools()
  }

  /* -------------------------------------------------------------------
     4. Splash, theme, background, menu, sidebar highlight
     ------------------------------------------------------------------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  function runSplash() {
    var splash = $('.splash')
    if (!splash) return
    // Once per visit, and never for people who asked for less motion.
    var seen = false
    try {
      seen = !!sessionStorage.getItem('splash-seen')
    } catch (e) {}
    if (reduceMotion.matches || seen) {
      splash.remove()
      return
    }
    try {
      sessionStorage.setItem('splash-seen', '1')
    } catch (e) {}
    splash.classList.add('is-playing')
    var done = false
    function finish() {
      if (done) return
      done = true
      splash.classList.add('is-leaving')
      setTimeout(function () {
        splash.remove()
      }, 550)
    }
    setTimeout(finish, 1900)
    // A click or any key skips it.
    splash.addEventListener('click', finish)
    window.addEventListener('keydown', finish, { once: true })
  }

  function currentTheme() {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  }
  function paintThemeButtons() {
    var dark = currentTheme() === 'dark'
    $$('[data-action="theme"] svg').forEach(function (svg) {
      svg.setAttribute('data-icon', dark ? 'sun' : 'moon')
    })
    paintIcons()
    $$('[data-theme-label]').forEach(function (label) {
      label.textContent = dark ? 'Light mode' : 'Dark mode'
    })
    var meta = $('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', dark ? '#111113' : '#E8E7EA')
  }
  function toggleTheme() {
    var next = currentTheme() === 'dark' ? 'light' : 'dark'
    if (next === 'dark') document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
    storageSet('theme', next)
    paintThemeButtons()
  }

  // The dotted background lights up around the mouse.
  function setupDots() {
    var dots = $('.dots')
    if (!dots || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    var frame = 0
    window.addEventListener(
      'pointermove',
      function (e) {
        if (reduceMotion.matches) return
        dots.classList.add('is-lit')
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(function () {
          dots.style.setProperty('--mx', e.clientX + 'px')
          dots.style.setProperty('--my', e.clientY + 'px')
        })
      },
      { passive: true },
    )
    document.documentElement.addEventListener('pointerleave', function () {
      dots.classList.remove('is-lit')
    })
  }

  // Phone menu.
  function setupMenu() {
    var menu = $('#menu')
    var opener = $('[data-action="menu"]')
    if (!menu || !opener) return
    opener.addEventListener('click', function () {
      menu.showModal()
      opener.setAttribute('aria-expanded', 'true')
    })
    menu.addEventListener('close', function () {
      opener.setAttribute('aria-expanded', 'false')
    })
    menu.addEventListener('click', function (e) {
      // Close on a link, the close button, or a click on the dark backdrop.
      if (e.target === menu || e.target.closest('a, [data-action="close-menu"]')) menu.close()
    })
  }

  // Highlight the sidebar link for the section you're looking at.
  function setupScrollSpy() {
    var links = $$('[data-section]')
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return
          var id = entry.target.id
          links.forEach(function (a) {
            if (a.getAttribute('data-section') === id) a.setAttribute('aria-current', 'true')
            else a.removeAttribute('aria-current')
          })
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    SECTIONS.forEach(function (s) {
      var section = document.getElementById(s.id)
      if (section) observer.observe(section)
    })
  }

  /* -------------------------------------------------------------------
     5. The tools carousel
     Each tool is a bubble; pointing at one opens it into a pill with the
     name. The strip glides by itself, slows down while you point at it,
     and gets a little push when you scroll.
     ------------------------------------------------------------------- */
  var marquee = { x: 0, speed: 0, boost: 0, hovering: false, loop: 0 }
  var LOOP_SECONDS = 60 // time for one full loop
  var HOVER_SPEED = 0.15 // share of normal speed while pointing at it

  function toolBubble(tool, hidden) {
    var attrs = { class: 'bubble', href: tool.url || '#', target: '_blank', rel: 'noopener' }
    if (hidden) {
      attrs['aria-hidden'] = 'true'
      attrs.tabindex = '-1'
    } else {
      attrs['aria-label'] = tool.name + ' (opens in a new tab)'
    }
    var img = el('img', { src: tool._logoPreview || tool.logo || '', alt: '', width: '18', height: '18', loading: 'lazy' })
    return el('li', {}, [el('a', attrs, [img, el('span', { class: 'bubble__name', text: tool.name })])])
  }

  function renderTools() {
    var box = $('[data-marquee]')
    var track = $('[data-track]')
    if (!box || !track) return
    var tools = (data.tools || []).filter(function (t) {
      return t && t.name
    })
    track.innerHTML = ''
    if (!tools.length) return

    // One set of bubbles, repeated until it's wider than the strip, then
    // that whole run twice, so the loop has no visible seam.
    tools.forEach(function (t) {
      track.appendChild(toolBubble(t, false))
    })
    var setWidth = track.scrollWidth
    var repeats = Math.max(1, Math.ceil((box.clientWidth + 1) / Math.max(setWidth, 1)))
    for (var r = 1; r < repeats * 2; r++) {
      tools.forEach(function (t) {
        track.appendChild(toolBubble(t, true))
      })
    }
    // The loop length is the distance from the first bubble to the first
    // bubble of the second run - measured, so the seam is pixel-exact.
    var perRun = tools.length * repeats
    var first = track.children[0]
    var secondRun = track.children[perRun]
    marquee.loop = secondRun ? secondRun.offsetLeft - first.offsetLeft : 0
    marquee.x = marquee.loop ? marquee.x % marquee.loop : 0
  }

  function setupMarquee() {
    var box = $('[data-marquee]')
    var track = $('[data-track]')
    if (!box || !track) return
    var last = 0
    var running = false
    var visible = true

    function still() {
      return reduceMotion.matches
    }
    function frame(now) {
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0
      last = now
      var cruise = marquee.loop / LOOP_SECONDS
      var target = still() ? 0 : cruise * (marquee.hovering ? HOVER_SPEED : 1) + marquee.boost
      marquee.speed += (target - marquee.speed) * (1 - Math.exp(-dt * 3.5))
      marquee.boost *= Math.exp(-dt * 2.2)
      if (marquee.loop > 0) {
        marquee.x = (((marquee.x + marquee.speed * dt) % marquee.loop) + marquee.loop) % marquee.loop
      }
      track.style.transform = 'translate3d(' + -marquee.x + 'px, 0, 0)'
      if (running) requestAnimationFrame(frame)
    }
    function start() {
      if (running || !visible || document.hidden) return
      running = true
      last = 0
      requestAnimationFrame(frame)
    }
    function stop() {
      running = false
    }

    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting
      if (visible) start()
      else stop()
    }).observe(box)
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop()
      else start()
    })
    box.addEventListener('pointerenter', function () {
      marquee.hovering = true
    })
    box.addEventListener('pointerleave', function () {
      marquee.hovering = false
    })
    box.addEventListener('focusin', function () {
      marquee.hovering = true
    })
    box.addEventListener('focusout', function () {
      marquee.hovering = false
    })

    // Scrolling down pushes the strip forward, scrolling up pushes it back.
    var lastScroll = window.scrollY
    window.addEventListener(
      'scroll',
      function () {
        var delta = window.scrollY - lastScroll
        lastScroll = window.scrollY
        if (still()) return
        var cap = (marquee.loop / LOOP_SECONDS) * 5
        marquee.boost = Math.max(-cap, Math.min(cap, marquee.boost + delta * 6))
      },
      { passive: true },
    )

    // Re-measure when the window changes size.
    var resizeTimer = 0
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(renderTools, 200)
    })

    // Bubble widths change once the web font has loaded, so measure again.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderTools)

    start()
  }

  /* -------------------------------------------------------------------
     6. The Settings panel
     Edits update the page straight away and are kept in this browser as a
     draft. "Download portfolio.js" turns them into a file to upload to
     GitHub - that's what makes them public.
     ------------------------------------------------------------------- */
  var settings = $('#settings')
  var form = $('[data-settings-form]')
  var MAX_IMAGE_BYTES = 400 * 1024

  function saveDraft() {
    storageSet(DRAFT_KEY, JSON.stringify(data))
    render()
    updateUploadNote()
  }

  function updateUploadNote() {
    var note = $('[data-upload-note]')
    if (!note) return
    var files = []
    if (data._photoPreview && data.photo) files.push(data.photo)
    ;(data.tools || []).forEach(function (t) {
      if (t._logoPreview && t.logo) files.push(t.logo)
    })
    note.hidden = !files.length
    note.innerHTML = files.length
      ? 'Remember to also upload these images to your repo: <strong>' + files.join(', ') + '</strong>'
      : ''
  }

  // Let the learner pick an image to preview. It is shown straight away;
  // the file itself still has to be uploaded to the repo by hand.
  function pickImage(folder, done) {
    var input = el('input', { type: 'file', accept: 'image/*' })
    input.addEventListener('change', function () {
      var file = input.files && input.files[0]
      if (!file) return
      if (file.size > MAX_IMAGE_BYTES) {
        alertInline('That image is over 400 KB. Please pick a smaller one.')
        return
      }
      var reader = new FileReader()
      reader.onload = function () {
        var safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-')
        done(folder + safeName, reader.result)
      }
      reader.readAsDataURL(file)
    })
    input.click()
  }

  function alertInline(message) {
    var note = $('[data-upload-note]')
    if (!note) return
    note.hidden = false
    note.textContent = message
  }

  function rowButton(label, text, onClick, disabled) {
    var b = el('button', { type: 'button', class: 'settings__mini', 'aria-label': label, title: label, text: text })
    if (disabled) b.disabled = true
    b.addEventListener('click', onClick)
    return b
  }

  function field(labelText, value, onInput, placeholder) {
    var input = el('input', { value: value || '', placeholder: placeholder || '', 'aria-label': labelText, autocomplete: 'off' })
    input.addEventListener('input', function () {
      onInput(input.value)
    })
    return input
  }

  function renderToolRows() {
    var list = $('[data-tool-rows]')
    list.innerHTML = ''
    var tools = data.tools || (data.tools = [])
    tools.forEach(function (tool, i) {
      var preview = el('span', { class: 'settings__preview' }, [
        el('img', { src: tool._logoPreview || tool.logo || '', alt: '' }),
      ])
      var pick = el('button', { type: 'button', class: 'settings__pick', text: 'Pick image' })
      pick.addEventListener('click', function () {
        pickImage('images/tools/', function (path, dataUrl) {
          tool.logo = path
          tool._logoPreview = dataUrl
          saveDraft()
          renderToolRows()
        })
      })
      var fields = el('div', { class: 'settings__row-fields' }, [
        field('Tool name', tool.name, function (v) {
          tool.name = v
          saveDraft()
        }, 'Tool name'),
        field('Logo', tool.logo, function (v) {
          tool.logo = v
          delete tool._logoPreview
          preview.firstChild.src = v
          saveDraft()
        }, 'images/tools/logo.svg'),
        field('Link', tool.url, function (v) {
          tool.url = v
          saveDraft()
        }, 'https://nextwork.ai/...'),
        pick,
      ])
      var actions = el('div', { class: 'settings__row-actions' }, [
        rowButton('Move up', '↑', function () {
          tools.splice(i - 1, 0, tools.splice(i, 1)[0])
          saveDraft()
          renderToolRows()
        }, i === 0),
        rowButton('Move down', '↓', function () {
          tools.splice(i + 1, 0, tools.splice(i, 1)[0])
          saveDraft()
          renderToolRows()
        }, i === tools.length - 1),
        rowButton('Remove ' + (tool.name || 'tool'), '✕', function () {
          tools.splice(i, 1)
          saveDraft()
          renderToolRows()
        }),
      ])
      list.appendChild(el('div', { class: 'settings__row' }, [preview, fields, actions]))
    })
  }

  function renderSocialRows() {
    var list = $('[data-social-rows]')
    list.innerHTML = ''
    var socials = data.socials || (data.socials = [])
    socials.forEach(function (s, i) {
      var mark = socialIcon(s.icon)
      var select = el('select', { 'aria-label': 'Icon' })
      SOCIAL_ICONS.forEach(function (name) {
        var option = el('option', { value: name, text: name })
        if (name === s.icon) option.selected = true
        select.appendChild(option)
      })
      select.addEventListener('change', function () {
        s.icon = select.value
        saveDraft()
        renderSocialRows()
      })
      var fields = el('div', { class: 'settings__row-fields' }, [
        field('Label', s.label, function (v) {
          s.label = v
          saveDraft()
        }, 'GitHub'),
        field('Link', s.url, function (v) {
          s.url = v
          saveDraft()
        }, 'https://...'),
        select,
      ])
      var actions = el('div', { class: 'settings__row-actions' }, [
        rowButton('Remove ' + (s.label || 'link'), '✕', function () {
          socials.splice(i, 1)
          saveDraft()
          renderSocialRows()
        }),
      ])
      list.appendChild(el('div', { class: 'settings__row' }, [el('span', { class: 'settings__preview' }, [mark]), fields, actions]))
    })
  }

  function fillForm() {
    ;['name', 'headline', 'intro', 'email', 'photo'].forEach(function (key) {
      form.elements[key].value = data[key] || ''
    })
    renderSocialRows()
    renderToolRows()
    updateUploadNote()
  }

  // Turn the current content back into a portfolio.js file.
  function buildFile() {
    var clean = copy(data)
    delete clean._photoPreview
    ;(clean.tools || []).forEach(function (t) {
      delete t._logoPreview
    })
    return (
      '/* =====================================================================\n' +
      '   YOUR PORTFOLIO - this is the only file you need to edit.\n' +
      '   Made with the Settings panel on ' + new Date().toDateString() + '.\n' +
      '   ===================================================================== */\n\n' +
      'window.PORTFOLIO = ' + JSON.stringify(clean, null, 2) + '\n'
    )
  }

  function download() {
    var blob = new Blob([buildFile()], { type: 'text/javascript' })
    var link = el('a', { href: URL.createObjectURL(blob), download: 'portfolio.js' })
    document.body.appendChild(link)
    link.click()
    setTimeout(function () {
      URL.revokeObjectURL(link.href)
      link.remove()
    }, 1000)
  }

  function setupSettings() {
    if (!settings || !form) return
    ;['name', 'headline', 'intro', 'email', 'photo'].forEach(function (key) {
      form.elements[key].addEventListener('input', function () {
        data[key] = form.elements[key].value
        if (key === 'photo') delete data._photoPreview
        saveDraft()
      })
    })
    var photoPick = el('button', { type: 'button', class: 'settings__pick', text: 'Pick image' })
    photoPick.addEventListener('click', function () {
      pickImage('images/', function (path, dataUrl) {
        data.photo = path
        data._photoPreview = dataUrl
        form.elements.photo.value = path
        saveDraft()
      })
    })
    form.elements.photo.parentNode.appendChild(photoPick)

    document.addEventListener('click', function (e) {
      var action = e.target.closest('[data-action]')
      if (!action) return
      switch (action.getAttribute('data-action')) {
        case 'settings':
          var menu = $('#menu')
          if (menu && menu.open) menu.close()
          fillForm()
          settings.showModal()
          break
        case 'close-settings':
          settings.close()
          break
        case 'open-page':
        case 'open-about':
        case 'open-contact':
          var menuOpen = $('#menu')
          if (menuOpen && menuOpen.open) menuOpen.close()
          $$('.window').forEach(function (w) {
            if (w.open) w.close()
          })
          if (action.getAttribute('data-action') === 'open-page') {
            // Fill the browser window with the page this card points to.
            var page = $('#page-' + action.getAttribute('data-page'))
            var body = $('[data-window-body]')
            body.innerHTML = ''
            body.appendChild(page.content.cloneNode(true))
            body.scrollTop = 0
            $('[data-window-url]').textContent = page.getAttribute('data-url')
          }
          $('#' + action.getAttribute('data-action').slice(5)).showModal()
          break
        case 'close-window':
          action.closest('dialog').close()
          break
        case 'add-tool':
          data.tools = data.tools || []
          data.tools.push({ name: 'New tool', logo: '', url: '' })
          saveDraft()
          renderToolRows()
          break
        case 'add-social':
          data.socials = data.socials || []
          data.socials.push({ label: 'Website', url: '', icon: 'website' })
          saveDraft()
          renderSocialRows()
          break
        case 'download':
          download()
          break
        case 'reset-settings':
          data = copy(original)
          storageSet(DRAFT_KEY, null)
          render()
          fillForm()
          break
        case 'theme':
          toggleTheme()
          break
      }
    })
    settings.addEventListener('click', function (e) {
      if (e.target === settings) settings.close() // click on the backdrop
    })
    $$('.window').forEach(function (w) {
      w.addEventListener('click', function (e) {
        if (e.target === w) w.close() // click on the backdrop
      })
    })

    // No server here, so the contact form hands the message to the
    // visitor's email app, already addressed and filled in.
    var contactForm = $('[data-contact-form]')
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()
      var f = contactForm.elements
      var subject = 'Hello from ' + f.name.value
      var body = f.message.value + '\n\n' + f.name.value + '\n' + f.email.value
      window.location.href =
        'mailto:' + (data.email || '') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
    })
  }

  /* -------------------------------------------------------------------
     Start
     ------------------------------------------------------------------- */
  runSplash()
  paintIcons()
  renderNav()
  render()
  paintThemeButtons()
  setupDots()
  setupMenu()
  setupScrollSpy()
  setupMarquee()
  setupSettings()
})()
