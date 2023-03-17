This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)<sup>1</sup> with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello)<sup>1</sup>. This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

**NOTE<sup>1</sup>:** Other projects (e.g., `parsing-project`) also listen to port `3000`. If another project is already running and listening to port `3000`, the launched instance of `geo-investing` will automatically listen to port `3001` instead.

## Debugging in Visual Studio Code

**NOTE:** Google Chrome is required.

Open left tab *Debug and Run* (in PC: `ctrl`+`shift`+`D`), ensure "*Debug with Chrome*" is selected in the upper select box and click "*Start Debugging*" (press `F5`). A Chrome browser will open pointing to [http://localhost:3000](http://localhost:3000).

In the opened browser, access the *Developers Tools* (in PC: `ctrl`+`shift`+`j`). Use the tab "*Sources*" to navigate the development code in the folder `_N_E` for adding breakpoints.

When a break point is reached, the code can be debugged both in Chrome and in VSCode - they are synchronized.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.