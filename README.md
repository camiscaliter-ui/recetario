# Recetario

Libro de recetas de la casa. Sitio estático hecho con [Astro](https://astro.build), publicado en Vercel.

## Cómo agregar una receta

1. Crear `src/recetas/<slug>.yml` (el slug es el nombre de la URL, en minúsculas y con guiones).
2. Poner la ilustración en `public/recetas/<slug>/ilustracion.png` y, si hay, las fotos originales en la misma carpeta.
3. Hacer commit en `main`: Vercel publica solo.

### Formato

```yaml
titulo: Budín de banana
subtitulo: (opcional)
autora: (opcional)
tipo: dulce            # dulce | salado
veggie: true
tiempo_min: 80         # tiempo total en minutos
tiempo_nota: (opcional)
dificultad: Fácil      # Fácil | Media | Difícil
porciones: 4           # número base para escalar las cantidades
unidad: porciones      # o "unidades", "budines chicos", etc.
nota: (opcional)
fotos: [original.jpg]  # archivos en public/recetas/<slug>/
ingredientes:
  - grupo: (opcional)
    items:
      - 200 g de manteca
      - 1 cdita. de bicarbonato [estimado]
pasos:
  - items:
      - Mezclar la manteca con el azúcar.
```

- Las cantidades al principio de cada ingrediente (`200 g`, `1/2 taza`, `2 y 1/4 tazas`, `4 o 5 huevos`) se escalan solas con el selector de porciones.
- `[estimado]` al final de un ingrediente o paso lo marca como dato que no estaba en la receta original.
- Para recetas con versiones (por ejemplo, el pastel de papa), usar `versiones:` con `nombre`, `tiempo_min`, `ingredientes` y `pasos`. Lo que esté afuera de `versiones` es común a todas.

## Desarrollo

```sh
npm install
npm run dev
```
