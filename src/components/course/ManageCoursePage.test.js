import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage coursse page', ()=>{
    it('sets an error message when no title', () =>{
        const props = {
            course : {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''},
            authors: [],
            actions: {saveCourse: () => {
                        return Promise.resolve();
            }
            }
        };

        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveButon = wrapper.find('input').last();

        expect(saveButon.prop('type')).toBe('submit');
        saveButon.simulate('click');
        expect(wrapper.state().errors.title).toBe("Title error");
    });
});