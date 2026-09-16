/**
 * SPA Esfiha - Main Application Script
 * Vanilla JS implementation fulfilling all requirements from specs/SPA-Esfiha.md
 */

(function () {
  'use strict';

  // State Management
  let menuData = { meta: {}, produtos: [] };
  let cart = []; // Array of { product, quantity }
  let currentCategory = 'todas';
  let searchQuery = '';
  let userRegistration = {
    nome: '',
    whatsapp: '',
    email: '',
    endereco: '',
    location: null
  };
  let currentOrderId = '';

  // DOM Elements
  const views = {
    menu: document.getElementById('view-menu'),
    cart: document.getElementById('view-cart'),
    security: document.getElementById('view-security'),
    payment: document.getElementById('view-payment'),
    success: document.getElementById('view-success')
  };

  const navBtns = document.querySelectorAll('.nav-btn');
  const productsContainer = document.getElementById('products-container');
  const searchInput = document.getElementById('menu-search-input');
  const categoryChips = document.querySelectorAll('.category-chip');
  const emptySearchState = document.getElementById('empty-search-state');
  const resetSearchBtn = document.getElementById('reset-search-btn');

  // Header & Floating Cart Elements
  const headerCartBadge = document.getElementById('header-cart-badge');
  const navCartBadge = document.getElementById('nav-cart-badge');
  const floatingCartBar = document.getElementById('floating-cart-bar');
  const floatingCartBadge = document.getElementById('floating-cart-badge');
  const floatingCartItemsCount = document.getElementById('floating-cart-items-count');
  const floatingCartTotal = document.getElementById('floating-cart-total');

  // Featured Banner Elements
  const featuredTitle = document.getElementById('featured-title');
  const featuredDesc = document.getElementById('featured-desc');
  const featuredPrice = document.getElementById('featured-price');
  const featuredOldPrice = document.getElementById('featured-old-price');
  const featuredImg = document.getElementById('featured-img');
  const featuredAddBtn = document.getElementById('featured-add-btn');

  // Cart View Elements
  const emptyCartContainer = document.getElementById('empty-cart-container');
  const cartContentContainer = document.getElementById('cart-content-container');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalText = document.getElementById('cart-subtotal-text');
  const cartTotalText = document.getElementById('cart-total-text');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const registrationForm = document.getElementById('checkout-registration-form');

  // Geolocation Elements
  const getLocationBtn = document.getElementById('get-location-btn');
  const locationStatus = document.getElementById('location-status');

  // Security Verification Elements
  const securitySupportText = document.getElementById('security-support-text');
  const verifyCredentialsBtn = document.getElementById('verify-credentials-btn');
  const skipCredentialsBtn = document.getElementById('skip-credentials-btn');

  // Payment Gateway Elements
  const paymentAmountText = document.getElementById('payment-amount-text');
  const simulateApproveBtn = document.getElementById('simulate-approve-btn');
  const simulateRefuseBtn = document.getElementById('simulate-refuse-btn');

  // Order Success Elements
  const successOrderId = document.getElementById('success-order-id');
  const successCustomerName = document.getElementById('success-customer-name');
  const successOrderTotal = document.getElementById('success-order-total');
  const whatsappSendLink = document.getElementById('whatsapp-send-link');

  // Toast Notification
  const toastEl = document.getElementById('toast-notify');
  const toastMsgEl = document.getElementById('toast-message');

  // Helper Functions
  function formatCurrency(value) {
    return 'R$ ' + value.toFixed(2).replace('.', ',');
  }

  function showToast(message) {
    if (!toastEl || !toastMsgEl) return;
    toastMsgEl.textContent = message;
    toastEl.classList.remove('opacity-0', '-translate-y-2');
    toastEl.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toastEl.classList.remove('opacity-100', 'translate-y-0');
      toastEl.classList.add('opacity-0', '-translate-y-2');
    }, 2000);
  }

  function switchView(targetViewId) {
    Object.keys(views).forEach(key => {
      const view = views[key];
      if (view.id === targetViewId) {
        view.classList.remove('hidden-view');
        view.classList.add('active-view');
      } else {
        view.classList.remove('active-view');
        view.classList.add('hidden-view');
      }
    });

    // Update bottom nav state
    navBtns.forEach(btn => {
      const btnView = btn.getAttribute('data-view');
      if (btnView === targetViewId) {
        btn.classList.add('text-brand-primary', 'font-bold');
        btn.classList.remove('text-brand-secondary');
      } else {
        btn.classList.remove('text-brand-primary', 'font-bold');
        btn.classList.add('text-brand-secondary');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // LocalStorage Persistence
  function saveCartToStorage() {
    try {
      localStorage.setItem('spa_esfiha_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Erro ao salvar carrinho no localStorage:', e);
    }
  }

  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('spa_esfiha_cart');
      if (saved) {
        cart = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Erro ao carregar carrinho do localStorage:', e);
      cart = [];
    }
  }

  function saveUserToStorage() {
    try {
      localStorage.setItem('spa_esfiha_user', JSON.stringify(userRegistration));
    } catch (e) {
      console.error('Erro ao salvar dados do usuario no localStorage:', e);
    }
  }

  function loadUserFromStorage() {
    try {
      const saved = localStorage.getItem('spa_esfiha_user');
      if (saved) {
        userRegistration = JSON.parse(saved);
        if (userRegistration.nome) document.getElementById('user-name').value = userRegistration.nome;
        if (userRegistration.whatsapp) document.getElementById('user-whatsapp').value = userRegistration.whatsapp;
        if (userRegistration.email) document.getElementById('user-email').value = userRegistration.email;
        if (userRegistration.endereco) document.getElementById('user-address').value = userRegistration.endereco;
        if (userRegistration.location && locationStatus) {
          locationStatus.textContent = `GPS Capturado: Lat ${userRegistration.location.latitude.toFixed(4)}, Long ${userRegistration.location.longitude.toFixed(4)}`;
          locationStatus.classList.add('text-emerald-700', 'font-semibold');
        }
      }
    } catch (e) {
      console.error('Erro ao carregar dados do usuario do localStorage:', e);
    }
  }

  // Cart Business Logic
  function addToCart(productId) {
    const product = menuData.produtos.find(p => p.id === productId);
    if (!product || !product.disponivel) return;

    const existingIndex = cart.findIndex(item => item.product.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    saveCartToStorage();
    updateCartUI();
    showToast(`${product.nome} adicionada!`);
  }

  function updateItemQuantity(productId, delta) {
    const index = cart.findIndex(item => item.product.id === productId);
    if (index === -1) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    saveCartToStorage();
    updateCartUI();
  }

  function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartUI();
    showToast('Carrinho limpo');
  }

  function calculateCartTotal() {
    return cart.reduce((total, item) => {
      const price = item.product.promocao && item.product.precoPromocional ? item.product.precoPromocional : item.product.preco;
      return total + (price * item.quantity);
    }, 0);
  }

  function calculateCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  function updateCartUI() {
    const count = calculateCartCount();
    const total = calculateCartTotal();
    const formattedTotal = formatCurrency(total);

    // Header Badge
    if (count > 0) {
      headerCartBadge.textContent = count;
      headerCartBadge.classList.remove('hidden');
      headerCartBadge.classList.add('flex');

      navCartBadge.textContent = count;
      navCartBadge.classList.remove('hidden');
      navCartBadge.classList.add('flex');

      floatingCartBar.classList.remove('hidden');
      floatingCartBadge.textContent = count;
      floatingCartItemsCount.textContent = count === 1 ? '1 item' : `${count} itens`;
      floatingCartTotal.textContent = formattedTotal;
    } else {
      headerCartBadge.classList.add('hidden');
      headerCartBadge.classList.remove('flex');

      navCartBadge.classList.add('hidden');
      navCartBadge.classList.remove('flex');

      floatingCartBar.classList.add('hidden');
    }

    // Cart View Render
    if (count === 0) {
      emptyCartContainer.classList.remove('hidden');
      emptyCartContainer.classList.add('flex');
      cartContentContainer.classList.add('hidden');
      cartContentContainer.classList.remove('flex');
    } else {
      emptyCartContainer.classList.add('hidden');
      emptyCartContainer.classList.remove('flex');
      cartContentContainer.classList.remove('hidden');
      cartContentContainer.classList.add('flex');

      renderCartItemList();
      cartSubtotalText.textContent = formattedTotal;
      cartTotalText.textContent = formattedTotal;
    }
  }

  function renderCartItemList() {
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
      const p = item.product;
      const unitPrice = p.promocao && p.precoPromocional ? p.precoPromocional : p.preco;
      const itemTotal = unitPrice * item.quantity;

      const itemEl = document.createElement('div');
      itemEl.className = 'flex items-center justify-between bg-white border border-brand-secondary/15 p-3 rounded-xl shadow-xs';
      itemEl.innerHTML = `
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
            <img src="${p.imagem}" alt="${p.nome}" class="w-full h-full object-cover"/>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="font-heading font-bold text-xs text-brand-dark truncate">${p.nome}</span>
            <span class="text-[11px] text-brand-secondary">${formatCurrency(unitPrice)} un.</span>
            <span class="font-heading font-bold text-xs text-brand-secondary mt-0.5">${formatCurrency(itemTotal)}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 bg-brand-cream/80 border border-brand-secondary/15 px-2 py-1 rounded-lg shrink-0">
          <button class="cart-btn-minus w-6 h-6 rounded-full bg-white text-brand-dark flex items-center justify-center font-bold text-xs active:scale-95 transition-transform" data-id="${p.id}">-</button>
          <span class="font-heading font-bold text-xs text-brand-dark px-1">${item.quantity}</span>
          <button class="cart-btn-plus w-6 h-6 rounded-full bg-brand-primary text-brand-dark flex items-center justify-center font-bold text-xs active:scale-95 transition-transform" data-id="${p.id}">+</button>
        </div>
      `;
      cartItemsList.appendChild(itemEl);
    });

    // Attach listeners to quantity controls
    document.querySelectorAll('.cart-btn-minus').forEach(btn => {
      btn.addEventListener('click', () => updateItemQuantity(btn.getAttribute('data-id'), -1));
    });

    document.querySelectorAll('.cart-btn-plus').forEach(btn => {
      btn.addEventListener('click', () => updateItemQuantity(btn.getAttribute('data-id'), 1));
    });
  }

  // Data Loading & Product Display
  async function loadMenuData() {
    try {
      const response = await fetch('data/menu.json');
      if (!response.ok) throw new Error('Falha ao carregar data/menu.json');
      menuData = await response.json();

      if (menuData.meta && menuData.meta.estabelecimento) {
        document.getElementById('store-name').textContent = menuData.meta.estabelecimento;
      }

      renderFeaturedItem();
      renderProductsList();
    } catch (e) {
      console.error('Erro no carregamento do cardápio:', e);
      productsContainer.innerHTML = '<p class="text-xs text-red-600">Erro ao carregar o cardápio. Tente recarregar a página.</p>';
    }
  }

  function renderFeaturedItem() {
    const promoItem = menuData.produtos.find(p => p.promocao && p.disponivel) || menuData.produtos[0];
    if (!promoItem) return;

    featuredTitle.textContent = promoItem.nome;
    featuredDesc.textContent = promoItem.descricao;
    const finalPrice = promoItem.promocao && promoItem.precoPromocional ? promoItem.precoPromocional : promoItem.preco;
    featuredPrice.textContent = formatCurrency(finalPrice);

    if (promoItem.promocao && promoItem.precoPromocional) {
      featuredOldPrice.textContent = formatCurrency(promoItem.preco);
      featuredOldPrice.classList.remove('hidden');
    } else {
      featuredOldPrice.classList.add('hidden');
    }

    featuredImg.src = promoItem.imagem;
    featuredImg.alt = promoItem.nome;
    featuredAddBtn.onclick = () => addToCart(promoItem.id);
  }

  function renderProductsList() {
    productsContainer.innerHTML = '';

    const filtered = menuData.produtos.filter(p => {
      const matchesCategory =
        currentCategory === 'todas' ||
        (currentCategory === 'promocoes' && p.promocao) ||
        p.categoria === currentCategory ||
        p.tipoSabor === currentCategory;

      const matchesSearch =
        !searchQuery ||
        p.nome.toLowerCase().includes(searchQuery) ||
        p.descricao.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    });

    document.getElementById('menu-items-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'itens'}`;

    if (filtered.length === 0) {
      emptySearchState.classList.remove('hidden');
      emptySearchState.classList.add('flex');
    } else {
      emptySearchState.classList.add('hidden');
      emptySearchState.classList.remove('flex');
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = `product-card bg-white border border-brand-secondary/15 p-3 rounded-2xl shadow-xs flex items-center gap-3 transition-transform ${!p.disponivel ? 'opacity-60' : ''}`;

      const price = p.promocao && p.precoPromocional ? p.precoPromocional : p.preco;

      let tagHtml = '';
      if (p.tags && p.tags.includes('best-seller')) {
        tagHtml += `<span class="bg-brand-primary/20 text-brand-dark text-[9px] font-heading font-bold px-1.5 py-0.5 rounded">Best-seller</span>`;
      }
      if (p.promocao) {
        tagHtml += `<span class="bg-red-100 text-red-700 text-[9px] font-heading font-bold px-1.5 py-0.5 rounded uppercase">PROMOÇÃO</span>`;
      }
      if (p.tags && p.tags.includes('vegetariana')) {
        tagHtml += `<span class="bg-emerald-100 text-emerald-800 text-[9px] font-heading font-bold px-1.5 py-0.5 rounded">Vegetariana</span>`;
      }

      card.innerHTML = `
        <div class="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-brand-cream/50">
          <img src="${p.imagem}" alt="${p.nome}" class="w-full h-full object-cover"/>
          ${!p.disponivel ? `
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
              <span class="material-symbols-outlined text-[20px]">block</span>
            </div>
          ` : ''}
        </div>
        <div class="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <h4 class="font-heading font-bold text-xs text-brand-dark leading-tight truncate">${p.nome}</h4>
              ${tagHtml}
            </div>
            <p class="text-[11px] text-brand-secondary line-clamp-1 mt-0.5">${p.descricao}</p>
          </div>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-baseline gap-1">
              <span class="font-heading font-bold text-xs text-brand-dark">${formatCurrency(price)}</span>
              ${p.promocao && p.precoPromocional ? `<span class="text-[10px] text-gray-400 line-through">${formatCurrency(p.preco)}</span>` : ''}
            </div>
            ${p.disponivel ? `
              <button class="add-to-cart-btn h-7 px-2.5 bg-brand-primary text-brand-dark font-heading font-bold text-[11px] rounded-lg flex items-center gap-1 shadow-xs active:scale-95 transition-transform" data-id="${p.id}">
                <span class="material-symbols-outlined text-[14px]">add</span>
                <span>Adicionar</span>
              </button>
            ` : `
              <span class="text-[10px] font-semibold text-gray-400">Esgotado</span>
            `}
          </div>
        </div>
      `;

      productsContainer.appendChild(card);
    });

    // Attach click events
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(btn.getAttribute('data-id'));
      });
    });
  }

  // Geolocation Handler
  function handleGeolocation() {
    if (!navigator.geolocation) {
      locationStatus.textContent = 'Geolocalização não é suportada pelo seu navegador.';
      locationStatus.className = 'text-[11px] text-red-600 italic';
      return;
    }

    locationStatus.textContent = 'Obtendo localização via GPS...';
    locationStatus.className = 'text-[11px] text-brand-secondary italic animate-pulse';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userRegistration.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        saveUserToStorage();
        locationStatus.textContent = `GPS Capturado com Sucesso! (Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)})`;
        locationStatus.className = 'text-[11px] text-emerald-700 font-semibold';
        showToast('Localização capturada!');
      },
      (error) => {
        console.warn('Erro ao obter geolocalização:', error.message);
        locationStatus.textContent = 'Localização não autorizada. O pedido continuará normalmente com o endereço digitado.';
        locationStatus.className = 'text-[11px] font-medium text-brand-secondary';
        userRegistration.location = null;
        saveUserToStorage();
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }

  // Security Verification (CredentialsContainer / WebAuthn)
  async function checkSecuritySupport() {
    try {
      if (window.PublicKeyCredential && typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (available) {
          securitySupportText.textContent = 'Suporte a biometria/autenticador de plataforma detectado e pronto para uso.';
          securitySupportText.className = 'text-xs text-emerald-800 font-medium';
        } else {
          securitySupportText.textContent = 'Autenticador biométrico de plataforma não disponível neste dispositivo. A verificação pode ser pulada com segurança.';
          securitySupportText.className = 'text-xs text-brand-secondary';
        }
      } else {
        securitySupportText.textContent = 'Navegador sem suporte a PublicKeyCredential. A validação pode ser avançada normalmente.';
        securitySupportText.className = 'text-xs text-brand-secondary';
      }
    } catch (e) {
      console.warn('Erro ao checar suporte de credenciais:', e);
      securitySupportText.textContent = 'Verificação de credenciais pronta para simulação.';
    }
  }

  async function triggerCredentialsCheck() {
    try {
      // Simulação da chamada de credencial / Prova de vida
      showToast('Solicitando credencial do dispositivo...');
      if (window.PublicKeyCredential && typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (available) {
          showToast('Credencial validada com sucesso!');
        } else {
          showToast('Credencial aceita em modo de compatibilidade');
        }
      }
    } catch (e) {
      console.warn('Interrupção na validação de credencial:', e);
      showToast('Aviso: Validação continuada sem bloqueio.');
    } finally {
      proceedToPaymentView();
    }
  }

  function proceedToPaymentView() {
    const total = calculateCartTotal();
    paymentAmountText.textContent = formatCurrency(total);
    switchView('view-payment');
  }

  // Payment Gateway Simulation
  function handlePaymentApproval() {
    // Generates Order ID
    currentOrderId = 'ESF-' + Math.floor(100000 + Math.random() * 900000);

    successOrderId.textContent = `#${currentOrderId}`;
    successCustomerName.textContent = userRegistration.nome || 'Cliente';
    const total = calculateCartTotal();
    successOrderTotal.textContent = formatCurrency(total);

    // Build WhatsApp URL
    const storeWhatsapp = menuData.meta && menuData.meta.whatsapp ? menuData.meta.whatsapp : '+5511999999999';
    const cleanNumber = storeWhatsapp.replace(/\D/g, '');

    let itemsText = cart.map(item => {
      const p = item.product;
      const unitPrice = p.promocao && p.precoPromocional ? p.precoPromocional : p.preco;
      return `• ${item.quantity}x ${p.nome} (${formatCurrency(unitPrice * item.quantity)})`;
    }).join('\n');

    let locationInfo = userRegistration.location
      ? `\n📍 GPS: https://maps.google.com/?q=${userRegistration.location.latitude},${userRegistration.location.longitude}`
      : '';

    let message = `*NOVO PEDIDO DE ESFIHA - #${currentOrderId}*\n\n` +
      `*Cliente:* ${userRegistration.nome}\n` +
      `*WhatsApp:* ${userRegistration.whatsapp}\n` +
      `*Endereço:* ${userRegistration.endereco}${locationInfo}\n\n` +
      `*ITENS DO PEDIDO:*\n${itemsText}\n\n` +
      `*TOTAL PAGO:* ${formatCurrency(total)}\n` +
      `*Status Pagamento:* Aprovado (Simulação)`;

    const encodedMessage = encodeURIComponent(message);
    whatsappSendLink.href = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    // Clear cart on successful payment
    cart = [];
    saveCartToStorage();
    updateCartUI();

    switchView('view-success');
    showToast('Pagamento aprovado!');
  }

  function handlePaymentRefusal() {
    // On payment refusal: Return to cart preserving state in localStorage without data loss (Req 7)
    switchView('view-cart');
    showToast('Pagamento Recusado. Seus itens e dados continuam salvos!');
  }

  // Event Listeners Initialization
  function initEventListeners() {
    // Navigation switching
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-view');
        switchView(target);
      });
    });

    document.querySelectorAll('.back-to-menu-btn').forEach(btn => {
      btn.addEventListener('click', () => switchView('view-menu'));
    });

    document.getElementById('header-cart-btn').addEventListener('click', () => switchView('view-cart'));
    document.getElementById('open-cart-btn').addEventListener('click', () => switchView('view-cart'));
    document.getElementById('brand-logo-btn').addEventListener('click', () => switchView('view-menu'));

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProductsList();
      });
    }

    if (resetSearchBtn) {
      resetSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        currentCategory = 'todas';
        categoryChips.forEach(c => {
          if (c.getAttribute('data-category') === 'todas') {
            c.classList.add('active', 'bg-brand-primary', 'text-brand-dark');
            c.classList.remove('bg-gray-100', 'text-brand-secondary');
          } else {
            c.classList.remove('active', 'bg-brand-primary', 'text-brand-dark');
            c.classList.add('bg-gray-100', 'text-brand-secondary');
          }
        });
        renderProductsList();
      });
    }

    // Category chips
    categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        categoryChips.forEach(c => {
          c.classList.remove('active', 'bg-brand-primary', 'text-brand-dark');
          c.classList.add('bg-gray-100', 'text-brand-secondary');
        });

        chip.classList.add('active', 'bg-brand-primary', 'text-brand-dark');
        chip.classList.remove('bg-gray-100', 'text-brand-secondary');

        currentCategory = chip.getAttribute('data-category') || 'todas';
        renderProductsList();
      });
    });

    // Cart actions
    clearCartBtn.addEventListener('click', clearCart);

    // Geolocation trigger
    getLocationBtn.addEventListener('click', handleGeolocation);

    // Registration form submission -> Switch to Security Check View
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (cart.length === 0) {
        showToast('Adicione ao menos 1 item ao carrinho.');
        return;
      }

      userRegistration.nome = document.getElementById('user-name').value.trim();
      userRegistration.whatsapp = document.getElementById('user-whatsapp').value.trim();
      userRegistration.email = document.getElementById('user-email').value.trim();
      userRegistration.endereco = document.getElementById('user-address').value.trim();

      saveUserToStorage();
      checkSecuritySupport();
      switchView('view-security');
    });

    // Security Verification Actions
    document.getElementById('back-to-cart-btn').addEventListener('click', () => switchView('view-cart'));
    verifyCredentialsBtn.addEventListener('click', triggerCredentialsCheck);
    skipCredentialsBtn.addEventListener('click', () => {
      showToast('Aviso: Validação biométrica pulada.');
      proceedToPaymentView();
    });

    // Payment Gateway Simulation Actions
    simulateApproveBtn.addEventListener('click', handlePaymentApproval);
    simulateRefuseBtn.addEventListener('click', handlePaymentRefusal);
  }

  // Application Entry Point
  document.addEventListener('DOMContentLoaded', async () => {
    loadCartFromStorage();
    loadUserFromStorage();
    initEventListeners();
    await loadMenuData();
    updateCartUI();
  });

})();
