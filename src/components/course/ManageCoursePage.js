import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

      this.state = {
        course: Object.assign({}, props.course),
        errors: {},
        saving: false
      };

      this.updateCourseState = this.updateCourseState.bind(this);
      this.saveCourse = this.saveCourse.bind(this);
    }
  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field]= event.target.value;
    return this.setState({course: course});
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }


  saveCourse(event){
      event.preventDefault();
      this.setState({saving: true});
      this.props.actions.saveCourse(this.state.course)
        .then(()=> this.redirect())
        .catch(error =>{
          this.setState({saving: false});
          toastr.error(error);
        });


}



redirect(){
  this.setState({saving: false});
  browserHistory.push('/courses');
  toastr.success('Course saved')

}

  render() {
        return (
          <div>
          <CourseForm
            allAuthors={this.props.authors}
            course ={this.state.course}
            errors ={this.state.errors}
            onChange={this.updateCourseState}
            onSave={this.saveCourse}
            saving={this.state.saving}

          />
          </div>
        );
    }
}




ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

///Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  debugger;
  const course = courses.filter(course => course.id == id);
  if (course) return course[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path `/course/:id`

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }
  const authorsFormattedForDropdown = state.authors.map(author =>{
    return{
      value: author.id,
      text: author.firstName + ' '+ author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
