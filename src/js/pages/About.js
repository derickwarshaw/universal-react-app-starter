import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import * as actions from '../redux/actions'

import { Hero } from '../components';

class About extends React.Component {
    static fetchData({ store }) {
        return store.dispatch(actions.getName());
    }
    componentWillMount() {
        this.props.getName();
    }
    render() {
        return (
            <div>
                <Helmet>
                    <title>About</title>
                </Helmet>
                <Hero>
                  <h1>About page</h1>
                  <p>Async data</p>
                  <p><b>name:</b> {this.props.name}</p>
                  <p><b>email:</b> {this.props.email}</p>
                </Hero>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state.user,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(About);
