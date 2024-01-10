import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReduxApp from './ReduxApp';
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import Contact, { loader as contactLoader } from './routes/Contact';
import ErrorPage from './error-page';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet
} from "react-router-dom";
import EditContact, { action as EditAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import { action as contactAction } from "./routes/Contact";
import Index from './routes/indexRoute';
import { SinglePostPage, loader as SinglePostLoader } from './features/posts/SinglePostPage';
import { EditPostForm, loader as EditPostLoader } from './features/posts/EditPostForm';
import { Navbar } from './app/Navbar';
import { Provider } from 'react-redux';
import store from './app/store'
import { fetchUsers } from './features/users/usersSlice';
import { UsersList } from './features/users/UserList';
import { UserPage, loader as userPageLoader } from './features/users/UserPage';
import { NotificationsList } from './features/notifications/NotificationsList';


// const router = createBrowserRouter(
//   [
//     {
//       path: '/',
//       element: <Root />,
//       errorElement: <ErrorPage />,
//       loader: rootLoader,
//       action: rootAction,
//       children: [ // child routes would be renedered in outlet -> see in root.jsz where outlet is rendered
//       {
//         errorElement: <ErrorPage />,
//         children: [
//           { index: true, element: <Index /> },
//           {
//             path: "contacts/:contactId",
//             element: <Contact />,
//             loader: contactLoader,
//             action: contactAction
//           },
//           {
//             path: "contacts/:contactId/edit",
//             element: <EditContact />,
//             loader: contactLoader,
//             action: EditAction
//           },
//           {
//             path: "contacts/:contactId/destroy",
//             action: destroyAction,
//             errorElement: <div>Oops! There was an error.</div>,
//           },
//         ]
//       }
        
//       ],
//     },
//     // {
//     //   path: "contacts/:contactId",
//     //   element: <Contact />,
//     // },
//   ]
// )

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={EditAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);

const router1 = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<div><Navbar /><Outlet /></div>}
      loader={rootLoader}
      errorElement={<ErrorPage />}
    >

      {/* <Route errorElement={<ErrorPage />}> */}
        <Route index element={<ReduxApp />} />
        <Route
          path="posts/:postId"
          element={<SinglePostPage />}
          loader={SinglePostLoader}
        />
        <Route
          path="editPost/:postId"
          element={<EditPostForm />}
          loader={EditPostLoader}
        />
        <Route
          path="users"
          element={<UsersList />}
        />
        <Route
          path="notifications"
          element={<NotificationsList />}
        />
        <Route
          path="users/:userId"
          element={<UserPage />}
          loader={userPageLoader}
        />
        {/* <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        /> */}
      {/* </Route> */}
    </Route>
  )
)

async function start() {
  // Start our mock API server

  const root = ReactDOM.createRoot(document.getElementById('root'));
  store.dispatch(fetchUsers())
  root.render(
    <React.StrictMode>
      <Provider store={store} >
      <RouterProvider router={router1}/>
      {/* <App/> */}
      {/* <ReduxApp /> */}
      </Provider>
    </React.StrictMode>
  );
}


start();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
