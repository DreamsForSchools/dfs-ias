# Instructor Assignment Sorter

App built on Next.js Framework for React and deployed on it's integrated Vercell Platform as a headless cms with api's as serverless fuctions. Uses firebase for authentication (firebase/auth) and storage and database management (firebase/firestore). 

## Initial Setup

- Clone repo into local directory.

```
git clone https://github.com/DreamForSchools/Instructor-Assignment-Sorter.git
cd ./Instructor-Assignment-Sorter
git remote add origin https://github.com/DreamForSchools/Instructor-Assignment-Sorter.git
```

- Install required packages not cached on the github repo.

```
npm install
```

You can then start Coding.

The pages tab contains all the pages. With Next.js the route to the pages will be set relative to their position from /pages/. Example:
- ./pages/index.js => localhost:3000/
- ./pages/menu/schools.js => localhost:3000/menu/school
<br />
The ./pages/api, ./pages/_*.js are exceptions to these.<br />
Whenever refrecing a file/path from within a jsx object Next.js will assume 
./public as root. Example:
```
const addIcon = <link rel="icon" href="/dfslogo.svg" />
```
Where the file dfslogo.svg is located in ./public/dfslogo.svg.<br /><br />

The ./pages/api/ folder will contain APIs that will be deployed as serverless 
functions and wont be included in the client package. All the server code goes
there.

## Testing

To test the app you run:
```
npm run dev
```

This will run the app locally on localhost:3000

## Deploying

To deploy the app to vercel simply commit all the changes and push to the master
branch of the github repo.
```
git push origin master
```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
