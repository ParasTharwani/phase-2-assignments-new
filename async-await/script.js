const students = [
    {
        id: 1,
        name : "kabir"
    },
    {
        id: 2,
        name : "ahmed"
    },
    {
        id : 3,
        name : "hassan"
    },
    {
        id: 4,
        name : "sam"
    }
]

const courses = [
     {
        courseName : Finance,
        id : 11
    },
    {
        courseName : business, 
        id : 12 
    },
    {
        courseName : sqa,
        id : 13
    },
]
const attendance = [
    {
        stdId : 1, 
        courseId : 11,
        Date : "1-1-2025",
        Present : true
    },
    {
        stdId : 2, 
        courseId : 11,
        Date : "1-1-2025",
        Present : true
    },
    {
        stdId : 3, 
        courseId : 11,
        Date : "1-1-2025",
        Present : true
    },
    {
        stdId : 4, 
        courseId : 11,
        Date : "1-1-2025",
        Present : false
    },
    {
        stdId : 1, 
        courseId : 12,
        Date : "1-1-2025",
        Present : true
    },
    {
        stdId : 2, 
        courseId : 12,
        Date : "1-1-2025",
        Present : false
    },
    {
        stdId : 3, 
        courseId : 12,
        Date : "1-1-2025",
        Present : true
    },
    {
        stdId : 4, 
        courseId : 12,
        Date : "1-1-2025",
        Present : true
    },
    {
        stdId : 1, 
        courseId : 13,
        Date : "1-1-2025",
        Present : true
    },
    {
        stdId : 2, 
        courseId : 13,
        Date : "1-1-2025",
        Present : true
    },
    {
        stdId : 3, 
        courseId : 13,
        Date : "1-1-2025",
        Present : true
    },
    {
        stdId : 4, 
        courseId : 13,
        Date : "1-1-2025",
        Present : true
    }
]
    // Promise 1 to get students
const getStudents = () => {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(students, 'resolved')
        }, 1000)
    })

}
    // promise 2 to get courses
const getCourses = () => {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(courses, 'resolved')
        }, 1200)
    })
}

// Promise 3 to get attendance

const getAttendance = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(attendance, 'resolved');
        }, 1200);
    });
};

// to get the student Attendance

const getStudentAttendance = async(courseName) => {
    console.log("calculating the attendance");
    try {
        
        const [studentData, coursesData, attendanceData] = await Promise.all([
            getStudents(),
            getCourses(),
            getAttendance()
        ])

        // finding the course 
        const course = coursesData.find(c =>
             c.name.toLowerCase() === courseName.toLowerCase()
            );
            if (!course) {
                throw new Error(`Course "${courseName}" not found`);
            }
            const attendanceReport = studentData.map(student => {

                const studentAttendance = attendanceData.filter ( record => 
                    record.stdId === student.id  &&
                    record.courseId === course.id
                )
                 // calculating 
                    const totalClasses = studentAttendance.length;
                    const presentClasses = studentAttendance.filter(record => 
                    record.present
            ).length;
            })
           
    } catch (error) {
        
    }
}