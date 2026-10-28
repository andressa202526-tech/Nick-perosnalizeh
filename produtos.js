import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const root=document.querySelector('#cmsItems');
const u=window.NICK_SUPABASE_URL, k=window.NICK_SUPABASE_ANON_KEY;
if(root && u?.startsWith('https://') && k && !k.startsWith('COLE_')){
 const db=createClient(u,k);
 const {data,error}=await db.from('produtos').select('id,nome,descricao,categoria,preco,imagem_url').eq('ativo',true).order('criado_em',{ascending:false});
 if(error){console.error(error);document.querySelector('#cmsError').hidden=false;document.querySelector('#cmsError').textContent='Não foi possível carregar os produtos novos.';}
 else for(const p of data||[]){
  const a=document.createElement('article');a.className='product';
  if(p.imagem_url){const img=document.createElement('img');img.loading='lazy';img.src=p.imagem_url;img.alt='Foto de '+p.nome;a.append(img);}
  const content=document.createElement('div');content.className='product-body';
  const h=document.createElement('h3');h.textContent=p.nome;content.append(h);
  if(p.descricao){const d=document.createElement('p');d.textContent=p.descricao;content.append(d);}
  if(p.preco!=null){const price=document.createElement('div');price.className='cms-price';price.textContent=Number(p.preco).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});content.append(price);}
  const button=document.createElement('button');button.className='add-btn';button.textContent='+ Quero orçamento';button.addEventListener('click',()=>{const msg=`Olá! Vim pelo site e gostaria de orçamento de: ${p.nome}.`;window.open('https://wa.me/5548999641422?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer');});content.append(button);a.append(content);root.append(a);
 }
}
