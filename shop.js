/**
 * Xchange Marketplace Prototype (`shop.js`)
 * Features:
 * 1. 8 Verified Products with detailed Admin Specifications
 * 2. Real-time Search and Category Filtering
 * 3. Verified Specs Modal with Admin Checklist
 * 4. Interactive Slide-Over Cart Drawer (Add, Qty +/-, Remove, Live Totals)
 * 5. Toast Notifications for "Added to cart!"
 * 6. Mock Escrow Checkout Confirmation Modal with Random Reference ID
 * 7. Automatic SVG Data-URI Fallbacks for zero broken images
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Verified Products Catalog
     ========================================================================== */
  const PRODUCTS = [
    {
      id: 'prod-1',
      title: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
      category: 'Electronics',
      price: 18499,
      formattedPrice: '₱18,499',
      seller: 'Adrian M. (Student ID: #23-4081 • Verified)',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Industry-leading noise canceling with dual processors and 8 microphones for pristine student focus.',
      specs: {
        measurements: 'Weight: 250g | Ear cup depth: 2.4cm | Foldable design',
        materials: 'Synthetic soft-fit leather, recycled ABS plastic chassis',
        serial: 'SN-SNY-9924-A (Verified against official Sony Manufacturer Registry)',
        condition: 'Mint (Grade A+) — 100% cosmetic perfection, zero scratches',
        accessories: 'Original magnetic hard case, 3.5mm gold-plated audio cable, USB-C fast charging cable',
        inspector: 'Inspected & Approved by Xchange Tech Desk #02',
        inspectionDate: 'Nov 14, 2026'
      }
    },
    {
      id: 'prod-2',
      title: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
      category: 'Electronics',
      price: 8750,
      formattedPrice: '₱8,750',
      seller: 'Carlos T. (Verified Student Trader • Engineering)',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Full CNC aluminum 75% QMK/VIA wireless mechanical keyboard with double-gasket acoustic dampening.',
      specs: {
        measurements: '327.5 x 145 x 35.8 mm | Weight: 1,735g (Solid Aluminum)',
        materials: '6063 CNC Machined Aluminum frame, KSA double-shot PBT keycaps',
        serial: 'KC-Q1P-8831 (Validated on Keychron authorized hardware database)',
        condition: 'Grade A+ — Tested keystroke actuation, hot-swap PCB fully certified',
        accessories: 'Braided Type-C to Type-C cable, Type-A adapter, switch/keycap puller, hex screwdriver',
        inspector: 'Inspected & Approved by Xchange Hardware Lab #05',
        inspectionDate: 'Nov 15, 2026'
      }
    },
    {
      id: 'prod-3',
      title: 'Nike Air Zoom Pegasus 40 Running Shoes (Men US 9.5)',
      category: 'Footwear & Apparel',
      price: 5299,
      formattedPrice: '₱5,299',
      seller: 'Bea R. (Varsity Athlete • Verified)',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Responsive daily running shoe with dual Zoom Air units and breathable engineered mesh upper.',
      specs: {
        measurements: 'Size US 9.5 Men / EUR 43 / Insole length 27.5 cm',
        materials: 'Engineered mesh upper, dual Zoom Air cushioning, waffle rubber outsole',
        serial: 'UPC #00196607248102 (Matched with official Nike Retail Authenticity check)',
        condition: 'Brand New In Box (Unworn, factory cardboard inserts & tags intact)',
        accessories: 'Original Nike orange retail box, extra flat laces, moisture packet',
        inspector: 'Inspected & Approved by Xchange Footwear Verifier #01',
        inspectionDate: 'Nov 16, 2026'
      }
    },
    {
      id: 'prod-4',
      title: 'Bellroy Classic Minimalist Water-Resistant Backpack (20L)',
      category: 'Bags & Accessories',
      price: 6400,
      formattedPrice: '₱6,400',
      seller: 'Denise K. (Design Major • ID Verified)',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Everyday campus backpack with dedicated 16-inch laptop pocket and water-resistant YKK zippers.',
      specs: {
        measurements: '450 x 320 x 180 mm | Capacity: 20 Liters | Weight: 750g',
        materials: 'Durable recycled woven poly-fabric, water-resistant Aquaguard zippers',
        serial: 'Bellroy Authenticity Hologram Batch #BL-2023-774 verified',
        condition: 'Grade A+ — No fraying, clean interior, all zipper teeth lubricated',
        accessories: 'Original Bellroy protective cloth sleeve and product booklet',
        inspector: 'Inspected & Approved by Xchange Gear Inspection Desk #03',
        inspectionDate: 'Nov 12, 2026'
      }
    },
    {
      id: 'prod-5',
      title: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
      category: 'Watches & Gear',
      price: 23990,
      formattedPrice: '₱23,990',
      seller: 'John Paul D. (Senior Graduating • Verified)',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'S9 SiP chip, double tap gesture support, Always-On Retina display with 2000 nits brightness.',
      specs: {
        measurements: '45 x 38 x 10.7 mm | Weight: 38.7g',
        materials: '100% recycled aluminum case, Ion-X glass, sapphire back crystal',
        serial: 'SN-W9MD-2024-XCHK (Apple CheckCoverage validated, iCloud clean)',
        condition: 'Grade A+ (100% Battery Health, zero screen micro-scratches)',
        accessories: 'Original Apple magnetic fast charger USB-C, Midnight Sport Band (M/L)',
        inspector: 'Inspected & Approved by Apple Devices Specialist #07',
        inspectionDate: 'Nov 17, 2026'
      }
    },
    {
      id: 'prod-6',
      title: 'Hydro Flask 32 oz Wide Mouth Insulated Tumbler',
      category: 'Bags & Accessories',
      price: 2190,
      formattedPrice: '₱2,190',
      seller: 'Samantha L. (Student Council • Verified)',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'TempShield double-wall vacuum insulation keeps drinks ice cold for 24 hours or steaming hot for 12.',
      specs: {
        measurements: 'Height: 23.9cm | Diameter: 9.1cm | Volume: 946 mL (32 oz)',
        materials: 'Pro-grade 18/8 stainless steel, Color Last powder coat, BPA-Free cap',
        serial: 'Bottom embossed laser batch code #HF-USA-32WM authenticated',
        condition: 'Brand New (Sanitized in UV autoclave, retail paper band still on)',
        accessories: 'Original leakproof Flex Cap and silicone honeycomb gasket',
        inspector: 'Inspected & Approved by Consumer Goods Desk #04',
        inspectionDate: 'Nov 15, 2026'
      }
    },
    {
      id: 'prod-7',
      title: 'Ray-Ban Wayfarer Classic Polarized Sunglasses (RB2140)',
      category: 'Watches & Gear',
      price: 7850,
      formattedPrice: '₱7,850',
      seller: 'Kenneth P. (Verified Campus Seller)',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Iconic original wayfarer silhouette with G-15 green polarized crystal lenses for maximum UV protection.',
      specs: {
        measurements: 'Lens: 50mm | Bridge: 22mm | Temple length: 150mm (Standard Fit)',
        materials: 'Polished black acetate frame, polarized mineral crystal glass',
        serial: 'RB2140 901/58 50-22 laser etched on inner temple + lens watermark',
        condition: 'Grade A+ — Flawless optics, tight barrel hinges, zero wobble',
        accessories: 'Official Ray-Ban textured case, microfiber cleaning cloth, booklet',
        inspector: 'Inspected & Approved by Luxury & Eyewear Inspector #06',
        inspectionDate: 'Nov 13, 2026'
      }
    },
    {
      id: 'prod-8',
      title: 'Anker 737 Power Bank (PowerCore 24K, 140W Two-Way)',
      category: 'Electronics',
      price: 4999,
      formattedPrice: '₱4,999',
      seller: 'Mark S. (IT Student • Verified ID)',
      image: 'https://images.unsplash.com/photo-1609592424846-953e7cba8b29?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Ultra-powerful 24,000mAh capacity with 140W max output and smart color OLED digital status display.',
      specs: {
        measurements: '155.7 x 54.6 x 49.5 mm | Weight: 630g',
        materials: 'Flame-retardant poly-carbonate casing, GaNPrime power architecture',
        serial: 'Anker Security Scratch Verification Code #ANK-737-24K validated',
        condition: 'Grade A+ (Battery health cycle count < 4, zero voltage drops)',
        accessories: '140W 0.6m USB-C to USB-C cable, travel pouch, safety sheet',
        inspector: 'Inspected & Approved by Xchange Battery & Safety Lab #02',
        inspectionDate: 'Nov 16, 2026'
      }
    }
  ];

  /* ==========================================================================
     2. Automatic SVG Data-URI Fallback Helper
     ========================================================================== */
  function getFallbackSvgUrl(category, title) {
    const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').substring(0, 32);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#EFF6FF" />
            <stop offset="100%" stop-color="#DBEAFE" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#grad)" />
        <circle cx="200" cy="120" r="48" fill="#FFFFFF" stroke="#93C5FD" stroke-width="2" />
        <path d="M185 120 L195 130 L215 110" fill="none" stroke="#2563EB" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="200" y="200" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1E40AF" text-anchor="middle">VERIFIED PRODUCT</text>
        <text x="200" y="222" font-family="sans-serif" font-size="12" fill="#64748B" text-anchor="middle">${safeTitle}...</text>
        <rect x="130" y="240" width="140" height="22" rx="11" fill="#DCFCE7" />
        <text x="200" y="255" font-family="sans-serif" font-size="10" font-weight="bold" fill="#15803D" text-anchor="middle">ADMIN CHECKED</text>
      </svg>
    `.trim();
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  // Attach fallback to window so inline onerror handlers can access it
  window.getFallbackSvgUrl = getFallbackSvgUrl;

  /* ==========================================================================
     3. State Management (Cart & Filters)
     ========================================================================== */
  let cart = [];
  try {
    const savedCart = localStorage.getItem('xchange_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (err) {
    cart = [];
  }

  let activeCategory = 'all';
  let searchTerm = '';

  // --- DOM Elements ---
  const productsGrid = document.getElementById('products-grid');
  const emptyResultsState = document.getElementById('empty-results');
  const resultsCountText = document.getElementById('results-count-text');
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const categoryPills = document.querySelectorAll('.category-pill');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');

  // Cart Drawer Elements
  const cartBtn = document.getElementById('cart-btn');
  const cartCountBadge = document.getElementById('cart-count-badge');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyView = document.getElementById('cart-empty-view');
  const cartDrawerFooter = document.getElementById('cart-drawer-footer');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');
  const cartDrawerItemsCount = document.getElementById('cart-drawer-items-count');
  const checkoutBtn = document.getElementById('checkout-btn');
  const cartShopNowBtn = document.getElementById('cart-shop-now-btn');

  // Specs Modal Elements
  const specsModal = document.getElementById('specs-modal');
  const specsCloseBtn = document.getElementById('specs-close-btn');
  const specsModalContent = document.getElementById('specs-modal-content');

  // Checkout Modal Elements
  const checkoutModal = document.getElementById('checkout-modal');
  const continueShoppingBtn = document.getElementById('continue-shopping-btn');
  const orderRefIdEl = document.getElementById('order-ref-id');
  const orderTotalAmountEl = document.getElementById('order-total-amount');

  // Toast Container
  const toastContainer = document.getElementById('toast-container');

  /* ==========================================================================
     4. Render Products Grid
     ========================================================================== */
  function renderProducts() {
    const filtered = PRODUCTS.filter(prod => {
      // Category match
      const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;

      // Search match
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch = !query ||
        prod.title.toLowerCase().includes(query) ||
        prod.category.toLowerCase().includes(query) ||
        prod.seller.toLowerCase().includes(query) ||
        prod.shortDesc.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    // Update results text
    if (resultsCountText) {
      if (searchTerm) {
        resultsCountText.textContent = `Showing ${filtered.length} verified item${filtered.length === 1 ? '' : 's'} matching "${searchTerm}"`;
      } else if (activeCategory !== 'all') {
        resultsCountText.textContent = `Showing ${filtered.length} verified item${filtered.length === 1 ? '' : 's'} in ${activeCategory}`;
      } else {
        resultsCountText.textContent = `Showing all ${filtered.length} verified products`;
      }
    }

    // Handle empty state
    if (filtered.length === 0) {
      productsGrid.innerHTML = '';
      emptyResultsState.style.display = 'block';
      return;
    }

    emptyResultsState.style.display = 'none';

    // Build Cards HTML
    productsGrid.innerHTML = filtered.map(prod => `
      <article class="product-card" data-id="${prod.id}">
        <!-- Image Box -->
        <div class="product-image-box">
          <span class="product-category-badge">${prod.category}</span>
          <img 
            src="${prod.image}" 
            alt="${prod.title}" 
            class="product-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src=getFallbackSvgUrl('${prod.category}', '${prod.title.replace(/'/g, "\\'")}');"
          >
        </div>

        <!-- Card Body -->
        <div class="product-card-body">
          <div class="product-seller-info">
            <span class="seller-verified-dot"></span>
            <span>${prod.seller}</span>
          </div>

          <h3 class="product-title" title="${prod.title}">${prod.title}</h3>

          <!-- Prominent Trust Badges -->
          <div class="product-trust-badges">
            <div class="trust-badge-row badge-specs-checked">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <polyline points="9 15 11 17 15 13"></polyline>
              </svg>
              <span>✓ Specs Checked by Admin</span>
            </div>
            <div class="trust-badge-row badge-authentic">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>✓ Authentic Verified</span>
            </div>
          </div>

          <!-- View Verified Specs Link -->
          <button type="button" class="btn-view-specs" data-id="${prod.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>View Verified Specs</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <!-- Card Footer (Price & Add to Cart) -->
          <div class="product-card-footer">
            <div class="product-price-box">
              <span class="price-currency-label">Price</span>
              <span class="product-price">${prod.formattedPrice}</span>
            </div>
            <button type="button" class="btn-add-to-cart" data-id="${prod.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach event listeners to new buttons
    productsGrid.querySelectorAll('.btn-add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        addToCart(id);
      });
    });

    productsGrid.querySelectorAll('.btn-view-specs').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openSpecsModal(id);
      });
    });
  }

  /* ==========================================================================
     5. Real-Time Search & Category Filter Logic
     ========================================================================== */
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchTerm.length > 0 ? 'flex' : 'none';
      }
      renderProducts();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchTerm = '';
        searchClearBtn.style.display = 'none';
        searchInput.focus();
        renderProducts();
      }
    });
  }

  // Category Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      activeCategory = pill.getAttribute('data-category');
      renderProducts();
    });
  });

  // Reset Filters Button
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchTerm = '';
      if (searchInput) {
        searchInput.value = '';
        if (searchClearBtn) searchClearBtn.style.display = 'none';
      }
      categoryPills.forEach(p => {
        if (p.getAttribute('data-category') === 'all') {
          p.classList.add('active');
          p.setAttribute('aria-selected', 'true');
        } else {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        }
      });
      renderProducts();
    });
  }

  /* ==========================================================================
     6. Cart Functionality (Add, Update, Remove, Persist)
     ========================================================================== */
  function saveCart() {
    try {
      localStorage.setItem('xchange_cart', JSON.stringify(cart));
    } catch (e) {
      // ignore in sandbox if restricted
    }
  }

  function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        formattedPrice: product.formattedPrice,
        category: product.category,
        image: product.image,
        quantity: 1
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Added to cart!`, product.title);

    // Bump cart badge animation
    if (cartCountBadge) {
      cartCountBadge.classList.add('bump');
      setTimeout(() => cartCountBadge.classList.remove('bump'), 300);
    }
  }

  function updateItemQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    saveCart();
    updateCartUI();
  }

  function removeItemFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
  }

  function updateCartUI() {
    // Calculate total count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) {
      cartCountBadge.textContent = totalCount;
    }

    if (cartDrawerItemsCount) {
      cartDrawerItemsCount.textContent = `(${totalCount} item${totalCount === 1 ? '' : 's'})`;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const formattedSubtotal = '₱' + subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (cartSubtotalEl) cartSubtotalEl.textContent = formattedSubtotal;
    if (cartTotalEl) cartTotalEl.textContent = formattedSubtotal;

    // Toggle Empty State vs Items
    if (cart.length === 0) {
      if (cartItemsContainer) cartItemsContainer.style.display = 'none';
      if (cartEmptyView) cartEmptyView.style.display = 'flex';
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      if (cartEmptyView) cartEmptyView.style.display = 'none';
      if (cartItemsContainer) {
        cartItemsContainer.style.display = 'flex';
        cartItemsContainer.innerHTML = cart.map(item => `
          <div class="cart-item-row" data-id="${item.id}">
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              class="cart-item-thumb"
              onerror="this.onerror=null; this.src=getFallbackSvgUrl('${item.category}', '${item.title.replace(/'/g, "\\'")}');"
            >
            <div class="cart-item-details">
              <h4 class="cart-item-name" title="${item.title}">${item.title}</h4>
              <div class="cart-item-price">${item.formattedPrice}</div>
              <div class="cart-item-controls">
                <div class="qty-control-box">
                  <button type="button" class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                  <span class="qty-display">${item.quantity}</span>
                  <button type="button" class="qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>
                <button type="button" class="cart-item-remove-btn" data-id="${item.id}" aria-label="Remove item" title="Remove item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `).join('');

        // Bind control buttons
        cartItemsContainer.querySelectorAll('.btn-qty-minus').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            updateItemQuantity(id, -1);
          });
        });

        cartItemsContainer.querySelectorAll('.btn-qty-plus').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            updateItemQuantity(id, 1);
          });
        });

        cartItemsContainer.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            removeItemFromCart(id);
          });
        });
      }

      if (checkoutBtn) checkoutBtn.disabled = false;
    }
  }

  /* ==========================================================================
     7. Cart Drawer Slide-Over Controls
     ========================================================================== */
  function openCartDrawer() {
    updateCartUI();
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartBackdrop) cartBackdrop.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeCartDrawer() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartBackdrop) cartBackdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);
  if (cartShopNowBtn) cartShopNowBtn.addEventListener('click', closeCartDrawer);

  /* ==========================================================================
     8. Verified Specs Modal
     ========================================================================== */
  function openSpecsModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    specsModalContent.innerHTML = `
      <!-- Header -->
      <div class="specs-header-section">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          class="specs-modal-thumb"
          onerror="this.onerror=null; this.src=getFallbackSvgUrl('${product.category}', '${product.title.replace(/'/g, "\\'")}');"
        >
        <div class="specs-header-text">
          <span class="specs-category-tag">${product.category}</span>
          <h3 class="specs-modal-title" id="specs-modal-title">${product.title}</h3>
          <p class="specs-modal-seller">${product.seller}</p>
        </div>
      </div>

      <!-- Trust Notice -->
      <div class="specs-guarantee-box">
        <div class="specs-guarantee-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <polyline points="9 12 11 14 15 10"></polyline>
          </svg>
        </div>
        <div class="specs-guarantee-text">
          <strong>Official Admin Verification Report</strong>
          <span>Measurements, condition, and serial numbers cross-checked before this listing was approved.</span>
        </div>
      </div>

      <!-- Specs Table -->
      <div class="specs-table-wrap">
        <table class="specs-table">
          <tbody>
            <tr>
              <th>Verified Condition</th>
              <td><span class="specs-status-verified">✓ ${product.specs.condition}</span></td>
            </tr>
            <tr>
              <th>Serial Number & Database</th>
              <td><code>${product.specs.serial}</code></td>
            </tr>
            <tr>
              <th>Physical Measurements</th>
              <td>${product.specs.measurements}</td>
            </tr>
            <tr>
              <th>Build & Materials</th>
              <td>${product.specs.materials}</td>
            </tr>
            <tr>
              <th>Included In Box</th>
              <td>${product.specs.accessories}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Inspection Stamp -->
      <div class="specs-admin-stamp">
        <div class="stamp-inspector-info">
          <div class="stamp-seal">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div class="stamp-text">
            <strong>${product.specs.inspector}</strong>
            <span>Inspection Date: ${product.specs.inspectionDate} • Zero Discrepancies</span>
          </div>
        </div>
        <span class="stamp-date">PASS • AUTHENTIC</span>
      </div>

      <!-- Footer CTA -->
      <div class="specs-modal-footer">
        <div>
          <span class="price-currency-label">Protected Price</span>
          <div class="specs-footer-price">${product.formattedPrice}</div>
        </div>
        <button type="button" class="btn btn-primary btn-lg" id="modal-add-to-cart-btn" data-id="${product.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Add to Cart with Escrow Protection</span>
        </button>
      </div>
    `;

    // Bind Add to Cart inside modal
    const modalAddBtn = specsModalContent.querySelector('#modal-add-to-cart-btn');
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', () => {
        addToCart(product.id);
        closeSpecsModal();
      });
    }

    specsModal.classList.add('active');
    specsModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeSpecsModal() {
    specsModal.classList.remove('active');
    specsModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (specsCloseBtn) specsCloseBtn.addEventListener('click', closeSpecsModal);
  if (specsModal) {
    specsModal.addEventListener('click', (e) => {
      if (e.target === specsModal) closeSpecsModal();
    });
  }

  /* ==========================================================================
     9. Mock Checkout Confirmation
     ========================================================================== */
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;

      // Calculate total paid before clearing
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const formattedTotal = '₱' + totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      // Generate random order reference (e.g., #XCH-74920)
      const randomRef = '#XCH-' + Math.floor(10000 + Math.random() * 90000);

      // Populate confirmation modal
      if (orderRefIdEl) orderRefIdEl.textContent = randomRef;
      if (orderTotalAmountEl) orderTotalAmountEl.textContent = formattedTotal;

      // Close cart drawer
      closeCartDrawer();

      // Reset cart
      cart = [];
      saveCart();
      updateCartUI();

      // Open checkout modal
      if (checkoutModal) {
        checkoutModal.classList.add('active');
        checkoutModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      }
    });
  }

  function closeCheckoutModal() {
    if (checkoutModal) {
      checkoutModal.classList.remove('active');
      checkoutModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  }

  if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeCheckoutModal);
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  /* ==========================================================================
     10. Toast Notifications
     ========================================================================== */
  function showToast(title, subtitle) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-subtitle">${subtitle}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 3.2 seconds
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  }

  // Keyboard accessibility: ESC closes active modal / drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (specsModal && specsModal.classList.contains('active')) {
        closeSpecsModal();
      } else if (cartDrawer && cartDrawer.classList.contains('active')) {
        closeCartDrawer();
      } else if (checkoutModal && checkoutModal.classList.contains('active')) {
        closeCheckoutModal();
      }
    }
  });

  // Sticky navbar shadow on scroll
  const shopNavbar = document.getElementById('shop-navbar');
  window.addEventListener('scroll', () => {
    if (shopNavbar) {
      if (window.scrollY > 15) {
        shopNavbar.classList.add('scrolled');
      } else {
        shopNavbar.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // Initial Render
  renderProducts();
  updateCartUI();
});

