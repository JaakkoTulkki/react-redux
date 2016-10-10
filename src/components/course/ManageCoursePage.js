import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CourseForm from './CourseForm';
import * as courseActions from '../../actions/courseActions';
import authorsFormattedForDropDown from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            course: Object.assign({}, this.props.course),
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.course.id !== nextProps.course.id){
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event){
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    courseFormIsValid(){
        let valid = true;
        let errors = {};

        if(this.state.course.title.length < 5){
            errors.title = 'Title error';
            valid = false;
        }
        this.setState({errors: errors});
        return valid;
    }

    saveCourse(event){
        event.preventDefault();
        if(!this.courseFormIsValid()){
            return;
        }

        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
            .then(()=>this.redirect())
            .catch(error => {
                this.setState({saving: false});
                toastr.error(error);
            });
    }

    redirect(){
        this.setState({saving: false});
        toastr.success('Course saved');
        this.context.router.push('/courses');
    }

    render() {
        return (
            <div>
                <h1>Manage Course</h1>
                <CourseForm
                    allAuthors={this.props.authors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    course={this.state.course}
                    errors={this.state.errors}
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

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};


function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course.length) return course[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;
    // console.log(ownProps);

    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
    if(courseId && state.courses.length > 0){
        course = getCourseById(state.courses, courseId);
    }

    let authorsFormattedForDropDown = authorsFormattedForDropDown(state.authors);

    return {
        course: course,
        authors: authorsFormattedForDropDown
    };
}

function mapDipatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDipatchToProps)(ManageCoursePage);
