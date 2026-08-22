import fs from 'fs';

const cols = [
  'Area',
  'Name',
  'Objective',
  'Priority',
  'Labels',
  'Owner',
  'Preconditions',
  'Test Steps',
  'Expected Result',
  'Automation status',
];

/** @type {Array<Record<string, string>>} */
const rows = [];

function add(area, name, objective, priority, labels, preconditions, steps, expected, status) {
  rows.push({
    Area: area,
    Name: name,
    Objective: objective,
    Priority: priority,
    Labels: labels,
    Owner: 'QA',
    Preconditions: preconditions,
    'Test Steps': steps,
    'Expected Result': expected,
    'Automation status': status,
  });
}

add('Navigation', 'Display logo primary nav cart wishlist', 'Verify desktop header chrome', 'P0', 'smoke,nav', 'Desktop viewport', '1. Open home 2. Inspect header', 'Logo Men Women Collections cart and wishlist visible', 'Covered');
add('Navigation', 'Logo returns to homepage', 'Logo click navigates home', 'P0', 'smoke,nav', 'On a collection page', '1. Open Men 2. Click logo', 'Homepage loads', 'Covered');
add('Navigation', 'Top-level Men Women Collections', 'Top-level nav routes', 'P0', 'smoke,nav', 'Desktop', '1. Click each top-level link', 'Correct URL and H1; products on Men/Women', 'Covered');
add('Navigation', 'Dropdown Men Women Collections', 'Dropdown destinations', 'P0', 'regression,nav', 'Desktop', '1. Hover category 2. Click each item', 'Correct collection URL and H1', 'Covered');
add('Navigation', 'Open empty cart drawer', 'Empty cart drawer copy', 'P1', 'smoke,cart,nav', 'Empty cart', '1. Click cart icon', 'Drawer shows cart is empty', 'Covered');
add('Navigation', 'Open empty wishlist drawer', 'Empty wishlist drawer copy', 'P1', 'smoke,wishlist,nav', 'Empty wishlist', '1. Click wishlist icon', 'Drawer shows wishlist is empty', 'Covered');
add('Follow Us', 'Top bar phone WhatsApp Facebook Instagram', 'Header utility links', 'P0', 'smoke,social', 'Desktop', '1. Open home 2. Assert each utility link', 'Visible with correct href and target', 'Covered');

add('Login', 'Open login from header', 'Header Login link', 'P0', 'smoke,auth', 'Logged out', '1. Click Login', '/login Customer login', 'Covered');
add('Login', 'Successful login', 'Valid credentials', 'P0', 'smoke,auth', 'Valid test account', '1. Submit email/password', 'Homepage; Logout visible', 'Covered');
add('Login', 'Logout restores Login link', 'Logout', 'P0', 'smoke,auth', 'Logged in', '1. Logout', 'Login link restored; logout toast', 'Covered');
add('Login', 'Open account dashboard from greeting', 'Account entry', 'P0', 'smoke,auth,profile', 'Logged in', '1. Click Signed in as', '/my-account/dashboard', 'Covered');
add('Login', 'Toggle show hide password', 'Password visibility', 'P2', 'regression,auth', 'On login', '1. Toggle show/hide', 'Input type password/text', 'Covered');
add('Login', 'Open forgot password from login', 'Lost password link', 'P0', 'smoke,auth', 'On login', '1. Click lost password', '/forgot-password', 'Covered');
add('Login', 'Empty submit validation', 'Required fields', 'P1', 'regression,auth', 'On login', '1. Submit empty', 'Email/password required messages', 'Covered');
add('Login', 'Email only validation', 'Password required', 'P1', 'regression,auth', 'On login', '1. Email only submit', 'Password required', 'Covered');
add('Login', 'Password only validation', 'Email required', 'P1', 'regression,auth', 'On login', '1. Password only submit', 'Email required', 'Covered');
add('Login', 'Invalid email format', 'Format validation', 'P1', 'regression,auth', 'On login', '1. Enter invalid email', 'Valid email toast/error', 'Covered');
add('Login', 'Unknown email', 'Unknown account', 'P1', 'regression,auth', 'On login', '1. Unknown email', 'Invalid credentials', 'Covered');
add('Login', 'Wrong password', 'Wrong password', 'P1', 'regression,auth', 'On login', '1. Wrong password', 'Invalid credentials', 'Covered');
add('Login', 'Remember me default unchecked', 'Default remember me', 'P2', 'regression,auth', 'On login', '1. Open login', 'Remember me unchecked', 'Covered');
add('Login', 'Remember me toggle', 'Toggle remember me', 'P2', 'regression,auth', 'On login', '1. Check/uncheck', 'Checkbox state updates', 'Covered');
add('Login', 'Session persists after reload', 'Session persistence', 'P1', 'regression,auth', 'Logged-in storage state', '1. Open home 2. Reload', 'Still logged in', 'Covered');

