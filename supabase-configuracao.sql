-- EXECUTAR UMA VEZ NO SQL EDITOR DO PROJETO NICK PERSONALIZEH
-- Permite que o painel consulte se o usuário autenticado é administrador.
-- Não concede acesso a contas não autorizadas.
alter table public.admin_users enable row level security;
drop policy if exists "Admin consulta proprio acesso" on public.admin_users;
create policy "Admin consulta proprio acesso"
on public.admin_users for select to authenticated
using (user_id = (select auth.uid()));
