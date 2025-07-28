export function drawRect(x, y, w, h, label = '') {
  parent.postMessage({ type: 'draw', shape: { type: 'rect', x, y, w, h, label } }, '*');
}

export function drawCircle(x, y, r, label = '') {
  parent.postMessage({ type: 'draw', shape: { type: 'circle', x, y, r, label } }, '*');
}

export function clearCanvas() {
  parent.postMessage({ type: 'clear' }, '*');
}

export const draw = { rect: drawRect, circle: drawCircle, clear: clearCanvas };