add('Lost Password', 'Email required on forgot password', 'Required email', 'P1', 'regression,auth', 'On forgot password', '1. Submit empty', 'Email required', 'Covered');
add('Lost Password', 'Send password reset email message', 'Reset request success copy', 'P0', 'smoke,auth', 'On forgot password', '1. Submit known email', 'Password reset email sent message', 'Covered');
add('Lost Password', 'Back to login from forgot password', 'Return link', 'P2', 'regression,auth', 'On forgot password', '1. Click back to login', 'Login page', 'Covered');
add('Lost Password', 'Complete reset via email link', 'End-to-end reset with temp mailbox', 'P0', 'smoke,auth,@email', 'Staging; mail.tm disposable inbox', '1. Register+confirm temp user 2. Request reset 3. Open email link 4. Set new password 5. Login with new password; old password fails', 'Password updated; login succeeds with new password only', 'Covered');

add('Register', 'Open register from login', 'Register link', 'P0', 'smoke,auth', 'On login', '1. Click register here', '/register', 'Covered');
add('Register', 'Link back to login', 'Login link on register', 'P2', 'regression,auth', 'On register', '1. Click login link', '/login', 'Covered');
add('Register', 'Reject invalid email', 'Email format', 'P1', 'regression,auth', 'On register', '1. Invalid email', 'Validation error', 'Covered');
add('Register', 'Require email on empty submit', 'Required email', 'P1', 'regression,auth', 'On register', '1. Empty submit', 'Email required', 'Covered');
add('Register', 'Password rules when missing', 'Password rules', 'P1', 'regression,auth', 'On register', '1. Email only', 'Password rule messages', 'Covered');
add('Register', 'Weak password rules', 'Weak password', 'P1', 'regression,auth', 'On register', '1. Weak password', 'Rule messages', 'Covered');
add('Register', 'Already registered email', 'Duplicate email', 'P1', 'regression,auth', 'Existing account email', '1. Register existing', 'Already taken', 'Covered');
add('Register', 'New register shows email confirmation', 'Confirmation page', 'P0', 'smoke,auth', 'Fresh email', '1. Register valid user', 'Email confirmation page', 'Covered');
add('Register', 'Confirm email and login', 'Full email confirm', 'P0', 'smoke,auth,@email', 'mail.tm on staging', '1. Register 2. Confirm link 3. Login', 'Account active', 'Covered');

add('Home', 'Homepage loads with title and featured heading', 'Home smoke', 'P0', 'smoke,home', 'None', '1. Open /', 'Title Genki; featured heading visible', 'Covered');
add('Search', 'Desktop search is disabled', 'Search hidden by requirement', 'P0', 'smoke,search', 'Desktop homepage', '1. Open / 2. Inspect header', 'No search control, overlay, or search input', 'Covered');
add('Search', 'Mobile menu search is disabled', 'Mobile search hidden by requirement', 'P1', 'regression,search,nav', 'Mobile viewport', '1. Open hamburger menu', 'No search input in the menu', 'Covered');
add('Carousel', 'Hero carousel is visible with slides', 'Carousel presence', 'P0', 'smoke,home,carousel', 'Home', '1. Open home', 'Hero slider with multiple slides', 'Covered');
add('Carousel', 'Carousel next navigation changes slide', 'Carousel control', 'P1', 'regression,home,carousel', 'Home', '1. Click next', 'Active slide changes', 'Covered');
add('Newsletter', 'Subscribe button disabled when empty', 'Empty newsletter', 'P2', 'regression,newsletter', 'Home footer', '1. Leave email empty', 'Subscribe disabled or validation', 'Covered');
add('Newsletter', 'Subscribe with valid email', 'Newsletter happy path', 'P1', 'smoke,newsletter', 'Home footer', '1. Enter valid email 2. Submit', 'Success feedback or accepted submit', 'Covered');
add('Newsletter', 'Reject invalid newsletter email', 'Newsletter validation', 'P2', 'regression,newsletter', 'Home footer', '1. Enter invalid email', 'Validation prevents submit or shows error', 'Covered');

