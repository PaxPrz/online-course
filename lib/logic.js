/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

 /*
  * Create course
  * @param {com.pax.onlinecourse.CreateCourse} courseDetail
  * @transaction 
  
 async function createCourse(courseDetail){
    var ns = 'com.pax.onlinecourse';

    var factory = getFactory();
    var course = factory.newResource(ns, 'Course', courseDetail.courseId);
    course.courseName = courseDetail.courseName;
    course.amount = courseDetail.amount;
    //course.teacher = factory
 }
*/
 /**
  * Buy Course
  * @param {com.pax.onlinecourse.BuyCourse} buyCourseDetail
  * @transaction
  */
async function buyCourse(trans){
    var ns = "com.pax.onlinecourse";

    if(trans.student.balance < trans.course.amount){
        throw new Error("Balance low. cannot buy");
    }
    if(trans.student.courses.includes(trans.course)){
        throw new Error("Course already taken");
    }

    trans.student.balance -= trans.course.amount;
    trans.student.courses.push(trans.course);
    trans.course.teacher.balance += trans.course.amount;
    trans.course.enrollNo += 1;

    let studentRegistry = await getParticipantRegistry(ns+'.Student');
    await studentRegistry.update(trans.student);

    let courseRegistry = await getAssetRegistry(ns+'.Course');
    await courseRegistry.update(trans.course);

    let teacherRegistry = await getParticipantRegistry(ns+'.Teacher');
  	await teacherRegistry.update(trans.course.teacher);

}
