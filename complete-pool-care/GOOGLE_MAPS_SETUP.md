# Google Maps Autocomplete Setup Instructions

## Overview
Your contact form now has Google Maps address autocomplete functionality! When users start typing their address, they'll see suggestions from Google Maps. Clicking a suggestion will automatically fill in the street address, city, state, and zip code.

## What You Need to Do

### 1. Get a Google Maps API Key

You need to obtain a Google Maps API key from Google Cloud Console. Here's how:

#### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

#### Step 2: Create a New Project (or select an existing one)
- Click on the project dropdown at the top
- Click "New Project"
- Give it a name like "Complete Pool Care Website"
- Click "Create"

#### Step 3: Enable the Places API
- In the search bar, type "Places API"
- Click on "Places API"
- Click "Enable"

#### Step 4: Create API Credentials
- Go to "Credentials" in the left sidebar
- Click "Create Credentials" → "API Key"
- Copy your new API key

#### Step 5: Restrict Your API Key (IMPORTANT for security)
- Click on your newly created API key
- Under "Application restrictions":
  - Select "HTTP referrers (web sites)"
  - Add your website domains (e.g., `localhost:*`, `yourdomain.com/*`)
- Under "API restrictions":
  - Select "Restrict key"
  - Check "Places API"
- Click "Save"

### 2. Add Your API Key to the Website

Open the file: `index.html`

Find this line (around line 46):
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places" async defer></script>
```

Replace `YOUR_API_KEY_HERE` with your actual API key:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1234567890abcdefghijklmnop&libraries=places" async defer></script>
```

### 3. Test It Out

1. Save the file
2. Your dev server should automatically reload
3. Navigate to the contact form
4. Start typing an address in the "Street Address" field
5. You should see autocomplete suggestions appear!
6. Click on a suggestion and watch it auto-fill the city, state, and zip code

## Features Implemented

✅ **Address Autocomplete** - Google Maps suggestions as you type
✅ **Auto-fill** - Automatically fills city, state, and zip code
✅ **US Only** - Restricted to US addresses for relevance
✅ **Dark Mode Support** - Autocomplete dropdown matches your dark/light theme
✅ **Premium Styling** - Matches your website's design aesthetic

## Pricing

Google Maps Platform has a **FREE tier**:
- **$200 free credit per month**
- Places Autocomplete costs about **$2.83 per 1,000 requests**
- This means you get approximately **70,000 free autocomplete requests per month**

For a typical website, this is more than enough and you likely won't be charged anything!

## Troubleshooting

### Autocomplete not showing?
1. Check the browser console for errors
2. Make sure your API key is correctly added
3. Verify the Places API is enabled in Google Cloud Console
4. Check that your domain is allowed in the API key restrictions

### "This page can't load Google Maps correctly"?
- Your API key might be invalid or restricted
- Check the API key restrictions in Google Cloud Console
- Make sure billing is enabled (even though you won't be charged with the free tier)

## Security Note

⚠️ **Never commit your API key to public repositories!**

If you're using Git, consider:
1. Creating an environment variable for the API key
2. Using a build process to inject it
3. Adding the key only in production

For now, since this is a simple setup, the key is in the HTML file. Just be careful not to share it publicly.

## Need Help?

If you run into any issues:
1. Check the browser console for error messages
2. Verify your API key is active in Google Cloud Console
3. Make sure the Places API is enabled
4. Check that billing is set up (required even for free tier)

---

**That's it!** Once you add your API key, the address autocomplete will work beautifully! 🎉
