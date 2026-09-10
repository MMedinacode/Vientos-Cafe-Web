/* ============================================================
   DATOS DEL NEGOCIO
   ============================================================ */

// HORARIO DE EJEMPLO — Google Maps solo confirmó apertura a las 9:30 a.m., sin horario semanal completo.
// Horario real confirmado vía Google Maps (ficha "Vientos café").
const HOURS = {
  0: [[9.5,21]], 1: [], 2: [[8.25,21]], 3: [[8.25,21]],
  4: [[8.25,21]], 5: [[8.25,21]], 6: [[9.5,21]]
};

// Teléfono real confirmado vía Google Maps.
const WHATSAPP_NUMBER = "56975710076";

// CATÁLOGO — precios tomados del menú físico fotografiado (@vientos.cafe).
const MENU = [
  // --- CAFÉ ---
  { id:'c1', cat:'Café', name:'Espresso', price:1700, desc:'Base de toda la carta de café.', img:'fotos/espresso.jpg' },
  { id:'c2', cat:'Café', name:'Americano', price:1800, desc:'Espresso alargado con agua caliente.' },
  { id:'c3', cat:'Café', name:'Ibrik Coffee / Café Turco', price:2200, desc:'Método tradicional de cocción en cezve, con borra.', img:'fotos/ibrik-coffee-cafe-turco.jpg' },
  { id:'c4', cat:'Café', name:'Filtrados', price:2500, desc:'Método de filtrado, consulta el origen disponible.' },

  // --- PREPARACIONES CON CAFÉ ---
  { id:'p1', cat:'Preparaciones', name:'Flat White', price:2300, desc:'Espresso con leche texturizada fina.' },
  { id:'p2', cat:'Preparaciones', name:'Capuccino', price:2400, desc:'Espresso, leche vaporizada y espuma.' },
  { id:'p3', cat:'Preparaciones', name:'Latte', price:2700, desc:'Espresso con abundante leche vaporizada.' },
  { id:'p4', cat:'Preparaciones', name:'Caramelo', price:3000, desc:'Latte con syrup de caramelo.' },
  { id:'p5', cat:'Preparaciones', name:'Mocka', price:3000, desc:'Espresso, chocolate y leche vaporizada.', img:'fotos/mocka.jpg' },
  { id:'p6', cat:'Preparaciones', name:'Mocka Menta', price:3200, desc:'Mocka con un toque de menta.' },
  { id:'p7', cat:'Preparaciones', name:'Latte Nutella', price:3200, desc:'Latte con crema de avellanas y cacao.' },
  { id:'p8', cat:'Preparaciones', name:'Latte Manjar', price:3100, desc:'Latte con manjar chileno.' },

  // --- OTRAS BEBIDAS ---
  { id:'o1', cat:'Otras Bebidas', name:'Chai Latte', price:2500, desc:'Especias de chai con leche vaporizada.' },
  { id:'o2', cat:'Otras Bebidas', name:'Dirty Chai Latte', price:2900, desc:'Chai latte con un shot de espresso.' },
  { id:'o3', cat:'Otras Bebidas', name:'Chocolate Caliente', price:2500, desc:'Chocolate caliente de la casa.' },
  { id:'o4', cat:'Otras Bebidas', name:'Matcha Latte', price:3000, desc:'Matcha con leche vaporizada.' },

  // --- BEBIDAS FRÍAS ---
  { id:'fr1', cat:'Bebidas Frías', name:'Iced Brew', price:2600, desc:'Café macerado en frío.' },
  { id:'fr2', cat:'Bebidas Frías', name:'Iced Coffee', price:2700, desc:'Espresso con hielo.' },
  { id:'fr3', cat:'Bebidas Frías', name:'Iced Caramel', price:2800, desc:'Café frío con syrup de caramelo.' },
  { id:'fr4', cat:'Bebidas Frías', name:'Jugos', price:2500, desc:'Jugo natural del día.', img:'fotos/jugos.jpg' },
  { id:'fr5', cat:'Bebidas Frías', name:'Limonada', price:2600, desc:'Limonada natural.' },
  { id:'fr6', cat:'Bebidas Frías', name:'Frappé', price:3500, desc:'Café helado batido con hielo.' },
  { id:'fr7', cat:'Bebidas Frías', name:'Café Helado', price:3600, desc:'Preparación fría de la casa.' },

  // --- TÉ E INFUSIONES ---
  { id:'t1', cat:'Té e Infusiones', name:'Té Negro / Rojo / Oolong / Verde', price:1700, desc:'Selección clásica de té.' },
  { id:'t2', cat:'Té e Infusiones', name:'Brisa', price:2100, desc:'Romero, malva, lavanda y San Juan.' },
  { id:'t3', cat:'Té e Infusiones', name:'Terral', price:2400, desc:'Menta, boldo y poleo. Con leche $3.000.' },
  { id:'t4', cat:'Té e Infusiones', name:'Vendaval', price:2400, desc:'Naranja, canela, lavanda, té negro y miel. Con leche $3.000.' },
  { id:'t5', cat:'Té e Infusiones', name:'Té Verde Frutilla Poleo', price:2000, desc:'Té verde con frutilla y poleo.' },
  { id:'t6', cat:'Té e Infusiones', name:'Té Verde Jazmín / Rooibos', price:2000, desc:'Té verde jazmín o infusión de rooibos.' },
];

