$(document).ready(function() {
    $('#bmiForm').on('submit', function(e) {
        e.preventDefault();

        let name = $('#name').val();
        let height = parseFloat($('#height').val());
        let weight = parseFloat($('#weight').val());

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            alert('Please enter valid height and weight.');
            return;
        }

        let bmi = weight / (height * height);
        let status = '';
        let advice = '';
        let imageUrl = '';

        if (bmi < 18.5) {
            status = 'Underweight';
            advice = `You need to gain ${(18.5 * height * height - weight).toFixed(1)} kg to reach a normal BMI.`;
            imageUrl = 'image/underweight.png';
        } else if (bmi < 24.9) {
            status = 'Normal';
            advice = 'You are within the normal weight range.';
            imageUrl = 'image/normal.png';
        } else if (bmi < 29.9) {
            status = 'Overweight';
            advice = `You need to lose ${(weight - 24.9 * height * height).toFixed(1)} kg to reach a normal BMI.`;
            imageUrl = 'image/overweight.png';
        } else {
            status = 'Obese';
            advice = `You need to lose ${(weight - 24.9 * height * height).toFixed(1)} kg to reach a normal BMI.`;
            imageUrl = 'image/obese.png';
        }

        $('#bmiValue').text(`Your BMI is ${bmi.toFixed(1)}`);
        $('#bmiStatus').text(`Status: ${status}`);
        $('#bmiAdvice').text(advice);
        $('#bmiImage').attr('src', imageUrl);
        $('#result').show();

        let date = new Date();
        let entry = {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            name: name,
            height: height.toFixed(2),
            weight: weight.toFixed(1),
            bmi: bmi.toFixed(1),
            status: status
        };

        let history = JSON.parse(localStorage.getItem('bmiHistory')) || [];
        history.push(entry);
        localStorage.setItem('bmiHistory', JSON.stringify(history));
    });

    $('#viewHistory').on('click', function() {
        window.location.href = 'history.html';
    });
});
