// /src/hooks/useP5Sketch.js
import { useEffect } from 'react';
import p5 from 'p5';

export function useP5Sketch(containerRef, shapesRef, mode = '2D') {
  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p) => {
      p.setup = () => {
        const renderer = mode === '3D' ? p.WEBGL : undefined;
        p.createCanvas(400, 300, renderer);
        p.noLoop();
      };

      p.draw = () => {
        p.clear();
        for (const shape of shapesRef.current) {
          if (shape.type === 'rect') {
            if (mode === '2D') {
              p.rect(shape.x, shape.y, shape.w, shape.h);
            } else {
              p.push();
              p.translate(shape.x, shape.y, 0);
              p.box(shape.w, shape.h, 20);
              p.pop();
            }
          } else if (shape.type === 'circle') {
            if (mode === '2D') {
              p.ellipse(shape.x, shape.y, shape.r * 2);
            } else {
              p.push();
              p.translate(shape.x, shape.y, 0);
              p.sphere(shape.r);
              p.pop();
            }
          }
        }
      };
    };

    const p5Instance = new p5(sketch, containerRef.current);
    return () => p5Instance.remove();
  }, [containerRef, shapesRef, mode]);
}
