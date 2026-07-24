# Liftêd™ — Complete Setup & Deployment Guide

**Firebase Project:** `lifted-production-717`  
**Web App:** Liftêd Web  
**Repository:** `ARMS-REACH-DIGITAL-AGENCY/lifted`  
**Domain:** `wearliftedtoday.com`

---

## 1. Firebase Services to Enable

Go to [Firebase Console → lifted-production-717](https://console.firebase.google.com/project/lifted-production-717) and enable each of the following:

### 1a. Authentication
- **Console path:** Build → Authentication → Get Started
- **Sign-in providers to enable:**
  - Email/Password ✓ (required)
  - Email link (passwordless) ✓ (recommended — used for invitation flow)
- **No other providers needed at launch**
- **Authorized domains to add:** `wearliftedtoday.com`, `www.wearliftedtoday.com`, `lifted-production-717.firebaseapp.com`

### 1b. Cloud Functions
- **Console path:** Build → Functions → Get Started
- **Runtime:** Node.js 20
- **Required billing:** Blaze (pay-as-you-go) plan — Functions requires Blaze
- **Upgrade at:** Console → Project Overview → Spark → Upgrade to Blaze
- **Functions to deploy** (in `functions/src/index.js`):
  - `approveInvestor` — creates Firebase user, sets investor claim, sends invitation
  - `approveRetailer` — creates Firebase user, sets retailer claim, sends invitation
  - `revokeAccess` — disables Firebase user, removes custom claim

### 1c. Storage
- **Console path:** Build → Storage → Get Started
- **Default bucket:** `lifted-production-717.appspot.com`
- **Security rules:** Deploy from `storage.rules` in this repo
  ```
  firebase deploy --only storage
  ```
- **Folder structure to create manually in Storage:**
  ```
  investor-portal/
    documents/          ← Upload investor PDFs here
  retailer-portal/
    documents/          ← Upload retailer documents here
  brand-assets/
    logos/              ← Public brand assets (already in /public/brand/)
  ```
- **Important:** Never upload investor documents to the Vite `public/` directory. Only Firebase Storage with authentication rules.

### 1d. Service Account (for Admin SDK)
- **Console path:** Project Settings → Service Accounts → Generate new private key
- **Download** the JSON file
- **Base64-encode it:**
  ```bash
  base64 -i serviceAccountKey.json | tr -d '\n'
  ```
- **Set as Vercel environment variable:** `FIREBASE_SERVICE_ACCOUNT_JSON` (the base64 string)
- **Delete the downloaded JSON file** — never commit it to the repo

---

## 2. Environment Variables Required

Set all of the following in **Vercel → Settings → Environment Variables**.  
Never commit real values to the repository. See `.env.example` for the full template.

### Frontend Variables (VITE_ prefix — exposed to browser)

| Variable | Where to Find It | Required |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Console → Project Settings → Liftêd Web → SDK config | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | Same — value: `lifted-production-717.firebaseapp.com` | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | Same — value: `lifted-production-717` | ✅ |
| `VITE_FIREBASE_STORAGE_BUCKET` | Same — value: `lifted-production-717.appspot.com` | ✅ |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Same | ✅ |
| `VITE_FIREBASE_APP_ID` | Same | ✅ |

### Backend Variables (server-side only — NOT prefixed with VITE_)

| Variable | Where to Find It | Required |
|---|---|---|
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Service Account JSON, base64-encoded (see 1d above) | ✅ |
| `FIREBASE_STORAGE_BUCKET` | Value: `lifted-production-717.appspot.com` | ✅ |
| `DATABASE_URL` | Neon Console → Connection Details → main branch | ✅ |
| `HIGHLEVEL_API_KEY` | HighLevel → Settings → Integrations → API Keys | ✅ |
| `HIGHLEVEL_LOCATION_ID` | Value: `aONTFrcg4GyEubg0xdwW` (already set) | ✅ |
| `HIGHLEVEL_INVESTOR_PIPELINE_ID` | After creating investor pipeline in HighLevel | ✅ |
| `HIGHLEVEL_INVESTOR_STAGE_ACCESS_REQUESTED` | First stage ID of investor pipeline | ✅ |
| `HIGHLEVEL_WHOLESALE_PIPELINE_ID` | After creating wholesale pipeline in HighLevel | ✅ |
| `HIGHLEVEL_WHOLESALE_STAGE_APPLICATION_RECEIVED` | First stage ID of wholesale pipeline | ✅ |
| `APP_URL` | Value: `https://wearliftedtoday.com` | ✅ |

### Cloud Functions Variables (set separately in Firebase)

These are set via Firebase CLI, not Vercel:
```bash
firebase functions:config:set \
  app.url="https://wearliftedtoday.com" \
  neon.database_url="YOUR_NEON_CONNECTION_STRING"
```
Or set them as environment variables in Firebase Console → Functions → Configuration.

---

## 3. Neon / Postgres Setup

### 3a. Create the Project
1. Go to [neon.tech](https://neon.tech) and create a new project named `lifted-production`
2. Create two branches:
   - `main` — production database
   - `dev` — development/preview database

### 3b. Run Migrations
Connect to each branch and run the migration files in order:
```bash
# Install psql or use the Neon SQL Editor in the console
psql $DATABASE_URL -f db/migrations/001_initial_schema.sql
psql $DATABASE_URL -f db/migrations/002_updated_at_triggers.sql
```
Or paste the SQL directly into the Neon SQL Editor.

### 3c. Set Connection Strings in Vercel
- **Production environment** → `DATABASE_URL` = main branch connection string
- **Preview environment** → `DATABASE_URL` = dev branch connection string

### 3d. Tables Created
| Table | Purpose |
|---|---|
| `investor_access_requests` | All /investor-access form submissions |
| `investor_profiles` | Approved investor accounts |
| `retailer_applications` | All /wholesale form submissions |
| `retailer_accounts` | Approved retailer accounts |
| `portal_activity` | Login, page view, video view, booking events |
| `document_activity` | Per-document view and download tracking |
| `investor_documents` | Metadata for documents in Firebase Storage |
| `highlevel_sync` | HighLevel contact/opportunity ID log |

---

## 4. HighLevel Setup Required

### 4a. Investor Pipeline
Create a pipeline in HighLevel (Liftêd sub-account → Opportunities → Pipelines → Add Pipeline):
- **Pipeline name:** `Lifted Investor Access`
- **Stages (in order):**
  1. Access Requested
  2. Under Review
  3. Approved
  4. Invitation Sent
  5. Portal Accessed
  6. Call Scheduled
  7. Follow-Up
  8. Not Approved
- After creating, copy the Pipeline ID and Stage 1 ID into Vercel env vars:
  - `HIGHLEVEL_INVESTOR_PIPELINE_ID`
  - `HIGHLEVEL_INVESTOR_STAGE_ACCESS_REQUESTED`

### 4b. Wholesale Pipeline
Create a second pipeline:
- **Pipeline name:** `Lifted Wholesale`
- **Stages (in order):**
  1. Wholesale Inquiry
  2. Application Received
  3. Qualification Review
  4. Intro Call Scheduled
  5. Samples or Line Sheet Sent
  6. Wholesale Account Approved
  7. Opening Order Pending
  8. Opening Order Placed
  9. Active Retailer
  10. Reorder Follow-Up
  11. Not Qualified
- Copy Pipeline ID and Stage 2 ID into Vercel env vars:
  - `HIGHLEVEL_WHOLESALE_PIPELINE_ID`
  - `HIGHLEVEL_WHOLESALE_STAGE_APPLICATION_RECEIVED`

### 4c. Custom Fields to Create in HighLevel
Go to Settings → Custom Fields and create these fields for the Liftêd sub-account:

| Field Key | Label | Type |
|---|---|---|
| `lifted_interest_type` | Interest Type | Text |
| `lifted_how_heard` | How They Heard | Text |
| `lifted_why_interested` | Why Interested | Long Text |
| `lifted_investment_range` | Investment Range | Text |
| `lifted_professional_role` | Professional Role | Text |
| `lifted_access_request_id` | Access Request ID | Text |
| `lifted_business_type` | Business Type | Text |
| `lifted_store_count` | Store Count | Text |
| `lifted_why_lifted` | Why Carry Liftêd™ | Long Text |
| `lifted_estimated_monthly_units` | Est. Monthly Units | Text |
| `lifted_retailer_app_id` | Retailer App ID | Text |

### 4d. Tags to Create
- `Lifted Investor Access Requested`
- `Lifted Wholesale Lead`
- `Lifted Retailer Application`
- `Lifted Wholesale Approved`
- `Lifted Active Retailer`

### 4e. Automation Workflows to Build in HighLevel
These workflows are not built by code — they are configured in HighLevel's workflow builder:

**Workflow 1: Investor Access Request Received**
- Trigger: Contact tag added = `Lifted Investor Access Requested`
- Actions:
  1. Send internal notification email to Pete
  2. Create task: "Review investor access request — [Contact Name]" assigned to Pete
  3. Send confirmation email to applicant (template: "Your request has been received...")
  4. Send confirmation SMS to applicant (if consent given)

**Workflow 2: Investor Approved (triggered manually by Pete)**
- Trigger: Opportunity stage changed to "Approved"
- Actions:
  1. Move to "Invitation Sent" stage
  2. Send notification to Pete to run the `approveInvestor` Cloud Function

**Workflow 3: Wholesale Application Received**
- Trigger: Contact tag added = `Lifted Retailer Application`
- Actions:
  1. Send internal notification to Pete
  2. Create task: "Review wholesale application — [Business Name]"
  3. Send confirmation email to applicant

---

## 5. Deploy Cloud Functions

After enabling Firebase Functions (Blaze plan required):
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

Functions deployed:
- `approveInvestor` — callable from admin panel
- `approveRetailer` — callable from admin panel
- `revokeAccess` — callable from admin panel

---

## 6. Deploy Storage Rules

```bash
firebase deploy --only storage
```

This deploys `storage.rules` which:
- Requires `investor: true` custom claim to read `investor-portal/**`
- Requires `retailer: true` custom claim to read `retailer-portal/**`
- Allows public read of `brand-assets/**`
- Denies all other access by default

---

## 7. Admin Approval Workflow

### Approving an Investor
1. Investor submits `/investor-access` form
2. Contact appears in HighLevel → Lifted Investor Access pipeline → Stage: Access Requested
3. Pete reviews the request in HighLevel or Neon
4. To approve: call the `approveInvestor` Cloud Function with `{ requestId, email, firstName, lastName }`
   - This creates the Firebase user
   - Sets the `investor: true` custom claim
   - Generates a password-creation invitation link
   - Updates Neon: marks request as approved, creates investor profile
5. Send the invitation link to the approved investor (email via HighLevel workflow)
6. Investor clicks link → sets their password → accesses `/investor-portal`

### Approving a Retailer
Same flow using `approveRetailer` Cloud Function with `{ applicationId, email, firstName, lastName, businessName }`.

### Revoking Access
Call `revokeAccess` Cloud Function with `{ uid, reason }`:
- Disables the Firebase account immediately
- Removes all custom claims
- Marks the profile as inactive in Neon
- User cannot log in again

### Re-enabling Access
In Firebase Console → Authentication → Users → find the user → Enable account.  
Then re-run `setCustomUserClaims` via the Admin SDK or a new Cloud Function call.

---

## 8. Routes Created or Changed

### New Public Routes
| Route | Purpose |
|---|---|
| `/investor-access` | Public investor access request form |
| `/investor-login` | Secure login for approved investors/retailers |
| `/support` | "Help Bring Liftêd™ to Life" — 3 separated pathways |
| `/wholesale` | Retailer application form |

### New Protected Routes (require auth + role)
| Route | Required Role | Purpose |
|---|---|---|
| `/investor-portal` | investor or admin | Portal shell + sidebar nav |
| `/investor-portal/overview` | investor or admin | Welcome + confidentiality notice |
| `/investor-portal/brand` | investor or admin | Brand thesis |
| `/investor-portal/opportunity` | investor or admin | Business opportunity |
| `/investor-portal/market` | investor or admin | Market opportunity |
| `/investor-portal/development` | investor or admin | Development status |
| `/investor-portal/financials` | investor or admin | Financial information |
| `/investor-portal/documents` | investor or admin | Document library (Firebase Storage) |
| `/investor-portal/schedule` | investor or admin | Booking calendar |
| `/retailer-portal` | retailer or admin | Retailer dashboard placeholder |

### Changed Routes
| Old Route | New Behavior |
|---|---|
| `/invest` | 301 redirect to `/investor-access` |

### Removed from Navigation
- "Invest" removed from main consumer nav
- "Private Investor Access" added as footer secondary link
- "Wholesale" added as footer secondary link

---

## 9. Search Engine Protection

Portal pages (`/investor-portal/**`, `/retailer-portal`, `/investor-login`) are protected by:
1. **Authentication guard** — unauthenticated users are redirected to `/investor-access` before any content renders
2. **`noindex` meta tags** — add to `index.html` or via a `<Helmet>` component on each portal page:
   ```html
   <meta name="robots" content="noindex, nofollow" />
   ```
3. **`robots.txt`** — add to `public/robots.txt`:
   ```
   User-agent: *
   Disallow: /investor-portal
   Disallow: /investor-portal/
   Disallow: /retailer-portal
   Disallow: /retailer-portal/
   Disallow: /investor-login
   ```

---

## 10. Protected Document Storage

- All investor documents are stored in **Firebase Storage** under `investor-portal/documents/`
- Documents are **never** stored in the Vite `public/` directory
- Document URLs are **never** exposed in public page source
- Access requires a **signed URL** generated server-side (`/api/documents/investor/:id/url`)
- Signed URLs expire in **15 minutes**
- Firebase Storage rules require `investor: true` custom claim to read any file in `investor-portal/**`
- Document metadata (name, description, version) is stored in the `investor_documents` Neon table

---

## 11. Estimated Firebase and Neon Costs (Low Initial Traffic)

### Firebase (Blaze plan — pay as you go)
| Service | Free Tier | Estimated Cost at Low Traffic |
|---|---|---|
| Authentication | 10,000 MAU free | $0 (well under free tier) |
| Cloud Functions | 2M invocations/month free | $0 (well under free tier) |
| Storage | 5 GB storage, 1 GB/day download free | $0 (well under free tier) |
| Hosting (if used) | 10 GB storage, 360 MB/day free | $0 |
| **Total estimated** | | **$0–$5/month** at launch |

### Neon (serverless Postgres)
| Plan | Cost | Notes |
|---|---|---|
| Free tier | $0 | 0.5 GB storage, 1 branch, auto-suspend |
| Launch plan | $19/month | 10 GB storage, multiple branches, no auto-suspend |
| **Recommendation** | Launch plan | Needed for production + dev branches |

**Total estimated monthly cost at launch: $0–$25/month**

---

## 12. Files Changed in This Build

### New Files
| File | Purpose |
|---|---|
| `server/lib/firebase-admin.js` | Firebase Admin SDK singleton |
| `server/lib/db.js` | Neon/Postgres client |
| `server/lib/highlevel.js` | HighLevel API integration |
| `server/middleware/requireAuth.js` | Firebase ID token verification middleware |
| `server/routes/auth.js` | Login, logout, session endpoints |
| `server/routes/investorAccess.js` | Investor access request API |
| `server/routes/wholesale.js` | Wholesale application API |
| `server/routes/activity.js` | Portal activity tracking API |
| `server/routes/documents.js` | Secure document signed URL API |
| `server/index.js` | Express API server entry point |
| `db/migrations/001_initial_schema.sql` | All 8 Neon tables |
| `db/migrations/002_updated_at_triggers.sql` | Auto-update triggers |
| `storage.rules` | Firebase Storage security rules |
| `functions/src/index.js` | Cloud Functions: approveInvestor, approveRetailer, revokeAccess |
| `functions/package.json` | Cloud Functions dependencies |
| `firebase.json` | Firebase project configuration |
| `.firebaserc` | Firebase project ID: lifted-production-717 |
| `.env.example` | All required environment variables with sources |
| `src/lib/firebase.js` | Firebase client SDK (reads VITE_ env vars) |
| `src/contexts/AuthContext.jsx` | Auth state + custom claims context |
| `src/components/ProtectedRoute.jsx` | Role-based route guard |
| `src/pages/InvestorAccess.jsx` | /investor-access public form |
| `src/pages/InvestorLogin.jsx` | /investor-login secure login |
| `src/pages/Support.jsx` | /support — 3 separated pathways |
| `src/pages/Wholesale.jsx` | /wholesale retailer application |
| `src/pages/portal/InvestorPortal.jsx` | Portal shell with sidebar |
| `src/pages/portal/PortalOverview.jsx` | /investor-portal/overview |
| `src/pages/portal/PortalBrand.jsx` | /investor-portal/brand |
| `src/pages/portal/PortalOpportunity.jsx` | /investor-portal/opportunity |
| `src/pages/portal/PortalMarket.jsx` | /investor-portal/market |
| `src/pages/portal/PortalDevelopment.jsx` | /investor-portal/development |
| `src/pages/portal/PortalFinancials.jsx` | /investor-portal/financials |
| `src/pages/portal/PortalDocuments.jsx` | /investor-portal/documents |
| `src/pages/portal/PortalSchedule.jsx` | /investor-portal/schedule |
| `src/pages/RetailerPortal.jsx` | /retailer-portal placeholder |

### Modified Files
| File | Change |
|---|---|
| `src/App.jsx` | Full rewrite — AuthProvider, BrowserRouter, all new routes, ProtectedRoute guards |
| `src/main.jsx` | Removed duplicate BrowserRouter |
| `src/components/Nav.jsx` | Removed "Invest" from main nav |
| `src/components/Footer.jsx` | Added "Private Investor Access" and "Wholesale" footer links |
| `package.json` | Added firebase, firebase-admin, @neondatabase/serverless, express, cors, cookie-parser |
| `vercel.json` | API routing configuration |

---

## 13. Remaining Placeholders

| Item | Location | Status |
|---|---|---|
| HighLevel calendar embed | `/investor-portal/schedule` | Placeholder — add iframe after calendar is configured |
| Investor documents | `/investor-portal/documents` | Placeholder — upload PDFs to Firebase Storage |
| `robots.txt` | `public/robots.txt` | Needs to be created (see Section 9) |
| `noindex` meta tags | Portal pages | Needs `<meta name="robots">` on portal routes |
| Admin approval UI | Not yet built | Currently manual via Cloud Function calls |
| Test investor account | Not yet created | Create after Firebase Auth is enabled |

---

## 14. Confirmation

- ✅ No investor financial information on any public page
- ✅ "Invest" removed from main consumer navigation
- ✅ `/invest` redirects to `/investor-access`
- ✅ No automatic account creation after form submission
- ✅ No shared passwords — individual Firebase accounts only
- ✅ No public registration — approval required
- ✅ Custom claims (`investor`, `retailer`, `admin`) set server-side via Admin SDK
- ✅ Admin actions go through Cloud Functions, not client-editable fields
- ✅ Documents stored in Firebase Storage, never in `public/`
- ✅ Signed URLs expire in 15 minutes
- ✅ Storage rules require authentication + correct claim
- ✅ Separate investor and wholesale HighLevel pipelines
- ✅ Separate `/wholesale` and `/collaborate` funnels
- ✅ Wording compliance — no "Invest Now", "Buy Equity", "Guaranteed Return" anywhere
- ✅ Legal disclaimer on `/investor-access`
- ✅ SMS/email consent on all forms
- ✅ `robots.txt` and `noindex` instructions documented (see Section 9)
