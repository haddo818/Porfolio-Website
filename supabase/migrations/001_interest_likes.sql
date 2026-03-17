-- Table: interest_likes
-- Stores one row per "heart" (like) per interest per session so we can count total likes
-- and allow each visitor to like at most once per interest (tracked by session_id).

create table if not exists public.interest_likes (
  id uuid primary key default gen_random_uuid(),
  interest_id text not null check (interest_id in ('bass', 'band', 'handaxe', 'animation')),
  session_id text not null,
  created_at timestamptz default now(),
  unique (interest_id, session_id)
);

-- Allow anonymous read/write for this table (no auth required)
alter table public.interest_likes enable row level security;

create policy "Allow anonymous select"
  on public.interest_likes for select
  to anon
  using (true);

create policy "Allow anonymous insert"
  on public.interest_likes for insert
  to anon
  with check (true);

create policy "Allow anonymous delete"
  on public.interest_likes for delete
  to anon
  using (true);

-- Optional: index for fast count by interest_id
create index if not exists idx_interest_likes_interest_id
  on public.interest_likes (interest_id);
