# My StockStore React App

## Run Locally

1. Install dependencies
```bash
npm install
```

2. Run dev server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

## Deploy

### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel --prod` in project root
3. Vercel will provide a live URL like `https://my-stockstore.vercel.app`

### Netlify
1. Run `npm run build` to generate `dist/`
2. Drag & drop the `dist/` folder on https://app.netlify.com/sites/new
3. Netlify will provide a live URL like `https://stockstore.netlify.app`
