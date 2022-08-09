import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from '../Store/reducers/rootReducer';

const TestWrapper = (Component, testStore = null) => {
  const store = createStore(rootReducer, testStore, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      {Component}
    </Provider>
  );
};

export default TestWrapper;