add('Categories', 'Open Men collection PLP', 'Men PLP', 'P0', 'smoke,plp', 'Desktop', '1. Navigate Men', 'Men H1 and products', 'Covered');
add('Categories', 'Open Women collection PLP', 'Women PLP', 'P0', 'smoke,plp', 'Desktop', '1. Navigate Women', 'Women H1 and products', 'Covered');
add('Categories', 'Open theme collections', 'Anime Originals Culture JDM Kawaii', 'P0', 'smoke,plp', 'Desktop', '1. Open each theme collection', 'Correct H1', 'Covered');
add('Products', 'PLP shows product grid and opens PDP', 'Grid to PDP', 'P0', 'smoke,plp', 'On Men collection', '1. Assert products 2. Open first valid product', 'PDP URL /products/', 'Covered');
add('Products', 'PLP filters or sort if present', 'Optional filters', 'P2', 'regression,plp', 'Collection with filters', '1. Apply filter/sort if UI exists', 'Results update or products remain when no control exists', 'Covered');

add('Individual product', 'PDP shows title price and ATC', 'PDP smoke', 'P0', 'smoke,pdp', 'Product URL', '1. Open PDP', 'Title price ATC visible', 'Covered');
add('Individual product', 'Select size enables ATC', 'Size selection', 'P0', 'smoke,pdp', 'PDP with sizes', '1. Select size', 'ATC enabled', 'Covered');
add('Individual product', 'Add to cart success toast and badge', 'ATC happy path', 'P0', 'smoke,pdp,cart', 'PDP', '1. Select size 2. ATC', 'Toast; cart badge count', 'Covered');
add('Individual product', 'Add to wishlist from PDP', 'Wishlist from PDP', 'P0', 'smoke,pdp,wishlist', 'PDP', '1. Click add to wishlist', 'Item in wishlist drawer or toast', 'Covered');
add('Individual product', 'Quantity stepper on PDP', 'Qty controls', 'P2', 'regression,pdp', 'PDP', '1. Increase qty', 'Qty value updates', 'Covered');
add('Individual product', 'Qty 3 from PDP lands in cart', 'Higher qty ATC', 'P1', 'regression,pdp,cart', 'White-only PDP', '1. Select size 2. Set qty 3 3. ATC 4. Open cart', 'Cart qty is 3', 'Covered');
add('Individual product', 'Qty stepper disabled until size selected', 'Qty gated on size', 'P1', 'regression,pdp', 'White-only PDP', '1. Open PDP without size', 'Plus/minus disabled; Select a size shown', 'Covered');
add('Individual product', 'All sizes XXS to XXXL listed', 'Full size matrix', 'P1', 'regression,pdp', 'White-only PDP', '1. Open PDP', 'XXS XS S M L XL XXL XXXL visible', 'Covered');
add('Individual product', 'Gallery size chart additional info', 'PDP chrome', 'P2', 'regression,pdp', 'White-only PDP', '1. Open PDP', 'Gallery thumbs, size chart, additional information', 'Covered');

