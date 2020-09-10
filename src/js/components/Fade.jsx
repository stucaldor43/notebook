import React from 'react';
import "./../../css/components/Fade/styles.css";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function Fade({ children, childKey, enter, exit, classes }) {
  return (
    <div className="fade">
      <TransitionGroup>
        <CSSTransition key={childKey}
                       timeout={{ enter: enter || 0, exit: exit || 0}}
                       classNames={classes}
                       unmountOnExit>
                         { children }
                       </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default Fade;