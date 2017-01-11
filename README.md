udacity-frontend-attendance
===========================

I would love it if you had a look at the code for my school attendance refactor project, and gave me some pointers on how (in what form) the information (data) should be passed in between the view and model

More specific,is it best to somehow "connect" a real reference to the data in your view? For example, would it be okay to "attach" a reference of the student array to the event listener, so that when an event happens you can simply pass the reference to the student array to the octopus and modify it. You can see this example at the following line https://github.com/sjbuysse/school-attendance-mvo/blob/master/js/app.js#L97

Or would it be better to seperate concerns a bit more and simply pass a string (like the name) to the octopus, and let the octopus find the actual student array in the model with this information, just like I'm doing here https://github.com/sjbuysse/school-attendance-mvo/blob/master/js/app.js#L112

Personally, I feel like the first option is better, but I'm still a little bit on the fence because this means that I'm more or less mixing my data (which should be a model thing only) and view together...