add('PDP variants', 'White-only locks white and lists all sizes', 'Single-color white SKU', 'P0', 'smoke,pdp', '/products/test-white-only', '1. Open PDP', 'White color locked; sizes XXS-XXXL; size required', 'Covered');
add('PDP variants', 'White-only every size enables ATC', 'Per-size ATC enable', 'P1', 'regression,pdp', 'White-only PDP', '1. Select each size XXS-XXXL', 'Add to cart enabled for every size', 'Covered');
add('PDP variants', 'White-only every size added to cart', 'Per-size ATC cart lines', 'P1', 'regression,pdp,cart', 'White-only PDP', '1. Add each size 2. Open cart', '8 lines each Color white with matching size', 'Covered');
add('PDP variants', 'Black-only locks black and lists all sizes', 'Single-color black SKU', 'P0', 'smoke,pdp', '/products/test-black-only', '1. Open PDP', 'Black color locked; sizes XXS-XXXL; size required', 'Covered');
add('PDP variants', 'Black-only every size enables ATC', 'Per-size ATC enable', 'P1', 'regression,pdp', 'Black-only PDP', '1. Select each size XXS-XXXL', 'Add to cart enabled for every size', 'Covered');
add('PDP variants', 'Black-only every size added to cart', 'Per-size ATC cart lines', 'P1', 'regression,pdp,cart', 'Black-only PDP', '1. Add each size 2. Open cart', '8 lines each Color black with matching size', 'Covered');
add('PDP variants', 'Dual-color requires color before sizes', 'Color-first UX', 'P0', 'smoke,pdp', '/products/test-black-white-both', '1. Open PDP', 'Select a color; sizes hidden', 'Covered');
add('PDP variants', 'Dual-color switching color clears size', 'Color change resets size', 'P1', 'regression,pdp', 'Dual-color PDP', '1. Select black+M 2. Switch to white', 'Size required again; then XXS enables ATC', 'Covered');
add('PDP variants', 'Dual-color every color x size enables ATC', 'Full color-size matrix', 'P1', 'regression,pdp', 'Dual-color PDP', '1. For black and white select each size', 'ATC enabled for all 16 pairs', 'Covered');
add('PDP variants', 'Dual-color every black size in cart', 'Black matrix ATC', 'P1', 'regression,pdp,cart', 'Dual-color PDP', '1. Select black 2. Add every size', '8 cart lines Color black', 'Covered');
add('PDP variants', 'Dual-color every white size in cart', 'White matrix ATC', 'P1', 'regression,pdp,cart', 'Dual-color PDP', '1. Select white 2. Add every size', '8 cart lines Color white', 'Covered');
add('PDP variants', 'Dual-color qty 3 with attributes in cart', 'Color size qty cart', 'P1', 'regression,pdp,cart', 'Dual-color PDP', '1. White + XL + qty 3 2. ATC', 'Cart line white XL qty 3', 'Covered');
add('PDP variants', 'Berserk size is out of stock', 'OOS ATC blocked', 'P0', 'smoke,pdp', '/products/berserk-oversized-tee', '1. Select XS', 'Out of Stock disabled; no Add to cart', 'Covered');
add('PDP variants', 'Lowercase jjk slug loads Gojo PDP', 'Canonical lowercase slug', 'P1', 'regression,pdp', '/products/jjk', '1. Open lowercase slug', 'Gojo PDP with size controls', 'Covered');
add('PDP variants', 'Uppercase JJK slug 404s', 'Non-canonical slug casing', 'P2', 'regression,pdp', '/products/JJK', '1. Open uppercase slug', 'Page Not Found', 'Covered');
add('PDP layout', 'White-only PDP has no horizontal overflow', 'Page does not scroll sideways', 'P1', 'regression,pdp,layout', 'White-only PDP desktop', '1. Open PDP 2. Measure document width', 'All sizes listed; scrollWidth fits the viewport', 'Covered');
add('PDP layout', 'Size options listed at laptop width', '1024px size list', 'P1', 'regression,pdp,layout', '1024×768', '1. Open white-only PDP', 'XXS–XXXL listed; no horizontal overflow', 'Covered');
add('PDP layout', 'Size options listed on mobile viewport', '390px size list', 'P1', 'regression,pdp,layout', '390×844', '1. Open white-only PDP', 'XXS–XXXL listed; no horizontal overflow', 'Covered');
add('PDP layout', 'Dual-color sizes listed after color select', 'Color-first size list', 'P1', 'regression,pdp,layout', 'Dual-color PDP', '1. Select black 2. Measure sizes', 'XXS–XXXL listed; no horizontal overflow', 'Covered');
add('PDP layout', 'Wrapped size chips have row gap at 1024', 'Laptop wrap spacing', 'P1', 'regression,pdp,layout', '1024×768 white-only PDP', '1. Open PDP 2. Measure size-chip row gap', 'Wrapped chips have at least 8px row gap', 'Covered');
add('PDP layout', 'Wrapped size chips have row gap at 390', 'Mobile wrap spacing', 'P1', 'regression,pdp,layout', '390×844 white-only PDP', '1. Open PDP 2. Measure size-chip row gap', 'Wrapped chips have at least 8px row gap', 'Covered');
add('PDP merchandising', 'Homepage first tile is in stock', 'Featured product purchasable', 'P1', 'regression,home,pdp', 'Homepage', '1. Click first product tile 2. Enable ATC', 'First featured product can be added to cart', 'Covered');
add('PDP merchandising', 'Berserk copy matches selected color', 'Color copy consistency', 'P2', 'regression,pdp', 'Berserk PDP', '1. Open Berserk 2. Compare copy to checked color', 'Copy does not describe the opposite color', 'Covered');
add('PDP merchandising', 'Size chart does not list XXXXL when PDP stops at XXXL', 'Size range consistency', 'P2', 'regression,pdp', 'White-only PDP and size guide', '1. List PDP sizes 2. Inspect size chart and size guide', 'XXXXL is not offered on PDP or advertised as a purchasable size', 'Covered');

