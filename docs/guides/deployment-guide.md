# Deployment Guide - AnetaFizjoWeb

This document provides step-by-step instructions on how to backup the old website and deploy the static Next.js application to the Cyberfolks FTP hosting.

## 1. Creating a Backup (Crucial First Step)
Before deleting any files from the server, it is critical to create a backup of the existing site (likely an old WordPress installation).
1. Connect to the FTP server (see instructions in step 3).
2. Navigate to the main web directory (usually named `public_html` or the domain name `fizjoterapiawroclaw.com`).
3. Create a new folder on your computer locally (e.g., `Old_Site_Backup`).
4. Select all files and folders on your server (the right pane in FileZilla) and drag them into your new backup folder on the left pane (your computer).
5. Wait for the download to completely finish. You now have a safe copy of the old website.

## 2. Preparing the New Website
1. Open a terminal in your `AnetaFizjoWeb` project folder.
2. Run the command `npm run build` to generate the static files.
3. Ensure the build finishes successfully. A newly generated `out` folder will appear. This folder contains everything needed, including the configured `.htaccess` file for correct Apache routing.

## 3. Connecting to the FTP Server
You will need a free FTP client, such as **FileZilla** ([download here](https://filezilla-project.org/)).
1. Open FileZilla.
2. Use the "Quickconnect" bar at the top with your hosting credentials:
   - **Host:** `<TWOJ_HOST>` (np. s40.cyber-folks.pl lub IP)
   - **Username:** `<TWOJ_USER_FTP>`
   - **Password:** `<TWOJE_HASLO>`
   - **Port:** `21`
3. Click **Quickconnect**. Accept any certificate warnings if presented.

## 4. Cleaning the Server
Since the new site is a modern Next.js static export, old WordPress files and configurations will cause conflicts.
1. On the right side (Remote site), locate and open the public web folder (e.g., `public_html`).
2. ***Only after completing Step 1 (Backup)***: Select all files and folders inside (e.g., `wp-admin`, `wp-content`, `index.php`, old `.htaccess`).
3. Right-click the selection and choose **Delete**. The folder should now be completely empty.

## 5. Uploading the New Website
1. On the left side (Local site) in FileZilla, navigate to your `AnetaFizjoWeb` project folder.
2. Open the **`out`** folder.
3. Select **EVERYTHING** inside the `out` folder. Make sure hidden files, especially `.htaccess`, are included in the selection.
4. Drag and drop all selected items into the empty `public_html` folder on the right side.
5. Wait for the upload queue at the bottom to finish completely.

## 6. Post-Deployment Checks
Once the upload is complete, open your web browser, navigate to your live domain, and verify the following:
- **Routing & Subpages:** Click through language versions (like `/pl` or `/en`) and other sections. Try refreshing the page (F5) directly on a subpage to ensure the `.htaccess` rules prevent 404 errors.
- **Assets & Images:** Check if the logo, icons, and all background graphics load correctly.
- **Responsiveness:** Shrink your browser window or open the website on your mobile phone to assure the mobile layout functions as intended.
- **Forms/Links:** If there are contact details or links to external systems, click them to make sure they resolve properly.

## Additional Notes (Future Updates)
Whenever you modify your local project (e.g., text changes, adding photos) and want to update the live website:
1. Run `npm run build` locally to update the `out` folder.
2. Connect to the FTP server.
3. Navigate to your `public_html` directory on the server.
4. You can usually overwrite the existing files with the new ones from your `out` folder by dragging them over. Select "Overwrite", check "Always use this action", and click OK. 
*(Note: For major updates where you deleted features or changed routes, it's safer to delete everything inside `public_html` first to avoid leaving orphaned files, before uploading the new build).*\n\n## Appendix: How It Works (Next.js Static Export vs WordPress)\n\nSince the original server hosted a dynamic WordPress application (which relies on PHP and a database), you might wonder why replacing it with plain files works.\n\n### 1. The Old WordPress Server\nWordPress dynamically generates pages on every user request. The main entry point is `index.php`, which connects to a database, loads theme files, and compiles HTML on the fly. \n\n### 2. The New Next.js App\nNext.js is configured to use `output: 'export'`. When you run `npm run build`, Next.js performs all the \"server work\" upfront. It generates static HTML, CSS, and client-side JavaScript files for every route, placing them in the `out` directory. There is no PHP and no database connection required at runtime.\n\n### 3. Why It Works After Deleting WordPress\nWeb servers (like Apache on Cyberfolks) are configured by default to render an `index.html` file when a visitor accesses the root directory. By deleting the WordPress files and uploading the Next.js `out` folder, the server simply serves the pre-built `index.html`. It acts as a fast, secure file server instead of a processor.\n\n### 4. The Magic of `.htaccess`\nSince the new site uses a static export along with Next.js client-side routing, directly visiting a subpage (e.g., `fizjoterapiawroclaw.com/miednica`) requires the server to know how to route the request. The generated `.htaccess` file tells the Apache server to correctly route these requests to the corresponding `.html` files without throwing a 404 error.
