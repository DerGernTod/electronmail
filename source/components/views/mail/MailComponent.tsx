import './styles/mail.less';
import * as React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContentPane from './ContentPane';
import PreviewContainer from '@/containers/views/mail/PreviewContainer';

const MailComponent = ({ match, location }: RouteComponentProps<FolderPropsRouterParams & AccountPropsRouterParams>) => {
  const { accounts, folder } = match.params;
  return (
    <div className='flex'>
      <PreviewContainer />
      <TransitionGroup className="contentpane float-left">
        <CSSTransition
          classNames="content-pane-fade"
          timeout={500}
          appear={true}
          key={location.pathname}>
          <Route path={`/mail/${accounts}/${folder}/:mailid?`} key={location.pathname} component={ContentPane} location={location} />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
export default withRouter(MailComponent);
