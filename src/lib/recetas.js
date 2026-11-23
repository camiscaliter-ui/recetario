import { load } from 'js-yaml';

const files = import.meta.glob('../recetas/*.yml', { eager: true, query: '?raw', import: 'default' });

export const EST = '[estimado]';

function item(text) {
  const t = String(text);
  const est = t.includes(EST);
  return { text: t.replace(EST, '').trim(), est };
}

function grupos(list = []) {
  return list.map((g) => ({ grupo: g.grupo || null, items: (g.items || []).map(item) }));
}

export function formatTiempo(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m}` : `${h} h`;
}

export const recetas = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace('.yml', '');
    const d = load(raw);
    const ingredientes = grupos(d.ingredientes);
    const pasos = grupos(d.pasos);
    const versiones = (d.versiones || []).map((v) => ({
      nombre: v.nombre,
      tiempo_min: v.tiempo_min ?? d.tiempo_min,
      ingredientes: [...grupos(v.ingredientes), ...ingredientes],
      pasos: [...grupos(v.pasos), ...pasos],
    }));
    if (!versiones.length) versiones.push({ nombre: null, tiempo_min: d.tiempo_min, ingredientes, pasos });
    const hayEstimados = versiones.some((v) =>
      [...v.ingredientes, ...v.pasos].some((g) => g.items.some((i) => i.est)));
    return {
      ...d,
      slug,
      versiones,
      hayEstimados,
      imagen: `/recetas/${slug}/ilustracion.png`,
      fotos: (d.fotos || []).map((f) => `/recetas/${slug}/${f}`),
      unidad: d.unidad || 'porciones',
    };
  })
  .sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