const CATEGORIES = ['Café','Preparaciones','Otras Bebidas','Bebidas Frías','Té e Infusiones'];

/* ============================================================
   ESTADO
   ============================================================ */
let activeCat = 'Café';
let cart = {};
const fmt = n => '$' + n.toLocaleString('es-CL');

/* ============================================================
   RENDER CARTA
   ============================================================ */
function renderFilters(){
  const wrap = document.getElementById('cat-filters');
  wrap.innerHTML = CATEGORIES.map(c =>
    `<button class="cat-btn px-4 py-2 text-[11px] tracker uppercase ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`
  ).join('');
  wrap.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{ activeCat = btn.dataset.cat; renderFilters(); renderMenu(); });
  });
}

function renderMenu(){
  const list = document.getElementById('menu-list');
  const items = MENU.filter(i => i.cat === activeCat);
  list.innerHTML = items.map(i => `
    <div class="card-item grid grid-cols-[1fr,auto] items-center gap-4 py-5" data-id="${i.id}">
      <div>
        <h4 class="serif text-xl md:text-2xl">${i.name}</h4>
        <p class="text-xs max-w-md" style="color:var(--wood)">${i.desc}</p>
      </div>
      <span class="text-sm">${fmt(i.price)}</span>
    </div>
  `).join('');
  list.querySelectorAll('.card-item').forEach(el=>{
    el.addEventListener('click', ()=> openModal(el.dataset.id));
  });
}

/* ============================================================
   MODAL PRODUCTO
   ============================================================ */
const modal = document.getElementById('product-modal');
let currentProduct = null;
function openModal(id){
  const item = MENU.find(m=>m.id===id);
  currentProduct = item;
  document.getElementById('modal-img').src = item.img;
  document.getElementById('modal-img').alt = item.name;
  document.getElementById('modal-cat').textContent = item.cat;
  document.getElementById('modal-name').textContent = item.name;
  document.getElementById('modal-desc').textContent = item.desc;
  document.getElementById('modal-price').textContent = fmt(item.price);
  modal.classList.remove('hidden');
  requestAnimationFrame(()=>{ modal.classList.remove('opacity-0','invisible'); });
}
function closeModal(){
  modal.classList.add('opacity-0','invisible');
  setTimeout(()=> modal.classList.add('hidden'), 300);
}
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
document.getElementById('modal-add').addEventListener('click', ()=>{
  if(currentProduct){ addToCart(currentProduct.id); closeModal(); openCart(); }
});

/* ============================================================
   CARRITO
   ============================================================ */