add('Wishlist', 'Add product to wishlist and open drawer', 'Wishlist add', 'P0', 'smoke,wishlist', 'Empty wishlist', '1. Add from PDP 2. Open wishlist', 'Item listed', 'Covered');
add('Wishlist', 'Remove item from wishlist', 'Wishlist remove', 'P1', 'regression,wishlist', 'Item in wishlist', '1. Remove item', 'Empty or item gone', 'Covered');
add('Wishlist', 'Wishlist page view', '/wishlist page', 'P1', 'regression,wishlist', 'Item in wishlist', '1. Open /wishlist', 'Item visible', 'Covered');

add('Cart', 'View cart page after ATC', 'Cart view', 'P0', 'smoke,cart', 'Item added', '1. ATC 2. Open /cart', 'Line item with price qty', 'Covered');
add('Cart', 'Increase quantity on cart page', 'Qty increase', 'P1', 'regression,cart', 'Item in cart', '1. Click +', 'Qty and totals update', 'Covered');
add('Cart', 'Remove item empties cart', 'Remove line', 'P1', 'regression,cart', 'Item in cart', '1. Remove', 'No items found; shop now', 'Covered');
add('Cart', 'Proceed to checkout from cart', 'Checkout entry', 'P0', 'smoke,cart,checkout', 'Item in cart', '1. Click proceed to checkout', '/checkout loads', 'Covered');
add('Cart', 'Free delivery remaining under 5000', 'Below threshold', 'P0', 'smoke,cart,checkout', 'Qty 1 of LKR 3490 SKU', '1. ATC qty 1 2. Open cart', 'You are LKR 1,510 away from free delivery', 'Covered');
add('Cart', 'Free delivery unlocked over 5000', 'Above threshold', 'P0', 'smoke,cart,checkout', 'Qty 2 of LKR 3490 SKU', '1. ATC qty 2 2. Open cart', 'Free delivery unlocked on this order', 'Covered');
add('Cart', 'Free delivery boundary qty 1 to 2', 'Cross threshold on cart', 'P1', 'regression,cart', 'Qty 1 in cart', '1. Increase to 2 2. Decrease to 1', 'Unlocked at 2; remaining at 1', 'Covered');
add('Cart', 'Same variant added twice merges quantity', 'Qty merge', 'P1', 'regression,cart', 'Empty guest cart', '1. ATC size M 2. ATC size M again', 'One cart line with qty 2', 'Covered');
add('Cart', 'Price differs for XXS and XXXL', 'Size-based pricing', 'P1', 'regression,cart,pdp', 'White-only PDP', '1. ATC XXS 2. ATC XXXL 3. Open cart', 'XXS 3390; XXXL 3590; subtotal 6980', 'Covered');
add('Cart', 'Cart line size and color are read-only', 'No in-cart variant edit', 'P2', 'regression,cart', 'Item in cart', '1. Open cart', 'No size/color editor on the line', 'Covered');
add('Cart', 'OOS product cannot join an in-stock checkout', 'OOS blocked at ATC', 'P1', 'regression,cart,checkout', 'In-stock line in cart', '1. Open Berserk 2. Confirm OOS 3. Checkout', 'Cart still has one in-stock line; checkout loads', 'Covered');

