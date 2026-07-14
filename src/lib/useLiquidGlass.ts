import { useState, useEffect, RefObject } from "react";

export const SURFACE_FNS = {
  convex_squircle: (x: number) => Math.pow(1 - Math.pow(1 - x, 4), 0.25),
  convex_circle: (x: number) => Math.sqrt(1 - (1 - x) * (1 - x)),
  concave: (x: number) => 1 - Math.sqrt(1 - (1 - x) * (1 - x)),
  lip: (x: number) => {
    const convex = Math.pow(1 - Math.pow(1 - Math.min(x * 2, 1), 4), 0.25);
    const concave = 1 - Math.sqrt(1 - (1 - x) * (1 - x)) + 0.1;
    const t = 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
    return convex * (1 - t) + concave * t;
  },
};

function calculateRefractionProfile(
  glassThickness: number,
  bezelWidth: number,
  heightFn: (x: number) => number,
  ior: number,
  samples: number = 128
) {
  const eta = 1 / ior;
  function refract(nx: number, ny: number) {
    const dot = ny;
    const k = 1 - eta * eta * (1 - dot * dot);
    if (k < 0) return null;
    const sq = Math.sqrt(k);
    return [-(eta * dot + sq) * nx, eta - (eta * dot + sq) * ny];
  }
  const profile = new Float64Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = i / samples;
    const y = heightFn(x);
    const dx = x < 1 ? 0.0001 : -0.0001;
    const y2 = heightFn(x + dx);
    const deriv = (y2 - y) / dx;
    const mag = Math.sqrt(deriv * deriv + 1);
    const ref = refract(-deriv / mag, -1 / mag);
    if (!ref) {
      profile[i] = 0;
      continue;
    }
    profile[i] = ref[0] * ((y * bezelWidth + glassThickness) / ref[1]);
  }
  return profile;
}

function generateDisplacementMap(
  w: number,
  h: number,
  radius: number,
  bezelWidth: number,
  profile: Float64Array,
  maxDisp: number
) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = 128;
    d[i + 1] = 128;
    d[i + 2] = 0;
    d[i + 3] = 255;
  }

  const r = radius,
    rSq = r * r,
    r1Sq = (r + 1) ** 2;
  const rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2,
    hB = h - r * 2,
    S = profile.length;

  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist,
        sin = y / dist;
      const bi = Math.min(((fromSide / bezelWidth) * S) | 0, S - 1);
      const disp = profile[bi] || 0;
      const dX = (-cos * disp) / maxDisp,
        dY = (-sin * disp) / maxDisp;
      const idx = (y1 * w + x1) * 4;
      d[idx] = (128 + dX * 127 * op + 0.5) | 0;
      d[idx + 1] = (128 + dY * 127 * op + 0.5) | 0;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

function generateSpecularMap(
  w: number,
  h: number,
  radius: number,
  bezelWidth: number,
  angle?: number
) {
  angle = angle != null ? angle : Math.PI / 3;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(w, h);
  const d = img.data;
  d.fill(0);

  const r = radius,
    rSq = r * r,
    r1Sq = (r + 1) ** 2;
  const rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2,
    hB = h - r * 2;
  const sv = [Math.cos(angle), Math.sin(angle)];

  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist,
        sin = -y / dist;
      const dot = Math.abs(cos * sv[0] + sin * sv[1]);
      const edge = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2));
      const coeff = dot * edge;
      const col = (255 * coeff) | 0;
      const alpha = (col * coeff * op) | 0;
      const idx = (y1 * w + x1) * 4;
      d[idx] = col;
      d[idx + 1] = col;
      d[idx + 2] = col;
      d[idx + 3] = alpha;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

export interface UseLiquidGlassOptions {
  glassThickness?: number;
  bezelWidth?: number;
  refractiveIndex?: number;
  scaleRatio?: number;
  blurAmount?: number;
  specularOpacity?: number;
  specularSaturation?: number;
  borderRadius?: number;
  surfaceShape?: keyof typeof SURFACE_FNS;
}

export function useLiquidGlass(
  targetRef: RefObject<HTMLElement | null>,
  options: UseLiquidGlassOptions = {}
) {
  const [filterData, setFilterData] = useState<{
    dispUrl: string;
    specUrl: string;
    scale: number;
    w: number;
    h: number;
  } | null>(null);

  const {
    glassThickness = 80,
    bezelWidth = 60,
    refractiveIndex = 3.0,
    scaleRatio = 1.0,
    blurAmount = 0.3,
    specularOpacity = 0.5,
    specularSaturation = 4,
    borderRadius = 60,
    surfaceShape = "convex_squircle",
  } = options;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const updateFilter = () => {
      if (!targetRef.current) return;
      const w = targetRef.current.offsetWidth;
      const h = targetRef.current.offsetHeight;
      if (w < 2 || h < 2) return;

      const heightFn = SURFACE_FNS[surfaceShape];
      const clampedRadius = Math.min(borderRadius, Math.min(w, h) / 2);
      const clampedBezel = Math.min(bezelWidth, clampedRadius - 1);

      const profile = calculateRefractionProfile(glassThickness, clampedBezel, heightFn, refractiveIndex, 128);
      const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
      
      const dispUrl = generateDisplacementMap(w, h, clampedRadius, clampedBezel, profile, maxDisp);
      const specUrl = generateSpecularMap(w, h, clampedRadius, clampedBezel * 2.5);
      const scale = maxDisp * scaleRatio;

      setFilterData({ dispUrl, specUrl, scale, w, h });
    };

    // Initial render
    updateFilter();

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(updateFilter, 50); // debounce slightly
    });

    if (targetRef.current) {
      resizeObserver.observe(targetRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [
    glassThickness,
    bezelWidth,
    refractiveIndex,
    scaleRatio,
    borderRadius,
    surfaceShape,
  ]);

  return { filterData, blurAmount, specularOpacity, specularSaturation };
}
