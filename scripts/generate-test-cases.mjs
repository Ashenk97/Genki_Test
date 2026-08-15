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
add('Login', 'Successful login', 'Valid credentials', 'P0', 'smoke,auth', 'Valid test account', '1. Submit email/password', 'Success toast; homepage; Logout visible', 'Covered');
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
add('Login', 'Remember me persists after reload', 'Session persistence', 'P1', 'regression,auth', 'Valid account', '1. Login with remember me 2. Reload', 'Still logged in', 'Covered');

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
add('Carousel', 'Hero carousel is visible with slides', 'Carousel presence', 'P0', 'smoke,home,carousel', 'Home', '1. Open home', 'Hero slider with multiple slides', 'Covered');
add('Carousel', 'Carousel next navigation changes slide', 'Carousel control', 'P1', 'regression,home,carousel', 'Home', '1. Click next', 'Active slide changes', 'Covered');
add('Newsletter', 'Subscribe button disabled when empty', 'Empty newsletter', 'P2', 'regression,newsletter', 'Home footer', '1. Leave email empty', 'Subscribe disabled or validation', 'Covered');
add('Newsletter', 'Subscribe with valid email', 'Newsletter happy path', 'P1', 'smoke,newsletter', 'Home footer', '1. Enter valid email 2. Submit', 'Success feedback or accepted submit', 'Covered');
add('Newsletter', 'Reject invalid newsletter email', 'Newsletter validation', 'P2', 'regression,newsletter', 'Home footer', '1. Enter invalid email', 'Validation prevents submit or shows error', 'Covered');

add('Categories', 'Open Men collection PLP', 'Men PLP', 'P0', 'smoke,plp', 'Desktop', '1. Navigate Men', 'Men H1 and products', 'Covered');
add('Categories', 'Open Women collection PLP', 'Women PLP', 'P0', 'smoke,plp', 'Desktop', '1. Navigate Women', 'Women H1 and products', 'Covered');
add('Categories', 'Open theme collections', 'Anime Originals Culture JDM Kawaii', 'P0', 'smoke,plp', 'Desktop', '1. Open each theme collection', 'Correct H1', 'Covered');
add('Products', 'PLP shows product grid and opens PDP', 'Grid to PDP', 'P0', 'smoke,plp', 'On Men collection', '1. Assert products 2. Open first valid product', 'PDP URL /products/', 'Covered');
add('Products', 'PLP filters or sort if present', 'Optional filters', 'P2', 'regression,plp', 'Collection with filters', '1. Apply filter/sort if UI exists', 'Results update or control visible', 'Planned');

add('Individual product', 'PDP shows title price and ATC', 'PDP smoke', 'P0', 'smoke,pdp', 'Product URL', '1. Open PDP', 'Title price ATC visible', 'Covered');
add('Individual product', 'Select size enables ATC', 'Size selection', 'P0', 'smoke,pdp', 'PDP with sizes', '1. Select size', 'ATC enabled', 'Covered');
add('Individual product', 'Add to cart success toast and badge', 'ATC happy path', 'P0', 'smoke,pdp,cart', 'PDP', '1. Select size 2. ATC', 'Toast; cart badge count', 'Covered');
add('Individual product', 'Add to wishlist from PDP', 'Wishlist from PDP', 'P0', 'smoke,pdp,wishlist', 'PDP', '1. Click add to wishlist', 'Item in wishlist drawer or toast', 'Covered');
add('Individual product', 'Quantity stepper on PDP', 'Qty controls', 'P2', 'regression,pdp', 'PDP', '1. Increase qty', 'Qty value updates', 'Covered');