function addToCart(id){ cart[id] = (cart[id]||0)+1; renderCart(); }
function changeQty(id, delta){
  cart[id] = (cart[id]||0) + delta;
  if(cart[id] <= 0) delete cart[id];
  renderCart();
}
function renderCart(){
  const wrap = document.getElementById('cart-items');
  const ids = Object.keys(cart);
  const countEl = document.getElementById('cart-count');
  const totalCount = ids.reduce((s,id)=>s+cart[id],0);
  countEl.textContent = totalCount;
  countEl.classList.toggle('hidden', totalCount===0);

  if(ids.length===0){
    wrap.innerHTML = '<p id="cart-empty" class="text-sm text-center py-10" style="color:var(--wood)">Todavía no agregas nada. Vuelve a la carta y elige algo rico.</p>';
  } else {
    wrap.innerHTML = ids.map(id=>{
      const item = MENU.find(m=>m.id===id);
      return `
      <div class="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <p class="text-sm">${item.name}</p>
          <p class="text-xs" style="color:var(--wood)">${fmt(item.price)}</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="w-6 h-6 border border-[var(--line)]" data-act="minus" data-id="${id}">–</button>
          <span class="text-sm w-4 text-center">${cart[id]}</span>
          <button class="w-6 h-6 border border-[var(--line)]" data-act="plus" data-id="${id}">+</button>
        </div>
      </div>`;
    }).join('');
    wrap.querySelectorAll('button[data-act]').forEach(btn=>{
      btn.addEventListener('click', ()=> changeQty(btn.dataset.id, btn.dataset.act==='plus'?1:-1));
    });
  }
  const total = ids.reduce((s,id)=> s + cart[id]*MENU.find(m=>m.id===id).price, 0);
  document.getElementById('cart-total').textContent = fmt(total);
}

const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
function openCart(){
  cartOverlay.classList.remove('hidden');
  requestAnimationFrame(()=>{
    cartOverlay.classList.remove('opacity-0','invisible');
    cartDrawer.classList.remove('translate-x-full');
  });
}
function closeCart(){
  cartDrawer.classList.add('translate-x-full');
  cartOverlay.classList.add('opacity-0','invisible');
  setTimeout(()=> cartOverlay.classList.add('hidden'), 300);
}
document.getElementById('cart-toggle').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

document.getElementById('cart-whatsapp').addEventListener('click', ()=>{
  const ids = Object.keys(cart);
  if(ids.length===0){ return; }
  let msg = 'Hola! Quiero hacer un pedido para retiro en Vientos Café:%0A%0A';
  let total = 0;
  ids.forEach(id=>{
    const item = MENU.find(m=>m.id===id);
    const qty = cart[id];
    total += qty*item.price;
    msg += `• ${qty}x ${item.name} — ${fmt(item.price*qty)}%0A`;
  });
  msg += `%0ATotal: ${fmt(total)}%0AMétodo: Retiro en local (Capellán Florencio Infante 3330, Maipú)`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
});

document.getElementById('wa-visit').addEventListener('click', (e)=>{
  e.preventDefault();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quisiera%20consultar%20por%20Vientos%20Caf%C3%A9.`, '_blank');
});

/* ============================================================
   HORARIO / ABIERTO-CERRADO EN VIVO
   ============================================================ */
function computeStatus(){
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours()*60 + now.getMinutes();
  const ranges = HOURS[day] || [];
  let open = false, nextChange = null;
  ranges.forEach(([from,to])=>{
    const f = from*60, t = to*60;
    if(minutes >= f && minutes < t){ open = true; nextChange = t; }
  });
  return { open, nextChange };
}
function paintStatus(){
  const { open, nextChange } = computeStatus();
  const h = Math.floor(nextChange/60), m = String(Math.round(nextChange%60)).padStart(2,'0');
  const label = open ? `Abierto ahora · cierra ${h}:${m}` : 'Cerrado ahora';
  [['hero-status-dot','hero-status-text'],['visit-status-dot','visit-status-text']].forEach(([dotId,textId])=>{
    const dot = document.getElementById(dotId);
    const text = document.getElementById(textId);
    if(dot && text){
      dot.className = `w-2 h-2 rounded-full ${open ? 'bg-green-400' : 'bg-red-400'}`;
      text.textContent = label;
    }
  });
}

/* ============================================================
   NAVEGACIÓN SPA POR PESTAÑAS
   ============================================================ */
const panels = document.querySelectorAll('.tab-panel');
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
},{ threshold:0.15 });

function goToTab(tabId){
  panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === tabId));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('main-nav').classList.remove('open');
  const activePanel = document.querySelector('.tab-panel.active');
  if(activePanel) activePanel.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));
}

document.querySelectorAll('[data-tab]').forEach(el=>{
  el.addEventListener('click', (e)=>{
    e.preventDefault();
    goToTab(el.dataset.tab);
  });
});

document.getElementById('menu-toggle').addEventListener('click', ()=>{
  document.getElementById('main-nav').classList.toggle('open');
});

document.querySelector('.tab-panel.active').querySelectorAll('.fade-up').forEach(el=> revealObserver.observe(el));

renderFilters();
renderMenu();
renderCart();
paintStatus();
setInterval(paintStatus, 60000);
