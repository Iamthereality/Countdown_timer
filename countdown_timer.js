document.addEventListener('DOMContentLoaded', function () {

    //this function starts countdown_timer from current date to the date you set up
    //when times running out it returns '00' to every measure unit
    //if single unit are less than 10 then in front the digit function adds the zero
    function counter(finish_date, hours_container, minutes_container, seconds_container) {
        let end_date = finish_date; //define the end date

        //tis function returns the time object contains delta time, hours, minutes, seconds
        function remaining_time() {
            let delta_time = Date.parse(end_date) - Date.parse(new Date()), //get quantity of the milliseconds from now to the end date
                seconds = Math.floor((delta_time/1000) % 60), //get seconds
                minutes = Math.floor((delta_time/1000/60) % 60), //get minutes
                hours = Math.floor((delta_time/1000/60/60)); //get hours

            //the time object
            return {
                'total': delta_time,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            }
        }

        //setting up the countdown_timer function
        function set_counter() {
            let hours = document.querySelector(hours_container), //define the hours element
                minutes = document.querySelector(minutes_container), //define the minutes element
                seconds = document.querySelector(seconds_container), //define the seconds element
                update_time = setInterval(update_counter, 1000); //set countdown_timer update time equal 1s

            //update countdown_timer function
            function update_counter() {
                let time = remaining_time(); //get the time object

                //adds zero in front of the time measure unit if it displays less than 2 symbols
                function add_zero(measure_unit) {
                    let unit; //variable needed to store different data from the time object depending on function argument

                    if (measure_unit == hours){
                        unit = time.hours; //stores the hours
                    } else if (measure_unit == minutes) {
                        unit = time.minutes; //stores the minutes
                    } else if (measure_unit == seconds) {
                        unit = time.seconds; //stores the seconds
                    }

                    //function returns additional zero symbol if 'unit' variable value are less than 10
                    return (unit < 10) ? measure_unit.innerText = '0' + unit : measure_unit.innerText = unit;
                }

                //if delta time is over stops update function and display zero to every time measure unit
                if (time.total < 0) {
                    clearInterval(update_time);
                    time.hours = time.minutes = time.seconds = 0;
                }

                //adding zero to every displayed measure unit
                add_zero(hours);
                add_zero(minutes);
                add_zero(seconds);
            }
        }

        //initialize countdown_timer set up
        set_counter();
    }

    //start up the countdown_timer
    //add arguments to the function in this order:
    //1) date to spot the countdown_timer
    //2) container for the hours element
    //3) container for the minutes element
    //4) container for the seconds element
    counter('2019-11-03','.hours', '.minutes', '.seconds');
});