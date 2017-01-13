//yn.vrba@gmail.com
/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.students) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var students = [
          {name: "Slappy the Frog"
          },{
            name: "Lilly the Lizard"
          },{
            name: "Paulrus the Walrus"
          },{
            name: "Gregory the Goat"
          },{
            name: "Adam the Anaconda"
          }];

        //var nameColumns = $('tbody .name-col'),
            //attendance = {};

        //Attendance will be an object with a couple of arrays, 
        //each person has his own array filled with booleans (ressembling whether they were attending or not)
        students.forEach(function(student) {
            student.attendance = [];

            for (var i = 0; i <= 11; i++) {
                student.attendance.push(getRandom());
            }
        });

        localStorage.students = JSON.stringify(students);
    }
}());


/* STUDENT APPLICATION */
$(function() {
  // attendance is the model
    var students = JSON.parse(localStorage.students),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    var octopus = {
      // Count a student's missed days
      setMissedDays: function(student){
        student.daysMissed = 0;
        for(i=0, len=student.attendance.length; i<len; i++){
          if(student.attendance[i]){
            student.daysMissed++;
          }
        }
      },
      getNumMissedDays: function(student){
        var numMissed = 0;
        attendance[name].forEach(function(day){
          if(!day)
            numMissed++;
        })
        return numMissed;
      },
      toggleAttendance: function(student, dayIndex){
        student.attendance[dayIndex] = !student.attendance[dayIndex];
        octopus.setMissedDays(student);
        localStorage.students = JSON.stringify(students);
        view.render();
      },
      getAttendance: function(name, dayIndex){
        return attendance[name][dayIndex];
      },
      getStudents: function(){
        return students;
      },
      init: function(){
        id = 0;
        students.forEach(function(student){
          student.id = id;
          id++;
          this.setMissedDays(student);
        },this);
        view.init();
      }
    };
    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    var view = {
      init: function(){
        var $this = this;
        this.$tablebody = $("#attendance-table");
        //for each name (k/v pair) in attendance, create a new student row. 
        octopus.getStudents().forEach(function(student) {
          var row = document.createElement('tr');
          row.classList = "student";
          row.setAttribute('id', "student-" + student.id);
          var nameCol= document.createElement('td');
          nameCol.classList = "name-col";
          nameCol.innerHTML = student.name;
          row.appendChild(nameCol);
          student.attendance.forEach(function(isAttending, dayIndex){
            var attendCol = document.createElement('td');
            attendCol.classList = "attend-col";
            var checkboxInput = document.createElement('input');
            checkboxInput.type = "checkbox";
            checkboxInput.checked = isAttending;
            //add event listener to change the model when the checkbox changes
            checkboxInput.addEventListener('change', function(){
              octopus.toggleAttendance(student, dayIndex);
            });
            attendCol.appendChild(checkboxInput);
            row.appendChild(attendCol);
          });
          var missedCol = document.createElement('td');
          missedCol.classList = "missed-col";
          missedCol.innerHTML = student.daysMissed;
          row.appendChild(missedCol);
          $this.$tablebody.append(row);
        });
      },
      render: function(){
        octopus.getStudents().forEach(function(student){
         var $studentMissedCol = $("#student-" + student.id).children(".missed-col");
        $studentMissedCol.html(student.daysMissed);
        });
      }
    };

    octopus.init();
}());
