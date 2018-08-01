import './styles/mail.less';
import * as React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import ContentPane from './ContentPane';
import PreviewContainer from '@/containers/views/mail/PreviewContainer';

const MailComponent = ({ match, location }: RouteComponentProps<FolderPropsRouterParams & AccountPropsRouterParams>) => {
  const { accounts, folder } = match.params;
  return (
    <div className='flex'>
      <PreviewContainer />
      <CSSTransition
        component="div"
        classNames="contentpane float-left"
        timeout={{
          enter: 500,
          exit: 500
        }}
        appear={true}
        transitionName="content-pane-fade">
        <Route path={`/mail/${accounts}/${folder}/:mailid?`} key={location.pathname} component={ContentPane} location={location} />
      </CSSTransition>
    </div>
  );
};
export default withRouter(MailComponent);
