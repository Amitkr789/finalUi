// Profile picture see
$(document).ready(function() {
    $('.fileUplaod').on('change', function(event) {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader(); // Create a FileReader to read the file
        reader.onload = function(e) {
          $('.dataFile').attr('src', e.target.result); // Set the src of the img tag
        }
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    });
// File Upload-------------------------------------------------------
$('.userFileForm').on('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  
    let isValid = true; // Track form validity
    let password = $('input[name="password"]').val();
        let confirmPassword = $('input[name="confirm_password"]').val();

        // Loop through each input and select field
        $(this).find('input, select').each(function () {
            let fieldType = $(this).attr('type');

            // Skip validation for file inputs
            if (fieldType === 'file') {
                return true; // Continue to the next iteration
            }

            // Check for empty fields
            if ($(this).val().trim() === '' || $(this).val() === null) {
                $(this).addClass('error');
                $(this).next('.error-message').text("This field is required.").show();
                isValid = false;
            } else {
                $(this).removeClass('error');
                $(this).next('.error-message').hide();
            }
        });

        // Prevent "Select role" from being selected
        let role = $('select[name="role"]').val();
        if (role === '' || role === 'select') {  
            $('select[name="role"]').addClass('error');
            $('select[name="role"]').next('.error-message').text("Please select a valid role.").show();
            isValid = false;
        } else {
            $('select[name="role"]').removeClass('error');
            $('select[name="role"]').next('.error-message').hide();
        }

        // Password and Confirm Password validation
        if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
            $('input[name="confirm_password"]').addClass('error');
            $('input[name="confirm_password"]').next('.error-message').text("Passwords do not match!").show();
            isValid = false;
        } else {
            $('input[name="confirm_password"]').removeClass('error');
            $('input[name="confirm_password"]').next('.error-message').hide();
        }

    if (isValid) {
      $('.buttonLogin').html('Please wait...')
   $.ajax({
				method:'POST',
				url:'/actionUser',
				dataType: 'json',
		        processData: false,  // <-- what to expect back from the PHP script, if anything
		        contentType: false,
				data:new FormData(this),
				success:function(response){
					if (response.status === 'success') {
						Swal.fire(
				          'Great!',
				          'User saved sucessfully',
				          'success'
				          )
                  $(".userFileForm")[0].reset()
                  location.reload();
					}else{
						Swal.fire(
					          'warning',
					          response.message,
					          'warning'
					)
					}
          $('.buttonMsh').html('Save profile')
				}
			})
    }
  });
// Login Form-------------------------------------------------------------------------------------
$('.LoginFormSubmit').on('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  let isValid = true; // Track form validity

  // Loop through each input field
  $(this).find('input, select').each(function () {
    if ($(this).val().trim() === '') {
      // If input is empty, add error class and show error message
      $(this).addClass('error');
      $(this).next('.error-message').show();
      isValid = false;
    } else {
      // If input is valid, remove error class and hide error message
      $(this).removeClass('error');
      $(this).next('.error-message').hide();
    }
  });

  if (isValid) {
    $('.buttonLogin').html('Please wait...')
    $.ajax({
        type:'POST',
				url:'/loginAction',
				data:$(this).serialize(),
        csrfmiddlewaretoken: '{{ csrf_token }}',
				success:function(response){
          $('.buttonLogin').html('Login')
          if(response.status=='success'){
            Swal.fire(
              'Great!',
              response.message,
              'success'
              )
              $(".LoginFormSubmit")[0].reset()
              window.location.href='/'

          }else{
            Swal.fire(
              'warning',
              response.message,
              'warning'
    )
          }
        }
    })
  }
});
// -------------------------------------LeadGeneration-------------------
$('.LeadGenerationForm').on('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  let isValid = true; // Track form validity

  // Loop through each input field
  $(this).find('input, select').each(function () {
    if ($(this).val().trim() === '') {
      // If input is empty, add error class and show error message
      $(this).addClass('error');
      $(this).next('.error-message').show();
      isValid = false;
    } else {
      // If input is valid, remove error class and hide error message
      $(this).removeClass('error');
      $(this).next('.error-message').hide();
    }
  });

  if (isValid) {
    $('.buttonLogin').html('Please wait...')
    $.ajax({
        type:'POST',
				url:'/LeadAction',
				data:$(this).serialize(),
        csrfmiddlewaretoken: '{{ csrf_token }}',
				success:function(response){
          $('.buttonLogin').html('Login')
          if(response.status=='success'){
            Swal.fire(
              'Great!',
              response.message,
              'success'
              )
              $(".LeadGenerationForm")[0].reset()
              location.reload();
          }else{
            Swal.fire(
              'warning',
              response.message,
              'warning'
    )
          }
        }
    })
  }
});
  });
  
  // ------------------------Calender------------------------------------------------------------
  $(document).ready(function () {
    let currentDate = new Date();
    const timeSlots = [];
    
    for (let i = 0; i < 24; i++) {
        let hour = i % 12 === 0 ? 12 : i % 12;
        let ampm = i < 12 ? 'AM' : 'PM';
        timeSlots.push(`${hour}:00 ${ampm}`, `${hour}:30 ${ampm}`);
    }
    
    function updateWeekRange() {
        let startOfWeek = new Date(currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        let options = { month: 'short', day: 'numeric' };
        $('#weekRange').text(`${startOfWeek.toLocaleDateString(undefined, options)} - ${endOfWeek.toLocaleDateString(undefined, options)}`);
        generateCalendar(startOfWeek);
    }

    function generateCalendar(startOfWeek) {
        let tbody = $('#calendar-body');
        tbody.empty();
        for (let i = 0; i < timeSlots.length; i++) {
            let row = `<tr><td style="font-weight:bold;"">${timeSlots[i]}</td>`;
            for (let j = 0; j < 7; j++) {
                let cellDate = new Date(startOfWeek);
                cellDate.setDate(startOfWeek.getDate() + j);
                row += `<td class="time-slot" data-date="${cellDate.toISOString().split('T')[0]}" data-time="${timeSlots[i]}" data-bs-toggle="modal" data-bs-target="#eventModal"></td>`;
            }
            row += '</tr>';
            tbody.append(row);
        }
    }

    $('#prevWeek').click(() => { currentDate.setDate(currentDate.getDate() - 7); updateWeekRange(); });
    $('#nextWeek').click(() => { currentDate.setDate(currentDate.getDate() + 7); updateWeekRange(); });
    
    
    $(document).on('click', '.time-slot', function () {
        let startDate = $(this).data('date');
        let startTime = $(this).data('time');
        let startTimeIndex = timeSlots.indexOf(startTime);
        let endTime = startTimeIndex < timeSlots.length - 1 ? timeSlots[startTimeIndex + 1] : timeSlots[startTimeIndex];
        
        $('#startDate').val(startDate);
        $('#startTime').html(`<option>${startTime}</option>`);
        $('#endDate').val(startDate);
        $('#endTime').html(`<option>${endTime}</option>`);
    });
    
    updateWeekRange();
});