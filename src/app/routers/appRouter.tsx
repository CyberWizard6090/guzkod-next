import {
  createHashRouter,
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
import { PdfReaderPage } from 'pages/pdfPage';
import { Empty } from 'shared/ui/empty';
import { PersonnelPage } from 'pages/personnelPage';
import { DepartmentPage } from 'pages/departmentPage';
import { DepartmentsPage } from 'pages/departmentsPage';
import { EmployeePage } from 'pages/EmployeePage';
import { ChatPage } from 'pages/ChatPage';
import { Error404 } from 'pages/ErrorPages';
import { getDepartmentById, getDepartments } from 'shared/api/departments';
import { getArticleById, getPageById } from 'shared/api/pages';
import { getEmployeeById, getPersonnel } from 'shared/api/personnel';

export const AppRouter = () => {
  const routers = createRoutesFromElements(
    <Route path="/" element={<Layout />} handle={{ crumb: <Link to="/">Домашняя страница</Link> }}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<Error404 />} />
      <Route
        path="article"
        element={<ArticlePage />}
        handle={{
          crumb: <Link to="/article">Новости и профилактика</Link>,
        }}
      />
      <Route path="chat" element={<ChatPage />} />
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
      />
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
          crumb: <Link to="/personnel">Персонал</Link>,
        }}
      />

      <Route
        path="departments"
        element={<DepartmentsPage />}
        handle={{
          crumb: <Link to="/department">Отделения</Link>,
        }}
        loader={async () => {
          try {
            return await getDepartments();
          } catch {
            throw new Response('Not Found', { status: 404 });
          }
        }}
      />
      <Route
        path="departments/:departmentID"
        element={<DepartmentPage />}
        handle={{
          crumb: <Link to="/departments">Отделение</Link>,
        }}
        loader={async ({ params }) => {
          try {
            return await getDepartmentById(params.departmentID as string);
          } catch {
            throw new Response('Not Found', { status: 404 });
          }
        }}
        errorElement={<Error404 />}
      />

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
        loader={async ({ params }) => {
          try {
            return await getPageById(params.pageId as string);
          } catch {
            throw new Response('Not Found', { status: 404 });
          }
        }}
        errorElement={<Error404 />}
      />
      <Route
        path="/read/:pageId"
        element={<DefaultPage />}
        loader={async ({ params }) => {
          try {
            return await getArticleById(params.pageId as string);
          } catch {
            throw new Response('Not Found', { status: 404 });
          }
        }}
        errorElement={<Error404 />}
      />
      <Route
        path="/pdf/:pdfId"
        element={<PdfReaderPage />}
        errorElement={<Empty text="Ошибка при загрузке PDF." />}
      />
    </Route>,
  );

  const router = createHashRouter(routers, {});

  return (
    <div className={'app'}>
      <RouterProvider router={router} />
    </div>
  );
};
