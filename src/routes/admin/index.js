import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Axios from './axios';
import Firestore from './firestore';
import Dashboard from './dashboard';
import Ecommerce from './ecommerce';
import Features from './features';
import Gallery from './gallery';
import Pages from './pages';
import Users from './users';
import Widgets from './widgets';
import AdminLayout from '../../layout/AdminLayout';

const Charts = lazy(() => import('./charts'));
const KnowledgeBase = lazy(() => import('../../container/pages/knowledgeBase/Index'));
const AllArticle = lazy(() => import('../../container/pages/knowledgeBase/AllArticle'));
const KnowledgeSingle = lazy(() => import('../../container/pages/knowledgeBase/SingleKnowledge'));
const Components = lazy(() => import('./components'));
const Task = lazy(() => import('../../container/task/Index'));
const Tickets = lazy(() => import('../../container/supportTicket/Index'));
const AddTicket = lazy(() => import('../../container/supportTicket/AddSupport'));
const TicketDetails = lazy(() => import('../../container/supportTicket/SupportTicketDetails'));
const Courses = lazy(() => import('../../container/course/Index'));
const CourseDetails = lazy(() => import('../../container/course/CourseDetails'));
const Contact = lazy(() => import('../../container/contact/Contact'));
const ContactGrid = lazy(() => import('../../container/contact/ContactGrid'));
const ContactAddNew = lazy(() => import('../../container/contact/AddNew'));
const Calendars = lazy(() => import('../../container/calendar/Calendar'));
const Import = lazy(() => import('../../container/importExport/Import'));
const Export = lazy(() => import('../../container/importExport/Export'));
const ToDo = lazy(() => import('../../container/toDo/ToDo'));
const Note = lazy(() => import('../../container/note/Note'));
const Projects = lazy(() => import('./projects'));
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const Chat = lazy(() => import('../../container/chat/ChatApp'));
const Inbox = lazy(() => import('../../container/email/Email'));
const Maps = lazy(() => import('./maps'));
const Viewer = lazy(() => import('../../container/pages/Viewer'));
const Icons = lazy(() => import('./icons'));
const Studies = lazy(() => import('./studies'));
const Jobs = lazy(() => import('../../container/jobSearch/Jobs'));
const JobDetails = lazy(() => import('../../container/jobSearch/JobSearchDetails'));
const JobApply = lazy(() => import('../../container/jobSearch/JobApplication'));
const NotFound = lazy(() => import('../../container/pages/404'));

const Admin = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <AdminLayout>
      <Suspense
        fallback={
          <div className="spin flex items-center justify-center bg-white dark:bg-dark h-screen w-full fixed z-[999] ltr:left-0 rtl:right-0 top-0">
            <Spin />
          </div>
        }
      >
        <Routes>
          <Route index path="/*" element={<Dashboard />} />
          <Route path="viewer" element={<Viewer />} />
          <Route path="radiologists" element={<Import />} />
          <Route path="studies*" element={<Studies />} />
          <Route path="pages/*" element={<Pages />} />
          <Route path="gallery/*" element={<Gallery />} />
          <Route path="all-articles" element={<AllArticle />} />
          <Route path="knowledgeBase/*" element={<KnowledgeBase />} />
          <Route path="knowledgebaseSingle/:id" element={<KnowledgeSingle />} />
          <Route path="components/*" element={<Components />} />
          <Route path="charts/*" element={<Charts />} />
          <Route path="app/task/*" element={<Task />} />
          <Route path="users/*" element={<Users />} />
          <Route path="app/support/tickets/*" element={<Tickets />} />
          <Route path="app/support/tickets/add" element={<AddTicket />} />
          <Route path="app/support/ticketDetails/:id" element={<TicketDetails />} />
          <Route path="app/course/courseDetails/:id" element={<CourseDetails />} />
          <Route path="app/course/*" element={<Courses />} />
          <Route path="contact/list" element={<Contact />} />
          <Route path="contact/grid" element={<ContactGrid />} />
          <Route path="contact/addNew" element={<ContactAddNew />} />
          <Route path="app/calendar/*" element={<Calendars />} />

          <Route path="importExport/export" element={<Export />} />
          <Route path="app/to-do" element={<ToDo />} />
          <Route path="app/note/*" element={<Note />} />
          <Route path="features/*" element={<Features />} />
          <Route path="axios/*" element={<Axios />} />
          <Route path="firestore/*" element={<Firestore />} />
          <Route path="project/*" element={<Projects />} />
          <Route path="profile/myProfile/*" element={<Myprofile />} />
          <Route path="ecommerce/*" element={<Ecommerce />} />
          <Route path="main/chat/*" element={<Chat />} />
          <Route path="email/*" element={<Inbox />} />
          <Route path="maps/*" element={<Maps />} />
          <Route path="editor" element={<Viewer />} />
          <Route path="icons/*" element={<Icons />} />

          <Route path="app/jobs/*" element={<Jobs />} />
          <Route path="app/job/apply" element={<JobApply />} />
          <Route path="app/jobDetails/:id" element={<JobDetails />} />
          <Route path="widgets/*" element={<Widgets />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AdminLayout>
  );
});

export default Admin;
