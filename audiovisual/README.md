# Audiovisual - desactivado temporalmente

Este directorio contiene los archivos de la seccion Audiovisual desactivados temporalmente.

## Contenido
- data/audiovisual_projects.ts - datos del proyecto audiovisual (movido desde \src/data/audiovisual_projects.ts\)
- components/ - placeholder para \src/components/audiovisual/\ (estaba vacio)

## Reactivacion
Para reactivar:
1. Mover \udiovisual/data/audiovisual_projects.ts\ de vuelta a \src/data/audiovisual_projects.ts\
2. Restaurar imports/usos en:
   - \src/app/page.tsx\ (import, ProjectSection, seccion 04)
   - \src/app/projects/[slug]/page.tsx\ (import, generateStaticParams, routing)
   - \src/components/layout/Header.tsx\ (NAV_ITEMS)
3. Verificar \pnpm build\ genera \out/projects/video-reel-2024.html\