add('Info', 'About us page', 'About CMS', 'P1', 'regression,footer', 'Home', '1. Footer About us', '/about-us content loads', 'Covered');
add('Info', 'Contact section', 'Contact anchor', 'P1', 'regression,footer', 'Home', '1. Footer Contact', '/about-us#contact', 'Covered');
add('Info', 'Privacy Policy page', 'Privacy CMS', 'P1', 'regression,footer', 'Home', '1. Footer Privacy', '/privacy-policy loads', 'Covered');
add('Info', 'Terms and Conditions page', 'Terms CMS', 'P1', 'regression,footer', 'Home', '1. Footer Terms', '/terms-and-conditions loads', 'Covered');
add('Info', 'Exchange via return policy promo', 'Exchange link', 'P2', 'regression,footer', 'Home promo', '1. Click Exchange', '/return-policy loads', 'Covered');
add('Useful Links', 'Returns page', 'Returns CMS', 'P1', 'regression,footer', 'Home', '1. Footer Returns', '/return-policy loads', 'Covered');
add('Useful Links', 'Shipping and Delivery page', 'Shipping CMS', 'P1', 'regression,footer', 'Home', '1. Footer Shipping', '/shipping-policy loads', 'Covered');
add('Useful Links', 'Size guide page', 'Size guide CMS', 'P1', 'regression,footer', 'Home', '1. Footer Size guide', '/size-guide loads', 'Covered');
add('Useful Links', 'FAQs page', 'FAQ CMS', 'P1', 'regression,footer', 'Home', '1. Footer FAQs', '/faq loads', 'Covered');
add('Follow Us', 'Footer Facebook Instagram TikTok WhatsApp', 'Footer social hrefs', 'P1', 'regression,social,footer', 'Home', '1. Assert footer social links', 'Correct hrefs open external', 'Covered');

add('Profile', 'Dashboard greeting and email', 'Dashboard', 'P0', 'smoke,profile', 'Logged in', '1. Open dashboard', 'Hello name and email', 'Covered');
add('Profile', 'Orders page lists or empty state', 'Orders', 'P0', 'smoke,profile', 'Logged in', '1. Open Orders', 'Orders table or empty', 'Covered');
add('Profile', 'Loyalty page shows points', 'Loyalty', 'P0', 'smoke,profile,rewards', 'Logged in', '1. Open Loyalty', 'Points visible', 'Covered');
add('Profile', 'Address page loads editable fields', 'Address', 'P1', 'regression,profile', 'Logged in', '1. Open Address', 'Address fields visible', 'Covered');
add('Profile', 'Account details page loads', 'Account details', 'P1', 'regression,profile', 'Logged in', '1. Open Account Details', 'Personal info fields', 'Covered');
add('Profile', 'Logout from account sidebar', 'Sidebar logout', 'P0', 'smoke,profile,auth', 'Logged in on dashboard', '1. Click Logout in sidebar', 'Logged out', 'Covered');
add('Profile', 'Redeem points link to rewards', 'Redeem entry', 'P1', 'smoke,profile,rewards', 'Logged in dashboard', '1. Click Redeem Points', '/rewards', 'Covered');
add('Profile', 'Guest deep link loyalty redirects to login', 'Auth guard loyalty', 'P1', 'regression,profile,auth', 'Logged out', '1. Open /my-account/loyalty', 'Redirect to /login', 'Covered');
add('Profile', 'Guest deep link address redirects to login', 'Auth guard address', 'P1', 'regression,profile,auth', 'Logged out', '1. Open /my-account/address', 'Redirect to /login', 'Covered');
add('Profile', 'Guest deep link account details redirects to login', 'Auth guard account details', 'P1', 'regression,profile,auth', 'Logged out', '1. Open /my-account/account-details', 'Redirect to /login', 'Covered');
add('Profile', 'Guest rewards page prompts sign in', 'Public rewards catalog', 'P1', 'regression,profile,auth', 'Logged out', '1. Open /rewards', 'Catalog visible; sign-in prompt; still logged out', 'Covered');

add('Rewards', 'Rewards page shows usable points and catalog', 'Rewards load', 'P0', 'smoke,rewards', 'Logged in with points', '1. Open /rewards', 'Points and catalog visible', 'Covered');
add('Rewards', 'Add reward to next order', 'Redeem add', 'P1', 'regression,rewards', 'Usable points >= reward cost', '1. Click ADD on a reward', 'Reward queued for next order', 'Covered');
add('Rewards', 'Redeeming a reward decreases points', 'Points debit', 'P1', 'regression,rewards,checkout', 'Logged in; affordable reward', '1. Queue reward 2. Place COD order', 'Usable points decrease after order (or known checkout bug)', 'Covered');
add('Rewards', 'Purchasing an item increases points', 'Points earn', 'P1', 'regression,rewards,checkout', 'Logged in; no reward queued', '1. Capture points 2. Place COD order 3. Reopen rewards', 'Usable points greater than before purchase', 'Covered');

