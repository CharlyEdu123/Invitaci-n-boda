create table if not exists public.asistencias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(trim(nombre)) between 2 and 120),
  pases smallint not null default 1 check (pases between 1 and 3),
  respuesta text not null check (respuesta in ('¡Sí, asistiré con gusto!', 'Lo siento, no podré asistir')),
  mensaje text check (mensaje is null or char_length(mensaje) <= 500),
  created_at timestamptz not null default now()
);

create table if not exists public.canciones (
  id uuid primary key default gen_random_uuid(),
  titulo text not null check (char_length(trim(titulo)) between 1 and 120),
  artista text check (artista is null or char_length(trim(artista)) between 1 and 120),
  momento text check (momento is null or char_length(momento) <= 120),
  created_at timestamptz not null default now()
);

alter table public.asistencias enable row level security;
alter table public.canciones enable row level security;

drop policy if exists "invitados pueden registrar asistencias" on public.asistencias;
create policy "invitados pueden registrar asistencias"
  on public.asistencias for insert
  to anon, authenticated
  with check (true);

drop policy if exists "invitados pueden sugerir canciones" on public.canciones;
create policy "invitados pueden sugerir canciones"
  on public.canciones for insert
  to anon, authenticated
  with check (true);

drop policy if exists "invitados pueden ver ultimas canciones" on public.canciones;
create policy "invitados pueden ver ultimas canciones"
  on public.canciones for select
  to anon, authenticated
  using (true);

-- Esta política permite cargar el dashboard protegido por prompt en un HTML estático.
-- Para privacidad real, reemplázala por una política basada en Supabase Auth
-- (por ejemplo, usando auth.uid() y una tabla de perfiles administradores).
drop policy if exists "dashboard puede leer asistencias" on public.asistencias;
create policy "dashboard puede leer asistencias"
  on public.asistencias for select
  to anon, authenticated
  using (true);

alter table public.canciones replica identity full;
alter table public.asistencias replica identity full;

-- En Supabase Dashboard: Database > Publications > supabase_realtime
-- habilita las tablas public.canciones y public.asistencias.

-- Álbum colaborativo de fotos
insert into storage.buckets (id, name, public)
values ('album-invitados', 'album-invitados', true)
on conflict (id) do nothing;

update storage.buckets
set
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'album-invitados';

drop policy if exists "invitados pueden ver fotos del album" on storage.objects;
create policy "invitados pueden ver fotos del album"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'album-invitados');

drop policy if exists "invitados pueden subir fotos al album" on storage.objects;
create policy "invitados pueden subir fotos al album"
  on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'album-invitados'
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
    and (metadata->>'mimetype') in ('image/jpeg', 'image/png', 'image/webp')
    and coalesce((metadata->>'size')::bigint, 0) <= 10485760
  );
