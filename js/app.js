/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        //Attendance will be an object with a couple of arrays, 
        //each person has his own array filled with booleans (ressembling whether they were attending or not)
        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
  // attendance is the model
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    var octopus = {
      // Count a student's missed days
      getNumMissedDays: function(name){
        var numMissed = 0;
        attendance[name].forEach(function(day){
          if(!day)
            numMissed++;
        })
        return numMissed;
      },
      toggleAttendance: function(studentAttendance, dayIndex){
        studentAttendance[dayIndex] = !studentAttendance[dayIndex];
        view.render();
      },
      getAttendance: function(name, dayIndex){
        return attendance[name][dayIndex];
      },
      init: function(){
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
        $.each(attendance, function(name, studentAttendance) {
          var row = document.createElement('tr');
          row.classList = "student";
          var nameCol= document.createElement('td');
          nameCol.classList = "name-col";
          nameCol.innerHTML = name;
          row.appendChild(nameCol);
          studentAttendance.forEach(function(isAttending, dayIndex){
            var attendCol = document.createElement('td');
            attendCol.classList = "attend-col";
            var checkboxInput = document.createElement('input');
            checkboxInput.type = "checkbox";
            checkboxInput.checked = isAttending;
            //add event listener to change the model when the checkbox changes
            checkboxInput.addEventListener('change', function(){
              octopus.toggleAttendance(studentAttendance, dayIndex);
            });
            attendCol.appendChild(checkboxInput);
            row.appendChild(attendCol);
          });
          var missedCol = document.createElement('td');
          missedCol.classList = "missed-col";
          missedCol.innerHTML = octopus.getNumMissedDays(name);
          row.appendChild(missedCol);
          $this.$tablebody.append(row);
        });
      },
      render: function(){
        $("td.missed-col").each(function(){
          var name = $(this).parent('.student').children('.name-col').html();
          $(this).html(octopus.getNumMissedDays(name));
        });
      }
    };
    // Check boxes, based on attendace records
    // $.each passed de key (name) en property (days) into the function
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    //countMissing();
    octopus.init();
}());