add('Checkout', 'Checkout loads with billing and payment methods', 'Checkout smoke', 'P0', 'smoke,checkout', 'Guest cart with item', '1. Open /checkout', 'Billing fields; Card Bank COD', 'Covered');
add('Checkout', 'Place order disabled when billing incomplete', 'Billing required', 'P1', 'regression,checkout', 'Guest cart', '1. Open checkout without billing 2. Select COD', 'Place Order stays disabled', 'Covered');
add('Checkout', 'Place order COD guest', 'Full COD order', 'P0', 'smoke,checkout,payment', 'Guest cart', '1. Fill billing 2. COD 3. Accept terms 4. Place order', 'order-success COD', 'Covered');
add('Checkout', 'Create account at checkout COD', 'Guest create-account order', 'P0', 'smoke,checkout,auth', 'Guest cart; new email', '1. Check Create an account 2. Password 3. COD place order 4. Log in', 'order-success COD; account can log in', 'Covered');
add('Checkout', 'Free delivery remaining under 5000', 'Checkout below threshold', 'P0', 'smoke,checkout', 'Qty 1 of LKR 3490 SKU', '1. Open checkout', 'You are LKR 1,510 away from free delivery', 'Covered');
add('Checkout', 'Free delivery unlocked over 5000', 'Checkout above threshold', 'P0', 'smoke,checkout', 'Qty 2 of LKR 3490 SKU', '1. Open checkout', 'Free delivery unlocked on this order', 'Covered');
add('Checkout', 'Order confirmation email after guest COD', 'Order confirmation email', 'P0', 'smoke,checkout,@email', 'Staging; mail.tm disposable inbox', '1. Place guest COD with temp email 2. Poll inbox for Order Confirmation', 'Email subject Order Confirmation #GK-*; body includes order id', 'Covered');
add('Checkout', 'Place order bank transfer guest', 'Full bank order', 'P0', 'smoke,checkout,payment', 'Guest cart', '1. Fill billing 2. Bank 3. Place order', 'order-success BankTransfer with bank details', 'Covered');
add('Checkout', 'Gift order disables COD keeps card and bank', 'Gift payment rules', 'P0', 'smoke,checkout,gift', 'Guest cart', '1. Check This order is a gift', 'COD disabled with not-available copy; Card and Bank enabled; gift message shown', 'Covered');
add('Checkout', 'Gift clears previously selected COD', 'Gift deselects COD', 'P1', 'regression,checkout,gift', 'Guest cart; COD selected', '1. Select COD 2. Enable gift', 'COD unchecked and disabled; no payment selected', 'Covered');
add('Checkout', 'Unchecking gift restores COD', 'Gift toggle restore', 'P1', 'regression,checkout,gift', 'Guest cart', '1. Enable gift 2. Disable gift 3. Select COD', 'COD enabled again; gift message hidden', 'Covered');
add('Checkout', 'Gift message optional with 300 char max', 'Gift message rules', 'P1', 'regression,checkout,gift', 'Guest cart', '1. Enable gift 2. Enter 350 chars 3. Clear message', 'Message capped at 300; empty message allowed; Bank still selectable', 'Covered');
add('Checkout', 'Gift bank transfer with empty message', 'Gift empty message order', 'P1', 'regression,checkout,gift,payment', 'Guest cart with in-stock SKU', '1. Enable gift with empty message 2. Bank transfer place order', 'order-success BankTransfer', 'Covered');
add('Checkout', 'Gift bank transfer with notes and separate shipping', 'Full gift bank order', 'P0', 'smoke,checkout,gift,payment', 'Guest cart with in-stock SKU', '1. Separate shipping 2. Gift message + notes 3. Bank transfer', 'order-success BankTransfer; COD unavailable during gift', 'Covered');
add('Checkout', 'Gift card payment opens PayHere', 'Gift card PayHere entry', 'P1', 'regression,checkout,gift,payment', 'Guest cart with in-stock SKU', '1. Enable gift 2. Card 3. Place order', 'PayHere checkout frame visible', 'Covered');
add('Checkout', 'Place order Visa success via PayHere', 'Sandbox Visa success', 'P0', 'smoke,checkout,payment', 'Guest cart; PayHere sandbox iframe', '1. Card payment 2. Select Visa 3. Enter 4916217501611292 4. Submit', 'Payment Approved then order-success Card', 'Covered');
add('Checkout', 'Place order MasterCard success via PayHere', 'Sandbox Master success', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Select Master 3. Enter 5307732125531191 4. Submit', 'Payment Approved then order-success Card', 'Covered');
add('Checkout', 'Amex unavailable in PayHere sandbox', 'Sandbox Amex not enabled', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Select Amex', 'Payment method unavailable in sandbox', 'Covered');
add('Checkout', 'Decline Visa insufficient funds', 'Sandbox decline insufficient funds', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Enter 4024007194349121 3. Submit', 'Payment Declined; stay off order-success', 'Covered');
add('Checkout', 'Decline MasterCard limit exceeded', 'Sandbox decline limit exceeded', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Enter 5491182243178283 3. Submit', 'Payment Declined; stay off order-success', 'Covered');
add('Checkout', 'Decline Visa do not honor', 'Sandbox decline do not honor', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Enter 4929768900837248 3. Submit', 'Payment Declined; stay off order-success', 'Covered');
add('Checkout', 'Decline Visa network error', 'Sandbox decline network error', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Enter 4024007120869333 3. Submit', 'Payment Declined; stay off order-success', 'Covered');
add('Checkout', 'Logged-in PayHere Visa order', 'Signed-in card payment', 'P1', 'regression,checkout,payment', 'Logged-in storage state', '1. Clear rewards/cart 2. Card checkout 3. Pay Visa', 'order-success Card unless unpublished gift blocks checkout', 'Covered');
add('Checkout', 'Invalid phone keeps place order disabled', 'Phone validation', 'P1', 'regression,checkout', 'Guest cart', '1. Fill billing with letters in phone 2. COD 3. Accept terms', 'Place Order stays disabled', 'Covered');
add('Checkout', 'Coupon control absent or invalid code rejected', 'Coupon edge', 'P2', 'regression,checkout', 'Guest cart', '1. Open checkout 2. Apply INVALIDQA if coupon UI exists', 'No coupon field or invalid-code error', 'Covered');
add('Checkout', 'Mobile checkout loads without overflow', 'Phone viewport checkout', 'P1', 'regression,checkout,mobile', 'Pixel 7 viewport', '1. ATC 2. Open checkout', 'Checkout loaded; no horizontal overflow', 'Covered');
add('Checkout', 'Mobile guest COD order', 'Phone viewport COD', 'P1', 'regression,checkout,mobile,payment', 'Pixel 7 viewport; guest cart', '1. Fill billing 2. COD 3. Place order', 'order-success COD', 'Covered');
add('Lost Password', 'Invalid reset token is rejected', 'Expired/bogus reset link', 'P1', 'regression,auth', 'Logged out', '1. Open /reset-password?token=invalid', 'Error for invalid or expired token; not logged in', 'Covered');
add('Lost Password', 'Reset password mismatch validation', 'Confirm password mismatch', 'P1', 'regression,auth', 'Reset form visible', '1. Enter different password and confirm', 'Mismatch error; stay on reset page', 'Covered');
add('Register', 'Login before email confirmation is blocked', 'Unverified login', 'P1', 'regression,auth', 'Fresh unconfirmed account', '1. Register 2. Login before confirming', 'Login rejected as unverified or invalid', 'Covered');
add('Register', 'Email confirmation without token does not sign in', 'Empty confirmation link', 'P2', 'regression,auth', 'Logged out', '1. Open /email-confirmation', 'Guest remains logged out', 'Covered');

function csvEscape(value) {
  const s = String(value ?? '');
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const lines = [cols.join(',')];
for (const row of rows) {
  lines.push(cols.map((c) => csvEscape(row[c])).join(','));
}
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/test-cases.csv', `${lines.join('\n')}\n`);
console.log('rows', rows.length);
console.log(
  'byStatus',
  rows.reduce((acc, row) => {
    const status = row['Automation status'];
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {}),
);
