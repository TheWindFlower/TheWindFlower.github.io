{
  const container = document.getElementById('terminalLines');
  const cta = document.getElementById('terminalCta');

  // Lines to type out 
  const lines = [
    { type: 'prompt', text: 'whoami' },
    { type: 'output', html: '<span class="t-value">Camille Petrou</span>' },
    { type: 'blank' },
    { type: 'prompt', text: 'cat info.json' },
    { type: 'output', html: '{' },
    { type: 'output', html: '  <span class="t-key">"role"</span>: <span class="t-value">"CS Student — DEC Informatique, Cégep"</span>,' },
    { type: 'output', html: '  <span class="t-key">"focus"</span>: <span class="t-value">"Backend, Low-level, Linux"</span>,' },
    { type: 'output', html: '  <span class="t-key">"status"</span>: <span class="t-status-open">"Open to internships"</span>,' },
    { type: 'output', html: '  <span class="t-key">"location"</span>: <span class="t-value">"La Pocatière, Québec"</span>' },
    { type: 'output', html: '}' },
    { type: 'blank' },
    { type: 'prompt', text: '' },
  ];

  let lineIndex = 0;
  let charindex = 0;
  const TYPING_SPEED = 40;   // ms per character for prompt lines
  const LINE_DELAY   = 120;  // ms delay between lines

  function renderLine(line) {
    const span = document.createElement('span');
    span.classList.add('t-line');

    if (line.type === 'blank') {
      span.classList.add('t-blank');
      container.appendChild(span);
      return;
    }

    if (line.type === 'output') {
      span.innerHTML = line.html;
      container.appendChild(span);
      return;
    }

    // prompt line — typed out character by character
    span.innerHTML = '<span class="t-prompt">→ </span>';
    container.appendChild(span);
    return span;
  }

  function typePrompt(line, span, onDone) {
    const text = line.text;
    let i = 0;

    function tick() {
      if (i <= text.length) {
        span.innerHTML = '<span class="t-prompt">→ </span>' + text.slice(0, i);
        i++;
        setTimeout(tick, TYPING_SPEED);
      } else {
        onDone();
      }
    }

    tick();
  }

  function processLines() {
    if (lineIndex >= lines.length) {
      // All done — show CTA
      cta.classList.add('visible');
      return;
    }

    const line = lines[lineIndex];
    lineIndex++;

    if (line.type === 'prompt') {
      const span = renderLine(line);
      typePrompt(line, span, () => {
        setTimeout(processLines, LINE_DELAY);
      });
    } else {
      renderLine(line);
      setTimeout(processLines, LINE_DELAY);
    }
  }

  // Start after a short initial delay
  setTimeout(processLines, 600);
}