add('Wishlist', 'Add product to wishlist and open drawer', 'Wishlist add', 'P0', 'smoke,wishlist', 'Empty wishlist', '1. Add from PDP 2. Open wishlist', 'Item listed', 'Covered');
add('Wishlist', 'Remove item from wishlist', 'Wishlist remove', 'P1', 'regression,wishlist', 'Item in wishlist', '1. Remove item', 'Empty or item gone', 'Covered');
add('Wishlist', 'Wishlist page view', '/wishlist page', 'P1', 'regression,wishlist', 'Item in wishlist', '1. Open /wishlist', 'Item visible', 'Covered');

add('Cart', 'View cart page after ATC', 'Cart view', 'P0', 'smoke,cart', 'Item added', '1. ATC 2. Open /cart', 'Line item with price qty', 'Covered');
add('Cart', 'Increase quantity on cart page', 'Qty increase', 'P1', 'regression,cart', 'Item in cart', '1. Click +', 'Qty and totals update', 'Covered');
add('Cart', 'Remove item empties cart', 'Remove line', 'P1', 'regression,cart', 'Item in cart', '1. Remove', 'No items found; shop now', 'Covered');
add('Cart', 'Proceed to checkout from cart', 'Checkout entry', 'P0', 'smoke,cart,checkout', 'Item in cart', '1. Click proceed to checkout', '/checkout loads', 'Covered');

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

add('Rewards', 'Rewards page shows usable points and catalog', 'Rewards load', 'P0', 'smoke,rewards', 'Logged in with points', '1. Open /rewards', 'Points and catalog visible', 'Covered');
add('Rewards', 'Add reward to next order', 'Redeem add', 'P1', 'regression,rewards', 'Usable points >= reward cost', '1. Click ADD on a reward', 'Reward queued for next order', 'Covered');

add('Checkout', 'Checkout loads with billing and payment methods', 'Checkout smoke', 'P0', 'smoke,checkout', 'Guest cart with item', '1. Open /checkout', 'Billing fields; Card Bank COD', 'Covered');
add('Checkout', 'Place order disabled when billing incomplete', 'Billing required', 'P1', 'regression,checkout', 'Guest cart', '1. Open checkout without billing 2. Select COD', 'Place Order stays disabled', 'Covered');
add('Checkout', 'Place order COD guest', 'Full COD order', 'P0', 'smoke,checkout,payment', 'Guest cart', '1. Fill billing 2. COD 3. Accept terms 4. Place order', 'order-success COD', 'Covered');
add('Checkout', 'Place order bank transfer guest', 'Full bank order', 'P0', 'smoke,checkout,payment', 'Guest cart', '1. Fill billing 2. Bank 3. Place order', 'order-success BankTransfer with bank details', 'Covered');
add('Checkout', 'Place order Visa success via PayHere', 'Sandbox Visa success', 'P0', 'smoke,checkout,payment', 'Guest cart; PayHere sandbox iframe', '1. Card payment 2. Select Visa 3. Enter 4916217501611292 4. Submit', 'Payment Approved then order-success Card', 'Covered');
add('Checkout', 'Place order MasterCard success via PayHere', 'Sandbox Master success', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Select Master 3. Enter 5307732125531191 4. Submit', 'Payment Approved then order-success Card', 'Covered');
add('Checkout', 'Decline Visa insufficient funds', 'Sandbox decline insufficient funds', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Enter 4024007194349121 3. Submit', 'Payment Declined; stay off order-success', 'Covered');
add('Checkout', 'Decline MasterCard limit exceeded', 'Sandbox decline limit exceeded', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Enter 5491182243178283 3. Submit', 'Payment Declined; stay off order-success', 'Covered');
add('Checkout', 'Decline Visa do not honor', 'Sandbox decline do not honor', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Enter 4929768900837248 3. Submit', 'Payment Declined; stay off order-success', 'Covered');
add('Checkout', 'Decline Visa network error', 'Sandbox decline network error', 'P1', 'regression,checkout,payment', 'Guest cart; PayHere sandbox', '1. Card payment 2. Enter 4024007120869333 3. Submit', 'Payment Declined; stay off order-success', 'Covered');

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
