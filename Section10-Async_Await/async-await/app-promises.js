/**
 * File    : app-promises.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 8/10/2017
 */

const users = [{
  id: 1,
  name: 'Tolios',
  schoolId: 101
},{
  id: 2,
  name: 'Mike',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
},{
  id: 2,
  schoolId: 999,
  grade: 100
},{
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (user){
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`)
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

// Tolios has a 83% in the class
const getStatus = (userId) => {
  let user; // we create a var user here, cause we need access to the last then.
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0){
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;
  });
};

// async/await
const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  let average = 0;

  if (grades.length > 0){
    average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(1).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});
// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });



