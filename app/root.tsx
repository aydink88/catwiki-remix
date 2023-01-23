import { json, type MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import Layout from './containers/Layout';
import Cat from '~/models/CatModel';
import MetaModel from '~/models/MetaModel';
import style from './index.css';

export async function loader() {
  console.log('fetching breeds and discover');
  const [breeds, meta] = await Promise.all([
    Cat.find().lean().exec(),
    MetaModel.find().lean().exec(),
  ]);
  // const breeds = await Cat.find().lean().exec();
  // const meta = await MetaModel.find().lean().exec();
  return json({ breeds, discover: meta[0].discoverImages });
}

export const links = () => {
  return [{ rel: 'stylesheet', href: style }];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  const appContext = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet context={appContext} />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
