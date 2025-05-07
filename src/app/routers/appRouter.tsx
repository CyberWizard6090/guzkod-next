import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from 'app/layout';

import { HomePage } from 'pages/homePage';

import '../styles/index.scss';

import { ArticlePage } from 'pages/articlePage';
import { DefaultPage } from 'pages/defaultPage';
import { FeedbackPage } from 'pages/feedbackPage';
import { PersonnelPage } from 'pages/personnelPage';
import { DepartmentPage } from 'pages/departmentPage';
import { DepartmentsPage } from 'pages/departmentsPage';
import { EmployeePage } from 'pages/EmployeePage';
import { ChatPage } from 'pages/ChatPage';
import { Error404 } from 'pages/ErrorPages';
import { getDepartmentById, getDepartments } from 'shared/api/departments';
import { getArticleById, getPageById } from 'shared/api/pages';
import { getEmployeeById, getPersonnel } from 'shared/api/personnel';
import { getAllArticles } from 'shared/api/articles';
import { SectionLayout } from 'pages/SectionLayout';

export const AppRouter = () => {
  const routers = createRoutesFromElements(
    <Route path="/" element={<Layout />} handle={{ crumb: <Link to="/">Главная</Link> }}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<Error404 />} />
      <Route
        path="article"
        element={<SectionLayout />}
        handle={{
          crumb: <Link to="/article">Новости и профилактика</Link>,
        }}
      >
        <Route
          index
          element={<ArticlePage />}
          loader={() => getAllArticles()}
          errorElement={<Error404 />}
        />
        <Route
          path=":pageId"
          element={<DefaultPage />}
          loader={async ({ params }) => {
            try {
              return await getArticleById(params.pageId as string);
            } catch {
              throw new Response('Not Found', { status: 404 });
            }
          }}
          errorElement={<Error404 />}
          handle={{
            crumb: <span>Новость</span>,
          }}
        />
      </Route>
      <Route
        path="personnel"
        element={<SectionLayout />}
        handle={{
          crumb: <Link to="/personnel">Персонал</Link>,
        }}
      >
        <Route
          index
          element={<PersonnelPage />}
          loader={() => getPersonnel()}
          errorElement={<Error404 />}
        />
        <Route
          path=":employeeID"
          element={<EmployeePage />}
          loader={({ params }) => getEmployeeById(params.employeeID as string)}
          errorElement={<Error404 />}
          handle={{
            crumb: <span>Сотрудник</span>,
          }}
        />

        <Route
          path="personnel"
          element={<PersonnelPage />}
          handle={{
            crumb: <Link to="/personnel">Персонал</Link>,
          }}
          loader={async () => {
            try {
              return await getPersonnel();
            } catch {
              throw new Response('Not Found', { status: 404 });
            }
          }}
          errorElement={<Error404 />}
        ></Route>
        <Route
          path="personnel/:employeeID"
          element={<EmployeePage />}
          loader={async ({ params }) => {
            try {
              return await getEmployeeById(params.employeeID as string);
            } catch {
              throw new Response('Not Found', { status: 404 });
            }
          }}
          errorElement={<Error404 />}
          handle={{
            crumb: <span>Сотрудник</span>,
          }}
        />
      </Route>
      <Route
        path="departments"
        element={<SectionLayout />}
        handle={{
          crumb: <Link to="/departments">Отделения</Link>,
        }}
      >
        <Route
          index
          element={<DepartmentsPage />}
          loader={() => getDepartments()}
          errorElement={<Error404 />}
        />
        <Route
          path=":departmentID"
          element={<DepartmentPage />}
          handle={{
            crumb: <span>Отделение</span>,
          }}
          loader={async ({ params }) => getDepartmentById(params.departmentID as string)}
          errorElement={<Error404 />}
        />
      </Route>
      <Route path="chat" element={<ChatPage />} />
      <Route
        path="feedback"
        element={<FeedbackPage />}
        handle={{
          crumb: <Link to="/feedback">Обратная связь</Link>,
        }}
      />

      <Route
        path="/:pageId"
        element={<DefaultPage />}
        loader={({ params }) => getPageById(params.pageId as string)}
        errorElement={<Error404 />}
      />
    </Route>,
  );

  const router = createBrowserRouter(routers);

  return (
    <div className={'app'}>
      <RouterProvider router={router} />
    </div>
  );
};
